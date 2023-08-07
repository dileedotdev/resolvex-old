import * as schema from './schema'
import { type Env } from './worker.env'
import { initedRateLimiter } from './worker.rate-limiter'
import { TRPCError, initTRPC } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { drizzle } from 'drizzle-orm/d1'
import { importSPKI, jwtVerify } from 'jose'
import { z } from 'zod'

export const createContext = ({
	env,
	ec,
}: {
	env: Env
	ec: ExecutionContext
}) => {
	return async (opts: FetchCreateContextFnOptions) => {
		const rateLimiter = initedRateLimiter.createRateLimiter({
			durableNamespace: env.DURABLE_OBJECT_RATE_LIMITER,
		})

		const db = drizzle(env.DB, { schema })

		return {
			env,
			ec,
			rateLimiter,
			db,
			req: opts.req,
			resHeaders: opts.resHeaders,
		}
	}
}

const t = initTRPC.context<ReturnType<typeof createContext>>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure.use(async ({ ctx, next }) => {
	const { resHeaders } = ctx

	if (!resHeaders.get('Cache-Control')) {
		resHeaders.set('Cache-Control', `public ,s-maxage=1, stale-while-revalidate=${60 * 60 * 24}`)
	}

	return next({
		ctx,
	})
})

const authed = middleware(async ({ ctx, next }) => {
	const { req, env } = ctx
	const authorization = req.headers.get('Authorization')
	if (!authorization) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		})
	}

	const bearer = authorization.split('Bearer ')[1]
	const authSchema = z
		.object({
			sid: z.string().nonempty(),
			sub: z.string().nonempty(),
			org_id: z.undefined(),
			org_slug: z.undefined(),
			org_role: z.undefined(),
		})
		.or(
			z.object({
				sid: z.string().nonempty(),
				sub: z.string().nonempty(),
				org_id: z.string().nonempty(),
				org_slug: z.string().nonempty(),
				org_role: z.enum(['admin', 'basic_member']),
			}),
		)
	let auth
	try {
		const publicKey = await importSPKI(env.CLERK_JWT_PUBLIC_KEY, 'RS256')
		const { payload } = await jwtVerify(bearer, publicKey)
		auth = authSchema.parse(payload)
	} catch (e) {
		console.error(e)
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		})
	}

	const response = await next({
		ctx: {
			...ctx,
			auth,
		},
	})

	ctx.resHeaders.set('Cache-Control', 'private, max-age=1, stale-while-revalidate=1')

	return response
})

export const authedProcedure = publicProcedure.use(authed)

export const orgedProcedure = authedProcedure.use(async ({ ctx, next }) => {
	const { auth } = ctx

	if (!auth.org_id) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must signed into an organization to access this resource',
		})
	}

	return next({
		ctx: {
			...ctx,
			auth,
		},
	})
})

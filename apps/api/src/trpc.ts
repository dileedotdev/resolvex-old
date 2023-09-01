import type { Context } from './worker.context'
import { TRPCError, initTRPC } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const createContext = ({
	context,
}: {
	context: Context
}) => {
	return async (opts: FetchCreateContextFnOptions) => {
		return {
			...context,
			...opts,
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
	const { auth } = ctx

	if (!auth) {
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

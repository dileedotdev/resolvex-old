import * as schema from './schema'
import { initedBroadcast } from './worker.broadcast'
import { Env } from './worker.env'
import { initedRateLimiter } from './worker.rate-limiter'
import { drizzle } from 'drizzle-orm/d1'
import { importSPKI, jwtVerify } from 'jose'
import { z } from 'zod'

type Options = {
	request: Request
	env: Env
	ec: ExecutionContext
}

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

export async function createContext({ request, env, ec }: Options) {
	const url = new URL(request.url)

	const rateLimiter = initedRateLimiter.createRateLimiter({
		durableNamespace: env.DURABLE_OBJECT_RATE_LIMITER,
	})

	const broadcast = initedBroadcast.createBroadcast({
		durableNamespace: env.DURABLE_OBJECT_BROADCAST,
	})

	const db = drizzle(env.DB, { schema })

	let auth
	const token = request.headers.get('Authorization')?.split(' ')[1] ?? url.searchParams.get('token')

	if (token) {
		try {
			const publicKey = await importSPKI(env.CLERK_JWT_PUBLIC_KEY, 'RS256')
			const { payload } = await jwtVerify(token, publicKey)
			auth = authSchema.parse(payload)
		} catch (e) {
			console.error(e)
		}
	}

	return {
		env,
		ec,
		rateLimiter,
		broadcast,
		db,
		auth,
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>

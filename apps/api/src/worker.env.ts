import { z } from 'zod'

export const envSchema = z.object({
	WORKER_ENV: z.enum(['development', 'test', 'production']).default('production'),
	DURABLE_OBJECT_RATE_LIMITER: z.custom<DurableObjectNamespace>((value) => {
		return typeof value === 'object'
	}),
	DURABLE_OBJECT_BROADCAST: z.custom<DurableObjectNamespace>((value) => {
		return typeof value === 'object'
	}),
	DB: z.custom<D1Database>((value) => {
		return typeof value === 'object'
	}),
	WEB_URL: z.string().url(),
	CLERK_JWT_PUBLIC_KEY: z.string().nonempty(),
	CLERK_SECRET_KEY: z.string().nonempty(),
})

export type Env = z.infer<typeof envSchema>

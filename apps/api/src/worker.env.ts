import { z } from 'zod'

export const envSchema = z.object({
  DURABLE_OBJECT_RATE_LIMITER: z.custom<DurableObjectNamespace>((value) => {
    return typeof value === 'object'
  }),
  CORS_ALLOW_ORIGIN: z.string().url(),
})

export type Env = z.infer<typeof envSchema>

import { z } from 'zod'

export const envSchema = z.object({
  DURABLE_OBJECT_RATE_LIMITER: z.custom<DurableObjectNamespace>((value) => {
    return typeof value === 'object'
  }),
  DB: z.custom<D1Database>((value) => {
    return typeof value === 'object'
  }),
  WEB_URL: z.string().url(),
})

export type Env = z.infer<typeof envSchema>

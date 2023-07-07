import { z } from 'zod'

export const envSchema = z.object({})

export type Env = z.infer<typeof envSchema>

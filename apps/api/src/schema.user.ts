import { z } from 'zod'

export const userIdColumnSchema = z.string().startsWith('user_')

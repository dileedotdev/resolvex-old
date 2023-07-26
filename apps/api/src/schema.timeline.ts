import z from 'zod'

const chatSchema = z.object({
  type: z.literal('chat'),
  message: z.string(),
})

export const dataColumnSchema = chatSchema

export type DataColumnType = z.infer<typeof dataColumnSchema>

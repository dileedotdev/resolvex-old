import { nanoid } from 'nanoid'
import z from 'zod'

export const chatSchema = z.object({
  type: z.literal('chat'),
  message: z.string(),
})

export const timelineDataColumnSchema = chatSchema

export const timelineIdColumnSchema = z.string().startsWith('t_')

export function generateTimelineId() {
  return 't_' + nanoid()
}

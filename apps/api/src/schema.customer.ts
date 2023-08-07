import { nanoid } from 'nanoid'
import { z } from 'zod'

export const customerIdColumnSchema = z.string().startsWith('c_')

export function generateCustomerId() {
	return `c_${nanoid()}`
}

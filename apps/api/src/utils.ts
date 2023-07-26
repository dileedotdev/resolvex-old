import { nanoid } from 'nanoid'

export function generateCustomerId() {
  return 'c_' + nanoid()
}

export function isCustomerId(id: string) {
  return id.startsWith('c_')
}

export function generateTimelineId() {
  return 't_' + nanoid()
}

export function isTimelineId(id: string) {
  return id.startsWith('t_')
}

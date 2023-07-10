import z from 'zod'
import type { Env } from '~/worker.env'

export class DurableObjectRateLimiter implements DurableObject {
  constructor(private state: DurableObjectState, private env: Env) {}

  public async fetch(request: Request): Promise<Response> {
    this.state.waitUntil(this.setAlarm())

    const body = await request.json()
    const inputSchema = z.object({
      limit: z.number().default(60),
      duration: z.number().default(60),
    })
    const { limit, duration } = inputSchema.parse(body)
    const key = '_DURATION:' + duration + '_LIMIT:' + limit

    const value = await this.state.storage.get<string>(key)
    const data: { count: number; unit: number } = value ? JSON.parse(value) : { count: 0, unit: 0 }
    const now = this.convertToUnit(new Date(), duration)

    if (now > data.unit) {
      data.count = 1
      data.unit = now
      await this.state.storage.put(key, JSON.stringify(data))
      return new Response('OK')
    }

    data.count += 1
    await this.state.storage.put(key, JSON.stringify(data))

    return data.count > limit ? new Response('Rate limit exceeded', { status: 429 }) : new Response('OK')
  }

  private convertToUnit(date: Date, duration: number): number {
    return Math.floor(date.getTime() / (duration * 1000))
  }

  private async setAlarm() {
    await this.state.storage.deleteAlarm()
    await this.state.storage.setAlarm(Date.now() + 60 * 60 * 1000)
  }

  public async alarm(): Promise<void> {
    await this.state.storage.deleteAll()
  }
}

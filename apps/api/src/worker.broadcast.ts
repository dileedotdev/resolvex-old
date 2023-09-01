import { Context } from './worker.context'
import { initBroadcast } from '@resolvex/broadcast-worker/src'
import { z } from 'zod'

export type Events = {
	ping: {
		pong: string
	}
}

export const initedBroadcast = initBroadcast<Events>()

const paramsSchema = z.object({
	channel: z.string(),
})

export async function handleBroadcastRequest(request: Request, context: Context) {
	const url = new URL(request.url)
	if (!url.pathname.startsWith('/broadcast')) return

	const searchParams = new URL(request.url).searchParams
	const { channel } = paramsSchema.parse(Object.fromEntries(searchParams.entries()))

	if (context.auth?.sub !== channel) {
		return new Response('Unauthorized', {
			status: 401,
		})
	}

	const broadcast = initedBroadcast.createBroadcast({
		durableNamespace: context.env.DURABLE_OBJECT_BROADCAST,
	})

	return broadcast.channel(channel).connect(request)
}

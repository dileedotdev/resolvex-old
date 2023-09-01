import { z } from 'zod'

const sendSchema = z.object({
	event: z.string(),
	data: z.unknown(),
})

export class Durable implements DurableObject {
	constructor(private state: DurableObjectState, private env: Record<string, unknown>) {}

	fetch(request: Request<unknown, CfProperties<unknown>>): Response | Promise<Response> {
		const url = new URL(request.url)
		if (url.pathname === '/connect') {
			return this.handleConnect(request)
		}

		if (url.pathname === '/send') {
			return this.handleSend(request)
		}

		return new Response('Not found', {
			status: 404,
		})
	}

	private handleConnect(request: Request<unknown, CfProperties<unknown>>): Response | Promise<Response> {
		if (request.headers.get('upgrade') !== 'websocket') {
			return new Response('Expected Upgrade: websocket', { status: 426 })
		}

		const [client, server] = Object.values(new WebSocketPair())

		this.state.acceptWebSocket(server)

		return new Response(null, {
			status: 101,
			webSocket: client,
		})
	}

	private async handleSend(request: Request<unknown, CfProperties<unknown>>): Promise<Response> {
		const event = sendSchema.parse(await request.json())

		this.state.getWebSockets().forEach((socket) => {
			socket.send(JSON.stringify(event))
		})

		return new Response(null, {
			status: 204,
		})
	}
}

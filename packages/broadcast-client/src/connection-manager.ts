import type { ConnectChannelWebsocket, MessageEventListener } from './typing'
import { debounce } from 'radash'

type Options = {
	connect: ConnectChannelWebsocket
}

export class ConnectionManager {
	private connections = new Map<
		string,
		{
			websocket: WebSocket
			messageListeners: Set<(e: MessageEvent) => void>
			activateAutoClose: ReturnType<typeof debounce>
		}
	>()

	constructor(private readonly options: Options) {}

	private async getConnection(channel: string) {
		let connection = this.connections.get(channel)

		if (!connection) {
			connection = {
				websocket: await this.options.connect(channel),
				messageListeners: new Set(),
				activateAutoClose: debounce({ delay: 30_000 }, async () => {
					const { websocket, messageListeners } = await this.getConnection(channel)

					if (messageListeners.size !== 0) return
					websocket.close()
					this.connections.delete(channel)
				}),
			}
			this.connections.set(channel, connection)
		}

		return connection
	}

	async addMessageEventListener(channel: string, listener: MessageEventListener) {
		const { websocket, messageListeners } = await this.getConnection(channel)
		messageListeners.add(listener)
		websocket.addEventListener('message', listener)
	}

	async removeMessageEventListener(channel: string, listener: MessageEventListener) {
		const { websocket, messageListeners, activateAutoClose } = await this.getConnection(channel)
		messageListeners.delete(listener)
		websocket.removeEventListener('message', listener)

		activateAutoClose()
	}
}

import { Channel } from './channel'
import { ConnectionManager } from './connection-manager'
import type { Events } from '@resolvex/broadcast-shared/src/typing'

type CreateHandlerOptions = { connect: (channel: string) => Promise<WebSocket> | WebSocket }

export function createBroadcastClient<E extends Events>(options: CreateHandlerOptions) {
	const connectionManager = new ConnectionManager({
		connect: options.connect,
	})

	return {
		channel(channel: string) {
			return new Channel<E>({ name: channel, connectionManager })
		},
	}
}

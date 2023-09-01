import type { ConnectionManager } from './connection-manager'
import type { MessageEventListener } from './typing'
import type { Events, MessageData } from '@resolvex/broadcast-shared/src/typing'

type Options = {
	name: string
	connectionManager: ConnectionManager
}

export class Channel<E extends Events> {
	constructor(private readonly options: Options) {}

	on<K extends keyof E>(event: K, handler: (data: E[K]) => void) {
		const listener: MessageEventListener = (e) => {
			const data = JSON.parse(e.data as string) as MessageData
			if (data.event !== event) return
			handler(data.data as E[K])
		}

		this.options.connectionManager.addMessageEventListener(this.options.name, listener)

		return listener
	}

	off(listener: MessageEventListener) {
		this.options.connectionManager.removeMessageEventListener(this.options.name, listener)
	}
}

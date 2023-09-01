import { Channel } from './channel'
import { Durable } from './durable'
import type { Events } from '@resolvex/broadcast-shared/src/typing'

type CreateHandlerOptions = { durableNamespace: DurableObjectNamespace }

export function initBroadcast<E extends Events>() {
	return {
		createBroadcast(options: CreateHandlerOptions) {
			const { durableNamespace } = options
			const channels = new Map<string, Channel<E>>()

			return {
				channel(channel: string) {
					if (!channels.has(channel)) {
						channels.set(
							channel,
							new Channel<E>({
								name: channel,
								durableNamespace,
							}),
						)
					}

					return channels.get(channel) as Channel<E>
				},
			}
		},
		Durable,
	}
}

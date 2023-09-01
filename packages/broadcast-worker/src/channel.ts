import type { Events } from '@resolvex/broadcast-shared/src/typing'

type Options = {
	name: string
	durableNamespace: DurableObjectNamespace
}

export class Channel<E extends Events> {
	#durableNamespace: DurableObjectNamespace
	#name: string

	constructor(options: Options) {
		this.#name = options.name
		this.#durableNamespace = options.durableNamespace
	}

	#id?: DurableObjectId
	get id() {
		if (!this.#id) this.#id = this.#durableNamespace.idFromName(this.#name)
		return this.#id
	}

	#durableStub?: DurableObjectStub
	get durableStub() {
		if (!this.#durableStub) this.#durableStub = this.#durableNamespace.get(this.id)
		return this.#durableStub
	}

	async send<K extends keyof E>(event: K, data: E[K]) {
		const request = new Request('https://broadcast/send', {
			method: 'POST',
			body: JSON.stringify({ event, data }),
		})
		const response = await this.durableStub.fetch(request)
		if (!response.ok) throw new Error(`Failed to send broadcast ${String(event)} to ${this.#name}`)
	}

	connect(request: Request) {
		return this.durableStub.fetch(new Request('https://broadcast/connect', request))
	}
}

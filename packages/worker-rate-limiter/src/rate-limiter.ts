interface Options {
	DURABLE_OBJECT_RATE_LIMITER: DurableObjectNamespace
}

export class RateLimiter {
	private DURABLE_OBJECT_RATE_LIMITER: DurableObjectNamespace
	constructor(options: Options) {
		this.DURABLE_OBJECT_RATE_LIMITER = options.DURABLE_OBJECT_RATE_LIMITER
	}
	public async limit({
		key,
		limit,
		duration = 60,
	}: {
		key: string
		limit: number
		duration?: number
	}) {
		const durableObjectId = this.DURABLE_OBJECT_RATE_LIMITER.idFromName(key)
		const durableObject = this.DURABLE_OBJECT_RATE_LIMITER.get(durableObjectId)

		const { status } = await durableObject.fetch(
			new Request('https://rate-limiter', {
				method: 'POST',
				body: JSON.stringify({ limit, duration }),
			}),
		)

		if (status !== 200) {
			return { success: false }
		}

		return { success: true }
	}
}

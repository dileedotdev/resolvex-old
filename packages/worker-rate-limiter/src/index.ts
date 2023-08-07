import { Durable } from './durable'
import { RateLimiter } from './rate-limiter'

type CreateRateLimiterOptions = {
	durableNamespace: DurableObjectNamespace
}

export function initRateLimiter() {
	return {
		Durable,
		createRateLimiter(options: CreateRateLimiterOptions) {
			return new RateLimiter({
				DURABLE_OBJECT_RATE_LIMITER: options.durableNamespace,
			})
		},
	}
}

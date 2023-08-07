import { handleCorsRequest, handleCorsResponse } from './worker.cors'
import { envSchema } from './worker.env'
import { initedRateLimiter } from './worker.rate-limiter'
import { handleTrpcRequest } from './worker.trpc'

export default {
	async fetch(request: Request, unvalidatedEnv: unknown, ec: ExecutionContext): Promise<Response> {
		const env = envSchema.parse(unvalidatedEnv)

		if (env.WORKER_ENV === 'development') {
			await new Promise((resolve) => setTimeout(resolve, 300))
		}

		let response: Response | undefined = undefined

		response ??= await handleCorsRequest(request)

		response ??= await handleTrpcRequest(request, { env, ec })

		response ??= new Response('Not found', {
			status: 404,
		})

		response = await handleCorsResponse(response, { env })

		return response
	},
}

const { Durable: DurableObjectRateLimiter } = initedRateLimiter

export { DurableObjectRateLimiter }

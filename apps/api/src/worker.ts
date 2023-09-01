import { handleBroadcastRequest, initedBroadcast } from './worker.broadcast'
import { createContext } from './worker.context'
import { handleCorsRequest, handleCorsResponse } from './worker.cors'
import { envSchema } from './worker.env'
import { initedRateLimiter } from './worker.rate-limiter'
import { handleTrpcRequest } from './worker.trpc'

export default {
	async fetch(request: Request, unvalidatedEnv: unknown, ec: ExecutionContext): Promise<Response> {
		const env = envSchema.parse(unvalidatedEnv)
		const context = await createContext({ request, env, ec })

		if (env.WORKER_ENV === 'development') {
			await new Promise((resolve) => setTimeout(resolve, 300))
		}

		let response: Response | undefined = undefined

		response ??= await handleCorsRequest(request)

		response ??= await handleTrpcRequest(request, context)

		response ??= await handleBroadcastRequest(request, context)

		response ??= new Response('Not found', {
			status: 404,
		})

		response = await handleCorsResponse(response, { env })

		return response
	},
}

const { Durable: DurableObjectRateLimiter } = initedRateLimiter
const { Durable: DurableObjectBroadcast } = initedBroadcast

export { DurableObjectRateLimiter, DurableObjectBroadcast }

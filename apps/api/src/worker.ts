import { envSchema } from './worker.env'
import { handleCorsRequest, handleCorsResponse } from './worker.cors'
import { handleTrpcRequest } from './worker.trpc'
import { RateLimiter } from './services/rate-limiter'

export default {
  async fetch(
    request: Request,
    unvalidatedEnv: unknown,
    ec: ExecutionContext
  ): Promise<Response> {
    const env = envSchema.parse(unvalidatedEnv)
    const rateLimiter = new RateLimiter({
      DURABLE_OBJECT_RATE_LIMITER: env.DURABLE_OBJECT_RATE_LIMITER,
    })

    let response: Response | undefined = undefined

    response ??= await handleCorsRequest(request)

    response ??= await handleTrpcRequest(request, { env, ec, rateLimiter })

    response ??= new Response('Not found', {
      status: 404,
    })

    response = await handleCorsResponse(response)

    return response
  },
}

export { DurableObjectRateLimiter } from './services/rate-limiter'

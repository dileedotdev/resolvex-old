import { envSchema } from './worker.env'
import { handleCorsRequest, handleCorsResponse } from './worker.cors'
import { handleTrpcRequest } from './worker.trpc'

export default {
  async fetch(
    request: Request,
    unvalidatedEnv: unknown,
    ec: ExecutionContext
  ): Promise<Response> {
    const env = envSchema.parse(unvalidatedEnv)

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

export { DurableObjectRateLimiter } from './services/rate-limiter'

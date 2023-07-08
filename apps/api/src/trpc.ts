import { initTRPC } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { type Env } from './worker.env'
import type { RateLimiter } from './services/rate-limiter'

export const createContext = ({
  env,
  ec,
  rateLimiter,
}: {
  env: Env
  ec: ExecutionContext
  rateLimiter: RateLimiter
}) => {
  return async (opts: FetchCreateContextFnOptions) => {
    return {
      env,
      ec,
      rateLimiter,
      req: opts.req,
      resHeaders: opts.resHeaders,
    }
  }
}

const t = initTRPC.context<ReturnType<typeof createContext>>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

import * as schema from './schema'
import { RateLimiter } from './services/rate-limiter'
import { type Env } from './worker.env'
import { initTRPC } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { drizzle } from 'drizzle-orm/d1'

export const createContext = ({ env, ec }: { env: Env; ec: ExecutionContext }) => {
  return async (opts: FetchCreateContextFnOptions) => {
    const rateLimiter = new RateLimiter({
      DURABLE_OBJECT_RATE_LIMITER: env.DURABLE_OBJECT_RATE_LIMITER,
    })

    const db = drizzle(env.DB, { schema })

    return {
      env,
      ec,
      rateLimiter,
      db,
      req: opts.req,
      resHeaders: opts.resHeaders,
    }
  }
}

const t = initTRPC.context<ReturnType<typeof createContext>>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

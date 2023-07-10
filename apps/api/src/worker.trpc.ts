import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from './trpc.router'
import { createContext } from './trpc'
import type { Env } from './worker.env'

export async function handleTrpcRequest(
  request: Request,
  {
    env,
    ec,
  }: {
    env: Env
    ec: ExecutionContext
  }
) {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/trpc')) {
    return await fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: createContext({ env, ec }),
    })
  }
}

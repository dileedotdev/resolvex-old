import { createContext } from './trpc'
import { appRouter } from './trpc.router'
import { Context } from './worker.context'
import type { Env } from './worker.env'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export async function handleTrpcRequest(request: Request, context: Context) {
	const url = new URL(request.url)

	if (url.pathname.startsWith('/trpc')) {
		return await fetchRequestHandler({
			endpoint: '/trpc',
			req: request,
			router: appRouter,
			createContext: createContext({ context }),
		})
	}
}

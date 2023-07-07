import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'api/dist/trpc.router'

export const trpc = createTRPCReact<AppRouter>()

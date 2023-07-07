import { publicProcedure, router } from './trpc'

export const appRouter = router({
  ping: publicProcedure.query(() => 'pong'),
})

export type AppRouter = typeof appRouter

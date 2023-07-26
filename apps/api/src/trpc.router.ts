import { customer } from './routes/customer'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  ping: publicProcedure.query(() => 'pong'),
  customer,
})

export type AppRouter = typeof appRouter

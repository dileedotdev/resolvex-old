import { customer } from './routes/customer'
import { timeline } from './routes/timeline'
import { user } from './routes/user'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
	ping: publicProcedure.query(() => 'pong'),
	customer,
	timeline,
	user,
})

export type AppRouter = typeof appRouter

import { customer } from './routes/customer'
import { timeline } from './routes/timeline'
import { user } from './routes/user'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
	ping: publicProcedure.query(({ ctx }) => {
		ctx.broadcast.channel('user_2Svd5GSfWvcvxVncBvcqDWalNDG').send('ping', { pong: 'pong' })
		return 'pong'
	}),
	customer,
	timeline,
	user,
})

export type AppRouter = typeof appRouter

import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { userIdColumnSchema } from '~/schema.user'
import { publicProcedure, router } from '~/trpc'

export const user = router({
  detail: publicProcedure
    .input(
      z.object({
        userId: userIdColumnSchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { env } = ctx
      const { userId } = input

      const res = await fetch(new URL(`users/${userId}`, 'https://api.clerk.com/v1/'), {
        headers: {
          Authorization: `Bearer ${env.CLERK_SECRET_KEY}`,
          Accept: 'application/json',
        },
      })

      if (!res.ok)
        throw new TRPCError({
          code: 'NOT_FOUND',
        })

      const data = (await res.json()) as {
        image_url: string
        first_name: string | null
        last_name: string | null
      }

      return {
        imageUrl: data.image_url,
        firstName: data.first_name,
        lastName: data.last_name,
      }
    }),
})

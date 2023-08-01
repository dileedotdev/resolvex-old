import { TRPCError } from '@trpc/server'
import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { timelines } from '~/schema'
import { customerIdColumnSchema } from '~/schema.customer'
import { generateTimelineId } from '~/schema.timeline'
import { chatSchema } from '~/schema.timeline'
import { orgedProcedure, router } from '~/trpc'

export const timeline = router({
  list: orgedProcedure
    .input(
      z.object({
        customerId: customerIdColumnSchema,
        limit: z.number().min(1).max(20).default(10),
        cursor: z.number().min(0).default(0),
        orderBy: z.enum(['-createdAt', '+createdAt']).default('-createdAt'),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { db, auth } = ctx
      const { customerId, limit, cursor, orderBy } = input

      const customer = await db.query.customers.findFirst({
        where: (t, { eq, and }) => and(eq(t.id, customerId), eq(t.orgId, auth.org_id)),
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        })
      }

      const data = await db.query.timelines.findMany({
        where: (t, { eq }) => eq(t.customerId, customerId),
        columns: {
          id: true,
          createdAt: true,
          data: true,
          creatorId: true,
        },
        limit,
        offset: cursor,
        orderBy: (t, { desc, asc }) => (orderBy === '-createdAt' ? desc(t.createdAt) : asc(t.createdAt)),
      })

      const meta = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(timelines)
        .where(and(eq(timelines.customerId, customerId)))
        .get()

      return {
        data,
        meta: {
          nextCursor: cursor + limit < meta.count ? cursor + limit : undefined,
        },
      }
    }),

  create: orgedProcedure
    .input(
      z.object({
        customerId: customerIdColumnSchema,
        data: chatSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, auth } = ctx
      const { customerId, data } = input

      const customer = await db.query.customers.findFirst({
        where: (t, { eq, and }) => and(eq(t.id, customerId), eq(t.orgId, auth.org_id)),
      })

      if (!customer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        })
      }

      const id = generateTimelineId()
      await db
        .insert(timelines)
        .values({
          id,
          customerId,
          creatorId: auth.sub,
          data: {
            type: 'chat',
            message: data.message,
          },
          createdAt: Date.now(),
        })
        .get()

      return {
        id,
      }
    }),
})

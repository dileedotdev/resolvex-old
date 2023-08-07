import type { timelineDataColumnSchema } from './schema.timeline'
import { relations } from 'drizzle-orm'
import { customType, index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
import type { z } from 'zod'

export const customers = sqliteTable(
	'customers',
	{
		id: text('id').notNull().primaryKey(),
		orgId: text('org_id').notNull(),
		name: text('name').notNull(),
		email: text('email'),
		status: text('status', {
			enum: ['waiting', 'helping', 'helped', 'spam'],
		}).notNull(),
		createdAt: integer('created_at').notNull(),
	},
	(t) => ({
		pi: index('c_pi').on(t.orgId, t.status, t.createdAt),
		uEmailOrgId: uniqueIndex('c_u_email_org_id').on(t.email, t.orgId),
	}),
)

export const customersRelations = relations(customers, ({ many }) => ({
	timelines: many(timelines),
}))

export const timelines = sqliteTable(
	'timelines',
	{
		id: text('id').notNull().primaryKey(),
		customerId: text('customer_id').notNull(),
		creatorId: text('creator_id'), // can be user_id or customer_id or null for system bot
		data: customType<{
			data: z.infer<typeof timelineDataColumnSchema>
			driverData: string
		}>({
			dataType: () => 'TEXT',
			toDriver: (value) => JSON.stringify(value),
			fromDriver: (value) => JSON.parse(value),
		})('data').notNull(),
		type: customType<{
			data: z.infer<typeof timelineDataColumnSchema>['type']
			default: true
		}>({
			dataType: () => "AS (json_extract(`data`, '$.type')) STORED",
		})('type').notNull(),
		createdAt: integer('created_at').notNull(),
	},
	(t) => ({
		pi: index('t_pi').on(t.customerId, t.type, t.createdAt),
	}),
)

export const timelinesRelations = relations(timelines, ({ one }) => ({
	customer: one(customers, {
		fields: [timelines.customerId],
		references: [customers.id],
	}),
}))

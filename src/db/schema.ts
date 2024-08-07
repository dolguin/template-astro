import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const userTable = pgTable('usuario', {
  id: text('id').primaryKey(),
  githubId: text('github_id').unique().notNull(),
  username: text('username').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull().defaultNow()
})

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull()
})

export const providerTable = pgTable('provider', {
  provider_id: text('provider_id').notNull().primaryKey(),
  provider_user_id: text('provider_user_id').notNull(),
  user_id: text('user_id').notNull().references(() => userTable.id)
})

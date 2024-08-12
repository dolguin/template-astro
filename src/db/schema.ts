// import { github } from '@/lib/auth'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const userTable = pgTable('usuario', {
  id: text('id').primaryKey(),
  githubId: text('github_id').unique().notNull(),
  username: text('username').notNull()
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

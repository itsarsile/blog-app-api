import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: serial('user_id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
})

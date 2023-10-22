import {
	pgEnum,
	pgTable,
	serial,
	text,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "guest"]);

export const user = pgTable(
	"user",
	{
		id: serial("user_id").primaryKey(),
		username: text("username").notNull().unique(),
		password: text("password").notNull(),
		role: roleEnum("role"),
	},
	(table) => {
		return {
			usernameIdx: uniqueIndex("username_idx").on(table.username),
		};
	},
);

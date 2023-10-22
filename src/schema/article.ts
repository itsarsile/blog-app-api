import { integer, serial, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./users";

export const article = pgTable("article", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	tags: text("tags").notNull(),
	content: text("content").notNull(),
	created_at: timestamp("created_at", {
		withTimezone: true,
		mode: "date",
	}).defaultNow(),
	author_id: integer("author_id").references(() => user.id),
});

export const comment = pgTable("comment", {
	id: serial("id").primaryKey(),
	comment: text("comment"),
	created_at: timestamp("created_at", {
		withTimezone: true,
		mode: "date",
	}).defaultNow(),
	author_id: integer("author_id").references(() => user.id),
});

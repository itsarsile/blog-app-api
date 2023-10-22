DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'guest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"tags" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"author_id" integer
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "user" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article" ADD CONSTRAINT "article_author_id_user_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "image" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productionwiththeo_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "posts_table";--> statement-breakpoint
DROP TABLE "users_table";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "productionwiththeo_post" USING btree ("name");
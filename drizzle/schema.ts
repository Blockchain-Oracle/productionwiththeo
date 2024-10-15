import { pgTable, index, serial, varchar, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const productionwiththeoPost = pgTable("productionwiththeo_post", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	imageUrl: varchar("image_url", { length: 1000 }).notNull(),
},
(table) => {
	return {
		nameIdx: index("name_idx").using("btree", table.name.asc().nullsLast()),
	}
});
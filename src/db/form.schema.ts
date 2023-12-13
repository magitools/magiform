import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user.schema";

export const forms = sqliteTable("forms", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    user: integer("user_id").references(() => users.id),
    allowedOrigins: text("allowed_origins").default("*"),
    redirectUrl: text("redirect_url")
})
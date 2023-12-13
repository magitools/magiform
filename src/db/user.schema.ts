import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    accountType: integer("account_type"),
})
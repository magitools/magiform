import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { forms } from "./form.schema";

export const hooks = sqliteTable("hooks", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    config: text("config", {mode:"json"}).notNull(),
    form: integer("form_id").references(() => forms.id),
    enabled: integer("enabled", {mode:"boolean"})
})
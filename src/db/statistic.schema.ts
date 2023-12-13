import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { forms } from "./form.schema";

export const statistics = sqliteTable("statistics", {
    id: integer("id").primaryKey(),
    date: integer("date", {mode:"timestamp_ms"}),
    form: integer("form_id").references(() => forms.id),
    data: text("data", {mode:"json"})
})
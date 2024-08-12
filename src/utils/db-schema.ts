import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const zapisy = pgTable("zapisy", {
  id: serial("id").primaryKey(),
  data: timestamp("data", { mode: "date" }).notNull(),
  licznik: integer("licznik").notNull(),
  paliwo: numeric("paliwo", { precision: 100 }).notNull(),
  platnosc: numeric("platnosc", { precision: 100 }).notNull(),
  cenaPaliwa: numeric("cenaPaliwa", { precision: 100 }).notNull(),
  spalanie: numeric("spalanie", { precision: 1000 }).notNull(),
});

export type zapisyType = typeof zapisy.$inferSelect;

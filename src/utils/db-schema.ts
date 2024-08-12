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
  licznik: numeric("licznik", { scale: 1 }).notNull(),
  paliwo: numeric("paliwo", { scale: 2 }).notNull(),
  platnosc: numeric("platnosc", { scale: 2 }).notNull(),
  cenaPaliwa: numeric("cenaPaliwa", { scale: 2 }).notNull(),
  spalanie: numeric("spalanie", { scale: 3 }).notNull(),
});

export type zapisyType = typeof zapisy.$inferSelect;

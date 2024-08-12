"use server";

import db from "@/utils/db";
import { wynikiType } from "./zapisy";
import { zapisy } from "@/utils/db-schema";
import { eq } from "drizzle-orm";

export async function dodajDoBazy(wynik: Omit<wynikiType, "Id">) {
  return await db
    .insert(zapisy)
    .values({
      data: wynik.Data,
      licznik: wynik.Licznik.toString(),
      paliwo: wynik.Paliwo.toString(),
      cenaPaliwa: wynik.CenaPaliwa.toString(),
      platnosc: wynik.Płatność.toString(),
      spalanie: wynik.Spalanie.toString(),
    })
    .returning({ insertedId: zapisy.id });
}

export async function usunZBazy(id: number) {
  await db.delete(zapisy).where(eq(zapisy.id, id));
}

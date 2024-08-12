import db from "@/utils/db";
import Zapisy, { Order, wynikiType } from "./zapisy";
import { asc } from "drizzle-orm";
import { zapisy as z } from "../../utils/db-schema";

export default async function PageZapisy() {
  const zapisy = await db.query.zapisy.findMany();

  return (
    <>
      <Zapisy default={zapisy} />
    </>
  );
}

import db from "@/utils/db";
import Zapisy, { Order, wynikiType } from "./zapisy";
import { asc } from "drizzle-orm";
import { zapisy as z } from "../../utils/db-schema";

export default async function PageZapisy({
  searchParams,
}: {
  searchParams: { sort: keyof wynikiType; order: Order };
}) {
  function getOrder() {
    switch (searchParams.order) {
      case Order.ROSNACO:
        switch (searchParams.sort) {
          case "CenaPaliwa":
            return asc(z.cenaPaliwa);

          default:
            break;
        }
        break;
      case Order.MALEJACO:
        break;
    }
  }
  const zapisy = await db.query.zapisy.findMany({ orderBy: getOrder() });
  console.log(searchParams);

  return (
    <>
      <Zapisy default={zapisy} />
    </>
  );
}

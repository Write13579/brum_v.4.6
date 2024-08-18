import db from "@/utils/db";
import Zapisy, { Order } from "./zapisy";
import { asc, desc } from "drizzle-orm";
import { zapisy as z, zapisyType } from "../../utils/db-schema";

export default async function PageZapisy({
  searchParams,
}: {
  searchParams: { sort: keyof zapisyType; order: Order };
}) {
  function getOrder() {
    switch (searchParams.order) {
      case "rosnąco":
        return asc(z[searchParams.sort]);

      case "malejąco":
        return desc(z[searchParams.sort]);
    }
  }
  const zapisy = await db.query.zapisy.findMany({ orderBy: getOrder() });
  console.log(getOrder(), searchParams);

  return (
    <>
      <Zapisy wyniki={zapisy} />
    </>
  );
}

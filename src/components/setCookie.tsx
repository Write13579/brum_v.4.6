"use server";

import { cookies } from "next/headers";

export default async function setCookie(pass: string) {
  let currentDate = new Date();
  let expirationDate = new Date();
  expirationDate.setHours(currentDate.getHours() + 1);

  cookies().set("cookiePassword", pass, { expires: expirationDate });
}

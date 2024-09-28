"use server";

import { cookies } from "next/headers";

export default async function deleteCookie(pass: string) {
  cookies().delete(pass);
}

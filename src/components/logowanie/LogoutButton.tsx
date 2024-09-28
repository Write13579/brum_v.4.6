"use client";

import deleteCookie from "../deleteCookie";

export default function LogoutButton() {
  return (
    <button
      className="flex justify-end items-center p-4"
      onClick={() => deleteCookie("cookiePassword")}
    >
      logout
    </button>
  );
}

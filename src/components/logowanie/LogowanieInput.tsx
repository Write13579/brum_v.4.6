"use client";

import { cookies } from "next/headers";
import { useState } from "react";
import setCookie from "../setCookie";

export default function LogowanieInput() {
  const [inputPassword, setinputPassword] = useState("");
  return (
    <div id="alles" className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl text-white">wprowadz haslo</h1>

      <input
        type="password"
        value={inputPassword}
        onChange={(e) => setinputPassword(e.target.value)}
      ></input>
      <button
        className="bg-red-600 px-7 py-1 mt-6 text-xl rounded-lg hover:bg-red-700 active:scale-95"
        onClick={() => setCookie(inputPassword)}
      >
        zatwierdz
      </button>
    </div>
  );
}

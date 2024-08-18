"use client";

import { useEffect, useRef, useState } from "react";

export default function Wordel() {
  const [slowo, setSlowo] = useState([]);
  const inpRef = useRef<(HTMLInputElement | null)[]>(new Array(5).fill(null));

  function zmianaOkna(idx: number) {
    if (inpRef.current[idx]?.value !== "") {
      if (idx < 4) {
        inpRef.current[idx + 1]!.focus();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      //const target = (event.target as HTMLInputElement).value;
      //console.log(target);

      const idx = parseInt(
        (event.target as HTMLInputElement).id.split("-")[1]!
      );
      //console.log((event.target as HTMLInputElement).id.split("-")[1]);

      if (key === "Backspace") {
        event.preventDefault();
        if ((event.target as HTMLInputElement).value !== "") {
          (event.target as HTMLInputElement).value = "";
        } else {
          inpRef.current[idx - 1]?.focus();
        }
      }
    });
  }, []);

  return (
    <div
      id="alles"
      className="flex justify-center items-center flex-col bg-gray-800 dark:bg-white p-8"
    >
      <div className="flex flex-col justify-center gap-3 text-white">
        <h1 className="font-bold text-4xl mb-8 drop-shadow-[0_0_10px_blue] text-center w-full animate-Shake">
          Wordel
        </h1>
        <div
          id="inputy"
          className="flex items-start flex-row gap-4 flex-wrap text-black text-center"
        >
          {[0, 1, 2, 3, 4].map((_, idx) => (
            <input
              id={`char-${idx}`}
              key={idx}
              maxLength={1}
              className="w-8 text-center"
              ref={(el) => {
                inpRef.current[idx] = el;
              }}
              onChange={() => zmianaOkna(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

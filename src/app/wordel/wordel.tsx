"use client";

import clsx from "clsx";
import { Literata } from "next/font/google";
import { useEffect, useRef, useState } from "react";

enum StatusType {
  zle = "red",
  istnieje = "yellow",
  dobre = "green",
}

type LiteraType = {
  litera: string;
  status: StatusType;
};

export default function Wordel() {
  const [zgadywane, setZgadywane] = useState<LiteraType[][]>([[]]);
  const [slowo, setSlowo] = useState<LiteraType[]>([
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
  ]);
  const inpRef = useRef<(HTMLInputElement | null)[]>(new Array(5).fill(null));

  const haslo = "niger";

  function ustawKolory() {
    const l1 = inpRef.current[0] as HTMLInputElement;
    const l2 = inpRef.current[1] as HTMLInputElement;
    const l3 = inpRef.current[2] as HTMLInputElement;
    const l4 = inpRef.current[3] as HTMLInputElement;
    const l5 = inpRef.current[4] as HTMLInputElement;
    const guess = [l1.value, l2.value, l3.value, l4.value, l5.value];
    const tablicaHaslo = haslo.split("");

    let wynik = [
      StatusType.zle,
      StatusType.zle,
      StatusType.zle,
      StatusType.zle,
      StatusType.zle,
    ];

    for (let i = 0; i < tablicaHaslo.length; i++) {
      if (guess[i] === tablicaHaslo[i]) {
        wynik[i] = StatusType.dobre;
      }
    }

    for (let i = 0; i < tablicaHaslo.length; i++) {
      if (tablicaHaslo.includes(guess[i]) && guess[i] !== tablicaHaslo[i]) {
        wynik[i] = StatusType.istnieje;
      }
    }

    return wynik;
  }

  function zmianaOkna(idx: number) {
    const slowo = inpRef.current.map((input, index) => ({
      litera: (input as HTMLInputElement).value,
      status: ustawKolory()[index],
    }));

    setSlowo(slowo);

    if (inpRef.current[idx]!.value === "") {
      if (idx > 0) {
        inpRef.current[idx - 1]!.focus();
      }
    } else if (inpRef.current[idx]!.value !== "") {
      if (idx < 4) {
        inpRef.current[idx + 1]!.focus();
      }
    }
  }

  function sprawdz() {
    setZgadywane((p) => [...p, slowo]);
    /*for (let index = 0; index < slowo.length; index++) {
      slowo[index].litera = "";
    }*/
  }

  return (
    <div
      id="alles"
      className="flex justify-center items-center flex-col bg-gray-800 dark:bg-white p-8"
    >
      <div className="flex flex-col justify-center gap-3 text-white">
        <h1 className="font-bold text-4xl mb-8 drop-shadow-[0_0_10px_blue] text-center w-full animate-Shake">
          Wordel
        </h1>
        <div id="odpowiedzi">
          {zgadywane.map((slowo, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-row mb-5 justify-center gap-3"
              >
                {slowo.map((litera, idx) => {
                  return (
                    <div
                      className={clsx("flex flex-row border-2 gap-10 p-2", {
                        "border-red-500": litera.status === StatusType.zle,
                        "border-yellow-400":
                          litera.status === StatusType.istnieje,
                        "border-green-500": litera.status === StatusType.dobre,
                      })}
                      key={idx}
                    >
                      {litera.litera}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="inputy" className="flex items-start flex-row gap-4 flex-wrap">
          {slowo.map((_, idx) => (
            <input
              id={`char-${idx}`}
              key={idx}
              maxLength={1}
              className="w-8 text-center text-black"
              ref={(el) => {
                inpRef.current[idx] = el;
              }}
              onChange={(e) => {
                e.target.value;
                zmianaOkna(idx);
              }}
              value={slowo[idx].litera}
            />
          ))}
        </div>
        <button
          className="hover:cursor-pointer border-2 active:scale-90"
          onClick={sprawdz}
        >
          sprawdź
        </button>
      </div>
    </div>
  );
}

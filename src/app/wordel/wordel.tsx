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
  status?: StatusType;
};

export default function Wordel() {
  async function giveMeWord(dlugoscSlowa: number) {
    const url = `https://random-word-api.vercel.app/api?words=1&length=${dlugoscSlowa}`;
    const res = await fetch(url);

    if (res.ok) {
      const data = await res.json();
      const haslo: string = data.toString();
      console.log(haslo);

      return haslo;
    }
    return null;
  }

  const [haslo, setHaslo] = useState<string>("niger");

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [zgadywane, setZgadywane] = useState<LiteraType[][]>([[]]);
  const [slowo, setSlowo] = useState<LiteraType[]>([
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
    { litera: "", status: StatusType.zle },
  ]);
  const inpRef = useRef<(HTMLInputElement | null)[]>(new Array(5).fill(null));

  function zmianaOkna(idx: number) {
    const slowo = inpRef.current.map((input, index) => ({
      litera: (input as HTMLInputElement).value,
      //status: sprawdz()[index],
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

    let guess = slowo.map((l) => l.litera);

    let tablicaHaslo = haslo.split("");

    for (let i = 0; i < tablicaHaslo.length; i++) {
      //gdy na dobrym miejscu
      if (guess[i] === tablicaHaslo[i]) {
        //aktualizacja statusu (kolor)
        setSlowo((p) => {
          const aktualizuj = [...p];
          aktualizuj[i].status = StatusType.dobre;
          return aktualizuj;
        });
        tablicaHaslo[i] = "0";
      } else {
        setSlowo((p) => {
          const aktualizuj = [...p];
          aktualizuj[i].status = StatusType.zle;
          return aktualizuj;
        });
      }
    }

    for (let i = 0; i < tablicaHaslo.length; i++) {
      if (tablicaHaslo.includes(guess[i]) && guess[i] !== tablicaHaslo[i]) {
        setSlowo((p) => {
          const aktualizuj = [...p];
          aktualizuj[i].status = StatusType.istnieje;
          return aktualizuj;
        });
        tablicaHaslo[tablicaHaslo.indexOf(guess[i])] = "0"; //gpt: Oznaczamy literę, aby nie była ponownie sprawdzana
      }
    }
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
        <button
          onClick={async () => {
            const roboczeHaslo = await giveMeWord(5);
            if (roboczeHaslo) {
              setHaslo(roboczeHaslo);
            }
          }}
        >
          losuj slowo
        </button>
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

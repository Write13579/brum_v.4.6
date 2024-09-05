"use client";

/* SPALANIE */

import { useEffect, useState } from "react";
import UnitInput from "../components/unit-input";
import { clsx } from "clsx";

enum PreserColor {
  GREEN,
  YELLOW,
  RED,
}
const presetTablica = [
  { label: "🚄", value: 6, color: PreserColor.GREEN },
  { label: "🏙️", value: 7.2, color: PreserColor.YELLOW },
  { label: "❄️", value: 8.5, color: PreserColor.RED },
];

export default function Spalanie() {
  type InputsType = {
    spalanie: number;
    cena: number;
    odlegosc: number;
    osoby: number;
    procent: number;
    parkingi: number;
    autostrada: number;
  };
  const [inputs, setInputs] = useState<InputsType>({
    spalanie: 0,
    cena: 0.01,
    odlegosc: 0.5,
    osoby: 1,
    procent: 0,
    parkingi: 0,
    autostrada: 0,
  });

  const [results, setResults] = useState<{
    spalaniePerOsoba?: number;
    caloscBez?: number;
    caloscZ?: number;
    zaOsobe?: number;
  }>({});

  useEffect(() => {
    const spalaniePerOsoba = (inputs.spalanie * inputs.procent) / 100;
    const caloscZ =
      ((inputs.spalanie + spalaniePerOsoba * inputs.osoby) / 100) *
        inputs.odlegosc *
        inputs.cena +
      inputs.parkingi +
      inputs.autostrada;
    setResults({
      spalaniePerOsoba,
      caloscBez: (inputs.spalanie / 100) * inputs.odlegosc * inputs.cena,
      caloscZ,
      zaOsobe: caloscZ / inputs.osoby,
    });
  }, [inputs]);

  return (
    <div
      id="alles"
      className="flex justify-center items-center flex-col bg-gray-800 dark:bg-white p-8"
    >
      <div className="max-w-[480px] flex flex-col justify-center items-start gap-3 text-white">
        <h1 className="font-bold text-4xl mb-8 drop-shadow-[0_0_10px_green] text-center w-full animate-Shake">
          Kalkulator wycieczkowy
        </h1>
        <div id="spalanie" className="flex flex-col gap-2">
          <UnitInput
            id="inpSpalanie"
            label="Średnie spalanie"
            unit="l/100km"
            type="number"
            min="0"
            step="0.5"
            value={inputs.spalanie}
            onChange={(e) =>
              setInputs((i) => ({ ...i, spalanie: parseFloat(e.target.value) }))
            }
          />

          <div
            id="emoji"
            className="flex justify-center mt-1 gap-2 items-center"
          >
            {presetTablica.map((element) => (
              <button
                onClick={() =>
                  setInputs((i) => ({ ...i, spalanie: element.value }))
                }
                className={clsx(
                  "border rounded-md p-1 w-full text-[1.4rem] transition-colors group",
                  {
                    "bg-green-300/20 border-green-300/30 hover:bg-green-300/40":
                      element.color === PreserColor.GREEN,
                    "bg-yellow-300/20 border-yellow-300/30 hover:bg-yellow-300/40":
                      element.color === PreserColor.YELLOW,
                    "bg-red-300/20 border-red-300/30 hover:bg-red-300/40":
                      element.color === PreserColor.RED,
                  }
                )}
                key={element.value}
              >
                <div className="group-active:skew-y-12 transition-transform">
                  {element.label}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div id="cena">
          <UnitInput
            id="inpCena"
            unit="zł/l"
            label="Cena paliwa"
            type="number"
            min="0"
            step="0.1"
            value={inputs.cena}
            onChange={(e) =>
              setInputs((i) => ({ ...i, cena: parseFloat(e.target.value) }))
            }
          />
        </div>
        <div id="odleglosc">
          <UnitInput
            id="inpOdleglosc"
            unit="km"
            label="Odległość"
            type="number"
            min="0"
            value={inputs.odlegosc}
            onChange={(e) =>
              setInputs((i) => ({ ...i, odlegosc: parseFloat(e.target.value) }))
            }
          />
        </div>
        <div id="osoby" className="flex items-center gap-4">
          <UnitInput
            id="inpOsoby"
            unit={(() => {
              if (inputs.osoby === 1) return "osoba";
              if (inputs.osoby > 1 && inputs.osoby < 5) return "osoby";
              return "osób";
            })()}
            label="Liczba osób"
            type="number"
            min="1"
            max="5"
            value={inputs.osoby}
            onChange={(e) =>
              setInputs((i) => ({ ...i, osoby: parseFloat(e.target.value) }))
            }
          />

          <div className="flex items-center text-sm">
            {Array.from({ length: inputs.osoby }).map((_, i) => (
              <div key={i} className="animate-bounce">
                👤
              </div>
            ))}
          </div>
        </div>
        <div id="procent" className="flex items-center gap-4">
          <UnitInput
            id="inpProcent"
            unit="%"
            label="Procent za osobę"
            type="number"
            min="0"
            step="0.5"
            max={199.99}
            value={inputs.procent}
            onChange={(e) =>
              setInputs((i) => ({ ...i, procent: parseFloat(e.target.value) }))
            }
          />

          <span className="group relative text-red-600 cursor-pointer">
            🛈
            <span className="group-hover:opacity-100 opacity-0 absolute -right-9 mb-1 top-6 transition-opacity text-black font-bold px-2 bg-white rounded-md">
              waga/10
            </span>
          </span>
        </div>
        <div id="parkingi">
          <UnitInput
            id="inpParkingi"
            unit="zł"
            label="Parkingi"
            type="number"
            min="0"
            value={inputs.parkingi}
            onChange={(e) =>
              setInputs((i) => ({ ...i, parkingi: parseFloat(e.target.value) }))
            }
          />
        </div>
        <div id="autostrada">
          <UnitInput
            id="inpAutostrada"
            unit="zł"
            label="Autostrada"
            type="number"
            min="0"
            value={inputs.autostrada}
            onChange={(e) =>
              setInputs((i) => ({
                ...i,
                autostrada: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div
          id="outputs"
          className="mt-12 grid grid-cols-2 grid-rows-2 w-full gap-4"
        >
          {[
            {
              label: "Spalanie na osobę",
              value: !isNaN(results.spalaniePerOsoba ?? NaN)
                ? results.spalaniePerOsoba!.toFixed(3)
                : "0.000",
              unit: "l/100km",
              color: "#93c5fd",
            },
            {
              label: "Całość (bez osób)",
              value: !isNaN(results.caloscBez ?? NaN)
                ? results.caloscBez!.toFixed(2)
                : "0.00",
              unit: "zł",
              color: "#fca5a5",
            },
            {
              label: "Całość (z osobami)",
              value: !isNaN(results.caloscZ ?? NaN)
                ? results.caloscZ!.toFixed(2)
                : "0.00",
              unit: "zł",
              color: "#86efac",
            },
            {
              label: "Za osobę",
              value: !isNaN(results.zaOsobe ?? NaN)
                ? results.zaOsobe!.toFixed(2)
                : "0.00",
              unit: "zł",
              color: "#d8b4fe",
            },
          ].map((resultBock) => (
            <div
              key={resultBock.label}
              className="bg-white/10 rounded-md w-full h-full flex flex-col items-start justify-center p-4 gap-2"
            >
              <label>{resultBock.label}</label>
              <div>
                <span
                  className="font-bold text-3xl"
                  style={{ color: resultBock.color }}
                >
                  {resultBock.value}
                </span>
                <span className="ml-2 text-sm text-white/50">
                  {resultBock.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

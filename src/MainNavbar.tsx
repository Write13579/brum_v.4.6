"use client";

import { Popover } from "@radix-ui/react-popover";
import React, { useState } from "react";
import { PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function MainNavbar() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Popover open={opened} onOpenChange={setOpened}>
        <PopoverTrigger>
          <Menu />
        </PopoverTrigger>
        <PopoverContent>
          <nav className="w-full p-4 flex gap-6 bg-gray-950/50 rounded-b-xl rounded-r-xl text-white">
            <Link
              onClick={() => setOpened(false)}
              className="hover:drop-shadow-[0_0_5px_white] transition-all"
              href="/"
            >
              Kalkulator
            </Link>
            <Link
              onClick={() => setOpened(false)}
              className="hover:drop-shadow-[0_0_5px_white] transition-all"
              href="/zapisy"
            >
              Zapisy
            </Link>
            <Link
              onClick={() => setOpened(false)}
              className="hover:drop-shadow-[0_0_5px_white] transition-all"
              href="/wordel"
            >
              Wordel
            </Link>
          </nav>
        </PopoverContent>
      </Popover>
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Menu } from "lucide-react";
import MainNavbar from "@/MainNavbar";
import clsx from "clsx";
import { cookies } from "next/headers";
import deleteCookie from "@/components/deleteCookie";
import LogoutButton from "@/components/logowanie/LogoutButton";
import LogowanieInput from "@/components/logowanie/LogowanieInput";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brum v4.6",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cookiePassword = cookieStore.get("cookiePassword")?.value;
  const loggedIn = cookiePassword === process.env.envPassword;
  // console.log(
  //   "cookiepass " + cookiePassword + "envpass " + process.env.envPassword
  // );

  if (loggedIn) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="text-white grid grid-cols-3 grid-rows-1 sticky left-0 top-0 z-10 bg-gray-950/90 backdrop-blur-md text-xs md:text-sm xl:text-xl hover:drop-shadow-[0_0_5px_white] transition-all">
            <MainNavbar />

            <h1 className=" cursor-default flex justify-center items-center text-2xl drop-shadow-[0_0_5px_white] shadow-white hover:drop-shadow-[0_0_5px_black] transition-all">
              BRUM v4.6
            </h1>
            <LogoutButton />
          </div>
          {children}
          <Toaster />
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body
          className={clsx(
            inter.className,
            "flex justify-center items-center flex-col bg-gray-800 dark:bg-white p-8"
          )}
        >
          <LogowanieInput />
        </body>
      </html>
    );
  }
}

import type { Metadata } from "next";
import Link from "next/link";
import { dmSans, manrope } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — SINT S.r.l.",
};

// 404 per gli URL che non corrispondono a nessuna rotta (fuori dal segmento [locale]).
export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${dmSans.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen items-center bg-paper">
        <main className="container-site text-center">
          <p className="font-display text-[clamp(80px,12vw,160px)] leading-none font-bold tracking-[-0.08em] text-brand">
            404
          </p>
          <h1 className="mt-4 text-[clamp(28px,3vw,38px)] leading-[1.1] tracking-[-0.05em]">
            Pagina non trovata
          </h1>
          <p className="mt-2 text-muted" lang="en">
            Page not found
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex bg-brand px-[19px] py-[15px] text-[13px] font-bold text-white"
          >
            sintsrl.it
          </Link>
        </main>
      </body>
    </html>
  );
}

import localFont from "next/font/local";

// Font ospitati nel sito (nessuna richiesta a Google Fonts). Licenza OFL nella cartella fonts.
export const dmSans = localFont({
  src: "./fonts/DMSans-Variable.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

export const manrope = localFont({
  src: "./fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

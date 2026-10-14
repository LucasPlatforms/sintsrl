import type { AppPathname } from "@/i18n/routing";

/** Voci del menu principale. `key` corrisponde a nav.<key> in messages/<lingua>.json. */
export const mainNav = [
  { href: "/chi-siamo", key: "about" },
  { href: "/servizi", key: "services" },
  { href: "/clienti", key: "clients" },
  { href: "/contatti", key: "contact" },
] as const satisfies ReadonlyArray<{
  href: AppPathname;
  key: "about" | "services" | "clients" | "contact";
}>;

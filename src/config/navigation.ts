import type { Locale } from "next-intl";

export type SectionKey = "about" | "services" | "clients" | "contact";

/**
 * Ancore delle sezioni della pagina, tradotte per lingua:
 * sintsrl.it/#servizi  ·  sintsrl.it/en#services
 */
export const sectionIds = {
  about: { it: "chi-siamo", en: "about-us" },
  services: { it: "servizi", en: "services" },
  clients: { it: "clienti", en: "clients" },
  contact: { it: "contatti", en: "contact" },
} as const satisfies Record<SectionKey, Record<Locale, string>>;

/** Voci del menu, nell'ordine in cui compaiono. L'etichetta è nav.<key> in messages/<lingua>.json. */
export const mainNav: readonly SectionKey[] = ["about", "services", "clients", "contact"];

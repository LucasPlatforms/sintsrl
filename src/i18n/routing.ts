import { defineRouting } from "next-intl/routing";

/**
 * Configurazione delle lingue e degli URL.
 *
 * - L'italiano è la lingua principale e non ha prefisso: sintsrl.it/chi-siamo
 * - Le altre lingue hanno il prefisso: sintsrl.it/en/about-us
 * - Nessun redirect automatico in base alla lingua del browser:
 *   la lingua dipende solo dall'URL.
 *
 * Per aggiungere una lingua: aggiungila a `locales`, crea messages/<lingua>.json
 * e aggiungi lo slug tradotto di ogni pagina in `pathnames`.
 */
export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "as-needed",
  localeDetection: false,
  // Senza rilevamento automatico il cookie della lingua non serve:
  // così i link verso l'italiano puntano direttamente all'URL senza prefisso.
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/chi-siamo": { it: "/chi-siamo", en: "/about-us" },
    "/servizi": { it: "/servizi", en: "/services" },
    "/clienti": { it: "/clienti", en: "/clients" },
    "/contatti": { it: "/contatti", en: "/contact" },
    "/privacy": { it: "/privacy", en: "/privacy" },
    "/cookie-policy": { it: "/cookie-policy", en: "/cookie-policy" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

import { defineRouting } from "next-intl/routing";

/**
 * Configurazione delle lingue e degli URL.
 *
 * - L'italiano è la lingua principale e non ha prefisso: sintsrl.it/privacy
 * - Le altre lingue hanno il prefisso: sintsrl.it/en/privacy
 * - Nessun redirect automatico in base alla lingua del browser:
 *   la lingua dipende solo dall'URL.
 *
 * Per aggiungere una lingua: aggiungila a `locales`, crea messages/<lingua>.json
 * e aggiungi lo slug tradotto di ogni pagina in `pathnames` e di ogni ancora
 * in src/config/navigation.ts.
 */
export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "as-needed",
  localeDetection: false,
  // Senza rilevamento automatico il cookie della lingua non serve:
  // così i link verso l'italiano puntano direttamente all'URL senza prefisso.
  localeCookie: false,
  // Il sito è una pagina unica: le sezioni si raggiungono con le ancore
  // (vedi src/config/navigation.ts). Qui restano solo le pagine separate.
  pathnames: {
    "/": "/",
    "/privacy": { it: "/privacy", en: "/privacy" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

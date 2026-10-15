/**
 * Dati aziendali uguali in tutte le lingue.
 * I testi traducibili stanno invece in messages/<lingua>.json.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sintsrl.it",
  legalName: "SINT S.r.l.",
  foundingYear: 1990,
  address: {
    street: "Via Solferino, 81",
    postalCode: "20821",
    city: "Meda",
    province: "MB",
    country: "IT",
  },
  phone: {
    display: "0362 1545393",
    href: "tel:+3903621545393",
    international: "+39 0362 1545393",
  },
  mobile: {
    display: "348 248 8974",
    href: "tel:+393482488974",
  },
  email: "info@sintsrl.it",
  vatNumber: "02011550965",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Via+Solferino+81+20821+Meda+MB",
} as const;

/** Codici locale per Open Graph. */
export const ogLocales = {
  it: "it_IT",
  en: "en_GB",
} as const;

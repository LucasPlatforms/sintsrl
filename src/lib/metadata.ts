import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ogLocales } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

type BuildMetadataOptions = {
  pathname: AppPathname;
  /** Titolo della pagina (senza nome azienda). Omesso in home. */
  title?: string;
  description?: string;
};

/**
 * Metadata di una pagina: titolo, descrizione, URL canonico,
 * link alle versioni nelle altre lingue (hreflang) e Open Graph.
 */
export async function buildMetadata({
  pathname,
  title,
  description,
}: BuildMetadataOptions): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("metadata");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: pathname })]),
  );
  const finalDescription = description ?? t("description");

  return {
    // In home il titolo è quello completo; nelle altre pagine "Titolo | SINT S.r.l.".
    title: title ?? { absolute: t("title") },
    description: finalDescription,
    alternates: {
      canonical: languages[locale],
      languages: {
        ...languages,
        "x-default": languages[routing.defaultLocale],
      },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: ogLocales[locale],
      url: languages[locale],
      title: title ? `${title} | ${t("siteName")}` : t("title"),
      description: finalDescription,
      // Immagine mostrata quando si condivide un link al sito (WhatsApp, LinkedIn…): public/og-image.png.
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: t("siteName") },
      ],
    },
  };
}

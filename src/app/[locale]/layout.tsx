import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import { dmSans, manrope } from "../fonts";
import "../globals.css";

// Genera in fase di build una versione statica del sito per ogni lingua.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    applicationName: t("siteName"),
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${dmSans.variable} ${manrope.variable}`}>
      <body id="top">
        {/* Al browser arrivano solo i testi che servono ai componenti interattivi
            (menu e selettore lingua); il resto della pagina è già HTML. */}
        <NextIntlClientProvider messages={{ nav: messages.nav, languages: messages.languages }}>
          <Header />
          <main id="contenuto">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

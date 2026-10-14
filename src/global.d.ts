import type { routing } from "@/i18n/routing";
import type messages from "../messages/it.json";

// Tipizza lingue e testi: useTranslations/getMessages accettano solo chiavi esistenti
// e i componenti ricevono la struttura dei contenuti con i tipi corretti.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}

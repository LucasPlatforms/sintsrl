import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Instrada le richieste verso la lingua giusta e traduce gli slug
// (es. /en/privacy viene servito da app/[locale]/privacy, / da app/[locale] in italiano).
export default createMiddleware(routing);

export const config = {
  // Tutti i percorsi tranne file statici, API e risorse interne di Next.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";

// sitemap.xml con tutte le pagine in tutte le lingue e i relativi hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const pathnames = Object.keys(routing.pathnames) as AppPathname[];

  return pathnames.flatMap((pathname) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(getPathname({ locale, href: pathname }), site.url).toString(),
      ]),
    );

    return routing.locales.map((locale) => ({
      url: languages[locale],
      alternates: { languages },
    }));
  });
}

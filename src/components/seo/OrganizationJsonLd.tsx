import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";

/** Dati strutturati per Google (scheda azienda). */
export async function OrganizationJsonLd() {
  const t = await getTranslations("metadata");

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    legalName: site.legalName,
    description: t("description"),
    url: site.url,
    email: site.email,
    telephone: site.phone.international,
    foundingDate: String(site.foundingYear),
    vatID: `IT${site.vatNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      addressCountry: site.address.country,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

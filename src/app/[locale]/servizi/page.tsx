import { getTranslations } from "next-intl/server";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("pages.services");
  return buildMetadata({ pathname: "/servizi", title: t("title"), description: t("description") });
}

export default function ServicesPage() {
  return <ServicesSection asPage />;
}

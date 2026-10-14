import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("pages.contact");
  return buildMetadata({ pathname: "/contatti", title: t("title"), description: t("description") });
}

export default function ContactPage() {
  return <ContactSection asPage />;
}

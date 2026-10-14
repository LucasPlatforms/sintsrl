import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/components/sections/AboutSection";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("pages.about");
  return buildMetadata({ pathname: "/chi-siamo", title: t("title"), description: t("description") });
}

export default function AboutPage() {
  return <AboutSection asPage />;
}

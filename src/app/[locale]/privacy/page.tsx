import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("pages.privacy");
  return buildMetadata({ pathname: "/privacy", title: t("title"), description: t("description") });
}

export default function PrivacyPage() {
  return <LegalPage page="privacy" />;
}

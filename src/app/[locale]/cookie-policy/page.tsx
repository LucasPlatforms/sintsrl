import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("pages.cookies");
  return buildMetadata({
    pathname: "/cookie-policy",
    title: t("title"),
    description: t("description"),
  });
}

export default function CookiePolicyPage() {
  return <LegalPage page="cookies" />;
}

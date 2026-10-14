import { getTranslations } from "next-intl/server";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("pages.clients");
  return buildMetadata({ pathname: "/clienti", title: t("title"), description: t("description") });
}

export default function ClientsPage() {
  return <ClientsSection asPage />;
}

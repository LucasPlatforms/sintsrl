import { AboutSection } from "@/components/sections/AboutSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return buildMetadata({ pathname: "/" });
}

// Pagina unica: il menu porta alle sezioni tramite ancore (src/config/navigation.ts).
export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <ContactSection />
    </>
  );
}

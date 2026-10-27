import { getTranslations } from "next-intl/server";
import { ChevronUp } from "lucide-react";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "./BrandMark";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const { address } = site;

  return (
    <footer className="bg-night py-9 text-white">
      <div className="container-site flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-5">
        <BrandMark label={tNav("homeLabel")} inverse />

        <div className="flex flex-col gap-[3px] text-[10px] text-[#93a097] xs:text-[11px]">
          <span className="text-xs font-bold text-white">{site.legalName}</span>
          <span>
            {address.street} — {address.postalCode} {address.city} (
            {address.province})
          </span>
          <span>
            {t("vatLabel")} {site.vatNumber}
          </span>
        </div>

        <div className="order-last flex gap-5 md:order-none">
          <Link
            href="/privacy"
            className="text-[11px] text-[#aeb8b1] underline underline-offset-3 transition-colors hover:text-mint"
          >
            {t("privacy")}
          </Link>
        </div>

        <a
          href="#top"
          className="flex items-center gap-[7px] text-[11px] tracking-[0.1em] text-[#aeb8b1] uppercase"
        >
          {t("backToTop")}{" "}
          <ChevronUp size={16} className="text-mint" aria-hidden />
        </a>
      </div>
    </footer>
  );
}

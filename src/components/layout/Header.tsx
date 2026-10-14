"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { getPathname, Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";

export function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const otherLocales = routing.locales.filter((l) => l !== locale);

  return (
    <header className="absolute inset-x-0 top-0 z-10 flex h-[72px] items-center border-b border-ink/8 bg-paper/90 backdrop-blur-md md:h-[82px]">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <div className="container-site flex items-center justify-between">
        <BrandMark label={t("homeLabel")} onClick={closeMenu} />

        <nav
          id="menu-principale"
          aria-label={t("mainNav")}
          className={cn(
            menuOpen ? "flex" : "hidden",
            "absolute inset-x-0 top-[72px] flex-col items-stretch border-b border-line bg-paper px-5 pt-2.5 pb-5 text-sm font-semibold text-ink-soft",
            "md:static md:flex md:flex-row md:items-center md:gap-[34px] md:border-0 md:bg-transparent md:p-0",
          )}
        >
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative border-b border-line py-[15px] transition-colors hover:text-brand md:border-0 md:py-0",
                  active &&
                    "text-brand md:after:absolute md:after:inset-x-0 md:after:-bottom-1.5 md:after:h-0.5 md:after:bg-brand md:after:content-['']",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}

          {/* Link diretto alla stessa pagina nell'altra lingua (URL definitivo, senza redirect).
              Un <a> semplice ricarica la pagina, cosa corretta perché cambia la lingua del documento. */}
          {otherLocales.map((l) => (
            <a
              key={l}
              href={getPathname({ locale: l, href: pathname })}
              hrefLang={l}
              lang={l}
              onClick={closeMenu}
              aria-label={`${t("switchLanguage")}: ${tLang(l)}`}
              className="border-b border-line py-[15px] text-[13px] font-bold tracking-[0.08em] uppercase transition-colors hover:text-brand md:border-0 md:py-0"
            >
              {l}
            </a>
          ))}

          <Link
            href="/contatti"
            onClick={closeMenu}
            className="mt-3 inline-flex items-center justify-center gap-2 bg-ink px-[17px] py-3 text-white transition-colors hover:bg-ink-soft md:mt-0"
          >
            {t("cta")} <ArrowUpRight size={16} aria-hidden />
          </Link>
        </nav>

        <button
          type="button"
          className="p-2 text-ink md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="menu-principale"
        >
          {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </div>
    </header>
  );
}

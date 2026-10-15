"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav, sectionIds, type SectionKey } from "@/config/navigation";
import { getPathname, Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";

const isSectionKey = (value: string | undefined): value is SectionKey =>
  mainNav.some((key) => key === value);

/**
 * Evidenzia nel menu la sezione visibile al centro dello schermo.
 * Le sezioni sono riconosciute dall'attributo data-section.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const key = (entry.target as HTMLElement).dataset.section;
          setActive(isSectionKey(key) ? key : null);
        }
      },
      // Una sezione è "attiva" quando attraversa la fascia centrale della finestra.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const otherLocales = routing.locales.filter((l) => l !== locale);

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-[72px] items-center border-b border-ink/8 bg-paper/90 backdrop-blur-md md:h-[82px]">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-40 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
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
          {/* Le voci portano alle sezioni della home; da privacy/cookie tornano alla home e scorrono. */}
          {mainNav.map((key) => {
            const active = activeSection === key;
            return (
              <Link
                key={key}
                href={{ pathname: "/", hash: sectionIds[key][locale] }}
                replace={isHome}
                onClick={closeMenu}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative border-b border-line py-[15px] transition-colors hover:text-brand md:border-0 md:py-0",
                  active &&
                    "text-brand md:after:absolute md:after:inset-x-0 md:after:-bottom-1.5 md:after:h-0.5 md:after:bg-brand md:after:content-['']",
                )}
              >
                {t(key)}
              </Link>
            );
          })}

          {/* Stessa pagina (e stessa sezione) nell'altra lingua, con l'URL definitivo.
              Un <a> semplice ricarica la pagina, cosa corretta perché cambia la lingua del documento. */}
          {otherLocales.map((l) => {
            const hash =
              isHome && activeSection ? `#${sectionIds[activeSection][l]}` : "";
            return (
              <a
                key={l}
                href={`${getPathname({ locale: l, href: pathname })}${hash}`}
                hrefLang={l}
                lang={l}
                onClick={closeMenu}
                aria-label={`${t("switchLanguage")}: ${tLang(l)}`}
                className="border-b border-line py-[15px] text-[13px] font-bold tracking-[0.08em] uppercase transition-colors hover:text-brand md:border-0 md:py-0"
              >
                {l}
              </a>
            );
          })}

          <Link
            href={{ pathname: "/", hash: sectionIds.contact[locale] }}
            replace={isHome}
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
          {menuOpen ? (
            <X size={24} aria-hidden />
          ) : (
            <Menu size={24} aria-hidden />
          )}
        </button>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
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

type Indicator = {
  x: number;
  y: number;
  width: number;
  visible: boolean;
  animate: boolean;
};

/**
 * Posizione della linea verde sotto la voce attiva del menu (solo desktop).
 * È una sola linea che scorre da una voce all'altra invece di comparire a scatto;
 * quando nessuna sezione è attiva (in cima alla pagina) sparisce in dissolvenza.
 */
function useNavIndicator(
  navRef: RefObject<HTMLElement | null>,
  activeKey: SectionKey | null,
) {
  const [indicator, setIndicator] = useState<Indicator>({
    x: 0,
    y: 0,
    width: 0,
    visible: false,
    animate: false,
  });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const update = () => {
      const link = activeKey
        ? nav.querySelector<HTMLElement>(`[data-nav="${activeKey}"]`)
        : null;
      // Nessuna voce attiva, oppure menu mobile chiuso: la linea si nasconde dove si trova.
      if (!link || link.offsetWidth === 0) {
        setIndicator((prev) => ({ ...prev, visible: false, animate: false }));
        return;
      }
      const navBox = nav.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();
      setIndicator((prev) => ({
        x: linkBox.left - navBox.left,
        y: linkBox.bottom - navBox.top + 6,
        width: linkBox.width,
        visible: true,
        // Scorre solo se era già visibile; se riappare, compare sotto la voce giusta.
        animate: prev.visible,
      }));
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    // I font caricati dopo cambiano la larghezza delle voci.
    document.fonts.ready.then(update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [navRef, activeKey]);

  return indicator;
}

export function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const navRef = useRef<HTMLElement>(null);
  const indicator = useNavIndicator(navRef, activeSection);
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
          ref={navRef}
          aria-label={t("mainNav")}
          className={cn(
            "absolute inset-x-0 top-[72px] flex flex-col items-stretch border-b border-line bg-paper px-5 pt-2.5 pb-5 text-sm font-semibold text-ink-soft",
            // Mobile: il menu si apre e si chiude a tendina (scende e compare in dissolvenza).
            // `invisible` da chiuso lo toglie anche dalla navigazione con tastiera e screen reader.
            "transition-[clip-path,opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none",
            menuOpen
              ? "visible translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]"
              : "invisible -translate-y-2 opacity-0 [clip-path:inset(0_0_100%_0)]",
            "md:visible md:relative md:top-0 md:translate-y-0 md:flex-row md:items-center md:gap-[34px] md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:transition-none md:[clip-path:none]",
          )}
        >
          {/* Le voci portano alle sezioni della home; da privacy tornano alla home e scorrono. */}
          {mainNav.map((key) => {
            const active = activeSection === key;
            return (
              <Link
                key={key}
                href={{ pathname: "/", hash: sectionIds[key][locale] }}
                replace={isHome}
                onClick={closeMenu}
                aria-current={active ? "true" : undefined}
                data-nav={key}
                className={cn(
                  "relative border-b border-line py-[15px] transition-colors hover:text-brand md:border-0 md:py-0",
                  active && "text-brand",
                )}
              >
                {t(key)}
              </Link>
            );
          })}

          {/* Linea verde sotto la voce attiva: scorre tra le voci (solo desktop). */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-0 left-0 hidden h-0.5 bg-brand md:block motion-reduce:transition-none",
              indicator.animate
                ? "transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : "transition-opacity duration-300",
            )}
            style={{
              width: indicator.width,
              transform: `translate(${indicator.x}px, ${indicator.y}px)`,
              opacity: indicator.visible ? 1 : 0,
            }}
          />

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

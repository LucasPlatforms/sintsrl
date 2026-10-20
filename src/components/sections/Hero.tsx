import Image from "next/image";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { sectionIds } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import heroCover from "@/assets/hero-cover.jpg";

export async function Hero() {
  const { hero } = await getMessages();
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const [titleFirst, ...titleRest] = hero.title;

  return (
    <section
      data-section="hero"
      className="relative flex min-h-[710px] items-start overflow-hidden bg-paper pb-[170px] md:min-h-[720px] md:items-center md:pb-0"
    >
      <Image
        src={heroCover}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-contain object-center"
      />

      <div aria-hidden className="hero-veil absolute inset-0" />

      <div
        aria-hidden
        className="hero-panel absolute inset-x-0 bottom-0 h-[140px] [clip-path:polygon(19%_0,100%_0,100%_100%,0_100%)] md:inset-y-0 md:right-0 md:left-[52%] md:h-auto md:[clip-path:polygon(23%_0,100%_0,100%_100%,0_100%)]"
      />

      <div className="relative container-site pt-[147px] md:pt-[82px]">
        <h1 className="max-w-[700px] text-[clamp(52px,7vw,92px)] leading-[0.98] font-bold tracking-[-0.07em]">
          {titleFirst}
          <span className="block text-brand">{titleRest.join(" ")}</span>
        </h1>

        <p className="mt-[29px] mb-[38px] max-w-[520px] border-l-4 border-brand bg-paper/85 py-4 pr-5 pl-5 text-[20px] leading-[1.45] font-medium text-ink backdrop-blur-sm md:text-[20px]">
          {t.rich("copy", {
            year: String(site.foundingYear),
            highlight: (chunks) => (
              <strong className="font-bold whitespace-nowrap text-brand">
                {chunks}
              </strong>
            ),
          })}
        </p>

        <div className="flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-7">
          <Link
            href={{ pathname: "/", hash: sectionIds.services[locale] }}
            replace
            className="inline-flex items-center gap-3 bg-brand px-[19px] py-[15px] text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark motion-reduce:hover:translate-y-0"
          >
            {hero.ctaPrimary} <MoveRight size={18} aria-hidden />
          </Link>
          <Link
            href={{ pathname: "/", hash: sectionIds.clients[locale] }}
            replace
            className="inline-flex items-center gap-2 border-b border-current pb-1 text-[13px] font-bold"
          >
            {hero.ctaSecondary} <ArrowUpRight size={17} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

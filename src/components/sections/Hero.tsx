import { getMessages } from "next-intl/server";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const { hero } = await getMessages();
  const [titleFirst, ...titleRest] = hero.title;

  return (
    <section className="relative flex min-h-[710px] items-start overflow-hidden bg-paper md:min-h-[720px] md:items-center">
      <div
        aria-hidden
        className="hero-panel absolute inset-x-0 bottom-0 h-[39%] [clip-path:polygon(19%_0,100%_0,100%_100%,0_100%)] md:inset-y-0 md:right-0 md:left-[52%] md:h-auto md:[clip-path:polygon(23%_0,100%_0,100%_100%,0_100%)]"
      />

      <div className="relative container-site pt-[147px] md:pt-[82px]">
        <h1 className="max-w-[700px] text-[clamp(52px,7vw,92px)] leading-[0.98] font-bold tracking-[-0.07em]">
          {titleFirst}
          <span className="block text-brand">{titleRest.join(" ")}</span>
        </h1>

        <p className="mt-[29px] mb-[34px] max-w-[390px] text-[17px] leading-[1.6] text-muted">
          {hero.copy}
        </p>

        <div className="flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-7">
          <Link
            href="/servizi"
            className="inline-flex items-center gap-3 bg-brand px-[19px] py-[15px] text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark motion-reduce:hover:translate-y-0"
          >
            {hero.ctaPrimary} <MoveRight size={18} aria-hidden />
          </Link>
          <Link
            href="/clienti"
            className="inline-flex items-center gap-2 border-b border-current pb-1 text-[13px] font-bold"
          >
            {hero.ctaSecondary} <ArrowUpRight size={17} aria-hidden />
          </Link>
        </div>

        <dl className="mt-[62px] flex gap-4 xs:gap-[22px] md:mt-[82px] md:gap-[47px]">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-[5px]">
              <dt className="text-[9px] tracking-normal text-muted uppercase xs:tracking-[0.08em] md:text-[11px]">
                {stat.label}
              </dt>
              <dd className="font-display text-[22px] font-bold tracking-[-0.05em] md:text-[26px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

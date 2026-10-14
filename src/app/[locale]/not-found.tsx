import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center bg-paper pt-[72px] md:pt-[82px]">
      <div className="container-site py-20 text-center">
        <p
          aria-hidden
          className="font-display text-[clamp(80px,12vw,160px)] leading-none font-bold tracking-[-0.08em] text-brand"
        >
          404
        </p>
        <h1 className="mt-4 text-[clamp(28px,3vw,38px)] leading-[1.1] tracking-[-0.05em]">
          {t("title")}
        </h1>
        <p className="mt-5 mb-9 text-lg text-muted">{t("message")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-brand px-[19px] py-[15px] text-[13px] font-bold text-white transition-colors hover:bg-brand-dark"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}

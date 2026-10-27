import { getLocale, getMessages } from "next-intl/server";
import { sectionPadding } from "@/components/ui/section";

/**
 * Pagine legali (privacy, cookie). Il titolo sta in messages/<lingua>.json,
 * il testo in src/content/legal/<pagina>.<lingua>.md, scritto in Markdown.
 */
export async function LegalPage({ page }: { page: "privacy" }) {
  const { pages } = await getMessages();
  const locale = await getLocale();
  const { default: Content } = await import(
    `@/content/legal/${page}.${locale}.md`
  );

  return (
    <section className={`bg-paper ${sectionPadding(true)}`}>
      <div className="container-site max-w-[760px]">
        <h1 className="text-[clamp(38px,4.5vw,62px)] leading-[1.03] tracking-[-0.065em]">
          {pages[page].title}
        </h1>
        <div className="mt-8">
          <Content />
        </div>
      </div>
    </section>
  );
}

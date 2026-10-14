import { getMessages } from "next-intl/server";
import { sectionPadding } from "@/components/ui/section";

export async function LegalPage({ page }: { page: "privacy" | "cookies" }) {
  const { pages } = await getMessages();
  const content = pages[page];

  return (
    <section className={`bg-paper ${sectionPadding(true)}`}>
      <div className="container-site max-w-[760px]">
        <h1 className="text-[clamp(38px,4.5vw,62px)] leading-[1.03] tracking-[-0.065em]">
          {content.title}
        </h1>
        {/* TODO: inserire il testo definitivo (es. generato con Iubenda o fornito dal legale). */}
        <p className="mt-8 text-base leading-[1.7] text-muted">{content.body}</p>
      </div>
    </section>
  );
}

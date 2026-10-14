import { getMessages } from "next-intl/server";
import { Check } from "lucide-react";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Kicker } from "@/components/ui/Kicker";
import { sectionPadding } from "@/components/ui/section";

/** Mette in grassetto la parte `bold` dentro `text`, se presente. */
function Highlight({ text, bold }: { text: string; bold: string }) {
  const index = bold ? text.indexOf(bold) : -1;
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <strong className="font-extrabold text-ink">{bold}</strong>
      {text.slice(index + bold.length)}
    </>
  );
}

export async function AboutSection({ asPage = false }: { asPage?: boolean }) {
  const { about } = await getMessages();

  return (
    <section id="azienda" className={`bg-white ${sectionPadding(asPage)}`}>
      <div className="container-site grid gap-[34px] md:grid-cols-[28%_1fr] md:gap-x-[6%]">
        <Kicker>{about.kicker}</Kicker>

        <div>
          <AccentHeading
            as={asPage ? "h1" : "h2"}
            lines={about.title}
            className="text-[clamp(38px,4.5vw,62px)] leading-[1.03] tracking-[-0.065em]"
          />

          <div className="my-7 grid max-w-[760px] gap-[18px] md:mt-10 md:mb-[31px] md:grid-cols-2 md:gap-10">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-[1.7] text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-[18px] flex items-center gap-[7px] text-[13px] font-semibold">
            <Check size={16} className="shrink-0 text-brand" aria-hidden />
            {about.partnership}
          </p>
        </div>
      </div>

      <div className="container-site mt-[60px] grid gap-6 pt-9 md:grid-cols-[28%_1fr] md:gap-x-[6%]">
        <Kicker>{about.teamTitle}</Kicker>

        <ul className="grid gap-x-6 md:grid-cols-2">
          {about.team.map((member) => (
            <li key={member.name} className="border-t border-line py-[18px]">
              <p className="mb-1 font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                {member.name}
              </p>
              <p className="text-[13px] leading-normal text-muted">{member.role}</p>
              {member.details && (
                <p className="text-[13px] leading-normal text-muted">{member.details}</p>
              )}
              {member.qualifications.length > 0 && (
                <ul className="mt-2.5">
                  {member.qualifications.map((q) => (
                    <li
                      key={q.text}
                      className="relative pl-3.5 text-xs leading-[1.6] text-muted before:absolute before:left-0 before:text-brand before:content-['•']"
                    >
                      <Highlight text={q.text} bold={q.bold} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

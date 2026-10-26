import Image from "next/image";
import { getLocale, getMessages } from "next-intl/server";
import { Check } from "lucide-react";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Kicker } from "@/components/ui/Kicker";
import { sectionIds } from "@/config/navigation";
import { sectionPadding } from "@/components/ui/section";
import teamPhoto1 from "@/assets/team-1.webp";
import teamPhoto2 from "@/assets/team-2.webp";

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

export async function AboutSection() {
  const { about } = await getMessages();
  const locale = await getLocale();

  return (
    <section
      id={sectionIds.about[locale]}
      data-section="about"
      className={`bg-white ${sectionPadding()}`}
    >
      <div className="container-site grid gap-[34px] md:grid-cols-[28%_1fr] md:gap-x-[6%]">
        <Kicker className="reveal">{about.kicker}</Kicker>

        <div className="reveal">
          <AccentHeading
            lines={about.title}
            className="text-[clamp(38px,4.5vw,62px)] leading-[1.03] tracking-[-0.065em]"
          />

          <div className="my-7 grid max-w-[760px] gap-[18px] md:mt-10 md:mb-[31px] md:grid-cols-2 md:gap-10">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[15px] leading-[1.7] text-muted"
              >
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
        <div className="flex flex-col gap-8 md:gap-10">
          <Kicker className="reveal">{about.teamTitle}</Kicker>

          {/* Collage di due foto: la prima con il taglio obliquo dell'hero, la seconda sovrapposta
              con cornice bianca, un pannello verde chiaro dietro e il pallino verde del logo.
              Su desktop resta visibile mentre si scorre l'elenco del team. */}
          <figure className="reveal relative w-full max-w-[420px] pr-[16%] pb-[22%] md:sticky md:top-[120px]">
            <div
              aria-hidden
              className="absolute top-[10%] right-0 h-[62%] w-[72%] bg-sage [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
            />
            <div className="relative aspect-[4/5] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]">
              <Image
                src={teamPhoto1}
                alt={about.teamPhotos[0]}
                fill
                sizes="(min-width: 801px) 360px, 80vw"
                placeholder="blur"
                style={{ objectFit: "cover", objectPosition: "right center" }}
              />
            </div>
            <div className="absolute right-0 bottom-0 aspect-square w-[54%] overflow-hidden border-[6px] border-white shadow-[0_18px_40px_-18px_rgb(23_34_29/0.45)]">
              <Image
                src={teamPhoto2}
                alt={about.teamPhotos[1]}
                fill
                sizes="(min-width: 801px) 230px, 45vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </figure>
        </div>

        <ul className="grid gap-x-6 md:grid-cols-2">
          {about.team.map((member) => (
            <li
              key={member.name}
              className=" reveal border-t border-line py-[18px]"
            >
              <p className="mb-1 font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                {member.name}
              </p>
              <p className="text-[13px] leading-normal text-muted">
                {member.role}
              </p>
              {member.details && (
                <p className="text-[13px] leading-normal text-muted">
                  {member.details}
                </p>
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

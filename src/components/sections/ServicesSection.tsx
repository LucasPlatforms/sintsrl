import { getMessages } from "next-intl/server";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Kicker } from "@/components/ui/Kicker";
import { sectionPadding } from "@/components/ui/section";

export async function ServicesSection({ asPage = false }: { asPage?: boolean }) {
  const { services } = await getMessages();

  return (
    <section id="servizi" className={`bg-forest text-white ${sectionPadding(asPage)}`}>
      <div className="container-site">
        <div className="mb-[60px] grid gap-[34px] md:grid-cols-[28%_1fr] md:gap-x-[6%]">
          <Kicker tone="dark">{services.kicker}</Kicker>
          <AccentHeading
            as={asPage ? "h1" : "h2"}
            lines={services.title}
            accentClassName="text-mint"
            className="text-[clamp(40px,5vw,65px)] leading-none tracking-[-0.065em]"
          />
        </div>

        <div className="mb-[72px] grid gap-5 md:grid-cols-2">
          {services.groups.map((group) => (
            <div
              key={group.lead}
              className="rounded-md border border-forest-line bg-forest-panel px-[30px] py-8"
            >
              <p className="mb-5 text-base leading-normal font-bold text-mist-pale">
                {group.lead}
              </p>
              <ul className="flex flex-col gap-3.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-sm leading-[1.65] text-mist-light before:absolute before:top-[9px] before:left-0 before:h-0.5 before:w-2 before:bg-mint before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ol className="grid border-t border-forest-line md:grid-cols-2 md:gap-x-12">
          {services.items.map((service, i) => (
            <li
              key={service.title}
              className="flex gap-5 border-b border-forest-line py-7 transition-colors hover:bg-mint/4"
            >
              <span
                aria-hidden
                className="shrink-0 pt-0.5 font-display text-[13px] font-bold tracking-[0.04em] text-mint"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2 text-[19px] font-bold tracking-[-0.035em] text-white">
                  {service.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-mist">{service.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

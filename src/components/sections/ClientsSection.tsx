import { getMessages } from "next-intl/server";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Kicker } from "@/components/ui/Kicker";
import { sectionPadding } from "@/components/ui/section";
import { otherClients } from "@/data/clients";

export async function ClientsSection({ asPage = false }: { asPage?: boolean }) {
  const { clients } = await getMessages();

  return (
    <section id="clienti" className={`bg-paper ${sectionPadding(asPage)}`}>
      <div className="container-site">
        <div className="mb-9 md:mb-[60px]">
          <Kicker>{clients.kicker}</Kicker>
          <AccentHeading
            as={asPage ? "h1" : "h2"}
            lines={clients.title}
            className="mt-6 text-[clamp(38px,4.5vw,62px)] leading-[1.03] tracking-[-0.065em]"
          />
        </div>

        {/* TODO: verificare con il cliente l'autorizzazione a pubblicare ciascun case study. */}
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clients.caseStudies.map((cs) => (
            <li
              key={cs.client}
              className="flex flex-col border border-[#e7eae6] bg-white px-[22px] pt-6 pb-[26px] transition-colors hover:border-[#c4d4c7]"
            >
              <p className="mb-2.5 text-[11px] font-bold tracking-[0.12em] text-brand uppercase">
                {cs.sector}
              </p>
              <h3 className="text-[19px] font-bold tracking-[-0.035em] text-ink">{cs.client}</h3>
              <p className="mt-1 text-xs text-muted">{cs.place}</p>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">{cs.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-[50px] md:mt-[76px]">
          <p className="mb-[18px] text-[10px] font-bold tracking-[0.14em] text-[#87928a] uppercase">
            {clients.othersLabel}
          </p>
          <ul className="flex flex-wrap border-y border-line">
            {otherClients.map((name) => (
              <li
                key={name}
                className="mr-3 py-4 pr-3 font-display text-xs font-bold text-[#506057] xs:mr-6 xs:pr-6 xs:text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

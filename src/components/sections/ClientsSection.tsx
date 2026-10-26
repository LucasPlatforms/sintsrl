import Image from "next/image";
import { getLocale, getMessages } from "next-intl/server";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Kicker } from "@/components/ui/Kicker";
import { sectionIds } from "@/config/navigation";
import { sectionPadding } from "@/components/ui/section";
import { clients as clientLogos } from "@/data/clients";

export async function ClientsSection() {
  const { clients } = await getMessages();
  const locale = await getLocale();

  return (
    <section
      id={sectionIds.clients[locale]}
      data-section="clients"
      className={`bg-paper ${sectionPadding()}`}
    >
      <div className="container-site">
        <div className="reveal mb-9 md:mb-[60px]">
          <Kicker>{clients.kicker}</Kicker>
          <AccentHeading
            lines={clients.title}
            className="mt-6 text-[clamp(38px,4.5vw,62px)] leading-[1.03] tracking-[-0.065em]"
          />
        </div>

        {/* Griglia di loghi: ogni logo sta dentro un'area fissa senza essere tagliato.
            mix-blend-multiply rende invisibile lo sfondo bianco dei JPG sul fondo della sezione. */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 xs:grid-cols-3 md:grid-cols-4 md:gap-x-12 md:gap-y-14 lg:grid-cols-6">
          {clientLogos.map(({ name, logo }) => (
            <li key={logo} className="bg-paper reveal relative h-16 md:h-20">
              <Image
                src={`/clienti/${logo}`}
                alt={name}
                fill
                sizes="(min-width: 801px) 180px, 45vw"
                className="object-contain mix-blend-multiply"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

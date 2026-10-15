import { getLocale, getMessages } from "next-intl/server";
import { ArrowUpRight, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Kicker } from "@/components/ui/Kicker";
import { sectionIds } from "@/config/navigation";
import { site } from "@/config/site";

export async function ContactSection() {
  const { contact } = await getMessages();
  const locale = await getLocale();
  const { address } = site;

  return (
    <section
      id={sectionIds.contact[locale]}
      data-section="contact"
      className="bg-sage pt-[85px] md:pt-[126px]"
    >
      <div className="container-site grid md:grid-cols-2">
        <div className="pb-[68px] md:pt-2 md:pr-[70px] md:pb-[118px]">
          <div className="mb-[33px] flex size-[52px] items-center justify-center rounded-full bg-brand text-white">
            <MapPin size={22} aria-hidden />
          </div>
          <Kicker>{contact.kicker}</Kicker>
          <AccentHeading
            lines={contact.title}
            className="my-6 text-[clamp(42px,5vw,67px)] leading-none tracking-[-0.07em]"
          />
          <p className="mb-[25px] max-w-[320px] text-[15px] leading-[1.7] text-[#55645a]">
            {contact.copy}
          </p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-b border-current pb-1 text-[13px] font-bold text-brand-dark"
          >
            {contact.mapsLabel} <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>

        <div className="bg-ink px-7 pt-[45px] pb-[42px] text-white md:mt-[70px] md:px-[65px] md:pt-[65px] md:pb-[60px]">
          <Kicker tone="dark">{contact.panelKicker}</Kicker>
          <AccentHeading
            as="h3"
            lines={contact.panelTitle}
            accentClassName="text-mint"
            className="mt-[27px] mb-[47px] text-[clamp(28px,3.3vw,43px)] leading-[1.08] tracking-[-0.06em]"
          />

          <ul className="flex flex-col gap-[17px] border-t border-[#3a4a40] pt-[23px] text-sm font-semibold">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 hover:text-mint"
              >
                <Mail size={18} className="text-mint" aria-hidden />{" "}
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phone.href}
                className="flex items-center gap-3 hover:text-mint"
              >
                <Phone size={18} className="text-mint" aria-hidden />{" "}
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={site.mobile.href}
                className="flex items-center gap-3 hover:text-mint"
              >
                <Smartphone size={18} className="text-mint" aria-hidden />{" "}
                {site.mobile.display}
              </a>
            </li>
          </ul>

          <address className="mt-9 flex gap-3 text-xs leading-[1.6] text-mist not-italic">
            <MapPin size={17} className="shrink-0 text-mint" aria-hidden />
            <span>
              {site.legalName}
              <br />
              {address.street} — {address.postalCode} {address.city} (
              {address.province})
              <br />
              {contact.vatLabel} {site.vatNumber}
            </span>
          </address>
        </div>
      </div>
    </section>
  );
}

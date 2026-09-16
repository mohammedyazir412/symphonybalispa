import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import ContactForm from "./ContactForm";
import { IconMapPin, IconPhone, IconMail, IconClock, IconWhatsapp } from "@/components/icons";
import { locationsContact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Symphony Bali Spa — addresses, phone numbers and WhatsApp for our Madurai and Theni locations.",
  alternates: { canonical: "/contact" },
};

const locations = Object.values(locationsContact);

export default function ContactPage() {
  return (
    <>
      <Hero
        image="heroContact"
        eyebrow="Get in Touch"
        heading={["WE'D LOVE TO", "HEAR FROM YOU."]}
        subtext="Questions about a treatment, group booking or gift voucher? Reach out — our team is happy to help."
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="Send a Message" heading="Contact Symphony" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow mb-6">Our Locations</p>
            <div className="space-y-8">
              {locations.map((loc) => (
                <div key={loc.id} className="border border-ink/10 bg-cream p-7">
                  <h3 className="font-display text-xl text-ink">{loc.name}</h3>
                  <div className="mt-4 space-y-3 text-[0.875rem] text-ink/70">
                    <p className="flex items-start gap-3">
                      <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{loc.addressLines.join(" ")}</span>
                    </p>
                    <a
                      href={loc.phoneHref}
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <IconPhone className="h-4 w-4 shrink-0 text-gold" />
                      {loc.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${loc.email}`}
                      className="flex items-center gap-3 transition-colors hover:text-gold"
                    >
                      <IconMail className="h-4 w-4 shrink-0 text-gold" />
                      {loc.email}
                    </a>
                    <p className="flex items-center gap-3">
                      <IconClock className="h-4 w-4 shrink-0 text-gold" />
                      {site.hours}
                    </p>
                  </div>
                  <a
                    href={loc.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 bg-[#25D366] px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                  >
                    <IconWhatsapp className="h-3.5 w-3.5" />
                    WHATSAPP {loc.name.toUpperCase()}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-luxe max-w-3xl">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="Good to Know" heading="Frequently Asked Questions" />
          </Reveal>
          <div className="mt-10">
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import AmenitySection from "@/components/AmenitySection";
import CTASection from "@/components/CTASection";
import {
  IconMapPin,
  IconPhone,
  IconWhatsapp,
  IconClock,
  IconArrowRight,
} from "@/components/icons";
import { locationsContent } from "@/data/locations";
import { locationsContact, site, type LocationId } from "@/data/site";
import { getFeaturedTreatments } from "@/data/treatments";
import TreatmentGrid from "@/components/TreatmentGrid";

const ids = Object.keys(locationsContent) as LocationId[];

export function generateStaticParams() {
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const content = locationsContent[id as LocationId];
  if (!content) return {};

  return {
    title: `${content.name} Location`,
    description: content.intro,
    alternates: { canonical: `/locations/${content.id}` },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = locationsContent[id as LocationId];
  if (!content) notFound();

  const contact = locationsContact[content.id];
  const featured = getFeaturedTreatments().slice(0, 3);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    contact.mapsQuery,
  )}&output=embed`;

  return (
    <>
      <Hero
        image={content.heroImage}
        eyebrow={site.name.toUpperCase()}
        heading={[content.name.toUpperCase()]}
        subtext={content.intro}
        primaryCta={{ label: "BOOK APPOINTMENT", href: `/book?location=${content.id}` }}
        secondaryCta={{ label: "GET DIRECTIONS", href: mapSrc.replace("&output=embed", "") }}
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="About This Location" heading={content.title} />
            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-ink/70">
              {content.description}
            </p>

            <div className="mt-10 overflow-hidden border border-ink/10">
              <iframe
                title={`Map to Symphony Bali Spa ${content.name}`}
                src={mapSrc}
                className="h-72 w-full sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-ink/10 bg-cream p-8">
              <p className="eyebrow mb-6">Visit Us</p>
              <div className="space-y-5 text-[0.9rem] text-ink/75">
                <p className="flex items-start gap-3">
                  <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{contact.addressLines.join(" ")}</span>
                </p>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <IconPhone className="h-4 w-4 shrink-0 text-gold" />
                  {contact.phoneDisplay}
                </a>
                <p className="flex items-center gap-3">
                  <IconClock className="h-4 w-4 shrink-0 text-gold" />
                  {site.hours}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  WHATSAPP US
                </a>
                <Link
                  href={`/book?location=${content.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-charcoal"
                >
                  BOOK APPOINTMENT
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="Popular Here" heading="Signature Treatments" />
          </Reveal>
          <div className="mt-12">
            <TreatmentGrid treatments={featured} />
          </div>
        </div>
      </section>

      <AmenitySection />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="Gallery" heading={`Inside Symphony ${content.name}`} />
          </Reveal>
          <div className="mt-12">
            <Gallery
              items={content.galleryImages.map((image) => ({
                image,
                alt: `Symphony Bali Spa ${content.name} — interior`,
                size: "sm" as const,
              }))}
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

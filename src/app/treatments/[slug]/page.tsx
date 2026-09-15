import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  treatments,
  categories,
  getTreatmentBySlug,
  getRelatedTreatments,
} from "@/data/treatments";
import { img } from "@/lib/images";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import TreatmentGrid from "@/components/TreatmentGrid";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { IconArrowRight, IconClock } from "@/components/icons";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return {};

  return {
    title: treatment.name,
    description: treatment.shortDescription,
    alternates: { canonical: `/treatments/${treatment.slug}` },
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const related = getRelatedTreatments(treatment);

  return (
    <>
      <section className="relative flex min-h-[440px] items-end overflow-hidden bg-charcoal text-ivory sm:min-h-[500px]">
        <Image
          src={img[treatment.image]}
          alt={treatment.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/15" />
        <div className="container-luxe relative z-10 pb-16 pt-32">
          <p className="eyebrow mb-4 text-champagne">
            {treatment.featured ? "Signature Treatment" : "Symphony Ritual"}
          </p>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.05] sm:text-6xl">
            {treatment.name}
          </h1>
          <p className="mt-5 flex items-center gap-2 text-[0.8rem] tracking-[0.1em] text-ivory/70">
            <IconClock className="h-4 w-4 text-gold" />
            {treatment.duration}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Divider className="mb-6" />
              <p className="text-balance text-lg leading-relaxed text-ink/75">
                {treatment.description}
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <SectionHeading eyebrow="The Experience" heading="What to Expect" />
              <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink/70">
                {treatment.experience}
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <SectionHeading eyebrow="Benefits" heading="Why Guests Love It" />
              <ul className="mt-5 space-y-3">
                {treatment.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-[0.925rem] leading-relaxed text-ink/70"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>

            {treatment.safetyNotes && (
              <Reveal delay={180} className="mt-12">
                <SectionHeading eyebrow="Safety & Care" heading="Before Your Session" />
                <p className="mt-5 max-w-xl text-[0.9rem] leading-relaxed text-ink/65">
                  {treatment.safetyNotes}
                </p>
              </Reveal>
            )}

            {treatment.tagline && (
              <Reveal delay={220} className="mt-12">
                <p className="max-w-xl font-display text-xl italic leading-snug text-ink/80 sm:text-2xl">
                  {treatment.tagline}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={100}>
            <div className="border border-ink/10 bg-cream p-8">
              <p className="eyebrow mb-6">Treatment Details</p>
              <dl className="space-y-5 text-[0.875rem]">
                <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                  <dt className="text-ink/50">Duration</dt>
                  <dd className="text-right font-medium text-ink">
                    {treatment.duration}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                  <dt className="text-ink/50">Style</dt>
                  <dd className="text-right font-medium text-ink">
                    {treatment.style}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-ink/50">Category</dt>
                  <dd className="text-right font-medium text-ink">
                    {categories.find((c) => c.id === treatment.category)?.label}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/book?treatment=${treatment.slug}`}
                className="mt-8 flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-charcoal"
              >
                BOOK THIS EXPERIENCE
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-20 sm:py-28">
          <div className="container-luxe">
            <Reveal>
              <Divider className="mb-6" />
              <SectionHeading eyebrow="Continue Exploring" heading="Related Treatments" />
            </Reveal>
            <div className="mt-12">
              <TreatmentGrid treatments={related} />
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

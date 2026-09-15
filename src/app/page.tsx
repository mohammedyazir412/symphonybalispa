import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AboutSection from "@/components/AboutSection";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import TreatmentGrid from "@/components/TreatmentGrid";
import AmenitySection from "@/components/AmenitySection";
import LocationCard from "@/components/LocationCard";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { getFeaturedTreatments } from "@/data/treatments";
import { locationsList } from "@/data/locations";
import { IconArrowRight } from "@/components/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Symphony Bali Spa | Luxury Bali Spa in Madurai & Theni",
  description:
    "Experience authentic Balinese-inspired wellness, luxury massage treatments and rejuvenating spa experiences at Symphony Bali Spa in Madurai and Theni.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedTreatments();

  return (
    <>
      <Hero
        image="heroHome"
        mobileImage="heroHomeMobile"
        eyebrow="Luxury Wellness Experience"
        heading={["STEP INTO", "Symphony."]}
        accentLine={1}
        subtext="Authentic Balinese-inspired wellness rituals designed to help you slow down, release tension and reconnect with yourself."
        primaryCta={{ label: "BOOK YOUR EXPERIENCE", href: "/book" }}
        secondaryCta={{ label: "EXPLORE TREATMENTS", href: "/treatments" }}
        layout="center-card"
        waveDivider
        showScroll
      />

      <Stats />

      <AboutSection
        image="aboutExperience"
        imageAlt="A guest walking toward the treatment rooms through the Symphony Bali Spa gardens"
        eyebrow="The Symphony Experience"
        heading="More Than a Spa. It's a Journey."
        paragraphs={[
          "At Symphony Bali Spa, we bring an authentic Balinese-inspired wellness experience to Madurai and Theni. Every space is designed to help you slow down, and every ritual is performed by therapists trained in traditional technique.",
          "From premium natural products to a calm, considered ambience, each visit is shaped around one goal — helping you leave feeling genuinely restored, in body and mind.",
        ]}
        cta={{ label: "DISCOVER OUR STORY", href: "/about" }}
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <Divider className="mb-6" />
              <SectionHeading
                eyebrow="Signature Treatments"
                heading="Choose Your Escape"
              />
            </Reveal>
            <Reveal delay={100}>
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] text-ink transition-colors hover:text-gold"
              >
                VIEW ALL TREATMENTS
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14">
            <TreatmentGrid treatments={featured} variant="scale" />
          </div>
        </div>
      </section>

      <AmenitySection />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Divider className="mb-6" />
              <SectionHeading
                eyebrow="Our Locations"
                heading="Two Exquisite Destinations"
              />
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] text-ink transition-colors hover:text-gold"
            >
              EXPLORE ALL LOCATIONS
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {locationsList.map((location, i) => (
              <Reveal
                key={location.id}
                delay={i * 100}
                variant={i % 2 === 0 ? "left" : "right"}
              >
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <CTASection />
    </>
  );
}

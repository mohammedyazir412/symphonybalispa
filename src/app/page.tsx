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
import ReviewBadges from "@/components/ReviewBadges";
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
        eyebrow="Luxury Wellness Experience..."
        heading={["STEP INTO", "Symphony Bali Spa"]}
        accentLine={1}
        subtext="Experience authentic Balinese spa treatments and wellness rituals designed to relax your body, relieve stress, ease muscle tension, and restore your mind through traditional massage therapies and rejuvenating spa experiences."
        primaryCta={{ label: "BOOK YOUR EXPERIENCE", href: "/book" }}
        secondaryCta={{ label: "EXPLORE TREATMENTS", href: "/treatments" }}
        layout="center-card"
        waveDivider
        waveFill="ivory"
        showScroll
      />

      <AboutSection
        image="aboutExperience"
        imageAlt="A guest walking toward the treatment rooms through the Symphony Bali Spa gardens"
        eyebrow="The Symphony Experience"
        heading="Your Destination for Balinese Spa and Wellness"
        paragraphs={[
          "At Symphony Bali Spa, we bring the beauty of traditional Balinese wellness practices to Madurai and Theni. Our Bali spa experience combines traditional massage techniques, relaxing spa treatments, and a peaceful setting where you can take a break from your daily routine.",
          "Every detail, from the calming ambience to the natural products used in our treatments, is chosen with care. Our trained therapists help ease muscle tension, reduce stress, and refresh your body and mind. Whether you visit us for a relaxing Bali massage or a complete spa experience, Symphony Bali Spa offers a welcoming place to unwind and enjoy quality wellness treatments.",
        ]}
        cta={{ label: "DISCOVER OUR STORY", href: "/about" }}
      />

      <Stats />

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
                className="h-full"
                variant={i % 2 === 0 ? "left" : "right"}
              >
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewBadges />

      <Testimonials />

      <CTASection />
    </>
  );
}

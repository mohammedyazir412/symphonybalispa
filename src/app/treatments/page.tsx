import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import TreatmentsDirectory from "./TreatmentsDirectory";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Explore the full menu of signature therapies, luxury rituals and spa facilities at Symphony Bali Spa — Balinese massage, hot stone therapy, aromatherapy and more.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <Hero
        image="heroTreatments"
        eyebrow="Treatments & Rituals"
        heading={["THE FULL", "MENU OF CALM."]}
        subtext="Eighteen rituals, organised into simple categories, so it's easy to find exactly what you need."
        size="page"
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading
              eyebrow="Signature Treatments"
              heading="Choose Your Escape"
              description="Filter by category to explore our full range of massages, rituals and spa facilities."
            />
          </Reveal>

          <div className="mt-12">
            <TreatmentsDirectory />
          </div>
        </div>
      </section>

      <CTASection
        image="oceanWaves"
        eyebrow="Not Sure Where to Start?"
        heading="Let Us Recommend a Ritual"
        description="Tell us what you're looking for and our team will help you choose the right treatment."
      />
    </>
  );
}

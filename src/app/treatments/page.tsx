import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import TreatmentsDirectory from "./TreatmentsDirectory";

export const metadata: Metadata = {
  title: { absolute: "Symphony Bali Spa Treatments – Massage & Wellness" },
  description:
    "Explore signature spa treatments at Symphony Bali Spa, including Balinese massage, hot stone therapy, aromatherapy and relaxing body care for total relaxation.",
  keywords: ["Balinese spa treatments"],
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <Hero
        image="heroTreatments"
        heading={["SYMPHONY BALI SPA", "TREATMENTS FOR CALM"]}
        subtext="Explore 18 signature spa treatments, thoughtfully organised into simple categories to help you find the right massage, body therapy or wellness ritual for your relaxation and personal care needs."
        size="page"
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading
              heading="Pick Our Signature Treatments"
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

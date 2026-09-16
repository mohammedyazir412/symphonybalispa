import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import LocationCard from "@/components/LocationCard";
import CTASection from "@/components/CTASection";
import { locationsList } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find Symphony Bali Spa in Madurai and Theni, Tamil Nadu — addresses, contact details and directions for both locations.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <Hero
        image="heroLocations"
        eyebrow="Find Us"
        heading={["TWO EXQUISITE", "DESTINATIONS."]}
        subtext="Symphony Bali Spa welcomes you in Madurai and Theni — each space designed around the same promise of calm."
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading
              eyebrow="Our Locations"
              heading="Wherever You Are, Symphony Is Close By"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {locationsList.map((location, i) => (
              <Reveal key={location.id} delay={i * 100}>
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

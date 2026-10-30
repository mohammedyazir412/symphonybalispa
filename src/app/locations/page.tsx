import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import LocationCard from "@/components/LocationCard";
import CTASection from "@/components/CTASection";
import { locationsList } from "@/data/locations";
import { site } from "@/data/site";

const description =
  "Find Symphony Bali Spa locations in Tamil Nadu, including Madurai and Theni. Explore spa addresses, contact details and directions to plan your next visit today.";

export const metadata: Metadata = {
  title: { absolute: "Symphony Bali Spa | Locations & Contact Details" },
  description,
  keywords: ["Symphony Bali Spa locations", "Spa near me"],
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Symphony Bali Spa | Locations & Contact Details",
    description,
    url: `${site.url}/locations`,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symphony Bali Spa | Locations & Contact Details",
    description,
  },
};

export default function LocationsPage() {
  return (
    <>
      <Hero
        image="heroLocations"
        heading={["DISCOVER TWO EXCLUSIVE", "BALI SPA IN", "MADURAI AND THENI"]}
        subtext="Symphony Bali Spa is your destination for soulful relaxation, authentic Balinese-inspired treatments and a little luxury in your everyday life."
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading heading="Your Favourite Bali Spa Experience, Closer Than Ever" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {locationsList.map((location, i) => (
              <Reveal key={location.id} delay={i * 100} className="h-full">
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="A Soulful Treatment, Just for You"
        heading="Reserve Bali Spa Treatment From Symphony"
        description="Leave your daily worries behind. Enjoy the comfort of a refreshing spa wellness."
        ctaLabel="SCHEDULE A CONSULTATION"
      />
    </>
  );
}

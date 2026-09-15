import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Symphony Bali Spa — treatment rooms, rituals and the details that shape the Symphony experience.",
  alternates: { canonical: "/gallery" },
};

const galleryItems: GalleryItem[] = [
  { image: "villaPlungePool", alt: "Balinese-style plunge pool courtyard", size: "lg" as const },
  { image: "hotStoneMassage", alt: "Hot stone massage treatment" },
  { image: "candlesIncense", alt: "Spa candles and incense" },
  { image: "saunaInterior", alt: "Private steam room interior", size: "tall" as const },
  { image: "deepTissueMassage", alt: "Deep tissue massage in progress" },
  { image: "spaFlatlay", alt: "Spa essentials — towel and tealight" },
  { image: "infinityPoolOcean", alt: "Ocean-view infinity pool", size: "md" as const },
  { image: "handsMassage", alt: "Therapist hands performing massage" },
  { image: "facialMask", alt: "Facial treatment application" },
  { image: "oilBottlePedestal", alt: "Essential oil bottle detail" },
  { image: "villaBedroom", alt: "Warm, Balinese-inspired interior" },
  { image: "treatmentCoupleMassage", alt: "Couple massage treatment room" },
];

export default function GalleryPage() {
  return (
    <>
      <Hero
        image="facialMask"
        eyebrow="Gallery"
        heading={["INSIDE THE", "SYMPHONY WORLD."]}
        subtext="A glimpse into our treatment rooms, rituals and the quiet details that shape every visit."
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="Symphony Bali Spa" heading="A Visual Journey" />
          </Reveal>

          <div className="mt-12">
            <Gallery items={galleryItems} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

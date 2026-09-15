import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Stats from "@/components/Stats";
import AmenitySection from "@/components/AmenitySection";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Symphony Bali Spa — an authentic Balinese-inspired wellness destination with locations in Madurai and Theni.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Authentic Technique",
    description:
      "Every ritual is rooted in traditional Balinese and Southeast Asian massage technique, performed by therapists trained in the craft.",
  },
  {
    title: "Considered Ambience",
    description:
      "From lighting to layout, every detail of our spaces is designed to help you slow down the moment you walk in.",
  },
  {
    title: "Premium, Natural Products",
    description:
      "We use natural oils and ingredients chosen for how they feel on the skin and how they support genuine relaxation.",
  },
  {
    title: "Personalised Care",
    description:
      "Our therapists take the time to understand what you need — whether that's deep muscular relief or simply a quiet hour to yourself.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        image="resortPoolPalms"
        eyebrow="Our Story"
        heading={["A SANCTUARY", "BUILT ON RITUAL."]}
        subtext="Symphony Bali Spa was founded on a simple belief — that everyone deserves a space to slow down, however brief the visit."
        size="page"
      />

      <AboutSection
        image="aboutPageTeam"
        imageAlt="The Symphony Bali Spa therapist team"
        eyebrow="Who We Are"
        heading="Why Choose Symphony Bali Spa"
        paragraphs={[
          "Experience pure relaxation at Symphony Bali Spa, where relaxation meets true rejuvenation — escape stress, embrace serenity. With over 10+ years of experience in wellness therapies and trusted spa locations in Madurai and Theni, our goal is to help you escape from daily stress and enjoy a peaceful journey of rejuvenation.",
          "At Symphony Bali Spa, we stand out as one of the most trusted and top-rated wellness destinations in India because of our commitment to excellence, quality and customer satisfaction — government recognised, ISO certified, and trusted by our guests.",
          "We provide premium wellness treatments including relaxing massages, revitalising body scrubs and therapeutic spa therapies, all performed by skilled professionals in a peaceful and elegant environment. Our spa also features modern facilities such as steam rooms and jacuzzis to enhance your relaxation.",
          "Our therapies do more than relax your body — they improve circulation, ease muscle tension, reduce stress and support natural detoxification for complete mind and body wellness.",
        ]}
      />

      <Stats />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal className="mx-auto max-w-xl text-center">
            <Divider align="center" className="mb-6" />
            <SectionHeading
              eyebrow="What Guides Us"
              heading="Our Approach to Wellness"
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <span className="font-display text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-sm text-[0.9rem] leading-relaxed text-ink/65">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AmenitySection image="saunaInterior" />

      <CTASection
        image="tropicalBeach"
        heading="Come Experience the Difference"
        description="Whether it's your first visit or your fiftieth, we'd love to welcome you in."
      />
    </>
  );
}

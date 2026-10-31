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
  title: { absolute: "About Symphony Bali Spa | Our Story & Wellness Traditions" },
  description:
    "Look out for Symphony Bali Spa, our approach to wellness, inspired by Balinese massage traditions, skilled therapists, premium treatments and thoughtful care.",
  keywords: ["About Symphony Bali Spa"],
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
        image="heroAbout"
        eyebrow="Our Story"
        heading={["A SANCTUARY", "BUILT ON RITUAL."]}
        subtext="Symphony Bali Spa was founded on a simple belief — that everyone deserves a space to slow down, however brief the visit."
        size="page"
      />

      <AboutSection
        image="aboutPageTeam"
        imageAlt="The Symphony Bali Spa therapist team"
        heading="Who We Are?"
        paragraphs={[
          "Symphony Bali Spa is a wellness centre with over 17+ years of experience in spa treatments and massage therapies. We bring the traditional practices of Balinese massage into our treatments, giving customers a place to take a break from their daily routine and spend time on their well-being.",
          "Over the years, we have built our bali spa reputation through quality treatments, professional service and care for our guests. Symphony Bali Spa is government recognised and ISO certified, reflecting our commitment to maintaining service standards.",
          "Our spa offers a variety of treatments, including body massages, body scrubs and therapeutic massage therapies. Our trained therapists provide each treatment with care and attention. Guests can also enjoy facilities such as steam rooms and jacuzzis during their visit.",
          "We believe that taking time for yourself is an important part of everyday life. Our massage treatments help relieve muscle tension, reduce everyday stress and give your body time to rest.",
        ]}
      />

      <Stats />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal className="mx-auto max-w-xl text-center">
            <Divider align="center" className="mb-6" />
            <SectionHeading
              heading="Why Choose Symphony Bali Spa?"
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

      <AmenitySection image="saunaInterior" eyebrow="" heading="Our Promises" />

      <CTASection
        image="tropicalBeach"
        eyebrow="Symphony Spa"
        heading="Give Yourself the Care You Deserve"
        description="Whether it's your first visit or your fiftieth, we'd love to welcome you in."
      />
    </>
  );
}

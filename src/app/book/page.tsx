import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import { IconClock, IconMapPin } from "@/components/icons";
import { locationsContact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Reserve your appointment at Symphony Bali Spa — choose your location, treatment and preferred time.",
  alternates: { canonical: "/book" },
};

const locations = Object.values(locationsContact);

export default function BookPage() {
  return (
    <>
      <Hero
        image="oilDripMacro"
        eyebrow="Book Appointment"
        heading={["RESERVE YOUR", "SPA TIME."]}
        subtext="Share a few details and our team will confirm your appointment by phone or WhatsApp."
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="Your Details" heading="Request an Appointment" />
            <div className="mt-8">
              <Suspense fallback={null}>
                <BookingForm />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-ink/10 bg-cream p-8">
              <p className="eyebrow mb-6">Before You Book</p>
              <ul className="space-y-4 text-[0.875rem] leading-relaxed text-ink/70">
                <li className="flex items-start gap-3">
                  <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Open {site.hours.toLowerCase()}.
                </li>
                <li className="flex items-start gap-3">
                  <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  Please arrive 10 minutes before your treatment time.
                </li>
              </ul>

              <p className="eyebrow mb-4 mt-8">Our Locations</p>
              <div className="space-y-4">
                {locations.map((loc) => (
                  <p key={loc.id} className="flex items-start gap-3 text-[0.875rem] text-ink/70">
                    <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong className="font-medium text-ink">{loc.name}:</strong>{" "}
                      {loc.addressLines.join(" ")}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

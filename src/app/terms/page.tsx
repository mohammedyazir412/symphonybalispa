import type { Metadata } from "next";
import Divider from "@/components/Divider";
import { site, locationsContact } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  const email = Object.values(locationsContact)[0].email;

  return (
    <section className="bg-ivory py-28 sm:py-36">
      <div className="container-luxe max-w-2xl">
        <Divider className="mb-6" />
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-ink/70">
          <p>
            By booking an appointment or using this website, you agree to
            the following general terms with {site.name}.
          </p>
          <p>
            Appointments are subject to availability and are confirmed by
            phone or WhatsApp following your request. We recommend arriving
            a few minutes early; late arrival may reduce your treatment
            time.
          </p>
          <p>
            Prices, treatment durations and availability are confirmed at
            the time of booking and may vary between locations.
          </p>
          <p>
            For questions about these terms, please contact us at{" "}
            <a href={`mailto:${email}`} className="text-gold underline underline-offset-4">
              {email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

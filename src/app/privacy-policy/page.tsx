import type { Metadata } from "next";
import Divider from "@/components/Divider";
import { site, locationsContact } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  const email = Object.values(locationsContact)[0].email;

  return (
    <section className="bg-ivory py-28 sm:py-36">
      <div className="container-luxe max-w-2xl">
        <Divider className="mb-6" />
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-ink/70">
          <p>
            {site.name} respects your privacy. This page outlines, in
            general terms, how information you share with us — such as
            through our booking and contact forms — is used.
          </p>
          <p>
            Information you submit (name, phone number, email and any
            message details) is used solely to respond to your enquiry,
            confirm appointments and improve your experience with us. We do
            not sell or share your information with third parties for
            marketing purposes.
          </p>
          <p>
            If you have any questions about how your information is
            handled, please contact us at{" "}
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

import Image from "next/image";
import Link from "next/link";
import { img, type ImageKey } from "@/lib/images";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";

export default function CTASection({
  image = "ctaSpaBed",
  eyebrow = "Your Moment of Serenity",
  heading = "Reserve Your Spa Experience",
  description = "Step away from the noise and give yourself a moment to breathe, restore and reconnect.",
}: {
  image?: ImageKey;
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 text-ivory sm:py-32">
      <Image
        src={img[image]}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70" />

      <div className="container-luxe relative z-10 text-center">
        <Reveal>
          <Divider tone="light" align="center" className="mb-6" />
          <p className="eyebrow text-champagne">{eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl leading-[1.1] sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-balance text-[0.95rem] leading-relaxed text-ivory/75">
            {description}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-charcoal transition-colors hover:bg-champagne"
            >
              BOOK YOUR EXPERIENCE
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="border-b border-ivory/50 pb-1 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              CONTACT US
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

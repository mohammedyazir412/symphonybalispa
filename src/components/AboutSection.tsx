import Image from "next/image";
import Link from "next/link";
import { img, type ImageKey } from "@/lib/images";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function AboutSection({
  image,
  imageAlt,
  eyebrow,
  heading,
  paragraphs,
  cta,
  reverse = false,
}: {
  image: ImageKey;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  reverse?: boolean;
}) {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal
          variant={reverse ? "right" : "left"}
          className={cn(reverse && "lg:order-2")}
        >
          <div className="relative mx-auto w-full max-w-[22rem] p-4 sm:max-w-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={img[image]}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
            </div>
            <div className="pointer-events-none absolute inset-0 border border-gold/40" />
          </div>
        </Reveal>

        <Reveal
          variant={reverse ? "left" : "right"}
          delay={120}
          className={cn(reverse && "lg:order-1")}
        >
          <Divider align="left" className="mb-6" />
          <SectionHeading eyebrow={eyebrow} heading={heading} />
          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[0.975rem] leading-relaxed text-ink/70">
                {p}
              </p>
            ))}
          </div>
          {cta && (
            <Link
              href={cta.href}
              className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-[0.78rem] font-semibold tracking-[0.14em] text-ink transition-colors hover:text-gold"
            >
              {cta.label}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

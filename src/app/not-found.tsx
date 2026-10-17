import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const quickLinks = [
  {
    href: "/treatments",
    title: "Treatments",
    text: "Massage, body rituals and spa therapies.",
  },
  {
    href: "/locations",
    title: "Locations",
    text: "Find our Madurai and Theni spas.",
  },
  {
    href: "/blogs",
    title: "Blogs",
    text: "Wellness tips and self-care ideas.",
  },
  {
    href: "/contact",
    title: "Contact",
    text: "Call, message or visit us.",
  },
];

const wisps = [
  { left: "18%", delay: "0s", size: "h-40 w-10" },
  { left: "32%", delay: "2.6s", size: "h-48 w-12" },
  { left: "50%", delay: "1.2s", size: "h-44 w-10" },
  { left: "68%", delay: "3.8s", size: "h-48 w-12" },
  { left: "82%", delay: "5.2s", size: "h-40 w-10" },
];

const candles = [
  { left: "8%", top: "62%", delay: "0s" },
  { left: "91%", top: "58%", delay: "1.1s" },
  { left: "14%", top: "28%", delay: "2.2s" },
  { left: "86%", top: "24%", delay: "0.6s" },
];

export default function NotFound() {
  return (
    <>
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-charcoal pt-28 pb-20 text-ivory">
        <Image
          src={img.meditationSilhouette}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal" />

        {/* rising steam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full"
        >
          {wisps.map((w, i) => (
            <span
              key={i}
              className={`nf-wisp absolute bottom-0 rounded-full bg-ivory/20 blur-2xl ${w.size}`}
              style={{ left: w.left, animationDelay: w.delay }}
            />
          ))}
        </div>

        {/* candle glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {candles.map((c, i) => (
            <span
              key={i}
              className="nf-flicker absolute h-24 w-24 rounded-full bg-gold/30 blur-2xl"
              style={{ left: c.left, top: c.top, animationDelay: c.delay }}
            />
          ))}
        </div>

        <div className="container-luxe relative z-10 text-center">
          <p className="eyebrow mb-6">Error 404</p>

          {/* 4 ( ripple bowl ) 4 */}
          <div className="nf-float mx-auto flex items-center justify-center gap-2 font-display text-[7.5rem] font-semibold leading-none sm:gap-4 sm:text-[11rem] md:text-[14rem]">
            <span className="nf-gold-text">4</span>
            <span className="relative flex aspect-square w-[0.8em] items-center justify-center">
              {[0, 1.8, 3.6].map((d) => (
                <span
                  key={d}
                  aria-hidden="true"
                  className="nf-ripple absolute inset-0 rounded-full border border-gold/60"
                  style={{ animationDelay: `${d}s` }}
                />
              ))}
              <span className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-gold/70 bg-gradient-to-b from-gold/20 to-transparent shadow-[0_0_60px_rgba(185,154,98,0.35)]">
                <span className="relative block h-[52%] w-[52%]">
                  <Image
                    src="/images/logo.png"
                    alt="Symphony Bali Spa"
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </span>
              </span>
            </span>
            <span className="nf-gold-text">4</span>
          </div>

          <h1 className="mx-auto mt-8 max-w-2xl text-balance font-display text-3xl text-ivory sm:text-5xl">
            This Page Has Wandered Off
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ivory/70">
            The page you&apos;re looking for doesn&apos;t exist, or has moved.
            Take a deep breath — let&apos;s guide you back to somewhere calm.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.16em] text-charcoal transition-all duration-300 hover:scale-105 hover:bg-champagne hover:shadow-[0_8px_28px_rgba(185,154,98,0.45)]"
            >
              RETURN HOME
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.16em] text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              BOOK A TREATMENT
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="container-luxe">
          <p className="eyebrow mb-3 text-center">Where to next?</p>
          <h2 className="mb-10 text-center font-display text-3xl text-ink sm:text-4xl">
            Find Your Way Back to Calm
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group border border-ink/10 bg-white/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_14px_36px_rgba(37,34,29,0.08)]"
              >
                <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-gold">
                  {l.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/60">
                  {l.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] text-gold">
                  VISIT
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconPlay } from "@/components/icons";
import type { ImageKey } from "@/lib/images";
import { img } from "@/lib/images";

const TYPE_START_MS = 550;
const TYPE_CHAR_MS = 28;
const TYPE_WORD_MS = 55;

function TypedLine({
  text,
  startIndex,
  className,
}: {
  text: string;
  startIndex: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="letter-in"
          style={{ animationDelay: `${TYPE_START_MS + (startIndex + i) * TYPE_CHAR_MS}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

function TypedWords({ text, startMs }: { text: string; startMs: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span
            className="word-in"
            style={{ animationDelay: `${startMs + i * TYPE_WORD_MS}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

interface HeroProps {
  image: ImageKey;
  mobileImage?: ImageKey;
  eyebrow: string;
  heading: string[];
  subtext?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  size?: "full" | "page";
  showScroll?: boolean;
  watchLabel?: string;
  layout?: "left" | "center-card";
  waveDivider?: boolean;
  waveFill?: "cream" | "ivory";
  accentLine?: number;
}

export default function Hero({
  image,
  mobileImage,
  eyebrow,
  heading,
  subtext,
  primaryCta,
  secondaryCta,
  size = "full",
  showScroll = false,
  watchLabel,
  layout = "left",
  waveDivider = false,
  waveFill = "cream",
  accentLine,
}: HeroProps) {
  const centered = layout === "center-card";

  const headingCharCount = heading.reduce((sum, line) => sum + line.length, 0);
  const headingEndMs = TYPE_START_MS + headingCharCount * TYPE_CHAR_MS + 200;
  const subtextWordCount = subtext ? subtext.split(" ").length : 0;
  const subtextEndMs = subtext
    ? headingEndMs + subtextWordCount * TYPE_WORD_MS + 150
    : headingEndMs;
  const ctaDelayMs = centered ? subtextEndMs : 0;

  return (
    <section
      className={cn(
        "relative flex overflow-hidden bg-charcoal text-ivory",
        centered ? "flex-col" : "items-end",
        size === "full"
          ? "min-h-[680px] sm:h-screen"
          : "min-h-[460px] sm:min-h-[520px]",
      )}
    >
      {mobileImage ? (
        <>
          <Image
            src={img[mobileImage]}
            alt=""
            fill
            priority={size === "full"}
            sizes="100vw"
            className="object-cover sm:hidden"
          />
          <Image
            src={img[image]}
            alt=""
            fill
            priority={size === "full"}
            sizes="100vw"
            className="hidden object-cover sm:block"
          />
        </>
      ) : (
        <Image
          src={img[image]}
          alt=""
          fill
          priority={size === "full"}
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-transparent" />

      <div
        className={cn(
          "container-luxe relative z-10",
          centered
            ? "flex flex-1 flex-col items-center justify-center pt-20 pb-8 text-center sm:pt-24 sm:pb-10"
            : "pb-16 pt-32 sm:pb-20 md:pb-24",
        )}
      >
        {centered && (
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <clipPath id="hero-card-wave" clipPathUnits="objectBoundingBox">
                <path d="M0,0 L1,0 L1,0.89 C0.8,0.89 0.7,1 0.5,1 C0.3,1 0.2,0.89 0,0.89 Z" />
              </clipPath>
            </defs>
          </svg>
        )}
        <div
          className={cn(
            centered &&
              "hero-card-in max-w-full shrink border border-ivory/15 bg-ivory/10 px-6 pb-8 pt-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-14 sm:pb-11 sm:pt-9",
          )}
          style={centered ? { clipPath: "url(#hero-card-wave)" } : undefined}
        >
          <p
            className={cn(
              "eyebrow mb-5 text-champagne",
              centered && "mb-4",
            )}
          >
            {eyebrow}
          </p>
          <h1
            className={cn(
              "text-balance font-display leading-[1.04]",
              accentLine !== undefined
                ? "text-[2.1rem] sm:text-5xl md:text-6xl"
                : "text-[2.6rem] sm:text-6xl md:text-7xl",
              centered ? "mx-auto max-w-2xl" : "max-w-3xl",
            )}
          >
            {(() => {
              const startOffsets = heading.reduce<number[]>((acc, line, i) => {
                acc.push(i === 0 ? 0 : acc[i - 1] + heading[i - 1].length);
                return acc;
              }, []);
              return heading.map((line, i) => {
                const start = startOffsets[i];
                const lineClassName = cn(
                  "block",
                  i === accentLine &&
                    "font-signature text-[1.3em] font-bold leading-[0.85] tracking-[-0.055em] text-gold",
                );
                return centered ? (
                  <TypedLine
                    key={i}
                    text={line}
                    startIndex={start}
                    className={lineClassName}
                  />
                ) : (
                  <span key={i} className={lineClassName}>
                    {line}
                  </span>
                );
              });
            })()}
          </h1>
          {subtext && (
            <p
              className={cn(
                "text-balance font-light leading-relaxed tracking-[0.01em] text-ivory/80 text-[0.975rem] sm:text-base",
                centered ? "mx-auto mt-5 max-w-md" : "mt-6 max-w-md",
              )}
            >
              {centered ? (
                <TypedWords text={subtext} startMs={headingEndMs} />
              ) : (
                subtext
              )}
            </p>
          )}
        </div>

        {(primaryCta || secondaryCta || watchLabel) && (
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-8 gap-y-5",
              centered ? "hero-cta-in mt-6 shrink-0 justify-center" : "mt-9",
            )}
            style={centered ? { animationDelay: `${ctaDelayMs}ms` } : undefined}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="btn-shimmer relative inline-flex items-center gap-2 overflow-hidden bg-gold px-7 py-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-charcoal transition-colors hover:bg-champagne"
              >
                {primaryCta.label}
                <IconArrowRight className="h-4 w-4" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border-b border-ivory/50 pb-1 text-[0.75rem] font-semibold tracking-[0.14em] text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                {secondaryCta.label}
              </Link>
            )}
            {watchLabel && (
              <button
                type="button"
                className="inline-flex items-center gap-2.5 text-[0.75rem] font-semibold tracking-[0.1em] text-ivory/90 transition-colors hover:text-gold"
              >
                <IconPlay className="h-8 w-8" />
                {watchLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {waveDivider && (
        <div
          className="relative z-10 h-14 w-full shrink-0 sm:h-20"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M0,40 C360,95 1080,0 1440,45 L1440,100 L0,100 Z"
              className={waveFill === "ivory" ? "fill-ivory" : "fill-cream"}
            />
          </svg>
        </div>
      )}

      {showScroll && (
        <div className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 text-ivory/70 sm:right-10 md:flex">
          <span className="text-[0.65rem] tracking-[0.3em] [writing-mode:vertical-rl]">
            SCROLL
          </span>
          <span className="h-10 w-px animate-pulse bg-ivory/50" />
        </div>
      )}
    </section>
  );
}

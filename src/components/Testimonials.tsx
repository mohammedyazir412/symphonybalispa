"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { IconStar, IconChevronLeft, IconChevronRight } from "@/components/icons";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  const current = testimonials[index];

  return (
    <section className="bg-charcoal py-20 text-ivory sm:py-28">
      <div className="container-luxe">
        <Reveal className="text-center" variant="scale">
          <Divider tone="light" align="center" className="mb-6" />
          <p className="eyebrow text-champagne">What Our Guests Say</p>
        </Reveal>

        <div
          className="mx-auto mt-10 max-w-2xl text-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mb-6 flex justify-center gap-1">
            {Array.from({ length: current.rating }).map((_, i) => (
              <IconStar key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-balance font-display text-2xl leading-snug sm:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <p className="mt-6 text-[0.8rem] tracking-[0.1em] text-ivory/60">
            {current.name.toUpperCase()} · GOOGLE REVIEWS
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-gold" : "bg-ivory/30"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

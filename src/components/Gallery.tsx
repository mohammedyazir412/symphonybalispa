"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";
import { IconClose, IconChevronLeft, IconChevronRight } from "@/components/icons";
import Reveal from "@/components/Reveal";

export interface GalleryItem {
  image: ImageKey;
  alt: string;
  size?: "sm" | "md" | "lg" | "tall";
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, items.length]);

  return (
    <>
      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
        {items.map((item, i) => (
          <Reveal
            key={`${item.image}-${i}`}
            delay={(i % 4) * 70}
            className={cn(
              item.size === "lg" && "col-span-2 row-span-2",
              item.size === "tall" && "row-span-2",
              item.size === "md" && "col-span-2",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block h-full w-full overflow-hidden"
              aria-label={`Open image: ${item.alt}`}
            >
              <Image
                src={img[item.image]}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-gold"
          >
            <IconClose className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length))
            }
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory transition-colors hover:text-gold sm:left-6"
          >
            <IconChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image
              src={img[items[openIndex].image]}
              alt={items[openIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={() =>
              setOpenIndex((i) => (i === null ? null : (i + 1) % items.length))
            }
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory transition-colors hover:text-gold sm:right-6"
          >
            <IconChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}

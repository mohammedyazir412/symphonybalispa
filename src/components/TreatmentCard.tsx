import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import type { Treatment } from "@/data/treatments";
import { IconClock, IconArrowRight } from "@/components/icons";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link
      href={`/treatments/${treatment.slug}`}
      className="group block bg-ivory"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={img[treatment.image]}
          alt={treatment.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
          className="object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="border border-t-0 border-ink/10 p-6">
        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-gold">
          {treatment.name}
        </h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60">
          {treatment.shortDescription}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="flex items-center gap-1.5 text-[0.72rem] tracking-[0.08em] text-ink/50">
            <IconClock className="h-3.5 w-3.5" />
            {treatment.duration}
          </span>
          <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.1em] text-gold">
            VIEW
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import type { LocationContent } from "@/data/locations";
import type { LocationId } from "@/data/site";
import { locationsContact } from "@/data/site";
import { IconMapPin, IconArrowRight } from "@/components/icons";

export default function LocationCard({
  location,
}: {
  location: LocationContent;
}) {
  const contact = locationsContact[location.id as LocationId];

  return (
    <div className="group flex flex-col overflow-hidden border border-ink/10 bg-ivory sm:flex-row">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:w-2/5">
        <Image
          src={img[location.heroImage]}
          alt={`${location.name} spa interior`}
          fill
          sizes="(min-width: 640px) 40vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
        <div>
          <p className="eyebrow">Luxury Spa</p>
          <h3 className="mt-2 font-display text-2xl text-ink">
            {location.name}
          </h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/65">
            {location.intro}
          </p>
          <p className="mt-4 flex items-start gap-2 text-[0.82rem] leading-relaxed text-ink/55">
            <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{contact.addressLines.join(" ")}</span>
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href={`/locations/${location.id}`}
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.12em] text-ink transition-colors hover:text-gold"
          >
            EXPLORE {location.name.toUpperCase()}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.12em] text-gold transition-colors hover:text-champagne"
          >
            BOOK APPOINTMENT
          </Link>
        </div>
      </div>
    </div>
  );
}

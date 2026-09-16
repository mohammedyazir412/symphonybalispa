import Image from "next/image";
import { stats } from "@/data/stats";
import { img } from "@/lib/images";
import {
  IconExperience,
  IconTherapist,
  IconGoogle,
  IconLocationPin,
  IconSmiley,
} from "@/components/icons";
import CountUp from "@/components/CountUp";

const icons = [
  IconExperience,
  IconTherapist,
  IconGoogle,
  IconLocationPin,
  IconSmiley,
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-16 text-ivory sm:py-20">
      <Image
        src={img.saunaInterior}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal/85" />

      <div className="container-luxe relative z-10 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
        {stats.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-4 px-4 text-center lg:border-l lg:border-ivory/15 lg:first:border-l-0"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ivory/5 backdrop-blur-sm">
                <Icon className="h-6 w-6 text-gold" />
              </span>
              <div>
                <CountUp
                  target={stat.numeric}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  className="font-display text-3xl text-ivory sm:text-4xl"
                />
                <p className="eyebrow mt-2 text-champagne">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

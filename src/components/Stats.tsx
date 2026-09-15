import { stats } from "@/data/stats";
import {
  IconAward,
  IconStethoscope,
  IconGoogle,
  IconMapPin,
  IconSmiley,
} from "@/components/icons";

const icons = [IconAward, IconStethoscope, IconGoogle, IconMapPin, IconSmiley];

export default function Stats() {
  return (
    <section className="border-b border-ink/10 bg-cream">
      <div className="container-luxe grid grid-cols-1 gap-y-10 py-14 sm:grid-cols-3 sm:py-16 lg:grid-cols-5 lg:gap-y-0">
        {stats.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 px-4 lg:border-l lg:border-ink/10 lg:first:border-l-0"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40">
                <Icon className="h-5 w-5 text-gold" />
              </span>
              <div>
                <span className="font-display text-3xl text-gold sm:text-4xl">
                  {stat.value}
                </span>
                <p className="mt-0.5 text-[0.8rem] text-ink/55">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

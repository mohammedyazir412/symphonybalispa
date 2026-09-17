import Image from "next/image";
import { IconGoogleG, IconStar } from "@/components/icons";
import Reveal from "@/components/Reveal";
import Divider from "@/components/Divider";
import { img } from "@/lib/images";

const badges = [
  {
    key: "google",
    title: "Google Reviews",
    rating: "4.8",
    stars: 5,
    caption: "Based on customer reviews",
  },
  {
    key: "justdial",
    title: "Justdial Reviews",
    rating: "4.6",
    stars: 4,
    caption: "Verified local customer ratings",
  },
] as const;

export default function ReviewBadges() {
  return (
    <section className="bg-charcoal pt-16 pb-2 text-ivory sm:pt-20">
      <div className="container-luxe">
        <Reveal className="text-center" variant="scale">
          <Divider tone="light" align="center" className="mb-6" />
          <p className="eyebrow text-champagne">Trusted By Our Guests</p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-stretch divide-y divide-ivory/10 sm:flex-row sm:divide-x sm:divide-y-0">
          {badges.map((badge, i) => (
            <Reveal
              key={badge.key}
              delay={i * 100}
              variant={i === 0 ? "left" : "right"}
              className="flex-1"
            >
              <div className="flex h-full flex-col items-center gap-3 px-8 py-7 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ivory/5">
                  {badge.key === "google" ? (
                    <IconGoogleG className="h-6 w-6" />
                  ) : (
                    <Image
                      src={img.justdialLogo}
                      alt="Justdial"
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                  )}
                </span>

                <span className="font-display text-4xl leading-none text-ivory">
                  {badge.rating}
                  <span className="text-lg text-ivory/50">/5</span>
                </span>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <IconStar
                      key={si}
                      className={
                        si < badge.stars
                          ? "h-3.5 w-3.5 fill-gold text-gold"
                          : "h-3.5 w-3.5 text-gold/30"
                      }
                    />
                  ))}
                </div>

                <p className="mt-1 text-[0.8rem] font-semibold tracking-[0.14em] text-gold uppercase">
                  {badge.title}
                </p>
                <p className="text-sm text-ivory/50">{badge.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

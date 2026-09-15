import Image from "next/image";
import { img, type ImageKey } from "@/lib/images";
import { amenities, type AmenityIcon } from "@/data/amenities";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import {
  IconRoom,
  IconSteam,
  IconJacuzzi,
  IconProduct,
} from "@/components/icons";

const iconMap: Record<AmenityIcon, typeof IconRoom> = {
  room: IconRoom,
  steam: IconSteam,
  jacuzzi: IconJacuzzi,
  product: IconProduct,
};

export default function AmenitySection({
  image = "villaPlungePool",
}: {
  image?: ImageKey;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-ivory sm:py-28">
      <Image
        src={img[image]}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/85 to-charcoal" />

      <div className="container-luxe relative z-10">
        <Reveal variant="down">
          <Divider tone="light" className="mb-6" />
          <SectionHeading
            eyebrow="Premium Amenities"
            heading="Your Private Escape"
            description="Step into a world of tranquility with thoughtful facilities designed to complement your wellness journey."
            tone="light"
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity, i) => {
            const Icon = iconMap[amenity.icon];
            return (
              <Reveal as="li" key={amenity.name} delay={i * 90} variant="down">
                <Icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-lg text-ivory">
                  {amenity.name}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-ivory/60">
                  {amenity.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

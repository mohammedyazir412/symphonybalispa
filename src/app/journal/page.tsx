import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import { img } from "@/lib/images";
import { posts } from "@/data/blog";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Wellness notes from Symphony Bali Spa — on Balinese massage tradition, how to prepare for a treatment, and the rituals behind our menu.",
  alternates: { canonical: "/journal" },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function JournalPage() {
  return (
    <>
      <Hero
        image="meditationSilhouette"
        eyebrow="The Journal"
        heading={["NOTES ON", "STILLNESS."]}
        subtext="Reflections on Balinese ritual, wellness habits and the craft behind our treatments."
        size="page"
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />
            <SectionHeading eyebrow="From Symphony" heading="The Journal" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 90}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={img[post.image]}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="eyebrow">
                      {post.category} · {formatDate(post.date)}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink transition-colors group-hover:text-gold">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.1em] text-gold">
                      READ ARTICLE
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

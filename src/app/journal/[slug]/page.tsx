import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/data/blog";
import { img } from "@/lib/images";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { IconArrowRight } from "@/components/icons";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
  };
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="relative flex min-h-[400px] items-end overflow-hidden bg-charcoal text-ivory sm:min-h-[460px]">
        <Image
          src={img[post.image]}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/15" />
        <div className="container-luxe relative z-10 pb-16 pt-32">
          <p className="eyebrow mb-4 text-champagne">
            {post.category} · {formatDate(post.date)}
          </p>
          <h1 className="max-w-2xl text-balance font-display text-3xl leading-[1.1] sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe max-w-2xl">
          <Reveal>
            <Divider className="mb-8" />
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[1rem] leading-relaxed text-ink/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-12 border-t border-ink/10 pt-8">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] text-ink transition-colors hover:text-gold"
            >
              ← BACK TO THE JOURNAL
            </Link>
          </Reveal>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-luxe">
            <p className="eyebrow mb-8">Continue Reading</p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/journal/${other.slug}`}
                  className="group flex items-center gap-5"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24">
                    <Image
                      src={img[other.image]}
                      alt={other.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-ink transition-colors group-hover:text-gold">
                      {other.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.1em] text-gold">
                      READ ARTICLE
                      <IconArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

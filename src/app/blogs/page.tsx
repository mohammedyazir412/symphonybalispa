import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import BlogCard from "@/components/BlogCard";
import BlogPagination from "@/components/BlogPagination";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { getBlogPosts, POSTS_PER_PAGE } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Wellness Blog | Symphony Bali Spa – Tips, Treatments & Relaxation",
  description:
    "Explore the Symphony Bali Spa blog for expert wellness tips, Bali spa treatment guides, relaxation techniques, and self-care advice for Madurai and Theni.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Wellness Blog | Symphony Bali Spa",
    description:
      "Expert wellness tips, spa treatment guides, and relaxation advice from Symphony Bali Spa — Madurai & Theni.",
    url: `${site.url}/blogs`,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${site.url}/images/logo.png`,
        width: 512,
        height: 512,
        alt: "Symphony Bali Spa Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Blog | Symphony Bali Spa",
    description:
      "Expert wellness tips, spa treatment guides, and relaxation advice.",
    images: [`${site.url}/images/logo.png`],
  },
};

export default async function BlogsPage() {
  const currentPage = 1;

  const { posts, totalPages, totalPosts } = await getBlogPosts({
    page: 1,
    perPage: POSTS_PER_PAGE,
  });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Symphony Bali Spa – Wellness Blog",
    url: `${site.url}/blogs/`,
    description:
      "Expert wellness tips, Bali spa treatment guides, and relaxation advice.",
    publisher: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/logo.png`,
    },
  };

  return (
    <>
      <JsonLd data={blogSchema} />

      <Hero
        image="meditationSilhouette"
        eyebrow="The Wellness Journal"
        heading={["INSIGHTS ON", "STILLNESS & CARE."]}
        subtext="Explore Balinese healing philosophies, expert treatment insights, and everyday rituals for mindful well-being."
        size="page"
      />

      <section
        className="bg-ivory py-20 sm:py-28"
        aria-label="Blog articles"
      >
        <div className="container-luxe">
          <Reveal>
            <Divider className="mb-6" />

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionHeading
                  eyebrow="From Symphony"
                  heading="Our Latest Articles"
                />

                <p className="mt-2 max-w-xl text-[0.95rem] text-ink/65">
                  Curated guidance from our therapists and wellness
                  practitioners to help you restore balance in body and mind.
                </p>
              </div>

              {totalPosts > 0 && (
                <div className="text-[0.8rem] font-medium uppercase tracking-widest text-gold">
                  Showing Page {currentPage} of {totalPages} ({totalPosts} Total
                  Articles)
                </div>
              )}
            </div>
          </Reveal>

          {posts.length > 0 ? (
            <>
              <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 90}>
                    <BlogCard
                      post={post}
                      priority={currentPage === 1 && i < 3}
                    />
                  </Reveal>
                ))}
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/blogs"
              />
            </>
          ) : (
            <div className="mt-16 rounded-2xl border border-ink/10 bg-white/50 p-12 text-center">
              <h3 className="font-display text-2xl text-charcoal">
                Articles Are Updating
              </h3>

              <p className="mt-3 text-[0.95rem] text-ink/70">
                We couldn&apos;t load articles for this page right now. Please
                try refreshing or checking back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Divider from "@/components/Divider";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { site, locationsContact } from "@/data/site";
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getRecentBlogPosts,
} from "@/lib/wordpress";
import { IconArrowRight, IconWhatsapp, IconPhone } from "@/components/icons";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Symphony Bali Spa",
      description: "The requested blog article could not be found.",
    };
  }

  const canonicalUrl = `/blogs/${post.slug}`;
  const imageUrl = post.imageUrl || `${site.url}/images/logo.png`;

  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      url: `${site.url}${canonicalUrl}`,
      siteName: site.name,
      locale: "en_IN",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = await getRecentBlogPosts(post.slug, 3);
  const canonicalUrl = `${site.url}/blogs/${post.slug}`;
  const imageUrl = post.imageUrl || `${site.url}/images/logo.png`;
  const primaryCategory = post.categories[0] || post.tags[0] || "Spa & Wellness";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    datePublished: post.date,
    dateModified: post.modified,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${site.url}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const shareText = encodeURIComponent(`${post.title} - ${canonicalUrl}`);
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-charcoal pb-16 pt-32 text-ivory sm:pb-24 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,154,98,0.15),transparent_60%)]" />
        <div className="container-luxe relative z-10 max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="mb-6 flex flex-wrap items-center gap-2 text-[0.78rem] tracking-wider text-ivory/60"
          >
            <Link href="/" className="transition-colors hover:text-gold">
              HOME
            </Link>
            <span>/</span>
            <Link href="/blogs" className="transition-colors hover:text-gold">
              BLOGS
            </Link>
            <span>/</span>
            <span className="text-champagne truncate max-w-[200px] sm:max-w-md">
              {post.title}
            </span>
          </nav>

          <span className="inline-block rounded-full border border-gold/30 bg-gold/15 px-3.5 py-1 text-[0.72rem] font-semibold tracking-widest text-champagne uppercase backdrop-blur-md">
            {primaryCategory}
          </span>

          <h1 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.15] text-balance text-ivory">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-6 text-[0.82rem] text-ivory/70">
            <div>
              Published on <time dateTime={post.date} className="text-ivory font-medium">{post.dateFormatted}</time>
            </div>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <div>{post.readTime}</div>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <div>By Symphony Editorial</div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <article className="bg-ivory py-16 sm:py-24">
        <div className="container-luxe max-w-3xl">
          <div className="mb-10 flex items-center justify-between">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:text-gold"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to all articles
            </Link>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-1.5 text-[0.75rem] font-medium text-ink transition-all hover:border-gold hover:text-gold shadow-sm"
              aria-label="Share on WhatsApp"
            >
              <IconWhatsapp className="h-3.5 w-3.5 text-[#25D366]" />
              Share
            </a>
          </div>

          <Divider className="mb-10" />

          {/* Rendered HTML Content */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Footer & Quick Actions */}
          <Reveal delay={100} className="mt-16 border-t border-ink/10 pt-10">
            {post.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="text-[0.78rem] font-semibold tracking-wider text-ink/50 uppercase mr-2">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 bg-cream/70 px-3 py-1 text-[0.72rem] text-ink/75"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-gold/25 bg-cream/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h4 className="font-display text-xl text-charcoal">
                  Experience Symphony Wellness
                </h4>
                <p className="mt-1 text-[0.875rem] text-ink/70">
                  Immerse in authentic Balinese spa therapies in Madurai &amp; Theni.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/book"
                  className="rounded-full bg-gold px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.12em] text-charcoal transition-all hover:bg-champagne uppercase shadow"
                >
                  Book Session
                </Link>
                <a
                  href={`tel:${locationsContact.madurai.phoneHref}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-gold hover:text-gold"
                  aria-label="Call Symphony Bali Spa"
                >
                  <IconPhone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Continue Reading / Related Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-cream/60 py-20 sm:py-24 border-t border-ink/5">
          <div className="container-luxe">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-2">More from Symphony</p>
                <h2 className="font-display text-2xl sm:text-4xl text-charcoal">
                  Continue Reading
                </h2>
              </div>
              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.14em] text-gold uppercase transition-colors hover:text-espresso"
              >
                View All Articles
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

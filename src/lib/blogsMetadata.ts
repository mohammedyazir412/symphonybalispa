import type { Metadata } from "next";
import { site } from "@/data/site";

export function blogsMetadata(currentPage: number): Metadata {
  const canonicalUrl = currentPage > 1 ? `/blogs/page/${currentPage}` : "/blogs";

  return {
    title: "Wellness Blog | Symphony Bali Spa – Tips, Treatments & Relaxation",
    description:
      "Explore the Symphony Bali Spa blog for expert wellness tips, Bali spa treatment guides, relaxation techniques, and self-care advice for Madurai and Theni.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Wellness Blog | Symphony Bali Spa",
      description:
        "Expert wellness tips, spa treatment guides, and relaxation advice from Symphony Bali Spa — Madurai & Theni.",
      url: `${site.url}${canonicalUrl}`,
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
}


import type { Metadata } from "next";
import { site } from "@/data/site";

export function blogsMetadata(currentPage: number): Metadata {
  const canonicalUrl = currentPage > 1 ? `/blogs/page/${currentPage}` : "/blogs";

  return {
    title: {
      absolute: "Symphony Bali Spa Blogs | Wellness, Treatments & Relaxation",
    },
    description:
      "Explore the Symphony Bali Spa insights on Balinese massage, spa treatments, wellness tips, relaxation techniques and simple self-care ideas for routine life.",
    keywords: ["Symphony Bali Spa Blogs"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Symphony Bali Spa Blogs | Wellness, Treatments & Relaxation",
      description:
        "Explore the Symphony Bali Spa insights on Balinese massage, spa treatments, wellness tips, relaxation techniques and simple self-care ideas for routine life.",
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
      title: "Symphony Bali Spa Blogs | Wellness, Treatments & Relaxation",
      description:
        "Explore the Symphony Bali Spa insights on Balinese massage, spa treatments, wellness tips, relaxation techniques and simple self-care ideas for routine life.",
      images: [`${site.url}/images/logo.png`],
    },
  };
}


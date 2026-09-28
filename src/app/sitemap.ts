import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";
import { posts } from "@/data/blog";
import { getAllBlogPostSlugs } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/treatments",
    "/locations",
    "/locations/madurai",
    "/locations/theni",
    "/gallery",
    "/blogs",
    // "/journal",
    "/contact",
    "/book",
  ];

  const treatmentRoutes = treatments.map((t) => `/treatments/${t.slug}`);
  // const journalRoutes = posts.map((p) => `/journal/${p.slug}`);

  let blogSlugs: string[] = [];
  try {
    blogSlugs = await getAllBlogPostSlugs();
  } catch (err) {
    console.error("Failed to fetch blog slugs for sitemap:", err);
  }
  const blogRoutes = blogSlugs.map((slug) => `/blogs/${slug}`);

  const routes = [
    ...staticRoutes,
    ...treatmentRoutes,
    // ...journalRoutes,
    ...blogRoutes,
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : route.startsWith("/blogs") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/blogs" ? 0.8 : 0.7,
  }));
}

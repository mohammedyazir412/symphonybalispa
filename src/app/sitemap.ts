import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";
import { posts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/treatments",
    "/locations",
    "/locations/madurai",
    "/locations/theni",
    "/gallery",
    "/journal",
    "/contact",
    "/book",
  ];

  const treatmentRoutes = treatments.map((t) => `/treatments/${t.slug}`);
  const postRoutes = posts.map((p) => `/journal/${p.slug}`);

  const routes = [...staticRoutes, ...treatmentRoutes, ...postRoutes];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

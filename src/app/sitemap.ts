import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { serviceSlugs } from "@/content/service-details";
import { locationSlugs } from "@/content/locations";
import { tipSlugs } from "@/content/tips";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/prices",
    "/gallery",
    "/testimonials",
    "/tips",
    "/locations",
    "/payments",
    "/contact-us",
  ];

  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  for (const slug of serviceSlugs) {
    entries.push({
      url: `${base}/pool-services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const slug of locationSlugs) {
    entries.push({
      url: `${base}/locations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const slug of tipSlugs) {
    entries.push({
      url: `${base}/tips/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}

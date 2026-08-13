import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";

const BASE = "https://vietnamguider.one";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/disclosure`, priority: 0.3 },
    ...posts,
  ];
}

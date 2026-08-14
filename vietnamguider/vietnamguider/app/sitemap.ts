import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";

const BASE = "https://vietnamguider.one";

/**
 * CHỈ liệt kê trang có nội dung thật.
 * Các trang hub (/plan, /food, /visa ...) đang noindex nên không đưa vào đây.
 * Khi một hub đã có nội dung: bỏ `robots` trong page của nó, rồi thêm vào mảng dưới.
 */
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
    { url: `${BASE}/destinations`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/about`, priority: 0.6 },
    { url: `${BASE}/methodology`, priority: 0.5 },
    { url: `${BASE}/disclosure`, priority: 0.3 },
    ...posts,
  ];
}

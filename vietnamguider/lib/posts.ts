// ── ARTICLE REGISTRY ────────────────────────────────────────────────
// To publish a new article you do TWO things:
//   1. Create the article file:  app/blog/<slug>/page.mdx
//   2. Add ONE line to the list below so it shows on the /blog page.
// The `slug` must match the folder name exactly.

export type Category =
  | "Destinations"
  | "Getting Around"
  | "Itineraries"
  | "Travel Tools";

export type Post = {
  slug: string; // folder name under app/blog/
  title: string;
  description: string; // 1 sentence, also used for SEO
  category: Category;
  date: string; // "2026-08-12"
  readMinutes: number;
};

export const POSTS: Post[] = [
  {
    slug: "hanoi-to-ha-long-bay",
    title: "Hanoi to Ha Long Bay: cheapest, fastest and comfiest ways",
    description:
      "Every way to travel from Hanoi to Ha Long Bay, compared by price, time and comfort — with links to book each one.",
    category: "Getting Around",
    date: "2026-08-12",
    readMinutes: 5,
  },
];

// Newest first — used by the /blog page.
export const postsByNewest = [...POSTS].sort((a, b) =>
  b.date.localeCompare(a.date)
);

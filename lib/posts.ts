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
    slug: "hanoi-to-sa-pa",
    title: "Hanoi to Sa Pa: cheapest, easiest and most comfortable ways",
    description:
      "Sleeper bus, limousine van, private car or overnight train — every way from Hanoi to Sa Pa, compared, with links to book.",
    category: "Getting Around",
    date: "2026-08-12",
    readMinutes: 5,
  },
  {
    slug: "hanoi-to-ninh-binh",
    title: "Hanoi to Ninh Binh: cheapest, easiest and comfiest ways",
    description:
      "Train, limousine van or private car to Tam Coc and Trang An — compared by price, time and comfort.",
    category: "Getting Around",
    date: "2026-08-12",
    readMinutes: 4,
  },
  {
    slug: "hanoi-to-ha-giang",
    title: "Hanoi to Ha Giang: cheapest, easiest and comfiest ways",
    description:
      "How to reach the gateway to the Ha Giang Loop by sleeper bus, limousine van or private car.",
    category: "Getting Around",
    date: "2026-08-12",
    readMinutes: 4,
  },
  {
    slug: "hanoi-to-cat-ba",
    title: "Hanoi to Cat Ba Island: cheapest, easiest and comfiest ways",
    description:
      "Bus-and-ferry combos, limousine packages or private transfers to Cat Ba and Lan Ha Bay, compared.",
    category: "Getting Around",
    date: "2026-08-12",
    readMinutes: 5,
  },
  {
    slug: "hanoi-to-mai-chau",
    title: "Hanoi to Mai Chau: cheapest, easiest and comfiest ways",
    description:
      "Bus, limousine van or private car to the stilt-house valley of Mai Chau — compared, with links to book.",
    category: "Getting Around",
    date: "2026-08-12",
    readMinutes: 4,
  },
];

// Newest first — used by the /blog page.
export const postsByNewest = [...POSTS].sort((a, b) =>
  b.date.localeCompare(a.date)
);

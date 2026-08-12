// Single source of truth for the header navigation.
// Both the desktop menu and the mobile drawer render from this array.
// To rename or add a menu item, edit ONLY this file.

export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  // If `columns` is present the item opens a mega menu; otherwise it is a plain link.
  columns?: NavColumn[];
};

export const NAV: NavItem[] = [
  {
    label: "Destinations",
    href: "/destinations",
    columns: [
      {
        heading: "North",
        links: [
          { label: "Hanoi", href: "/destinations/hanoi" },
          { label: "Ha Long Bay", href: "/destinations/ha-long-bay" },
          { label: "Ninh Binh", href: "/destinations/ninh-binh" },
          { label: "Sa Pa", href: "/destinations/sa-pa" },
        ],
      },
      {
        heading: "Central",
        links: [
          { label: "Hoi An", href: "/destinations/hoi-an" },
          { label: "Da Nang", href: "/destinations/da-nang" },
          { label: "Hue", href: "/destinations/hue" },
        ],
      },
      {
        heading: "South",
        links: [
          { label: "Ho Chi Minh City", href: "/destinations/ho-chi-minh-city" },
          { label: "Phu Quoc", href: "/destinations/phu-quoc" },
          { label: "Mekong Delta", href: "/destinations/mekong-delta" },
        ],
      },
    ],
  },
  {
    label: "Plan Your Trip",
    href: "/plan",
    columns: [
      {
        heading: "Itineraries",
        links: [
          { label: "7 days in Vietnam", href: "/plan/itineraries/7-days" },
          { label: "10 days in Vietnam", href: "/plan/itineraries/10-days" },
          { label: "14 days in Vietnam", href: "/plan/itineraries/14-days" },
        ],
      },
      {
        heading: "Tools & Guides",
        links: [
          { label: "Vietnam Trip Builder", href: "/trip-builder", note: "Build your own itinerary" },
          { label: "Digital Planners & Kits", href: "/plan/planners" },
        ],
      },
    ],
  },
  { label: "Things to Do", href: "/things-to-do" },
  { label: "Getting Around", href: "/blog" },
  { label: "Where to Stay", href: "/stay" },
  { label: "Food", href: "/food" },
  { label: "Vietnam Visa", href: "/visa" },
  { label: "Travel Tools", href: "/tools" },
  { label: "Deals", href: "/deals" },
];

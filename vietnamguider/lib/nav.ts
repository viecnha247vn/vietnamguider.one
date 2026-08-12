// Single source of truth for the header navigation.
// Both the desktop mega menu and the mobile drawer render from this array,
// so you add a new destination or guide in ONE place.

export type NavLink = {
  label: string;
  href: string;
  note?: string; // optional one-line hint shown under the link
};

export type NavColumn = {
  heading: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href: string; // landing page for the whole section
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
          { label: "Visa Guide", href: "/plan/visa" },
          { label: "Digital Planners & Kits", href: "/plan/planners" },
        ],
      },
    ],
  },
  {
    label: "Getting Around",
    href: "/getting-around",
    columns: [
      {
        heading: "Arrivals & transfers",
        links: [
          { label: "Airport Transfers", href: "/getting-around/airport-transfers" },
          { label: "Private Cars", href: "/getting-around/private-cars" },
        ],
      },
      {
        heading: "Intercity",
        links: [
          { label: "Limousine Buses", href: "/getting-around/limousine-buses" },
          { label: "Trains", href: "/getting-around/trains" },
          { label: "Motorbike Rentals", href: "/getting-around/motorbike-rentals" },
        ],
      },
    ],
  },
  {
    label: "Experiences & Stay",
    href: "/experiences",
    columns: [
      {
        heading: "Do & eat",
        links: [
          { label: "Things to Do", href: "/experiences/things-to-do" },
          { label: "Food Tours", href: "/experiences/food-tours" },
        ],
      },
      {
        heading: "Where to stay",
        links: [
          { label: "Budget", href: "/stay/budget" },
          { label: "Mid-range", href: "/stay/mid-range" },
          { label: "Luxury", href: "/stay/luxury" },
        ],
      },
    ],
  },
  {
    label: "Travel Tools & Deals",
    href: "/tools",
    columns: [
      {
        heading: "Before you fly",
        links: [
          { label: "eSIM Guides", href: "/tools/esim" },
          { label: "Travel Insurance", href: "/tools/insurance" },
        ],
      },
      {
        heading: "On the ground",
        links: [
          { label: "Currency & App Guides", href: "/tools/apps" },
          { label: "Exclusive Discounts", href: "/tools/deals", note: "Reader-only offers" },
        ],
      },
    ],
  },
];

export type Language = { code: string; label: string };

export const LANGUAGES: Language[] = [
  { code: "en", label: "EN" },
  { code: "sv", label: "SE" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "ko", label: "KO" },
];

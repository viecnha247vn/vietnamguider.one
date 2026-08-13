// Nguồn duy nhất cho thanh điều hướng.
//
// QUY TẮC: mọi href ở đây PHẢI có trang thật trong app/.
// Mục nào chưa có nội dung thì trang hub của nó đặt noindex
// (xem components/HubPage.tsx) — có trang, không 404, không rác trên Google.

export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  columns?: NavColumn[];
  soon?: boolean; // chưa có nội dung — hiện dấu "sắp có" trong menu
};

/** 10 điểm đến rút từ chính 10 bài đã có. Không bịa. */
export const DESTINATIONS = [
  { name: "Sa Pa",      region: "The North",  href: "/blog/hanoi-to-sa-pa" },
  { name: "Ninh Bình",  region: "The North",  href: "/blog/hanoi-to-ninh-binh" },
  { name: "Hà Giang",   region: "The North",  href: "/blog/hanoi-to-ha-giang" },
  { name: "Cát Bà",     region: "The North",  href: "/blog/hanoi-to-cat-ba" },
  { name: "Mai Châu",   region: "The North",  href: "/blog/hanoi-to-mai-chau" },
  { name: "Hội An",     region: "Central", href: "/blog/da-nang-to-hoi-an" },
  { name: "Huế",        region: "Central", href: "/blog/da-nang-to-hue" },
  { name: "Đà Lạt",     region: "The South",  href: "/blog/ho-chi-minh-city-to-da-lat" },
  { name: "Mũi Né",     region: "The South",  href: "/blog/ho-chi-minh-city-to-mui-ne" },
  { name: "Phú Quốc",   region: "The South",  href: "/blog/ho-chi-minh-city-to-phu-quoc" },
];

const byRegion = (r: string): NavLink[] =>
  DESTINATIONS.filter((d) => d.region === r).map((d) => ({ label: d.name, href: d.href }));

export const NAV: NavItem[] = [
  {
    label: "Destinations",
    href: "/destinations",
    columns: [
      { heading: "The North", links: byRegion("Miền Bắc") },
      { heading: "Central", links: byRegion("Miền Trung") },
      { heading: "The South", links: byRegion("Miền Nam") },
    ],
  },
  { label: "Plan Your Trip", href: "/plan", soon: true },
  { label: "Things To Do", href: "/things-to-do", soon: true },
  {
    label: "Getting Around",
    href: "/blog",
    columns: [
      {
        heading: "From Hà Nội",
        links: [
          { label: "Hà Nội → Sa Pa", href: "/blog/hanoi-to-sa-pa" },
          { label: "Hà Nội → Ninh Bình", href: "/blog/hanoi-to-ninh-binh" },
          { label: "Hà Nội → Hà Giang", href: "/blog/hanoi-to-ha-giang" },
          { label: "Hà Nội → Cát Bà", href: "/blog/hanoi-to-cat-ba" },
          { label: "Hà Nội → Mai Châu", href: "/blog/hanoi-to-mai-chau" },
        ],
      },
      {
        heading: "From Đà Nẵng",
        links: [
          { label: "Đà Nẵng → Hội An", href: "/blog/da-nang-to-hoi-an" },
          { label: "Đà Nẵng → Huế", href: "/blog/da-nang-to-hue" },
        ],
      },
      {
        heading: "From Hồ Chí Minh City",
        links: [
          { label: "TP.HCM → Đà Lạt", href: "/blog/ho-chi-minh-city-to-da-lat" },
          { label: "TP.HCM → Mũi Né", href: "/blog/ho-chi-minh-city-to-mui-ne" },
          { label: "TP.HCM → Phú Quốc", href: "/blog/ho-chi-minh-city-to-phu-quoc" },
        ],
      },
    ],
  },
  { label: "Where To Stay", href: "/stay", soon: true },
  { label: "Food", href: "/food", soon: true },
  { label: "Vietnam Visa", href: "/visa", soon: true },
  { label: "Travel Tools", href: "/tools", soon: true },
  { label: "Deals", href: "/deals", soon: true },
  { label: "My Trip", href: "/my-trip" },
];

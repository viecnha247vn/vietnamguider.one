// Nguồn duy nhất cho thanh điều hướng.
//
// QUY TẮC: mọi href ở đây PHẢI có trang thật trong app/.
// Mục nào chưa có nội dung thì trang hub của nó đặt noindex
// (xem components/HubPage.tsx) — có trang, không 404, không rác trên Google.

import { DESTINATIONS } from "@/lib/destinations";

/** Menu chỉ liệt kê điểm đến ĐÃ có bài — mục không có bài thì không thành link. */
const navDest = (r: string): NavLink[] =>
  DESTINATIONS.filter((d) => d.region === r && d.guide).map((d) => ({ label: d.name, href: d.guide! }));

export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  columns?: NavColumn[];
  soon?: boolean; // chưa có nội dung — hiện dấu "soon" trong menu
};


export const NAV: NavItem[] = [
  {
    label: "Destinations",
    href: "/destinations",
    columns: [
      { heading: "The North", links: navDest("The North") },
      { heading: "Central", links: navDest("Central") },
      { heading: "The South", links: navDest("The South") },
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

// Nguồn duy nhất cho thanh điều hướng.
// QUY TẮC: chỉ đưa vào đây những trang ĐÃ TỒN TẠI.
// Mỗi mục thừa là một lỗi 404 mà Google sẽ ghi nhận.

export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[] };

export const NAV: NavItem[] = [
  {
    label: "Getting Around",
    href: "/blog",
    columns: [
      {
        heading: "Miền Bắc",
        links: [
          { label: "Hà Nội → Sa Pa", href: "/blog/hanoi-to-sa-pa" },
          { label: "Hà Nội → Ninh Bình", href: "/blog/hanoi-to-ninh-binh" },
          { label: "Hà Nội → Hà Giang", href: "/blog/hanoi-to-ha-giang" },
          { label: "Hà Nội → Cát Bà", href: "/blog/hanoi-to-cat-ba" },
          { label: "Hà Nội → Mai Châu", href: "/blog/hanoi-to-mai-chau" },
        ],
      },
      {
        heading: "Miền Trung",
        links: [
          { label: "Đà Nẵng → Hội An", href: "/blog/da-nang-to-hoi-an" },
          { label: "Đà Nẵng → Huế", href: "/blog/da-nang-to-hue" },
        ],
      },
      {
        heading: "Miền Nam",
        links: [
          { label: "TP.HCM → Đà Lạt", href: "/blog/ho-chi-minh-city-to-da-lat" },
          { label: "TP.HCM → Mũi Né", href: "/blog/ho-chi-minh-city-to-mui-ne" },
          { label: "TP.HCM → Phú Quốc", href: "/blog/ho-chi-minh-city-to-phu-quoc" },
        ],
      },
    ],
  },
  { label: "All guides", href: "/blog" },
];

// ─────────────────────────────────────────────────────────────
// Thêm lại khi trang tương ứng đã tồn tại:
//   { label: "Destinations",  href: "/destinations" }
//   { label: "Plan Your Trip", href: "/plan" }
//   { label: "Where to Stay",  href: "/stay" }
//   { label: "Vietnam Visa",   href: "/visa" }
//   { label: "Deals",          href: "/deals" }

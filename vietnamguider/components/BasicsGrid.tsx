import Link from "next/link";

/**
 * "Travel basics" — bản làm lại của khối Travel Tips trên vietnam.travel.
 *
 * Họ xếp mỗi icon một hàng: trên di động phải cuộn 5 màn hình để xem 5 mục.
 * Ở đây là LƯỚI 2 cột trên di động, 3 cột trên máy tính — thấy hết trong một màn.
 *
 * Icon vẽ nét tay, cố ý hơi lệch. Đây là BIỂU TƯỢNG chứ không phải hình
 * minh hoạ địa điểm, nên trừu tượng là đúng — khác với con dấu phong cảnh
 * mà tôi đã bỏ.
 */
type Basic = { label: string; href: string; icon: keyof typeof ICONS; note: string };

const ITEMS: Basic[] = [
  { label: "Visas",     href: "/visa",  icon: "stamp",  note: "E-visa, exemptions, extensions" },
  { label: "Transport", href: "/blog",  icon: "bus",    note: "Bus, train, van, plane" },
  { label: "Weather",   href: "/plan",  icon: "cloud",  note: "Month by month, by region" },
  { label: "Money",     href: "/plan",  icon: "note",   note: "Dong, cards, what things cost" },
  { label: "Safety",    href: "/plan",  icon: "shield", note: "Scams, traffic, street food" },
  { label: "Food",      href: "/food",  icon: "bowl",   note: "What to order, how to say it" },
];

export default function BasicsGrid() {
  return (
    <ul className="grid grid-cols-2 gap-px border-2 border-muc bg-muc sm:grid-cols-3">
      {ITEMS.map((it) => (
        <li key={it.label}>
          <Link
            href={it.href}
            className="group flex h-full flex-col items-start gap-2 bg-giay p-5 transition-colors hover:bg-giay-sau"
          >
            <span className="text-son transition-transform group-hover:-translate-y-[2px]">
              {ICONS[it.icon]}
            </span>
            <span className="font-sig text-[12px] font-extrabold uppercase tracking-[.14em] text-men">
              {it.label}
            </span>
            <span className="text-[14.5px] leading-snug text-muc/70">{it.note}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const S = {
  width: 40, height: 40, viewBox: "0 0 40 40", fill: "none",
  stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, "aria-hidden": true,
};

const ICONS = {
  // con dấu nhập cảnh
  stamp: (
    <svg {...S}><path d="M5 11.5c9-1 21-1.2 30 0 .8 6 .8 11 0 17-9 1.2-21 1-30 0-.9-6-.9-11 0-17Z" />
      <path d="M10 17c6-.7 14-.8 20 0M10 23c6-.7 14-.8 20 0" /></svg>
  ),
  // xe giường nằm
  bus: (
    <svg {...S}><path d="M6 12c9-1 19-1 28 0v13c-9 1-19 1-28 0V12Z" />
      <path d="M6 19c9-.8 19-.8 28 0" /><circle cx="12" cy="29" r="2.5" /><circle cx="28" cy="29" r="2.5" />
      <path d="M6 25h2M32 25h2" /></svg>
  ),
  // mây và gió
  cloud: (
    <svg {...S}><path d="M13 27c-4 0-6-2.5-6-5.5S9.5 16 13 16c.6-4 3.6-6 7-6 4 0 7 3 7 7 3 0 6 2 6 5s-2.5 5-6 5H13Z" />
      <path d="M4 31c4-.6 9-.6 13 0" /></svg>
  ),
  // tờ tiền
  note: (
    <svg {...S}><path d="M4 12c11-1.2 21-1.2 32 0v16c-11 1.2-21 1.2-32 0V12Z" />
      <circle cx="20" cy="20" r="4.5" /><path d="M9 17v6M31 17v6" /></svg>
  ),
  // khiên
  shield: (
    <svg {...S}><path d="M20 5c4 2.5 8 3.5 12 3.5.5 12-3 20-12 26C11 28.5 7.5 20.5 8 8.5 12 8.5 16 7.5 20 5Z" />
      <path d="M14.5 19.5 19 24l7-8.5" /></svg>
  ),
  // bát và đũa
  bowl: (
    <svg {...S}><path d="M5 20c10-1 20-1 30 0-1 7-6 11-15 11S6 27 5 20Z" />
      <path d="M24 6 18 17M29 7l-7 10" /></svg>
  ),
};

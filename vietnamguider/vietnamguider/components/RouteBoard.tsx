import { decorate } from "@/lib/aff";
import type { ReactNode } from "react";
import SaveButton from "@/components/SaveButton";

/** Chấp nhận cả nhãn mới (vi) lẫn nhãn cũ (en) để bài .mdx cũ không vỡ. */
type Tier = "re" | "de" | "em" | "cheapest" | "convenient" | "comfortable";

export type Option = {
  tier: Tier;
  name: string;
  vnd?: string;          // "450.000₫" — cách viết mới, đồng trước
  price?: string;        // "from ~$18" — cách viết cũ
  usd?: string;
  duration?: string;
  operator?: string;
  pickup?: string;
  reality?: string;      // mới
  detail?: string;       // cũ
  ctaLabel: string;
  ctaHref: string;
  pick?: boolean;
};

const TIER: Record<Tier, string> = {
  re: "Cheapest",
  de: "Easiest",
  em: "Comfiest",
  cheapest: "Cheapest",
  convenient: "Easiest",
  comfortable: "Comfiest",
};

/**
 * BẢNG TUYẾN — chi tiết nhận diện của trang.
 * Dựng theo tấm biển tuyến sơn tay trước đầu xe khách.
 * km / hours / checked là tuỳ chọn: bài chưa cập nhật vẫn render bình thường.
 */
export type RouteBoardProps = {
  from: string;
  to: string;
  options: Option[];
  km?: number;
  hours?: string;
  road?: string;
  checked?: string;
  slug?: string;
};

export default function RouteBoard({
  from, to, km, hours, road, checked, options, slug,
}: RouteBoardProps) {
  const meta = [
    km ? `${km} KM` : null,
    hours ? `${hours} GIỜ` : null,
    road ?? null,
  ].filter(Boolean).join(" · ");

  return (
    <div className="not-prose my-10 border-2 border-muc bg-giay">
      <div className="flex flex-wrap items-end justify-between gap-4 bg-men-sau px-5 py-4">
        <p className="font-sig text-[23px] font-extrabold uppercase leading-tight tracking-[-.01em] text-giay sm:text-[30px]">
          {from} <span className="mx-1.5 text-nghe">→</span> {to}
        </p>
        {(meta || checked) && (
          <p className="so-lieu whitespace-nowrap text-right font-so text-[11.5px] tracking-[.06em] text-men-nhat">
            {meta}
            {meta && checked && <br />}
            {checked && `KIỂM TRA ${checked}`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {options.map((opt) => (
          <div
            key={opt.tier + opt.name}
            className="border-t border-dashed border-muc/30 p-5 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0"
          >
            <p className="flex flex-wrap items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
              {/* Con dấu lệch bản in — nhắc tranh khắc gỗ, thay cho icon kho */}
              <span className="block h-2 w-2 flex-none bg-son shadow-khacnho" aria-hidden />
              {TIER[opt.tier] ?? opt.tier}
              {opt.pick && <span className="text-tro">· our pick</span>}
            </p>

            <p className="mt-2 font-doc text-[20px] font-semibold">{opt.name}</p>
            {opt.operator && <p className="font-sig text-[12px] text-tro">{opt.operator}</p>}

            <p className="so-lieu mt-1.5 font-so text-[15px] font-semibold">
              {opt.vnd ?? opt.price}
              {opt.usd && <span className="ml-1 font-normal text-[12.5px] text-tro">{opt.usd}</span>}
              {opt.duration && <span className="ml-1 font-normal text-[12.5px] text-tro">· {opt.duration}</span>}
            </p>

            {opt.pickup && (
              <p className="mt-2 font-so text-[11.5px] leading-relaxed text-tro">PICKUP: {opt.pickup}</p>
            )}
            {(opt.reality ?? opt.detail) && (
              <p className="mt-2.5 text-[15.5px] leading-[1.62] text-muc/85">{opt.reality ?? opt.detail}</p>
            )}

            <a
              href={decorate(opt.ctaHref)}
              target="_blank"
              rel="nofollow sponsored noopener"
              className={`mt-3.5 inline-block px-4 py-2.5 font-sig text-[12px] font-semibold uppercase tracking-[.1em] shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                opt.pick ? "bg-nghe text-men-sau" : "bg-men text-giay"
              }`}
            >
              {opt.ctaLabel} →
            </a>
            {slug && (
              <SaveButton
                item={{
                  id: `route:${slug}:${opt.tier}`,
                  kind: "route",
                  title: opt.name,
                  sub: `${from} → ${to}`,
                  price: opt.vnd ?? opt.price,
                  href: opt.ctaHref,
                  source: slug,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-giay-sau px-5 py-3 font-so text-[10.5px] tracking-[.03em] text-muc/60">
        INDICATIVE PRICES · SET BY THE OPERATOR{checked ? ` · CHECKED ${checked}` : ""}
      </div>
    </div>
  );
}

/** Khối "Nói thế nào" — câu tiếng Việt cần dùng, kèm phiên âm. */
export function SayIt({
  vi, phonetic, note, children,
}: { vi: string; phonetic: string; note?: string; children?: ReactNode }) {
  return (
    <aside className="not-prose my-8 border-l-[3px] border-son bg-son/[.05] px-5 py-4">
      <p className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
        How to say it
      </p>
      <p className="mt-2 font-doc text-[19px] italic text-men">{vi}</p>
      <p className="font-so text-[12.5px] text-tro">{phonetic}</p>
      {(note || children) && (
        <div className="mt-2.5 text-[16px] leading-relaxed">{note ?? children}</div>
      )}
    </aside>
  );
}

/**
 * Tên cũ, giữ lại để 9 bài .mdx chưa chuyển vẫn build được.
 * Xoá export này sau khi đã đổi hết sang <RouteBoard>.
 */
export const RouteComparisonCard = RouteBoard;

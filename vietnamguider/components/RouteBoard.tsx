import type { ReactNode } from "react";

type Tier = "re" | "de" | "em";

type Option = {
  tier: Tier;
  name: string;          // "Limousine van"
  vnd: string;           // "450.000₫"  — LUÔN để đồng trước
  usd?: string;          // "≈ $18"
  operator?: string;     // "Sapa Express" — tên nhà xe thật
  pickup?: string;       // "12 Lê Thái Tổ, Hoàn Kiếm" — địa chỉ thật
  reality?: string;      // một câu về việc THỰC SỰ xảy ra
  ctaLabel: string;
  ctaHref: string;
  pick?: boolean;        // đánh dấu lựa chọn của toà soạn
};

const TIER: Record<Tier, string> = {
  re: "Rẻ nhất",
  de: "Dễ nhất",
  em: "Êm nhất",
};

/**
 * BẢNG TUYẾN — chi tiết nhận diện của trang.
 * Dựng theo tấm biển tuyến sơn tay trước đầu xe khách:
 * điểm đi → điểm đến in đậm, số cây số và giờ chạy dập khuôn,
 * bên dưới là sổ giá. Không phải ba cái thẻ bo góc trôi nổi.
 */
export default function RouteBoard({
  from, to, km, hours, road, checked, options,
}: {
  from: string;          // "Hà Nội" — viết có dấu
  to: string;            // "Sa Pa"
  km: number;
  hours: string;         // "5–6"
  road?: string;         // "CT05"
  checked: string;       // "08 · 2026" — tháng kiểm giá gần nhất
  options: Option[];
}) {
  return (
    <div className="not-prose my-10 border-2 border-muc bg-giay">
      {/* Đầu biển */}
      <div className="flex flex-wrap items-end justify-between gap-4 bg-men-sau px-5 py-4">
        <p className="font-sig text-[23px] font-extrabold uppercase leading-tight tracking-[-.01em] text-giay sm:text-[30px]">
          {from} <span className="mx-1.5 text-nghe">→</span> {to}
        </p>
        <p className="so-lieu whitespace-nowrap text-right font-so text-[11.5px] tracking-[.06em] text-men-nhat">
          {km} KM · {hours} GIỜ{road ? ` · ${road}` : ""}
          <br />
          KIỂM TRA {checked}
        </p>
      </div>

      {/* Sổ giá */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {options.map((opt) => (
          <div
            key={opt.tier}
            className="border-t border-dashed border-muc/30 p-5 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0"
          >
            <p className="flex items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
              {/* Con dấu lệch bản in — nhắc tranh khắc gỗ, thay cho icon kho */}
              <span className="block h-2 w-2 flex-none bg-son shadow-khacnho" aria-hidden />
              {TIER[opt.tier]}
              {opt.pick && <span className="text-tro">· chúng tôi chọn</span>}
            </p>

            <p className="mt-2 font-doc text-[20px] font-semibold">{opt.name}</p>
            {opt.operator && (
              <p className="font-sig text-[12px] text-tro">{opt.operator}</p>
            )}

            <p className="so-lieu mt-1.5 font-so text-[15px] font-semibold">
              {opt.vnd}{" "}
              {opt.usd && <span className="font-normal text-[12.5px] text-tro">{opt.usd}</span>}
            </p>

            {opt.pickup && (
              <p className="mt-2 font-so text-[11.5px] leading-relaxed text-tro">ĐÓN: {opt.pickup}</p>
            )}
            {opt.reality && (
              <p className="mt-2.5 text-[15.5px] leading-[1.62] text-muc/85">{opt.reality}</p>
            )}

            <a
              href={opt.ctaHref}
              target="_blank"
              rel="nofollow sponsored noopener"
              className={`mt-3.5 inline-block px-4 py-2.5 font-sig text-[12px] font-semibold uppercase tracking-[.1em] shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                opt.pick ? "bg-nghe text-men-sau" : "bg-men text-giay"
              }`}
            >
              {opt.ctaLabel} →
            </a>
          </div>
        ))}
      </div>

      {/* Chân biển: minh bạch, viết như con người */}
      <div className="flex flex-wrap justify-between gap-3 bg-giay-sau px-5 py-3 font-so text-[10.5px] tracking-[.03em] text-muc/60">
        <span>GIÁ THAM KHẢO · NHÀ XE ĐẶT GIÁ</span>
        <span>CÓ HOA HỒNG · BẠN KHÔNG TRẢ THÊM</span>
      </div>
    </div>
  );
}

/** Khối "Nói thế nào" — câu tiếng Việt cần dùng, kèm phiên âm. */
export function SayIt({
  vi, phonetic, children,
}: { vi: string; phonetic: string; children?: ReactNode }) {
  return (
    <aside className="not-prose my-8 border-l-[3px] border-son bg-son/[.05] px-5 py-4">
      <p className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
        Nói thế nào
      </p>
      <p className="mt-2 font-doc text-[19px] italic text-men">{vi}</p>
      <p className="font-so text-[12.5px] text-tro">{phonetic}</p>
      {children && <div className="mt-2.5 text-[16px] leading-relaxed">{children}</div>}
    </aside>
  );
}

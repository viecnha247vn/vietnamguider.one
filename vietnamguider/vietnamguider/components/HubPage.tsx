import Link from "next/link";
import type { Metadata } from "next";

/**
 * Trang hub cho các mục menu chưa có nội dung.
 *
 * Vì sao cần: menu có 10 mục, nhưng chỉ vài mục đã có bài. Nếu để mục trỏ
 * vào hư không thì được 404 — Google ghi nhận và trừ điểm cả site. Nếu để
 * trang "coming soon" mà cho index thì được thin content — cũng bị trừ.
 * Cách đúng: có trang thật, nói thật, và đặt noindex cho tới khi có nội dung.
 */
export function hubMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: true }, // bỏ dòng này khi trang đã có nội dung
  };
}

export default function HubPage({
  kicker,
  title,
  intro,
  workingOn,
  meanwhile,
}: {
  kicker: string;
  title: string;
  intro: string;
  workingOn: string[];
  meanwhile?: { label: string; href: string }[];
}) {
  return (
    <>
      <section className="van-coi bg-men py-10 text-giay">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            {kicker}
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[42px]">
            {title}
          </h1>
          <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-giay/80">{intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 py-10">
        <h2 className="border-b-2 border-muc pb-2 font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
          In progress
        </h2>
        <ul className="mt-1">
          {workingOn.map((w) => (
            <li key={w} className="flex items-baseline gap-3 border-b border-dashed border-muc/30 py-3">
              <span className="block h-2 w-2 flex-none translate-y-[-1px] bg-son shadow-khacnho" aria-hidden />
              <span className="text-[16.5px]">{w}</span>
            </li>
          ))}
        </ul>

        {meanwhile && meanwhile.length > 0 && (
          <>
            <h2 className="mt-10 border-b-2 border-muc pb-2 font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
              What we have now
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {meanwhile.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="bg-men px-4 py-2.5 font-sig text-[12px] font-semibold uppercase tracking-[.1em] text-giay shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  {m.label} →
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we check things",
  description:
    "How prices on this site are gathered, how often they are re-checked, and what the checked date means.",
  alternates: { canonical: "/methodology" },
};

/**
 * Trang phương pháp — rất ít trang affiliate có, và đó chính là lý do nên có.
 * Tín hiệu tin cậy mạnh, và là thứ để dẫn ra khi ai đó hỏi "sao tin được giá này".
 */
const SECTIONS: [string, string][] = [
  ["What the checked date means",
   "Every route page carries a month — CHECKED 08 · 2026. That is when a human last opened the operators' own booking pages and compared the fares shown here against what they were charging that day. It is not the publish date, and it is not automated."],
  ["How often we re-check",
   "Every route is re-checked on a rolling schedule, so no page goes more than 90 days without a look. Routes that move a lot — anything crossing Tết or the 30/4–1/5 holiday — get checked more often."],
  ["Where the prices come from",
   "Operator websites and booking platforms, on the date shown. Fares are set by the operators and change without notice, so treat everything here as indicative. If a page is more than three months old, assume the number has moved."],
  ["How we choose what to recommend",
   "The cheapest option is listed first because it is the cheapest. The option marked our pick is the one we would book ourselves — sometimes that is the option paying us the least commission."],
];

export default function MethodologyPage() {
  return (
    <>
      <section className="van-coi bg-men py-10 text-giay">
        <div className="relative z-[1] mx-auto max-w-[720px] px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            Methodology
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[40px]">
            How we check things
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[720px] px-5 py-10">
        {SECTIONS.map(([h, b]) => (
          <section key={h} className="mb-8">
            <h2 className="border-b-2 border-muc pb-2 font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
              {h}
            </h2>
            <p className="mt-3 text-[16.5px] leading-[1.7] text-muc/90">{b}</p>
          </section>
        ))}
        <section className="mb-8">
          <h2 className="border-b-2 border-muc pb-2 font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
            When we get it wrong
          </h2>
          <p className="mt-3 text-[16.5px] leading-[1.7] text-muc/90">
            Tell us and we fix it, then update the checked date. Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-son underline underline-offset-2">
              {SITE.email}
            </a>
            . We would rather be corrected than be confidently wrong in public.
          </p>
        </section>
      </div>
    </>
  );
}

import SaveButton from "@/components/SaveButton";

/** Chấp nhận cả nhãn mới (vi) lẫn nhãn cũ (en). */
type Segment = "re" | "vua" | "sang" | "budget" | "midrange" | "luxury";

export type Stay = {
  segment: Segment;
  name: string;
  area?: string;
  vnd?: string;      // mới
  price?: string;    // cũ
  usd?: string;
  reality?: string;  // mới
  detail?: string;   // cũ
  ctaLabel: string;
  ctaHref: string;
};

const LABEL: Record<Segment, string> = {
  re: "Budget",
  vua: "Mid-range",
  sang: "Top end",
  budget: "Budget",
  midrange: "Mid-range",
  luxury: "Top end",
};

/** Sổ chỗ ở — cùng ngôn ngữ với Bảng tuyến, dạng dòng kẻ chứ không phải thẻ. */
export type StayLedgerProps = {
  title?: string;
  note?: string;
  stays?: Stay[];
  hotels?: Stay[]; // tên prop cũ
  slug?: string;
};

export default function StayLedger({
  title = "Where to stay", note, stays, hotels, slug,
}: StayLedgerProps) {
  const list = stays ?? hotels ?? [];

  return (
    <div className="not-prose my-10 border-2 border-muc bg-giay">
      <div className="border-b-2 border-muc px-5 py-3.5">
        <h3 className="font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">{title}</h3>
        {note && <p className="mt-1 font-doc text-[15px] italic text-tro">{note}</p>}
      </div>

      <ul>
        {list.map((s) => (
          <li key={s.name} className="border-t border-dashed border-muc/30 px-5 py-4 first:border-t-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div>
                <p className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
                  {LABEL[s.segment] ?? s.segment}
                </p>
                <p className="mt-1 font-doc text-[19px] font-semibold">{s.name}</p>
                {s.area && (
                  <p className="font-so text-[11.5px] uppercase tracking-[.05em] text-tro">{s.area}</p>
                )}
              </div>
              <p className="so-lieu font-so text-[15px] font-semibold">
                {s.vnd ?? s.price}
                {s.usd && <span className="ml-1 font-normal text-[12.5px] text-tro">{s.usd}</span>}
              </p>
            </div>

            {(s.reality ?? s.detail) && (
              <p className="mt-2 text-[15.5px] leading-[1.62] text-muc/85">{s.reality ?? s.detail}</p>
            )}

            <a
              href={s.ctaHref}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-3 inline-block bg-men px-4 py-2 font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-giay shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              {s.ctaLabel} →
            </a>
            {slug && (
              <SaveButton
                item={{
                  id: `stay:${slug}:${s.name}`,
                  kind: "stay",
                  title: s.name,
                  sub: s.area,
                  price: s.vnd ?? s.price,
                  href: s.ctaHref,
                  source: slug,
                }}
              />
            )}
          </li>
        ))}
      </ul>

      <p className="bg-giay-sau px-5 py-3 font-so text-[10.5px] tracking-[.03em] text-muc/60">
        LIVE PRICES ON THE BOOKING SITE
      </p>
    </div>
  );
}

/**
 * Tên cũ, giữ lại để 9 bài .mdx chưa chuyển vẫn build được.
 * Xoá export này sau khi đã đổi hết sang <StayLedger>.
 */
export const HotelRecommendationCard = StayLedger;

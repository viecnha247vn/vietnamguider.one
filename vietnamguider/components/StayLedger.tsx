type Segment = "re" | "vua" | "sang";

type Stay = {
  segment: Segment;
  name: string;      // TÊN THẬT của khách sạn, không phải "Town-centre hostel"
  area: string;      // "Ta Van" / "Sa Pa town"
  vnd: string;
  usd?: string;
  reality?: string;  // vì sao chọn nó, và nhược điểm gì
  ctaLabel: string;
  ctaHref: string;
};

const LABEL: Record<Segment, string> = { re: "Rẻ", vua: "Vừa tiền", sang: "Sang" };

/** Sổ chỗ ở — cùng ngôn ngữ với Bảng tuyến, dựng dạng dòng kẻ chứ không phải thẻ. */
export default function StayLedger({
  title = "Ngủ ở đâu",
  note,
  stays,
}: { title?: string; note?: string; stays: Stay[] }) {
  return (
    <div className="not-prose my-10 border-2 border-muc bg-giay">
      <div className="border-b-2 border-muc px-5 py-3.5">
        <h3 className="font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">{title}</h3>
        {note && <p className="mt-1 font-doc text-[15px] italic text-tro">{note}</p>}
      </div>

      <ul>
        {stays.map((s) => (
          <li key={s.name} className="border-t border-dashed border-muc/30 px-5 py-4 first:border-t-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div>
                <p className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
                  {LABEL[s.segment]}
                </p>
                <p className="mt-1 font-doc text-[19px] font-semibold">{s.name}</p>
                <p className="font-so text-[11.5px] uppercase tracking-[.05em] text-tro">{s.area}</p>
              </div>
              <p className="so-lieu font-so text-[15px] font-semibold">
                {s.vnd} {s.usd && <span className="font-normal text-[12.5px] text-tro">{s.usd}</span>}
              </p>
            </div>

            {s.reality && <p className="mt-2 text-[15.5px] leading-[1.62] text-muc/85">{s.reality}</p>}

            <a
              href={s.ctaHref}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-3 inline-block bg-men px-4 py-2 font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-giay shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              {s.ctaLabel} →
            </a>
          </li>
        ))}
      </ul>

      <p className="bg-giay-sau px-5 py-3 font-so text-[10.5px] tracking-[.03em] text-muc/60">
        GIÁ SỐNG HIỆN Ở TRANG ĐẶT PHÒNG · CÓ HOA HỒNG · BẠN KHÔNG TRẢ THÊM
      </p>
    </div>
  );
}

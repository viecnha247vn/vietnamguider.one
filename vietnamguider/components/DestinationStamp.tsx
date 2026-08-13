import type { Destination } from "@/lib/destinations";

/**
 * Ảnh điểm đến + ghi công giấy phép.
 *
 * Chưa có ảnh -> hiện BẢN CHỮ (typographic plate), không phải hình vẽ phong cảnh.
 * Lý do: một hình vẽ chung dùng cho nhiều nơi khác nhau trông giả, vì nó
 * không thật sự mô tả nơi nào cả. Bản chữ thì trung thực — nó không giả vờ
 * là ảnh, và trông có chủ đích như mặt vé giấy.
 *
 * GHI CÔNG LÀ BẮT BUỘC với CC BY / CC BY-SA. Component tự render dòng ghi công
 * từ dữ liệu, nên không thể quên. Không có `credit` thì ảnh không hiện.
 */
export default function DestinationStamp({ d }: { d: Destination }) {
  const ok = d.photo && d.photo.credit && d.photo.license;

  if (!ok) return <Plate d={d} />;

  const p = d.photo!;
  return (
    <figure className="relative m-0 border-b-2 border-muc">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.src}
        alt={p.alt ?? d.name}
        loading="lazy"
        className="aspect-[5/3] w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-muc/70 px-2 py-1 font-so text-[8.5px] uppercase tracking-[.05em] text-giay/90">
        Photo: {p.credit}
        {p.sourceUrl && (
          <>
            {" · "}
            <a href={p.sourceUrl} target="_blank" rel="noopener nofollow" className="underline">
              source
            </a>
          </>
        )}
        {" · "}
        <a href={p.licenseUrl} target="_blank" rel="noopener nofollow license" className="underline">
          {p.license}
        </a>
      </figcaption>
    </figure>
  );
}

/** Bản chữ — dùng khi chưa có ảnh. Trung thực, không giả vờ là hình minh hoạ. */
function Plate({ d }: { d: Destination }) {
  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden border-b-2 border-muc bg-giay-sau">
      {/* kẻ chỉ mảnh, nhắc mặt vé giấy */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="#0B4F45" strokeWidth=".35" opacity=".13">
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1="0" y1={i * 4.4} x2="100" y2={i * 4.4} />
          ))}
        </g>
        <rect x="3" y="3" width="94" height="54" fill="none" stroke="#8A2B20" strokeWidth=".7" opacity=".45" />
      </svg>

      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="block h-2 w-2 bg-son shadow-khacnho" aria-hidden />
        <div>
          <p className="font-doc text-[26px] font-semibold leading-none text-men">{d.name}</p>
          <p className="mt-1.5 font-so text-[9px] uppercase tracking-[.14em] text-tro">
            {d.region} · photo to come
          </p>
        </div>
      </div>
    </div>
  );
}

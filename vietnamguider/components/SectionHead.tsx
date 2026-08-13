/**
 * Khuôn tiêu đề khối, dùng cho MỌI section ở trang chủ.
 *
 * Học từ vietnam.travel: nhịp lặp "tiêu đề → một dòng dek → nội dung → CTA"
 * làm trang dài vẫn đọc được, vì mắt biết trước sẽ gặp gì.
 *
 * Khác họ hai điểm:
 *  - CĂN TRÁI, không căn giữa. Đoạn dài căn giữa buộc mắt tìm lại đầu dòng
 *    mỗi lần xuống hàng — đó là lỗi dễ thấy nhất trên trang gốc.
 *  - Dek giới hạn 52 ký tự/dòng, không phải cả màn hình.
 */
export default function SectionHead({
  kicker, title, dek, right,
}: { kicker?: string; title: string; dek?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b-2 border-muc pb-3">
      <div className="min-w-0">
        {kicker && (
          <p className="flex items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.18em] text-son">
            <span className="block h-2 w-2 flex-none bg-son shadow-khacnho" aria-hidden />
            {kicker}
          </p>
        )}
        <h2 className="mt-1.5 font-doc text-[26px] font-semibold leading-tight sm:text-[32px]">{title}</h2>
        {dek && <p className="mt-1.5 max-w-[52ch] text-[16px] leading-relaxed text-muc/75">{dek}</p>}
      </div>
      {right}
    </div>
  );
}

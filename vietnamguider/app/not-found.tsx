import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-shell px-5 py-20">
      <p className="so-lieu font-so text-[11px] uppercase tracking-[.16em] text-son">LỖI 404</p>
      {/* Nói rõ chuyện gì xảy ra và đi tiếp bằng cách nào. Không đùa, không xin lỗi. */}
      <h1 className="mt-3 font-doc text-[30px] font-semibold sm:text-[38px]">
        Trang này không tồn tại
      </h1>
      <p className="mt-3 max-w-[46ch] text-[16.5px] leading-relaxed text-muc/80">
        Có thể đường dẫn sai, hoặc trang đã được đổi tên. Danh sách tuyến đầy đủ vẫn ở đây.
      </p>
      <Link
        href="/blog"
        className="mt-7 inline-block bg-men px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay shadow-khac"
      >
        Xem các tuyến →
      </Link>
    </section>
  );
}

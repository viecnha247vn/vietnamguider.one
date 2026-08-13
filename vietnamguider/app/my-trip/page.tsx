import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chuyến của tôi",
  description: "Các tuyến và chỗ ở bạn đã lưu.",
};

export default function MyTripPage() {
  return (
    <section className="mx-auto max-w-shell px-5 py-16">
      <p className="flex items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.18em] text-son">
        <span className="block h-2 w-2 bg-son shadow-khacnho" aria-hidden />
        Chuyến của tôi
      </p>
      <h1 className="mt-3 font-doc text-[30px] font-semibold sm:text-[38px]">Chưa có gì ở đây</h1>
      {/* Màn hình rỗng là một lời mời hành động, không phải một lời xin lỗi. */}
      <p className="mt-3 max-w-[46ch] text-[16.5px] leading-relaxed text-muc/80">
        Mở một tuyến bất kỳ và bấm lưu — chặng đường, giá và chỗ ở sẽ nằm lại đây thành
        lịch trình của bạn.
      </p>
      <Link
        href="/blog"
        className="mt-7 inline-block bg-men px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        Xem các tuyến →
      </Link>
    </section>
  );
}

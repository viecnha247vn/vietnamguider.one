import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <>
      {/* Hero: một mảng men đặc, không gradient, không ảnh nền. */}
      <section className="van-coi bg-men py-14 text-giay sm:py-16">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            Đi khắp Việt Nam
          </p>
          <h1 className="mt-4 max-w-[15ch] font-doc text-[37px] font-semibold leading-[1.14] tracking-[-.01em] sm:text-[54px]">
            How to actually get <em className="italic text-nghe">around Vietnam</em>.
          </h1>
          <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.65] text-giay/80">
            Route guides written from the pavement outside the pickup office, not from a
            press release. Named operators, real addresses, prices in dong, re-checked
            every month.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-block bg-nghe px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-men-sau shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Xem các tuyến →
          </Link>
        </div>
      </section>

      {/* Danh sách tuyến dạng sổ, không phải lưới thẻ. */}
      <section className="mx-auto max-w-shell px-5 py-12">
        <h2 className="border-b-2 border-muc pb-2 font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
          Các tuyến đã kiểm
        </h2>
        <ul>
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-dashed border-muc/30">
              <Link href={`/blog/${p.slug}`} className="group flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-4">
                <span className="font-doc text-[20px] font-semibold group-hover:text-son">{p.title}</span>
                <span className="so-lieu whitespace-nowrap font-so text-[11px] uppercase tracking-[.06em] text-tro">
                  {p.checked ? `KIỂM TRA ${p.checked}` : `${p.readMinutes} PHÚT ĐỌC`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

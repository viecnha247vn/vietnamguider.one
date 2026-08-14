import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { DESTINATIONS, REGIONS } from "@/lib/destinations";
import SectionHead from "@/components/SectionHead";
import ArticleMosaic from "@/components/ArticleMosaic";
import BasicsGrid from "@/components/BasicsGrid";
import WelcomeOverlay from "@/components/WelcomeOverlay";

/**
 * Trang chủ — nhịp khối học từ vietnam.travel, nội dung thì ngược lại.
 *
 * Thứ tự cố ý: khối HỮU DỤNG đứng trước khối CẢM HỨNG.
 * Trang gốc mở bằng ba đoạn văn marketing rồi mới tới nội dung; người đang
 * lên kế hoạch đi thì cuộn qua hết. Ở đây câu hỏi thật ("đi từ A tới B thế nào")
 * nằm ngay dưới hero.
 */
export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 4);

  return (
    <>
      {/* Màn chào: chỉ ở trang chủ, chỉ một lần mỗi phiên. Trang bài vào
          thẳng từ Google không bao giờ gặp lớp phủ này. */}
      <WelcomeOverlay />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="van-coi bg-men py-14 text-giay sm:py-20">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            Getting around Vietnam
          </p>
          <h1 className="mt-4 max-w-[16ch] font-doc text-[38px] font-semibold leading-[1.12] tracking-[-.01em] sm:text-[58px]">
            Written from the pavement, <em className="italic text-nghe">not the brochure</em>.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-giay/80">
            Named operators. Real pickup addresses. Prices in dong, re-checked every month.
            No adjectives where a number would do.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="bg-nghe px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-men-sau shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Route guides →
            </Link>
            <Link
              href="/destinations"
              className="border-[1.5px] border-nghe px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay hover:bg-nghe hover:text-men-sau"
            >
              20 destinations
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tuyến phổ biến: khối hữu dụng, đặt ngay dưới hero ── */}
      <section className="mx-auto max-w-shell px-5 py-12">
        <SectionHead
          kicker="Getting around"
          title="Popular journeys"
          dek="One page per journey. Every price is in dong first, and every page carries the month we last checked it."
          right={
            <Link href="/blog" className="font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-son">
              All {posts.length} guides →
            </Link>
          }
        />
        <ul className="grid gap-px border-2 border-muc bg-muc sm:grid-cols-2">
          {posts.slice(0, 6).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full items-baseline justify-between gap-4 bg-giay px-5 py-4 transition-colors hover:bg-giay-sau"
              >
                <span className="font-doc text-[18px] font-semibold group-hover:text-son">{p.title}</span>
                <span className="so-lieu shrink-0 font-so text-[10px] uppercase tracking-[.06em] text-tro">
                  {p.checked ? p.checked : `${p.readMinutes} MIN`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Travel basics ──────────────────────────────────── */}
      <section className="border-y-2 border-muc bg-giay-sau/40 py-12">
        <div className="mx-auto max-w-shell px-5">
          <SectionHead
            kicker="Before you go"
            title="Travel basics"
            dek="The six things every first trip needs settled. Short answers, no sign-up."
          />
          <BasicsGrid />
        </div>
      </section>

      {/* ── Đọc thêm: lưới mosaic ──────────────────────────── */}
      <section className="mx-auto max-w-shell px-5 py-12">
        <SectionHead
          kicker="Reading"
          title="Latest guides"
          dek="Long enough to be useful, short enough to read before the bus arrives."
        />
        <ArticleMosaic posts={featured} />
        <div className="mt-7">
          <Link
            href="/blog"
            className="inline-block bg-men px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay shadow-khac transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            View more →
          </Link>
        </div>
      </section>

      {/* ── Điểm đến theo miền ─────────────────────────────── */}
      <section className="border-t-2 border-muc py-12">
        <div className="mx-auto max-w-shell px-5">
          <SectionHead
            kicker="Places to go"
            title="Twenty destinations, three regions"
            dek="Where a route guide exists, the name takes you straight to it."
            right={
              <Link href="/destinations" className="font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-son">
                See all →
              </Link>
            }
          />
          <div className="grid gap-8 sm:grid-cols-3">
            {REGIONS.map((region) => (
              <div key={region}>
                <p className="border-b border-dashed border-muc/40 pb-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.18em] text-tro">
                  {region}
                </p>
                <ul className="mt-2 space-y-1">
                  {DESTINATIONS.filter((d) => d.region === region).map((d) => (
                    <li key={d.name}>
                      {d.guide ? (
                        <Link href={d.guide} className="font-doc text-[17px] hover:text-son">
                          {d.name}
                        </Link>
                      ) : (
                        <span className="font-doc text-[17px] text-muc/45">{d.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lời hứa biên tập: thay cho khối "Discover the charm" ── */}
      <section className="van-coi border-t-2 border-muc bg-men py-12 text-giay">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.18em] text-nghe">
            <span className="block h-2 w-2 bg-son shadow-khacnho" aria-hidden />
            How we work
          </p>
          {/* Căn trái, 3 điểm ngắn — không phải ba đoạn văn căn giữa. */}
          <div className="mt-5 grid gap-7 sm:grid-cols-3">
            {[
              ["We name names", "Sapa Express, Bến xe Mỹ Đình, 12 Lê Thái Tổ. Never “a reputable operator”."],
              ["Dong first", "450.000₫ ≈ $18. Prices are what locals pay, in the currency you will hand over."],
              ["Dated, not evergreen", "Every route page carries the month we last checked it. Old is marked old."],
            ].map(([h, b]) => (
              <div key={h}>
                <h3 className="font-doc text-[20px] font-semibold text-nghe">{h}</h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-giay/80">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

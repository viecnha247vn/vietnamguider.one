import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/content";
import RouteBoard, { SayIt, type RouteBoardProps } from "@/components/RouteBoard";
import StayLedger, { type StayLedgerProps } from "@/components/StayLedger";

type RouteProps = Omit<RouteBoardProps, "slug">;
type StayProps = Omit<StayLedgerProps, "slug">;

/**
 * Map component cho MDX. Nhận slug để bơm xuống các thẻ — nút "Lưu" cần
 * một id ổn định (route:<slug>:<tier>) mà bài viết không phải tự khai báo.
 *
 * Giữ cả tên cũ (RouteComparisonCard / HotelRecommendationCard) để 9 bài
 * chưa chuyển cú pháp vẫn render. Bỏ hai dòng đó khi đã chuyển hết.
 */
function mdxComponents(slug: string) {
  return {
    SayIt,
    RouteBoard: (p: RouteProps) => <RouteBoard {...p} slug={slug} />,
    RouteComparisonCard: (p: RouteProps) => <RouteBoard {...p} slug={slug} />,
    StayLedger: (p: StayProps) => <StayLedger {...p} slug={slug} />,
    HotelRecommendationCard: (p: StayProps) => <StayLedger {...p} slug={slug} />,
  };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Vietnam Guider" },
    mainEntityOfPage: `https://vietnamguider.one/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="van-coi bg-men py-9 text-giay">
        <div className="relative z-[1] mx-auto max-w-[760px] px-5">
          <p className="flex flex-wrap items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.18em] text-nghe">
            <span className="block h-2 w-2 bg-son shadow-khacnho" aria-hidden />
            {post.meta.category}
            {post.meta.checked && (
              <span className="so-lieu font-so text-[10.5px] tracking-[.05em] text-men-nhat">
                · KIỂM TRA {post.meta.checked}
              </span>
            )}
          </p>
          <h1 className="mt-3 font-doc text-[30px] font-semibold leading-[1.18] sm:text-[40px]">
            {post.meta.title}
          </h1>

          {/*
            Công khai hoa hồng — MỘT dòng, đặt TRƯỚC mọi link đối tác trên trang.
            Đây là mức tối thiểu mà điều khoản của Agoda / Booking / 12Go yêu cầu.
            Đừng xoá: vi phạm thì tài khoản bị khoá và mất luôn hoa hồng chưa trả.
            Muốn kín đáo hơn thì chỉnh cỡ chữ hoặc màu, đừng bỏ hẳn.
          */}
          <p className="mt-3 font-so text-[10.5px] leading-relaxed tracking-[.03em] text-men-nhat">
            Some booking links here earn us a commission at no extra cost to you.{" "}
            <Link href="/disclosure" className="underline underline-offset-2 hover:text-nghe">
              How this works
            </Link>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[760px] px-5 py-10">
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-sig prose-headings:uppercase prose-headings:tracking-[.16em]
            prose-h1:hidden
            prose-h2:text-[13px] prose-h2:font-extrabold prose-h2:text-men
            prose-h2:border-b-2 prose-h2:border-muc prose-h2:pb-2 prose-h2:mt-10
            prose-p:text-muc/90 prose-li:text-muc/90
            prose-strong:text-muc prose-strong:font-semibold
            prose-a:text-son prose-a:no-underline hover:prose-a:underline"
        >
          {/*
            ĐỪNG XOÁ options={{ blockJS: false }}.
            next-mdx-remote >= 6.0.0 CHẶN mọi biểu thức JavaScript trong MDX
            theo mặc định vì lý do bảo mật. Toàn bộ bài viết truyền props dạng
            options={[...]} / stays={[...]} — nếu bị chặn, component nhận
            undefined và build chết ở bước prerender với lỗi
            "Cannot read properties of undefined (reading 'map')".
            blockDangerousJS vẫn bật (mặc định), nên eval/Function/require
            trong MDX vẫn bị chặn. Nội dung ở đây là của chính chúng ta.
          */}
          <MDXRemote
            source={post.content}
            components={mdxComponents(slug)}
            options={{ blockJS: false }}
          />
        </article>
      </div>
    </>
  );
}

import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/content";
import { SITE, AUTHOR } from "@/lib/site";
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

  // Schema đủ để máy trả lời trích được: tác giả, nhà xuất bản, breadcrumb.
  // Nghiên cứu 2026: AI chọn nguồn theo "mệnh đề trích xuất được + uy tín nguồn",
  // hơn là backlink. Thiếu author/publisher là tự loại mình khỏi vòng trích dẫn.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.meta.title,
        description: post.meta.description,
        datePublished: post.meta.date,
        dateModified: post.meta.date,
        inLanguage: "en",
        articleSection: post.meta.category,
        author: {
          "@type": "Person",
          name: AUTHOR.name,
          description: AUTHOR.bio,
          url: `${SITE.url}/about`,
          ...(AUTHOR.sameAs.length ? { sameAs: AUTHOR.sameAs } : {}),
        },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        mainEntityOfPage: `${SITE.url}/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Route guides", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.meta.title },
        ],
      },
    ],
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
                · CHECKED {post.meta.checked}
              </span>
            )}
          </p>
          <h1 className="mt-3 font-doc text-[30px] font-semibold leading-[1.18] sm:text-[40px]">
            {post.meta.title}
          </h1>

          <p className="mt-3 font-so text-[10.5px] uppercase tracking-[.08em] text-men-nhat">
            By{" "}
            <Link href="/about" className="underline underline-offset-2 hover:text-nghe">
              {AUTHOR.name}
            </Link>
            {post.meta.checked && ` · prices checked ${post.meta.checked}`}
          </p>

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

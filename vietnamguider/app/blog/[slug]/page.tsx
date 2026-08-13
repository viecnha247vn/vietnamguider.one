import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/content";
import RouteBoard, { SayIt } from "@/components/RouteBoard";
import StayLedger from "@/components/StayLedger";

const components = { RouteBoard, SayIt, StayLedger };

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
          <p className="flex items-center gap-2 font-sig text-[10.5px] font-semibold uppercase tracking-[.18em] text-nghe">
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
        </div>
      </header>

      <div className="mx-auto max-w-[760px] px-5 py-10">
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-sig prose-headings:uppercase prose-headings:tracking-[.16em]
            prose-h2:text-[13px] prose-h2:font-extrabold prose-h2:text-men
            prose-h2:border-b-2 prose-h2:border-muc prose-h2:pb-2 prose-h2:mt-10
            prose-p:text-muc/90 prose-li:text-muc/90
            prose-strong:text-muc prose-strong:font-semibold
            prose-a:text-son prose-a:no-underline hover:prose-a:underline"
        >
          <MDXRemote source={post.content} components={components} />
        </article>
      </div>
    </>
  );
}

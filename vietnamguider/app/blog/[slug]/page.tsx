import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/content";
import RouteComparisonCard from "@/components/RouteComparisonCard";
import HotelRecommendationCard from "@/components/HotelRecommendationCard";

// Components available inside every article
const components = { RouteComparisonCard, HotelRecommendationCard };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <article
        className="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:text-ink
          prose-p:text-charcoal/90
          prose-a:text-gold prose-a:no-underline hover:prose-a:underline
          prose-strong:text-ink
          prose-li:text-charcoal/90"
      >
        <MDXRemote source={post.content} components={components} />
      </article>
    </div>
  );
}

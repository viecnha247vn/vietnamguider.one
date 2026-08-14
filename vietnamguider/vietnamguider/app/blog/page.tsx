import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Route guides",
  description:
    "Every route we have ridden ourselves: named operators, real pickup addresses, prices in dong, re-checked every month.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <section className="van-coi bg-men py-10 text-giay">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            Getting around
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[42px]">
            Route guides
          </h1>
          <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-giay/80">
            One page per journey. Every price is in dong first, and every page carries the
            month we last checked it.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 py-10">
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-dashed border-muc/30">
              <Link href={`/blog/${post.slug}`} className="group block py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <span className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
                    {post.category}
                  </span>
                  <span className="so-lieu font-so text-[11px] uppercase tracking-[.06em] text-tro">
                    {post.checked ? `CHECKED ${post.checked}` : `${post.readMinutes} MIN`}
                  </span>
                </div>
                <h2 className="mt-1.5 font-doc text-[21px] font-semibold group-hover:text-son">
                  {post.title}
                </h2>
                <p className="mt-1 text-[16px] leading-relaxed text-muc/80">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

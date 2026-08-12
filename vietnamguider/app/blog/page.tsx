import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vietnam travel guides",
  description:
    "Practical, up-to-date guides for travelling Vietnam independently: routes, stays, eSIMs and itineraries.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-gold">Guides</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Vietnam travel guides
      </h1>
      <p className="mt-3 text-charcoal/80">
        Practical, no-fluff guides for travelling Vietnam on your own terms.
      </p>

      <ul className="mt-10 divide-y divide-sage/20">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <Link href={`/blog/${post.slug}`} className="group block">
              <span className="text-xs font-semibold uppercase tracking-wide text-sage">
                {post.category} · {post.readMinutes} min read
              </span>
              <h2 className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-ink-soft">
                {post.title}
              </h2>
              <p className="mt-1 text-charcoal/80">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

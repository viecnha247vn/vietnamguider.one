import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content");

export type PostMeta = {
  title: string;
  description: string;
  category: string;
  date: string;      // "2026-08-13"
  checked?: string;  // "08 · 2026" — tháng kiểm giá gần nhất
  readMinutes: number;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const fp = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  const { data, content } = matter(fs.readFileSync(fp, "utf8"));
  return { meta: data as PostMeta, content };
}

export function getAllPosts(): (PostMeta & { slug: string })[] {
  return getAllSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      return post ? { slug, ...post.meta } : null;
    })
    .filter((p): p is PostMeta & { slug: string } => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

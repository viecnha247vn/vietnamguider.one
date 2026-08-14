import Link from "next/link";
import type { PostMeta } from "@/lib/content";

type Post = PostMeta & { slug: string };

/**
 * Lưới bài viết dạng mosaic — học từ vietnam.travel: 1 thẻ lớn dẫn đầu,
 * 2 thẻ đôi, rồi 1 thẻ rộng. Nhịp không đều làm mắt không chán, khác hẳn
 * lưới 3 cột đều tăm tắp mà mọi template đều dùng.
 *
 * Khác họ: chữ KHÔNG đè lên ảnh. Trang gốc đặt tiêu đề trắng lên ảnh nhiều
 * chi tiết, chỗ đọc được chỗ không. Ở đây chữ nằm trên nền giấy bên dưới,
 * tương phản luôn ổn định — và khi chưa có ảnh thì thẻ vẫn tử tế.
 */
export default function ArticleMosaic({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <div className="grid gap-5">
      <Card post={lead} size="lead" />
      {rest.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.slice(0, 2).map((p) => (
            <Card key={p.slug} post={p} size="half" />
          ))}
        </div>
      )}
      {rest.slice(2).map((p) => (
        <Card key={p.slug} post={p} size="wide" />
      ))}
    </div>
  );
}

function Card({ post, size }: { post: Post; size: "lead" | "half" | "wide" }) {
  const lead = size === "lead";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid border-2 border-muc bg-giay transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-khac sm:grid-cols-[minmax(0,1fr)]"
    >
      <div className={`${lead ? "aspect-[16/7]" : "aspect-[16/6]"} relative border-b-2 border-muc bg-giay-sau`}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <g stroke="#0B4F45" strokeWidth=".3" opacity=".13">
            {Array.from({ length: 10 }, (_, i) => (
              <line key={i} x1="0" y1={i * 4.2} x2="100" y2={i * 4.2} />
            ))}
          </g>
        </svg>
        <span className="absolute left-4 top-4 block h-2 w-2 bg-son shadow-khacnho" aria-hidden />
        <span className="absolute bottom-3 right-4 font-so text-[9px] uppercase tracking-[.14em] text-tro">
          photo to come
        </span>
      </div>

      <div className={`p-5 ${lead ? "sm:p-7" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <span className="font-sig text-[10px] font-semibold uppercase tracking-[.18em] text-son">
            {post.category}
          </span>
          <span className="so-lieu font-so text-[10px] uppercase tracking-[.06em] text-tro">
            {post.checked ? `CHECKED ${post.checked}` : `${post.readMinutes} MIN`}
          </span>
        </div>
        <h3
          className={`mt-2 font-doc font-semibold leading-tight group-hover:text-son ${
            lead ? "text-[24px] sm:text-[30px]" : "text-[20px]"
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-2 leading-[1.55] text-muc/75 ${lead ? "max-w-[62ch] text-[16.5px]" : "text-[15px]"}`}>
          {post.description}
        </p>
      </div>
    </Link>
  );
}

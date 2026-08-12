export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
        {children}
      </article>
    </div>
  );
}

type Segment = "budget" | "midrange" | "luxury";

type Hotel = {
  segment: Segment;
  name: string;
  area?: string; // e.g. "Old Quarter"
  price: string; // e.g. "$18/night"
  detail?: string;
  ctaLabel: string; // e.g. "Check on Agoda"
  ctaHref: string;
};

const SEGMENT_LABEL: Record<Segment, string> = {
  budget: "Budget",
  midrange: "Mid-range",
  luxury: "Luxury",
};

/**
 * Usage in .mdx:
 *   <HotelRecommendationCard title="Where to stay in Hanoi" hotels={[ ... ]} />
 */
export default function HotelRecommendationCard({
  title = "Where to stay",
  hotels,
}: {
  title?: string;
  hotels: Hotel[];
}) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-sage/25 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {hotels.map((h) => (
          <div
            key={h.name}
            className="flex flex-col rounded-xl border border-sage/20 bg-eggshell/50 p-4"
          >
            <span className="inline-flex w-fit rounded-full bg-ink/5 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink">
              {SEGMENT_LABEL[h.segment]}
            </span>
            <p className="mt-2 font-semibold text-charcoal">{h.name}</p>
            <p className="mt-0.5 text-sm text-sage">
              {h.area ? `${h.area} · ` : ""}
              {h.price}
            </p>
            {h.detail && <p className="mt-2 text-sm text-charcoal/80">{h.detail}</p>}
            <a
              href={h.ctaHref}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gold px-3 py-2 text-sm font-semibold text-ink-deep transition-colors hover:bg-gold-soft"
            >
              {h.ctaLabel}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-sage">
        Live prices are shown on the booking site. We may earn a commission at no
        extra cost to you.
      </p>
    </div>
  );
}

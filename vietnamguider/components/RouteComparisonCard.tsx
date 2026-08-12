import { Wallet, Zap, Star } from "lucide-react";

type Tier = "cheapest" | "convenient" | "comfortable";

type Option = {
  tier: Tier;
  name: string; // e.g. "Public bus", "Limousine van", "Private car"
  price: string; // e.g. "from $6"
  duration?: string; // e.g. "5h"
  detail?: string; // one short line
  ctaLabel: string; // e.g. "Check price on 12Go"
  ctaHref: string; // affiliate link
};

const TIER_META: Record<
  Tier,
  { label: string; Icon: typeof Wallet; accent: string }
> = {
  cheapest: { label: "Cheapest", Icon: Wallet, accent: "text-sage" },
  convenient: { label: "Most convenient", Icon: Zap, accent: "text-gold" },
  comfortable: { label: "Most comfortable", Icon: Star, accent: "text-ink" },
};

/**
 * Drop this into any article to compare a route in three tiers.
 * Usage in .mdx:
 *   <RouteComparisonCard
 *     from="Hanoi" to="Ha Long Bay"
 *     options={[ ... ]}
 *   />
 */
export default function RouteComparisonCard({
  from,
  to,
  options,
}: {
  from: string;
  to: string;
  options: Option[];
}) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-sage/25 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-sage">
        How to get from
      </p>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink">
        {from} &rarr; {to}
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {options.map((opt) => {
          const meta = TIER_META[opt.tier];
          const Icon = meta.Icon;
          return (
            <div
              key={opt.tier}
              className="flex flex-col rounded-xl border border-sage/20 bg-eggshell/50 p-4"
            >
              <div className={`flex items-center gap-1.5 ${meta.accent}`}>
                <Icon className="h-4 w-4" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {meta.label}
                </span>
              </div>

              <p className="mt-2 font-semibold text-charcoal">{opt.name}</p>
              <p className="mt-0.5 text-sm text-sage">
                {opt.price}
                {opt.duration ? ` · ${opt.duration}` : ""}
              </p>
              {opt.detail && (
                <p className="mt-2 text-sm text-charcoal/80">{opt.detail}</p>
              )}

              <a
                href={opt.ctaHref}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-3 py-2 text-sm font-semibold text-eggshell transition-colors hover:bg-ink-soft"
              >
                {opt.ctaLabel}
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-sage">
        Prices are indicative and set by the provider. We may earn a commission
        at no extra cost to you.
      </p>
    </div>
  );
}

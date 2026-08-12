import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Trip",
  description: "Your saved Vietnam itinerary.",
};

export default function MyTripPage() {
  return (
    <section className="mx-auto max-w-shell px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-gold">
        My Trip
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Your saved trip
      </h1>
      <p className="mt-3 max-w-xl text-charcoal/80">
        You haven&apos;t saved anything yet. Browse the guides and add routes,
        stays and experiences to build your Vietnam trip.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-eggshell hover:bg-ink-soft"
      >
        Browse guides
      </Link>
    </section>
  );
}

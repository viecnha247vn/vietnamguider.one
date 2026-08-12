import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-shell px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-gold">
        Online Travel Concierge
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        The easiest way for foreigners to travel Vietnam.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-charcoal/80">
        Routes, stays, eSIMs and ready-made itineraries — everything in one
        place, without the hard sell.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-eggshell hover:bg-ink-soft"
      >
        Read the guides
      </Link>
    </section>
  );
}

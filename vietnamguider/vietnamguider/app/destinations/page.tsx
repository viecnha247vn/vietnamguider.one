import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS, REGIONS, type Destination } from "@/lib/destinations";
import DestinationStamp from "@/components/DestinationStamp";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Twenty places worth the journey, grouped by region — with how to actually reach each one.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <section className="van-coi bg-men py-10 text-giay">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            Destinations
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[42px]">
            Where to go, and how to get there
          </h1>
          <p className="mt-3 max-w-[50ch] text-[16px] leading-relaxed text-giay/80">
            Twenty places across the three regions. Where a route guide exists, the card
            takes you straight to it — named operators, real pickup addresses, prices in dong.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 py-10">
        {REGIONS.map((region) => {
          const list = DESTINATIONS.filter((d) => d.region === region);
          return (
            <section key={region} className="mb-12 last:mb-0">
              <div className="flex items-baseline justify-between border-b-2 border-muc pb-2">
                <h2 className="font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
                  {region}
                </h2>
                <span className="so-lieu font-so text-[11px] tracking-[.06em] text-tro">
                  {list.length} PLACES
                </span>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((d) => (
                  <li key={d.name}>
                    <Card d={d} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

function Card({ d }: { d: Destination }) {
  const inner = (
    <>
      <DestinationStamp d={d} />
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-doc text-[20px] font-semibold leading-tight">{d.name}</h3>
          {!d.guide && (
            <span className="shrink-0 font-so text-[9px] uppercase tracking-[.08em] text-son">
              guide soon
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[15px] leading-[1.55] text-muc/80">{d.blurb}</p>
        {d.guide && (
          <p className="mt-3 font-sig text-[11px] font-semibold uppercase tracking-[.1em] text-son">
            How to get there →
          </p>
        )}
      </div>
    </>
  );

  // Chưa có bài thì KHÔNG phải link — thà là thẻ tĩnh còn hơn dẫn vào 404.
  if (!d.guide) {
    return <div className="h-full border-2 border-muc bg-giay opacity-80">{inner}</div>;
  }

  return (
    <Link
      href={d.guide}
      className="group block h-full border-2 border-muc bg-giay transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-khac"
    >
      {inner}
    </Link>
  );
}

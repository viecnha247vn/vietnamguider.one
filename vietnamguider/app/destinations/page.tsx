import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Every destination we have a route guide for, grouped by region — with how to actually reach each one.",
  alternates: { canonical: "/destinations" },
};

const REGIONS = ["Miền Bắc", "Miền Trung", "Miền Nam"] as const;

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
          <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-giay/80">
            Every place below has a route guide behind it — named operators, real pickup
            addresses, prices in dong.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 py-10">
        {REGIONS.map((region) => (
          <section key={region} className="mb-10 last:mb-0">
            <h2 className="border-b-2 border-muc pb-2 font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
              {region}
            </h2>
            <ul>
              {DESTINATIONS.filter((d) => d.region === region).map((d) => (
                <li key={d.name} className="border-b border-dashed border-muc/30">
                  <Link
                    href={d.href}
                    className="group flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-4"
                  >
                    <span className="font-doc text-[21px] font-semibold group-hover:text-son">
                      {d.name}
                    </span>
                    <span className="font-so text-[11px] uppercase tracking-[.06em] text-tro">
                      Cách đi →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

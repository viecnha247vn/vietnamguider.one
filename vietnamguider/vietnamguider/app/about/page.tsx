import type { Metadata } from "next";
import Link from "next/link";
import { SITE, AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Who writes ${SITE.name}, and why the prices here are in dong.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="van-coi bg-men py-10 text-giay">
        <div className="relative z-[1] mx-auto max-w-[720px] px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            About
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[40px]">
            Who writes this
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[720px] px-5 py-10">
        <div className="border-2 border-muc bg-giay p-6">
          <p className="font-doc text-[22px] font-semibold">{AUTHOR.name}</p>
          <p className="font-so text-[11px] uppercase tracking-[.08em] text-tro">
            {AUTHOR.role} · {AUTHOR.based}
          </p>
          <p className="mt-3 text-[16.5px] leading-relaxed">{AUTHOR.bio}</p>
        </div>

        <div className="mt-8 space-y-5 text-[16.5px] leading-[1.7] text-muc/90">
          <p>
            {SITE.name} covers one thing properly rather than everything badly: how to get from
            one place to another in Vietnam. Every route page names the operators, gives the
            pickup address, and prices the journey in dong first.
          </p>
          <p>
            Prices go stale. Ours carry the month we last checked them, and we re-check on a
            rolling schedule — see{" "}
            <Link href="/methodology" className="text-son underline underline-offset-2">
              how we check things
            </Link>
            .
          </p>
          <p>
            Some booking links earn a commission. It never changes your price and never decides
            the order of a page —{" "}
            <Link href="/disclosure" className="text-son underline underline-offset-2">
              the full disclosure is here
            </Link>
            .
          </p>
          <p>
            Found a price that has moved, or an operator that has stopped running? Tell us:{" "}
            <a href={`mailto:${SITE.email}`} className="text-son underline underline-offset-2">
              {SITE.email}
            </a>
            . Corrections are the fastest way to make this better.
          </p>
        </div>
      </div>
    </>
  );
}

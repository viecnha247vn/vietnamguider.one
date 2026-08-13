"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  readTrip, writeTrip, encodeTrip, decodeTrip, type TripItem,
} from "@/lib/trip";

export default function MyTripPage() {
  return (
    <Suspense fallback={null}>
      <MyTrip />
    </Suspense>
  );
}

function MyTrip() {
  const params = useSearchParams();
  const [items, setItems] = useState<TripItem[]>([]);
  const [shared, setShared] = useState<TripItem[] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setItems(readTrip());
    const token = params.get("t");
    if (token) setShared(decodeTrip(token));
    const sync = () => setItems(readTrip());
    window.addEventListener("vg:trip", sync);
    return () => window.removeEventListener("vg:trip", sync);
  }, [params]);

  const remove = (id: string) => {
    const next = readTrip().filter((i) => i.id !== id);
    writeTrip(next);
    setItems(next);
  };

  const share = async () => {
    const url = `${window.location.origin}/my-trip?t=${encodeTrip(items)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const adoptShared = () => {
    if (!shared) return;
    const merged = [...readTrip()];
    shared.forEach((s) => { if (!merged.some((m) => m.id === s.id)) merged.push(s); });
    writeTrip(merged);
    setItems(merged);
    setShared(null);
  };

  const list = shared ?? items;

  return (
    <>
      <section className="van-coi bg-men py-10 text-giay">
        <div className="relative z-[1] mx-auto max-w-shell px-5">
          <p className="flex items-center gap-2 font-sig text-[11px] font-semibold uppercase tracking-[.2em] text-nghe">
            <span className="block h-[9px] w-[9px] bg-son shadow-khacnho" aria-hidden />
            {shared ? "A shared plan" : "My Trip"}
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[42px]">
            {shared ? "Someone sent you this plan" : "My Trip"}
          </h1>
          <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-giay/80">
            {shared
              ? "Save it to your own device and change anything you like."
              : "Saved on this device, no account needed. Clearing your browser data wipes it, so send yourself the share link if you want it to last."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 py-10">
        {list.length === 0 ? (
          <>
            <h2 className="font-doc text-[24px] font-semibold">Nothing saved yet</h2>
            <p className="mt-2 max-w-[46ch] text-[16.5px] leading-relaxed text-muc/80">
              Open any route guide and hit <strong>Save</strong> on the option you like —
              it will sit here as your plan.
            </p>
            <Link
              href="/blog"
              className="mt-7 inline-block bg-men px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay shadow-khac"
            >
              See the routes →
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-muc pb-2">
              <h2 className="font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
                {list.length} saved
              </h2>
              {!shared && (
                <button
                  type="button"
                  onClick={share}
                  className="bg-nghe px-4 py-2 font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-men-sau shadow-khac"
                >
                  {copied ? "Link copied ✓" : "Share this plan"}
                </button>
              )}
            </div>

            <ul>
              {list.map((i) => (
                <li key={i.id} className="border-b border-dashed border-muc/30 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <p className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
                        {i.kind === "route" ? "Getting there" : "Staying"}
                      </p>
                      <p className="mt-1 font-doc text-[19px] font-semibold">{i.title}</p>
                      {i.sub && (
                        <p className="font-so text-[11.5px] uppercase tracking-[.05em] text-tro">{i.sub}</p>
                      )}
                    </div>
                    {i.price && (
                      <p className="so-lieu font-so text-[15px] font-semibold">{i.price}</p>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={i.href}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="bg-men px-4 py-2 font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-giay shadow-khac"
                    >
                      Book →
                    </a>
                    <Link
                      href={`/blog/${i.source}`}
                      className="border-[1.5px] border-muc px-3 py-2 font-sig text-[11px] font-semibold uppercase tracking-[.1em]"
                    >
                      Back to guide
                    </Link>
                    {!shared && (
                      <button
                        type="button"
                        onClick={() => remove(i.id)}
                        className="px-3 py-2 font-sig text-[11px] font-semibold uppercase tracking-[.1em] text-tro hover:text-son"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {shared && (
              <button
                type="button"
                onClick={adoptShared}
                className="mt-7 bg-nghe px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-men-sau shadow-khac"
              >
                Save this plan to my device →
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

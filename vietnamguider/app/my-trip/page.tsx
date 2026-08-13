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
      window.prompt("Sao chép link này:", url);
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
            {shared ? "Lịch trình được chia sẻ" : "Chuyến của tôi"}
          </p>
          <h1 className="mt-3 font-doc text-[32px] font-semibold leading-tight sm:text-[42px]">
            {shared ? "Ai đó đã gửi bạn lịch trình này" : "Chuyến của tôi"}
          </h1>
          <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-giay/80">
            {shared
              ? "Bạn có thể lưu về máy mình rồi sửa tuỳ ý."
              : "Lưu ngay trên máy bạn, không cần tài khoản. Xoá lịch sử trình duyệt là mất, nên chia sẻ link cho chính mình nếu muốn giữ lâu."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-shell px-5 py-10">
        {list.length === 0 ? (
          <>
            <h2 className="font-doc text-[24px] font-semibold">Chưa có gì ở đây</h2>
            <p className="mt-2 max-w-[46ch] text-[16.5px] leading-relaxed text-muc/80">
              Mở một tuyến bất kỳ và bấm <strong>Lưu</strong> ở lựa chọn bạn thích — nó
              sẽ nằm lại đây thành lịch trình của bạn.
            </p>
            <Link
              href="/blog"
              className="mt-7 inline-block bg-men px-5 py-3 font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay shadow-khac"
            >
              Xem các tuyến →
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-muc pb-2">
              <h2 className="font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-men">
                {list.length} mục đã lưu
              </h2>
              {!shared && (
                <button
                  type="button"
                  onClick={share}
                  className="bg-nghe px-4 py-2 font-sig text-[11.5px] font-semibold uppercase tracking-[.1em] text-men-sau shadow-khac"
                >
                  {copied ? "Đã chép link ✓" : "Chia sẻ lịch trình"}
                </button>
              )}
            </div>

            <ul>
              {list.map((i) => (
                <li key={i.id} className="border-b border-dashed border-muc/30 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <p className="font-sig text-[10.5px] font-semibold uppercase tracking-[.16em] text-son">
                        {i.kind === "route" ? "Di chuyển" : "Chỗ ở"}
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
                      Đặt chỗ →
                    </a>
                    <Link
                      href={`/blog/${i.source}`}
                      className="border-[1.5px] border-muc px-3 py-2 font-sig text-[11px] font-semibold uppercase tracking-[.1em]"
                    >
                      Xem lại bài
                    </Link>
                    {!shared && (
                      <button
                        type="button"
                        onClick={() => remove(i.id)}
                        className="px-3 py-2 font-sig text-[11px] font-semibold uppercase tracking-[.1em] text-tro hover:text-son"
                      >
                        Bỏ
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
                Lưu lịch trình này về máy tôi →
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

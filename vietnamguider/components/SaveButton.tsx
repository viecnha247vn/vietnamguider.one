"use client";

import { useEffect, useState } from "react";
import { toggleItem, readTrip, type TripItem } from "@/lib/trip";

/** Nút Lưu trên từng lựa chọn. Nhỏ, nằm cạnh nút đặt chỗ, không cạnh tranh với nó. */
export default function SaveButton({ item }: { item: TripItem }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readTrip().some((i) => i.id === item.id));
    sync();
    window.addEventListener("vg:trip", sync);
    return () => window.removeEventListener("vg:trip", sync);
  }, [item.id]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleItem(item).some((i) => i.id === item.id))}
      aria-pressed={saved}
      className={`ml-2 mt-3.5 inline-block border-[1.5px] border-muc px-3 py-2.5 font-sig text-[11px] font-semibold uppercase tracking-[.1em] transition-colors ${
        saved ? "bg-muc text-giay" : "bg-transparent text-muc hover:bg-muc/5"
      }`}
    >
      {saved ? "Đã lưu ✓" : "Lưu"}
    </button>
  );
}

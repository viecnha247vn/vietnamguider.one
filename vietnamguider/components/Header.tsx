"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, type NavItem } from "@/lib/nav";

/**
 * Thanh điều hướng dựng theo biển men ở bến xe:
 * một khối màu đặc, kẻ chỉ nghệ dưới chân, góc vuông, không đổ bóng mờ.
 */
export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMenu(null); setMobileOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="van-coi sticky top-0 z-40 border-b-[3px] border-nghe bg-men">
        <div className="relative z-[1] mx-auto flex h-[62px] max-w-[1180px] items-center justify-between gap-3 px-5">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex shrink-0 items-baseline gap-2.5 text-giay">
            <span className="font-sig text-[19px] font-extrabold uppercase leading-none tracking-[-.02em]">
              Vietnam Guider
            </span>
            {/* Câu tiếng Việt có dấu — tín hiệu bản địa, không phải trang trí. */}
            <span className="hidden font-doc text-[12.5px] italic text-nghe sm:inline">đi khắp Việt Nam</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block" onMouseLeave={() => setOpenMenu(null)}>
            <ul className="flex items-center gap-1">
              {NAV.filter((i) => i.href !== "/my-trip").map((item) => (
                <DesktopItem
                  key={item.label}
                  item={item}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onToggle={() => setOpenMenu((c) => (c === item.label ? null : item.label))}
                />
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/my-trip"
              className="hidden border-[1.5px] border-nghe px-3 py-2 font-sig text-[11.5px] font-semibold uppercase tracking-[.14em] text-giay hover:bg-nghe hover:text-men-sau lg:inline-block"
            >
              Chuyến của tôi
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="p-2 text-giay lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </>
  );
}

function DesktopItem({
  item, open, onOpen, onToggle,
}: { item: NavItem; open: boolean; onOpen: () => void; onToggle: () => void }) {
  const base =
    "px-2 py-2 font-sig text-[11px] font-semibold uppercase tracking-[.06em] whitespace-nowrap transition-colors";

  if (!item.columns) {
    return (
      <li>
        <Link href={item.href} className={`${base} inline-flex items-center gap-1 text-giay/85 hover:text-nghe`}>
          {item.label}
          {item.soon && <Soon />}
        </Link>
      </li>
    );
  }

  return (
    <li className="static" onMouseEnter={onOpen}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${base} flex items-center gap-1 ${open ? "text-nghe" : "text-giay/85 hover:text-nghe"}`}
      >
        {item.label}
        {item.soon && <Soon />}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full">
          <div className="mx-auto max-w-[1180px] px-5">
            <div className="border-2 border-muc bg-giay p-6 shadow-khac">
              <div className="mb-5 flex items-center justify-between border-b-2 border-muc pb-3">
                <p className="font-sig text-[12px] font-extrabold uppercase tracking-[.16em] text-men">
                  {item.label}
                </p>
                <Link href={item.href} className="font-sig text-[11px] font-semibold uppercase tracking-[.1em] text-son">
                  Xem tất cả →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {item.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="mb-2 font-sig text-[10px] font-semibold uppercase tracking-[.18em] text-tro">
                      {col.heading}
                    </p>
                    <ul className="space-y-1.5">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="block font-doc text-[15.5px] text-muc hover:text-son">
                            {link.label}
                            {link.note && <span className="block font-sig text-[11px] text-tro">{link.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="lg:hidden">
      <button type="button" aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-40 bg-muc/50" />
      <div className="fixed inset-y-0 right-0 z-50 flex h-full w-[88%] max-w-sm flex-col border-l-2 border-muc bg-giay">
        <div className="van-coi flex h-[62px] shrink-0 items-center justify-between border-b-[3px] border-nghe bg-men px-5">
          <span className="relative z-[1] font-sig text-[13px] font-extrabold uppercase tracking-[.16em] text-giay">
            Mục lục
          </span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="relative z-[1] p-2 text-giay">
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          <ul>
            {NAV.map((item) => (
              <MobileItem key={item.label} item={item} onNavigate={onClose} />
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t-2 border-muc p-4">
          <Link
            href="/my-trip"
            onClick={onClose}
            className="block bg-men px-4 py-3 text-center font-sig text-[12px] font-semibold uppercase tracking-[.12em] text-giay shadow-khac"
          >
            Chuyến của tôi
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.columns) {
    return (
      <li className="border-b border-dashed border-muc/30">
        <Link href={item.href} onClick={onNavigate} className="flex items-center gap-2 py-3.5 font-sig text-[13px] font-semibold uppercase tracking-[.1em] text-muc">
          {item.label}
          {item.soon && <Soon dark />}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-dashed border-muc/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 font-sig text-[13px] font-semibold uppercase tracking-[.1em] text-muc"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 text-son transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="pb-3 pl-3">
          {item.columns.map((col) => (
            <div key={col.heading} className="mt-2">
              <p className="font-sig text-[10px] font-semibold uppercase tracking-[.18em] text-tro">{col.heading}</p>
              <ul className="mt-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={onNavigate} className="block py-1.5 font-doc text-[16px] text-muc">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

/** Dấu cho mục chưa có nội dung. Nhỏ, không cướp sự chú ý, nhưng trung thực. */
function Soon({ dark = false }: { dark?: boolean }) {
  return (
    <span
      title="Đang viết"
      className={`font-so text-[9px] uppercase tracking-[.08em] ${dark ? "text-son" : "text-nghe/70"}`}
    >
      sắp có
    </span>
  );
}

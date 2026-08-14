"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, type NavItem } from "@/lib/nav";

/**
 * Thanh điều hướng dựng theo biển men ở bến xe.
 *
 * Hai điểm kỹ thuật đáng chú ý:
 *  1. 10 mục không vừa màn hình hẹp -> dải nav TỰ CUỘN NGANG
 *     (.nav-scroll), cả trang không bị kéo theo. `min-w-0` là bắt buộc,
 *     thiếu nó thì flex item không co lại được và trang lại tràn.
 *  2. Bảng menu xổ xuống nằm NGOÀI vùng cuộn, gắn ở tầng <header>.
 *     Đặt trong vùng cuộn thì overflow-x cắt cụt nó.
 */
export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openItem = NAV.find((i) => i.label === openMenu && i.columns) ?? null;

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
      <header
        className="van-coi sticky top-0 z-40 border-b-[3px] border-nghe bg-men"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="relative z-[1] mx-auto flex h-[62px] max-w-[1180px] items-center gap-3 px-5">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex shrink-0 items-baseline gap-2.5 text-giay"
          >
            <span className="font-sig text-[19px] font-extrabold uppercase leading-none tracking-[-.02em]">
              Vietnam Guider
            </span>
            {/* Dòng tiếng Việt có dấu — dấu hiệu bản địa, cố ý giữ. */}
            <span className="hidden font-doc text-[12.5px] italic text-nghe xl:inline">
              đi khắp Việt Nam
            </span>
          </Link>

          {/* Dải cuộn ngang: chỉ dải này trượt, trang đứng yên. */}
          <nav
            aria-label="Primary"
            className="nav-scroll hidden min-w-0 flex-1 overflow-x-auto lg:block"
          >
            <ul className="flex w-max items-center gap-0.5">
              {NAV.filter((i) => i.href !== "/my-trip").map((item) => (
                <DesktopItem
                  key={item.label}
                  item={item}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.columns ? item.label : null)}
                  onToggle={() => setOpenMenu((c) => (c === item.label ? null : item.label))}
                />
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link
              href="/my-trip"
              className="hidden whitespace-nowrap border-[1.5px] border-nghe px-3 py-2 font-sig text-[11px] font-semibold uppercase tracking-[.1em] text-giay hover:bg-nghe hover:text-men-sau lg:inline-block"
            >
              My Trip
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

        {/* Bảng xổ: ngoài vùng cuộn, nên không bị cắt. */}
        {openItem?.columns && (
          <div className="absolute inset-x-0 top-full z-10 hidden lg:block">
            <div className="mx-auto max-w-[1180px] px-5">
              <div className="border-2 border-muc bg-giay p-6 shadow-khac">
                <div className="mb-5 flex items-center justify-between border-b-2 border-muc pb-3">
                  <p className="font-sig text-[12px] font-extrabold uppercase tracking-[.16em] text-men">
                    {openItem.label}
                  </p>
                  <Link
                    href={openItem.href}
                    onClick={() => setOpenMenu(null)}
                    className="font-sig text-[11px] font-semibold uppercase tracking-[.1em] text-son"
                  >
                    See all →
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                  {openItem.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="mb-2 font-sig text-[10px] font-semibold uppercase tracking-[.18em] text-tro">
                        {col.heading}
                      </p>
                      <ul className="space-y-1.5">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setOpenMenu(null)}
                              className="block font-doc text-[15.5px] text-muc hover:text-son"
                            >
                              {link.label}
                              {link.note && (
                                <span className="block font-sig text-[11px] text-tro">{link.note}</span>
                              )}
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
      <li onMouseEnter={onOpen}>
        <Link
          href={item.href}
          className={`${base} inline-flex items-center gap-1 text-giay/85 hover:text-nghe`}
        >
          {item.label}
          {item.soon && <Soon />}
        </Link>
      </li>
    );
  }

  return (
    <li onMouseEnter={onOpen}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${base} flex items-center gap-1 ${open ? "text-nghe" : "text-giay/85 hover:text-nghe"}`}
      >
        {item.label}
        {item.soon && <Soon />}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
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
            Menu
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
      </div>
    </div>
  );
}

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.columns) {
    return (
      <li className="border-b border-dashed border-muc/30">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex items-center gap-2 py-3.5 font-sig text-[13px] font-semibold uppercase tracking-[.1em] text-muc"
        >
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
        onClick={() => setOpen((v: boolean) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3.5 font-sig text-[13px] font-semibold uppercase tracking-[.1em] text-muc"
      >
        <span className="flex items-center gap-2">
          {item.label}
          {item.soon && <Soon dark />}
        </span>
        <ChevronDown className={`h-4 w-4 text-son transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="pb-3 pl-3">
          {item.columns.map((col) => (
            <div key={col.heading} className="mt-2">
              <p className="font-sig text-[10px] font-semibold uppercase tracking-[.18em] text-tro">
                {col.heading}
              </p>
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

/** Dấu cho mục chưa có nội dung. Nhỏ, trung thực, không cướp sự chú ý. */
function Soon({ dark = false }: { dark?: boolean }) {
  return (
    <span
      title="In progress"
      className={`font-so text-[9px] uppercase tracking-[.08em] ${dark ? "text-son" : "text-nghe/70"}`}
    >
      soon
    </span>
  );
}

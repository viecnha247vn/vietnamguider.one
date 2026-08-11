"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, MapPin, Bookmark } from "lucide-react";
import { NAV, type NavItem } from "@/lib/nav";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  // Desktop: which mega menu is open (by label), or null.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Mobile drawer open/closed.
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close the desktop mega menu on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-sage/20 bg-eggshell/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-4 px-4 sm:px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 text-ink"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-eggshell">
            <MapPin className="h-4 w-4" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Vietnam Guider
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden lg:block"
          onMouseLeave={() => setOpenMenu(null)}
          onBlur={(e) => {
            // Close when focus leaves the whole nav.
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
          }}
        >
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                open={openMenu === item.label}
                onOpen={() => setOpenMenu(item.label)}
                onToggle={() =>
                  setOpenMenu((cur) => (cur === item.label ? null : item.label))
                }
              />
            ))}
          </ul>
        </nav>

        {/* Desktop utility */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/my-trip"
            className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-eggshell transition-colors hover:bg-ink-soft"
          >
            <Bookmark className="h-4 w-4" aria-hidden />
            My Trip
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="rounded-lg p-2 text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

/* ------------------------------- Desktop ------------------------------- */

function DesktopItem({
  item,
  open,
  onOpen,
  onToggle,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  // Plain link (no columns) — just a nav link.
  if (!item.columns) {
    return (
      <li>
        <Link
          href={item.href}
          className="rounded-full px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-ink/5 hover:text-ink"
        >
          {item.label}
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
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
          open ? "bg-ink/5 text-ink" : "text-charcoal hover:bg-ink/5 hover:text-ink"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full">
          <div className="mx-auto max-w-shell px-4 sm:px-6">
            <div className="mt-1 rounded-2xl border border-sage/20 bg-white p-6 shadow-mega">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-base font-semibold text-ink">
                  {item.label}
                </p>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gold hover:underline"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {item.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sage">
                      {col.heading}
                    </p>
                    <ul className="space-y-1">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group block rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-eggshell"
                          >
                            <span className="text-sm font-medium text-charcoal group-hover:text-ink">
                              {link.label}
                            </span>
                            {link.note && (
                              <span className="block text-xs text-sage">{link.note}</span>
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
    </li>
  );
}

/* ------------------------------- Mobile -------------------------------- */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="lg:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-charcoal/40"
      />
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-eggshell shadow-xl">
        <div className="flex h-16 items-center justify-between border-b border-sage/20 px-4">
          <span className="font-display text-base font-semibold text-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-ink hover:bg-ink/5"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <MobileItem key={item.label} item={item} onNavigate={onClose} />
            ))}
          </ul>
        </nav>

        <div className="border-t border-sage/20 p-4">
          <Link
            href="/my-trip"
            onClick={onClose}
            className="mb-3 flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-eggshell hover:bg-ink-soft"
          >
            <Bookmark className="h-4 w-4" aria-hidden />
            My Trip
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

function MobileItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.columns) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="block rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-ink/5"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-ink/5"
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 text-sage transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="pb-2 pl-3">
          {item.columns.map((col) => (
            <div key={col.heading} className="mt-1">
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-sage">
                {col.heading}
              </p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-3 py-2 text-sm text-charcoal hover:bg-ink/5"
                    >
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

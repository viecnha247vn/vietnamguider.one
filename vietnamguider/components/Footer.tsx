import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-14 bg-men-sau py-8 text-giay/70">
      <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-6 px-5">
        <div className="max-w-[46ch]">
          <p className="font-sig text-[15px] font-extrabold uppercase tracking-[-.01em] text-giay">
            Vietnam Guider
          </p>
          <p className="mt-2 font-so text-[10.5px] leading-[1.6] tracking-[.03em] text-men-nhat">
            Some links earn us a commission. It never changes your price, and it never decides
            the order of a page — the cheapest option is listed first because it is the cheapest.
          </p>
        </div>
        <nav className="font-sig text-[11.5px] uppercase tracking-[.12em]">
          <Link href="/blog" className="block py-1 hover:text-nghe">Route guides</Link>
          <Link href="/disclosure" className="block py-1 hover:text-nghe">How we make money</Link>
          <Link href="/my-trip" className="block py-1 hover:text-nghe">Chuyến của tôi</Link>
        </nav>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How we make money",
  description:
    "Vietnam Guider earns commission on some booking links. It never changes your price and never decides the order of a page.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-[700px] px-5 py-14">
      <h1 className="font-doc text-[30px] font-semibold sm:text-[38px]">How we make money</h1>
      <div className="mt-6 space-y-5 text-[16.5px] leading-[1.7] text-muc/90">
        <p>
          Some links on this site are affiliate links. If you book through one, the operator
          pays us a commission. You pay exactly the same price you would have paid otherwise.
        </p>
        <p>
          Commission never decides what we recommend or how a page is ordered. On every route
          board the cheapest option is listed first because it is the cheapest, and the option
          marked <em>our pick</em> is the one we would book ourselves — sometimes that is
          the option paying us least.
        </p>
        <p>
          Prices shown are indicative. Operators set their own fares and change them without
          notice. Each route page carries the month we last checked it; if that date is more
          than three months old, treat the figures as a rough guide.
        </p>
      </div>
    </div>
  );
}

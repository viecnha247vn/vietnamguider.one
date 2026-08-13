/**
 * NGUỒN DUY NHẤT cho mọi link kiếm tiền.
 * Không bao giờ dán link đối tác thẳng vào file .mdx nữa —
 * đổi mã affiliate ở đây là cả trang đổi theo.
 *
 * Thay các giá trị dưới đây bằng ID thật trong tài khoản của bạn.
 */
const ID = {
  twelvego: "YOUR_12GO_AFF_ID",
  agoda: "YOUR_AGODA_CID",
  booking: "YOUR_BOOKING_AID",
} as const;

export type Partner = keyof typeof ID;

export function aff(partner: Partner, path = ""): string {
  const p = path.replace(/^\//, "");
  switch (partner) {
    case "twelvego":
      return `https://12go.asia/${p}?z=${ID.twelvego}`;
    case "agoda":
      return `https://www.agoda.com/${p}?cid=${ID.agoda}`;
    case "booking":
      return `https://www.booking.com/${p}?aid=${ID.booking}`;
  }
}

/** Tiện cho MDX: <RouteBoard ... ctaHref={go12("travel/hanoi/sapa")} /> */
export const go12 = (path?: string) => aff("twelvego", path);
export const goAgoda = (path?: string) => aff("agoda", path);
export const goBooking = (path?: string) => aff("booking", path);

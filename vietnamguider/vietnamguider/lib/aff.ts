/**
 * NGUỒN DUY NHẤT cho mọi link kiếm tiền.
 *
 * Cách dùng: điền ID thật vào ID bên dưới. XONG.
 * Không phải sửa một file .mdx nào — `decorate()` tự gắn mã vào mọi link
 * đối tác ngay lúc render, kể cả link trần đã viết sẵn trong 10 bài cũ.
 */

/** ĐIỀN Ở ĐÂY. Để nguyên chuỗi TODO thì link vẫn chạy, chỉ là không ra tiền. */
const ID = {
  twelvego: "TODO_12GO_ID",   // 12go.asia  -> tham số ?z=
  agoda: "TODO_AGODA_CID",    // agoda.com  -> tham số ?cid=
  booking: "TODO_BOOKING_AID",// booking.com-> tham số ?aid=
  klook: "TODO_KLOOK_AID",    // klook.com  -> tham số ?aid=
  airalo: "TODO_AIRALO_REF",  // airalo.com -> tham số ?ref=
} as const;

type Rule = { match: RegExp; param: string; id: string };

const RULES: Rule[] = [
  { match: /(^|\.)12go\.asia$/i,   param: "z",   id: ID.twelvego },
  { match: /(^|\.)agoda\.com$/i,   param: "cid", id: ID.agoda },
  { match: /(^|\.)booking\.com$/i, param: "aid", id: ID.booking },
  { match: /(^|\.)klook\.com$/i,   param: "aid", id: ID.klook },
  { match: /(^|\.)airalo\.com$/i,  param: "ref", id: ID.airalo },
];

/** Đã điền ID thật cho đối tác này chưa? */
export const hasId = (id: string) => Boolean(id) && !id.startsWith("TODO_");

/**
 * Gắn mã affiliate vào một URL đối tác.
 * - Không phải link đối tác  -> trả nguyên vẹn.
 * - Chưa điền ID             -> trả nguyên vẹn (link vẫn dùng được).
 * - Đã có sẵn tham số đó     -> giữ nguyên, không ghi đè.
 */
export function decorate(href: string): string {
  try {
    const u = new URL(href);
    const rule = RULES.find((r) => r.match.test(u.hostname));
    if (!rule || !hasId(rule.id)) return href;
    if (u.searchParams.has(rule.param)) return href;
    u.searchParams.set(rule.param, rule.id);
    return u.toString();
  } catch {
    return href; // đường dẫn nội bộ hoặc URL hỏng
  }
}

/** Bao nhiêu đối tác đã có mã — dùng cho npm run audit. */
export const idStatus = () =>
  Object.entries(ID).map(([k, v]) => ({ partner: k, ready: hasId(v) }));

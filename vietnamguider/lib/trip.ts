/**
 * "My Trip" KHÔNG cần đăng nhập, KHÔNG cần database.
 *
 * Lịch trình lưu trong localStorage của máy người dùng, và chia sẻ bằng cách
 * NHÉT THẲNG vào URL. Bạn bè mở link là thấy, không phải tạo tài khoản.
 *
 * Vì sao làm thế này trước khi dựng Supabase Auth:
 *  - Có ngay hiệu ứng mạng lưới (chia sẻ lịch trình) — thứ đắt giá nhất ở
 *    Giai đoạn 1 — mà tốn 0 đồng hạ tầng.
 *  - Không thu thập dữ liệu cá nhân => chưa phải lo GDPR.
 *  - Đo được nhu cầu thật: nếu không ai bấm Lưu, thì việc dựng đăng nhập
 *    ở tháng 1–3 đã là tiền vứt đi. Nếu nhiều người bấm, lúc đó mới nâng
 *    lên tài khoản để đồng bộ nhiều thiết bị — và bạn có số liệu để quyết.
 */

export type TripItem = {
  id: string;          // "route:hanoi-to-sa-pa:de"
  kind: "route" | "stay";
  title: string;       // "Limousine van"
  sub?: string;        // "Hà Nội → Sa Pa" hoặc "Tả Van"
  price?: string;      // "450.000₫"
  href: string;        // link đặt chỗ (đã gắn mã affiliate)
  source: string;      // slug bài để quay lại
};

const KEY = "vg.trip.v1";

export function readTrip(): TripItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as TripItem[]) : [];
  } catch {
    return [];
  }
}

export function writeTrip(items: TripItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("vg:trip"));
  } catch {
    /* hết dung lượng hoặc chế độ riêng tư — bỏ qua, không làm vỡ trang */
  }
}

export function toggleItem(item: TripItem): TripItem[] {
  const cur = readTrip();
  const next = cur.some((i) => i.id === item.id)
    ? cur.filter((i) => i.id !== item.id)
    : [...cur, item];
  writeTrip(next);
  return next;
}

export function hasItem(id: string): boolean {
  return readTrip().some((i) => i.id === id);
}

/* ── Chia sẻ qua URL ─────────────────────────────────────────
   base64url an toàn với tiếng Việt (btoa gốc vỡ khi gặp ký tự > 255). */

function b64encode(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64decode(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c: string) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeTrip(items: TripItem[]): string {
  return b64encode(JSON.stringify(items));
}

export function decodeTrip(token: string): TripItem[] | null {
  try {
    const parsed = JSON.parse(b64decode(token));
    return Array.isArray(parsed) ? (parsed as TripItem[]) : null;
  } catch {
    return null;
  }
}

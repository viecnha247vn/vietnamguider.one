#!/usr/bin/env node
/**
 * Kiểm tra sức khoẻ trang — chạy hàng tuần.
 *
 *   npm run audit
 *
 * Đây là ví dụ mẫu cho nguyên tắc "tự động hoá vận hành, không tự động hoá nội dung":
 * script không viết một chữ nào, nó chỉ nói cho bạn biết chỗ nào cần bàn tay người.
 *
 * Kiểm những gì:
 *  - Dấu kiểm giá quá 90 ngày  (hào cạnh tranh của bạn, mất là mất hết)
 *  - Chỗ giữ chỗ chưa thay     (TÊN KHÁCH SẠN THẬT, TODO, YOUR_...)
 *  - Bài thiếu tín hiệu information gain (không có giá bằng đồng, không tên nhà xe)
 *  - Điểm đến chưa có ảnh
 *  - Liên kết trong menu trỏ vào trang không tồn tại
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));

const issues = { chan: [], canh: [], nhac: [] }; // chặn / cảnh báo / nhắc
const add = (lvl, msg) => issues[lvl].push(msg);

/* ── 1. Chỗ giữ chỗ chưa thay ─────────────────────────────── */
const PLACEHOLDERS = [
  ["lib/aff.ts", "TODO_12GO_ID", "chan", "Mã 12Go chưa điền — nút đặt vé xe không ra tiền"],
  ["lib/aff.ts", "TODO_AGODA_CID", "chan", "Mã Agoda chưa điền — nút đặt phòng không ra tiền"],
  ["lib/aff.ts", "TODO_BOOKING_AID", "canh", "Mã Booking.com chưa điền"],
  ["lib/site.ts", "TÊN THẬT CỦA BẠN", "chan", "Chưa có danh tính tác giả — lỗ hổng E-E-A-T nặng nhất"],
  ["lib/site.ts", "TODO", "canh", "lib/site.ts còn trường TODO"],
];
for (const [file, needle, lvl, msg] of PLACEHOLDERS) {
  if (exists(file) && read(file).includes(needle)) add(lvl, `${msg}  (${file})`);
}

/* ── 2. Bài viết ──────────────────────────────────────────── */
const CONTENT = path.join(ROOT, "content");
const files = exists("content") ? fs.readdirSync(CONTENT).filter((f) => f.endsWith(".mdx")) : [];
const now = new Date();

for (const f of files) {
  const raw = fs.readFileSync(path.join(CONTENT, f), "utf8");
  const fm = raw.split("---")[1] ?? "";
  const slug = f.replace(/\.mdx$/, "");
  const get = (k) => (fm.match(new RegExp(`${k}:\\s*"([^"]+)"`)) || [])[1];

  // dấu kiểm giá
  const checked = get("checked");
  if (!checked) {
    add("canh", `${slug}: chưa có trường "checked" — không có tín hiệu tươi mới`);
  } else {
    const m = checked.match(/(\d{2}).*?(\d{4})/);
    if (m) {
      const age = Math.round((now - new Date(+m[2], +m[1] - 1, 1)) / 864e5);
      if (age > 90) add("chan", `${slug}: giá kiểm cách đây ${age} ngày — quá hạn 90 ngày`);
      else if (age > 75) add("canh", `${slug}: giá kiểm cách đây ${age} ngày — sắp tới hạn`);
    }
  }

  // chỗ giữ chỗ trong nội dung
  if (/TÊN [A-ZÀ-Ỹ ]+THẬT|TODO|LOREM/i.test(raw))
    add("chan", `${slug}: còn chỗ giữ chỗ chưa thay trong bài`);

  // tín hiệu information gain
  if (!/₫/.test(raw)) add("canh", `${slug}: không có giá bằng đồng — thiếu information gain`);
  if (!/operator:/.test(raw)) add("canh", `${slug}: không nêu tên nhà xe cụ thể`);
  if (!/pickup:/.test(raw)) add("nhac", `${slug}: không có địa chỉ đón — thêm vào là điểm mạnh nhất`);

  const words = raw.split(/\s+/).length;
  if (words < 500) add("canh", `${slug}: chỉ ${words} từ — quá mỏng`);
}

/* ── 3. Ảnh điểm đến ──────────────────────────────────────── */
if (exists("lib/destination-photos.json")) {
  const photos = JSON.parse(read("lib/destination-photos.json"));
  const names = [...read("lib/destinations.ts").matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
  const missing = names.filter((n) => !photos[n]);
  if (missing.length) add("nhac", `${missing.length}/${names.length} điểm đến chưa có ảnh: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? "…" : ""}`);
}

/* ── 4. Liên kết menu ─────────────────────────────────────── */
if (exists("lib/nav.ts")) {
  const hrefs = [...read("lib/nav.ts").matchAll(/href:\s*"(\/[^"]*)"/g)].map((m) => m[1]);
  for (const h of new Set(hrefs)) {
    const ok = h.startsWith("/blog/")
      ? exists(`content/${h.split("/blog/")[1]}.mdx`)
      : exists(`app${h === "/" ? "" : h}/page.tsx`);
    if (!ok) add("chan", `Menu trỏ vào trang không tồn tại: ${h}`);
  }
}

/* ── Báo cáo ──────────────────────────────────────────────── */
const S = { chan: "CHẶN  ", canh: "CẢNH  ", nhac: "NHẮC  " };
let n = 0;
for (const lvl of ["chan", "canh", "nhac"]) {
  for (const msg of issues[lvl]) { console.log(`  ${S[lvl]}${msg}`); n++; }
}
console.log(`\n  ${files.length} bài · ${n} vấn đề (${issues.chan.length} chặn, ${issues.canh.length} cảnh báo, ${issues.nhac.length} nhắc)\n`);
process.exit(issues.chan.length ? 1 : 0);

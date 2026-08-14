#!/usr/bin/env node
/**
 * Tải ảnh 20 điểm đến từ Wikimedia Commons và tự điền ghi công.
 *
 *   cd vietnamguider
 *   node scripts/fetch-destination-photos.mjs
 *
 * Không cần cài gì. Node 18+ đã có sẵn fetch.
 *
 * Script làm gì:
 *  1. Hỏi Commons API theo từ khoá của từng điểm đến.
 *  2. LỌC GIẤY PHÉP ở phía client: chỉ nhận CC0 / Public domain / CC BY / CC BY-SA.
 *     Loại thẳng mọi thứ có NC (phi thương mại) hoặc ND (cấm sửa) — trang của bạn
 *     có link kiếm tiền nên NC là vi phạm.
 *  3. Tải bản rộng 1600px về public/destinations/<slug>.jpg
 *  4. Ghi ghi công thật (tên người chụp, giấy phép, link file) vào
 *     lib/destination-photos.json — file này được destinations.ts đọc tự động.
 *
 * Cờ:
 *   --dry        chỉ xem sẽ lấy ảnh nào, không tải
 *   --only=sa-pa chỉ chạy một điểm đến
 *   --cc0        chỉ nhận CC0/Public domain (không phải ghi công, an toàn nhất)
 */

import fs from "node:fs/promises";
import path from "node:path";

const API = "https://commons.wikimedia.org/w/api.php";
const OUT_DIR = path.join(process.cwd(), "public", "destinations");
const OUT_JSON = path.join(process.cwd(), "lib", "destination-photos.json");

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry");
const CC0_ONLY = argv.includes("--cc0");
const ONLY = (argv.find((a) => a.startsWith("--only=")) || "").split("=")[1];

/** Từ khoá chọn sao cho ra ĐÚNG cảnh đặc trưng, không ra ảnh chung chung. */
const QUERIES = [
  ["Sa Pa",             "sa-pa",            "Muong Hoa valley rice terraces Sa Pa"],
  ["Ninh Bình",         "ninh-binh",        "Tam Coc Trang An Ninh Binh karst river"],
  ["Hà Giang",          "ha-giang",         "Ma Pi Leng pass Ha Giang"],
  ["Cát Bà",            "cat-ba",           "Lan Ha Bay Cat Ba island"],
  ["Mai Châu",          "mai-chau",         "Mai Chau valley Hoa Binh"],
  ["Hạ Long",           "ha-long",          "Ha Long Bay limestone islands"],
  ["Mộc Châu",          "moc-chau",         "Moc Chau tea hills Son La"],
  ["Cao Bằng",          "cao-bang",         "Ban Gioc waterfall Cao Bang"],
  ["Hội An",            "hoi-an",           "Hoi An ancient town lanterns"],
  ["Huế",               "hue",              "Hue imperial citadel gate"],
  ["Đà Nẵng",           "da-nang",          "Da Nang city beach Han river"],
  ["Phong Nha",         "phong-nha",        "Phong Nha Ke Bang cave"],
  ["Quy Nhơn",          "quy-nhon",         "Quy Nhon beach Binh Dinh"],
  ["Nha Trang",         "nha-trang",        "Nha Trang bay Khanh Hoa"],
  ["Đà Lạt",            "da-lat",           "Da Lat Xuan Huong lake pine"],
  ["Mũi Né",            "mui-ne",           "Mui Ne sand dunes Phan Thiet"],
  ["Phú Quốc",          "phu-quoc",         "Phu Quoc island beach"],
  ["Hồ Chí Minh City",  "ho-chi-minh-city", "Ho Chi Minh City skyline Saigon"],
  ["Cần Thơ",           "can-tho",          "Cai Rang floating market Can Tho"],
  ["Côn Đảo",           "con-dao",          "Con Dao island Ba Ria Vung Tau"],
];

const FREE = [
  { re: /^cc0/i,               name: "CC0",           url: "https://creativecommons.org/publicdomain/zero/1.0/", pd: true },
  { re: /public domain|^pd/i,  name: "Public domain", url: "",                                                  pd: true },
  { re: /^cc by-sa ?([\d.]+)/i, name: "CC BY-SA",     url: "https://creativecommons.org/licenses/by-sa/",       pd: false },
  { re: /^cc by ?([\d.]+)/i,   name: "CC BY",         url: "https://creativecommons.org/licenses/by/",          pd: false },
];

const stripHtml = (s = "") =>
  s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function classify(shortName = "") {
  if (/nc|noncommercial/i.test(shortName)) return null; // cấm: phi thương mại
  if (/\bnd\b|noderiv/i.test(shortName)) return null;   // cấm: không cho sửa
  for (const f of FREE) {
    const m = shortName.match(f.re);
    if (m) {
      const ver = m[1];
      return {
        license: ver ? `${f.name} ${ver}` : f.name,
        licenseUrl: f.pd ? f.url : `${f.url}${ver || "4.0"}/`,
        pd: f.pd,
      };
    }
  }
  return null;
}

async function api(params) {
  const url = `${API}?${new URLSearchParams({ ...params, format: "json", origin: "*" })}`;
  const r = await fetch(url, { headers: { "User-Agent": "VietnamGuider/1.0 (photo sourcing script)" } });
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
}

async function pick(query) {
  const data = await api({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1600",
  });

  const pages = Object.values(data?.query?.pages ?? {});
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    const meta = info?.extmetadata ?? {};
    const lic = classify(stripHtml(meta.LicenseShortName?.value));
    if (!lic) continue;
    if (CC0_ONLY && !lic.pd) continue;
    if ((info.thumbwidth ?? 0) < 900) continue; // bỏ ảnh nhỏ

    const author = stripHtml(meta.Artist?.value) || stripHtml(meta.Credit?.value) || "Unknown";
    return {
      file: p.title,
      thumb: info.thumburl,
      credit: author.slice(0, 120),
      license: lic.license,
      licenseUrl: lic.licenseUrl,
      sourceUrl: info.descriptionurl,
      alt: stripHtml(meta.ImageDescription?.value).slice(0, 160) || undefined,
    };
  }
  return null;
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": "VietnamGuider/1.0 (photo sourcing script)" } });
  if (!r.ok) throw new Error(`tải hỏng ${r.status}`);
  await fs.writeFile(dest, Buffer.from(await r.arrayBuffer()));
}

const run = async () => {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let out = {};
  try { out = JSON.parse(await fs.readFile(OUT_JSON, "utf8")); } catch { /* chưa có */ }

  const jobs = QUERIES.filter(([, slug]) => !ONLY || slug === ONLY);
  let ok = 0, miss = 0;

  for (const [name, slug, query] of jobs) {
    process.stdout.write(`  ${name.padEnd(18)} `);
    try {
      const hit = await pick(query);
      if (!hit) { console.log("KHÔNG TÌM RA ảnh giấy phép tự do"); miss++; continue; }

      if (!DRY) {
        await download(hit.thumb, path.join(OUT_DIR, `${slug}.jpg`));
        out[name] = {
          src: `/destinations/${slug}.jpg`,
          credit: hit.credit,
          license: hit.license,
          licenseUrl: hit.licenseUrl,
          sourceUrl: hit.sourceUrl,
          ...(hit.alt ? { alt: hit.alt } : {}),
        };
      }
      console.log(`${hit.license.padEnd(14)} ${hit.credit.slice(0, 40)}`);
      ok++;
    } catch (e) {
      console.log(`LỖI: ${e.message}`); miss++;
    }
    await new Promise((r) => setTimeout(r, 400)); // lịch sự với máy chủ Wikimedia
  }

  if (!DRY) {
    await fs.writeFile(OUT_JSON, JSON.stringify(out, null, 2) + "\n");
    console.log(`\n  Đã ghi ${OUT_JSON}`);
  }
  console.log(`\n  Xong: ${ok} ảnh, ${miss} thiếu.`);
  console.log("  KIỂM TRA BẰNG MẮT trước khi đăng — script chọn kết quả đầu tiên hợp lệ,");
  console.log("  đôi khi ra ảnh đúng giấy phép nhưng xấu hoặc không đúng cảnh.");
  console.log("  Đổi ảnh nào không ưng: sửa thẳng lib/destination-photos.json.\n");
};

run().catch((e) => { console.error(e); process.exit(1); });

/**
 * 20 điểm đến, cân đối ba miền: Bắc 8 · Trung 6 · Nam 6.
 *
 * `guide` chỉ điền khi bài tuyến ĐÃ TỒN TẠI. Điểm chưa có bài thì để trống —
 * thẻ hiện dấu "guide soon" và không phải là link. Không bao giờ trỏ vào 404.
 */
export type Region = "The North" | "Central" | "The South";

/**
 * Ảnh phải kèm ĐỦ thông tin giấy phép, nếu không component sẽ không hiện ảnh.
 * Đây là hàng rào cố ý: thiếu ghi công với CC BY / CC BY-SA là vi phạm bản quyền.
 *
 * `credit`  = tên NGƯỜI CHỤP GỐC (không phải người tải lên Wikimedia).
 * `src`     = nên tự host trong /public/destinations/ thay vì hotlink.
 */
export type Photo = {
  src: string;
  credit: string;
  license: string;      // "CC BY-SA 4.0" | "CC0" | "Public domain"
  licenseUrl: string;
  sourceUrl?: string;   // trang file trên Commons
  alt?: string;
};

export type Destination = {
  name: string;      // viết đúng dấu tiếng Việt — tên riêng, không dịch
  region: Region;
  photo?: Photo;
  blurb: string;
  guide?: string;    // đường dẫn bài tuyến, nếu đã có
};

export const DESTINATIONS: Destination[] = [
  // ── Miền Bắc (8) ─────────────────────────────────────────
  { name: "Sa Pa", region: "The North",
    blurb: "Rice terraces at 1,600 m, and the valley villages below the town.",
    guide: "/blog/hanoi-to-sa-pa" },
  { name: "Ninh Bình", region: "The North",
    blurb: "Limestone towers rising straight out of the rice fields. Halong on land.",
    guide: "/blog/hanoi-to-ninh-binh" },
  { name: "Hà Giang", region: "The North",
    blurb: "The loop everyone talks about, on the roads closest to the Chinese border.",
    guide: "/blog/hanoi-to-ha-giang" },
  { name: "Cát Bà", region: "The North",
    blurb: "The big island in Lan Hạ bay — quieter water, fewer boats than Hạ Long.",
    guide: "/blog/hanoi-to-cat-ba" },
  { name: "Mai Châu", region: "The North",
    blurb: "A flat green valley of stilt houses, close enough for a weekend from Hà Nội.",
    guide: "/blog/hanoi-to-mai-chau" },
  { name: "Hạ Long", region: "The North",
    blurb: "The famous bay. Worth it if you pick the right boat and the right night." },
  { name: "Mộc Châu", region: "The North",
    blurb: "Tea hills and plum blossom, on the road west towards Laos." },
  { name: "Cao Bằng", region: "The North",
    blurb: "Bản Giốc falls on the border, and some of the emptiest roads in the country." },

  // ── Miền Trung (6) ───────────────────────────────────────
  { name: "Hội An", region: "Central",
    blurb: "The lantern-lit old town, the tailors, and An Bàng beach fifteen minutes away.",
    guide: "/blog/da-nang-to-hoi-an" },
  { name: "Huế", region: "Central",
    blurb: "The imperial citadel, the tombs along the Perfume river, and the best bún bò.",
    guide: "/blog/da-nang-to-hue" },
  { name: "Đà Nẵng", region: "Central",
    blurb: "Where most Central trips land: long beach, cheap food, the Hải Vân pass north." },
  { name: "Phong Nha", region: "Central",
    blurb: "The largest caves on earth, in a national park most itineraries skip." },
  { name: "Quy Nhơn", region: "Central",
    blurb: "The coast Nha Trang was thirty years ago. Chăm towers and empty sand." },
  { name: "Nha Trang", region: "Central",
    blurb: "A full-scale resort city. Good for diving, islands, and doing very little." },

  // ── Miền Nam (6) ─────────────────────────────────────────
  { name: "Đà Lạt", region: "The South",
    blurb: "Pine forest, cool nights and coffee farms, five hours up from the coast.",
    guide: "/blog/ho-chi-minh-city-to-da-lat" },
  { name: "Mũi Né", region: "The South",
    blurb: "Red and white sand dunes, and the country's steadiest wind for kitesurfing.",
    guide: "/blog/ho-chi-minh-city-to-mui-ne" },
  { name: "Phú Quốc", region: "The South",
    blurb: "The big southern island — resorts on one coast, fishing towns on the other.",
    guide: "/blog/ho-chi-minh-city-to-phu-quoc" },
  { name: "Hồ Chí Minh City", region: "The South",
    blurb: "Saigon. Where most southern trips start, and where the street food is loudest." },
  { name: "Cần Thơ", region: "The South",
    blurb: "The Mekong delta hub. Go for the floating market, and go before sunrise." },
  { name: "Côn Đảo", region: "The South",
    blurb: "A remote prison island turned marine park. Hard to reach, which is the point." },
];

export const REGIONS: Region[] = ["The North", "Central", "The South"];

export const byRegion = (r: Region) => DESTINATIONS.filter((d) => d.region === r);

/**
 * Danh tính trang — dùng cho schema, trang About, và ghi tên tác giả.
 *
 * ĐIỀN TÊN THẬT CỦA BẠN. Đây không phải chi tiết trang trí:
 * với nhóm trang affiliate, thiếu danh tính tác giả là lỗ hổng E-E-A-T
 * nghiêm trọng nhất, và là thứ ba đợt cập nhật lõi 2026 soi kỹ nhất.
 */
export const SITE = {
  name: "Vietnam Guider",
  url: "https://vietnamguider.one",
  tagline: "How to actually get around Vietnam",
  email: "TODO@vietnamguider.one",
};

export const AUTHOR = {
  name: "TÊN THẬT CỦA BẠN",
  role: "Founder and editor",
  // Một câu vì sao người này biết chuyện. Cụ thể thắng hoa mỹ.
  // Ví dụ: "Đã đi hơn 40 chuyến xe đêm ở Việt Nam từ 2023."
  bio: "TODO — một câu, cụ thể, có con số.",
  based: "TODO — bạn ở đâu",
  // Hồ sơ công khai giúp Google nối danh tính. Bỏ dòng nào chưa có.
  sameAs: [] as string[],
};

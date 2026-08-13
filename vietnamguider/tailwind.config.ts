import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Bảng màu lấy từ vật liệu thật của giao thông Việt Nam:
 * men sơn bến xe / toa tàu, sơn mài, bột nghệ, giấy dó, mực tre.
 * Cố ý KHÔNG dùng nền kem + cam đất — đó là mặc định của web AI.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        men: { DEFAULT: "#0B4F45", sau: "#06322C", nhat: "#A9C3BB" }, // men ngọc
        son: "#8A2B20",   // sơn mài — chỉ dùng cho con dấu, nhãn, cảnh báo
        nghe: "#E3A21A",  // nghệ — chữ số, kẻ chỉ, nút chính
        giay: { DEFAULT: "#F2EDE1", sau: "#E6DCC9" }, // giấy dó
        muc: "#16130F",   // mực tre
        tro: "#7D7669",
      },
      fontFamily: {
        // Chữ "biển hiệu": Be Vietnam Pro do người Việt thiết kế, dấu chuẩn.
        sig: ["var(--font-sig)", "system-ui", "sans-serif"],
        // Chữ "đọc": serif ấm, dấu tiếng Việt đầy đủ.
        doc: ["var(--font-doc)", "Georgia", "serif"],
        // Chữ "số liệu": giá tiền, giờ, km — luôn tabular.
        so: ["var(--font-so)", "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "940px" },
      borderRadius: { none: "0px" }, // bo góc là dấu vết của template
      boxShadow: {
        // Lệch bản in kiểu tranh khắc gỗ — thay cho drop-shadow mềm.
        khac: "3px 3px 0 #16130F",
        khacnho: "2px 2px 0 #E3A21A",
      },
    },
  },
  plugins: [typography],
};
export default config;

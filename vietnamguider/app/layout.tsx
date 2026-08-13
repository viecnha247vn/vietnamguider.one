import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vietnamguider.one"),
  title: {
    default: "Vietnam Guider — how to actually get around Vietnam",
    template: "%s | Vietnam Guider",
  },
  description:
    "Route guides written from the pavement, not the press release. Real operators, real addresses, prices in dong, re-checked every month.",
  openGraph: { type: "website", siteName: "Vietnam Guider", url: "https://vietnamguider.one" },
};

/**
 * Font nạp bằng <link> chứ KHÔNG dùng next/font/google.
 * Lý do: next/font tải font từ Google NGAY LÚC BUILD. Nếu máy build
 * không ra được mạng, hoặc tên font / subset sai một ký tự, thì
 * `npm run build` chết. Nạp bằng <link> thì trình duyệt tải font,
 * quá trình build không phụ thuộc mạng — không bao giờ vỡ vì lý do này.
 *
 * Ba vai chữ, ba việc khác nhau:
 *  - sig: chữ biển hiệu. Be Vietnam Pro do foundry Việt thiết kế, dấu đặt đúng chỗ.
 *  - doc: chữ để đọc. Lora, serif ấm, có dấu tiếng Việt đầy đủ.
 *  - so:  chữ số liệu. Giá, giờ, km.
 */
const FONTS =
  "https://fonts.googleapis.com/css2?" +
  "family=Be+Vietnam+Pro:wght@400;600;800&" +
  "family=Lora:ital,wght@0,400;0,600;1,400&" +
  "family=IBM+Plex+Mono:wght@400;500;600&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/**
 * Ba vai chữ, ba việc khác nhau:
 *  - sig: chữ biển hiệu. Be Vietnam Pro do foundry Việt thiết kế,
 *         dấu tiếng Việt đặt đúng vị trí (không phải Inter ghép dấu).
 *  - doc: chữ để đọc. Lora, serif ấm, có subset vietnamese.
 *  - so:  chữ số liệu. Chỉ hiện chữ số nên chỉ cần subset latin.
 */
const sig = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "800"],
  variable: "--font-sig",
  display: "swap",
});

const doc = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-doc",
  display: "swap",
});

const so = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-so",
  display: "swap",
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sig.variable} ${doc.variable} ${so.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

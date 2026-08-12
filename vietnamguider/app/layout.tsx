import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

// Display face — warm editorial serif for the wordmark & headings.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI face.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vietnamguider.one"),
  title: {
    default: "Vietnam Guider — The easiest way for foreigners to travel Vietnam",
    template: "%s | Vietnam Guider",
  },
  description:
    "Your online travel concierge for Vietnam: routes, stays, eSIMs and ready-made itineraries for independent travellers.",
  openGraph: {
    type: "website",
    siteName: "Vietnam Guider",
    url: "https://vietnamguider.one",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

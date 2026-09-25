import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import MotionProvider from "@/components/ui/MotionProvider";
import ChatLauncher from "@/components/chat/ChatLauncher";
import SiteFrame from "@/components/layout/SiteFrame";

/**
 * Google Sans is Google's brand typeface, self-hosted here for a GDG chapter
 * site. Swap for licensed files before any commercial use outside that context.
 */
const googleSans = localFont({
  variable: "--font-google-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/GoogleSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/GoogleSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/GoogleSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const googleSansDisplay = localFont({
  variable: "--font-google-sans-display",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/GoogleSansDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSansDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gdgnagpur.dev"),
  title: {
    default: "GDG Nagpur - Build. Learn. Grow together.",
    template: "%s | GDG Nagpur",
  },
  description:
    "Google Developer Groups Nagpur: events, free mentorship, and real opportunities for developers in Nagpur, India.",
  openGraph: {
    title: "GDG Nagpur - Build. Learn. Grow together.",
    description:
      "Events, free mentorship, and real opportunities for developers in Nagpur, India.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${googleSans.variable} ${googleSansDisplay.variable}`}>
      <body>
        <a
          href="#main"
          className="btn-solid sr-only bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <MotionProvider />
        <SiteFrame navbar={<Navbar />} footer={<Footer />} chat={<ChatLauncher />}>
          {children}
        </SiteFrame>
      </body>
    </html>
  );
}

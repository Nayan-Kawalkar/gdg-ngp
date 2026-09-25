import type { Viewport } from "next";
import { Caveat, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import DevfestHeader from "@/components/devfest/DevfestHeader";
import DevfestFooter from "@/components/devfest/DevfestFooter";
import PassportWidget from "@/components/devfest/PassportWidget";

/**
 * DevFest Nagpur 2026 is a microsite with its own look (Devfest/styling.jpeg):
 * Poppins is the primary face, Google Sans (loaded globally) the secondary,
 * and Caveat sets the template's hand-written note. The site's navbar, footer
 * and chat are left out for this route by components/layout/SiteFrame.tsx.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
};

export default function DevfestLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${poppins.variable} ${caveat.variable} bg-df-paper text-df-ink`}>
      <DevfestHeader />
      <main id="main">{children}</main>
      <DevfestFooter />
      <PassportWidget />
    </div>
  );
}

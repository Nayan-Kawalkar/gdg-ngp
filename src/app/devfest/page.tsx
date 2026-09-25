import type { Metadata } from "next";
import DevfestHero from "@/components/devfest/DevfestHero";
import TopicStrip from "@/components/devfest/TopicStrip";
import ThemeSection from "@/components/devfest/ThemeSection";
import StatsStrip from "@/components/devfest/StatsStrip";
import RoutesSection from "@/components/devfest/RoutesSection";
import CheckInKiosk from "@/components/devfest/CheckInKiosk";
import MapSection from "@/components/devfest/MapSection";
import PassesSection from "@/components/devfest/PassesSection";
import ScheduleSection from "@/components/devfest/ScheduleSection";
import SpeakSection from "@/components/devfest/SpeakSection";
import WhySection from "@/components/devfest/WhySection";
import OnBoardSection from "@/components/devfest/OnBoardSection";
import LastYearSection from "@/components/devfest/LastYearSection";
import PartnerSection from "@/components/devfest/PartnerSection";
import CommunitySection from "@/components/devfest/CommunitySection";
import FaqSection from "@/components/devfest/FaqSection";
import NotifySection from "@/components/devfest/NotifySection";
import { devfestMeta } from "@/data/devfest";

export const metadata: Metadata = {
  title: { absolute: devfestMeta.title },
  description: devfestMeta.description,
  openGraph: {
    title: devfestMeta.title,
    description: devfestMeta.description,
    images: [{ url: "/devfest/hero.jpg", width: 1672, height: 941, alt: "DevFest Nagpur 2026" }],
  },
};

/**
 * Section order follows Devfest/website template.jpeg (hero, about, stats,
 * tracks, speakers, why attend, partners, FAQ, takeoff strip). Sections that
 * exist only in the content file (map, passes, schedule, on board, last year,
 * community) sit between them in the content file's order, and the check-in
 * kiosk (web only) follows the routes.
 */
export default function DevfestPage() {
  return (
    <>
      <DevfestHero />
      <TopicStrip />
      <ThemeSection />
      <StatsStrip />
      <RoutesSection />
      <CheckInKiosk />
      <MapSection />
      <PassesSection />
      <ScheduleSection />
      <SpeakSection />
      <WhySection />
      <OnBoardSection />
      <LastYearSection />
      <PartnerSection />
      <CommunitySection />
      <FaqSection />
      <NotifySection />
    </>
  );
}

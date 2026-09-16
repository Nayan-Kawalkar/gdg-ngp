import Hero from "@/components/home/Hero";
import TopicTicker from "@/components/home/TopicTicker";
import LatestEvents from "@/components/home/LatestEvents";
import WhyJoin from "@/components/home/WhyJoin";
import StoryStats from "@/components/home/StoryStats";
import TechNews from "@/components/home/TechNews";
import OpportunitiesStrip from "@/components/home/OpportunitiesStrip";
import CommunityMosaic from "@/components/home/CommunityMosaic";
import OrganizerStrip from "@/components/home/OrganizerStrip";
import CommunityCTA from "@/components/home/CommunityCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TopicTicker />
      <LatestEvents />
      <WhyJoin />
      <StoryStats />
      <TechNews />
      <OpportunitiesStrip />
      <CommunityMosaic />
      <OrganizerStrip />
      <CommunityCTA />
    </>
  );
}

import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import AboutHero from "@/components/about/AboutHero";
import Timeline from "@/components/about/Timeline";
import Impact from "@/components/about/Impact";
import Pillars from "@/components/about/Pillars";
import EventTabs from "@/components/about/EventTabs";
import Team from "@/components/about/Team";
import CommunityCTA from "@/components/home/CommunityCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "How GDG Nagpur got here, what the chapter stands for, and who runs it. Volunteer-run since 2019.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Timeline />
      <Impact />
      <Pillars />

      <Section tone="cream">
        <Container>
          <SectionHeader
            eyebrow="Everything we've run"
            title="Past, ongoing and what's next."
            lede="A curated slice of the calendar. The full directory lives on the events page."
            action={
              <ButtonLink href="/events" variant="outline">
                Full directory
              </ButtonLink>
            }
          />
          <EventTabs />
        </Container>
      </Section>

      <Team />
      <CommunityCTA />
    </>
  );
}

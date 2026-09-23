import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import PageHero from "@/components/ui/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What GDG Nagpur collects through this site, why, and how to have it removed.",
};

/**
 * TODO(legal): plain-language note written for the frontend-only build. Have
 * the organizers review it before launch, and update it when forms start
 * storing data or analytics are added.
 */
const sections = [
  {
    title: "What this site collects",
    body: [
      "Only what you type into a form: usually your name, email and whatever the form asks about (a talk proposal, a mentor application, an opportunity you are sharing).",
      "Right now the forms are not connected to any backend, so nothing you submit is stored or sent anywhere. This page will be updated when that changes.",
    ],
  },
  {
    title: "What we use it for",
    body: [
      "To review what you sent and reply to you. Your name appears publicly only where a form says it will - for example, credited on an opportunity you shared, or on a mentor profile once approved.",
      "We never sell or share your details with sponsors. Hiring partners only see a résumé book if you opted in to it at an event.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "The site does not set advertising cookies. If we add privacy-friendly analytics (page views, not people), it will be listed here.",
      "Embedded YouTube videos load only when you press play, using YouTube's privacy-enhanced mode.",
    ],
  },
  {
    title: "Removing your data",
    body: [
      `Email ${site.email} and we will delete anything you submitted, or take down a listing or profile, within a few days.`,
    ],
  },
  {
    title: "About GDG Nagpur",
    body: [
      "GDG Nagpur is an independent, volunteer-run community in the Google Developer Groups programme. This is not an official Google website, and Google is not responsible for its content.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        lines={["Short, plain,", "and honest."]}
        lede="What this site collects, what happens to it, and how to have it removed."
        washes={["blue", "green"]}
      />
      <Section tone="cream" pad="bottom">
        <Container>
          <div className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <div key={section.title} data-reveal="fade-up">
                <h2 className="text-[1.6rem] leading-tight tracking-[-0.03em] sm:text-[1.9rem]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((p) => (
                    <p key={p} className="text-[1.0125rem] leading-[1.75] text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <p className="border-t border-ink/10 pt-8 text-[0.85rem] text-ink-soft/70">
              Last updated September 2026.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

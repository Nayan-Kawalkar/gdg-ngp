/**
 * Collaborate page: sponsorship and partnership.
 *
 * Headline numbers reuse the About/Home stats so the site never quotes two
 * different figures. TODO(collaborate): `audienceMix` percentages and the
 * tier benefits are PLACEHOLDERS - confirm with the organizers before launch.
 */

import type { FaqItem } from "@/components/ui/Faq";
import { events } from "@/data/events";
import { impactStats } from "@/data/about";
import { stats } from "@/data/home";

export type Accent = "blue" | "red" | "yellow" | "green";

export type AudienceStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  accent: Accent;
};

const pick = <T extends { id: string }>(list: T[], id: string) => {
  const item = list.find((s) => s.id === id);
  if (!item) throw new Error(`Missing stat "${id}"`);
  return item;
};

const audience = (source: AudienceStat, accent: Accent): AudienceStat => {
  const { id, value, suffix, label } = source;
  return { id, value, suffix, label, accent };
};

export const audienceStats: AudienceStat[] = [
  audience(pick(impactStats, "attendees"), "blue"),
  audience(pick(stats, "members"), "green"),
  audience(pick(impactStats, "events"), "red"),
  audience(pick(impactStats, "cities"), "yellow"),
];

export type MixRow = { label: string; share: number; accent: Accent };

export const audienceMix: MixRow[] = [
  { label: "College students", share: 58, accent: "blue" },
  { label: "Early-career developers (0-3 yrs)", share: 27, accent: "green" },
  { label: "Senior engineers, leads and founders", share: 15, accent: "yellow" },
];

export type Tier = {
  id: "community" | "gold" | "platinum";
  name: string;
  tagline: string;
  benefits: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "community",
    name: "Community",
    tagline: "Fund one thing, visibly.",
    benefits: [
      "Logo on one event page and its recap",
      "Thank-you on stage and in the event post",
      "Swag table at the venue",
      "In-kind support (venue, credits, food) welcome",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Be part of the day, not just the banner.",
    featured: true,
    benefits: [
      "Everything in Community",
      "A 10-minute technical slot or workshop table",
      "Branded prize track at a hackathon",
      "Opt-in résumé book from attendees",
      "Two social posts across our channels",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "Headline a flagship - DevFest or Build with AI.",
    benefits: [
      "Everything in Gold",
      "Title placement on a flagship event",
      "Keynote or panel seat for your team",
      "Hiring booth and a post on Jobs in Nagpur",
      "Post-event report with attendance numbers",
    ],
  },
];

/** Every distinct sponsor already credited on an event, venues excluded. */
export function pastPartners(): string[] {
  const names = new Set<string>();
  for (const event of events) {
    for (const sponsor of event.sponsors ?? []) {
      if (sponsor.tier !== "Venue") names.add(sponsor.name);
    }
  }
  return [...names];
}

/** Venues that have hosted us - shown separately from sponsors. */
export function pastVenues(): string[] {
  const names = new Set<string>();
  for (const event of events) {
    for (const sponsor of event.sponsors ?? []) {
      if (sponsor.tier === "Venue") names.add(sponsor.name);
    }
  }
  return [...names];
}

export const coHostSteps: { title: string; body: string; accent: Accent }[] = [
  {
    title: "Tell us the idea",
    body: "A study jam for your campus, a workshop for your team, a hackathon brief. A paragraph is enough.",
    accent: "blue",
  },
  {
    title: "We shape it together",
    body: "We bring speakers, the format and the audience. You bring the room, or the problem worth solving.",
    accent: "red",
  },
  {
    title: "Run it, then recap",
    body: "We handle registrations and on-the-day running, and send you a recap with photos and numbers.",
    accent: "green",
  },
];

export const collaborateFaqs: FaqItem[] = [
  {
    q: "Do you accept in-kind sponsorship?",
    a: "Yes, and often prefer it. A venue, cloud credits for a hackathon, or lunch for sixty people is worth as much to us as a transfer.",
  },
  {
    q: "Can we recruit at your events?",
    a: "At Gold and above, with a hiring table or booth. We do not share attendee contact details - attendees opt in to a résumé book if they want to.",
  },
  {
    q: "How far ahead should we get in touch?",
    a: "Six to eight weeks for a flagship event, three to four for a workshop or study jam. Earlier is always easier.",
  },
  {
    q: "Is GDG Nagpur part of Google?",
    a: "No. We are an independent, volunteer-run chapter in the Google Developer Groups programme. Sponsorship agreements are with the chapter, not with Google.",
  },
];

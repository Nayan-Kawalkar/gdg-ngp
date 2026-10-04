/**
 * About-page content.
 *
 * TODO(content): the milestones and the core team below are PLACEHOLDERS -
 * plausible stand-ins so the layout is real. Replace with the chapter's actual
 * history and team before launch. Only `organizer` (in home.ts) is confirmed.
 */

export type Milestone = {
  id: string;
  year: string;
  title: string;
  body: string;
  tag: string;
  accent: "blue" | "red" | "yellow" | "green";
};

export const milestones: Milestone[] = [
  {
    id: "founded",
    year: "2019",
    title: "Twelve people and a borrowed classroom",
    body: "The chapter started as a weekend study group at a college in Ramdaspeth. No sponsors, no stage, one projector that only worked at the second attempt.",
    tag: "Founded",
    accent: "blue",
  },
  {
    id: "first-devfest",
    year: "2021",
    title: "The first DevFest Nagpur",
    body: "Run entirely online because it had to be. 180 people showed up, and the hallway track ran on Discord until two in the morning.",
    tag: "DevFest",
    accent: "red",
  },
  {
    id: "in-person",
    year: "2022",
    title: "Back in a room together",
    body: "The first in-person event after the gap. Study jams restarted, and the chapter learned that people would travel across the city on a Saturday if the session was worth it.",
    tag: "Study Jam",
    accent: "yellow",
  },
  {
    id: "wtm",
    year: "2023",
    title: "Women Techmakers comes to Nagpur",
    body: "An International Women's Day event that turned into a standing commitment: every programme since has been planned with who is not yet in the room in mind.",
    tag: "Women Techmakers",
    accent: "green",
  },
  {
    id: "build-with-ai",
    year: "2024",
    title: "Build with AI: Code for Communities",
    body: "The first edition asked teams to build something for Nagpur itself, not a generic demo. Four of those prototypes are still maintained by their teams.",
    tag: "Build with AI",
    accent: "blue",
  },
  {
    id: "fifteen-thousand",
    year: "2026",
    title: "15,000+ members, still volunteer-run",
    body: "Fifty events in, the chapter has never charged for a ticket. The mentor platform and the opportunity board are the next things to get right.",
    tag: "Today",
    accent: "red",
  },
];

export type Pillar = {
  id: string;
  title: string;
  body: string;
  accent: "blue" | "red" | "yellow" | "green";
};

export const pillars: Pillar[] = [
  {
    id: "learning",
    title: "Learning you can use on Monday",
    body: "Every session is built around something you actually run, deploy or break. If a topic cannot survive a hands-on hour, it becomes a talk, not a workshop.",
    accent: "blue",
  },
  {
    id: "diversity",
    title: "Diversity as a planning input",
    body: "Who is missing from the room is a question we ask before the invite goes out, not after. Women Techmakers is part of the chapter, not a once-a-year event.",
    accent: "red",
  },
  {
    id: "community-led",
    title: "Community-led, not broadcast",
    body: "Members propose sessions, mentor each other and post the opportunities. The organizers keep the lights on; the programme belongs to the people who turn up.",
    accent: "green",
  },
];

export type ImpactStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  note: string;
  accent: "blue" | "red" | "yellow" | "green";
};

/** Deliberately different metrics from the home page's stats strip. */
export const impactStats: ImpactStat[] = [
  {
    id: "attendees",
    value: 6500,
    suffix: "+",
    label: "Attendees reached",
    note: "Across every event since 2019",
    accent: "blue",
  },
  {
    id: "events",
    value: 50,
    suffix: "+",
    label: "Events run",
    note: "Study jams, DevFests, bootcamps",
    accent: "red",
  },
  {
    id: "mentors",
    value: 25,
    suffix: "+",
    label: "Mentors onboarded",
    note: "Vetted, and free to talk to",
    accent: "yellow",
  },
  {
    id: "cities",
    value: 14,
    suffix: "",
    label: "Cities reached",
    note: "Online editions pull well beyond Nagpur",
    accent: "green",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Optional portrait; falls back to an initials tile. */
  photo?: string;
  linkedin?: string;
  instagram?: string;
};

/** TODO(team): placeholder members - replace with the real core team. */
export const coreTeam: TeamMember[] = [
  { id: "t1", name: "Core Team Member", role: "Events & Logistics", linkedin: "#" },
  { id: "t2", name: "Core Team Member", role: "Speaker Relations", linkedin: "#" },
  { id: "t3", name: "Core Team Member", role: "Design & Content", linkedin: "#" },
  { id: "t4", name: "Core Team Member", role: "Community & Socials", linkedin: "#" },
];

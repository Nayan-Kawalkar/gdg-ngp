/**
 * Share Your Knowledge page: community-made content.
 *
 * TODO(knowledge): `liveSessions` and `recentVideos` are PLACEHOLDERS. Set a
 * real `videoId` (the part after `v=` in a YouTube URL) on each video and the
 * card plays it in place; without one it links out to the channel.
 */

import type { FaqItem } from "@/components/ui/Faq";

export type Accent = "blue" | "red" | "yellow" | "green";

export type Path = {
  id: "reel" | "session" | "live";
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: Accent;
};

export const paths: Path[] = [
  {
    id: "reel",
    title: "Make a reel or video",
    body: "Sixty seconds on a trick you use daily, or ten minutes walking through something you built. We reshare the good ones with credit.",
    cta: "Submit a video",
    href: "#submit-reel",
    accent: "red",
  },
  {
    id: "session",
    title: "Run an online session",
    body: "A 45-minute talk or a live-coding hour on Meet or YouTube. Lower stakes than a stage, same audience.",
    cta: "Propose a session",
    href: "#submit-session",
    accent: "blue",
  },
  {
    id: "live",
    title: "Join a YouTube Live",
    body: "Our monthly lives need co-hosts and guests. Come on for fifteen minutes and answer what the chat asks.",
    cta: "See the schedule",
    href: "#live",
    accent: "green",
  },
];

export const reelDos: string[] = [
  "Vertical 9:16 for reels, 16:9 for anything longer than three minutes",
  "One idea per video - the trick, the fix, the thing you learned",
  "Show the screen. Faces optional, code mandatory",
  "Captions on: most people watch on mute",
];

export const reelDonts: string[] = [
  "Reposting someone else's content, even with credit",
  "Paid-course promotion or referral links",
  "Music you do not have the rights to",
  "Anything you would not show at a college fest",
];

export type LiveSession = {
  id: string;
  title: string;
  host: string;
  /** ISO date */
  date: string;
  time: string;
  level: "Beginner" | "Intermediate" | "All levels";
};

export const liveSessions: LiveSession[] = [
  {
    id: "live-1",
    title: "Ask a Flutter dev anything",
    host: "Community host",
    date: "2026-10-04",
    time: "7:00 PM IST",
    level: "All levels",
  },
  {
    id: "live-2",
    title: "Live-coding a Gemini chatbot in an hour",
    host: "Community host",
    date: "2026-10-18",
    time: "7:30 PM IST",
    level: "Intermediate",
  },
  {
    id: "live-3",
    title: "Résumé teardown: five from the community",
    host: "Organizer panel",
    date: "2026-11-01",
    time: "6:30 PM IST",
    level: "Beginner",
  },
  {
    id: "live-4",
    title: "Cloud Run in production: what broke",
    host: "Community host",
    date: "2026-11-15",
    time: "7:00 PM IST",
    level: "Intermediate",
  },
];

export type Video = {
  id: string;
  title: string;
  by: string;
  duration: string;
  /** YouTube id. PLACEHOLDER while unset - the card links to the channel. */
  videoId?: string;
  accent: Accent;
};

export const recentVideos: Video[] = [
  { id: "v-1", title: "Build with AI 2025 - opening keynote", by: "GDG Nagpur", duration: "32:10", accent: "blue" },
  { id: "v-2", title: "Compose in 60 seconds: LazyColumn keys", by: "Community reel", duration: "0:58", accent: "green" },
  { id: "v-3", title: "Firebase Auth without the boilerplate", by: "Community session", duration: "41:25", accent: "yellow" },
  { id: "v-4", title: "How I got my first internship from a study jam", by: "Community reel", duration: "1:12", accent: "red" },
  { id: "v-5", title: "DevFest 2024 - panel: building from Tier-2 cities", by: "GDG Nagpur", duration: "48:03", accent: "blue" },
  { id: "v-6", title: "Git rebase, explained with sticky notes", by: "Community reel", duration: "0:45", accent: "green" },
];

export const knowledgeFaqs: FaqItem[] = [
  {
    q: "Do I keep the rights to my video?",
    a: "Yes. You give us permission to reshare it on GDG Nagpur channels with credit - that is all. Ask us to take it down any time.",
  },
  {
    q: "I have never recorded anything. Can I still propose a session?",
    a: "Please do. Online sessions are where most of our speakers start. We do a tech check with you the day before.",
  },
  {
    q: "What topics work best?",
    a: "Anything you have actually used at work or in a project: a library, a workflow, a mistake you learned from. Tutorials of the docs work less well.",
  },
];

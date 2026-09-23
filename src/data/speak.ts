/**
 * Speak / Judge page content.
 *
 * TODO(speakers): `pastSpeakers` are PLACEHOLDERS - initials and placeholder
 * companies so the layout is real. Replace with people who have agreed to be
 * listed, with their LinkedIn, before launch.
 */

import type { FaqItem } from "@/components/ui/Faq";

export type Accent = "blue" | "red" | "yellow" | "green";

export type SpeakFormat = {
  id: string;
  name: string;
  pitch: string;
  length: string;
  audience: string;
  accent: Accent;
};

export const speakFormats: SpeakFormat[] = [
  {
    id: "roadshow",
    name: "Roadshows",
    pitch: "One talk, taken to four or five campuses across Vidarbha in a fortnight.",
    length: "45 min, repeated",
    audience: "Students, 150-300 a stop",
    accent: "blue",
  },
  {
    id: "bootcamp",
    name: "Bootcamps",
    pitch: "A full weekend on one stack. You teach a module and help at the tables.",
    length: "2 days",
    audience: "40-60 builders",
    accent: "red",
  },
  {
    id: "study-jam",
    name: "Study Jams",
    pitch: "Four weekly evenings working through a Google course together. You unblock people.",
    length: "4 x 90 min",
    audience: "30-50 learners",
    accent: "yellow",
  },
  {
    id: "workshop",
    name: "Workshops",
    pitch: "Hands-on, laptops open. Everyone leaves with something that runs.",
    length: "2-3 hours",
    audience: "25-40 people",
    accent: "green",
  },
  {
    id: "fireside",
    name: "Fireside Chats",
    pitch: "No slides. An organizer asks, you answer, then the room gets the mic.",
    length: "60 min",
    audience: "All levels",
    accent: "blue",
  },
];

export const lookFor: string[] = [
  "A talk you could only give because you did the thing - not a docs summary.",
  "One clear takeaway people can use the following Monday.",
  "Live code or a real demo beats a deck of screenshots.",
  "First-time speakers are welcome. Say so in the form and we pair you with a mentor.",
];

export const youGet: string[] = [
  "A dry run with an organizer the week before, and honest notes.",
  "Your session recorded and posted on the chapter's YouTube, if you want it.",
  "A speaker certificate and a line on the event page with your LinkedIn.",
  "Travel covered within Nagpur for in-person events.",
];

export type PastSpeaker = {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  kind: "Speaker" | "Judge";
  accent: Accent;
};

export const pastSpeakers: PastSpeaker[] = [
  { id: "ps-1", name: "Priya K.", role: "ML Engineer", company: "Placeholder Labs", topic: "Shipping Gemini features without a GPU budget", kind: "Speaker", accent: "blue" },
  { id: "ps-2", name: "Arjun D.", role: "Android Lead", company: "Placeholder Mobile", topic: "Compose for teams still on XML", kind: "Speaker", accent: "green" },
  { id: "ps-3", name: "Meera S.", role: "Engineering Manager", company: "Placeholder Systems", topic: "Judged Build with AI 2025", kind: "Judge", accent: "red" },
  { id: "ps-4", name: "Rohan T.", role: "Cloud Architect", company: "Placeholder Cloud", topic: "Cloud Run from zero to prod", kind: "Speaker", accent: "yellow" },
  { id: "ps-5", name: "Sana A.", role: "Product Designer", company: "Placeholder Studio", topic: "Design systems for two-person teams", kind: "Speaker", accent: "red" },
  { id: "ps-6", name: "Vikram P.", role: "CTO", company: "Placeholder Health", topic: "Judged DevFest Hack 2024", kind: "Judge", accent: "blue" },
  { id: "ps-7", name: "Neha R.", role: "Developer Advocate", company: "Placeholder Dev", topic: "Firebase Genkit, hands-on", kind: "Speaker", accent: "green" },
  { id: "ps-8", name: "Kabir J.", role: "SRE", company: "Placeholder Infra", topic: "On-call without the burnout", kind: "Speaker", accent: "yellow" },
];

export const selectionSteps: { title: string; body: string }[] = [
  { title: "You apply", body: "Five minutes. A title and a paragraph is enough to start." },
  { title: "We read it", body: "Two organizers review every proposal within about two weeks." },
  { title: "We match a date", body: "We fit it to an event and format that suits the topic." },
  { title: "Dry run", body: "A 20-minute practice call the week before. Then you are on." },
];

export const speakFaqs: FaqItem[] = [
  {
    q: "I have never given a talk. Should I still apply?",
    a: "Yes. About a third of our speakers each year are first-timers. Tick the box in the form and we will pair you with someone who has done it before.",
  },
  {
    q: "Do you pay speakers?",
    a: "No - the chapter is volunteer-run and every event is free to attend. We cover local travel and make sure your session is recorded and credited.",
  },
  {
    q: "Can I talk about my company's product?",
    a: "If it is a genuinely useful technical talk that happens to use it, yes. A sales pitch, no. When in doubt, tell us in the abstract and we will say.",
  },
  {
    q: "What does judging a hackathon involve?",
    a: "Usually one afternoon: a briefing, 5-minute demos from each team, and a scoring discussion with the other judges. We send the rubric a week ahead.",
  },
  {
    q: "Can I speak online instead?",
    a: "Yes - online sessions have their own track. Propose one on the Share Your Knowledge page.",
  },
];

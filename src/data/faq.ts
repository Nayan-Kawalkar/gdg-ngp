/**
 * General FAQ the chatbot can fall back to when no intent matches (PRD 12).
 *
 * Answers here must be true of the chapter, not guesses - the bot shows them
 * verbatim. Keep dates and counts OUT of this file; anything that changes
 * belongs to an intent in lib/chat/intents.ts that reads the live data.
 */

export type SiteFaq = {
  q: string;
  a: string;
  /** Extra words people use for this question, to help matching. */
  tags?: string[];
  links?: { label: string; href: string }[];
};

export const siteFaqs: SiteFaq[] = [
  {
    q: "Do I need to be a Google employee or an expert to join?",
    a: "No. GDG Nagpur is a community of developers at every level - students, first-jobbers and seniors. Nobody here works for Google by default, and beginners are the point.",
    tags: ["beginner", "expert", "qualify", "eligible", "student", "fresher", "who can join"],
    links: [{ label: "Join the community", href: "/community" }],
  },
  {
    q: "Do I get a certificate for attending?",
    a: "Some events - study jams and bootcamps usually - give completion certificates. Volunteers get private certificate links from the organizers. Each event page says what it offers.",
    tags: ["certificate", "certification", "completion", "proof"],
    links: [{ label: "See events", href: "/events" }],
  },
  {
    q: "Can I volunteer?",
    a: "Yes - volunteers run registration, stage, photos and social on event days. Ask in Discord or email the organizers and say what you would like to help with.",
    tags: ["volunteer", "volunteering", "help out", "organize", "organising", "core team"],
    links: [{ label: "Meet the team", href: "/about" }],
  },
  {
    q: "Where do events happen?",
    a: "Mostly at colleges and venues around Nagpur, with some online editions. The venue is on every event card and detail page.",
    tags: ["venue", "location", "where", "address", "online", "offline"],
    links: [{ label: "See events", href: "/events" }],
  },
  {
    q: "Do I need to bring a laptop?",
    a: "For workshops, study jams and hackathons, yes - they are hands-on. For talks and fireside chats, no. The event page will say.",
    tags: ["laptop", "bring", "carry", "setup"],
  },
  {
    q: "Can my college host a GDG Nagpur event?",
    a: "Yes. We co-host study jams, workshops and roadshows with campuses across the region. Tell us about the idea through the collaborate form.",
    tags: ["college", "campus", "host", "university", "institute", "club"],
    links: [{ label: "Co-host with us", href: "/collaborate#partner" }],
  },
  {
    q: "Is GDG Nagpur part of Google?",
    a: "No. We are an independent, volunteer-run chapter in the Google Developer Groups programme. Google supports the programme, but this is not an official Google site.",
    tags: ["official", "google", "affiliated", "owned"],
  },
  {
    q: "How is my data used?",
    a: "Only to review what you send and reply to you. Nothing is sold or shared with sponsors.",
    tags: ["privacy", "data", "personal", "gdpr", "delete"],
    links: [{ label: "Privacy", href: "/privacy" }],
  },
];

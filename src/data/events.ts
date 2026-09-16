/**
 * Mock event data. Frontend-only for now - swap the export for a
 * CMS/Firestore read later without touching the components.
 */

export type EventFormat =
  | "DevFest"
  | "Build with AI"
  | "Study Jam"
  | "Bootcamp"
  | "Workshop"
  | "Roadshow"
  | "Fireside Chat";

export type EventStatus = "upcoming" | "ongoing" | "past";

export type AgendaItem = {
  time: string;
  title: string;
  detail?: string;
  /** Breaks, lunch and registration render quieter than sessions. */
  kind?: "session" | "break";
};

export type Speaker = {
  id: string;
  name: string;
  role: string;
  company: string;
  topic?: string;
  photo?: string;
  linkedin?: string;
};

export type Sponsor = {
  name: string;
  tier: "Platinum" | "Gold" | "Community" | "Venue";
  url?: string;
};

export type GdgEvent = {
  id: string;
  slug: string;
  title: string;
  format: EventFormat;
  status: EventStatus;
  /** ISO date - rendered through formatEventDate() */
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  city: string;
  summary: string;
  capacity: number;
  attended?: number;
  registerUrl?: string;
  recapUrl?: string;
  imageUrl?: string;
  accent: "blue" | "red" | "yellow" | "green";

  /* ---- Detail page. All optional: the page degrades section by section
     when a field is missing, so a thinly-described event still renders. ---- */
  description?: string[];
  takeaways?: string[];
  agenda?: AgendaItem[];
  speakers?: Speaker[];
  sponsors?: Sponsor[];
  /** Paths under /public/community for now - swap for real recap photos. */
  gallery?: string[];
  /** YouTube video id, not a full URL. */
  youtubeId?: string;
};

export const events: GdgEvent[] = [
  {
    id: "evt-001",
    slug: "build-with-ai-code-for-communities-2",
    title: "Build with AI: Code for Communities 2",
    format: "Build with AI",
    status: "upcoming",
    date: "2026-10-11",
    time: "10:00 AM - 5:00 PM IST",
    venue: "IIIT Nagpur, Butibori",
    city: "Nagpur",
    summary:
      "A full-day build sprint where teams ship a working Gemini-powered prototype for a real civic problem in Nagpur - and demo it to a panel the same evening.",
    capacity: 300,
    registerUrl: "#",
    accent: "blue",
    description: [
      "Code for Communities is the one day a year the chapter stops talking about AI and makes people build with it. Teams of up to four get a civic brief drawn from a real problem in Nagpur - waste collection routing, a municipal complaint tracker, accessibility of public transport information - and the whole day to ship something that runs.",
      "There is no prize pool and no pitch deck round. At 4pm every team demos a working prototype to a panel of engineers and two people who actually work on the problem. The ones worth continuing get mentors assigned and a slot at the next DevFest.",
    ],
    takeaways: [
      "A working Gemini-powered prototype you built, deployed and demoed the same day",
      "Hands-on time with the Gemini API, function calling and grounding",
      "Feedback from engineers and from the people the problem belongs to",
      "A team - most of the collaborations in this community start in this room",
    ],
    agenda: [
      { time: "10:00", title: "Doors, coffee, team forming", detail: "Come alone and leave with a team. We will help you find one.", kind: "break" },
      { time: "10:30", title: "Briefing and the problem set", detail: "Three civic briefs, how they were chosen, and what a good outcome looks like." },
      { time: "11:00", title: "Gemini API crash course", detail: "Function calling, grounding and structured output - the three things you will actually need today." },
      { time: "12:00", title: "Build block one", detail: "Mentors circulating. Ask early, ask often." },
      { time: "13:30", title: "Lunch", kind: "break" },
      { time: "14:15", title: "Build block two", detail: "Feature freeze is at 15:45. Plan backwards from it." },
      { time: "16:00", title: "Demos", detail: "Six minutes per team: two to show, four to answer." },
      { time: "17:00", title: "Panel notes and what happens next", detail: "Which prototypes get mentors, and how to keep going." },
    ],
    speakers: [
      { id: "sp-1", name: "Speaker to be announced", role: "Engineer", company: "TBA", topic: "Gemini API crash course", linkedin: "#" },
      { id: "sp-2", name: "Speaker to be announced", role: "Product", company: "TBA", topic: "Choosing a civic brief", linkedin: "#" },
      { id: "sp-3", name: "Saniya Imroze", role: "Organizer", company: "GDG Nagpur", topic: "Briefing and demos", linkedin: "#" },
    ],
    sponsors: [
      { name: "Google for Developers", tier: "Platinum", url: "#" },
      { name: "IIIT Nagpur", tier: "Venue", url: "#" },
      { name: "Women Techmakers", tier: "Community", url: "#" },
    ],
  },
  {
    id: "evt-002",
    slug: "flutter-forward-study-jam",
    title: "Flutter Forward Study Jam",
    format: "Study Jam",
    status: "upcoming",
    date: "2026-10-25",
    time: "11:00 AM - 3:00 PM IST",
    venue: "Symbiosis Institute, Wathoda",
    city: "Nagpur",
    summary:
      "Four hands-on hours on Flutter 4: adaptive layouts, impeller rendering and shipping one app to both stores by the end of the session.",
    capacity: 150,
    registerUrl: "#",
    accent: "green",
  },
  {
    id: "evt-003",
    slug: "cloud-next-extended-nagpur",
    title: "Cloud Next Extended Nagpur",
    format: "Roadshow",
    status: "ongoing",
    date: "2026-09-16",
    endDate: "2026-09-19",
    time: "6:00 PM - 8:00 PM IST daily",
    venue: "Online - YouTube Live",
    city: "Remote",
    summary:
      "A four-evening watch-and-build series unpacking the biggest Cloud Next announcements, with a local speaker translating each one into what it means for Indian startups.",
    capacity: 500,
    registerUrl: "#",
    accent: "yellow",
  },
  {
    id: "evt-004",
    slug: "devfest-nagpur-2025",
    title: "DevFest Nagpur 2025",
    format: "DevFest",
    status: "past",
    date: "2025-12-07",
    time: "9:00 AM - 6:00 PM IST",
    venue: "Hotel Centre Point, Ramdaspeth",
    city: "Nagpur",
    summary:
      "The chapter's flagship day: three tracks, 14 speakers, a 200-person hall and a hallway that did not empty until security asked us to leave.",
    capacity: 400,
    attended: 386,
    recapUrl: "#",
    accent: "red",
    description: [
      "DevFest is the chapter's flagship day and the one event that reliably pulls people in from outside Nagpur. 2025 ran three tracks - Android, Cloud and AI - across a 200-person main hall and two breakout rooms.",
      "The number the organizers were proudest of was not attendance. It was that 386 of 400 registrations actually turned up, on a Sunday, in December.",
    ],
    agenda: [
      { time: "09:00", title: "Registration and breakfast", kind: "break" },
      { time: "10:00", title: "Keynote: what shipped this year" },
      { time: "11:00", title: "Track sessions begin", detail: "Android, Cloud and AI running in parallel." },
      { time: "13:00", title: "Lunch and the hallway track", kind: "break" },
      { time: "14:00", title: "Afternoon sessions" },
      { time: "16:30", title: "Lightning talks", detail: "Ten community talks, five minutes each." },
      { time: "17:30", title: "Closing and swag" },
    ],
    speakers: [
      { id: "sp-d1", name: "Past speaker", role: "Android Engineer", company: "TBA", topic: "Compose in production", linkedin: "#" },
      { id: "sp-d2", name: "Past speaker", role: "Cloud Architect", company: "TBA", topic: "Cutting a cloud bill in half", linkedin: "#" },
      { id: "sp-d3", name: "Past speaker", role: "ML Engineer", company: "TBA", topic: "Small models, real products", linkedin: "#" },
      { id: "sp-d4", name: "Saniya Imroze", role: "Organizer", company: "GDG Nagpur", topic: "Keynote and closing", linkedin: "#" },
    ],
    sponsors: [
      { name: "Google for Developers", tier: "Platinum", url: "#" },
      { name: "Hotel Centre Point", tier: "Venue", url: "#" },
      { name: "Women Techmakers", tier: "Community", url: "#" },
      { name: "Local Tech Partner", tier: "Gold", url: "#" },
    ],
    gallery: [
      "/community/community-02.jpg",
      "/community/community-05.jpg",
      "/community/community-07.jpg",
      "/community/community-11.jpg",
    ],
    // TODO(recap): replace with the real DevFest recording id before launch.
    youtubeId: "REPLACE_WITH_REAL_ID",
  },
  {
    id: "evt-005",
    slug: "android-compose-camp",
    title: "Android Compose Camp",
    format: "Bootcamp",
    status: "past",
    date: "2025-09-20",
    time: "10:00 AM - 4:00 PM IST",
    venue: "RCOEM, Ramdeo Tekdi",
    city: "Nagpur",
    summary:
      "A six-week Compose cohort compressed into one Saturday, ending with every participant publishing a working app to an internal test track.",
    capacity: 120,
    attended: 118,
    recapUrl: "#",
    accent: "green",
  },
  {
    id: "evt-007",
    slug: "devfest-nagpur-2024",
    title: "DevFest Nagpur 2024",
    format: "DevFest",
    status: "past",
    date: "2024-11-30",
    time: "9:30 AM - 6:00 PM IST",
    venue: "Hotel Tuli Imperial, Ramdaspeth",
    city: "Nagpur",
    summary:
      "Two tracks, a hardware corner nobody expected to be this busy, and the first year the chapter had to close registrations early.",
    capacity: 350,
    attended: 341,
    recapUrl: "#",
    accent: "blue",
  },
  {
    id: "evt-008",
    slug: "women-techmakers-iwd",
    title: "Women Techmakers: IWD Nagpur",
    format: "Workshop",
    status: "past",
    date: "2024-03-09",
    time: "10:00 AM - 4:00 PM IST",
    venue: "VNIT Nagpur, South Ambazari Road",
    city: "Nagpur",
    summary:
      "A day of workshops and a panel that ran forty minutes over because nobody in the room wanted it to end.",
    capacity: 200,
    attended: 193,
    recapUrl: "#",
    accent: "red",
  },
  {
    id: "evt-009",
    slug: "cloud-study-jam-series",
    title: "Google Cloud Study Jam Series",
    format: "Study Jam",
    status: "past",
    date: "2024-08-03",
    endDate: "2024-08-24",
    time: "Saturdays, 11:00 AM - 2:00 PM IST",
    venue: "IIIT Nagpur, Butibori",
    city: "Nagpur",
    summary:
      "Four consecutive Saturdays working through the Cloud skill badges together, ending with 60 participants certified.",
    capacity: 100,
    attended: 96,
    recapUrl: "#",
    accent: "yellow",
  },
  {
    id: "evt-010",
    slug: "kotlin-multiplatform-workshop",
    title: "Kotlin Multiplatform Workshop",
    format: "Workshop",
    status: "past",
    date: "2025-02-15",
    time: "10:00 AM - 3:00 PM IST",
    venue: "91Springboard, Wardha Road",
    city: "Nagpur",
    summary:
      "One codebase, two platforms, five hours. Everyone left with the same app running on an Android phone and an iPad.",
    capacity: 80,
    attended: 74,
    recapUrl: "#",
    accent: "green",
  },
  {
    id: "evt-006",
    slug: "fireside-building-in-public",
    title: "Fireside: Building in Public",
    format: "Fireside Chat",
    status: "past",
    date: "2025-07-12",
    time: "7:00 PM - 8:30 PM IST",
    venue: "91Springboard, Wardha Road",
    city: "Nagpur",
    summary:
      "An unscripted evening with three founders on what they got wrong shipping their first product, and what building in public actually costs.",
    capacity: 90,
    attended: 84,
    recapUrl: "#",
    accent: "yellow",
  },
];

export function getEventBySlug(slug: string): GdgEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return events.map((e) => e.slug);
}

/** Same format first, then nearest by date - for the "more like this" row. */
export function getRelatedEvents(event: GdgEvent, limit = 3): GdgEvent[] {
  return events
    .filter((e) => e.id !== event.id)
    .sort((a, b) => {
      const sameFormat = Number(b.format === event.format) - Number(a.format === event.format);
      if (sameFormat !== 0) return sameFormat;
      const da = Math.abs(Date.parse(a.date) - Date.parse(event.date));
      const db = Math.abs(Date.parse(b.date) - Date.parse(event.date));
      return da - db;
    })
    .slice(0, limit);
}

/** Every format actually present in the data, in a stable display order. */
export const eventFormats: EventFormat[] = [
  "DevFest",
  "Build with AI",
  "Study Jam",
  "Bootcamp",
  "Workshop",
  "Roadshow",
  "Fireside Chat",
];

/** URL-safe slug for a format, so filters can live in the query string. */
export function formatSlug(format: EventFormat): string {
  return format.toLowerCase().replace(/\s+/g, "-");
}

export function formatFromSlug(slug: string): EventFormat | undefined {
  return eventFormats.find((f) => formatSlug(f) === slug);
}

export type EventQuery = {
  status?: EventStatus | "all";
  formats?: EventFormat[];
  sort?: "newest" | "oldest";
};

/**
 * The directory's single filter+sort entry point. Status and format narrow the
 * set; sort orders it. Kept here rather than in the component so the About page,
 * the directory and any future feed all agree on what "newest" means.
 */
export function queryEvents({
  status = "all",
  formats = [],
  sort = "newest",
}: EventQuery = {}): GdgEvent[] {
  let list = status === "all" ? [...events] : events.filter((e) => e.status === status);
  if (formats.length) list = list.filter((e) => formats.includes(e.format));

  return list.sort((a, b) =>
    sort === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
  );
}

/** Live counts for the directory hero - never hardcode these. */
export function eventCounts() {
  return {
    total: events.length,
    past: events.filter((e) => e.status === "past").length,
    ongoing: events.filter((e) => e.status === "ongoing").length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
  };
}

/** Newest first within a status - what a curated grid should show. */
export function getEventsByStatus(status: EventStatus | "all"): GdgEvent[] {
  const list = status === "all" ? events : events.filter((e) => e.status === status);
  const rank: Record<EventStatus, number> = { ongoing: 0, upcoming: 1, past: 2 };
  return [...list].sort((a, b) => {
    const byStatus = rank[a.status] - rank[b.status];
    if (byStatus !== 0) return byStatus;
    // Upcoming reads soonest-first; past reads most-recent-first.
    return a.status === "past" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
  });
}

/** Events to surface on the home page: ongoing first, then soonest upcoming. */
export function getFeaturedEvents(limit = 3): GdgEvent[] {
  const rank: Record<EventStatus, number> = { ongoing: 0, upcoming: 1, past: 2 };
  return [...events]
    .filter((event) => event.status !== "past")
    .sort((a, b) => {
      const byStatus = rank[a.status] - rank[b.status];
      if (byStatus !== 0) return byStatus;
      return a.date.localeCompare(b.date);
    })
    .slice(0, limit);
}

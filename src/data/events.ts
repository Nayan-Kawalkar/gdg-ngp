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

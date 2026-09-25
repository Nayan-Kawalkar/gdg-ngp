/**
 * DevFest Nagpur 2026 - content for /devfest.
 *
 * Copy is from Devfest/Website temp content .md. The visual design follows
 * Devfest/website template.jpeg, so a few template-only touches (the
 * hand-written "Nagpur On a Higher Trajectory" note, the passport-stamp
 * wording on buttons) live here too.
 *
 * TODO(devfest): entries marked PLACEHOLDER need real values before launch.
 */

export type RouteColor = "blue" | "green" | "red" | "yellow" | "orange";

export const devfestMeta = {
  title: "DevFest Nagpur 2026 - From Nagpur, For What's Next",
  description:
    "12 & 13 December. One passport, five routes, one full day of talks, codelabs, a build challenge, hiring booths and 1,600 people who build things. Passes from ₹599.",
};

export const devfestLinks = {
  passes: "#", // PLACEHOLDER - ticketing / registration link
  partnershipDeck: "#", // PLACEHOLDER - partnership deck PDF
  talkToUs: "/collaborate#sponsor",
  applyToSpeak: "/speak",
  applyToJudge: "/speak#judge",
};

/** Header navigation - in-page anchors, in the template's order. */
export const devfestNav = [
  { label: "Home", href: "#top", id: "top" },
  { label: "About", href: "#about", id: "about" },
  { label: "Routes", href: "#routes", id: "routes" },
  { label: "Check-in", href: "#check-in", id: "check-in" },
  { label: "Speakers", href: "#speakers", id: "speakers" },
  { label: "Partners", href: "#partners", id: "partners" },
  { label: "FAQ", href: "#faq", id: "faq" },
] as const;

/* --------------------------------- 1. Hero --------------------------------- */

export const devfestHero = {
  eyebrow: "Nagpur, India · 12 & 13 December 2026",
  title: "From Nagpur, For What's Next",
  sub: "DevFest is back, and this year the day runs like a journey. You check in, collect your passport, pick a route and spend two days building things, learning from people who have already built them, and meeting the rest of Nagpur's tech community in one room. Come as a student, a working engineer, a founder or someone who is just curious - there is a route for all of you.",
  primary: { label: "Get your pass", href: "#passes" },
  secondary: { label: "See what's on", href: "#schedule" },
  /** Template-only flourish, set in the hand-written face. */
  note: ["Nagpur", "On a Higher", "Trajectory"],
};

/**
 * The event window, in Nagpur time. Drives the departures-board countdown
 * (to the start of 12 December) and its status once the event is on or over.
 */
export const devfestDates = {
  start: "2026-12-12T00:00:00+05:30",
  end: "2026-12-14T00:00:00+05:30",
};

export const boardingStrip = [
  "Boarding soon",
  "12 & 13 December",
  "Venue announced shortly",
  "Passes open now",
];

export const devfestTopics = [
  "Generative AI",
  "Agents",
  "Android",
  "Flutter",
  "Google Cloud",
  "Firebase",
  "Gemini",
  "Kotlin",
  "Open Source",
  "Design Systems",
  "Startups",
  "Career Growth",
];

/** The template's stats strip, filled with the content's stat trio plus the dates. */
export const devfestStats = [
  { id: "people", value: 1600, prefix: "", suffix: "", label: "Expected this year", icon: "people" },
  { id: "routes", value: 5, prefix: "", suffix: "", label: "Routes to choose from", icon: "routes" },
  { id: "days", value: 2, prefix: "", suffix: "", label: "Days, 12 & 13 December", icon: "calendar" },
  { id: "price", value: 599, prefix: "₹", suffix: "", label: "Where passes start", icon: "ticket" },
] as const;

/* -------------------------------- 2. Theme --------------------------------- */

export const devfestTheme = {
  eyebrow: "The theme",
  title: "One passport, five routes, one very full day.",
  sub: "Nagpur has always been a junction. It sits at the centre of India, which is why MIHAN was built here, and why everything in this country seems to pass through at some point. A junction is where journeys meet, and that is exactly how this DevFest is built: five routes, a set of gates, and one passport that carries you through all of it.",
  steps: [
    {
      n: "01",
      title: "Check in",
      body: "Walk in, give your name, and collect your DevFest Passport and badge. That is the whole entry process. Nothing to print, nothing to prepare.",
    },
    {
      n: "02",
      title: "Pick a route",
      body: "Explore, Learn, Build, Connect or Celebrate. Each one is colour-coded and each one leads somewhere different. You can commit to one or move between all five.",
    },
    {
      n: "03",
      title: "Collect stamps",
      body: "Every session, codelab, demo, challenge and community activity you take part in earns a stamp. The passport slowly turns into a record of how you spent the day.",
    },
    {
      n: "04",
      title: "Take off",
      body: "Fill all five routes and you are in the lucky draw at Final Call, where the day closes with prizes, the best ideas from the Seed Wall, and the whole room together one last time.",
    },
  ],
  pull: "You arrive with a passport, explore different routes, collect experiences along the way, and leave ready for your next destination.",
};

/* -------------------------------- 3. Routes -------------------------------- */

export const devfestRoutesIntro = {
  eyebrow: "Five routes",
  title: "Pick what you want out of the day.",
  sub: "No fixed track, no wrong choice. Every route starts at The Runway and opens into a different part of the day. Follow one colour from morning to evening, or hop between all five and collect the full set.",
};

export type Route = {
  id: "explore" | "learn" | "build" | "connect" | "celebrate";
  name: string;
  /** Second line on the route card - a short summary of `body`. */
  tagline: string;
  color: RouteColor;
  body: string;
  zones: string[];
};

export const devfestRoutes: Route[] = [
  {
    id: "explore",
    name: "Explore",
    tagline: "Demos & new startups",
    color: "blue",
    body: "New tools, live demos and stalls from startups you have not heard of yet. The route for anyone who wants to see what is being built before everyone else catches on.",
    zones: ["The Concourse", "Test Flight"],
  },
  {
    id: "learn",
    name: "Learn",
    tagline: "Talks & codelabs",
    color: "green",
    body: "Keynotes, tech talks and hands-on codelabs where you follow along on your own laptop. Sessions are pitched from beginner to deep-end, so first-timers are not left behind.",
    zones: ["The Runway", "Gate 1A / 1B"],
  },
  {
    id: "build",
    name: "Build",
    tagline: "The build challenge",
    color: "red",
    body: "A day-long build challenge on real problems from Nagpur. Come with a team or find one on the spot. You will leave with something that runs, and possibly a prize.",
    zones: ["The Hangar"],
  },
  {
    id: "connect",
    name: "Connect",
    tagline: "Hiring, mentors & chai",
    color: "yellow",
    body: "Hiring booths, mentors, chai and lunch. The route where most of the useful conversations happen - half the people you meet here become the people you work with next year.",
    zones: ["Check-in", "The Canopy Lounge", "Connecting Flights", "Chai Café", "Food Court"],
  },
  {
    id: "celebrate",
    name: "Celebrate",
    tagline: "Swag, music & the draw",
    color: "orange",
    body: "Swag, selfies, ideas pinned on a wall, music and the closing draw. Because a day this long deserves a proper ending.",
    zones: ["Zest", "Duty Free", "The Seed Wall", "Final Call"],
  },
];

/* --------------------------- Check-in (web only) --------------------------- */

/**
 * The self check-in kiosk that prints a souvenir boarding pass. Not in the
 * content file - it is the website's own take on step 01, "Check in", so the
 * copy here is ours. The pass says "souvenir, not a ticket" on its face.
 */
export const devfestCheckIn = {
  eyebrow: "Self check-in",
  title: "Print your boarding pass.",
  sub: "Type your name, pick your route and cabin, and take home a DevFest Nagpur 2026 boarding pass to post. It is a souvenir, not a ticket - real passes are further down.",
  bonus: "Collect all five route stamps and your pass gets a bonus stamp.",
  bonusDone: "Passport complete: your pass carries the 5/5 stamp.",
  shareText: "Flying NAG → NEXT at DevFest Nagpur 2026 - 12 & 13 December.",
};

/* --------------------------------- 4. Map ---------------------------------- */

export const devfestMapIntro = {
  eyebrow: "The map",
  title: "Fourteen gates, one terminal, and a map you'll actually use.",
  sub: "Every space has a name and sits on a route, so you always know where you are and what is happening next. Signage is everywhere and volunteers are easy to spot - nobody gets lost here.",
};

export const devfestZones: { name: string; what: string; route: Route["id"] }[] = [
  { name: "Check-in", what: "Registration, passport and badge", route: "connect" },
  { name: "The Runway", what: "Main stage, every route starts here", route: "learn" },
  { name: "Gate 1A / 1B", what: "Hands-on codelabs and workshops", route: "learn" },
  { name: "The Concourse", what: "Tech stalls and product demos", route: "explore" },
  { name: "Test Flight", what: "Startups showing what they are building", route: "explore" },
  { name: "The Hangar", what: "The build challenge", route: "build" },
  { name: "The Canopy Lounge", what: "Community lounge, mentors and quiet conversations", route: "connect" },
  { name: "Connecting Flights", what: "Job booths, resume drops, open roles", route: "connect" },
  { name: "Chai Café", what: "Breaks, chai and the best hallway chats", route: "connect" },
  { name: "Food Court", what: "Lunch", route: "connect" },
  { name: "Zest", what: "Selfie booths, games and photo walls", route: "celebrate" },
  { name: "Duty Free", what: "Swag stalls and merch", route: "celebrate" },
  { name: "The Seed Wall", what: "The idea wall", route: "celebrate" },
  { name: "Final Call", what: "Closing session, prizes and the lucky draw", route: "celebrate" },
];

/* -------------------------------- 5. Passes -------------------------------- */

export const devfestPassesIntro = {
  eyebrow: "Passes",
  title: "Two ways to fly.",
  sub: "Both passes cover the full event, food included. The difference is access to the parts of the day that have a fixed number of seats. The ₹599 pass is capped and usually closes well before the date.",
  note: "Student and group rates are available. Write to us before you book.",
  cta: "Book your pass",
};

export const devfestPasses = [
  {
    id: "first",
    name: "First Class",
    price: "₹599",
    badge: "Limited seats",
    tagline: "Your seat on the day Nagpur points to what's next.",
    perks: [
      "Full-day entry across both days, plus your DevFest Passport",
      "Every keynote, tech talk, panel and lightning talk at The Runway",
      "Tech stalls, startup demos and all the community zones",
      "Lunch, chai and snacks through the day",
      "Entry into the Final Call lucky draw",
    ],
  },
  {
    id: "business",
    name: "Business Class",
    price: "₹1699",
    badge: "",
    tagline: "For the ones who don't just take the route - they build it.",
    perks: [
      "Everything in First Class, plus the parts that fill up first",
      "Both hands-on codelabs at Gate 1A / 1B, where you leave with something working",
      "Entry to the build challenge at The Hangar, prizes included",
      "Reserved seating for the main sessions, so you are not standing at the back",
      "The Canopy Lounge, where speakers and mentors sit between sessions",
      "Priority at the Connecting Flights hiring booths",
      "The DevFest swag kit",
    ],
  },
];

/* ------------------------------- 6. The day ------------------------------- */

export const devfestScheduleIntro = {
  eyebrow: "What's on",
  title: "Two days, and neither is a filler day.",
  sub: "The first day warms the room up. The second is the full thing, open from morning to Final Call.",
};

export const devfestDays = [
  {
    label: "Pre-day",
    date: "12 December",
    day: "12",
    month: "Dec",
    body: "The community mixer, where you meet people before the crowd arrives. Two workshops - AI in Cloud, and Getting Projects Ready - plus a community lounge running sessions that are not about code at all: LinkedIn, resumes, and how to grow once you have the skills. The opening keynote sets up the weekend, and live music closes the evening.",
  },
  {
    label: "Main day",
    date: "13 December",
    day: "13",
    month: "Dec",
    body: "Keynotes, tech talks, panels and lightning talks at The Runway. Codelabs running in parallel at Gate 1A / 1B. The build challenge going all day at The Hangar. Women in Tech sessions with mentorship and their own challenge. Stalls, demos, food and fun zones open throughout. Final Call brings everyone back together for prizes, the Seed Wall ideas and the draw.",
  },
];

/* ------------------------------- 7. Why come ------------------------------- */

export const devfestWhyIntro = {
  eyebrow: "Why come",
  title: "Five reasons this is worth your December weekend.",
  sub: "This is not a conference you sit through. The whole day is designed so you leave with more than a tote bag.",
};

export const devfestReasons = [
  {
    n: "01",
    title: "You leave with something running",
    body: "Codelabs and the build challenge are hands-on. Laptops open, code on screen, mentors walking the room. You do the work here, not in a video you promise yourself you'll watch later.",
    icon: "code",
  },
  {
    n: "02",
    title: "The problems are from your own city",
    body: "Build challenge statements come from Nagpur - local businesses, farmers, civic issues and colleges. What you build has somewhere real to go.",
    icon: "pin",
  },
  {
    n: "03",
    title: "The people are the point",
    body: "1,600 developers, students, founders, designers and hiring managers in one building. Come alone if you have to; nobody leaves alone.",
    icon: "people",
  },
  {
    n: "04",
    title: "Hiring happens in the room",
    body: "Connecting Flights is a full zone of job booths, resume drops and open roles, with the people who make the decisions standing right there.",
    icon: "briefcase",
  },
  {
    n: "05",
    title: "It is a festival, not a seminar",
    body: "Food, music, swag, photo walls, prizes and a closing that nobody sneaks out of early. You will want the day to be longer.",
    icon: "spark",
  },
] as const;

/* ------------------------------- 8. On board ------------------------------- */

export const devfestOnBoardIntro = {
  eyebrow: "On board",
  title: "The small things that tie the day together.",
  sub: "One passport, a few touches running from the moment you walk in to the moment the draw is called.",
};

export const devfestOnBoard = [
  {
    title: "Your boarding pass badge",
    body: "Reads NAG → NEXT · Flight DF26, with one stamp spot for each route. It is the souvenir most people keep.",
    icon: "badge",
  },
  {
    title: "The departures board",
    body: "Screens across the venue show sessions the way a terminal shows flights: time, session, gate and whether seats are still open.",
    icon: "board",
  },
  {
    title: "The Runway selfie wall",
    body: "A photo wall at Zest reading NAG → WHAT'S NEXT, and the spot the whole community ends up posting from.",
    icon: "camera",
  },
  {
    title: "The Seed Wall",
    body: "One question on seed-shaped notes: what should Nagpur build next? The best answers get read out at Final Call.",
    icon: "seed",
  },
  {
    title: "Build for Nagpur",
    body: "Challenge problems taken straight from the city, so the day's work is worth continuing on Monday.",
    icon: "build",
  },
  {
    title: "Passport stamps",
    body: "Collect them across all five routes and you are in the draw. The fastest way to see parts of the event you would otherwise skip.",
    icon: "stamp",
  },
] as const;

/* -------------------------------- 9. Speak --------------------------------- */

export const devfestSpeak = {
  eyebrow: "Take the stage",
  title: "The Runway is open for speakers.",
  sub: "Talks, lightning talks and codelabs. You do not need a big title or a conference history - if you have built something worth explaining, we want to hear it. First-time speakers get help shaping the talk and a rehearsal before the day.",
  primary: "Apply to speak",
  secondary: "Apply to judge",
};

/**
 * The template's four speaker cards. No speakers are announced yet, so each
 * card is an open slot (formats and rooms from the content) that links to the
 * application. TODO(devfest): swap in real speakers as they are confirmed.
 */
export const devfestSpeakerSlots = [
  { format: "Keynote", room: "The Runway" },
  { format: "Tech talk", room: "The Runway" },
  { format: "Codelab", room: "Gate 1A / 1B" },
  { format: "Lightning talk", room: "The Runway" },
];

/* ------------------------------- 10. Last year ------------------------------ */

export const devfestLastYear = {
  eyebrow: "Where we're coming from",
  title: "500+ people did this last year and still talk about it.",
  sub: "Every photo here is from a DevFest Nagpur event. Not a stock image in the set. This year the room is three times the size.",
  stats: [
    { value: "20+", label: "Speakers" },
    { value: "500+", label: "Participants" },
    { value: "15+", label: "Sessions" },
    { value: "4+", label: "Workshops" },
  ],
  /**
   * PLACEHOLDER - these are GDG Nagpur photos from a Build with AI event, not
   * DevFest. The copy above promises DevFest photos: swap in real ones.
   */
  gallery: [
    "/community/community-01.jpg",
    "/community/community-05.jpg",
    "/community/community-09.jpg",
    "/community/community-03.jpg",
    "/community/community-07.jpg",
    "/community/community-11.jpg",
  ],
};

/* -------------------------------- 11. Partner ------------------------------- */

export const devfestPartner = {
  eyebrow: "Partner with us",
  title: "Put your name on a gate.",
  sub: "DevFest is community-run, and partners are what keep it affordable for everyone who walks in. There is a way in at every budget - a title partnership, a named gate, a stall for a two-person startup, a food counter, a hiring booth, or swag and services in kind.",
  options: [
    { title: "Partnership tiers", from: "₹25,000", icon: "tiers" },
    { title: "Sponsor a gate", from: "₹10,000", icon: "gate" },
    { title: "A stall for every size", from: "₹5,000", icon: "stall" },
    { title: "Hire at Connecting Flights", from: "₹8,000", icon: "briefcase" },
  ],
  primary: "Download the partnership deck",
  secondary: "Talk to us",
};

/* ------------------------------- 12. Community ------------------------------ */

export const devfestCommunity = {
  eyebrow: "Community",
  title: "The chat doesn't close when the day does.",
  sub: "All three rooms are free and open, before and after DevFest. Most people join WhatsApp for the announcements and end up living in Discord.",
  channels: [
    { id: "discord", name: "Discord", handle: "gdg-nagpur", body: "Daily chatter, help channels and team-finding for the build challenge." },
    { id: "whatsapp", name: "WhatsApp", handle: "DevFest announcements", body: "Pass drops, deadlines and last-minute updates." },
    { id: "x", name: "X", handle: "@gdgnagpur", body: "Live threads from the day and speaker announcements." },
  ],
} as const;

/* -------------------------------- 13. Notify -------------------------------- */

export const devfestNotify = {
  title: "Get told the moment passes drop.",
  sub: "One email when First Class opens, one when it is nearly gone. Nothing else, ever.",
  cta: "Notify me",
};

/* ---------------------------------- 14. FAQ --------------------------------- */

export const devfestFaqs = [
  {
    q: "Do I need to be a developer?",
    a: "No. Students, designers, founders, marketers and people switching careers all fit. Roughly a quarter of the room is students and a quarter is people who do not write code full-time.",
  },
  { q: "Is the pass for both days?", a: "Yes. One pass covers the pre-day and the main day." },
  { q: "Is food included?", a: "Yes, lunch, chai and snacks on both passes." },
  {
    q: "I'm coming alone. Is that awkward?",
    a: "It is the most common way people come. Check-in, the Canopy Lounge and the build challenge are all built for finding your people.",
  },
  {
    q: "Can I switch routes during the day?",
    a: "Yes, as often as you like. The passport is designed for exactly that.",
  },
  { q: "Do I need a laptop?", a: "Only for codelabs and the build challenge. Everything else is walk-in." },
  {
    q: "Refunds?",
    a: "Passes are non-refundable but transferable. Write to us before the event and we will move it to whoever is taking your place.",
  },
];

/**
 * The chatbot's intent table (PRD 12).
 *
 * Every reply is BUILT FROM THE SAME DATA MODULES THE PAGES RENDER, so the bot
 * can never quote a date, count or link the site does not show. Adding an
 * event to data/events.ts updates "when's the next event?" automatically.
 *
 * Matching (see answer.ts): each intent lists `phrases` (substring match on
 * the normalized question, worth 3) and `words` (whole-token match, worth 1).
 * Highest score wins; ties go to whichever intent is listed first, so more
 * specific intents sit above the general ones they overlap with.
 */

import {
  eventCounts,
  eventFormats,
  formatSlug,
  getEventsByStatus,
  getFeaturedEvents,
  type GdgEvent,
} from "@/data/events";
import { mentorStats } from "@/data/mentors";
import { nagpurJobs, opportunityCounts } from "@/data/opportunities";
import { latestNews } from "@/data/news";
import { communityChannels, site } from "@/data/site";
import { organizer } from "@/data/home";
import { formatEventDate, formatEventDateLong } from "@/lib/format";

export type ChatLink = { label: string; href: string };
export type ChatReply = { text: string; links?: ChatLink[] };

export type Intent = {
  id: string;
  phrases?: string[];
  words?: string[];
  reply: (question: string) => ChatReply;
};

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** "Title - Sun, 25 October 2026, 11:00 AM, at Venue." Ongoing events skip the
 *  date: callers already say "Happening now". */
function describe(event: GdgEvent): string {
  const date = event.status === "ongoing" ? "" : `${formatEventDateLong(event)}, `;
  return `${event.title} - ${date}${event.time}, at ${event.venue}.`;
}

const channelLinks: ChatLink[] = communityChannels.map((c) => ({
  label: `Join ${c.name}`,
  href: c.href,
}));

export const intents: Intent[] = [
  {
    id: "greeting",
    words: ["hi", "hello", "hey", "namaste", "yo", "hii"],
    reply: () => ({
      text: "Hi! I can answer questions about GDG Nagpur's events, mentorship, opportunities and how to get involved. What would you like to know?",
    }),
  },
  {
    id: "become-mentor",
    phrases: ["become a mentor", "be a mentor", "apply to mentor", "want to mentor", "mentor application", "apply as mentor"],
    reply: () => ({
      text: "Great - mentors are working engineers, designers and product people who give an hour now and then. Apply with your role, LinkedIn and areas of expertise. The organizers review every application, and approved mentors go live on the directory with the GDG Nagpur Mentor badge.",
      links: [{ label: "Apply to mentor", href: "/mentorship/become-a-mentor" }],
    }),
  },
  {
    id: "find-mentor",
    phrases: ["find a mentor", "need a mentor", "get a mentor"],
    words: ["mentor", "mentors", "mentorship", "guidance", "mentoring"],
    reply: () => {
      const { total, areas } = mentorStats();
      return {
        text: `Mentorship is free. There are ${plural(total, "mentor")} in the directory covering ${plural(areas, "area")} - frontend, backend, ML, cloud, design, careers and more. Filter by what you need and send a request.`,
        links: [{ label: "Browse mentors", href: "/mentorship" }],
      };
    },
  },
  {
    id: "share-opportunity",
    phrases: ["post a job", "share a job", "share an opportunity", "post an opportunity", "list a job", "we are hiring", "we're hiring", "i am hiring", "post internship"],
    reply: () => ({
      text: "You can share a job, internship, scholarship or a 1:1 help request through one form. Everything is reviewed before it goes live, and the listing credits you by name.",
      links: [{ label: "Share an opportunity", href: "/opportunities/share" }],
    }),
  },
  {
    id: "jobs-nagpur",
    phrases: ["jobs in nagpur", "job in nagpur", "nagpur job", "work in nagpur"],
    words: ["job", "jobs", "hiring", "vacancy", "vacancies", "opening", "openings", "placement"],
    reply: () => {
      const jobs = nagpurJobs();
      const latest = jobs[0];
      return {
        text: jobs.length
          ? `There ${jobs.length === 1 ? "is" : "are"} ${plural(jobs.length, "open job or internship", "open jobs and internships")} in Nagpur right now, each credited to the person who shared it.${latest ? ` Newest: ${latest.title} at ${latest.company}.` : ""}`
          : "No Nagpur listings are open right now - new ones are posted every week.",
        links: [
          { label: "Jobs in Nagpur", href: "/jobs-in-nagpur" },
          { label: "All opportunities", href: "/opportunities" },
        ],
      };
    },
  },
  {
    id: "opportunities",
    words: ["internship", "internships", "scholarship", "scholarships", "opportunity", "opportunities", "stipend", "fellowship"],
    reply: () => {
      const c = opportunityCounts();
      const parts = [
        c.jobs && plural(c.jobs, "job"),
        c.internships && plural(c.internships, "internship"),
        c.scholarships && plural(c.scholarships, "scholarship"),
        c.help && plural(c.help, "help request"),
      ].filter(Boolean) as string[];
      const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
      return {
        text: list
          ? `The opportunity board currently has ${list}. Every listing is reviewed and credits whoever shared it.`
          : "The opportunity board is empty right now - listings go up as the community shares them.",
        links: [
          { label: "Internships", href: "/opportunities?type=internship" },
          { label: "Scholarships", href: "/opportunities?type=scholarship" },
        ],
      };
    },
  },
  {
    id: "help-request",
    phrases: ["need help", "help with", "i am stuck", "i'm stuck", "1:1", "one on one", "1 on 1"],
    words: ["stuck", "doubt", "debug"],
    reply: () => ({
      text: "Two good routes: post a 1:1 help request on the opportunity board so someone from the community can pick it up, or ask a mentor directly. For quick questions, Discord is fastest.",
      links: [
        { label: "Ask for 1:1 help", href: "/opportunities/share" },
        { label: "Find a mentor", href: "/mentorship" },
      ],
    }),
  },
  {
    id: "judge",
    words: ["judge", "judging", "jury"],
    reply: () => ({
      text: "Judges usually give one afternoon at a hackathon: a briefing, short team demos, and a scoring discussion. Apply with your areas of expertise and availability - we send the rubric a week ahead.",
      links: [{ label: "Apply to judge", href: "/speak#judge" }],
    }),
  },
  {
    id: "speak",
    phrases: ["give a talk", "apply to speak", "be a speaker", "call for speakers", "cfp"],
    words: ["speak", "speaker", "speaking", "talk", "present", "presentation"],
    reply: () => ({
      text: "We are always looking for speakers - roadshows, bootcamps, study jams, workshops and fireside chats. First-timers are welcome and get paired with an experienced speaker for a dry run.",
      links: [{ label: "Apply to speak", href: "/speak" }],
    }),
  },
  {
    id: "sponsor",
    phrases: ["co-host", "co host", "partner with"],
    words: ["sponsor", "sponsorship", "sponsoring", "partner", "partnership", "collaborate", "collaboration", "cohost"],
    reply: () => ({
      text: "Companies can sponsor an event (Community, Gold or Platinum - scoped per event, in-kind welcome), and colleges or communities can co-host one. Send an enquiry and an organizer sets up a call.",
      links: [
        { label: "Sponsor an event", href: "/collaborate#sponsor" },
        { label: "Co-host with us", href: "/collaborate#partner" },
      ],
    }),
  },
  {
    id: "content",
    phrases: ["online session", "youtube live", "share knowledge", "make a video"],
    words: ["reel", "reels", "video", "videos", "youtube", "live", "content", "record"],
    reply: () => ({
      text: "You can submit a tech reel or video for us to reshare with credit, propose an online session, or join one of the monthly YouTube Lives as a guest.",
      links: [{ label: "Share your knowledge", href: "/share-your-knowledge" }],
    }),
  },
  {
    id: "past-events",
    phrases: ["past event", "previous event", "last event"],
    words: ["recap", "recaps", "recording", "photos", "past"],
    reply: () => {
      const past = getEventsByStatus("past");
      const last = past[0];
      return {
        text: `The chapter has run ${plural(past.length, "event")} listed on the site so far.${last ? ` Most recent: ${last.title} (${formatEventDate(last)}).` : ""} Past event pages have the recap, photos and recordings where we have them.`,
        links: [
          ...(last ? [{ label: last.title, href: `/events/${last.slug}` }] : []),
          { label: "All past events", href: "/events?status=past" },
        ],
      };
    },
  },
  {
    id: "event-format",
    // Naming a format is more specific than "when's the next...", so formats
    // are phrases (worth 3) and outscore the generic next-event intent.
    phrases: ["devfest", "bootcamp", "workshop", "roadshow", "fireside", "hackathon", "build with ai", "study jam"],
    reply: (question) => {
      const q = question.toLowerCase();
      const format =
        eventFormats.find((f) => q.includes(f.toLowerCase())) ??
        (q.includes("hackathon") ? "Build with AI" : undefined) ??
        eventFormats.find((f) => q.includes(f.toLowerCase().split(" ")[0]));
      if (!format) return nextEventReply();
      const list = getEventsByStatus("all").filter((e) => e.format === format);
      const upcoming = list.find((e) => e.status !== "past");
      const text = upcoming
        ? `${upcoming.status === "ongoing" ? `A ${format} is happening now` : `Next ${format}`}: ${describe(upcoming)}`
        : list.length
          ? `No ${format} is scheduled right now. The last one was ${list[0].title} (${formatEventDate(list[0])}).`
          : `We have not listed a ${format} yet - join WhatsApp to hear when one is announced.`;
      return {
        text,
        links: [
          ...(upcoming ? [{ label: upcoming.status === "past" ? "View recap" : "Details & registration", href: `/events/${upcoming.slug}` }] : []),
          { label: `All ${format} events`, href: `/events?format=${formatSlug(format)}` },
        ],
      };
    },
  },
  {
    id: "next-event",
    phrases: ["next event", "upcoming event", "coming up", "next meetup"],
    words: ["event", "events", "meetup", "upcoming", "register", "registration", "schedule", "when"],
    reply: () => nextEventReply(),
  },
  {
    id: "cost",
    words: ["free", "cost", "costs", "price", "fee", "fees", "paid", "pay", "charge", "ticket", "tickets"],
    reply: () => ({
      text: "Everything is free - events, mentorship and the opportunity board. No tickets, no paywall. If anyone asks you for money in GDG Nagpur's name, tell the organizers.",
    }),
  },
  {
    id: "community",
    phrases: ["join the community", "how do i join", "how to join", "whatsapp group"],
    words: ["join", "discord", "whatsapp", "community", "group", "twitter", "member", "membership", "signup"],
    reply: () => ({
      text: "The community lives in three places, all free: WhatsApp for announcements, Discord for conversation and help, and X for live event threads. Most people start with WhatsApp.",
      links: channelLinks,
    }),
  },
  {
    id: "contact",
    phrases: ["talk to a human", "talk to someone", "real person", "contact you", "get in touch"],
    words: ["contact", "email", "mail", "organizer", "organiser", "reach", "phone", "human"],
    reply: () => ({
      text: `You can reach the organizers at ${site.email}. ${organizer.name} runs the chapter day to day.`,
      links: [
        { label: "Email the organizers", href: `mailto:${site.email}` },
        { label: "Meet the team", href: "/about" },
      ],
    }),
  },
  {
    id: "news",
    words: ["news", "trending", "latest", "updates", "blog"],
    reply: () => {
      const [top] = latestNews(1);
      return {
        text: `The organizers curate a short tech news feed each week.${top ? ` Latest: "${top.headline}".` : ""}`,
        links: [{ label: "Tech news", href: "/tech-news" }],
      };
    },
  },
  {
    id: "about",
    phrases: ["what is gdg", "what's gdg", "who are you", "what do you do", "google developer group", "about gdg"],
    words: ["gdg", "about", "chapter", "mission"],
    reply: () => ({
      text: `${site.fullName} is a volunteer-run developer community in Nagpur. We run hands-on events, connect people with free mentors, and share real opportunities. It is part of the Google Developer Groups programme, but not run by Google.`,
      links: [{ label: "Our story", href: "/about" }],
    }),
  },
];

function nextEventReply(): ChatReply {
  const [next] = getFeaturedEvents(1);
  const { upcoming } = eventCounts();
  if (!next) {
    return {
      text: "Nothing is scheduled right this minute - join WhatsApp and you will hear about the next event first.",
      links: [...channelLinks.slice(0, 1), { label: "Past events", href: "/events?status=past" }],
    };
  }
  return {
    text: `${next.status === "ongoing" ? "Happening now" : "Next up"}: ${describe(next)}${upcoming > 1 ? ` There ${upcoming - 1 === 1 ? "is" : "are"} ${plural(upcoming - 1, "more event")} after that.` : ""} It is free - register on the event page.`,
    links: [
      { label: next.status === "past" ? "View recap" : "Details & registration", href: `/events/${next.slug}` },
      { label: "All events", href: "/events" },
    ],
  };
}

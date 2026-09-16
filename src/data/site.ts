/**
 * Global site config: identity, navigation and outbound links.
 *
 * TODO(links): entries marked PLACEHOLDER have no real URL yet.
 * Replace the `#` values with the real invites before launch.
 */

export const site = {
  name: "GDG Nagpur",
  fullName: "Google Developer Groups Nagpur",
  tagline: "A developer community in Nagpur, India.",
  email: "gdgnagpurofficials@gmail.com",
  city: "Nagpur, India",
} as const;

export const socials = {
  instagram: "https://www.instagram.com/gdgnagpur",
  linkedin: "https://www.linkedin.com/company/gdg-nagpur",
  x: "https://twitter.com/gdgnagpur",
  youtube: "https://www.youtube.com/@gdgnagpur",
  chapter: "https://gdg.community.dev/gdg-nagpur/",
  discord: "#", // PLACEHOLDER - add the real Discord invite
  whatsapp: "#", // PLACEHOLDER - add the real WhatsApp community link
} as const;

export type CommunityChannel = {
  id: string;
  name: string;
  handle: string;
  blurb: string;
  href: string;
  accent: "blue" | "green" | "ink";
};

export const communityChannels: CommunityChannel[] = [
  {
    id: "discord",
    name: "Discord",
    handle: "gdg-nagpur",
    blurb: "Daily chatter, help channels, study-jam threads and event coordination.",
    href: socials.discord,
    accent: "blue",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "GDG Nagpur Community",
    blurb: "Announcement-first. Event drops, deadlines and last-minute venue updates.",
    href: socials.whatsapp,
    accent: "green",
  },
  {
    id: "x",
    name: "X",
    handle: "@gdgnagpur",
    blurb: "Live event threads, speaker shout-outs and what the chapter is shipping.",
    href: socials.x,
    accent: "ink",
  },
];

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Opportunities", href: "/opportunities" },
];

export const secondaryNav: NavLink[] = [
  { label: "Tech News", href: "/tech-news", description: "What moved this week in AI, web and cloud" },
  { label: "Collaborate", href: "/collaborate", description: "Sponsor an event or co-host with us" },
  { label: "Speak / Judge", href: "/speak", description: "Take the stage or judge a hackathon" },
  {
    label: "Share Your Knowledge",
    href: "/share-your-knowledge",
    description: "Reels, online sessions and YouTube Live",
  },
  { label: "Community", href: "/community", description: "Discord, WhatsApp and X" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "Tech News", href: "/tech-news" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Become a Mentor", href: "/mentorship/become-a-mentor" },
      { label: "Apply to Speak", href: "/speak" },
      { label: "Apply to Judge", href: "/speak#judge" },
      { label: "Share an Opportunity", href: "/opportunities/share" },
      { label: "Share Your Knowledge", href: "/share-your-knowledge" },
    ],
  },
  {
    title: "Partner",
    links: [
      { label: "Sponsor an Event", href: "/collaborate#sponsor" },
      { label: "Partner with Us", href: "/collaborate#partner" },
      { label: "Jobs in Nagpur", href: "/jobs-in-nagpur" },
      { label: "Community", href: "/community" },
    ],
  },
];

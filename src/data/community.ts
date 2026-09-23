/**
 * Community page.
 *
 * TODO(community): `channelStats` numbers are PLACEHOLDERS. A live Discord
 * count needs the server's widget JSON (Server Settings > Widget) - wire that
 * in once the invite exists and drop the hardcoded `online` value.
 */

export type ChannelStat = { members: number; note: string; online?: number };

export const channelStats: Record<string, ChannelStat> = {
  discord: { members: 1200, note: "members", online: 64 },
  whatsapp: { members: 1800, note: "in the community" },
  x: { members: 950, note: "followers" },
};

export const startSteps: { title: string; body: string; accent: "blue" | "red" | "yellow" | "green" }[] = [
  {
    title: "Join WhatsApp for the announcements",
    body: "Low-noise: event drops, registration links and venue changes. If you only join one thing, join this.",
    accent: "green",
  },
  {
    title: "Say hello in Discord's #introductions",
    body: "Your name, what you are learning, what you are building. Someone will point you to the right channel.",
    accent: "blue",
  },
  {
    title: "Come to one event",
    body: "Any of them. A study jam is the easiest start - small room, laptops open, people helping each other.",
    accent: "yellow",
  },
];

export const conductPoints: string[] = [
  "Be kind and assume good intent. Everyone here was a beginner once.",
  "No harassment, discrimination or unwanted attention - online or at events.",
  "No spam, self-promotion loops or recruiting DMs without asking.",
  "See something off? Tell an organizer or email us. We act on every report.",
];

/** Google's community guidelines, which every GDG chapter follows. */
export const conductUrl = "https://developers.google.com/community-guidelines";

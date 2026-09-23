/** Content for the home-page sections. Frontend-only mock data. */

export type ValueProp = {
  id: string;
  title: string;
  body: string;
  accent: "blue" | "red" | "yellow" | "green";
};

export const valueProps: ValueProp[] = [
  {
    id: "learn",
    title: "Learn by building",
    body: "Study jams, bootcamps and build sprints where you leave with something running - not a certificate of attendance for a slide deck.",
    accent: "blue",
  },
  {
    id: "mentorship",
    title: "Mentorship, free",
    body: "Vetted engineers, designers and PMs from across the industry. Pick one, send a request, get an actual hour of their time.",
    accent: "red",
  },
  {
    id: "network",
    title: "A room worth being in",
    body: "The people building in Nagpur are all in one place a few times a year. That room is how most collaborations here start.",
    accent: "yellow",
  },
  {
    id: "opportunities",
    title: "Real opportunities",
    body: "Jobs, internships and scholarships posted by people in the community, with the poster credited so you know who to ask.",
    accent: "green",
  },
  {
    id: "recognition",
    title: "Swag and recognition",
    body: "Certificates, badges and letters of recommendation for volunteers who carry the weight - issued by name, not auto-generated.",
    accent: "blue",
  },
];

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  accent: "blue" | "red" | "yellow" | "green";
};

export const stats: Stat[] = [
  { id: "members", value: 2000, suffix: "+", label: "Community members", accent: "blue" },
  { id: "events", value: 50, suffix: "+", label: "Events run", accent: "red" },
  { id: "speakers", value: 100, suffix: "+", label: "Speakers hosted", accent: "yellow" },
  { id: "mentors", value: 25, suffix: "+", label: "Mentors onboarded", accent: "green" },
];

export const topics: string[] = [
  "Generative AI",
  "Android",
  "Flutter",
  "Google Cloud",
  "Firebase",
  "Kotlin",
  "Web Performance",
  "Gemini",
  "Kubernetes",
  "Design Systems",
  "Open Source",
  "Career Growth",
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  instagram?: string;
};

export const organizer: TeamMember = {
  id: "saniya-imroze",
  name: "Saniya Imroze",
  role: "Organizer, GDG Nagpur - Women Techmakers Ambassador",
  bio: "Runs the chapter day to day: picks the topics, chases the venues, and answers the emails. If you are wondering whether GDG Nagpur would host your idea, ask her.",
  // TODO(photo): drop a portrait into /public/team/ and set the path here.
  linkedin: "https://www.linkedin.com/in/saniya-imroze",
  instagram: "https://www.instagram.com/gdgnagpur",
};

/** Placeholder community photos - see CONTEXT.md, these will be replaced. */
export const communityPhotos: string[] = Array.from(
  { length: 12 },
  (_, i) => `/community/community-${String(i + 1).padStart(2, "0")}.jpg`,
);

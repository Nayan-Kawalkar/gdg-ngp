/**
 * Mentor directory.
 *
 * TODO(mentors): every profile below is a PLACEHOLDER. The chapter has no
 * approved mentor list yet - these exist so the directory, filters and card
 * layout are real. Replace wholesale before launch; do not publish invented
 * people as if they had agreed to mentor.
 */

export type Expertise =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "ML/AI"
  | "Cloud"
  | "DevOps"
  | "Product"
  | "Design"
  | "Career";

export const expertiseAreas: Expertise[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "ML/AI",
  "Cloud",
  "DevOps",
  "Product",
  "Design",
  "Career",
];

export function expertiseSlug(area: Expertise): string {
  return area.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function expertiseFromSlug(slug: string): Expertise | undefined {
  return expertiseAreas.find((a) => expertiseSlug(a) === slug);
}

export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  /** Short enough to sit on a card without clamping mid-thought. */
  bio: string;
  expertise: Expertise[];
  availability: string;
  /** Optional portrait; falls back to an initials tile. */
  photo?: string;
  linkedin?: string;
  /** Year they joined the mentor programme - drives the badge line. */
  since: string;
};

export const mentors: Mentor[] = [
  {
    id: "m-01",
    name: "Mentor Placeholder",
    role: "Senior Frontend Engineer",
    company: "Placeholder Co.",
    bio: "Ten years of shipping React at scale. Happy to review code, talk through architecture, or tell you honestly whether a rewrite is a good idea.",
    expertise: ["Frontend", "Career"],
    availability: "2 sessions a month",
    linkedin: "#",
    since: "2024",
  },
  {
    id: "m-02",
    name: "Mentor Placeholder",
    role: "ML Engineer",
    company: "Placeholder Co.",
    bio: "Works on recommendation systems in production. Best for questions about getting a model past a notebook and into something people use.",
    expertise: ["ML/AI", "Backend"],
    availability: "1 session a month",
    linkedin: "#",
    since: "2024",
  },
  {
    id: "m-03",
    name: "Mentor Placeholder",
    role: "Staff Backend Engineer",
    company: "Placeholder Co.",
    bio: "Distributed systems, Postgres and the unglamorous parts of reliability. Bring a design doc and expect it to get picked apart kindly.",
    expertise: ["Backend", "Cloud", "DevOps"],
    availability: "2 sessions a month",
    linkedin: "#",
    since: "2023",
  },
  {
    id: "m-04",
    name: "Mentor Placeholder",
    role: "Product Manager",
    company: "Placeholder Co.",
    bio: "Moved from engineering into product and has opinions about when that is a mistake. Useful for scoping, prioritisation and PM interviews.",
    expertise: ["Product", "Career"],
    availability: "1 session a month",
    linkedin: "#",
    since: "2025",
  },
  {
    id: "m-05",
    name: "Mentor Placeholder",
    role: "Android Engineer",
    company: "Placeholder Co.",
    bio: "Compose, Kotlin Multiplatform and shipping to the Play Store without losing a week to review. Portfolio reviews welcome.",
    expertise: ["Mobile", "Frontend"],
    availability: "2 sessions a month",
    linkedin: "#",
    since: "2024",
  },
  {
    id: "m-06",
    name: "Mentor Placeholder",
    role: "Product Designer",
    company: "Placeholder Co.",
    bio: "Design systems and interface craft. Will look at your portfolio and tell you which three projects to cut.",
    expertise: ["Design", "Product"],
    availability: "1 session a month",
    linkedin: "#",
    since: "2025",
  },
  {
    id: "m-07",
    name: "Mentor Placeholder",
    role: "Cloud Architect",
    company: "Placeholder Co.",
    bio: "Google Cloud and Kubernetes day to day. Good for certification paths, cost questions and whether you actually need Kubernetes.",
    expertise: ["Cloud", "DevOps"],
    availability: "2 sessions a month",
    linkedin: "#",
    since: "2023",
  },
  {
    id: "m-08",
    name: "Mentor Placeholder",
    role: "Engineering Manager",
    company: "Placeholder Co.",
    bio: "Hires engineers for a living. Best used for resume reviews, interview practice and working out what level you should be applying at.",
    expertise: ["Career", "Backend"],
    availability: "3 sessions a month",
    linkedin: "#",
    since: "2023",
  },
  {
    id: "m-09",
    name: "Mentor Placeholder",
    role: "Founding Engineer",
    company: "Placeholder Co.",
    bio: "Early-stage startups, from first commit to first customers. Talk to them before you quit your job, not after.",
    expertise: ["Frontend", "Backend", "Career"],
    availability: "1 session a month",
    linkedin: "#",
    since: "2025",
  },
];

export type MentorQuery = { q?: string; expertise?: Expertise[] };

/** Single filter entry point, so the page and any future feed agree. */
export function queryMentors({ q = "", expertise = [] }: MentorQuery = {}): Mentor[] {
  const needle = q.trim().toLowerCase();

  return mentors.filter((mentor) => {
    if (expertise.length && !expertise.some((a) => mentor.expertise.includes(a))) {
      return false;
    }
    if (!needle) return true;
    return [mentor.name, mentor.role, mentor.company, ...mentor.expertise]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
}

export function mentorStats() {
  const areas = new Set(mentors.flatMap((m) => m.expertise));
  return { total: mentors.length, areas: areas.size };
}

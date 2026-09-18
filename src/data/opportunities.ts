/**
 * Opportunity board.
 *
 * TODO(opportunities): every listing and company below is a PLACEHOLDER. They
 * exist so the board, filters and Jobs-in-Nagpur page are real. Replace with
 * reviewed community submissions before launch.
 */

export type OpportunityType = "Job" | "Internship" | "Scholarship" | "1:1 Help";
export type WorkMode = "On-site" | "Hybrid" | "Remote";

export type Opportunity = {
  id: string;
  type: OpportunityType;
  /** Role for jobs/internships, programme for scholarships, the ask for 1:1 help. */
  title: string;
  company: string;
  city: string;
  workMode: WorkMode;
  description: string;
  /** ISO date */
  postedAt: string;
  /** ISO date, optional */
  deadline?: string;
  applyUrl: string;
  postedBy: string;
  posterRole?: string;
};

export const opportunityTypes: OpportunityType[] = [
  "Job",
  "Internship",
  "Scholarship",
  "1:1 Help",
];

export function typeSlug(type: OpportunityType): string {
  return type === "1:1 Help" ? "help" : type.toLowerCase();
}

export function typeFromSlug(slug: string): OpportunityType | undefined {
  return opportunityTypes.find((t) => typeSlug(t) === slug);
}

export const opportunities: Opportunity[] = [
  {
    id: "opp-001",
    type: "Job",
    title: "Frontend Engineer, React",
    company: "Placeholder Systems",
    city: "Nagpur",
    workMode: "Hybrid",
    description:
      "Build and maintain a React + TypeScript dashboard used by operations teams across three states. Two days a week in the Nagpur office. Looking for someone with a couple of years of production React and an opinion about state management.",
    postedAt: "2026-09-14",
    deadline: "2026-10-10",
    applyUrl: "#",
    postedBy: "Rahul M.",
    posterRole: "Engineering Manager",
  },
  {
    id: "opp-002",
    type: "Internship",
    title: "ML Intern, Applied NLP",
    company: "Placeholder Analytics",
    city: "Nagpur",
    workMode: "On-site",
    description:
      "Six-month internship on a document classification pipeline. You will ship something that runs in production, not a notebook. Final-year students welcome; stipend provided.",
    postedAt: "2026-09-12",
    deadline: "2026-09-30",
    applyUrl: "#",
    postedBy: "Saniya Imroze",
    posterRole: "Organizer, GDG Nagpur",
  },
  {
    id: "opp-003",
    type: "Scholarship",
    title: "Google Cloud Certification Voucher",
    company: "GDG Nagpur",
    city: "Nagpur",
    workMode: "Remote",
    description:
      "Twenty fully-covered Associate Cloud Engineer exam vouchers for community members who complete the Cloud Study Jam skill badges. Priority to students and first-job engineers.",
    postedAt: "2026-09-10",
    deadline: "2026-10-20",
    applyUrl: "#",
    postedBy: "Chapter team",
  },
  {
    id: "opp-004",
    type: "Job",
    title: "Backend Engineer, Node + Postgres",
    company: "Placeholder Tech",
    city: "Nagpur",
    workMode: "Hybrid",
    description:
      "Own a set of payment and reconciliation services. Postgres, queues and a lot of care about idempotency. Three-plus years of backend experience expected.",
    postedAt: "2026-09-08",
    applyUrl: "#",
    postedBy: "Ankita D.",
    posterRole: "Senior Engineer",
  },
  {
    id: "opp-005",
    type: "1:1 Help",
    title: "Need a reviewer for my DevFest talk",
    company: "Community member",
    city: "Nagpur",
    workMode: "Remote",
    description:
      "First conference talk, on Compose performance. Looking for someone to watch a 20-minute run-through and tell me honestly what to cut. Happy to return the favour.",
    postedAt: "2026-09-15",
    applyUrl: "#",
    postedBy: "Kunal S.",
    posterRole: "Android Developer",
  },
  {
    id: "opp-006",
    type: "Internship",
    title: "UI/UX Design Intern",
    company: "Placeholder Studio",
    city: "Nagpur",
    workMode: "On-site",
    description:
      "Three-month design internship working on client product work. Figma fluency expected; a portfolio with one project you can talk about in depth matters more than polish.",
    postedAt: "2026-09-11",
    deadline: "2026-10-05",
    applyUrl: "#",
    postedBy: "Priya K.",
    posterRole: "Design Lead",
  },
  {
    id: "opp-007",
    type: "Job",
    title: "Android Engineer, Kotlin",
    company: "Placeholder Mobility",
    city: "Pune",
    workMode: "Remote",
    description:
      "Fully remote Android role on a ride-hailing driver app. Compose, offline-first sync, and battery budgets that actually matter. India-remote.",
    postedAt: "2026-09-06",
    applyUrl: "#",
    postedBy: "Neha R.",
    posterRole: "Android Lead",
  },
  {
    id: "opp-008",
    type: "Scholarship",
    title: "Women Techmakers Scholars Programme",
    company: "Women Techmakers",
    city: "Remote",
    workMode: "Remote",
    description:
      "Mentorship, event passes and a stipend for women studying computer science. Applications are reviewed by the WTM programme; the chapter can help you prepare yours.",
    postedAt: "2026-09-03",
    deadline: "2026-11-01",
    applyUrl: "#",
    postedBy: "Saniya Imroze",
    posterRole: "WTM Ambassador",
  },
  {
    id: "opp-009",
    type: "Job",
    title: "DevOps Engineer, GCP",
    company: "Placeholder Cloud",
    city: "Nagpur",
    workMode: "On-site",
    description:
      "Run Kubernetes on GKE for a growing SaaS product. Terraform, observability and on-call you will want to improve. Nagpur office, relocation help available.",
    postedAt: "2026-09-13",
    deadline: "2026-10-15",
    applyUrl: "#",
    postedBy: "Vikram P.",
    posterRole: "Head of Infrastructure",
  },
  {
    id: "opp-010",
    type: "1:1 Help",
    title: "Stuck choosing between two job offers",
    company: "Community member",
    city: "Nagpur",
    workMode: "Remote",
    description:
      "Service company in Nagpur versus a product startup in Bengaluru. Would value 30 minutes with someone who has made a similar call.",
    postedAt: "2026-09-16",
    applyUrl: "#",
    postedBy: "Aditi W.",
    posterRole: "Final-year student",
  },
  {
    id: "opp-011",
    type: "Internship",
    title: "Cloud Support Intern",
    company: "Placeholder Cloud",
    city: "Nagpur",
    workMode: "Hybrid",
    description:
      "Help customers debug their deployments. The fastest way to learn how production systems actually fail. Converts to full-time for strong interns.",
    postedAt: "2026-09-09",
    applyUrl: "#",
    postedBy: "Vikram P.",
    posterRole: "Head of Infrastructure",
  },
  {
    id: "opp-012",
    type: "Job",
    title: "Product Designer",
    company: "Placeholder Health",
    city: "Bengaluru",
    workMode: "Hybrid",
    description:
      "Design clinical workflow tools with doctors in the room. Research-heavy role; you will spend real time in hospitals before you open Figma.",
    postedAt: "2026-09-05",
    applyUrl: "#",
    postedBy: "Meera J.",
    posterRole: "Design Director",
  },
];

export type Company = {
  name: string;
  openRoles: number;
  city: string;
  note: string;
};

/** PRD 5.5: companies specifically sourcing from the community. */
export const companiesHiring: Company[] = [
  { name: "Placeholder Systems", openRoles: 3, city: "Nagpur", note: "Frontend and QA" },
  { name: "Placeholder Cloud", openRoles: 4, city: "Nagpur", note: "DevOps and support" },
  { name: "Placeholder Analytics", openRoles: 2, city: "Nagpur", note: "ML and data" },
  { name: "Placeholder Tech", openRoles: 2, city: "Nagpur", note: "Backend" },
];

export type OpportunityQuery = {
  type?: OpportunityType | "all";
  mode?: WorkMode | "all";
  q?: string;
  nagpurOnly?: boolean;
};

/** Single filter entry point, newest first. */
export function queryOpportunities({
  type = "all",
  mode = "all",
  q = "",
  nagpurOnly = false,
}: OpportunityQuery = {}): Opportunity[] {
  const needle = q.trim().toLowerCase();
  return opportunities
    .filter((o) => type === "all" || o.type === type)
    .filter((o) => mode === "all" || o.workMode === mode)
    .filter((o) => !nagpurOnly || o.city === "Nagpur")
    .filter(
      (o) =>
        !needle ||
        [o.title, o.company, o.postedBy, o.city].join(" ").toLowerCase().includes(needle),
    )
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

export function opportunityCounts() {
  const count = (t: OpportunityType) => opportunities.filter((o) => o.type === t).length;
  return {
    jobs: count("Job"),
    internships: count("Internship"),
    scholarships: count("Scholarship"),
    help: count("1:1 Help"),
  };
}

/** Jobs and internships located in Nagpur - the Jobs-in-Nagpur page's set. */
export function nagpurJobs(): Opportunity[] {
  return opportunities
    .filter((o) => (o.type === "Job" || o.type === "Internship") && o.city === "Nagpur")
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

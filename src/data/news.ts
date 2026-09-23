/**
 * Tech news, curated by the organizers.
 *
 * TODO(news): every item below is a PLACEHOLDER written to exercise the page
 * layout - the headlines are illustrative, not reporting. Replace with real,
 * linked stories (or an RSS pull) before launch. `href: "#"` marks a missing link.
 */

export type NewsCategory = "AI" | "Web" | "Mobile" | "Cloud" | "Career" | "Industry";

export type NewsItem = {
  id: string;
  source: string;
  category: NewsCategory;
  headline: string;
  summary: string;
  href: string;
  /** ISO date */
  publishedAt: string;
};

export const newsCategories: NewsCategory[] = [
  "AI",
  "Web",
  "Mobile",
  "Cloud",
  "Career",
  "Industry",
];

export const newsItems: NewsItem[] = [
  {
    id: "news-001",
    source: "Google Developers Blog",
    category: "AI",
    headline: "Gemini gets long-running agent sessions",
    summary:
      "Agents can now hold a task across hours instead of a single call, which changes what a hackathon team can realistically ship in a weekend.",
    href: "#",
    publishedAt: "2026-09-12",
  },
  {
    id: "news-002",
    source: "Chrome Developers",
    category: "Web",
    headline: "Baseline 2026 lands: what you can finally stop polyfilling",
    summary:
      "Container queries, :has() and view transitions are now safe across every browser Nagpur users actually open. Time to delete some code.",
    href: "#",
    publishedAt: "2026-09-09",
  },
  {
    id: "news-003",
    source: "Android Developers",
    category: "Mobile",
    headline: "Compose adaptive layouts become the default",
    summary:
      "The new guidance treats foldables and tablets as first-class rather than an afterthought, with a migration path that is mostly deletion.",
    href: "#",
    publishedAt: "2026-09-05",
  },
  {
    id: "news-004",
    source: "Google Cloud Blog",
    category: "Cloud",
    headline: "Serverless GPUs drop their minimum billing window",
    summary:
      "Short inference jobs no longer pay for a full minute. For student projects running a model a few times an hour, the bill rounds to almost nothing.",
    href: "#",
    publishedAt: "2026-09-03",
  },
  {
    id: "news-005",
    source: "GDG Nagpur",
    category: "Career",
    headline: "What three Nagpur hiring managers asked in their last ten interviews",
    summary:
      "We asked. Fewer trivia questions, more 'walk me through something you shipped'. The notes, and how to prepare for that kind of conversation.",
    href: "#",
    publishedAt: "2026-08-30",
  },
  {
    id: "news-006",
    source: "Firebase Blog",
    category: "Web",
    headline: "App Hosting adds preview channels for every pull request",
    summary:
      "Each PR gets its own live URL with production-like config. Reviewing a teammate's UI change stops meaning 'clone it and run it yourself'.",
    href: "#",
    publishedAt: "2026-08-27",
  },
  {
    id: "news-007",
    source: "Google AI Blog",
    category: "AI",
    headline: "Smaller open models close the gap on code tasks",
    summary:
      "The latest open-weight releases run on a laptop GPU and handle most everyday refactors. Worth knowing before you pay for an API in a side project.",
    href: "#",
    publishedAt: "2026-08-22",
  },
  {
    id: "news-008",
    source: "Flutter",
    category: "Mobile",
    headline: "Flutter's new rendering backend is on by default",
    summary:
      "Jank on mid-range Android phones - the ones most of our users carry - drops noticeably. Upgrade notes are short.",
    href: "#",
    publishedAt: "2026-08-19",
  },
  {
    id: "news-009",
    source: "NASSCOM",
    category: "Industry",
    headline: "Tier-2 cities take a bigger share of new tech hiring",
    summary:
      "Nagpur, Indore and Coimbatore show up by name. Remote-first teams are opening small hubs where their engineers already live.",
    href: "#",
    publishedAt: "2026-08-14",
  },
  {
    id: "news-010",
    source: "Google Cloud Blog",
    category: "Cloud",
    headline: "Free-tier credits for student developers get simpler",
    summary:
      "One sign-up with a college email instead of three forms. If you shelved a project because of billing setup, this is the nudge.",
    href: "#",
    publishedAt: "2026-08-10",
  },
  {
    id: "news-011",
    source: "GDG Nagpur",
    category: "Career",
    headline: "Your first open-source PR: a checklist from our last study jam",
    summary:
      "Pick a repo with 'good first issue' labels, read CONTRIBUTING twice, keep the diff small. The rest of the list, with examples from members.",
    href: "#",
    publishedAt: "2026-08-04",
  },
  {
    id: "news-012",
    source: "Google for Developers",
    category: "Industry",
    headline: "Developer community programmes expand in India",
    summary:
      "More funding for local chapters, more study-jam content in regional languages, and a push to get hackathons out of the metros.",
    href: "#",
    publishedAt: "2026-07-29",
  },
];

/** Newest first. */
export function sortedNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function latestNews(limit = 3): NewsItem[] {
  return sortedNews().slice(0, limit);
}

export function newsCategorySlug(category: NewsCategory): string {
  return category.toLowerCase();
}

export function newsCategoryFromSlug(slug: string): NewsCategory | undefined {
  return newsCategories.find((c) => newsCategorySlug(c) === slug);
}

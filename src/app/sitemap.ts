import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/events";

const base = "https://gdgnagpur.dev";

/** Every public route. `/certificates/*` is private and deliberately absent. */
const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/events", priority: 0.9, freq: "weekly" },
  { path: "/devfest", priority: 0.9, freq: "weekly" },
  { path: "/jobs-in-nagpur", priority: 0.9, freq: "weekly" },
  { path: "/opportunities", priority: 0.8, freq: "weekly" },
  { path: "/tech-news", priority: 0.7, freq: "weekly" },
  { path: "/mentorship", priority: 0.8, freq: "monthly" },
  { path: "/about", priority: 0.7, freq: "monthly" },
  { path: "/community", priority: 0.7, freq: "monthly" },
  { path: "/collaborate", priority: 0.6, freq: "monthly" },
  { path: "/speak", priority: 0.6, freq: "monthly" },
  { path: "/share-your-knowledge", priority: 0.6, freq: "monthly" },
  { path: "/mentorship/become-a-mentor", priority: 0.5, freq: "monthly" },
  { path: "/opportunities/share", priority: 0.5, freq: "monthly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...getAllSlugs().map((slug) => ({
      url: `${base}/events/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

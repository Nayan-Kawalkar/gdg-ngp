import type { MetadataRoute } from "next";

/**
 * Certificate pages are private per-volunteer links (PRD 13). Disallowing
 * them here keeps well-behaved crawlers out; each page also sets noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/certificates/" },
    sitemap: "https://gdgnagpur.dev/sitemap.xml",
  };
}

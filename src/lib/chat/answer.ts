/**
 * Deterministic answer engine for the site chatbot (PRD 12).
 *
 * No language model, on purpose: every answer is either built from live site
 * data (intents.ts) or quoted from the curated FAQ (data/faq.ts). When neither
 * fits, it says so and hands over to a human - it never guesses.
 */

import { intents, type ChatLink, type ChatReply } from "@/lib/chat/intents";
import { siteFaqs } from "@/data/faq";
import { site, socials } from "@/data/site";

export type { ChatLink, ChatReply };

export type Answer = ChatReply & { matched: boolean; source?: string };

const STOP = new Set(
  "a an and are as at be can do does for from how i im in is it me my of on or so the to we what when where which who why will with you your our there this that have has get".split(
    " ",
  ),
);

export function normalize(text: string): string {
  return ` ${text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9:'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function tokens(normalized: string): string[] {
  return normalized.trim().split(" ").filter(Boolean);
}

function scoreIntent(normalized: string, words: Set<string>, intent: (typeof intents)[number]) {
  let score = 0;
  for (const phrase of intent.phrases ?? []) {
    if (normalized.includes(` ${phrase} `) || normalized.includes(` ${phrase}`)) score += 3;
  }
  for (const word of intent.words ?? []) {
    if (words.has(word)) score += 1;
  }
  return score;
}

/** Share of the FAQ's content words present in the question, plus tag hits. */
function scoreFaq(normalized: string, words: Set<string>, faq: (typeof siteFaqs)[number]) {
  const faqWords = tokens(normalize(faq.q)).filter((w) => !STOP.has(w));
  const overlap = faqWords.filter((w) => words.has(w)).length / Math.max(faqWords.length, 1);
  const tagHits = (faq.tags ?? []).filter((t) => normalized.includes(` ${t}`)).length;
  return overlap + tagHits * 0.5;
}

export const fallbackLinks: ChatLink[] = [
  { label: "Email the organizers", href: `mailto:${site.email}` },
  { label: "Ask in Discord", href: socials.discord },
  { label: "WhatsApp", href: socials.whatsapp },
];

export function answer(question: string): Answer {
  const normalized = normalize(question);
  const words = new Set(tokens(normalized));

  if (words.size === 0) {
    return { text: "Ask me anything about GDG Nagpur - events, mentors, jobs or how to join.", matched: false };
  }

  // 1. Intents, built from live data.
  let best: { intent: (typeof intents)[number]; score: number } | undefined;
  for (const intent of intents) {
    const score = scoreIntent(normalized, words, intent);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  // A lone greeting word should not beat a real question ("hi, when's the next event?").
  if (best?.intent.id === "greeting" && words.size > 3) {
    best = undefined;
    for (const intent of intents.filter((i) => i.id !== "greeting")) {
      const score = scoreIntent(normalized, words, intent);
      if (score > 0 && (!best || score > best.score)) best = { intent, score };
    }
  }

  // 2. Curated FAQ, when it is a clearer match than a single stray keyword.
  let faqBest: { faq: (typeof siteFaqs)[number]; score: number } | undefined;
  for (const faq of siteFaqs) {
    const score = scoreFaq(normalized, words, faq);
    if (!faqBest || score > faqBest.score) faqBest = { faq, score };
  }

  const faqWins = faqBest && faqBest.score >= 0.5 && (!best || (best.score <= 1 && faqBest.score >= 1));
  if (faqWins && faqBest) {
    return { text: faqBest.faq.a, links: faqBest.faq.links, matched: true, source: "faq" };
  }
  if (best) {
    return { ...best.intent.reply(question), matched: true, source: best.intent.id };
  }
  if (faqBest && faqBest.score >= 0.5) {
    return { text: faqBest.faq.a, links: faqBest.faq.links, matched: true, source: "faq" };
  }

  // 3. Honest fallback.
  return {
    text: "I'm not sure about that one, and I would rather not guess. The organizers can answer it - email them, or ask in the community.",
    links: fallbackLinks,
    matched: false,
  };
}

/** Unanswered questions, so organizers can see gaps. TODO(analytics): send somewhere real. */
export function logMiss(question: string) {
  try {
    const key = "gdg-chat-misses";
    const list: { q: string; at: string }[] = JSON.parse(localStorage.getItem(key) ?? "[]");
    list.push({ q: question.slice(0, 300), at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list.slice(-50)));
  } catch {
    // Storage blocked or full - losing a log entry is fine.
  }
}

export const quickQuestions = [
  "When's the next event?",
  "How do I become a mentor?",
  "Are there jobs in Nagpur?",
  "How do I join?",
];

"use client";

import { useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Shared GSAP registration + motion tokens.
 *
 * Every animated component imports `gsap` / `ScrollTrigger` from here so the
 * plugin is registered exactly once and the easing/duration language stays
 * consistent across the site.
 */
// registerPlugin is idempotent, so a module-level call is safe even though this
// module is imported by several client components.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.85 });

  if (process.env.NODE_ENV === "development") {
    // Handy for poking at timelines from the console during development.
    Object.assign(window, { gsap, ScrollTrigger });
  }
}

export { gsap, ScrollTrigger };

/** Cinematic motion tokens - keep every tween inside these ranges. */
export const MOTION = {
  ease: "power4.out",
  easeSoft: "power3.out",
  revealDuration: 0.95,
  wordStagger: 0.045,
  lineStagger: 0.11,
  cardStagger: 0.08,
  start: "top 82%",
  scrub: 1.1,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * prefers-reduced-motion as live state. Reports `true` on the server and
 * during hydration, so animated markup only appears once the client knows
 * motion is welcome, and a mid-visit OS setting change is picked up.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => true);
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Wrap the text nodes of an element in masked word spans.
 * Keeps the original string on `aria-label` so screen readers are unaffected.
 */
export function splitWords(element: HTMLElement): HTMLElement[] {
  if (element.dataset.motionSplit === "true") {
    return Array.from(element.querySelectorAll<HTMLElement>(".motion-word"));
  }

  const text = element.textContent ?? "";
  const parts = text.split(/(\s+)/);

  element.textContent = "";
  element.setAttribute("aria-label", text.trim());

  parts.forEach((part) => {
    if (!part.trim()) {
      element.appendChild(document.createTextNode(part));
      return;
    }
    const mask = document.createElement("span");
    mask.className = "motion-word-mask";
    mask.setAttribute("aria-hidden", "true");

    const word = document.createElement("span");
    word.className = "motion-word";
    word.textContent = part;

    mask.appendChild(word);
    element.appendChild(mask);
  });

  element.dataset.motionSplit = "true";
  return Array.from(element.querySelectorAll<HTMLElement>(".motion-word"));
}

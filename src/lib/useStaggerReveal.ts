"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, MOTION, prefersReducedMotion } from "@/lib/motion";

/**
 * Stagger a grid's children in, and re-stagger them whenever `signature`
 * changes (a filter or tab switch).
 *
 * Why this exists instead of the global `data-reveal-group` attribute:
 * MotionProvider queries the DOM once on mount and writes GSAP inline styles
 * onto whatever it finds. Inside a Suspense boundary that hydrates separately -
 * as the events directory does, because `useSearchParams` forces one - those
 * writes can land before React hydrates those nodes, and React then reports a
 * hydration mismatch on the styles it did not render. Owning the reveal in the
 * component's own effect guarantees it runs after that component has hydrated.
 */
export function useStaggerReveal(
  ref: RefObject<HTMLElement | null>,
  signature: string,
) {
  const first = useRef(true);

  useEffect(() => {
    const grid = ref.current;
    if (!grid || prefersReducedMotion()) return;

    const from = { y: 26, autoAlpha: 0 };
    const to = {
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      ease: MOTION.ease,
      stagger: 0.06,
    };

    // First paint: wait for the grid to scroll into view.
    if (first.current) {
      first.current = false;
      const tween = gsap.fromTo(grid.children, from, {
        ...to,
        scrollTrigger: { trigger: grid, start: MOTION.start, once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    // Subsequent changes: the user is already looking at it, so play now.
    const tween = gsap.fromTo(grid.children, from, to);
    ScrollTrigger.refresh();
    return () => {
      tween.kill();
    };
  }, [ref, signature]);
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Mounts Lenis once and drives its RAF from the GSAP ticker so smooth scroll
 * and ScrollTrigger stay on the same clock. Disabled entirely for
 * `prefers-reduced-motion: reduce` - no scroll hijacking for those users.
 *
 * Also owns scroll-to-top on navigation (see the second effect).
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const lastPath = useRef(pathname);
  const poppedHistory = useRef(false);

  useEffect(() => {
    // Back/Forward should return to where you were, not to the top. Only a
    // pop that changes the page counts: following a plain #anchor link fires
    // popstate too, and must not mark the next real navigation as "Back".
    const onPop = () => {
      poppedHistory.current = window.location.pathname !== lastPath.current;
    };
    window.addEventListener("popstate", onPop);

    if (prefersReducedMotion()) {
      return () => window.removeEventListener("popstate", onPop);
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
      // Clicking a link to another page cancels any glide still in flight.
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /**
   * Every new page opens at the top.
   *
   * Next.js already scrolls to the top on navigation, but Lenis keeps its own
   * target position. If you clicked a link while a smooth scroll was still
   * gliding, Lenis finished that glide on the NEW page and dragged it back
   * down. Jumping Lenis itself to 0 (`immediate` also cancels the glide)
   * fixes that; without Lenis (reduced motion) a plain window scroll does.
   *
   * Skipped on first load (the browser owns reloads and #hash landings), on
   * Back/Forward (the browser restores your position), and when the new URL
   * has a #hash, e.g. /speak#judge, which scrolls to its target instead.
   */
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    if (poppedHistory.current) {
      poppedHistory.current = false;
      return;
    }
    if (window.location.hash) return;

    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useReducedMotion } from "@/lib/motion";

/** Transparent PNG; Next serves resized WebP/AVIF copies of it. */
const PLANE = { src: "/devfest/plane.png", width: 2048, height: 884 };
/** The jet's nose-up angle in the artwork, in degrees (screen coordinates). */
const ART_ANGLE = -24.7;

/**
 * The hero's take-off. Nothing moves until the visitor scrolls, so the plane
 * never crosses the headline while they read it; then, as the hero scrolls
 * away, a jet climbs across the screen from off the bottom-left corner to off
 * the top-right, scrubbed to the scroll (it flies back if they scroll up).
 *
 * The path is worked out from the viewport, so phones get a shallower climb
 * than their tall screens would give, and the jet is turned to match it.
 * Decorative: aria-hidden, no pointer events, and skipped entirely under
 * reduced motion.
 */
export default function TakeoffPlane({ heroId = "top" }: { heroId?: string }) {
  const still = useReducedMotion();
  const plane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = plane.current;
    const hero = document.getElementById(heroId);
    if (still || !el || !hero) return;

    const path = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const size = el.offsetWidth;
      const wide = w > h;
      // Off the bottom-left corner to off the right edge: across the whole
      // screen on landscape, a gentler climb through the middle on portrait.
      const from = { x: -(size + w * 0.05), y: h * (wide ? 0.92 : 0.78) };
      const to = { x: w * 1.05, y: h * (wide ? -0.42 : 0.28) };
      const angle = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
      const turn = Math.min(8, Math.max(-24, angle - ART_ANGLE));
      return { from, to, turn };
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          x: () => path().from.x,
          y: () => path().from.y,
          rotation: () => path().turn + 4,
          scale: 0.82,
        },
        {
          x: () => path().to.x,
          y: () => path().to.y,
          rotation: () => path().turn - 3,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            // The hero's height, but never more than about a screen: on phones
            // the hero is tall, and the jet should not loiter over the copy.
            end: () => `+=${Math.min(hero.offsetHeight, window.innerHeight * 1.1)}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [still, heroId]);

  if (still) return null;

  return (
    <div
      ref={plane}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 w-[clamp(15rem,36vw,36rem)] will-change-transform"
      // Parked off-screen until GSAP takes over, so it never flashes in.
      style={{ transform: "translate3d(-120vw, 120vh, 0)" }}
    >
      <Image
        src={PLANE.src}
        alt=""
        width={PLANE.width}
        height={PLANE.height}
        loading="eager"
        sizes="(max-width: 700px) 15rem, 36vw"
        className="h-auto w-full"
      />
    </div>
  );
}

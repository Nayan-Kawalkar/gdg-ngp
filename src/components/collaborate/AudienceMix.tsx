"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION, prefersReducedMotion } from "@/lib/motion";
import { audienceMix, type Accent } from "@/data/collaborate";
import { cn } from "@/lib/cn";

const bar: Record<Accent, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

/**
 * Who is in the room, as bars that grow to their share once scrolled into
 * view. Markup renders the final widths, so the numbers are right with JS off
 * or motion reduced; the tween only starts them from zero.
 */
export default function AudienceMix() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-bar]", {
        scaleX: 0,
        duration: 1.3,
        ease: MOTION.ease,
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: MOTION.start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="space-y-7">
      {audienceMix.map((row) => (
        <div key={row.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[0.95rem] text-ink-soft">{row.label}</span>
            <span className="font-heading text-[1.5rem] leading-none tracking-[-0.04em]">
              {row.share}%
            </span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink/6">
            <div
              data-bar
              className={cn("h-full origin-left rounded-full", bar[row.accent])}
              style={{ width: `${row.share}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

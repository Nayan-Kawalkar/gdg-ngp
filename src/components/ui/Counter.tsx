"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Counts up once when it scrolls into view. Renders the final value in the
 * markup so the number is correct with JS off or motion reduced.
 */
export default function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const state = { n: 0 };
    const format = new Intl.NumberFormat("en-IN");

    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format.format(Math.round(state.n)) + suffix;
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat("en-IN").format(value)}
      {suffix}
    </span>
  );
}

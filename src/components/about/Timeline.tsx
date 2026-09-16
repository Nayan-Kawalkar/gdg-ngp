"use client";

import { useEffect, useRef } from "react";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { milestones } from "@/data/about";
import { cn } from "@/lib/cn";

const accents = {
  blue: { dot: "bg-brand-blue", tint: "bg-blue-mist", text: "text-blue-deep" },
  red: { dot: "bg-brand-red", tint: "bg-red-mist", text: "text-red-deep" },
  yellow: { dot: "bg-brand-yellow", tint: "bg-yellow-mist", text: "text-amber" },
  green: { dot: "bg-brand-green", tint: "bg-green-mist", text: "text-green-deep" },
} as const;

/**
 * Left-rail timeline with a scroll-linked progress fill.
 *
 * The rail is measured between the FIRST and LAST dot centres, not the section
 * edges, so the head meets each dot exactly as that step activates. A step is
 * marked active once the head passes its centre.
 *
 * Rendered as an ordered list with real headings: the rail, dots and active
 * states are decoration on top of a structure that reads fine without them.
 */
export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const fill = el.querySelector<HTMLElement>("[data-rail-fill]");
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-step-dot]");
      if (!fill || !items.length) return;

      const setActive = (index: number) => {
        items.forEach((item, i) => {
          const on = i <= index;
          item.dataset.active = String(on);
        });
      };
      setActive(-1);

      // Geometry lives in a function so invalidateOnRefresh can re-measure
      // after fonts, images and resizes move the dots.
      const bounds = () => {
        const railBox = el.getBoundingClientRect();
        const first = dots[0].getBoundingClientRect();
        const last = dots[dots.length - 1].getBoundingClientRect();
        return {
          top: first.top - railBox.top + first.height / 2,
          height: last.top - first.top,
        };
      };

      ScrollTrigger.create({
        trigger: el,
        start: () => `top-=${window.innerHeight * 0.45} top`,
        end: () => `bottom-=${window.innerHeight * 0.45} bottom`,
        invalidateOnRefresh: true,
        onRefresh: () => {
          const { top, height } = bounds();
          gsap.set(fill, { top, height });
        },
        onUpdate: (self) => {
          gsap.set(fill, { scaleY: self.progress });

          const anchor = window.innerHeight * 0.55;
          let active = -1;
          dots.forEach((dot, i) => {
            const box = dot.getBoundingClientRect();
            if (box.top + box.height / 2 <= anchor) active = i;
          });
          setActive(active);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="journey" tone="cream">
      <Container>
        <SectionHeader
          eyebrow="The journey"
          title="Seven years, fifty events, one borrowed projector."
          lede="The chapter's history, as honestly as we can tell it."
        />

        <div ref={root} className="relative mt-16 lg:mt-20">
          {/* Rail: quiet base line, plus the progress head on top */}
          {/* Spans the first dot centre to the last, same span the JS fill measures.
              Dot centre = top-1.5 (6px) + half the dot (12px / sm 16px). */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] top-[18px] h-[calc(100%-36px)] w-px bg-ink/10 sm:left-[15px] sm:top-[22px] sm:h-[calc(100%-44px)]"
          />
          <div
            aria-hidden="true"
            data-rail-fill
            className="absolute left-[11px] w-px origin-top scale-y-0 bg-ink/45 sm:left-[15px]"
          />

          <ol className="space-y-12 sm:space-y-16">
            {milestones.map((milestone) => {
              const accent = accents[milestone.accent];
              return (
                <li
                  key={milestone.id}
                  data-step
                  data-active="true"
                  className="group relative pl-10 sm:pl-16"
                >
                  {/* Dot */}
                  <span
                    data-step-dot
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 flex size-6 items-center justify-center rounded-full border border-ink/10 bg-cream transition-colors duration-500 sm:size-8"
                  >
                    <span
                      className={cn(
                        "block size-2 rounded-full transition-all duration-500 sm:size-2.5",
                        accent.dot,
                        "opacity-25 group-data-[active=true]:scale-125 group-data-[active=true]:opacity-100",
                      )}
                    />
                  </span>

                  <div className="transition-opacity duration-500 group-data-[active=false]:opacity-55">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-heading text-[1.75rem] leading-none tracking-[-0.04em] sm:text-[2rem]">
                        {milestone.year}
                      </span>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.1em]",
                          accent.tint,
                          accent.text,
                        )}
                      >
                        {milestone.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 max-w-2xl text-[1.4rem] leading-[1.15] sm:text-[1.75rem]">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-ink-soft sm:text-[1rem]">
                      {milestone.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { useId, useMemo, useRef, useState } from "react";
import EventCard from "@/components/home/EventCard";
import { getEventsByStatus, type EventStatus } from "@/data/events";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type TabKey = EventStatus | "all";

const tabs: { key: TabKey; label: string }[] = [
  { key: "past", label: "Past" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Future" },
  { key: "all", label: "All" },
];

/**
 * Past / Ongoing / Future / All switcher over the shared events data.
 *
 * Tabs follow the ARIA tabs pattern: roving tabindex, arrow-key navigation, and
 * one focusable tab at a time. The sliding indicator is a transform on a single
 * element rather than an animated border, so switching stays on the compositor.
 *
 * Built generic on purpose - the Events page will reuse this with format
 * filtering layered on top.
 */
export default function EventTabs({ limit = 6 }: { limit?: number }) {
  const [active, setActive] = useState<TabKey>("past");
  const gridRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const visible = useMemo(
    () => getEventsByStatus(active).slice(0, limit),
    [active, limit],
  );

  const activeIndex = tabs.findIndex((t) => t.key === active);

  function select(key: TabKey) {
    if (key === active) return;
    setActive(key);

    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    // Re-stagger the new set in; React has already swapped the children by the
    // time this runs on the next frame.
    requestAnimationFrame(() => {
      gsap.fromTo(
        grid.children,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
      );
    });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const dir = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    event.preventDefault();
    const next = (activeIndex + dir + tabs.length) % tabs.length;
    select(tabs[next].key);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-12 lg:mt-14">
      <div
        role="tablist"
        aria-label="Filter events by when they happen"
        onKeyDown={onKeyDown}
        className="relative flex w-full max-w-[26rem] rounded-full border border-black/8 bg-paper p-1.5 sm:max-w-lg"
      >
        {/* Sliding indicator. Tabs are flex-1 so every one is exactly the same
            width, which is what makes this percentage transform land correctly. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-1.5 rounded-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: `calc((100% - 0.75rem) / ${tabs.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {tabs.map((tab, i) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.key)}
              className={cn(
                "relative z-10 flex-1 rounded-full px-2 py-2.5 text-[0.82rem] font-medium transition-colors duration-300 sm:px-5 sm:text-[0.9rem]",
                selected ? "text-white" : "text-ink-soft hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={-1}
      >
        {visible.length ? (
          <div
            ref={gridRef}
            data-reveal-group
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-[2rem] border border-black/8 bg-paper p-10 text-center text-[0.975rem] text-ink-soft">
            Nothing here right now. Check the other tabs, or join the community to hear
            about the next one first.
          </p>
        )}
      </div>
    </div>
  );
}

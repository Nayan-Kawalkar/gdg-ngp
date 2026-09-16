"use client";

import { useId, useRef } from "react";
import type { EventStatus } from "@/data/events";
import { cn } from "@/lib/cn";

export type StatusKey = EventStatus | "all";

export const statusTabs: { key: StatusKey; label: string }[] = [
  { key: "past", label: "Past" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Future" },
  { key: "all", label: "All" },
];

/**
 * Controlled Past / Ongoing / Future / All switcher.
 *
 * Follows the ARIA tabs pattern: roving tabindex, arrow-key navigation, one
 * focusable tab at a time. The sliding indicator is a transform on a single
 * element rather than an animated border, so switching stays on the compositor.
 *
 * Tabs are flex-1 so every one is exactly the same width - that is what makes
 * the indicator's percentage transform land correctly. Sized to their labels
 * they drift, and their min-width pushes the bar past a 375px viewport.
 *
 * Controlled rather than stateful so the Events directory can back it with the
 * URL while the About page backs it with local state.
 */
export default function StatusTabs({
  value,
  onChange,
  panelId,
  className,
}: {
  value: StatusKey;
  onChange: (key: StatusKey) => void;
  panelId?: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const activeIndex = statusTabs.findIndex((t) => t.key === value);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const dir = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    event.preventDefault();
    const next = (activeIndex + dir + statusTabs.length) % statusTabs.length;
    onChange(statusTabs[next].key);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Filter events by when they happen"
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full max-w-[26rem] rounded-full border border-black/8 bg-paper p-1.5 sm:max-w-md",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1.5 left-1.5 rounded-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `calc((100% - 0.75rem) / ${statusTabs.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {statusTabs.map((tab, i) => {
        const selected = tab.key === value;
        return (
          <button
            key={tab.key}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.key}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.key)}
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
  );
}

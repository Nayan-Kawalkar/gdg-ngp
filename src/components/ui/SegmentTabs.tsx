"use client";

import { useId, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Controlled segmented tab bar - the one tab implementation for the site.
 *
 * Follows the ARIA tabs pattern: roving tabindex, arrow-key navigation, one
 * focusable tab at a time. The sliding indicator is a transform on a single
 * element, so switching stays on the compositor.
 *
 * Tabs are flex-1 so every one is exactly the same width - that is what makes
 * the indicator's percentage transform land correctly. Sized to their labels
 * they drift, and a min-width pushes the bar past a 375px viewport.
 */
export default function SegmentTabs<K extends string>({
  options,
  value,
  onChange,
  label,
  panelId,
  className,
}: {
  options: readonly { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
  label: string;
  panelId?: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.key === value),
  );

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const dir = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    event.preventDefault();
    const next = (activeIndex + dir + options.length) % options.length;
    onChange(options[next].key);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full rounded-full border border-black/8 bg-paper p-1.5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1.5 left-1.5 rounded-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `calc((100% - 0.75rem) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((tab, i) => {
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
              "relative z-10 flex-1 truncate rounded-full px-1.5 py-2.5 text-[0.8rem] font-medium transition-colors duration-300 sm:px-4 sm:text-[0.9rem]",
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

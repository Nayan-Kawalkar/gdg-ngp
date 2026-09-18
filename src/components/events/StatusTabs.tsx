"use client";

import SegmentTabs from "@/components/ui/SegmentTabs";
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
 * Past / Ongoing / Future / All. A thin wrapper over SegmentTabs so events,
 * About and the opportunity board all share one tab implementation. The
 * Events directory backs it with the URL; About backs it with local state.
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
  return (
    <SegmentTabs
      options={statusTabs}
      value={value}
      onChange={onChange}
      label="Filter events by when they happen"
      panelId={panelId}
      className={cn("max-w-[26rem] sm:max-w-md", className)}
    />
  );
}

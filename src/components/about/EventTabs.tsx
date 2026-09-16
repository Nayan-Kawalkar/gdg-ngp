"use client";

import { useId, useMemo, useRef, useState } from "react";
import EventCard from "@/components/home/EventCard";
import StatusTabs, { type StatusKey } from "@/components/events/StatusTabs";
import { getEventsByStatus } from "@/data/events";
import { useStaggerReveal } from "@/lib/useStaggerReveal";

/**
 * The About page's curated event showcase: the shared status tabs backed by
 * local state, over a capped grid. The full directory at /events backs the same
 * tabs with the URL instead.
 */
export default function EventTabs({ limit = 6 }: { limit?: number }) {
  const [active, setActive] = useState<StatusKey>("past");
  const gridRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const visible = useMemo(
    () => getEventsByStatus(active).slice(0, limit),
    [active, limit],
  );


  useStaggerReveal(gridRef, active);

  return (
    <div className="mt-12 lg:mt-14">
      <StatusTabs value={active} onChange={setActive} panelId={panelId} />

      <div id={panelId} role="tabpanel" tabIndex={-1}>
        {visible.length ? (
          <div
            ref={gridRef}
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

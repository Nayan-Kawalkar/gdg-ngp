"use client";

import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EventCard from "@/components/home/EventCard";
import StatusTabs, { type StatusKey } from "@/components/events/StatusTabs";
import { Button } from "@/components/ui/Button";
import {
  eventFormats,
  formatFromSlug,
  formatSlug,
  queryEvents,
  type EventFormat,
} from "@/data/events";
import { useStaggerReveal } from "@/lib/useStaggerReveal";
import { cn } from "@/lib/cn";

type Sort = "newest" | "oldest";

const isStatus = (v: string | null): v is StatusKey =>
  v === "past" || v === "ongoing" || v === "upcoming" || v === "all";

/**
 * The full directory.
 *
 * Filter state lives in the URL rather than component state, so a filtered view
 * is shareable, the back button steps through filter changes, and a link from a
 * social post can land someone straight on "past DevFests". Everything is
 * derived from searchParams - there is no second copy to drift out of sync.
 */
export default function EventsDirectory() {
  const router = useRouter();
  const params = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const statusParam = params.get("status");
  const status: StatusKey = isStatus(statusParam) ? statusParam : "all";
  const sort: Sort = params.get("sort") === "oldest" ? "oldest" : "newest";

  const formats = useMemo(() => {
    const raw = params.get("format");
    if (!raw) return [] as EventFormat[];
    return raw
      .split(",")
      .map(formatFromSlug)
      .filter((f): f is EventFormat => Boolean(f));
  }, [params]);

  const results = useMemo(
    () => queryEvents({ status, formats, sort }),
    [status, formats, sort],
  );

  const hasFilters = status !== "all" || formats.length > 0 || sort !== "newest";

  /**
   * Navigation is async, so `params` still holds the old value for a moment
   * after a click. Two quick chip taps would both build off that stale value
   * and the first one would be lost. `pending` holds the intended state
   * synchronously and is cleared once the URL catches up.
   */
  const pending = useRef<URLSearchParams | null>(null);
  useEffect(() => {
    pending.current = null;
  }, [params]);

  const push = useCallback(
    (next: URLSearchParams) => {
      pending.current = next;
      const qs = next.toString();
      // push, not replace: each filter change is a history entry, so Back
      // steps through them instead of leaving the page.
      // scroll:false keeps the sticky filter bar where the user left it.
      router.push(qs ? `/events?${qs}` : "/events", { scroll: false });
    },
    [router],
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(
        (pending.current ?? params).toString(),
      );
      if (value) next.set(key, value);
      else next.delete(key);
      push(next);
    },
    [params, push],
  );

  const toggleFormat = useCallback(
    (format: EventFormat) => {
      // Read from `pending` too, so two fast taps compose instead of clobbering.
      const current = (pending.current ?? params).get("format");
      const list = current
        ? current
            .split(",")
            .map(formatFromSlug)
            .filter((f): f is EventFormat => Boolean(f))
        : [];
      const next = list.includes(format)
        ? list.filter((f) => f !== format)
        : [...list, format];
      setParam("format", next.length ? next.map(formatSlug).join(",") : null);
    },
    [params, setParam],
  );

  useStaggerReveal(gridRef, `${status}|${formats.join(",")}|${sort}`);

  return (
    <>
      {/* Filter bar. Sticky so filters stay reachable down a long grid; the
          navbar is 72px tall at rest, hence the offset. */}
      <div className="sticky top-[4.5rem] z-30 -mx-5 border-y border-black/8 bg-cream/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <StatusTabs value={status} onChange={(k) => setParam("status", k === "all" ? null : k)} panelId={panelId} />

            <div className="flex items-center gap-3">
              <label htmlFor="event-sort" className="label-caps text-ink-soft/70">
                Sort
              </label>
              <select
                id="event-sort"
                value={sort}
                onChange={(e) => setParam("sort", e.target.value === "oldest" ? "oldest" : null)}
                className="press rounded-full border border-black/8 bg-paper py-2.5 pl-4 pr-8 text-[0.85rem] font-medium text-ink"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Format chips */}
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div
              role="group"
              aria-label="Filter events by format"
              className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap"
            >
              {eventFormats.map((format) => {
                const on = formats.includes(format);
                return (
                  <button
                    key={format}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleFormat(format)}
                    className={cn(
                      "press shrink-0 rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                      on
                        ? "border-transparent bg-ink text-white"
                        : "border-black/8 bg-paper text-ink-soft hover:text-ink",
                    )}
                  >
                    {format}
                  </button>
                );
              })}

              {hasFilters ? (
                <button
                  type="button"
                  onClick={() => push(new URLSearchParams())}
                  className="press shrink-0 rounded-full px-4 py-2 text-[0.82rem] font-medium text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-ink"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p aria-live="polite" className="mt-8 text-[0.9rem] text-ink-soft">
        Showing <span className="font-medium text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "event" : "events"}
        {hasFilters ? " matching your filters" : ""}.
      </p>

      <div id={panelId} role="tabpanel" tabIndex={-1}>
        {results.length ? (
          <div
            ref={gridRef}
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card-sticker mt-6 flex flex-col items-center gap-5 p-12 text-center sm:p-16">
            <h3 className="text-[1.5rem] tracking-[-0.03em]">Nothing matches that yet.</h3>
            <p className="max-w-sm text-[0.975rem] leading-relaxed text-ink-soft">
              That combination has not happened yet. Try a wider filter, or join the
              community to hear about the next one first.
            </p>
            <Button onClick={() => push(new URLSearchParams())} variant="ink">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

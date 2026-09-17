"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MentorCard from "@/components/mentorship/MentorCard";
import ConnectDialog from "@/components/mentorship/ConnectDialog";
import { Button } from "@/components/ui/Button";
import {
  expertiseAreas,
  expertiseFromSlug,
  expertiseSlug,
  queryMentors,
  type Expertise,
  type Mentor,
} from "@/data/mentors";
import { useStaggerReveal } from "@/lib/useStaggerReveal";
import { cn } from "@/lib/cn";

/**
 * Mentor directory. Same URL-backed filter pattern as the events directory:
 * shareable, back-button-correct, with a `pending` ref so two quick chip taps
 * compose instead of clobbering each other while navigation is in flight.
 */
export default function MentorDirectory() {
  const router = useRouter();
  const params = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const [connecting, setConnecting] = useState<Mentor | null>(null);

  const q = params.get("q") ?? "";
  const expertise = useMemo(() => {
    const raw = params.get("expertise");
    if (!raw) return [] as Expertise[];
    return raw
      .split(",")
      .map(expertiseFromSlug)
      .filter((a): a is Expertise => Boolean(a));
  }, [params]);

  const results = useMemo(() => queryMentors({ q, expertise }), [q, expertise]);
  const hasFilters = Boolean(q) || expertise.length > 0;

  const pending = useRef<URLSearchParams | null>(null);
  useEffect(() => {
    pending.current = null;
  }, [params]);

  const push = useCallback(
    (next: URLSearchParams) => {
      pending.current = next;
      const qs = next.toString();
      router.push(qs ? `/mentorship?${qs}` : "/mentorship", { scroll: false });
    },
    [router],
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams((pending.current ?? params).toString());
      if (value) next.set(key, value);
      else next.delete(key);
      push(next);
    },
    [params, push],
  );

  const toggleExpertise = useCallback(
    (area: Expertise) => {
      const current = (pending.current ?? params).get("expertise");
      const list = current
        ? current
            .split(",")
            .map(expertiseFromSlug)
            .filter((a): a is Expertise => Boolean(a))
        : [];
      const next = list.includes(area)
        ? list.filter((a) => a !== area)
        : [...list, area];
      setParam("expertise", next.length ? next.map(expertiseSlug).join(",") : null);
    },
    [params, setParam],
  );

  // The search box is typed into, so it needs local state to stay responsive;
  // the URL is updated on a short debounce rather than on every keystroke.
  const [search, setSearch] = useState(q);

  // When `q` changes from outside - Back, or Clear filters - pull it into the
  // input. Adjusting during render rather than in an effect: React re-runs this
  // component immediately without committing the stale value or painting twice.
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) {
    setLastQ(q);
    setSearch(q);
  }

  useEffect(() => {
    if (search === q) return;
    const id = setTimeout(() => setParam("q", search.trim() || null), 250);
    return () => clearTimeout(id);
  }, [search, q, setParam]);

  useStaggerReveal(gridRef, `${q}|${expertise.join(",")}`);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-sm">
            <label htmlFor="mentor-search" className="sr-only">
              Search mentors
            </label>
            <input
              id="mentor-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company or skill"
              className="w-full rounded-full border border-black/10 bg-paper px-5 py-3 text-[0.9rem] placeholder:text-ink-soft/50 focus:border-brand-blue focus:outline-none"
            />
          </div>

          {hasFilters ? (
            <button
              type="button"
              onClick={() => push(new URLSearchParams())}
              className="press self-start rounded-full px-4 py-2 text-[0.85rem] font-medium text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-ink"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div
            role="group"
            aria-label="Filter mentors by expertise"
            className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap"
          >
            {expertiseAreas.map((area) => {
              const on = expertise.includes(area);
              return (
                <button
                  key={area}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleExpertise(area)}
                  className={cn(
                    "press shrink-0 rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                    on
                      ? "border-transparent bg-ink text-white"
                      : "border-black/8 bg-paper text-ink-soft hover:text-ink",
                  )}
                >
                  {area}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-[0.9rem] text-ink-soft">
        Showing <span className="font-medium text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "mentor" : "mentors"}
        {hasFilters ? " matching your filters" : ""}.
      </p>

      {results.length ? (
        <div ref={gridRef} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} onConnect={setConnecting} />
          ))}
        </div>
      ) : (
        <div className="card-sticker mt-6 flex flex-col items-center gap-5 p-12 text-center sm:p-16">
          <h3 className="text-[1.5rem] tracking-[-0.03em]">No mentor for that yet.</h3>
          <p className="max-w-sm text-[0.975rem] leading-relaxed text-ink-soft">
            The directory is still growing. Try a broader filter, or tell us what you were
            looking for so we can go find someone.
          </p>
          <Button onClick={() => push(new URLSearchParams())} variant="ink">
            Clear filters
          </Button>
        </div>
      )}

      <ConnectDialog mentor={connecting} onClose={() => setConnecting(null)} />
    </>
  );
}

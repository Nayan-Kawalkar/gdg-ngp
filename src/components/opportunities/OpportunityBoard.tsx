"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SegmentTabs from "@/components/ui/SegmentTabs";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import OpportunityDialog from "@/components/opportunities/OpportunityDialog";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  queryOpportunities,
  typeFromSlug,
  typeSlug,
  type Opportunity,
  type OpportunityType,
  type WorkMode,
} from "@/data/opportunities";
import { useStaggerReveal } from "@/lib/useStaggerReveal";
import { cn } from "@/lib/cn";

type TypeKey = "all" | "job" | "internship" | "scholarship" | "help";

const allTypeTabs: { key: TypeKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "job", label: "Jobs" },
  { key: "internship", label: "Internships" },
  { key: "scholarship", label: "Scholarships" },
  { key: "help", label: "1:1 Help" },
];

const modes: WorkMode[] = ["On-site", "Hybrid", "Remote"];

/**
 * The opportunity board. Same URL-backed filter pattern as Events and
 * Mentorship: shareable, Back-correct, and a `pending` ref so fast taps compose
 * while navigation is in flight.
 *
 * `nagpurOnly` + `types` let the Jobs-in-Nagpur page reuse the whole board with
 * a fixed scope instead of maintaining a second copy. `basePath` keeps the URL
 * on whichever page is hosting it.
 */
export default function OpportunityBoard({
  nagpurOnly = false,
  types,
}: {
  nagpurOnly?: boolean;
  types?: OpportunityType[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [open, setOpen] = useState<Opportunity | null>(null);

  const typeTabs = useMemo(
    () =>
      types
        ? allTypeTabs.filter(
            (t) => t.key === "all" || types.some((ty) => typeSlug(ty) === t.key),
          )
        : allTypeTabs,
    [types],
  );

  const typeParam = params.get("type") as TypeKey | null;
  const typeKey: TypeKey =
    typeParam && typeTabs.some((t) => t.key === typeParam) ? typeParam : "all";
  const modeParam = params.get("mode");
  const mode = (modes.find((m) => m.toLowerCase() === modeParam) ?? "all") as WorkMode | "all";
  const q = params.get("q") ?? "";

  const results = useMemo(() => {
    const type = typeKey === "all" ? "all" : (typeFromSlug(typeKey) ?? "all");
    let list = queryOpportunities({ type, mode, q, nagpurOnly });
    if (types && type === "all") list = list.filter((o) => types.includes(o.type));
    return list;
  }, [typeKey, mode, q, nagpurOnly, types]);

  const hasFilters = typeKey !== "all" || mode !== "all" || Boolean(q);

  const pending = useRef<URLSearchParams | null>(null);
  useEffect(() => {
    pending.current = null;
  }, [params]);

  const push = useCallback(
    (next: URLSearchParams) => {
      pending.current = next;
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
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

  // Search keeps local state for responsiveness and debounces into the URL.
  // External changes (Back, Clear) are pulled in during render, not an effect.
  const [search, setSearch] = useState(q);
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

  useStaggerReveal(gridRef, `${typeKey}|${mode}|${q}`);

  return (
    <>
      <div className="flex flex-col gap-4">
        <SegmentTabs
          options={typeTabs}
          value={typeKey}
          onChange={(k) => setParam("type", k === "all" ? null : k)}
          label="Filter opportunities by type"
          panelId={panelId}
          className={typeTabs.length > 3 ? "max-w-2xl" : "max-w-sm"}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1 sm:max-w-sm">
            <label htmlFor={`${panelId}-search`} className="sr-only">
              Search opportunities
            </label>
            <input
              id={`${panelId}-search`}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search role, company or who posted it"
              className="w-full rounded-full border border-black/10 bg-paper px-5 py-3 text-[0.9rem] placeholder:text-ink-soft/50 focus:border-brand-blue focus:outline-none"
            />
          </div>

          <div
            role="group"
            aria-label="Filter by work mode"
            className="flex flex-wrap items-center gap-2"
          >
            {modes.map((m) => {
              const on = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setParam("mode", on ? null : m.toLowerCase())}
                  className={cn(
                    "press rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                    on
                      ? "border-transparent bg-ink text-white"
                      : "border-black/8 bg-paper text-ink-soft hover:text-ink",
                  )}
                >
                  {m}
                </button>
              );
            })}
            {hasFilters ? (
              <button
                type="button"
                onClick={() => push(new URLSearchParams())}
                className="press rounded-full px-3 py-2 text-[0.82rem] font-medium text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-ink"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-[0.9rem] text-ink-soft">
        Showing <span className="font-medium text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "listing" : "listings"}
        {hasFilters ? " matching your filters" : ""}.
      </p>

      <div id={panelId} role="tabpanel" tabIndex={-1}>
        {results.length ? (
          <div ref={gridRef} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <OpportunityCard key={item.id} item={item} onOpen={setOpen} />
            ))}
          </div>
        ) : (
          <div className="card-sticker mt-6 flex flex-col items-center gap-5 p-12 text-center sm:p-16">
            <h3 className="text-[1.5rem] tracking-[-0.03em]">
              {hasFilters ? "Nothing matches that yet." : "Nothing posted here yet."}
            </h3>
            <p className="max-w-sm text-[0.975rem] leading-relaxed text-ink-soft">
              {hasFilters
                ? "Try a wider filter. If you know of something that belongs here, share it."
                : "Listings go up as the community shares them. If you know of something that belongs here, share it."}
            </p>
            {hasFilters ? (
              <Button onClick={() => push(new URLSearchParams())} variant="ink">
                Clear filters
              </Button>
            ) : (
              <ButtonLink href="/opportunities/share" variant="ink">
                Share an opportunity
              </ButtonLink>
            )}
          </div>
        )}
      </div>

      <OpportunityDialog item={open} onClose={() => setOpen(null)} />
    </>
  );
}

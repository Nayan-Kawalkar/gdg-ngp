"use client";

import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SegmentTabs from "@/components/ui/SegmentTabs";
import { Button } from "@/components/ui/Button";
import NewsCard from "@/components/news/NewsCard";
import {
  newsCategories,
  newsCategoryFromSlug,
  newsCategorySlug,
  sortedNews,
} from "@/data/news";
import { useStaggerReveal } from "@/lib/useStaggerReveal";

const tabs = [
  { key: "all", label: "All" },
  ...newsCategories.map((c) => ({ key: newsCategorySlug(c), label: c })),
];

/**
 * Category-filtered news grid. Same URL-backed filter pattern as the other
 * boards (`?category=ai`), so a filtered view can be shared.
 *
 * On "All" the lead story is left out - the page already shows it big above.
 */
export default function NewsBoard({ leadId }: { leadId?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const categoryParam = params.get("category") ?? "";
  const category = newsCategoryFromSlug(categoryParam);
  const key = category ? newsCategorySlug(category) : "all";

  const results = useMemo(() => {
    const all = sortedNews();
    return category ? all.filter((n) => n.category === category) : all.filter((n) => n.id !== leadId);
  }, [category, leadId]);

  // Same guard as OpportunityBoard: fast taps compose while navigation is in flight.
  const pending = useRef<string | null>(null);
  useEffect(() => {
    pending.current = null;
  }, [params]);

  const select = useCallback(
    (next: string) => {
      if (pending.current === next) return;
      pending.current = next;
      router.push(next === "all" ? pathname : `${pathname}?category=${next}`, { scroll: false });
    },
    [router, pathname],
  );

  useStaggerReveal(gridRef, key);

  return (
    <>
      {/* Seven tabs do not fit 375px at a readable size, so the bar scrolls
          sideways on small screens instead of squeezing the labels. */}
      {/* .mask-edges-x sets both mask properties, so both are cleared from sm up. */}
      <div className="mask-edges-x -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 sm:[-webkit-mask-image:none] sm:[mask-image:none]">
        <SegmentTabs
          options={tabs}
          value={key}
          onChange={select}
          label="Filter news by category"
          panelId={panelId}
          className="min-w-[38rem] max-w-3xl"
        />
      </div>

      <p aria-live="polite" className="mt-8 text-[0.9rem] text-ink-soft">
        Showing <span className="font-medium text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "story" : "stories"}
        {category ? ` in ${category}` : ""}.
      </p>

      <div id={panelId} role="tabpanel" tabIndex={-1}>
        {results.length ? (
          <div ref={gridRef} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <NewsCard key={item.id} item={item} revealItem={false} />
            ))}
          </div>
        ) : (
          <div className="card-sticker mt-6 flex flex-col items-center gap-5 p-12 text-center sm:p-16">
            <h3 className="text-[1.5rem] tracking-[-0.03em]">Nothing in {category} yet.</h3>
            <p className="max-w-sm text-[0.975rem] leading-relaxed text-ink-soft">
              The organizers add stories every week. Try another category for now.
            </p>
            <Button onClick={() => select("all")} variant="ink">
              Show everything
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import Dialog from "@/components/ui/Dialog";
import { ButtonLink } from "@/components/ui/Button";
import { typeTint } from "@/components/opportunities/OpportunityCard";
import { placeLabel, type Opportunity } from "@/data/opportunities";
import { formatNewsDate } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Listing detail. No per-listing pages: these are short-lived and link out
 * anyway, so a dialog keeps the board in place behind it.
 */
export default function OpportunityDialog({
  item,
  onClose,
}: {
  item: Opportunity | null;
  onClose: () => void;
}) {
  const isHelp = item?.type === "1:1 Help";

  return (
    <Dialog
      open={Boolean(item)}
      onClose={onClose}
      title={item?.title ?? ""}
      description={item && !isHelp ? item.company : undefined}
    >
      {item ? (
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "label-caps inline-flex rounded-full px-3 py-1.5 text-[0.66rem]",
                typeTint[item.type],
              )}
            >
              {item.type}
            </span>
            <span className="rounded-full bg-ink/5 px-3 py-1.5 text-[0.78rem] font-medium text-ink-soft">
              {placeLabel(item)}
            </span>
          </div>

          <p className="mt-6 text-[0.975rem] leading-[1.75] text-ink-soft">
            {item.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-cream p-5 text-[0.85rem]">
            <div>
              <dt className="label-caps text-ink-soft/60">Posted</dt>
              <dd className="mt-1.5 font-medium">{formatNewsDate(item.postedAt)}</dd>
            </div>
            <div>
              <dt className="label-caps text-ink-soft/60">Closes</dt>
              <dd className="mt-1.5 font-medium">
                {item.deadline ? formatNewsDate(item.deadline) : "Open until filled"}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="label-caps text-ink-soft/60">
                {isHelp ? "Asked by" : "Shared by"}
              </dt>
              <dd className="mt-1.5 font-medium">
                {item.postedBy}
                {item.posterRole ? (
                  <span className="font-normal text-ink-soft"> &middot; {item.posterRole}</span>
                ) : null}
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink href={item.applyUrl} variant="ink" magnetic={false}>
              {isHelp ? "Offer to help" : "Apply"}
            </ButtonLink>
            <p className="text-[0.82rem] text-ink-soft">
              {isHelp
                ? "Goes to the person who asked."
                : "Opens the employer's own application page."}
            </p>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

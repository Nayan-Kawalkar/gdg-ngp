"use client";

import { IconClock, IconPin } from "@/components/ui/Icons";
import { ArrowIcon } from "@/components/ui/Button";
import type { Opportunity, OpportunityType } from "@/data/opportunities";
import { formatNewsDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export const typeTint: Record<OpportunityType, string> = {
  Job: "bg-brand-blue text-white",
  Internship: "bg-brand-green text-white",
  Scholarship: "bg-brand-yellow text-ink",
  "1:1 Help": "bg-brand-red text-white",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/**
 * One listing. The whole card is a button that opens the detail dialog; the
 * poster is credited on every card because PRD 5.5 asks for exactly that.
 * 1:1 help requests are a person asking rather than a company offering, so
 * they lead with the person instead of a company line.
 */
export default function OpportunityCard({
  item,
  onOpen,
}: {
  item: Opportunity;
  onOpen: (item: Opportunity) => void;
}) {
  const isHelp = item.type === "1:1 Help";

  return (
    <article className="card-sticker card-pop group relative flex flex-col p-7 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "label-caps inline-flex rounded-full px-3 py-1.5 text-[0.66rem]",
            typeTint[item.type],
          )}
        >
          {item.type}
        </span>
        <time dateTime={item.postedAt} className="text-[0.78rem] text-ink-soft/70">
          {formatNewsDate(item.postedAt)}
        </time>
      </div>

      <h3 className="mt-5 text-[1.25rem] leading-[1.15] tracking-[-0.03em]">
        {/* Stretched button: the whole card is the hit target without nesting
            interactive elements inside each other. */}
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="text-left after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
        >
          {item.title}
        </button>
      </h3>

      {!isHelp ? (
        <p className="mt-2 text-[0.925rem] text-ink-soft">{item.company}</p>
      ) : null}

      <p className="mt-4 line-clamp-2 text-[0.9rem] leading-[1.7] text-ink-soft">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.82rem] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <IconPin className="size-3.5 text-ink-soft/50" />
          {item.city} &middot; {item.workMode}
        </span>
        {item.deadline ? (
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="size-3.5 text-ink-soft/50" />
            Closes {formatNewsDate(item.deadline)}
          </span>
        ) : null}
      </div>

      <div className="mt-auto pt-6">
        <hr className="rule-hair" />
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-[0.7rem] font-medium text-ink-soft"
            >
              {initials(item.postedBy)}
            </span>
            <span className="min-w-0 truncate text-[0.82rem] text-ink-soft">
              {isHelp ? "Asked by" : "Posted by"}{" "}
              <span className="font-medium text-ink">{item.postedBy}</span>
            </span>
          </div>
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-colors duration-400 group-hover:bg-ink group-hover:text-white"
          >
            <ArrowIcon className="size-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

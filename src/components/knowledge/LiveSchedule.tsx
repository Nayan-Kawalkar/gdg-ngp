import { ArrowIcon } from "@/components/ui/Button";
import { liveSessions } from "@/data/knowledge";
import { socials } from "@/data/site";
import { cn } from "@/lib/cn";

const day = new Intl.DateTimeFormat("en-IN", { day: "numeric", timeZone: "UTC" });
const month = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "UTC" });
const weekday = new Intl.DateTimeFormat("en-IN", { weekday: "long", timeZone: "UTC" });

/**
 * Upcoming YouTube Lives as a dated list. The first row is flagged "Up next"
 * with the same live ping the home hero uses. Every row links to the channel,
 * where YouTube's own "Notify me" does the reminding.
 */
export default function LiveSchedule() {
  const sessions = [...liveSessions].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <ol data-reveal-group className="mt-12 space-y-3">
      {sessions.map((session, i) => {
        const date = new Date(`${session.date}T00:00:00Z`);
        const next = i === 0;
        return (
          <li key={session.id} data-reveal-item>
            <a
              href={socials.youtube}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "card-pop group flex items-center gap-5 p-4 pr-5 sm:gap-7 sm:p-5 sm:pr-7",
                next ? "card-sticker-dark bg-ink-deep text-white" : "card-sticker",
              )}
            >
              <time
                dateTime={session.date}
                className={cn(
                  "flex size-18 shrink-0 flex-col items-center justify-center rounded-[1.4rem] sm:size-20",
                  next ? "bg-white/10" : "bg-cream-dark",
                )}
              >
                <span className="font-heading text-[1.75rem] leading-none tracking-[-0.04em]">
                  {day.format(date)}
                </span>
                <span
                  className={cn(
                    "label-caps mt-1 text-[0.62rem]",
                    next ? "text-white/60" : "text-ink-soft/70",
                  )}
                >
                  {month.format(date)}
                </span>
              </time>

              <span className="min-w-0 flex-1">
                {next ? (
                  <span className="mb-1.5 flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/60">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-70" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-brand-green" />
                    </span>
                    Up next
                  </span>
                ) : null}
                <span className="block font-heading text-[1.1rem] leading-snug tracking-[-0.02em] sm:text-[1.25rem]">
                  {session.title}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[0.82rem]",
                    next ? "text-white/55" : "text-ink-soft",
                  )}
                >
                  {weekday.format(date)}, {session.time} &middot; {session.host} &middot;{" "}
                  {session.level}
                </span>
              </span>

              <span
                className={cn(
                  "hidden shrink-0 items-center gap-2 text-[0.85rem] font-medium sm:inline-flex",
                  next ? "text-white" : "text-ink",
                )}
              >
                Remind me
                <ArrowIcon className="size-3.5 -rotate-45" />
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { IconClock, IconPin, IconUsers } from "@/components/ui/Icons";
import { Ring } from "@/components/ui/Shapes";
import { formatEventDate, formatEventDateLong } from "@/lib/format";
import type { GdgEvent } from "@/data/events";
import { cn } from "@/lib/cn";

const accents: Record<
  GdgEvent["accent"],
  { tint: string; core: string; deep: string; ink: string }
> = {
  blue: { tint: "bg-blue-mist", core: "bg-brand-blue", deep: "text-blue-deep", ink: "text-blue-200" },
  red: { tint: "bg-red-mist", core: "bg-brand-red", deep: "text-red-deep", ink: "text-red-200" },
  yellow: { tint: "bg-yellow-mist", core: "bg-brand-yellow", deep: "text-amber", ink: "text-yellow-200" },
  green: { tint: "bg-green-mist", core: "bg-brand-green", deep: "text-green-deep", ink: "text-green-200" },
};

const statusLabel: Record<GdgEvent["status"], string> = {
  ongoing: "Happening now",
  upcoming: "Upcoming",
  past: "Past",
};

/**
 * Event card. Banner is a flat tonal placeholder by design (see DESIGN.md) -
 * it swaps to `event.imageUrl` automatically once real posters exist.
 */
export default function EventCard({ event }: { event: GdgEvent }) {
  const accent = accents[event.accent];
  const href = event.status === "past" ? (event.recapUrl ?? "#") : (event.registerUrl ?? "#");

  return (
    <article
      data-reveal-item
      className="card-sticker group relative flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
    >
      {/* Banner */}
      <div className={cn("relative h-40 overflow-hidden sm:h-44", accent.tint)}>
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt=""
            className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          /* Flat tonal placeholder: one concentric motif anchored off the bottom-right
             corner, so it reads as deliberate geometry rather than stray blobs. */
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-16 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          >
            <Ring className={cn("w-56 opacity-45", accent.ink)} />
            <span
              className={cn(
                "absolute left-1/2 top-1/2 block size-16 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60",
                accent.core,
              )}
            />
          </div>
        )}

        <span className="chip absolute left-4 top-4 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.1em]">
          {event.format}
        </span>

        <span
          className={cn(
            "chip absolute bottom-4 left-4 px-3 py-1.5 text-[0.72rem]",
            event.status === "ongoing" && "text-green-deep",
            event.status === "upcoming" && accent.deep,
          )}
        >
          {event.status === "ongoing" ? (
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-green" />
            </span>
          ) : null}
          {statusLabel[event.status]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <time
          dateTime={event.date}
          title={formatEventDateLong(event)}
          className="font-heading text-[0.85rem] font-medium uppercase tracking-[0.12em] text-ink-soft"
        >
          {formatEventDate(event)}
        </time>

        <h3 className="mt-3 text-[1.35rem] leading-[1.1] sm:text-[1.5rem]">{event.title}</h3>

        <p className="mt-3 line-clamp-3 text-[0.925rem] leading-relaxed text-ink-soft">
          {event.summary}
        </p>

        <dl className="mt-5 space-y-2 text-[0.85rem] text-ink-soft">
          <div className="flex items-start gap-2">
            <dt className="sr-only">Venue</dt>
            <IconPin className="mt-px size-4 shrink-0 text-ink-soft/60" />
            <dd>{event.venue}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Time</dt>
            <IconClock className="mt-px size-4 shrink-0 text-ink-soft/60" />
            <dd>{event.time}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Capacity</dt>
            <IconUsers className="mt-px size-4 shrink-0 text-ink-soft/60" />
            <dd>
              {event.attended
                ? `${event.attended} attended`
                : `${event.capacity} seats`}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between border-t border-black/8 pt-5">
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-2 font-heading text-[0.95rem] font-medium"
          >
            {event.status === "past" ? "View recap" : "Register"}
            <ArrowIcon className="size-4 group-hover/cta:translate-x-1" />
          </Link>
          <span
            aria-hidden="true"
            className={cn("size-2.5 rounded-full", accent.core)}
          />
        </div>
      </div>
    </article>
  );
}

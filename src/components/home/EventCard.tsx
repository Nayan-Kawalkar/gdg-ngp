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
  blue: {
    tint: "bg-blue-mist",
    core: "bg-brand-blue",
    deep: "text-blue-deep",
    ink: "text-blue-200",
  },
  red: {
    tint: "bg-red-mist",
    core: "bg-brand-red",
    deep: "text-red-deep",
    ink: "text-red-200",
  },
  yellow: {
    tint: "bg-yellow-mist",
    core: "bg-brand-yellow",
    deep: "text-amber",
    ink: "text-yellow-200",
  },
  green: {
    tint: "bg-green-mist",
    core: "bg-brand-green",
    deep: "text-green-deep",
    ink: "text-green-200",
  },
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
  // Always route to the detail page: that is where the real registration or
  // recap link lives, so the card never duplicates an outbound URL.
  const href = `/events/${event.slug}`;

  const meta = [
    { Icon: IconPin, label: "Venue", value: event.venue },
    { Icon: IconClock, label: "Time", value: event.time },
    {
      Icon: IconUsers,
      label: "Capacity",
      value: event.attended ? `${event.attended} attended` : `${event.capacity} seats`,
    },
  ];

  return (
    <article
      data-reveal-item
      className="card-sticker card-pop group relative flex flex-col overflow-hidden"
    >
      {/* Banner */}
      <div className={cn("relative h-44 overflow-hidden sm:h-48", accent.tint)}>
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt=""
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          /* Flat tonal placeholder: one concentric motif anchored off the bottom-right
             corner, so it reads as deliberate geometry rather than stray blobs. */
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-16 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
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

        {/* Barely-there vignette so chips always sit on a settled ground */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/[0.04]"
        />

        <span className="chip label-caps absolute left-5 top-5 px-3 py-1.5 text-[0.68rem]">
          {event.format}
        </span>

        <span
          className={cn(
            "chip absolute bottom-5 left-5 px-3 py-1.5 text-[0.72rem] font-medium",
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
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <time
            dateTime={event.date}
            title={formatEventDateLong(event)}
            className="label-caps text-ink-soft"
          >
            {formatEventDate(event)}
          </time>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full transition-transform duration-500 group-hover:scale-150",
              accent.core,
            )}
          />
        </div>

        <h3 className="mt-4 text-[1.4rem] leading-[1.08] tracking-[-0.03em] sm:text-[1.55rem]">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {event.title}
          </Link>
        </h3>

        <p className="mt-3.5 line-clamp-3 text-[0.925rem] leading-[1.7] text-ink-soft">
          {event.summary}
        </p>

        <dl className="mt-7 space-y-3 text-[0.85rem] text-ink-soft">
          {meta.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5">
              <dt className="sr-only">{label}</dt>
              <Icon className="mt-px size-4 shrink-0 text-ink-soft/50" />
              <dd className="leading-snug">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-8">
          <hr className="rule-hair" />
          <span
            aria-hidden="true"
            className="mt-5 inline-flex items-center gap-2 font-heading text-[0.95rem] font-medium tracking-[-0.01em]"
          >
            {event.status === "past" ? "View recap" : "Register"}
            <span className="flex size-7 items-center justify-center rounded-full bg-ink/5 transition-colors duration-400 group-hover:bg-ink group-hover:text-white">
              <ArrowIcon className="size-3.5" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

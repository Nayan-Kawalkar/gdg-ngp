import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Ring } from "@/components/ui/Shapes";
import { IconCalendar, IconClock, IconPin, IconUsers } from "@/components/ui/Icons";
import { formatEventDateLong } from "@/lib/format";
import type { GdgEvent } from "@/data/events";
import { cn } from "@/lib/cn";

const accents = {
  blue: { tint: "bg-blue-mist", core: "bg-brand-blue", ink: "text-blue-200", deep: "text-blue-deep" },
  red: { tint: "bg-red-mist", core: "bg-brand-red", ink: "text-red-200", deep: "text-red-deep" },
  yellow: { tint: "bg-yellow-mist", core: "bg-brand-yellow", ink: "text-yellow-200", deep: "text-amber" },
  green: { tint: "bg-green-mist", core: "bg-brand-green", ink: "text-green-200", deep: "text-green-deep" },
} as const;

export default function EventDetailHero({ event }: { event: GdgEvent }) {
  const accent = accents[event.accent];
  const isPast = event.status === "past";

  const facts = [
    { Icon: IconCalendar, label: "Date", value: formatEventDateLong(event) },
    { Icon: IconClock, label: "Time", value: event.time },
    { Icon: IconPin, label: "Venue", value: event.venue },
    {
      Icon: IconUsers,
      label: isPast ? "Attendance" : "Capacity",
      value: isPast ? `${event.attended} attended` : `${event.capacity} seats`,
    },
  ];

  return (
    <section className={cn("relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pt-40", accent.tint)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 w-[30rem] lg:w-[40rem]"
      >
        <Ring className={cn("w-full opacity-40", accent.ink)} />
      </div>

      <Container className="relative">
        <Link
          href="/events"
          className="press group inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-soft hover:text-ink"
        >
          <ArrowIcon className="size-4 rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" />
          All events
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="chip label-caps bg-paper px-3.5 py-2 text-[0.68rem]">
            {event.format}
          </span>
          <span
            className={cn(
              "chip bg-paper px-3.5 py-2 text-[0.75rem] font-medium",
              event.status === "ongoing" ? "text-green-deep" : accent.deep,
            )}
          >
            {event.status === "ongoing" ? (
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-green" />
              </span>
            ) : null}
            {event.status === "ongoing"
              ? "Happening now"
              : event.status === "upcoming"
                ? "Upcoming"
                : "Past event"}
          </span>
        </div>

        <h1
          data-motion-text="words"
          data-motion-delay="0.1"
          className="mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.98]"
        >
          {event.title}
        </h1>

        <p
          data-reveal="fade-up"
          data-reveal-delay="0.35"
          className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.15rem]"
        >
          {event.summary}
        </p>

        <div data-reveal="fade-up" data-reveal-delay="0.45" className="mt-10">
          {isPast ? (
            <ButtonLink href={event.recapUrl ?? "#"} variant="ink" size="lg">
              View the recap
            </ButtonLink>
          ) : (
            <div className="flex flex-row flex-wrap items-center gap-3">
              <ButtonLink href={event.registerUrl ?? "#"} variant="ink" size="lg">
                Register free
              </ButtonLink>
              <span className="text-[0.875rem] text-ink-soft">
                {event.capacity} seats &middot; first come, first served
              </span>
            </div>
          )}
        </div>

        <dl
          data-reveal="fade-up"
          data-reveal-delay="0.55"
          className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-ink/8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map(({ Icon, label, value }) => (
            <div key={label} className={cn("p-6 sm:p-7", accent.tint)}>
              <dt className="label-caps flex items-center gap-2 text-ink-soft/70">
                <Icon className="size-4" />
                {label}
              </dt>
              <dd className="mt-3 text-[0.975rem] font-medium leading-snug">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

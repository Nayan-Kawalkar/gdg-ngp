"use client";

import Link from "next/link";
import { useSyncExternalStore, type CSSProperties } from "react";
import { Plane } from "@/components/devfest/icons";
import { navSpotlight } from "@/data/site";
import { cn } from "@/lib/cn";

const DAY = 86_400_000;

// The badge only changes at day boundaries; checking once a minute is plenty.
function subscribeMinute(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}
const currentMinute = () => Math.floor(Date.now() / 60_000);

/**
 * "77 days", "1 day", "Tomorrow", then "Live now" during the event, and
 * nothing once it has ended. Null on the server and during hydration, so the
 * static HTML never carries a stale count.
 */
function useCountdown(): string | null {
  const minute = useSyncExternalStore(subscribeMinute, currentMinute, () => null);
  if (minute === null || !navSpotlight) return null;
  const now = minute * 60_000;
  const start = Date.parse(navSpotlight.startsAt);
  if (now >= Date.parse(navSpotlight.endsAt)) return null;
  if (now >= start) return "Live now";
  const days = Math.floor((start - now) / DAY);
  return days === 0 ? "Tomorrow" : days === 1 ? "1 day" : `${days} days`;
}

const gradient = "bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))]";

/**
 * Desktop navbar pill. Compact ("DevFest") from 1024px, full with the
 * countdown from 1280px, where the bar has the room.
 */
export function SpotlightPill() {
  const countdown = useCountdown();
  if (!navSpotlight) return null;
  return (
    <Link
      href={navSpotlight.href}
      className={cn(
        "press group mx-1 inline-flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-3 text-[0.86rem] font-medium text-white shadow-[0_8px_18px_-10px_rgba(254,76,1,0.85)] transition-[filter,transform] duration-300 hover:brightness-105 xl:gap-2 xl:text-[0.9rem]",
        gradient,
        // hug the badge when there is one
        countdown ? "xl:pr-1.5" : "xl:pr-3.5",
      )}
    >
      <Plane
        aria-hidden="true"
        className="size-4 -rotate-12 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="xl:hidden">{navSpotlight.short}</span>
      <span className="hidden xl:inline">{navSpotlight.label}</span>
      {countdown ? (
        <span className="hidden rounded-full bg-white/20 px-2 py-0.5 text-[0.72rem] font-semibold tabular-nums xl:inline">
          {countdown}
          {countdown.endsWith("day") || countdown.endsWith("days") ? <span className="sr-only"> to go</span> : null}
        </span>
      ) : null}
    </Link>
  );
}

/** The phone and tablet menu's first item: a full-width orange card. */
export function SpotlightCard({
  onNavigate,
  className,
  style,
}: {
  onNavigate: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  const countdown = useCountdown();
  if (!navSpotlight) return null;
  return (
    <Link
      href={navSpotlight.href}
      onClick={onNavigate}
      style={style}
      className={cn(
        "press group flex items-center justify-between gap-4 rounded-3xl px-4 py-3.5 text-white shadow-[0_16px_30px_-18px_rgba(254,76,1,0.9)]",
        gradient,
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20">
          <Plane className="size-5 -rotate-12" />
        </span>
        <span>
          <span className="block font-heading text-[1.35rem] leading-tight tracking-[-0.02em]">
            {navSpotlight.label}
          </span>
          <span className="block text-[0.85rem] text-white/85">
            {navSpotlight.when}
            {countdown ? ` · ${countdown}${countdown.endsWith("day") || countdown.endsWith("days") ? " to go" : ""}` : ""}
          </span>
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-[1.3rem] transition-transform duration-300 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}

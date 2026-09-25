"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import SplitFlap from "@/components/devfest/SplitFlap";
import { Container } from "@/components/ui/Section";
import { Plane } from "@/components/devfest/icons";
import { boardingStrip, devfestDates } from "@/data/devfest";
import { cn } from "@/lib/cn";

const START = Date.parse(devfestDates.start);
const END = Date.parse(devfestDates.end);
const pad = (n: number, width: number) => String(n).padStart(width, "0");
const nagpurClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

type Phase = "before" | "during" | "after";

function readBoard(now: number | null) {
  // Before the first client tick (and on the server) the board shows dashes,
  // so the markup cannot disagree with hydration; the flaps then roll to
  // the real values - the board "powering on".
  if (now === null) return { phase: "before" as Phase, departs: "---D --H --M --S", clock: "--:--", days: null };
  const phase: Phase = now < START ? "before" : now < END ? "during" : "after";
  const left = Math.max(0, Math.floor((START - now) / 1000));
  const d = Math.floor(left / 86400);
  const departs =
    phase === "before"
      ? `${pad(d, 3)}D ${pad(Math.floor((left % 86400) / 3600), 2)}H ${pad(Math.floor((left % 3600) / 60), 2)}M ${pad(left % 60, 2)}S`
      : phase === "during"
        ? "BOARDING NOW"
        : "ARRIVED";
  return { phase, departs, clock: nagpurClock.format(now), days: d };
}

/**
 * The md's "strip under hero", run as an airport departures board along the
 * foot of the hero: flight DF26 to NEXT, the four strip lines taking turns in
 * the status column, a live countdown to 12 December and Nagpur's local time.
 * It only ticks while it is on screen and the tab is visible.
 */
export default function FlightBoard() {
  const board = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<number | null>(null);
  const [line, setLine] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    let onScreen = false;
    const update = () => setLive(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const clock = window.setInterval(tick, 1000);
    const status = window.setInterval(() => setLine((i) => (i + 1) % boardingStrip.length), 3800);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(clock);
      window.clearInterval(status);
    };
  }, [live]);

  const { phase, departs, clock, days } = readBoard(now);
  const status = phase === "before" ? boardingStrip[line] : phase === "during" ? "Now boarding" : "Landed";

  return (
    <div
      ref={board}
      role="region"
      aria-label="Departures board"
      className="relative z-10 overflow-hidden bg-df-midnight/95 text-white backdrop-blur-sm"
    >
      {/* faint scan lines, like a display panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(0deg,white_0_1px,transparent_1px_4px)]"
      />
      <Container className="relative flex flex-wrap items-end gap-x-6 gap-y-3.5 py-4 sm:py-5 xl:flex-nowrap xl:gap-x-8">
        <div className="flex basis-full items-center justify-between gap-4 sm:contents">
          <p className="flex items-center gap-2 self-center font-df text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-df-amber">
            <Plane aria-hidden="true" className="size-5 -rotate-12" />
            Departures
          </p>
          <BoardCell label="Nagpur time" className="sm:order-last sm:ml-auto">
            <SplitFlap text={clock} length={5} label={now === null ? "Loading" : clock} className="text-[0.8rem] xl:text-[0.9rem]" />
          </BoardCell>
        </div>
        <BoardCell label="Flight">
          <SplitFlap text="DF26" className="text-[3.3vw] sm:text-[0.8rem] xl:text-[0.9rem]" />
        </BoardCell>
        <BoardCell label="To">
          <SplitFlap text="NEXT" label="Next - what's next" className="text-[3.3vw] sm:text-[0.8rem] xl:text-[0.9rem]" />
        </BoardCell>
        <BoardCell label="Status" className="basis-full sm:basis-auto">
          <SplitFlap
            text={status}
            length={23}
            label={phase === "before" ? boardingStrip.join(" · ") : status}
            className="text-[2.85vw] [--flap-fg:var(--color-df-amber)] sm:text-[0.8rem] xl:text-[0.9rem]"
          />
        </BoardCell>
        <BoardCell label={phase === "before" ? "Departs in" : "Flight status"} className="basis-full sm:basis-auto">
          <SplitFlap
            text={departs}
            length={16}
            label={days === null ? "Counting down to 12 December" : phase === "before" ? `${days} days to 12 December` : departs}
            className="text-[3.3vw] sm:text-[0.8rem] xl:text-[0.9rem]"
          />
        </BoardCell>
      </Container>
    </div>
  );
}

function BoardCell({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-1.5 font-df text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</p>
      {children}
    </div>
  );
}

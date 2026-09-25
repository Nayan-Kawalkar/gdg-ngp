"use client";

import { useEffect, useRef, useState } from "react";
import Stamp from "@/components/devfest/Stamp";
import { Close, PassportBook, Plane } from "@/components/devfest/icons";
import { devfestRoutes, type Route } from "@/data/devfest";
import { ROUTE_COUNT, onStamp, resetPassport, usePassport, type RouteId } from "@/lib/devfest/passport";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const routeById = Object.fromEntries(devfestRoutes.map((r) => [r.id, r])) as Record<RouteId, Route>;

/**
 * The visitor's DevFest Passport, floating bottom-right once they are past
 * the hero. Opening a route (RoutesSection) stamps it here; each new stamp
 * shows a toast, and the fifth sends a plane across the screen - cleared for
 * take-off. The passport itself opens as a small two-page booklet.
 */
export default function PassportWidget() {
  const passport = usePassport();
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [toast, setToast] = useState<{ id: RouteId; total: number } | null>(null);
  const [fresh, setFresh] = useState<RouteId | null>(null);
  const [bouncing, setBouncing] = useState(false);
  const [takeoff, setTakeoff] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  const count = passport.stamps.length;
  const complete = count === ROUTE_COUNT;
  const shown = pastHero || open || count > 0;

  // Appear once the hero is mostly scrolled away.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setPastHero(entry.intersectionRatio < 0.4), {
      threshold: [0, 0.4, 1],
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // React to new stamps.
  useEffect(() => {
    let hide = 0;
    const off = onStamp((id, total) => {
      setToast({ id, total });
      setFresh(id);
      setBouncing(true);
      if (total === ROUTE_COUNT && !prefersReducedMotion()) setTakeoff(true);
      window.clearTimeout(hide);
      hide = window.setTimeout(() => setToast(null), total === ROUTE_COUNT ? 5200 : 3200);
    });
    return () => {
      off();
      window.clearTimeout(hide);
    };
  }, []);

  // Focus into the booklet when it opens; Escape closes it.
  useEffect(() => {
    if (!open) return;
    closer.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcher.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  return (
    <>
      <button
        ref={launcher}
        type="button"
        inert={!shown}
        onClick={() => setOpen((o) => !o)}
        onAnimationEnd={() => setBouncing(false)}
        aria-expanded={open}
        aria-controls="devfest-passport"
        aria-label={`Your DevFest Passport: ${count} of ${ROUTE_COUNT} stamps`}
        className={cn(
          "press fixed bottom-5 right-5 z-[55] flex items-center gap-2.5 rounded-full bg-df-midnight py-1.5 pl-1.5 pr-4 text-white shadow-[0_18px_36px_-14px_rgba(4,30,68,0.7)] ring-1 ring-white/15 transition-[opacity,translate] duration-500 sm:bottom-6 sm:right-6",
          shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
          bouncing && "df-bounce",
        )}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))]">
          <PassportBook aria-hidden="true" className="size-5" />
        </span>
        <span className="font-df text-[0.85rem] font-semibold">Passport</span>
        <span
          aria-hidden="true"
          className={cn(
            "rounded-full px-2 py-0.5 font-df text-[0.72rem] font-semibold tabular-nums",
            complete ? "bg-df-amber text-white" : "bg-white/15",
          )}
        >
          {count}/{ROUTE_COUNT}
        </span>
      </button>

      {/* New-stamp toast. The live region is always there, so it is announced. */}
      <div role="status" aria-live="polite" className="fixed bottom-[5.5rem] right-5 z-[55] sm:bottom-24 sm:right-6">
        {toast ? (
          <div className="df-fade-up flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(4,30,68,0.55)] ring-1 ring-df-mist">
            <Stamp route={routeById[toast.id]} className="size-12" />
            <p className="text-[0.85rem] leading-snug text-df-slate">
              <span className="block font-df font-semibold text-df-navy">
                {toast.total === ROUTE_COUNT ? "Passport complete!" : "Stamp collected"}
              </span>
              {toast.total === ROUTE_COUNT
                ? "All five routes. You're cleared for take-off."
                : `${routeById[toast.id].name} route · ${toast.total} of ${ROUTE_COUNT}`}
            </p>
          </div>
        ) : null}
      </div>

      {open ? (
        <div
          id="devfest-passport"
          role="dialog"
          aria-labelledby="devfest-passport-title"
          className="df-fade-up fixed inset-x-4 bottom-24 z-[56] mx-auto max-w-[32rem] sm:inset-x-auto sm:bottom-28 sm:right-6"
        >
          <div className="rounded-[1.6rem] bg-df-midnight p-2 shadow-[0_30px_70px_-20px_rgba(4,30,68,0.75)]">
            <div className="grid overflow-hidden rounded-[1.2rem] bg-df-paper bg-[repeating-radial-gradient(circle_at_50%_130%,transparent_0_11px,rgb(5_78_174/0.04)_11px_12px)] sm:grid-cols-[0.85fr_1.15fr]">
              {/* Left page: the holder */}
              <div className="relative border-b border-dashed border-df-steel/50 p-5 sm:border-b-0 sm:border-r">
                <span className="flex size-11 items-center justify-center rounded-full border-2 border-df-amber text-df-amber">
                  <Plane aria-hidden="true" className="size-5 -rotate-12" />
                </span>
                <h2 id="devfest-passport-title" className="mt-3 font-df text-[1.1rem] font-bold text-df-navy">
                  DevFest Passport
                </h2>
                <p className="font-df text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-df-slate">
                  NAG &rarr; NEXT &middot; Flight DF26
                </p>
                <p className="mt-4 font-df text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-df-slate/80">
                  Holder
                </p>
                <p className="truncate font-df text-[1rem] font-semibold text-df-navy">
                  {passport.name || (
                    <a href="#check-in" onClick={close} className="text-df-blue underline underline-offset-2">
                      Add your name at check-in
                    </a>
                  )}
                </p>
                <p className="mt-3 font-df text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-df-slate/80">
                  Valid
                </p>
                <p className="font-df text-[0.9rem] font-semibold text-df-navy">12 &amp; 13 December 2026</p>
              </div>

              {/* Right page: the five route stamps */}
              <div className="p-5">
                <p className="font-df text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-df-slate/80">
                  Route stamps &middot; {count} of {ROUTE_COUNT}
                </p>
                <ul className="mt-3 grid grid-cols-3 gap-2">
                  {devfestRoutes.map((route) => {
                    const has = passport.stamps.includes(route.id);
                    return (
                      <li key={route.id} className="relative aspect-square">
                        {has ? (
                          <Stamp route={route} fresh={fresh === route.id} className="size-full" />
                        ) : (
                          <span className="flex size-full items-center justify-center rounded-full border-2 border-dashed border-df-steel/60 text-center font-df text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-df-steel">
                            {route.name}
                          </span>
                        )}
                        <span className="sr-only">
                          {route.name}: {has ? "stamped" : "not stamped yet"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Status and next step, on the cover */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-3 text-white">
              <p className="text-[0.85rem] leading-snug text-white/80">
                {complete
                  ? "Passport complete. You're cleared for take-off!"
                  : count === 0
                    ? "Open each of the five routes to collect its stamp."
                    : `${ROUTE_COUNT - count} route${ROUTE_COUNT - count === 1 ? "" : "s"} to go.`}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={complete ? "#check-in" : "#routes"}
                  onClick={close}
                  className="press inline-flex h-9 items-center rounded-full bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] px-4 font-df text-[0.8rem] font-semibold"
                >
                  {complete ? "Print your boarding pass" : "Go to the routes"}
                </a>
                <button
                  ref={closer}
                  type="button"
                  onClick={close}
                  aria-label="Close passport"
                  className="press flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Close aria-hidden="true" className="size-4" />
                </button>
              </div>
              {count > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    resetPassport();
                    setFresh(null);
                  }}
                  className="basis-full text-left text-[0.72rem] text-white/45 underline underline-offset-2 hover:text-white/80"
                >
                  Start a new passport
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {takeoff ? <Takeoff onDone={() => setTakeoff(false)} /> : null}
    </>
  );
}

/**
 * The fifth stamp's reward: a plane climbs across the whole screen on a
 * dashed trail, and stamps' worth of confetti bursts from the passport.
 */
function Takeoff({ onDone }: { onDone: () => void }) {
  const plane = useRef<HTMLSpanElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const confetti = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);

  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const d = `M ${-90} ${h * 0.82} C ${w * 0.32} ${h * 0.8}, ${w * 0.58} ${h * 0.5}, ${w + 90} ${h * 0.1}`;
    trail.current?.setAttribute("d", d);
    const flight = plane.current;
    if (!flight) return;
    flight.style.offsetPath = `path("${d}")`;
    const run = flight.animate([{ offsetDistance: "0%" }, { offsetDistance: "100%" }], {
      duration: 2600,
      easing: "cubic-bezier(0.55, 0, 0.3, 1)",
      fill: "forwards",
    });
    trail.current?.animate([{ opacity: 0 }, { opacity: 0.8, offset: 0.25 }, { opacity: 0.8, offset: 0.7 }, { opacity: 0 }], {
      duration: 3000,
      fill: "forwards",
    });
    const colours = [
      "var(--color-brand-blue)",
      "var(--color-brand-red)",
      "var(--color-brand-yellow)",
      "var(--color-brand-green)",
      "var(--color-df-amber)",
      "var(--color-df-blue)",
    ];
    const pieces = [...(confetti.current?.children ?? [])] as HTMLElement[];
    pieces.forEach((piece, i) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      const speed = 180 + Math.random() * 260;
      const x = Math.cos(angle) * speed;
      const y = Math.sin(angle) * speed;
      piece.style.background = colours[i % colours.length];
      piece.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
          { transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: 0.55 },
          { transform: `translate(${x * 1.2}px, ${y + 260}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
        ],
        { duration: 1800 + Math.random() * 700, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)", fill: "forwards" },
      );
    });
    run.onfinish = () => done.current();
    return () => run.cancel();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <svg className="absolute inset-0 size-full overflow-visible">
        <path ref={trail} fill="none" stroke="var(--color-df-amber)" strokeWidth="2.5" strokeDasharray="7 10" strokeLinecap="round" opacity="0" />
      </svg>
      <span ref={plane} className="absolute left-0 top-0 [offset-rotate:auto]">
        <Plane className="size-16 text-df-blue drop-shadow-[0_10px_16px_rgba(4,30,68,0.35)]" />
      </span>
      <div ref={confetti} className="absolute bottom-10 right-16">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className={cn("absolute block", i % 3 === 0 ? "size-2.5 rounded-full" : "h-3.5 w-2 rounded-[2px]")}
          />
        ))}
      </div>
    </div>
  );
}

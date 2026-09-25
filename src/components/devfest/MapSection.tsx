"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { Plane } from "@/components/devfest/icons";
import { routeTone } from "@/components/devfest/routeTone";
import SplitFlap from "@/components/devfest/SplitFlap";
import { devfestMapIntro, devfestRoutes, devfestZones, type Route } from "@/data/devfest";
import { cn } from "@/lib/cn";

const routeById = Object.fromEntries(devfestRoutes.map((r) => [r.id, r])) as Record<Route["id"], Route>;
const nagpurClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

type Filter = Route["id"] | "all";

/**
 * The map, as the terminal's departures board: every zone flaps in on a
 * split-flap display, with what happens there and the route it is on. The
 * route chips filter the board (and it re-flaps, the way a board pages).
 * A list rather than a table, so it can restack on phones.
 */
export default function MapSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [clock, setClock] = useState("--:--");
  const zones = filter === "all" ? devfestZones : devfestZones.filter((z) => z.route === filter);

  useEffect(() => {
    const tick = () => setClock(nagpurClock.format(Date.now()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <section id="map" aria-labelledby="map-title" className="scroll-mt-20 bg-df-paper py-20 lg:py-28">
      <Container>
        <DfIntro
          headingId="map-title"
          eyebrow={devfestMapIntro.eyebrow}
          title={devfestMapIntro.title}
          sub={devfestMapIntro.sub}
        />

        <div role="group" aria-label="Show zones on a route" className="mt-8 flex flex-wrap gap-2">
          <FilterChip pressed={filter === "all"} onClick={() => setFilter("all")}>
            All zones
          </FilterChip>
          {devfestRoutes.map((route) => (
            <FilterChip key={route.id} pressed={filter === route.id} onClick={() => setFilter(route.id)}>
              <span aria-hidden="true" className={cn("size-2.5 rounded-full", routeTone[route.color].dot)} />
              {route.name}
            </FilterChip>
          ))}
        </div>
        <p role="status" className="sr-only">
          {filter === "all" ? `Showing all ${zones.length} zones` : `Showing ${zones.length} zones on the ${routeById[filter].name} route`}
        </p>

        <div className={cn("mt-6 overflow-hidden rounded-3xl bg-df-ink text-white", dfCardShadow)}>
          {/* Board header: title and Nagpur's clock */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-8">
            <p className="flex items-center gap-2.5 font-df text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-df-amber">
              <Plane aria-hidden="true" className="size-5 -rotate-12" />
              Departures
            </p>
            <p className="flex items-center gap-2.5 font-df text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/55">
              Nagpur
              <SplitFlap text={clock} length={5} className="text-[0.8rem]" label={clock === "--:--" ? "Local time" : clock} />
            </p>
          </div>
          <div
            aria-hidden="true"
            className="hidden grid-cols-[3.5rem_minmax(0,20rem)_1fr_8.5rem] gap-4 px-8 pb-2 pt-4 font-df text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/45 md:grid"
          >
            <span>No.</span>
            <span>Zone</span>
            <span>What happens there</span>
            <span>Route</span>
          </div>

          <ol key={filter}>
            {zones.map((zone, i) => {
              const route = routeById[zone.route];
              const tone = routeTone[route.color];
              const number = devfestZones.indexOf(zone) + 1;
              return (
                <li
                  key={zone.name}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-t border-white/[0.07] px-5 py-3.5 transition-colors duration-300 first:border-t-0 hover:bg-white/[0.04] md:grid-cols-[3.5rem_minmax(0,20rem)_1fr_8.5rem] md:px-8"
                >
                  <span aria-hidden="true" className="hidden font-df text-[0.9rem] font-semibold tabular-nums text-white/40 md:block">
                    {String(number).padStart(2, "0")}
                  </span>
                  <SplitFlap
                    text={zone.name}
                    length={18}
                    delay={i * 2}
                    className="col-span-2 text-[3.2vw] sm:text-[0.8rem] md:col-span-1 lg:text-[0.9rem]"
                  />
                  <span className="text-[0.9rem] leading-snug text-white/70">{zone.what}</span>
                  <span className="inline-flex items-center gap-2 justify-self-end whitespace-nowrap font-df text-[0.8rem] font-semibold md:justify-self-start">
                    <span aria-hidden="true" className={cn("size-2.5 rounded-full", tone.dot)} />
                    <span className="sr-only">Route: </span>
                    {route.name}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "press inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-df text-[0.8rem] font-medium transition-colors duration-300",
        pressed
          ? "border-df-midnight bg-df-midnight text-white"
          : "border-df-mist bg-white text-df-navy hover:border-df-steel",
      )}
    >
      {children}
    </button>
  );
}

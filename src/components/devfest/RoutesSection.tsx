"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/Section";
import { ArrowCircle, DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { Book, Chat, Check, Compass, Hammer, PassportBook, Party, Pin } from "@/components/devfest/icons";
import { routeTone } from "@/components/devfest/routeTone";
import SplitFlap from "@/components/devfest/SplitFlap";
import Stamp from "@/components/devfest/Stamp";
import { devfestRoutes, devfestRoutesIntro, type Route } from "@/data/devfest";
import { ROUTE_COUNT, stampRoute, usePassport, type RouteId } from "@/lib/devfest/passport";
import { cn } from "@/lib/cn";

const routeIcons: Record<Route["id"], typeof Compass> = {
  explore: Compass,
  learn: Book,
  build: Hammer,
  connect: Chat,
  celebrate: Party,
};

/**
 * The template's "Tracks" band: sky and control tower behind, a row of white
 * cards. Here the cards are the five routes, and they work as tabs: the
 * chosen route's description and zones open in the panel underneath, under
 * a split-flap route sign. Opening a route stamps it in the visitor's
 * DevFest Passport (see PassportWidget) - collect all five.
 */
export default function RoutesSection() {
  const [active, setActive] = useState(0);
  const [fresh, setFresh] = useState<RouteId | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const passport = usePassport();
  const route = devfestRoutes[active];
  const tone = routeTone[route.color];
  const stamped = passport.stamps.includes(route.id);

  const select = (i: number) => {
    setActive(i);
    if (stampRoute(devfestRoutes[i].id)) setFresh(devfestRoutes[i].id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = devfestRoutes.length - 1;
    let next: number;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id="routes"
      aria-labelledby="routes-title"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 lg:py-28"
    >
      <Image
        src="/devfest/sky-tower.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[80%_35%] lg:object-[center_35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-df-paper/80 via-df-paper/40 to-df-paper/0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-df-paper to-df-paper/0"
      />

      <Container>
        <DfIntro
          headingId="routes-title"
          eyebrow={devfestRoutesIntro.eyebrow}
          title={devfestRoutesIntro.title}
          sub={devfestRoutesIntro.sub}
        />

        {/* Route cards. A sideways strip on phones, a row of five from sm up. */}
        <div
          role="tablist"
          aria-label="Routes"
          data-reveal-group
          className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 lg:gap-5"
        >
          {devfestRoutes.map((item, i) => {
            const Icon = routeIcons[item.id];
            const itemTone = routeTone[item.color];
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`route-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="route-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onKeyDown}
                data-reveal-item
                className={cn(
                  "group relative flex w-[9.5rem] shrink-0 snap-start flex-col items-center rounded-3xl bg-white/85 px-3 pb-5 pt-6 text-center backdrop-blur-sm transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:w-auto lg:px-4 lg:pt-8",
                  dfCardShadow,
                  selected && cn("-translate-y-1 ring-2", itemTone.ring),
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-6 group-hover:scale-105",
                    itemTone.tile,
                    itemTone.icon,
                  )}
                >
                  <Icon className="size-7" />
                </span>
                <span className="mt-4 font-df text-[1rem] font-semibold text-df-navy">
                  {item.name}
                </span>
                <span className="mt-0.5 text-[0.84rem] leading-snug text-df-slate">{item.tagline}</span>
                <ArrowCircle active={selected} className="mt-5" />
                {passport.stamps.includes(item.id) ? (
                  <span
                    className={cn(
                      "absolute right-3 top-3 flex size-6 items-center justify-center rounded-full text-white",
                      itemTone.dot,
                    )}
                  >
                    <Check aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">(stamped)</span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.88rem] text-df-slate">
          <PassportBook aria-hidden="true" className="size-5 text-df-blue" />
          Open a route to read it - each one you open is stamped in your passport.
          <span className="rounded-full bg-df-midnight px-2.5 py-0.5 font-df text-[0.75rem] font-semibold text-white">
            {passport.stamps.length}/{ROUTE_COUNT} stamps
          </span>
        </p>

        <div
          role="tabpanel"
          id="route-panel"
          aria-labelledby={`route-tab-${route.id}`}
          tabIndex={0}
          className={cn("relative mt-4 rounded-3xl bg-white/90 p-6 backdrop-blur-sm sm:p-8", dfCardShadow)}
        >
          {/* The route sign flaps over to the new route; the rest of the copy
              eases in (keyed). Nothing in here may use data-reveal: it mounts
              after the motion pass. */}
          <p className="flex flex-wrap items-center gap-3">
            <span aria-hidden="true" className={cn("size-3 rounded-full", tone.dot)} />
            <span className="rounded-lg bg-df-ink p-1.5">
              <SplitFlap
                text={`Route ${String(active + 1).padStart(2, "0")} · ${route.name}`}
                length={20}
                className="text-[0.72rem] sm:text-[0.85rem]"
              />
            </span>
          </p>
          {stamped ? (
            <Stamp
              key={`stamp-${route.id}`}
              route={route}
              fresh={fresh === route.id}
              className="pointer-events-none absolute -top-6 right-6 hidden size-28 sm:block"
            />
          ) : null}
          <div key={route.id} className="df-fade-up mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
              <p className="max-w-2xl text-[1rem] leading-[1.7] text-df-slate">{route.body}</p>
            </div>
            <div className="lg:max-w-sm">
              <p className="font-df text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-df-slate/80">
                Where it happens
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {route.zones.map((zone) => (
                  <li
                    key={zone}
                    className="inline-flex items-center gap-1.5 rounded-full border border-df-mist bg-df-paper px-3 py-1.5 text-[0.85rem] font-medium text-df-navy"
                  >
                    <Pin aria-hidden="true" className="size-3.5 text-df-orange" />
                    {zone}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

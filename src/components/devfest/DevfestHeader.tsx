"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Section";
import { GdgLockup } from "@/components/devfest/ui";
import { Close, Menu, Plane } from "@/components/devfest/icons";
import { devfestHero, devfestNav } from "@/data/devfest";
import { cn } from "@/lib/cn";

/**
 * DevFest header, as in the template: GDG lockup, in-page nav with an orange
 * underline under the section you are reading, and a navy "Stay Updated" pill.
 * Transparent over the hero, frosted white once you scroll.
 */
export default function DevfestHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const flight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      // The active item is the last section whose top has passed a line a
      // third of the way down the screen.
      const line = window.innerHeight * 0.35;
      let current = "top";
      for (const item of devfestNav) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
      // How far through the page we are, for the flight path under the bar.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      flight.current?.style.setProperty("--flown", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // While the menu is open: lock the page behind it (Lenis included), move
  // focus into it, keep Tab inside it, close on Escape. On close, focus goes
  // back to the menu button unless it has already moved somewhere else.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const items = sheet.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const sheetEl = sheet.current;
    const trigger = openButton.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      const focus = document.activeElement;
      if (!focus || focus === document.body || sheetEl?.contains(focus)) {
        trigger?.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
          scrolled
            ? "bg-white/85 shadow-[0_12px_30px_-22px_rgba(4,30,68,0.45)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-4 sm:h-20 xl:gap-6">
          <Link
            href="/"
            aria-label="Google Developer Groups Nagpur - main site"
            className="press shrink-0"
          >
            <GdgLockup />
          </Link>

          <nav aria-label="DevFest sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {devfestNav.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "press relative block px-2.5 py-2 font-df text-[0.86rem] font-medium transition-colors duration-300 xl:px-4 xl:text-[0.92rem]",
                        on ? "text-df-navy" : "text-df-slate hover:text-df-navy",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-df-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          on ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#notify"
              className="press group hidden h-11 items-center gap-2 rounded-full bg-df-midnight px-5 font-df text-[0.88rem] font-semibold text-white transition-colors duration-300 hover:bg-df-navy sm:inline-flex"
            >
              Stay Updated
              <Plane className="size-4 -rotate-12 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              ref={openButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="press flex size-11 items-center justify-center rounded-full border border-df-mist bg-white/90 text-df-navy lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>

        {/* The page as a flight: NAG at the left edge, NEXT at the right, the
            plane at how far down you have read. */}
        <div
          ref={flight}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 [--flown:0]",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--color-df-steel)_0_6px,transparent_6px_12px)]" />
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-(--flown) bg-df-amber" />
          <Plane className="absolute -top-[7px] left-[calc(var(--flown)*(100%_-_15px))] size-[15px] text-df-orange" />
        </div>
      </header>

      {/* Mobile menu sheet. Closed, it is `inert` (unfocusable, hidden from
          assistive tech) rather than visibility:hidden: the site's
          reduced-motion reset gives every element a 0.01ms transition, which
          would make visibility flip a frame late and swallow the focus() above. */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", !open && "pointer-events-none")} inert={!open}>
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-df-navy/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className={cn(
            "absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-[2rem] bg-df-paper px-5 pb-8 pt-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex items-center justify-between">
            <GdgLockup />
            <button
              ref={closeButton}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="press flex size-11 items-center justify-center rounded-full border border-df-mist bg-white text-df-navy"
            >
              <Close className="size-5" />
            </button>
          </div>
          <ul className="mt-6">
            {devfestNav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
                  className={cn(
                    "press flex items-center justify-between border-b border-df-mist py-4 font-df text-[1.4rem] font-semibold text-df-navy transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  {item.label}
                  {active === item.id ? <span className="size-2 rounded-full bg-df-amber" /> : null}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-7 grid gap-3">
            <a
              href={devfestHero.primary.href}
              onClick={() => setOpen(false)}
              className="press flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] font-df font-semibold text-white"
            >
              {devfestHero.primary.label}
            </a>
            <a
              href="#notify"
              onClick={() => setOpen(false)}
              className="press flex h-12 items-center justify-center gap-2 rounded-full bg-df-midnight font-df font-semibold text-white"
            >
              Stay Updated <Plane className="size-4 -rotate-12" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

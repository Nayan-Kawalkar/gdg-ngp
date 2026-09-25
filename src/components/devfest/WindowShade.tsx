"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/** How far up (in % of its own height) the shade goes when fully open. */
const LIFT = 88;

/**
 * An airplane window shade, drawn inside a <PlaneWindow>. It is pulled down
 * when the page loads and lifts as the window scrolls into view, uncovering
 * the view; from the first touch on, the visitor owns it - drag the lip up
 * or down, click it to open or close, or use the arrow keys.
 *
 * Driven imperatively (no React state), so dragging re-renders nothing.
 * Without JS, and under reduced motion, it simply stays open.
 */
export default function WindowShade() {
  const frame = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const openness = useRef(1);
  const scroll = useRef<gsap.core.Tween | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const drag = useRef<{ y: number; from: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const place = useCallback((value: number) => {
    openness.current = Math.min(1, Math.max(0, value));
    if (shade.current) shade.current.style.transform = `translateY(${-openness.current * LIFT}%)`;
  }, []);

  const takeOver = useCallback(() => {
    scroll.current?.scrollTrigger?.kill();
    scroll.current?.kill();
    scroll.current = null;
    tween.current?.kill();
    tween.current = null;
  }, []);

  useEffect(() => {
    const el = frame.current;
    if (!el || prefersReducedMotion()) return;
    const proxy = { value: 0 };
    place(0);
    scroll.current = gsap.to(proxy, {
      value: 1,
      ease: "none",
      onUpdate: () => place(proxy.value),
      scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: 0.7 },
    });
    return takeOver;
  }, [place, takeOver]);

  const moveTo = (target: number) => {
    takeOver();
    if (prefersReducedMotion()) {
      place(target);
      return;
    }
    const proxy = { value: openness.current };
    tween.current = gsap.to(proxy, {
      value: target,
      duration: 0.75,
      ease: "power3.inOut",
      onUpdate: () => place(proxy.value),
    });
  };

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    takeOver();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, from: openness.current, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || !frame.current) return;
    const dy = e.clientY - d.y;
    if (Math.abs(dy) > 3) d.moved = true;
    const travel = frame.current.getBoundingClientRect().height * (LIFT / 100);
    place(d.from - dy / travel);
  };

  const onPointerUp = () => {
    if (drag.current?.moved) justDragged.current = true;
    drag.current = null;
  };

  const onClick = () => {
    // A drag ends in a click too; only a plain click toggles.
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    moveTo(openness.current > 0.5 ? 0 : 1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    moveTo(openness.current + (e.key === "ArrowUp" ? 0.25 : -0.25));
  };

  return (
    <div ref={frame} className="absolute inset-0 z-10">
      <div
        ref={shade}
        className="absolute inset-x-0 top-0 h-full will-change-transform"
        style={{ transform: `translateY(-${LIFT}%)` }}
      >
        {/* the shade: white plastic with faint ribs */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_15px,rgb(4_30_68/0.05)_15px_16px),linear-gradient(180deg,white,var(--color-df-mist))]"
        />
        {/* the lip: the part you pull */}
        <button
          type="button"
          aria-label="Raise or lower the window shade"
          title="Drag or click the shade"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClick={onClick}
          onKeyDown={onKeyDown}
          className="group absolute inset-x-0 bottom-0 flex h-[13%] cursor-grab touch-none items-center justify-center bg-linear-to-b from-df-mist to-df-steel/80 shadow-[inset_0_1px_0_white,0_4px_10px_-4px_rgb(4_30_68/0.45)] outline-none active:cursor-grabbing"
        >
          <span className="h-2.5 w-[34%] rounded-full bg-df-slate/35 transition-colors duration-300 group-hover:bg-df-slate/60 group-focus-visible:bg-df-amber" />
        </button>
      </div>
    </div>
  );
}

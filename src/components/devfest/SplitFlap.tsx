"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FLIP: Keyframe[] = [
  { transform: "rotateX(-86deg)", opacity: 0.55 },
  { transform: "rotateX(0deg)", opacity: 1 },
];
const FLIP_TIMING: KeyframeAnimationOptions = {
  duration: 150,
  easing: "cubic-bezier(0.3, 1.45, 0.5, 1)",
};
/** One flap every this many ms, per cell. */
const TICK = 58;

const fit = (text: string, length: number) =>
  text.toUpperCase().slice(0, length).padEnd(length, " ");
const glyph = (ch: string) => (ch === " " ? " " : ch);

/**
 * Split-flap ("Solari") text, the way departure boards update: every cell
 * flutters through a few characters before it lands. The first time the
 * board scrolls into view every cell runs; after that only cells whose
 * character changes flip.
 *
 * Characters are written straight to the text nodes on a timer instead of
 * through React state, so a board of a few hundred cells re-renders nothing
 * while it animates. React only ever renders the first text, which is also
 * what the server sends. Screen readers get `text` (or `label`) as plain
 * text; the cells are aria-hidden. Reduced motion swaps text with no flutter.
 */
export default function SplitFlap({
  text,
  length = text.length,
  label,
  delay = 0,
  className,
}: {
  text: string;
  /** Number of cells; text is padded or cut to fit. Keep it fixed per board. */
  length?: number;
  /** What assistive tech reads, if it should differ from `text`. */
  label?: string;
  /** Extra wait, in flaps, before this board starts (to cascade rows). */
  delay?: number;
  className?: string;
}) {
  const target = fit(text, length);
  const [initial] = useState(target);
  const root = useRef<HTMLSpanElement>(null);
  const leaves = useRef<(HTMLSpanElement | null)[]>([]);
  const shown = useRef<string[]>(initial.split(""));
  const played = useRef(false);
  const [seen, setSeen] = useState(false);

  // The first full flutter waits until the board is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const next = target.split("");
    // The same array for the life of the component (updated in place).
    const current = shown.current;

    const write = (i: number, ch: string, flip: boolean) => {
      const leaf = leaves.current[i];
      if (!leaf) return;
      // Change the existing text node (React's own), never replace it.
      if (leaf.firstChild) leaf.firstChild.nodeValue = glyph(ch);
      else leaf.textContent = glyph(ch);
      current[i] = ch;
      if (flip) leaf.animate(FLIP, FLIP_TIMING);
    };

    // Off screen (or motion off), keep the text current without the show.
    if (!seen || prefersReducedMotion()) {
      next.forEach((ch, i) => current[i] !== ch && write(i, ch, false));
      if (seen) played.current = true;
      return;
    }

    const first = !played.current;
    played.current = true;
    const plan = next.map((ch, i) => {
      const changed = current[i] !== ch;
      if (!changed && (!first || ch === " ")) return null;
      // A left-to-right wave; each cell flutters 3-7 times.
      return { start: delay + i * 0.55, flips: 3 + ((i * 7 + ch.charCodeAt(0)) % 5) };
    });

    let frame = 0;
    let last = 0;
    let tick = 0;
    const run = (time: number) => {
      if (time - last >= TICK) {
        last = time;
        let busy = false;
        plan.forEach((step, i) => {
          if (!step) return;
          busy = true;
          if (tick < step.start || step.flips === 0) return;
          step.flips -= 1;
          const ch = step.flips === 0 ? next[i] : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
          write(i, ch, true);
          if (step.flips === 0) plan[i] = null;
        });
        tick += 1;
        if (!busy) return;
      }
      frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(frame);
      // Never leave a half-scrambled board behind.
      next.forEach((ch, i) => current[i] !== ch && write(i, ch, false));
    };
  }, [target, seen, delay]);

  return (
    <span ref={root} className={cn("df-flap", className)}>
      <span aria-hidden="true" className="df-flap-row">
        {initial.split("").map((ch, i) => (
          <span key={i} className="df-flap-cell">
            <span
              ref={(el) => {
                leaves.current[i] = el;
              }}
              className="df-flap-leaf"
            >
              {glyph(ch)}
            </span>
          </span>
        ))}
      </span>
      <span className="sr-only">{label ?? text}</span>
    </span>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  gsap,
  ScrollTrigger,
  MOTION,
  prefersReducedMotion,
  isCoarsePointer,
  splitWords,
} from "@/lib/motion";

const presets: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  "fade-up": { from: { y: 34, autoAlpha: 0 }, to: { y: 0, autoAlpha: 1 } },
  "fade-in": { from: { autoAlpha: 0 }, to: { autoAlpha: 1 } },
  scale: { from: { scale: 0.96, autoAlpha: 0 }, to: { scale: 1, autoAlpha: 1 } },
  "slide-left": { from: { x: 48, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1 } },
  "slide-right": { from: { x: -48, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1 } },
};

/**
 * Declarative, attribute-driven motion for the whole site.
 *
 *   data-motion-text="words"  - masked word-by-word reveal
 *   data-motion-text="lines"  - masked line reveal (pre-split markup)
 *   data-reveal="fade-up"     - single element reveal
 *   data-reveal-group         - staggers its [data-reveal-item] children
 *   data-image-reveal         - clip-path wipe + image settle
 *   data-parallax-image       - slow drift inside [data-parallax-section]
 *   data-magnetic             - pointer-following buttons
 *   data-mouse-parallax       - section with [data-mouse-depth] layers
 *
 * All of it is skipped under `prefers-reduced-motion`, and `has-motion` is only
 * put on <html> when we are actually going to animate, so nothing is ever left
 * invisible if JS fails or motion is off.
 */
export default function MotionProvider() {
  const pathname = usePathname();

  /**
   * Keyed on the pathname, not run once. This component lives in the root
   * layout, which stays mounted across client-side navigations - so a
   * run-once effect set up the first page and never saw any later one. Every
   * reveal target on a navigated-to page then sat at visibility:hidden until a
   * full reload. Re-running per route tears down the old page's triggers
   * (ctx.revert) and wires up the new page's.
   */
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const coarse = isCoarsePointer();
    const root = document.documentElement;

    if (reduced) {
      root.classList.remove("has-motion");
      return;
    }
    root.classList.add("has-motion");

    let ctx: gsap.Context | undefined;
    // Owns every pointer listener this run attaches. ctx.revert() only undoes
    // GSAP tweens, so without this the navbar's magnetic button - which
    // survives route changes - would gain another listener on every navigation.
    const listeners = new AbortController();
    const { signal } = listeners;
    // One frame later, so measurements see the new route laid out rather than
    // the frame in which it was swapped in.
    const frame = requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      /**
       * Decide how a target should animate based on where it is right now.
       *
       * Deferring everything to ScrollTrigger breaks on any load that does not
       * start at the top (a reload that restores scroll, a #hash landing, HMR):
       * a trigger created while its element is already above the viewport sits
       * in its "after" state and never plays, leaving that content invisible.
       * So anything already on screen plays immediately, anything scrolled past
       * is snapped to its end state, and only what is still below the fold waits
       * for a trigger.
       */
      function reveal(
        scope: Element,
        targets: gsap.TweenTarget,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start: string = MOTION.start,
      ) {
        const rect = scope.getBoundingClientRect();
        const startRatio = Number(start.split(" ")[1]?.replace("%", "") ?? 82) / 100;

        if (rect.bottom < 0) {
          gsap.set(targets, to);
          return;
        }
        if (rect.top < window.innerHeight * startRatio) {
          gsap.fromTo(targets, from, to);
          return;
        }
        gsap.fromTo(targets, from, {
          ...to,
          scrollTrigger: { trigger: scope, start, once: true },
        });
      }

      /* ---------- masked word reveals ---------- */
      gsap.utils.toArray<HTMLElement>("[data-motion-text='words']").forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        reveal(
          el,
          words,
          { yPercent: 112, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: MOTION.ease,
            stagger: MOTION.wordStagger,
            delay: Number(el.dataset.motionDelay ?? 0),
          },
        );
      });

      /* ---------- pre-split line reveals ---------- */
      gsap.utils.toArray<HTMLElement>("[data-motion-text='lines']").forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>(".motion-line");
        gsap.set(el, { autoAlpha: 1 });
        if (!lines.length) return;
        reveal(
          el,
          lines,
          { yPercent: 108, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: MOTION.ease,
            stagger: MOTION.lineStagger,
            delay: Number(el.dataset.motionDelay ?? 0),
          },
          "top 84%",
        );
      });

      /* ---------- staggered groups ---------- */
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.set(group, { autoAlpha: 1 });
        if (!items.length) return;
        reveal(
          group,
          items,
          { y: 38, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: MOTION.revealDuration,
            ease: MOTION.ease,
            stagger: MOTION.cardStagger,
          },
        );
      });

      /* ---------- single reveals ---------- */
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]:not([data-reveal-item])")
        .forEach((el) => {
          const preset = presets[el.dataset.reveal || "fade-up"] ?? presets["fade-up"];
          gsap.set(el, { autoAlpha: 1 });
          reveal(
            el,
            el,
            preset.from,
            {
              ...preset.to,
              duration: 0.9,
              ease: MOTION.ease,
              delay: Number(el.dataset.revealDelay ?? 0),
            },
            "top 86%",
          );
        });

      /* ---------- clip-path image reveals ---------- */
      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((figure) => {
        const image = figure.querySelector("img");
        gsap.set(figure, { autoAlpha: 1 });

        reveal(
          figure,
          figure,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: MOTION.ease },
        );
        if (image) {
          reveal(figure, image, { scale: 1.12 }, { scale: 1, duration: 1.3, ease: MOTION.ease });
        }
      });

      /* ---------- parallax layers ---------- */
      gsap.utils
        .toArray<HTMLElement>("[data-parallax-image], [data-parallax-layer]")
        .forEach((layer) => {
          const speed = Number(layer.dataset.parallaxSpeed ?? 0.16);
          const section = layer.closest<HTMLElement>("[data-parallax-section]") ?? layer;
          gsap.to(layer, {
            y: () => window.innerHeight * speed * -1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: MOTION.scrub,
              invalidateOnRefresh: true,
            },
          });
        });

      if (coarse) return;

      /* ---------- magnetic buttons ---------- */
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic || 0.28);
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

        el.addEventListener(
          "pointermove",
          (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            xTo((event.clientX - rect.left - rect.width / 2) * strength);
            yTo((event.clientY - rect.top - rect.height / 2) * strength);
          },
          { signal },
        );
        el.addEventListener(
          "pointerleave",
          () => {
            xTo(0);
            yTo(0);
          },
          { signal },
        );
      });

      /* ---------- mouse-reactive depth layers ---------- */
      gsap.utils.toArray<HTMLElement>("[data-mouse-parallax]").forEach((section) => {
        const setters = gsap.utils
          .toArray<HTMLElement>(section.querySelectorAll("[data-mouse-depth]"))
          .map((layer) => ({
            depth: Number(layer.dataset.mouseDepth || 0.03),
            xTo: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3.out" }),
            yTo: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3.out" }),
          }));

        section.addEventListener(
          "pointermove",
          (event: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            setters.forEach(({ depth, xTo, yTo }) => {
              xTo(x * depth);
              yTo(y * depth);
            });
          },
          { signal },
        );
        section.addEventListener(
          "pointerleave",
          () =>
            setters.forEach(({ xTo, yTo }) => {
              xTo(0);
              yTo(0);
            }),
          { signal },
        );
      });
    });

    // Fonts settle after first paint and move every measurement with them.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelAnimationFrame(frame);
      listeners.abort();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}

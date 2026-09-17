"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal dialog.
 *
 * Handles the things a plain div does not: focus moves in on open and returns
 * to the trigger on close, Tab is trapped inside, Escape closes, the page
 * behind is locked, and the rest of the app is hidden from assistive tech via
 * aria-modal on a labelled dialog.
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    // Lock the page behind the dialog, Lenis included.
    const root = document.documentElement;
    root.classList.add("lenis-stopped");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the first control, or the panel itself if there is none.
    const focusables = panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    (focusables?.[0] ?? panel.current)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.classList.remove("lenis-stopped");
      document.body.style.overflow = previousOverflow;
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink-deep/45 backdrop-blur-sm"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          "relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[2.5rem] bg-paper p-7 sm:max-w-lg sm:rounded-[2.5rem] sm:p-9",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id={titleId} className="text-[1.6rem] leading-tight tracking-[-0.035em]">
              {title}
            </h2>
            {description ? (
              <p id={descId} className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="press flex size-9 shrink-0 items-center justify-center rounded-full border border-black/8 bg-cream text-lg leading-none text-ink-soft hover:bg-ink hover:text-white"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}

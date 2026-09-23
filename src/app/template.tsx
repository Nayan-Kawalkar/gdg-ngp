import { ViewTransition, type ReactNode } from "react";

/**
 * Page transitions (PRD 8).
 *
 * This lives in a template, not the layout: a template remounts on every
 * navigation, so the outgoing page fires `exit` and the incoming one `enter`.
 * In the layout they would never fire - layouts persist across routes.
 *
 * The animations themselves are in globals.css (`.page-exit` / `.page-enter`),
 * switched off under prefers-reduced-motion. Browsers without the View
 * Transitions API just navigate normally.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}

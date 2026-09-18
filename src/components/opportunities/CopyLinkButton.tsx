"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Copies the current page URL - PRD 5.5 wants Jobs in Nagpur promotable on
 * socials. Announces the result politely so the confirmation is not purely
 * visual, and falls back to a message if the clipboard is unavailable.
 */
export default function CopyLinkButton({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href.split("?")[0]);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "btn-solid h-12 border border-black/10 bg-paper px-6 text-[0.95rem] text-ink sm:h-14 sm:px-8",
          className,
        )}
      >
        {state === "copied" ? "Link copied" : state === "failed" ? "Copy failed" : "Copy link"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Link copied to clipboard" : state === "failed" ? "Could not copy the link" : ""}
      </span>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { IconChat, IconClose } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

// The panel (and the whole answer engine with the site's data) only loads the
// first time someone opens the chat - nothing on first paint.
const ChatPanel = dynamic(() => import("@/components/chat/ChatPanel"), { ssr: false });

const PANEL_ID = "gdg-chat-panel";

/**
 * Floating chat launcher (PRD 12), bottom-right on every page except the
 * private certificate pages.
 *
 * z-[55]: above page content, below the mobile menu (60) and dialogs (80), so
 * those always cover it. Once opened, the panel stays mounted (just hidden)
 * so the conversation survives closing and navigating.
 */
export default function ChatLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    button.current?.focus();
  }, []);

  if (pathname.startsWith("/certificates")) return null;

  return (
    <>
      {loaded ? <ChatPanel id={PANEL_ID} open={open} onClose={close} /> : null}

      <button
        ref={button}
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls={loaded ? PANEL_ID : undefined}
        aria-label={open ? "Close chat" : "Ask GDG Nagpur a question"}
        className={cn(
          // The white hairline is invisible on cream but keeps the ink button
          // from dissolving into dark sections (heroes, footer).
          "press fixed bottom-5 right-5 z-[55] flex size-14 items-center justify-center rounded-full bg-ink text-white ring-1 ring-white/25 transition-[transform,background-color] duration-300 hover:bg-ink-deep sm:bottom-6 sm:right-6",
          open && "max-sm:hidden",
        )}
      >
        <span className="relative size-6">
          <IconChat
            className={cn(
              "absolute inset-0 size-6 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
          />
          <IconClose
            className={cn(
              "absolute inset-0 size-6 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
            )}
          />
        </span>
        {!loaded ? (
          <span aria-hidden="true" className="absolute right-0.5 top-0.5 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-60" />
            <span className="relative inline-flex size-3 rounded-full border-2 border-cream bg-brand-green" />
          </span>
        ) : null}
      </button>
    </>
  );
}

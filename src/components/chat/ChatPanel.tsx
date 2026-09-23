"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconClose, IconSend } from "@/components/ui/Icons";
import { answer, logMiss, quickQuestions, type ChatLink } from "@/lib/chat/answer";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Message =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "bot"; text: string; links?: ChatLink[] };

const greeting: Message = {
  id: 0,
  from: "bot",
  text: "Hi! I'm the GDG Nagpur helper. I answer from what's on this site - events, mentors, opportunities, and how to get involved.",
};

function isInternal(href: string) {
  return href.startsWith("/");
}

/** Four bouncing brand dots while an answer is "on its way". */
function Typing() {
  return (
    <div className="flex items-center gap-1.5 self-start rounded-[1.25rem] rounded-bl-md bg-cream px-4 py-3.5" aria-hidden="true">
      {["bg-brand-blue", "bg-brand-red", "bg-brand-yellow", "bg-brand-green"].map((c, i) => (
        <span
          key={c}
          className={cn("chat-typing-dot size-2 rounded-full", c)}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

/**
 * The chat window. A non-modal dialog: the page stays usable behind it, so
 * there is no focus trap - but Escape closes it and focus returns to the
 * launcher. New messages are announced through the log's aria-live.
 */
export default function ChatPanel({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Keep the newest message in view.
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function ask(raw: string) {
    const question = raw.trim();
    if (!question || thinking) return;
    setDraft("");
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: question }]);
    setThinking(true);

    const reply = answer(question);
    if (!reply.matched) logMiss(question);

    // A short beat reads as "considered"; skip it for reduced motion.
    const delay = prefersReducedMotion() ? 0 : 450 + Math.min(question.length * 8, 400);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, from: "bot", text: reply.text, links: reply.links },
      ]);
      setThinking(false);
    }, delay);
  }

  const started = messages.some((m) => m.from === "user");

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      hidden={!open}
      className="chat-panel fixed inset-x-0 bottom-0 z-[56] flex h-[85dvh] flex-col overflow-hidden rounded-t-[2rem] border border-black/8 bg-paper sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(36rem,calc(100dvh-8rem))] sm:w-[24rem] sm:rounded-[2rem]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-ink/8 px-5 py-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink">
          <Image src="/gdg-mark.svg" alt="" width={170} height={96} className="h-3.5 w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="font-heading text-[1.05rem] tracking-[-0.02em]">
            Ask GDG Nagpur
          </h2>
          <p className="flex items-center gap-1.5 text-[0.75rem] text-ink-soft">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-green" />
            Answers from this site, instantly
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="press flex size-9 items-center justify-center rounded-full border border-black/8 bg-cream text-ink-soft hover:bg-ink hover:text-white"
        >
          <IconClose className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={log}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        data-lenis-prevent
        className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-5 py-5"
      >
        {messages.map((m) =>
          m.from === "user" ? (
            <p
              key={m.id}
              className="chat-bubble max-w-[85%] self-end rounded-[1.25rem] rounded-br-md bg-ink px-4 py-2.5 text-[0.92rem] leading-relaxed text-white"
            >
              {m.text}
            </p>
          ) : (
            <div key={m.id} className="chat-bubble flex max-w-[90%] flex-col gap-2.5 self-start">
              <p className="rounded-[1.25rem] rounded-bl-md bg-cream px-4 py-3 text-[0.92rem] leading-relaxed text-ink">
                {m.text}
              </p>
              {m.links?.length ? (
                <div className="flex flex-wrap gap-2">
                  {m.links.map((link) =>
                    isInternal(link.href) ? (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={() => {
                          // On phones the sheet covers the page it just linked to.
                          if (window.matchMedia("(max-width: 639px)").matches) onClose();
                        }}
                        className="press chip px-3.5 py-2 text-[0.82rem] hover:border-ink/20 hover:bg-cream"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.href + link.label}
                        href={link.href}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                        className="press chip px-3.5 py-2 text-[0.82rem] hover:border-ink/20 hover:bg-cream"
                      >
                        {link.label}
                      </a>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ),
        )}

        {thinking ? <Typing /> : null}

        {!started ? (
          <div className="mt-1 flex flex-col items-start gap-2">
            <p className="label-caps text-[0.64rem] text-ink-soft/50">Try asking</p>
            {quickQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="press chip px-3.5 py-2 text-left text-[0.85rem] text-ink-soft hover:text-ink"
              >
                {q}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
        className="border-t border-ink/8 p-3"
      >
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-cream p-1.5 pl-4 focus-within:border-brand-blue">
          <label htmlFor={`${id}-input`} className="sr-only">
            Your question
          </label>
          <input
            ref={input}
            id={`${id}-input`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={300}
            autoComplete="off"
            placeholder="Ask about events, mentors, jobs..."
            className="min-w-0 flex-1 bg-transparent text-[0.92rem] placeholder:text-ink-soft/50 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={!draft.trim() || thinking}
            className={cn(
              "btn-solid size-9 shrink-0 bg-ink text-white disabled:cursor-not-allowed disabled:opacity-35",
            )}
          >
            <IconSend className="size-4" />
          </button>
        </div>
        <p className="mt-2 px-2 text-center text-[0.7rem] text-ink-soft/60">
          Not a person, and no AI - answers come only from this site.
        </p>
      </form>
    </div>
  );
}

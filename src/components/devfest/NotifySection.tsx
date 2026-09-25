"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Section";
import { Plane } from "@/components/devfest/icons";
import { devfestNotify } from "@/data/devfest";
import { site } from "@/data/site";
import { isEmail } from "@/lib/validate";

/**
 * The template's "Ready for Takeoff?" strip: runway at dusk, copy on the navy
 * side, a joined email + orange button pill. FRONTEND ONLY: nothing is sent,
 * and the confirmation says so.
 */
export default function NotifySection() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // The form is replaced by the confirmation; move focus there so it is not
  // dropped on <body> and the message gets read.
  useEffect(() => {
    if (done) status.current?.focus();
  }, [done]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEmail(email)) {
      setError("That does not look like an email address.");
      input.current?.focus();
      return;
    }
    // TODO(backend): add the address to the pass-drop list. Nothing leaves the browser today.
    setError("");
    setDone(true);
  }

  return (
    <section
      id="notify"
      aria-labelledby="notify-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-df-midnight"
    >
      <Image
        src="/devfest/runway-dusk.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[65%_80%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-df-midnight/75 lg:bg-transparent lg:bg-linear-to-r lg:from-df-midnight lg:via-df-midnight/80 lg:via-40% lg:to-df-midnight/0 lg:to-70%"
      />

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl">
          <h2
            id="notify-title"
            data-motion-text="words"
            className="text-balance font-df text-[2rem] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.5rem]"
          >
            {devfestNotify.title}
          </h2>
          <p data-reveal="fade-up" className="mt-4 text-[1rem] leading-[1.7] text-white/80 sm:text-[1.0625rem]">
            {devfestNotify.sub}
          </p>

          {done ? (
            <p
              ref={status}
              role="status"
              tabIndex={-1}
              className="mt-8 rounded-2xl outline-none border border-white/15 bg-white/10 p-5 text-[0.92rem] leading-relaxed text-white/85 backdrop-blur-sm"
            >
              <span className="font-semibold text-white">You would be on the list.</span> The signup is not
              connected yet, so nothing was saved - email{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-white">
                {site.email}
              </a>{" "}
              to be added by hand.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8">
              <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-df-amber">
                <label htmlFor={id} className="sr-only">
                  Email address
                </label>
                <input
                  ref={input}
                  id={id}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  placeholder="Email address"
                  className="min-w-0 flex-1 bg-transparent py-2 pl-4 text-[0.95rem] text-df-ink placeholder:text-df-slate/70 focus:outline-none sm:pl-5"
                />
                <button
                  type="submit"
                  className="press group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] px-5 font-df text-[0.92rem] font-semibold text-white transition-[filter] duration-300 hover:brightness-105 sm:h-12 sm:px-6"
                >
                  {devfestNotify.cta}
                  <Plane
                    aria-hidden="true"
                    className="size-4 -rotate-12 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
              {error ? (
                <p id={`${id}-error`} className="mt-2.5 pl-5 text-[0.85rem] text-df-amber">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import { IconMail } from "@/components/ui/Icons";
import { isEmail } from "@/lib/validate";
import { site } from "@/data/site";

/**
 * Single-field email signup. FRONTEND ONLY: nothing is sent - the confirmation
 * says so and points at the address that works today.
 */
export default function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!isEmail(email)) {
      setError("That does not look like an email address.");
      return;
    }
    // TODO(backend): add to the mailing list. Nothing leaves the browser today.
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="max-w-md rounded-2xl bg-yellow-mist p-5 text-[0.9rem] leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">You would be on the list.</span> The signup is
        not connected yet, so nothing was saved - email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>{" "}
        to be added by hand.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-paper p-1.5 focus-within:border-brand-blue">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <IconMail className="ml-3 size-5 shrink-0 text-ink-soft/50" />
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="you@example.com"
          className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] placeholder:text-ink-soft/45 focus:outline-none"
        />
        <button type="submit" className="btn-solid h-10 shrink-0 bg-ink px-5 text-sm text-white">
          Subscribe
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 pl-5 text-[0.82rem] text-red-deep">
          {error}
        </p>
      ) : null}
    </form>
  );
}

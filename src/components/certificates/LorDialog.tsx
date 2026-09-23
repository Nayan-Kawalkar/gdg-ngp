"use client";

import { useEffect, useRef, useState } from "react";
import Dialog from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { site } from "@/data/site";
import { isBlank, isEmail, isShorterThan } from "@/lib/validate";

type Values = { name: string; role: string; duration: string; highlights: string; email: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (isBlank(v.name)) e.name = "The letter needs your name.";
  if (isBlank(v.role)) e.role = "What was your role?";
  if (isBlank(v.duration)) e.duration = "Roughly when - e.g. Jan 2025 to now.";
  if (isShorterThan(v.highlights, 60))
    e.highlights = "A few specifics help the organizers write a strong letter.";
  if (isBlank(v.email)) e.email = "Where should we send the letter?";
  else if (!isEmail(v.email)) e.email = "That does not look like an email address.";
  return e;
}

/**
 * Request a Letter of Recommendation (PRD 13). Goes to the organizers for
 * manual drafting. FRONTEND ONLY: stubbed, and the confirmation says so.
 */
export default function LorDialog({
  open,
  onClose,
  name,
  role,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  role: string;
}) {
  const [values, setValues] = useState<Values>({ name, role, duration: "", highlights: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Pick up edits made on the certificate since the dialog was last opened.
  const [lastOpen, setLastOpen] = useState(open);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open && !sent) setValues((v) => ({ ...v, name: name || v.name, role: role || v.role }));
  }

  useEffect(() => {
    if (!attempt) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempt]);

  const set =
    (key: keyof Values) =>
    (event: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [key]: event.target.value }));

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setAttempt((n) => n + 1);
      return;
    }
    // TODO(backend): route to the organizers' LOR queue. Nothing is sent today.
    setSent(true);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={sent ? "Request received" : "Request a letter of recommendation"}
      description={
        sent
          ? undefined
          : "The organizers write every letter by hand, so tell them what to highlight."
      }
    >
      {sent ? (
        <div role="status">
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">
            An organizer would draft your letter and email it to{" "}
            <span className="font-medium text-ink">{values.email}</span>, usually within two
            weeks.
          </p>
          <p className="mt-5 rounded-2xl bg-yellow-mist p-5 text-[0.88rem] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">Heads up:</span> requests are not connected
            to a backend yet, so nothing was sent. Email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              {site.email}
            </a>{" "}
            to request your letter today.
          </p>
          <div className="mt-7">
            <Button variant="ink" magnetic={false} onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} noValidate className="grid gap-5">
          <TextField label="Your name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
          <TextField label="Role with GDG Nagpur" value={values.role} onChange={set("role")} error={errors.role} />
          <TextField
            label="Duration"
            placeholder="e.g. January 2025 to now"
            value={values.duration}
            onChange={set("duration")}
            error={errors.duration}
          />
          <TextAreaField
            label="What should the letter highlight?"
            hint="Events you ran, numbers you moved, things you built."
            rows={4}
            value={values.highlights}
            onChange={set("highlights")}
            error={errors.highlights}
          />
          <TextField label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
          <div className="pt-1">
            <Button type="submit" variant="ink" size="lg" magnetic={false}>
              Send request
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}

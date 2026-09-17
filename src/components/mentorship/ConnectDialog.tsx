"use client";

import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import { TextField, TextAreaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { Mentor } from "@/data/mentors";
import { site } from "@/data/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Tell them who you are.";
  if (!values.email.trim()) errors.email = "We need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "That does not look like an email address.";
  if (values.message.trim().length < 20)
    errors.message = "A sentence or two about what you want help with.";
  return errors;
}

/**
 * The form body, split out and keyed by mentor id at the call site so opening a
 * different mentor remounts it with fresh state. Resetting via an effect would
 * mean a second render pass every time the dialog opens.
 */
function ConnectForm({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO(backend): send the request. Nothing leaves the browser today.
    setSubmitted(true);
  }

  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: event.target.value }));

  if (submitted) {
    return (
      <div>
        <p className="text-[0.975rem] leading-relaxed text-ink-soft">
          Your request is with the chapter. You would get an email at{" "}
          <span className="font-medium text-ink">{values.email}</span> once{" "}
          {mentor.name} picks it up.
        </p>
        <p className="mt-4 rounded-2xl bg-yellow-mist p-4 text-[0.85rem] leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">Heads up:</span> this form is not
          connected to a backend yet, so nothing was actually sent. Email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>{" "}
          in the meantime.
        </p>
        <div className="mt-7">
          <Button onClick={onClose} variant="ink" magnetic={false}>
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <TextField
        label="Your name"
        value={values.name}
        onChange={set("name")}
        error={errors.name}
        autoComplete="name"
        placeholder="Priya Kulkarni"
      />
      <TextField
        label="Email"
        type="email"
        value={values.email}
        onChange={set("email")}
        error={errors.email}
        autoComplete="email"
        placeholder="you@example.com"
      />
      <TextAreaField
        label="What do you want help with?"
        hint="Be specific. A clear question gets a faster, better answer."
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        placeholder="I am six months into my first frontend job and trying to work out whether to specialise or stay broad..."
      />

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" variant="ink" magnetic={false}>
          Send request
        </Button>
        <Button type="button" onClick={onClose} variant="paper" magnetic={false}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

/**
 * Mentor connect request. Per PRD 7 this one needs no review queue.
 *
 * FRONTEND ONLY: submit is stubbed. Swap the handler in ConnectForm for a POST
 * to an API route, or a Google Form endpoint, once a backend exists.
 */
export default function ConnectDialog({
  mentor,
  onClose,
}: {
  mentor: Mentor | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={Boolean(mentor)}
      onClose={onClose}
      title={mentor ? `Connect with ${mentor.name}` : ""}
      description={
        mentor
          // Separator, not a full stop: company names that already end in "."
          // (Acme Inc.) would otherwise render a double period.
          ? `${mentor.role} at ${mentor.company} · sessions are free, and they usually reply within a few days.`
          : undefined
      }
    >
      {mentor ? (
        <ConnectForm key={mentor.id} mentor={mentor} onClose={onClose} />
      ) : null}
    </Dialog>
  );
}

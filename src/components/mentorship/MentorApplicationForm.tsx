"use client";

import { useEffect, useRef, useState } from "react";
import {
  TextField,
  TextAreaField,
  SelectField,
  ChipGroupField,
} from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import { MentorBadge } from "@/components/mentorship/MentorCard";
import { expertiseAreas } from "@/data/mentors";
import { site } from "@/data/site";

type Values = {
  name: string;
  email: string;
  role: string;
  company: string;
  linkedin: string;
  expertise: string[];
  availability: string;
  why: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const availabilityOptions = [
  { value: "", label: "Choose how much time you have" },
  { value: "1", label: "1 session a month" },
  { value: "2", label: "2 sessions a month" },
  { value: "3", label: "3 or more sessions a month" },
  { value: "adhoc", label: "Ad hoc - ask me when something comes up" },
];

const empty: Values = {
  name: "",
  email: "",
  role: "",
  company: "",
  linkedin: "",
  expertise: [],
  availability: "",
  why: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "We need a name to put on the profile.";
  if (!values.email.trim()) errors.email = "We need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "That does not look like an email address.";

  if (!values.role.trim()) errors.role = "What is your current role?";
  if (!values.company.trim()) errors.company = "Where do you work?";

  if (!values.linkedin.trim())
    errors.linkedin = "A LinkedIn profile is how we verify applications.";
  else if (!/^(https?:\/\/)?([\w-]+\.)*linkedin\.com\/.+/i.test(values.linkedin.trim()))
    errors.linkedin = "That does not look like a LinkedIn URL.";

  if (!values.expertise.length)
    errors.expertise = "Pick at least one area you can help with.";
  if (!values.availability) errors.availability = "Let us know how much time you have.";

  if (values.why.trim().length < 40)
    errors.why = "A few sentences, so the review has something to go on.";

  return errors;
}

/**
 * Mentor application. Per PRD 5.4 this one goes to a review queue rather than
 * publishing straight to the directory.
 *
 * FRONTEND ONLY: submit is stubbed and the success state says so. Swap
 * `handleSubmit` for a POST to an API route, or a Google Form endpoint, once a
 * backend exists.
 */
export default function MentorApplicationForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Move focus to the first field with a problem, so keyboard and screen reader
   * users are not left hunting for it.
   *
   * This has to happen after React commits: querying for [aria-invalid] inside
   * the submit handler runs against the previous render, where that attribute
   * is not set yet, and the focus call silently does nothing. `attempt` bumps
   * on every rejected submit so a repeat submit with identical errors still
   * re-focuses.
   */
  useEffect(() => {
    if (!attempt) return;
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!first) return;
    first.focus();
    first.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [attempt]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);

    if (Object.keys(next).length) {
      setAttempt((n) => n + 1);
      return;
    }

    // TODO(backend): send the application. Nothing leaves the browser today.
    setSubmitted(true);
  }

  const set =
    <K extends keyof Values>(key: K) =>
    (event: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [key]: event.target.value }));

  if (submitted) {
    return (
      <div className="card-sticker p-8 sm:p-12">
        <MentorBadge />
        <h2 className="mt-6 text-[1.85rem] leading-tight tracking-[-0.035em] sm:text-[2.25rem]">
          Application received
        </h2>
        <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
          The organizers review applications in batches, usually within a couple of weeks.
          You would hear back either way at{" "}
          <span className="font-medium text-ink">{values.email}</span> — if approved, your
          profile goes live on the directory with the badge above.
        </p>

        <p className="mt-6 rounded-2xl bg-yellow-mist p-5 text-[0.9rem] leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">Heads up:</span> this form is not
          connected to a backend yet, so nothing was actually submitted. Email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>{" "}
          if you want to apply today.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/mentorship" variant="ink">
            Back to mentorship
          </ButtonLink>
          <Button
            onClick={() => {
              setValues(empty);
              setErrors({});
              setSubmitted(false);
            }}
            variant="paper"
            magnetic={false}
          >
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card-sticker p-7 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Full name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
          placeholder="Saniya Imroze"
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
        <TextField
          label="Current role"
          value={values.role}
          onChange={set("role")}
          error={errors.role}
          autoComplete="organization-title"
          placeholder="Senior Backend Engineer"
        />
        <TextField
          label="Company"
          value={values.company}
          onChange={set("company")}
          error={errors.company}
          autoComplete="organization"
          placeholder="Where you work now"
        />
      </div>

      <TextField
        className="mt-6"
        label="LinkedIn profile"
        hint="We use this to verify applications. It is not published on your card."
        value={values.linkedin}
        onChange={set("linkedin")}
        error={errors.linkedin}
        inputMode="url"
        placeholder="https://linkedin.com/in/..."
      />

      <ChipGroupField
        className="mt-8"
        label="What can you help with?"
        options={expertiseAreas}
        value={values.expertise}
        onChange={(expertise) => setValues((v) => ({ ...v, expertise }))}
        error={errors.expertise}
      />

      <SelectField
        className="mt-8"
        label="How much time can you give?"
        options={availabilityOptions}
        value={values.availability}
        onChange={set("availability")}
        error={errors.availability}
      />

      <TextAreaField
        className="mt-6"
        label="Why do you want to mentor?"
        hint="What you would be good at helping with, and what you would rather not be asked about."
        rows={5}
        value={values.why}
        onChange={set("why")}
        error={errors.why}
        placeholder="I have hired and mentored juniors for six years and I am best at..."
      />

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="ink" size="lg" magnetic={false}>
          Submit application
        </Button>
        <p className="text-[0.85rem] text-ink-soft">
          Reviewed by the organizers. You will hear back either way.
        </p>
      </div>
    </form>
  );
}

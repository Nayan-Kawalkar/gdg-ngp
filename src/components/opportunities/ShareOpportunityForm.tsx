"use client";

import { useEffect, useRef, useState } from "react";
import SegmentTabs from "@/components/ui/SegmentTabs";
import { TextField, TextAreaField, SelectField } from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import FormSuccess from "@/components/ui/FormSuccess";
import { isBlank, isEmail, isPastDate, isShorterThan, isUrl } from "@/lib/validate";

type Kind = "job" | "internship" | "scholarship" | "help";

const kinds: { key: Kind; label: string }[] = [
  { key: "job", label: "Job" },
  { key: "internship", label: "Internship" },
  { key: "scholarship", label: "Scholarship" },
  { key: "help", label: "1:1 Help" },
];

type Values = {
  title: string;
  company: string;
  city: string;
  workMode: string;
  link: string;
  deadline: string;
  eligibility: string;
  description: string;
  name: string;
  email: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  title: "",
  company: "",
  city: "Nagpur",
  workMode: "",
  link: "",
  deadline: "",
  eligibility: "",
  description: "",
  name: "",
  email: "",
};

/** Which fields each type actually asks for. Everything else stays hidden. */
const fieldsFor: Record<Kind, (keyof Values)[]> = {
  job: ["title", "company", "city", "workMode", "link", "deadline", "description"],
  internship: ["title", "company", "city", "workMode", "link", "deadline", "description"],
  scholarship: ["title", "company", "eligibility", "link", "deadline", "description"],
  help: ["title", "description"],
};

const copy: Record<Kind, { title: string; titleHint: string; company: string; describe: string }> = {
  job: {
    title: "Role",
    titleHint: "",
    company: "Company",
    describe: "What the role involves and who would be a good fit.",
  },
  internship: {
    title: "Internship role",
    titleHint: "",
    company: "Company",
    describe: "What the intern will work on, duration, and whether there is a stipend.",
  },
  scholarship: {
    title: "Programme name",
    titleHint: "",
    company: "Offered by",
    describe: "What it covers and how selection works.",
  },
  help: {
    title: "What do you need help with?",
    titleHint: "One line. This becomes the title of your request.",
    company: "",
    describe: "The context someone would need to help you in thirty minutes.",
  },
};


function validate(kind: Kind, v: Values): Errors {
  const shown = fieldsFor[kind];
  const e: Errors = {};

  if (isBlank(v.title)) e.title = "This needs a title.";
  if (shown.includes("company") && isBlank(v.company))
    e.company = kind === "scholarship" ? "Who offers it?" : "Which company is hiring?";
  if (shown.includes("city") && isBlank(v.city)) e.city = "Where is it based?";
  if (shown.includes("workMode") && !v.workMode) e.workMode = "On-site, hybrid or remote?";
  if (shown.includes("eligibility") && isBlank(v.eligibility))
    e.eligibility = "Who can apply?";
  if (shown.includes("link")) {
    if (isBlank(v.link)) e.link = "Where do people apply?";
    else if (!isUrl(v.link)) e.link = "Use a full link starting with https://";
  }
  if (shown.includes("deadline") && isPastDate(v.deadline))
    e.deadline = "That date has already passed.";
  if (isShorterThan(v.description, 40))
    e.description = "A few sentences, so people know whether it is for them.";
  if (isBlank(v.name)) e.name = "Listings credit whoever shared them.";
  if (isBlank(v.email)) e.email = "We need an email in case the review has a question.";
  else if (!isEmail(v.email))
    e.email = "That does not look like an email address.";

  return e;
}

/**
 * The single intake form from PRD 7: a type selector first, and the form adapts
 * to it. Everything goes to a review queue before it is published.
 *
 * Deliberately NOT wrapped in data-reveal by the page: reveal targets sit at
 * visibility:hidden until scrolled to, and hidden fields cannot take focus.
 *
 * FRONTEND ONLY: submit is stubbed and the success state says so.
 */
export default function ShareOpportunityForm() {
  const [kind, setKind] = useState<Kind>("job");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus the first problem after React commits the error state - see the
  // mentor application form for why this cannot run inside the handler.
  useEffect(() => {
    if (!attempt) return;
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!first) return;
    first.focus();
    first.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [attempt]);

  const shown = fieldsFor[kind];
  const text = copy[kind];

  function changeKind(next: Kind) {
    setKind(next);
    // Errors for fields that just disappeared would otherwise linger.
    setErrors({});
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(kind, values);
    setErrors(next);
    if (Object.keys(next).length) {
      setAttempt((n) => n + 1);
      return;
    }
    // TODO(backend): send to the review queue. Nothing leaves the browser today.
    setSubmitted(true);
  }

  const set =
    (key: keyof Values) =>
    (event: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [key]: event.target.value }));

  if (submitted) {
    return (
      <FormSuccess
        title={<>Thanks, {values.name.split(" ")[0]}.</>}
        actions={
          <>
            <ButtonLink href="/opportunities" variant="ink">
              Back to the board
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
              Share another
            </Button>
          </>
        }
      >
        &ldquo;{values.title}&rdquo; would now be in the review queue. Once approved it goes
        live on the board with you credited, and we would email{" "}
        <span className="font-medium text-ink">{values.email}</span> either way.
      </FormSuccess>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card-sticker p-7 sm:p-10">
      <p id="kind-label" className="text-[0.9rem] font-medium">
        What are you sharing?
      </p>
      <SegmentTabs
        className="mt-3"
        options={kinds}
        value={kind}
        onChange={changeKind}
        label="Type of opportunity"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <TextField
          className="sm:col-span-2"
          label={text.title}
          hint={text.titleHint || undefined}
          value={values.title}
          onChange={set("title")}
          error={errors.title}
        />

        {shown.includes("company") ? (
          <TextField
            className={shown.includes("city") ? "" : "sm:col-span-2"}
            label={text.company}
            value={values.company}
            onChange={set("company")}
            error={errors.company}
            autoComplete="organization"
          />
        ) : null}

        {shown.includes("city") ? (
          <TextField
            label="City"
            value={values.city}
            onChange={set("city")}
            error={errors.city}
          />
        ) : null}

        {shown.includes("workMode") ? (
          <SelectField
            label="Work mode"
            options={[
              { value: "", label: "Choose one" },
              { value: "On-site", label: "On-site" },
              { value: "Hybrid", label: "Hybrid" },
              { value: "Remote", label: "Remote" },
            ]}
            value={values.workMode}
            onChange={set("workMode")}
            error={errors.workMode}
          />
        ) : null}

        {shown.includes("deadline") ? (
          <TextField
            label="Application deadline"
            optional
            type="date"
            value={values.deadline}
            onChange={set("deadline")}
            error={errors.deadline}
          />
        ) : null}

        {shown.includes("eligibility") ? (
          <TextField
            className="sm:col-span-2"
            label="Who can apply?"
            value={values.eligibility}
            onChange={set("eligibility")}
            error={errors.eligibility}
            placeholder="e.g. Final-year CS students in Maharashtra"
          />
        ) : null}

        {shown.includes("link") ? (
          <TextField
            className="sm:col-span-2"
            label="Link to apply"
            type="url"
            inputMode="url"
            value={values.link}
            onChange={set("link")}
            error={errors.link}
            placeholder="https://"
          />
        ) : null}

        <TextAreaField
          className="sm:col-span-2"
          label="Description"
          hint={text.describe}
          rows={5}
          value={values.description}
          onChange={set("description")}
          error={errors.description}
        />
      </div>

      <div className="mt-10 border-t border-ink/8 pt-8">
        <p className="label-caps text-ink-soft/60">About you</p>
        <p className="mt-2 text-[0.85rem] text-ink-soft">
          Your name appears on the listing. Your email does not.
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <TextField
            label="Your name"
            value={values.name}
            onChange={set("name")}
            error={errors.name}
            autoComplete="name"
          />
          <TextField
            label="Email"
            type="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="ink" size="lg" magnetic={false}>
          Submit for review
        </Button>
        <p className="text-[0.85rem] text-ink-soft">
          Reviewed by the organizers before it goes live.
        </p>
      </div>
    </form>
  );
}

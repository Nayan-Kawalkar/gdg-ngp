"use client";

import { useEffect, useRef, useState } from "react";
import SegmentTabs from "@/components/ui/SegmentTabs";
import {
  ChipGroupField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import FormSuccess from "@/components/ui/FormSuccess";
import { expertiseAreas } from "@/data/mentors";
import { speakFormats } from "@/data/speak";
import { useHash } from "@/lib/useHash";
import { isBlank, isEmail, isLinkedIn, isShorterThan, isUrl } from "@/lib/validate";

type Kind = "speaker" | "judge";

const kinds: { key: Kind; label: string }[] = [
  { key: "speaker", label: "Apply to speak" },
  { key: "judge", label: "Apply to judge" },
];

type Values = {
  name: string;
  email: string;
  linkedin: string;
  // speaker
  title: string;
  abstract: string;
  format: string;
  level: string;
  bio: string;
  pastTalks: string;
  firstTime: boolean;
  // judge
  expertise: string[];
  availability: string;
  pastJudging: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  linkedin: "",
  title: "",
  abstract: "",
  format: "",
  level: "",
  bio: "",
  pastTalks: "",
  firstTime: false,
  expertise: [],
  availability: "",
  pastJudging: "",
};

const formatOptions = [
  { value: "", label: "Choose a format" },
  ...speakFormats.map((f) => ({ value: f.id, label: f.name })),
  { value: "any", label: "Not sure, you pick" },
];

const levelOptions = [
  { value: "", label: "Who is it for?" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const availabilityOptions = [
  { value: "", label: "Choose one" },
  { value: "weekend", label: "Weekends" },
  { value: "weekday", label: "Weekday afternoons" },
  { value: "either", label: "Either, with notice" },
  { value: "remote", label: "Remote judging only" },
];

function validate(kind: Kind, v: Values): Errors {
  const e: Errors = {};
  if (isBlank(v.name)) e.name = "We need a name for the event page.";
  if (isBlank(v.email)) e.email = "We need an email to reply to.";
  else if (!isEmail(v.email)) e.email = "That does not look like an email address.";
  if (isBlank(v.linkedin)) e.linkedin = "A LinkedIn profile helps the review.";
  else if (!isLinkedIn(v.linkedin)) e.linkedin = "That does not look like a LinkedIn URL.";

  if (kind === "speaker") {
    if (isBlank(v.title)) e.title = "Give the talk a working title.";
    if (isShorterThan(v.abstract, 80))
      e.abstract = "A short paragraph - what you will cover and what people leave with.";
    if (!v.format) e.format = "Pick a format, or let us choose.";
    if (!v.level) e.level = "Who is the talk pitched at?";
    if (isShorterThan(v.bio, 30)) e.bio = "Two or three lines about you.";
    if (v.pastTalks.trim() && !isUrl(v.pastTalks))
      e.pastTalks = "Use a full link starting with https://";
  } else {
    if (!v.expertise.length) e.expertise = "Pick at least one area you can judge.";
    if (!v.availability) e.availability = "When could you usually make it?";
  }
  return e;
}

/**
 * Speaker + judge applications (PRD 5.8), one form with a type switch.
 *
 * Deep links pick the tab: `#judge` opens the judge form (the footer links
 * there), and `#propose-<format>` from the format rows opens the speaker form
 * with that format selected.
 *
 * FRONTEND ONLY: submit is stubbed and the success state says so.
 */
export default function SpeakApplicationForm() {
  const [kind, setKind] = useState<Kind>("speaker");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useHash((hash) => {
    // `#judge` is a real id on the form column (see the page), so the browser
    // and Lenis scroll to it themselves - including when arriving from another
    // page, where a scroll from this effect would lose to Next's own.
    if (hash === "judge") {
      setKind("judge");
      setErrors({});
      return;
    }
    const proposed = hash.match(/^propose-(.+)$/)?.[1];
    if (!proposed || !speakFormats.some((f) => f.id === proposed)) return;
    setKind("speaker");
    setErrors({});
    setValues((v) => ({ ...v, format: proposed }));
    // No element carries `propose-*`, so nothing scrolls on its own.
    document.getElementById("judge")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  useEffect(() => {
    if (!attempt) return;
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!first) return;
    first.focus();
    first.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [attempt]);

  function changeKind(next: Kind) {
    setKind(next);
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
    const first = values.name.split(" ")[0];
    return (
      <FormSuccess
        title={<>Thanks, {first}.</>}
        actions={
          <>
            <ButtonLink href="/events" variant="ink">
              See upcoming events
            </ButtonLink>
            <Button
              variant="paper"
              magnetic={false}
              onClick={() => {
                setValues(empty);
                setErrors({});
                setSubmitted(false);
              }}
            >
              Send another
            </Button>
          </>
        }
      >
        {kind === "speaker" ? (
          <>
            &ldquo;{values.title}&rdquo; would now be with two organizers for review. You
            would hear back at <span className="font-medium text-ink">{values.email}</span>{" "}
            within about two weeks, with a date and format if it is a fit.
          </>
        ) : (
          <>
            Your judging application would now be with the organizers. We would email{" "}
            <span className="font-medium text-ink">{values.email}</span> before the next
            hackathon with dates and the rubric.
          </>
        )}
      </FormSuccess>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card-sticker p-7 sm:p-10">
      <SegmentTabs
        options={kinds}
        value={kind}
        onChange={changeKind}
        label="Application type"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <TextField
          label="Full name"
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

        {kind === "speaker" ? (
          <>
            <TextField
              className="sm:col-span-2"
              label="Talk title"
              hint="A working title is fine. We can sharpen it together."
              value={values.title}
              onChange={set("title")}
              error={errors.title}
            />
            <TextAreaField
              className="sm:col-span-2"
              label="Abstract"
              hint="What you will cover, and what people will be able to do afterwards."
              rows={5}
              value={values.abstract}
              onChange={set("abstract")}
              error={errors.abstract}
            />
            <SelectField
              label="Preferred format"
              options={formatOptions}
              value={values.format}
              onChange={set("format")}
              error={errors.format}
            />
            <SelectField
              label="Level"
              options={levelOptions}
              value={values.level}
              onChange={set("level")}
              error={errors.level}
            />
            <TextAreaField
              className="sm:col-span-2"
              label="Short bio"
              hint="As it would appear on the event page."
              rows={3}
              value={values.bio}
              onChange={set("bio")}
              error={errors.bio}
            />
            <TextField
              label="Link to a past talk"
              optional
              type="url"
              inputMode="url"
              placeholder="https://"
              value={values.pastTalks}
              onChange={set("pastTalks")}
              error={errors.pastTalks}
            />
          </>
        ) : (
          <>
            <ChipGroupField
              className="sm:col-span-2"
              label="What can you judge?"
              options={expertiseAreas}
              value={values.expertise}
              onChange={(expertise) => setValues((v) => ({ ...v, expertise }))}
              error={errors.expertise}
            />
            <SelectField
              label="Availability"
              options={availabilityOptions}
              value={values.availability}
              onChange={set("availability")}
              error={errors.availability}
            />
          </>
        )}

        <TextField
          label="LinkedIn"
          inputMode="url"
          placeholder="linkedin.com/in/you"
          value={values.linkedin}
          onChange={set("linkedin")}
          error={errors.linkedin}
        />

        {kind === "judge" ? (
          <TextAreaField
            className="sm:col-span-2"
            label="Hackathons you have judged or mentored"
            optional
            rows={3}
            value={values.pastJudging}
            onChange={set("pastJudging")}
          />
        ) : (
          <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={values.firstTime}
              onChange={(e) => setValues((v) => ({ ...v, firstTime: e.target.checked }))}
              className="mt-1 size-4 accent-[var(--color-brand-blue)]"
            />
            <span className="text-[0.92rem] leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">This would be my first talk.</span>{" "}
              We will pair you with a speaker who has done it before.
            </span>
          </label>
        )}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="ink" size="lg" magnetic={false}>
          Submit application
        </Button>
        <p className="text-[0.85rem] text-ink-soft">Reviewed by two organizers.</p>
      </div>
    </form>
  );
}

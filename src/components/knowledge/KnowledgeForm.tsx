"use client";

import { useEffect, useRef, useState } from "react";
import SegmentTabs from "@/components/ui/SegmentTabs";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import FormSuccess from "@/components/ui/FormSuccess";
import { useHash } from "@/lib/useHash";
import { isBlank, isEmail, isPastDate, isShorterThan, isUrl } from "@/lib/validate";

type Kind = "reel" | "session";

const kinds: { key: Kind; label: string }[] = [
  { key: "reel", label: "Submit a video" },
  { key: "session", label: "Propose a session" },
];

type Values = {
  name: string;
  email: string;
  topic: string;
  // reel
  link: string;
  description: string;
  // session
  format: string;
  level: string;
  date: string;
  outline: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  topic: "",
  link: "",
  description: "",
  format: "",
  level: "",
  date: "",
  outline: "",
};

const formatOptions = [
  { value: "", label: "Choose a format" },
  { value: "talk", label: "Talk with Q&A (45 min)" },
  { value: "workshop", label: "Hands-on workshop (90 min)" },
  { value: "live-coding", label: "Live coding (60 min)" },
  { value: "live-guest", label: "Guest on a YouTube Live" },
];

const levelOptions = [
  { value: "", label: "Who is it for?" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

function validate(kind: Kind, v: Values): Errors {
  const e: Errors = {};
  if (isBlank(v.name)) e.name = "We credit every video and session by name.";
  if (isBlank(v.email)) e.email = "We need an email to reply to.";
  else if (!isEmail(v.email)) e.email = "That does not look like an email address.";
  if (isBlank(v.topic)) e.topic = kind === "reel" ? "What is the video about?" : "What would you cover?";

  if (kind === "reel") {
    if (isBlank(v.link)) e.link = "Link to the video - Drive, YouTube or Instagram.";
    else if (!isUrl(v.link)) e.link = "Use a full link starting with https://";
    if (isShorterThan(v.description, 20)) e.description = "A line or two of context for the caption.";
  } else {
    if (!v.format) e.format = "Pick a format.";
    if (!v.level) e.level = "Who is it pitched at?";
    if (isPastDate(v.date)) e.date = "That date has already passed.";
    if (isShorterThan(v.outline, 60)) e.outline = "A rough outline - three or four bullet points is plenty.";
  }
  return e;
}

/**
 * Video submission + online session proposal (PRD 5.9, forms inventory 7).
 * `#submit-reel` / `#submit-session` from the path cards pick the tab; no
 * element carries those ids, so this scrolls to the form itself.
 *
 * FRONTEND ONLY: submit is stubbed and the success state says so.
 */
export default function KnowledgeForm() {
  const [kind, setKind] = useState<Kind>("reel");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useHash((hash) => {
    const next = hash === "submit-reel" ? "reel" : hash === "submit-session" ? "session" : null;
    if (!next) return;
    setKind(next);
    setErrors({});
    document.getElementById("submit")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  useEffect(() => {
    if (!attempt) return;
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!first) return;
    first.focus();
    first.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [attempt]);

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
            <ButtonLink href="/community" variant="ink">
              Say hello in the community
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
              Submit another
            </Button>
          </>
        }
      >
        {kind === "reel"
          ? "Your video would now be with the content team. If it is a fit we reshare it with credit and tag you."
          : "Your session idea would now be with the organizers. We would reply with a date and a tech-check slot."}{" "}
        Replies go to <span className="font-medium text-ink">{values.email}</span>.
      </FormSuccess>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card-sticker p-7 sm:p-10">
      <SegmentTabs
        options={kinds}
        value={kind}
        onChange={(next) => {
          setKind(next);
          setErrors({});
        }}
        label="What are you sharing?"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <TextField label="Your name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <TextField label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        <TextField
          className="sm:col-span-2"
          label={kind === "reel" ? "Topic" : "Session title"}
          value={values.topic}
          onChange={set("topic")}
          error={errors.topic}
        />

        {kind === "reel" ? (
          <>
            <TextField
              className="sm:col-span-2"
              label="Link to the video"
              hint="Google Drive, YouTube (unlisted is fine) or Instagram."
              type="url"
              inputMode="url"
              placeholder="https://"
              value={values.link}
              onChange={set("link")}
              error={errors.link}
            />
            <TextAreaField
              className="sm:col-span-2"
              label="Short description"
              hint="What should the caption say?"
              rows={3}
              value={values.description}
              onChange={set("description")}
              error={errors.description}
            />
          </>
        ) : (
          <>
            <SelectField label="Format" options={formatOptions} value={values.format} onChange={set("format")} error={errors.format} />
            <SelectField label="Audience level" options={levelOptions} value={values.level} onChange={set("level")} error={errors.level} />
            <TextField
              label="Preferred date"
              optional
              type="date"
              value={values.date}
              onChange={set("date")}
              error={errors.date}
            />
            <TextAreaField
              className="sm:col-span-2"
              label="Outline"
              hint="What you would cover, in order."
              rows={5}
              value={values.outline}
              onChange={set("outline")}
              error={errors.outline}
            />
          </>
        )}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="ink" size="lg" magnetic={false}>
          {kind === "reel" ? "Submit video" : "Send proposal"}
        </Button>
        <p className="text-[0.85rem] text-ink-soft">Reviewed before anything is published.</p>
      </div>
    </form>
  );
}

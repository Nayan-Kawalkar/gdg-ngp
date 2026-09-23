"use client";

import { useEffect, useRef, useState } from "react";
import SegmentTabs from "@/components/ui/SegmentTabs";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { Button, ButtonLink } from "@/components/ui/Button";
import FormSuccess from "@/components/ui/FormSuccess";
import { tiers } from "@/data/collaborate";
import { useHash } from "@/lib/useHash";
import { isBlank, isEmail, isShorterThan } from "@/lib/validate";

type Kind = "sponsor" | "partner";

const kinds: { key: Kind; label: string }[] = [
  { key: "sponsor", label: "Sponsor an event" },
  { key: "partner", label: "Co-host / partner" },
];

type Values = {
  org: string;
  contact: string;
  email: string;
  // sponsor
  tier: string;
  budget: string;
  // partner
  idea: string;
  audience: string;
  month: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  org: "",
  contact: "",
  email: "",
  tier: "",
  budget: "",
  idea: "",
  audience: "",
  month: "",
  message: "",
};

const tierOptions = [
  { value: "", label: "Choose a tier" },
  ...tiers.map((t) => ({ value: t.id, label: t.name })),
  { value: "in-kind", label: "In-kind (venue, credits, food)" },
  { value: "unsure", label: "Not sure yet" },
];

const budgetOptions = [
  { value: "", label: "Prefer not to say" },
  { value: "<50k", label: "Under ₹50,000" },
  { value: "50k-2l", label: "₹50,000 - ₹2,00,000" },
  { value: ">2l", label: "Over ₹2,00,000" },
];

const audienceOptions = [
  { value: "", label: "Choose one" },
  { value: "<50", label: "Under 50" },
  { value: "50-150", label: "50 - 150" },
  { value: "150-400", label: "150 - 400" },
  { value: ">400", label: "400+" },
];

function validate(kind: Kind, v: Values): Errors {
  const e: Errors = {};
  if (isBlank(v.org))
    e.org = kind === "sponsor" ? "Which company is this for?" : "Which organization are you with?";
  if (isBlank(v.contact)) e.contact = "Who should we talk to?";
  if (isBlank(v.email)) e.email = "We need an email to reply to.";
  else if (!isEmail(v.email)) e.email = "That does not look like an email address.";

  if (kind === "sponsor") {
    if (!v.tier) e.tier = "Pick a tier, or 'Not sure yet'.";
    if (isShorterThan(v.message, 20)) e.message = "A line or two on what you have in mind.";
  } else {
    if (isShorterThan(v.idea, 40)) e.idea = "A few sentences on the event you are imagining.";
    if (!v.audience) e.audience = "Roughly how many people?";
  }
  return e;
}

/**
 * Sponsor inquiry + collaboration request (PRD 7), one form with a switch.
 *
 * Deep links: `#sponsor` / `#partner` (footer) pick the tab - those ids live on
 * page sections, so the browser does the scrolling. `#enquire-<tier>` from a
 * tier card picks the tier too, and scrolls here itself because no element
 * carries that id.
 *
 * FRONTEND ONLY: submit is stubbed and the success state says so.
 */
export default function CollaborateForm() {
  const [kind, setKind] = useState<Kind>("sponsor");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useHash((hash) => {
    if (hash === "sponsor" || hash === "partner") {
      setKind(hash);
      setErrors({});
      return;
    }
    const tier = hash.match(/^enquire-(.+)$/)?.[1];
    if (!tier || !tiers.some((t) => t.id === tier)) return;
    setKind("sponsor");
    setErrors({});
    setValues((v) => ({ ...v, tier }));
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        title={<>Thanks, {values.contact.split(" ")[0]}.</>}
        actions={
          <>
            <ButtonLink href="/events" variant="ink">
              See what we run
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
        An organizer would now reply to{" "}
        <span className="font-medium text-ink">{values.email}</span> within a few working
        days to set up a call about {values.org}
        {kind === "sponsor" ? "'s sponsorship" : "'s event idea"}.
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
        label="Type of enquiry"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <TextField
          className="sm:col-span-2"
          label={kind === "sponsor" ? "Company" : "Organization"}
          value={values.org}
          onChange={set("org")}
          error={errors.org}
          autoComplete="organization"
        />
        <TextField
          label="Your name"
          value={values.contact}
          onChange={set("contact")}
          error={errors.contact}
          autoComplete="name"
        />
        <TextField
          label="Work email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
        />

        {kind === "sponsor" ? (
          <>
            <SelectField
              label="Tier"
              options={tierOptions}
              value={values.tier}
              onChange={set("tier")}
              error={errors.tier}
            />
            <SelectField
              label="Budget range"
              options={budgetOptions}
              value={values.budget}
              onChange={set("budget")}
            />
            <TextAreaField
              className="sm:col-span-2"
              label="What would you like to support?"
              hint="A specific event, a kind of audience, a hiring goal - anything helps."
              rows={4}
              value={values.message}
              onChange={set("message")}
              error={errors.message}
            />
          </>
        ) : (
          <>
            <TextAreaField
              className="sm:col-span-2"
              label="The event idea"
              hint="Format, topic, who it is for. Rough is fine."
              rows={5}
              value={values.idea}
              onChange={set("idea")}
              error={errors.idea}
            />
            <SelectField
              label="Expected audience"
              options={audienceOptions}
              value={values.audience}
              onChange={set("audience")}
              error={errors.audience}
            />
            <TextField
              label="Preferred month"
              optional
              type="month"
              value={values.month}
              onChange={set("month")}
            />
          </>
        )}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="ink" size="lg" magnetic={false}>
          Send enquiry
        </Button>
        <p className="text-[0.85rem] text-ink-soft">An organizer replies within a few days.</p>
      </div>
    </form>
  );
}

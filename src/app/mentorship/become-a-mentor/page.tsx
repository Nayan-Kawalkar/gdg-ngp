import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { MentorBadge } from "@/components/mentorship/MentorCard";
import MentorApplicationForm from "@/components/mentorship/MentorApplicationForm";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Become a Mentor",
  description:
    "Apply to mentor with GDG Nagpur. An hour a month, reviewed by the organizers, and approved mentors go live on the directory with a badge.",
};

const expectations = [
  {
    title: "About an hour a month",
    body: "One or two conversations. You set the number when you apply and you can change it or pause whenever you need to.",
  },
  {
    title: "You pick what you answer",
    body: "Your card lists the areas you are happy to help with. Requests outside them get routed elsewhere, not to you.",
  },
  {
    title: "No teaching, no curriculum",
    body: "Nobody is asking you to prepare a syllabus. Most sessions are someone describing a problem and you telling them what you would do.",
  },
  {
    title: "You can stop any time",
    body: "Tell us and the profile comes down that day. No notice period, no awkward conversation.",
  },
];

const reviewSteps = [
  {
    label: "Applied",
    body: "You send the form. We check the LinkedIn profile matches the role and company.",
    dot: "bg-brand-blue",
  },
  {
    label: "Under review",
    body: "The organizers read it in a batch, usually within a couple of weeks. We may email with a question.",
    dot: "bg-brand-yellow",
  },
  {
    label: "Approved and live",
    body: "Your profile joins the public directory with the GDG Nagpur Mentor badge, and requests start coming in.",
    dot: "bg-brand-green",
  },
];

const faqs = [
  {
    q: "Do I need to be senior?",
    a: "No. Two years ahead of someone is enough to be useful to them. Some of the most valuable mentors here are three years into their careers and remember exactly what the first year felt like.",
  },
  {
    q: "What if I get a request I cannot help with?",
    a: "Decline it. Say so plainly and we will route it to someone else. Nobody expects you to answer everything.",
  },
  {
    q: "Will my email be public?",
    a: "No. Requests come through the chapter, and only your name, role, company and areas appear on the card.",
  },
  {
    q: "Why is there a review step at all?",
    a: "Because the badge has to mean something. If anyone could list themselves, the directory would be worth nothing to the people using it.",
  },
];

export default function BecomeAMentorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream pb-16 pt-28 sm:pt-32 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[12%] top-[-28%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-yellow-mist),transparent_62%)]" />
          <div className="absolute -left-[10%] bottom-[-38%] size-[28rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-green-mist),transparent_62%)]" />
        </div>

        <Container className="relative">
          <Link
            href="/mentorship"
            className="press group inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-soft hover:text-ink"
          >
            <ArrowIcon className="size-4 rotate-180" />
            Mentorship
          </Link>

          <div className="mt-8">
            <MentorBadge />
          </div>

          <h1
            data-motion-text="lines"
            data-motion-delay="0.1"
            className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98]"
          >
            <span className="motion-line-mask">
              <span className="motion-line">An hour a month</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line">changes someone</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line text-brand-green">else&rsquo;s year.</span>
            </span>
          </h1>

          <p
            data-reveal="fade-up"
            data-reveal-delay="0.5"
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
          >
            Mentoring here is deliberately low-commitment. You answer questions in areas you
            pick, as often as you want, and you can stop whenever. The review exists so the
            badge keeps meaning something.
          </p>
        </Container>
      </section>

      {/* What we ask */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="What we ask"
            title="Honestly, not very much."
            lede="If any of this stops being true for you, tell us and we will take the profile down the same day."
          />

          <div data-reveal-group className="mt-14 grid gap-5 sm:grid-cols-2">
            {expectations.map((item, i) => (
              <article key={item.title} data-reveal-item className="card-inset card-pop p-8 sm:p-9">
                <span className="label-caps text-ink-soft/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.3rem] tracking-[-0.03em] sm:text-[1.45rem]">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.95rem] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Review process */}
      <section className="relative overflow-hidden bg-ink-deep py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-dotted-dark opacity-25" />
        <Container className="relative">
          <Eyebrow tone="dark">The review</Eyebrow>
          <h2
            data-motion-text="words"
            className="mt-5 max-w-2xl text-[2rem] leading-[1.05] sm:text-[2.6rem]"
          >
            What happens after you hit submit.
          </h2>

          <ol data-reveal-group className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3">
            {reviewSteps.map((step, i) => (
              <li key={step.label} data-reveal-item className="bg-ink-deep p-8 sm:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className={cn("size-2.5 rounded-full", step.dot)} />
                  <span className="label-caps text-white/40">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-[1.35rem] tracking-[-0.03em]">
                  {step.label}
                </h3>
                <p className="mt-3 text-[0.925rem] leading-[1.7] text-white/60">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Application */}
      <Section id="apply" tone="cream">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Apply</Eyebrow>
              <h2
                data-motion-text="words"
                className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.5rem]"
              >
                Tell us what you are good at.
              </h2>
              <p
                data-reveal="fade-up"
                className="mt-5 max-w-md text-[1.0375rem] leading-relaxed text-ink-soft"
              >
                Takes about five minutes. Be specific about what you would rather not be
                asked — it makes the directory more useful for everyone.
              </p>
            </div>

            {/* Deliberately NOT wrapped in data-reveal: the motion system holds
                reveal targets at visibility:hidden until they scroll into view, and
                a hidden element cannot take focus - which breaks both keyboard
                tabbing into the form and focusing the first invalid field. */}
            <MentorApplicationForm />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow="Questions" title="Before you apply." />
          <div data-reveal-group className="mt-12 max-w-3xl">
            {faqs.map((faq) => (
              <details key={faq.q} data-reveal-item className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-medium tracking-[-0.02em] marker:hidden sm:text-[1.15rem]">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-black/8 bg-cream transition-colors duration-300 group-open:bg-ink group-open:text-white"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[0.975rem] leading-[1.75] text-ink-soft">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

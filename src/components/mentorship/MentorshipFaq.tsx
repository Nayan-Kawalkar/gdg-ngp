import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/data/site";

const faqs = [
  {
    q: "Is it actually free?",
    a: "Yes. Mentors volunteer their time and the chapter takes nothing. If anyone ever asks you for money through this directory, tell us.",
  },
  {
    q: "How long is a session?",
    a: "Usually 30 to 45 minutes over a call. Some mentors prefer async - a few messages back and forth - and will say so when they reply.",
  },
  {
    q: "What if nobody replies?",
    a: "Mentors have day jobs, so give it about a week. If you hear nothing, send another request to a different mentor, or email us and we will chase it.",
  },
  {
    q: "Can I ask for a referral?",
    a: "You can ask, but do not lead with it. Mentors are here to help you get better, not to hand out referrals to strangers. Earn it over a couple of conversations.",
  },
  {
    q: "Can I talk to the same mentor more than once?",
    a: "Yes, if they are up for it. Most sessions that go well turn into an occasional check-in rather than a one-off.",
  },
];

export default function MentorshipFaq() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeader eyebrow="Questions" title="Before you send a request." />

        <div data-reveal-group className="mt-12 max-w-3xl">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              data-reveal-item
              className="group border-b border-ink/10 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-medium tracking-[-0.02em] marker:hidden sm:text-[1.15rem]">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-black/8 bg-paper transition-colors duration-300 group-open:bg-ink group-open:text-white"
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

        <p data-reveal="fade-up" className="mt-10 text-[0.95rem] text-ink-soft">
          Still stuck?{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </Section>
  );
}

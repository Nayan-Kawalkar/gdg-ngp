import type { Metadata } from "next";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import Faq from "@/components/ui/Faq";
import { IconCheck } from "@/components/ui/Icons";
import FormatRows from "@/components/speak/FormatRows";
import PastSpeakers from "@/components/speak/PastSpeakers";
import SpeakApplicationForm from "@/components/speak/SpeakApplicationForm";
import {
  lookFor,
  pastSpeakers,
  selectionSteps,
  speakFaqs,
  speakFormats,
  youGet,
} from "@/data/speak";

export const metadata: Metadata = {
  title: "Speak / Judge",
  description:
    "Give a talk, run a workshop or judge a hackathon with GDG Nagpur. Roadshows, bootcamps, study jams, workshops and fireside chats - first-time speakers welcome.",
};

export default function SpeakPage() {
  return (
    <>
      <PageHero
        eyebrow="Speak / Judge"
        lines={["Take the stage.", "Or judge the ones who do."]}
        lede="The chapter runs on people who know something and are willing to show it. Propose a talk, run a workshop, or sit on a hackathon panel - we help with the rest."
        washes={["red", "blue"]}
        actions={
          <>
            <ButtonLink href="#apply" variant="ink" size="lg">
              Apply to speak
            </ButtonLink>
            <ButtonLink href="#judge" variant="paper" size="lg">
              Apply to judge
            </ButtonLink>
          </>
        }
        stats={[
          { value: speakFormats.length, label: "formats", dot: "bg-brand-red" },
          { value: `${pastSpeakers.length}+`, label: "past speakers & judges", dot: "bg-brand-blue" },
          { value: "Welcome", label: "first-timers", dot: "bg-brand-green" },
        ]}
      />

      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Formats"
            title="Five ways to take the mic."
            lede="Pick the one that fits what you know. Each row opens the form with that format already chosen."
          />
          <FormatRows />
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div data-reveal-group className="grid gap-5 lg:grid-cols-2">
            {[
              { title: "What we look for", items: lookFor, dot: "bg-brand-blue" },
              { title: "What you get", items: youGet, dot: "bg-brand-green" },
            ].map((column) => (
              <div key={column.title} data-reveal-item className="card-sticker p-8 sm:p-10">
                <Eyebrow>{column.title}</Eyebrow>
                <ul className="mt-7 space-y-5">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink/5">
                        <IconCheck className="size-3.5" />
                      </span>
                      <span className="text-[0.975rem] leading-[1.65] text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" className="overflow-hidden">
        <Container>
          <SectionHeader
            eyebrow="On our stage before"
            title="People who said yes."
            lede="Engineers, designers and founders from Nagpur and further out. Most had never spoken at a meetup before their first one here."
          />
          <PastSpeakers />
        </Container>
      </Section>

      <Section id="apply" tone="cream" className="scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>How selection works</Eyebrow>
              <h2
                data-motion-text="words"
                className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.6rem]"
              >
                Apply in five minutes.
              </h2>
              <ol className="mt-9 space-y-6">
                {selectionSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="label-caps mt-0.5 w-6 shrink-0 text-ink-soft/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-heading text-[1.1rem] tracking-[-0.02em]">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[0.92rem] leading-[1.65] text-ink-soft">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Not wrapped in data-reveal: hidden fields cannot take focus.
                `#judge` is the deep-link target the footer uses. */}
            <div id="judge" className="scroll-mt-28">
              <SpeakApplicationForm />
            </div>
          </div>
        </Container>
      </Section>

      <Faq items={speakFaqs} title="Before you apply." tone="paper" />
    </>
  );
}

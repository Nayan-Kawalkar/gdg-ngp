import type { Metadata } from "next";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import Faq from "@/components/ui/Faq";
import { IconCheck, IconClose, IconYouTube } from "@/components/ui/Icons";
import PathCards from "@/components/knowledge/PathCards";
import LiveSchedule from "@/components/knowledge/LiveSchedule";
import VideoCard from "@/components/knowledge/VideoCard";
import KnowledgeForm from "@/components/knowledge/KnowledgeForm";
import {
  knowledgeFaqs,
  liveSessions,
  recentVideos,
  reelDonts,
  reelDos,
} from "@/data/knowledge";
import { socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Share Your Knowledge",
  description:
    "Make a tech reel, run an online session or join a YouTube Live with GDG Nagpur. Guidelines, the live schedule and a submission form.",
};

export default function ShareYourKnowledgePage() {
  return (
    <>
      <PageHero
        eyebrow="Share your knowledge"
        lines={["Don't just attend.", "Teach."]}
        lede="The best way to learn something is to explain it. Make a short video, run an online session, or come on a YouTube Live - we will help you get it out there."
        washes={["green", "red"]}
        actions={
          <>
            <ButtonLink href="#submit-reel" variant="ink" size="lg">
              Submit a video
            </ButtonLink>
            <ButtonLink href="#submit-session" variant="paper" size="lg">
              Propose a session
            </ButtonLink>
          </>
        }
        stats={[
          { value: liveSessions.length, label: "lives scheduled", dot: "bg-brand-green" },
          { value: recentVideos.length, label: "recent videos", dot: "bg-brand-red" },
          { value: "Credited", label: "always", dot: "bg-brand-blue" },
        ]}
      />

      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Three ways in"
            title="Pick the one that fits your week."
            lede="None of them need a stage, a slide deck or permission to be an expert."
          />
          <PathCards />
        </Container>
      </Section>

      {/* Reel guidelines */}
      <Section id="reels" tone="cream" className="scroll-mt-16">
        <Container>
          <SectionHeader
            eyebrow="Video guidelines"
            title="What makes a reel we will reshare."
          />
          <div data-reveal-group className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              { title: "Do", items: reelDos, Icon: IconCheck, tone: "bg-green-mist text-green-deep" },
              { title: "Don't", items: reelDonts, Icon: IconClose, tone: "bg-red-mist text-red-deep" },
            ].map(({ title, items, Icon, tone }) => (
              <div key={title} data-reveal-item className="card-sticker p-8 sm:p-10">
                <Eyebrow>{title}</Eyebrow>
                <ul className="mt-7 space-y-4">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${tone}`}>
                        <Icon className="size-3.5" />
                      </span>
                      <span className="text-[0.975rem] leading-[1.65] text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Live schedule */}
      <Section id="live" tone="paper" className="scroll-mt-16">
        <Container>
          <SectionHeader
            eyebrow="YouTube Live"
            title="On air this season."
            lede="Monthly lives on the chapter channel. Want to co-host or be a guest? Propose it below."
            action={
              <ButtonLink href={socials.youtube} variant="outline">
                <IconYouTube className="size-4" />
                Subscribe
              </ButtonLink>
            }
          />
          <LiveSchedule />
        </Container>
      </Section>

      {/* Recent videos */}
      <Section tone="cream">
        <Container>
          <SectionHeader
            eyebrow="Recently shared"
            title="Made by the community."
            lede="Talks from our events and reels from members. Press play - nothing loads until you do."
          />
          <div data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section id="submit" tone="paper" className="scroll-mt-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Submit</Eyebrow>
              <h2 data-motion-text="words" className="mt-5 text-[2rem] leading-[1.05] sm:text-[2.6rem]">
                Send it our way.
              </h2>
              <p className="mt-5 text-[0.975rem] leading-[1.7] text-ink-soft">
                Everything is reviewed by the content team before we publish or reshare it,
                and you are credited by name every time.
              </p>
            </aside>
            {/* Not wrapped in data-reveal: hidden fields cannot take focus. */}
            <KnowledgeForm />
          </div>
        </Container>
      </Section>

      <Faq items={knowledgeFaqs} title="Good to know." />
    </>
  );
}

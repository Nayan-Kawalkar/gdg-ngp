import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ArrowCircle, DfArrow, DfButton, DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { ArrowRight, Silhouette } from "@/components/devfest/icons";
import { devfestLinks, devfestSpeak, devfestSpeakerSlots } from "@/data/devfest";
import { cn } from "@/lib/cn";

/**
 * The template's "Meet the Captains": the Gate D26 lounge behind, a row of
 * four speaker cards. Nobody is announced yet, so each card is an open slot
 * that leads to the speaker application.
 */
export default function SpeakSection() {
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="relative isolate scroll-mt-20 overflow-hidden pb-20 pt-20 lg:pb-28 lg:pt-28"
    >
      <Image
        src="/devfest/gate-d26.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[85%_bottom] lg:object-bottom"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-df-paper from-15% via-df-paper/65 via-45% to-df-paper/0 to-75%"
      />

      <Container>
        <DfIntro
          headingId="speakers-title"
          eyebrow={devfestSpeak.eyebrow}
          title={devfestSpeak.title}
          sub={devfestSpeak.sub}
          action={
            <>
              <DfButton href={devfestLinks.applyToSpeak}>
                {devfestSpeak.primary}
                <DfArrow />
              </DfButton>
              <DfButton href={devfestLinks.applyToJudge} variant="outline">
                {devfestSpeak.secondary}
              </DfButton>
            </>
          }
        />

        <ul
          data-reveal-group
          className="mx-auto mt-12 grid max-w-[58rem] grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          {devfestSpeakerSlots.map((slot) => (
            <li key={slot.format} data-reveal-item className="[perspective:1100px]">
              <Link
                href={devfestLinks.applyToSpeak}
                aria-label={`${slot.format} at ${slot.room}: speaker to be announced. Apply for this slot`}
                className="group block h-full rounded-3xl"
              >
                {/* Turns over on hover (pointer devices) or keyboard focus to
                    show the slot as a gate display. */}
                <span className="relative block h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] motion-safe:group-hover:[transform:rotateY(180deg)] motion-safe:group-focus-visible:[transform:rotateY(180deg)]">
                  <span
                    className={cn(
                      "flex h-full flex-col items-center rounded-3xl bg-white/90 p-4 text-center [backface-visibility:hidden] sm:p-5",
                      dfCardShadow,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-20 items-end justify-center overflow-hidden rounded-full bg-df-mist/80 sm:size-28"
                    >
                      <Silhouette className="size-[4.25rem] translate-y-1 text-df-steel sm:size-24 sm:translate-y-1.5" />
                    </span>
                    <span className="mt-4 font-df text-[0.92rem] font-semibold leading-snug text-df-navy sm:mt-5 sm:text-[1rem]">
                      To be announced
                    </span>
                    <span className="mt-1 text-[0.78rem] leading-snug text-df-slate sm:text-[0.82rem]">
                      {slot.format} &middot; {slot.room}
                    </span>
                    <span className="mt-auto flex w-full items-center justify-between gap-2 pt-5 text-left">
                      <span className="font-df text-[0.8rem] font-semibold leading-snug text-df-navy sm:text-[0.84rem]">
                        Apply for
                        <br />
                        this slot
                      </span>
                      <ArrowCircle />
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-df-midnight p-4 text-left text-white [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5"
                  >
                    <span>
                      <span className="font-df text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                        Speaker slot
                      </span>
                      <span className="mt-1.5 block font-df text-[1.15rem] font-bold leading-tight sm:text-[1.3rem]">
                        {slot.format}
                      </span>
                      <span className="mt-1 block text-[0.8rem] text-white/70">{slot.room}</span>
                    </span>
                    <span className="flex items-center gap-2 font-df text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-df-amber">
                      <span className="size-2 rounded-full bg-df-amber" />
                      Slot open
                    </span>
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-df text-[0.85rem] font-semibold">Apply to speak</span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-df-amber">
                        <ArrowRight className="size-3.5" />
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

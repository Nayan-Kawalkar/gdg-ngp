import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { IconLinkedIn } from "@/components/ui/Icons";
import type { GdgEvent, AgendaItem, Speaker, Sponsor } from "@/data/events";
import { cn } from "@/lib/cn";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

/* ------------------------------- Agenda -------------------------------- */

function Agenda({ items }: { items: AgendaItem[] }) {
  return (
    <div>
      <Eyebrow>Agenda</Eyebrow>
      <h2 className="mt-5 text-[1.85rem] leading-[1.05] tracking-[-0.035em] sm:text-[2.25rem]">
        How the day runs
      </h2>

      <ol className="mt-9">
        {items.map((item, i) => {
          const isBreak = item.kind === "break";
          return (
            <li
              key={`${item.time}-${item.title}`}
              className={cn(
                "relative grid grid-cols-[4.5rem_1fr] gap-4 py-5 sm:grid-cols-[5.5rem_1fr] sm:gap-6",
                i !== 0 && "border-t border-ink/8",
              )}
            >
              <time className="label-caps pt-1 text-ink-soft/70">{item.time}</time>
              <div>
                <h3
                  className={cn(
                    "text-[1.05rem] leading-snug tracking-[-0.02em] sm:text-[1.15rem]",
                    isBreak && "text-ink-soft",
                  )}
                >
                  {item.title}
                </h3>
                {item.detail ? (
                  <p className="mt-2 max-w-xl text-[0.925rem] leading-[1.7] text-ink-soft">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------ Speakers ------------------------------- */

function Speakers({ speakers }: { speakers: Speaker[] }) {
  return (
    <Section tone="paper">
      <Container>
        <Eyebrow>Speakers</Eyebrow>
        <h2
          data-motion-text="words"
          className="mt-5 max-w-2xl text-[2rem] leading-[1.05] sm:text-[2.5rem]"
        >
          Who you will hear from
        </h2>

        <div
          data-reveal-group
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {speakers.map((speaker) => (
            <article key={speaker.id} data-reveal-item className="card-inset card-pop group p-7">
              {speaker.photo ? (
                <div className="relative size-16 overflow-hidden rounded-2xl">
                  <Image src={speaker.photo} alt="" fill sizes="64px" className="object-cover" />
                </div>
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-2xl bg-ink/5 font-heading text-xl font-medium text-ink-soft transition-colors duration-500 group-hover:bg-blue-mist group-hover:text-blue-deep"
                >
                  {initials(speaker.name)}
                </span>
              )}

              <h3 className="mt-6 text-[1.1rem] leading-tight tracking-[-0.025em]">
                {speaker.name}
              </h3>
              <p className="mt-1.5 text-[0.85rem] text-ink-soft">
                {speaker.role} &middot; {speaker.company}
              </p>
              {speaker.topic ? (
                <p className="mt-4 border-t border-ink/8 pt-4 text-[0.85rem] leading-snug text-ink-soft">
                  {speaker.topic}
                </p>
              ) : null}

              {speaker.linkedin ? (
                <a
                  href={speaker.linkedin}
                  aria-label={`${speaker.name} on LinkedIn`}
                  className="press mt-5 inline-flex size-9 items-center justify-center rounded-full border border-black/8 bg-paper text-ink-soft transition-colors hover:bg-ink hover:text-white"
                >
                  <IconLinkedIn className="size-4" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------ Sponsors ------------------------------- */

const tierOrder: Sponsor["tier"][] = ["Platinum", "Gold", "Venue", "Community"];

function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  const grouped = tierOrder
    .map((tier) => ({ tier, items: sponsors.filter((s) => s.tier === tier) }))
    .filter((g) => g.items.length);

  return (
    <Section tone="cream">
      <Container>
        <Eyebrow>Partners</Eyebrow>
        <h2
          data-motion-text="words"
          className="mt-5 max-w-2xl text-[2rem] leading-[1.05] sm:text-[2.5rem]"
        >
          Who makes it possible
        </h2>

        <div data-reveal-group className="mt-12 space-y-8">
          {grouped.map((group) => (
            <div key={group.tier} data-reveal-item>
              <h3 className="label-caps text-ink-soft/60">{group.tier}</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {group.items.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.url ?? "#"}
                    className="card-sticker card-pop group flex min-w-[14rem] flex-1 items-center justify-between gap-4 p-6 sm:max-w-xs"
                  >
                    {/* TODO(logos): swap for real sponsor marks once cleared for use. */}
                    <span className="font-heading text-[1.05rem] tracking-[-0.025em]">
                      {sponsor.name}
                    </span>
                    <ArrowIcon className="size-4 shrink-0 text-ink-soft" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------- Recap -------------------------------- */

function Recap({ event }: { event: GdgEvent }) {
  const hasVideo = Boolean(event.youtubeId) && event.youtubeId !== "REPLACE_WITH_REAL_ID";

  return (
    <Section tone="ink">
      <Container>
        <Eyebrow tone="dark">Recap</Eyebrow>
        <h2
          data-motion-text="words"
          className="mt-5 max-w-2xl text-[2rem] leading-[1.05] sm:text-[2.5rem]"
        >
          How it actually went
        </h2>

        {hasVideo ? (
          <div
            data-reveal="fade-up"
            className="mt-12 aspect-video w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${event.youtubeId}`}
              title={`${event.title} recording`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="size-full"
            />
          </div>
        ) : null}

        {event.gallery?.length ? (
          <div
            data-reveal-group
            className={cn(
              "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
              hasVideo ? "mt-5" : "mt-12",
            )}
          >
            {event.gallery.map((src, i) => (
              <figure
                key={src}
                data-reveal-item
                className={cn(
                  "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]",
                  i % 2 === 0 ? "aspect-4/5" : "aspect-square",
                )}
              >
                <Image
                  src={src}
                  alt={`${event.title} photo`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* ------------------------------ Composition ---------------------------- */

export default function EventBody({ event }: { event: GdgEvent }) {
  const hasIntro = Boolean(event.description?.length || event.takeaways?.length);
  const hasAgenda = Boolean(event.agenda?.length);
  const hasRecap =
    event.status === "past" &&
    Boolean(event.gallery?.length || (event.youtubeId && event.youtubeId !== "REPLACE_WITH_REAL_ID"));

  return (
    <>
      {hasIntro || hasAgenda ? (
        <Section tone="cream">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
              {hasIntro ? (
                <div>
                  <Eyebrow>About this event</Eyebrow>
                  <div className="mt-5 space-y-5">
                    {event.description?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-[1.0375rem] leading-[1.75] text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {event.takeaways?.length ? (
                    <div className="card-inset mt-9 p-8">
                      <h3 className="label-caps text-ink-soft/70">What you leave with</h3>
                      <ul className="mt-5 space-y-3.5">
                        {event.takeaways.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue"
                            />
                            <span className="text-[0.95rem] leading-[1.7] text-ink-soft">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {hasAgenda ? <Agenda items={event.agenda!} /> : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {event.speakers?.length ? <Speakers speakers={event.speakers} /> : null}
      {event.sponsors?.length ? <Sponsors sponsors={event.sponsors} /> : null}
      {hasRecap ? <Recap event={event} /> : null}
    </>
  );
}

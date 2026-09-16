import { Container, Section, Eyebrow } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { IconInstagram, IconLinkedIn, IconMail } from "@/components/ui/Icons";
import { GDGDots } from "@/components/ui/Shapes";
import { organizer } from "@/data/home";
import { site } from "@/data/site";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function OrganizerStrip() {
  return (
    <Section tone="paper">
      <Container>
        <div
          data-reveal="fade-up"
          className="card-inset relative overflow-hidden p-8 sm:p-12 lg:p-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_85%_20%,var(--color-blue-mist),transparent_60%)]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
            {/* TODO(photo): replace this initials tile with a real portrait. */}
            <div className="relative">
              <div className="flex size-32 items-center justify-center rounded-[2rem] bg-brand-blue font-heading text-4xl font-medium text-white sm:size-40 sm:rounded-[2.5rem] sm:text-5xl">
                {initials(organizer.name)}
              </div>
              <GDGDots className="absolute -bottom-3 -right-3 size-10 rounded-2xl border border-black/8 bg-paper p-2" />
            </div>

            <div>
              <Eyebrow>Who runs this</Eyebrow>
              <h2
                data-motion-text="words"
                className="mt-4 text-[2rem] leading-[1.03] tracking-[-0.04em] sm:text-[2.6rem]"
              >
                {organizer.name}
              </h2>
              <p className="mt-2 text-[0.95rem] font-medium text-brand-blue">
                {organizer.role}
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                {organizer.bio}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <a
                  href={organizer.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="press group inline-flex items-center gap-2 rounded-full border border-black/8 bg-paper px-4 py-2.5 text-[0.875rem] font-medium hover:bg-ink hover:text-white"
                >
                  <IconLinkedIn className="size-4" /> LinkedIn <ArrowIcon className="size-3.5" />
                </a>
                <a
                  href={organizer.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="press group inline-flex items-center gap-2 rounded-full border border-black/8 bg-paper px-4 py-2.5 text-[0.875rem] font-medium hover:bg-ink hover:text-white"
                >
                  <IconInstagram className="size-4" /> Instagram <ArrowIcon className="size-3.5" />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="press group inline-flex items-center gap-2 rounded-full border border-black/8 bg-paper px-4 py-2.5 text-[0.875rem] font-medium hover:bg-ink hover:text-white"
                >
                  <IconMail className="size-4" /> Email the chapter{" "}
                  <ArrowIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

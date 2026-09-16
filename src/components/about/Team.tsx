import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { IconInstagram, IconLinkedIn, IconMail } from "@/components/ui/Icons";
import { GDGDots } from "@/components/ui/Shapes";
import { coreTeam, type TeamMember } from "@/data/about";
import { organizer } from "@/data/home";
import { site, socials } from "@/data/site";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article
      data-reveal-item
      className="card-inset card-pop group p-7"
    >
      {/* TODO(team): swap the initials tile for a portrait once photos exist. */}
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-2xl bg-ink/5 font-heading text-xl font-medium text-ink-soft transition-colors duration-500 group-hover:bg-blue-mist group-hover:text-blue-deep"
      >
        {initials(member.name)}
      </span>

      <h3 className="mt-6 text-[1.15rem] leading-tight tracking-[-0.025em]">{member.name}</h3>
      <p className="mt-1.5 text-[0.875rem] text-ink-soft">{member.role}</p>

      <div className="mt-5 flex gap-2">
        {member.linkedin ? (
          <a
            href={member.linkedin}
            aria-label={`${member.name} on LinkedIn`}
            className="press flex size-9 items-center justify-center rounded-full border border-black/8 bg-paper text-ink-soft transition-colors hover:bg-ink hover:text-white"
          >
            <IconLinkedIn className="size-4" />
          </a>
        ) : null}
        {member.instagram ? (
          <a
            href={member.instagram}
            aria-label={`${member.name} on Instagram`}
            className="press flex size-9 items-center justify-center rounded-full border border-black/8 bg-paper text-ink-soft transition-colors hover:bg-ink hover:text-white"
          >
            <IconInstagram className="size-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader
          eyebrow="The team"
          title="Who actually does the work."
          lede="A handful of volunteers with day jobs. If you want to help run this, there is always room."
        />

        {/* Organizer feature */}
        <div
          data-reveal="fade-up"
          className="card-inset relative mt-14 overflow-hidden p-8 sm:p-10 lg:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_85%_25%,var(--color-blue-mist),transparent_60%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
            <div className="relative">
              <div className="flex size-28 items-center justify-center rounded-[2rem] bg-brand-blue font-heading text-3xl font-medium text-white sm:size-36 sm:text-4xl">
                {initials(organizer.name)}
              </div>
              <GDGDots className="absolute -bottom-3 -right-3 size-10 rounded-2xl border border-black/8 bg-paper p-2" />
            </div>

            <div>
              <Eyebrow>Organizer</Eyebrow>
              <h3 className="mt-4 text-[1.85rem] leading-[1.03] tracking-[-0.04em] sm:text-[2.35rem]">
                {organizer.name}
              </h3>
              <p className="mt-2 text-[0.95rem] font-medium text-brand-blue">
                {organizer.role}
              </p>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                {organizer.bio}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <a
                  href={organizer.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="press group inline-flex items-center gap-2 rounded-full border border-black/8 bg-paper px-4 py-2.5 text-[0.875rem] font-medium hover:bg-ink hover:text-white"
                >
                  <IconLinkedIn className="size-4" /> LinkedIn
                  <ArrowIcon className="size-3.5" />
                </a>
                <a
                  href={organizer.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="press group inline-flex items-center gap-2 rounded-full border border-black/8 bg-paper px-4 py-2.5 text-[0.875rem] font-medium hover:bg-ink hover:text-white"
                >
                  <IconInstagram className="size-4" /> Instagram
                  <ArrowIcon className="size-3.5" />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="press group inline-flex items-center gap-2 rounded-full border border-black/8 bg-paper px-4 py-2.5 text-[0.875rem] font-medium hover:bg-ink hover:text-white"
                >
                  <IconMail className="size-4" /> Email the chapter
                  <ArrowIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Core team + volunteer slot */}
        <div
          data-reveal-group
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {coreTeam.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}

          <article
            data-reveal-item
            className="flex flex-col justify-between rounded-[var(--radius-3xl)] border border-dashed border-ink/20 bg-transparent p-7"
          >
            <div>
              <span
                aria-hidden="true"
                className="flex size-16 items-center justify-center rounded-2xl border border-dashed border-ink/20 font-heading text-2xl text-ink-soft/50"
              >
                +
              </span>
              <h3 className="mt-6 text-[1.15rem] leading-tight tracking-[-0.025em]">This could be you</h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
                We need help with events, content and design.
              </p>
            </div>
            <div className="mt-5">
              <ButtonLink href={socials.discord} variant="ink" size="sm" magnetic={false}>
                Volunteer with us
              </ButtonLink>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}

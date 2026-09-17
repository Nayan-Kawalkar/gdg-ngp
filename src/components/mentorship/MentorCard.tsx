"use client";

import Image from "next/image";
import { IconLinkedIn, IconClock } from "@/components/ui/Icons";
import { GDGDots } from "@/components/ui/Shapes";
import type { Mentor } from "@/data/mentors";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

/** The "GDG Nagpur Mentor" badge with the shine sweep asked for in PRD 8. */
export function MentorBadge() {
  return (
    <span className="animate-shine relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-ink px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-white">
      <GDGDots className="size-3" />
      GDG Nagpur Mentor
    </span>
  );
}

export default function MentorCard({
  mentor,
  onConnect,
}: {
  mentor: Mentor;
  onConnect: (mentor: Mentor) => void;
}) {
  return (
    <article className="card-sticker card-pop group flex flex-col p-7 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        {/* TODO(photos): swap the initials tile for a portrait once we have one. */}
        {mentor.photo ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
            <Image src={mentor.photo} alt="" fill sizes="64px" className="object-cover" />
          </div>
        ) : (
          <span
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-ink/5 font-heading text-xl font-medium text-ink-soft transition-colors duration-500 group-hover:bg-blue-mist group-hover:text-blue-deep"
          >
            {initials(mentor.name)}
          </span>
        )}

        {mentor.linkedin ? (
          <a
            href={mentor.linkedin}
            aria-label={`${mentor.name} on LinkedIn`}
            className="press flex size-9 items-center justify-center rounded-full border border-black/8 bg-cream text-ink-soft transition-colors hover:bg-ink hover:text-white"
          >
            <IconLinkedIn className="size-4" />
          </a>
        ) : null}
      </div>

      <div className="mt-6">
        <MentorBadge />
      </div>

      <h3 className="mt-5 text-[1.25rem] leading-tight tracking-[-0.03em]">{mentor.name}</h3>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        {mentor.role} &middot; {mentor.company}
      </p>

      <p className="mt-4 text-[0.925rem] leading-[1.7] text-ink-soft">{mentor.bio}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {mentor.expertise.map((area) => (
          <li
            key={area}
            className="rounded-full bg-ink/5 px-3 py-1.5 text-[0.78rem] font-medium text-ink-soft"
          >
            {area}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <hr className="rule-hair" />
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[0.82rem] text-ink-soft">
            <IconClock className="size-4 shrink-0 text-ink-soft/50" />
            {mentor.availability}
          </span>
          <button
            type="button"
            onClick={() => onConnect(mentor)}
            className="btn-solid h-10 bg-ink px-5 text-[0.875rem] text-white"
          >
            Connect for free
          </button>
        </div>
      </div>
    </article>
  );
}

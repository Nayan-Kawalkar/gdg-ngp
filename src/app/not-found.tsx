import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Quarter, Ring } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Page not found",
};

const suggestions = [
  { label: "Upcoming events", href: "/events", note: "See what is on next" },
  { label: "Find a mentor", href: "/mentorship", note: "Free, from people who do the job" },
  { label: "Opportunities", href: "/opportunities", note: "Jobs, internships, scholarships" },
  { label: "Community", href: "/community", note: "Discord, WhatsApp and X" },
];

/** 404. Two cropped shapes per DESIGN.md, and the four places people usually meant. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream pb-20 pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Ring className="animate-floaty absolute -right-24 -top-24 w-[22rem] text-blue-soft sm:w-[30rem]" />
        <Quarter className="absolute -bottom-16 -left-16 w-[16rem] text-yellow-soft sm:w-[22rem]" />
      </div>

      <Container className="relative">
        <p
          data-reveal="fade-up"
          className="font-heading text-[clamp(6rem,22vw,15rem)] leading-[0.8] tracking-[-0.06em] text-ink/10"
        >
          404
        </p>
        <h1
          data-motion-text="lines"
          data-motion-delay="0.1"
          className="mt-6 max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.98]"
        >
          <span className="motion-line-mask">
            <span className="motion-line">This page wandered off.</span>
          </span>{" "}
          <span className="motion-line-mask">
            <span className="motion-line text-brand-blue">Here is where to go.</span>
          </span>
        </h1>

        <ul data-reveal-group className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {suggestions.map((item) => (
            <li key={item.href} data-reveal-item>
              <Link href={item.href} className="card-sticker card-pop group flex items-center gap-4 p-5">
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[1.1rem] tracking-[-0.02em]">{item.label}</span>
                  <span className="block truncate text-[0.85rem] text-ink-soft">{item.note}</span>
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-colors duration-400 group-hover:bg-ink group-hover:text-white">
                  <ArrowIcon className="size-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div data-reveal="fade-up" className="mt-10">
          <ButtonLink href="/" variant="ink" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

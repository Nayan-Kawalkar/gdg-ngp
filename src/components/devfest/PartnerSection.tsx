import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { DfArrow, DfButton, DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { Briefcase, Gate, Layers, Store } from "@/components/devfest/icons";
import { devfestLinks, devfestPartner } from "@/data/devfest";
import { cn } from "@/lib/cn";

const icons = { tiers: Layers, gate: Gate, stall: Store, briefcase: Briefcase } as const;

/**
 * The template's "Our Partners in Flight": the terminal on the right, a row of
 * white cards. No partners are confirmed yet, so the row shows the ways in
 * (with starting prices) instead of logos.
 */
export default function PartnerSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 lg:py-28"
    >
      <Image
        src="/devfest/terminal.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[85%_top]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-df-paper/90 via-df-paper/70 to-df-paper/95 lg:bg-linear-to-r lg:from-df-paper lg:via-df-paper/75 lg:via-45% lg:to-df-paper/0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-df-paper to-df-paper/0"
      />

      <Container>
        <DfIntro
          headingId="partners-title"
          eyebrow={devfestPartner.eyebrow}
          title={devfestPartner.title}
          sub={devfestPartner.sub}
          action={
            <>
              <DfButton href={devfestLinks.partnershipDeck}>
                {devfestPartner.primary}
                <DfArrow />
              </DfButton>
              <DfButton href={devfestLinks.talkToUs} variant="outline">
                {devfestPartner.secondary}
              </DfButton>
            </>
          }
        />

        <ul data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {devfestPartner.options.map((option, i) => {
            const Icon = icons[option.icon as keyof typeof icons];
            return (
              <li
                key={option.title}
                data-reveal-item
                className={cn("flex items-center gap-4 rounded-2xl bg-white/90 p-5 backdrop-blur-sm", dfCardShadow)}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                    i % 2 === 0 ? "bg-df-sky/10 text-df-blue" : "bg-df-amber/10 text-df-orange",
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-df text-[0.95rem] font-semibold leading-snug text-df-navy">{option.title}</h3>
                  <p className="mt-0.5 text-[0.85rem] text-df-slate">
                    from <span className="font-df text-[1rem] font-bold text-df-navy">{option.from}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

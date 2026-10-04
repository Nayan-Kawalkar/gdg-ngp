import { Container } from "@/components/ui/Section";
import { DfArrow, DfButton, DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { Check, Plane } from "@/components/devfest/icons";
import { devfestPasses, devfestPassesIntro } from "@/data/devfest";
import { cn } from "@/lib/cn";

type Pass = (typeof devfestPasses)[number];

/**
 * Passes, drawn as boarding passes: NAG → NEXT, a perforated tear line with
 * notches, what the pass includes, and a stub with the booking button (each
 * pass has its own registration form) beside a barcode. The notches are
 * circles in the section's own (solid) colour, so they read as bites out of
 * the ticket.
 */
export default function PassesSection() {
  return (
    <section id="passes" aria-labelledby="passes-title" className="scroll-mt-20 bg-df-mist py-20 lg:py-28">
      <Container>
        <DfIntro
          headingId="passes-title"
          eyebrow={devfestPassesIntro.eyebrow}
          title={devfestPassesIntro.title}
          sub={devfestPassesIntro.sub}
        />

        <div data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {devfestPasses.map((pass) => (
            <BoardingPass key={pass.id} pass={pass} dark={pass.id === "business"} />
          ))}
        </div>

        <p data-reveal="fade-up" className="mt-8 text-center text-[0.95rem] text-df-slate">
          {devfestPassesIntro.note}
        </p>
      </Container>
    </section>
  );
}

function BoardingPass({ pass, dark }: { pass: Pass; dark: boolean }) {
  const muted = dark ? "text-white/65" : "text-df-slate";
  return (
    <article
      data-reveal-item
      aria-labelledby={`pass-${pass.id}`}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[1.75rem]",
        dark ? "bg-df-midnight text-white" : "bg-white text-df-navy",
        dfCardShadow,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 whitespace-nowrap px-6 py-3.5 font-df text-[0.62rem] font-semibold uppercase tracking-[0.1em] sm:px-8 sm:text-[0.7rem] sm:tracking-[0.16em]",
          dark ? "bg-white/[0.07] text-white/70" : "bg-df-mist/60 text-df-slate",
        )}
      >
        <span>DevFest Nagpur 2026</span>
        <span className="flex items-center gap-2">
          Boarding pass
          <Plane aria-hidden="true" className="size-4 text-df-amber" />
        </span>
      </div>

      <div className="px-6 pb-7 pt-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id={`pass-${pass.id}`} className="font-df text-[0.8rem] font-semibold uppercase tracking-[0.16em]">
            {pass.name}
          </h3>
          {pass.badge ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-df-amber/12 px-3 py-1 font-df text-[0.72rem] font-semibold text-df-navy">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-df-orange" />
              {pass.badge}
            </span>
          ) : null}
        </div>
        {/* Orange on white only clears large-text contrast in the deeper shade */}
        <p
          className={cn(
            "mt-2 font-df text-[2.75rem] font-bold leading-none tracking-[-0.02em] sm:text-[3.25rem]",
            dark ? "text-df-amber" : "text-df-orange",
          )}
        >
          {pass.price}
        </p>
        <p className={cn("mt-3 text-[0.98rem] leading-snug", muted)}>{pass.tagline}</p>

        {/* NAG → NEXT, the badge's own route */}
        <div className="mt-7 flex items-end gap-4">
          <div>
            <p className="font-df text-[1.9rem] font-bold leading-none tracking-tight">NAG</p>
            <p className={cn("mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em]", muted)}>Nagpur</p>
          </div>
          <div aria-hidden="true" className="relative mb-5 flex-1">
            <span className={cn("block border-t-2 border-dashed", dark ? "border-white/25" : "border-df-steel/60")} />
            <Plane className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-df-amber" />
          </div>
          <div className="text-right">
            <p className="font-df text-[1.9rem] font-bold leading-none tracking-tight">NEXT</p>
            <p className={cn("mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em]", muted)}>
              What&apos;s next
            </p>
          </div>
        </div>
      </div>

      {/* Tear line: notches are page-coloured circles, clipped by the card */}
      <div aria-hidden="true" className="relative h-6">
        <span className="absolute -left-3 top-0 size-6 rounded-full bg-df-mist" />
        <span className="absolute -right-3 top-0 size-6 rounded-full bg-df-mist" />
        <span
          className={cn(
            "absolute inset-x-6 top-1/2 border-t-2 border-dashed",
            dark ? "border-white/20" : "border-df-mist",
          )}
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-8">
        <p className={cn("font-df text-[0.68rem] font-semibold uppercase tracking-[0.16em]", muted)}>
          {devfestPassesIntro.includes}
        </p>
        <ul className="mt-3.5 space-y-3">
          {pass.perks.map((perk) => (
            <li key={perk} className="flex gap-3 text-[0.95rem] leading-snug">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  dark ? "bg-df-amber text-white" : "bg-df-amber/15 text-df-orange",
                )}
              >
                <Check className="size-3.5" />
              </span>
              <span className={dark ? "text-white/90" : "text-df-ink"}>{perk}</span>
            </li>
          ))}
        </ul>
        {pass.motto ? (
          <p className={cn("mt-5 font-df text-[0.95rem] font-semibold", dark ? "text-df-amber" : "text-df-blue")}>
            {pass.motto}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-5 pt-8">
          <DfButton href={pass.href}>
            {pass.cta}
            <DfArrow />
            <span className="sr-only"> (registration form, opens in a new tab)</span>
          </DfButton>
          <span aria-hidden="true" className="flex flex-col items-end gap-1.5">
            <span className={cn("font-df text-[0.66rem] font-semibold uppercase tracking-[0.16em]", muted)}>
              Flight DF26
            </span>
            <span
              className={cn(
                "h-9 w-32 bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_8px,currentColor_8px_11px,transparent_11px_13px)]",
                dark ? "text-white/35" : "text-df-navy/35",
              )}
            />
          </span>
        </div>
      </div>
    </article>
  );
}

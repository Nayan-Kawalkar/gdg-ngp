import { ArrowIcon } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { tiers } from "@/data/collaborate";
import { cn } from "@/lib/cn";

/**
 * Three tiers, the middle one featured on ink. Each CTA deep-links into the
 * enquiry form with that tier chosen (`#enquire-<tier>`, read by
 * CollaborateForm). No prices on purpose: every package is scoped per event.
 */
export default function SponsorTiers() {
  return (
    <div data-reveal-group className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:items-stretch">
      {tiers.map((tier) => {
        const featured = Boolean(tier.featured);
        return (
          <article
            key={tier.id}
            data-reveal-item
            className={cn(
              "card-pop group relative flex flex-col overflow-hidden p-8 sm:p-9",
              featured ? "card-sticker-dark bg-ink-deep text-white lg:-my-4 lg:py-12" : "card-sticker",
            )}
          >
            {featured ? (
              <span className="animate-shine absolute right-6 top-6 overflow-hidden rounded-full bg-brand-yellow px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-ink">
                Most chosen
              </span>
            ) : null}

            <span className={cn("label-caps", featured ? "text-white/50" : "text-ink-soft/60")}>
              Tier
            </span>
            <h3 className="mt-3 text-[2.25rem] leading-none tracking-[-0.045em]">{tier.name}</h3>
            <p className={cn("mt-3 text-[0.95rem]", featured ? "text-white/65" : "text-ink-soft")}>
              {tier.tagline}
            </p>

            <ul className="mt-8 space-y-3.5">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[0.92rem] leading-snug">
                  <span
                    className={cn(
                      "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
                      featured ? "bg-white/10" : "bg-ink/5",
                    )}
                  >
                    <IconCheck className="size-3" />
                  </span>
                  <span className={featured ? "text-white/80" : "text-ink-soft"}>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <a
                href={`#enquire-${tier.id}`}
                className={cn(
                  "btn-solid h-12 w-full gap-2 px-6 text-[0.95rem]",
                  featured ? "bg-white text-ink hover:bg-cream" : "bg-ink text-white hover:bg-ink-deep",
                )}
              >
                Enquire about {tier.name}
                <ArrowIcon />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

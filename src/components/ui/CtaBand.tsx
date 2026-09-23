import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/**
 * Closing call-to-action band: copy on the left and one or two pills (or a
 * small form) on the right, in a card that suits the section behind it.
 * Ends most inner pages.
 *
 * Tone is a prop rather than a className override for the same reason as
 * Section's padding: conflicting utilities resolve by stylesheet order.
 */
export default function CtaBand({
  title,
  body,
  actions,
  id,
  tone = "paper",
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  actions: ReactNode;
  id?: string;
  tone?: "paper" | "cream";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24", tone === "paper" ? "bg-paper" : "bg-cream", className)}
    >
      <Container>
        <div
          data-reveal="fade-up"
          className={cn(
            "flex flex-col items-start gap-6 p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14",
            tone === "paper" ? "card-inset" : "card-sticker",
          )}
        >
          <div>
            <h2 className="max-w-lg text-[1.75rem] leading-[1.1] sm:text-[2.25rem]">{title}</h2>
            {body ? (
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">{body}</p>
            ) : null}
          </div>
          <div className="flex w-full shrink-0 flex-wrap gap-3 lg:w-auto">{actions}</div>
        </div>
      </Container>
    </section>
  );
}

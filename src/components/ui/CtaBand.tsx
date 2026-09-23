import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/**
 * Closing call-to-action band: an inset card on a paper section, copy on the
 * left and one or two pills on the right. Ends most inner pages.
 */
export default function CtaBand({
  title,
  body,
  actions,
  id,
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  actions: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("bg-paper py-20 sm:py-24", className)}>
      <Container>
        <div
          data-reveal="fade-up"
          className="card-inset flex flex-col items-start gap-6 p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14"
        >
          <div>
            <h2 className="max-w-lg text-[1.75rem] leading-[1.1] sm:text-[2.25rem]">{title}</h2>
            {body ? (
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">{body}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
        </div>
      </Container>
    </section>
  );
}

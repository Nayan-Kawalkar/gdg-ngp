"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * Route-level error boundary. Deliberately free of motion attributes: if the
 * failure came from the page's own markup, the reveal system may not run, and
 * this must never render invisible.
 *
 * Next 16 passes `retry` (re-fetch and re-render); `reset` only clears state.
 */
export default function RouteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // TODO(analytics): report to an error service once one exists.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center bg-cream pb-20 pt-32">
      <Container>
        <div className="card-sticker max-w-2xl p-9 sm:p-12">
          <span className="label-caps text-ink-soft/60">Something broke</span>
          <h1 className="mt-4 text-[2.25rem] leading-[1.02] sm:text-[3rem]">
            That did not load properly.
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
            It is on our side, not yours. Try again - and if it keeps happening, tell us at{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-ink underline underline-offset-4">
              {site.email}
            </a>
            {error.digest ? (
              <>
                {" "}
                with the code <code className="rounded bg-ink/5 px-1.5 py-0.5 text-[0.85em]">{error.digest}</code>
              </>
            ) : null}
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => retry()} variant="ink" size="lg" magnetic={false}>
              Try again
            </Button>
            <ButtonLink href="/" variant="paper" size="lg" magnetic={false}>
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

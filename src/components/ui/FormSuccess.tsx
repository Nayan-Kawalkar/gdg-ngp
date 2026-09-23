import type { ReactNode } from "react";
import { site } from "@/data/site";

/**
 * Success state shared by every stubbed form. The yellow notice is honest
 * about the frontend-only build: nothing was sent, and here is the address
 * that does work today. Delete the notice once a form has a real backend.
 */
export default function FormSuccess({
  label = "In review",
  title,
  children,
  actions,
  badge,
}: {
  label?: string;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  /** Replaces the small caps label, e.g. the mentor badge. */
  badge?: ReactNode;
}) {
  return (
    <div role="status" className="card-sticker p-8 sm:p-12">
      {badge ?? <span className="label-caps text-ink-soft/60">{label}</span>}
      <h2 className="mt-4 text-[1.85rem] leading-tight tracking-[-0.035em] sm:text-[2.25rem]">
        {title}
      </h2>
      <div className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-soft">{children}</div>
      <p className="mt-6 rounded-2xl bg-yellow-mist p-5 text-[0.9rem] leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">Heads up:</span> this form is not connected to
        a backend yet, so nothing was actually submitted. Email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>{" "}
        to reach the organizers today.
      </p>
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

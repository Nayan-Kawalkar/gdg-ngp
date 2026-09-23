import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import CertificateStudio from "@/components/certificates/CertificateStudio";
import { getVolunteerByToken, tierMeta, volunteers } from "@/data/volunteers";
import { organizer } from "@/data/home";
import { site } from "@/data/site";

type Params = { params: Promise<{ token: string }> };

/**
 * Private, per-volunteer certificate page (PRD 13).
 *
 * Unknown tokens 404 (dynamicParams = false). The page is noindex, disallowed
 * in robots.ts, absent from the sitemap, and linked from nowhere on the site.
 * See data/volunteers.ts for why that is "unlisted" rather than truly private
 * until there is a backend.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return volunteers.map((v) => ({ token: v.token }));
}

export const metadata: Metadata = {
  title: "Your certificate",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export default async function CertificatePage({ params }: Params) {
  const { token } = await params;
  const volunteer = getVolunteerByToken(token);
  if (!volunteer) notFound();

  const first = volunteer.name.split(" ")[0];
  const meta = tierMeta[volunteer.tier];

  return (
    <>
      <section className="relative overflow-hidden bg-cream pb-10 pt-32 sm:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[10%] top-[-30%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-yellow-mist),transparent_62%)]" />
        </div>
        <Container className="relative">
          <Eyebrow>Your certificate</Eyebrow>
          <h1
            data-motion-text="lines"
            data-motion-delay="0.1"
            className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1]"
          >
            <span className="motion-line-mask">
              <span className="motion-line">Thank you, {first}.</span>
            </span>{" "}
            <span className="motion-line-mask">
              <span className="motion-line text-brand-blue">This one is yours.</span>
            </span>
          </h1>
          <p
            data-reveal="fade-up"
            data-reveal-delay="0.4"
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft"
          >
            The organizers chose you for the <strong className="font-medium text-ink">{meta.title}</strong>{" "}
            certificate. Check your name, {meta.photo === "none" ? "" : "add a photo if you like, "}
            then download it. This link is personal - please do not share it.
          </p>
        </Container>
      </section>

      <Section tone="cream" pad="bottom">
        <Container>
          <CertificateStudio volunteer={volunteer} organizer={organizer.name} />
          <p className="mt-12 text-[0.82rem] text-ink-soft/70">
            Something wrong on your certificate that you cannot edit here? Email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              {site.email}
            </a>{" "}
            with your certificate number, {volunteer.certificateId}.
          </p>
        </Container>
      </Section>
    </>
  );
}

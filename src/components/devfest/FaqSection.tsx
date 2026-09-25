import { Container } from "@/components/ui/Section";
import { DfArrow, DfButton, DfIntro } from "@/components/devfest/ui";
import { ChevronDown } from "@/components/devfest/icons";
import { devfestFaqs } from "@/data/devfest";
import { site } from "@/data/site";

/**
 * The template's FAQ: two columns of white question rows with a chevron.
 * Native <details>, so it works without JS and with the keyboard.
 */
export default function FaqSection() {
  const half = Math.ceil(devfestFaqs.length / 2);
  const columns = [devfestFaqs.slice(0, half), devfestFaqs.slice(half)];

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 bg-linear-to-b from-df-paper to-df-mist/50 py-20 lg:py-28"
    >
      <Container>
        <DfIntro
          headingId="faq-title"
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          action={
            <DfButton href={`mailto:${site.email}`} variant="outline">
              Write to us
              <DfArrow />
            </DfButton>
          }
        />

        <div className="mt-10 grid items-start gap-3 lg:grid-cols-2 lg:gap-x-6">
          {columns.map((column, ci) => (
            <div key={ci} data-reveal-group className="grid gap-3">
              {column.map((faq) => (
                <details
                  key={faq.q}
                  data-reveal-item
                  className="group rounded-2xl border border-df-mist bg-white shadow-[0_10px_24px_-20px_rgba(4,30,68,0.4)] open:shadow-[0_18px_40px_-24px_rgba(4,30,68,0.35)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-df text-[0.95rem] font-medium text-df-navy [&::-webkit-details-marker]:hidden sm:px-6">
                    {faq.q}
                    <ChevronDown
                      aria-hidden="true"
                      className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-[0.93rem] leading-[1.7] text-df-slate sm:px-6">{faq.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

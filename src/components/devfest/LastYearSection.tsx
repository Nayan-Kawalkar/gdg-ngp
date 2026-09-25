import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { DfIntro, dfCardShadow } from "@/components/devfest/ui";
import { devfestLastYear } from "@/data/devfest";
import { cn } from "@/lib/cn";

/** Last year's numbers beside the intro, then a photo grid. */
export default function LastYearSection() {
  return (
    <section aria-labelledby="lastyear-title" className="bg-linear-to-b from-df-paper to-df-mist/60 py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <DfIntro
            headingId="lastyear-title"
            eyebrow={devfestLastYear.eyebrow}
            title={devfestLastYear.title}
            sub={devfestLastYear.sub}
          />
          <dl data-reveal-group className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[22rem] lg:grid-cols-2">
            {devfestLastYear.stats.map((stat) => (
              <div
                key={stat.label}
                data-reveal-item
                className={cn("flex flex-col-reverse rounded-2xl bg-white px-5 py-4", dfCardShadow)}
              >
                <dt className="mt-1 text-[0.85rem] text-df-slate">{stat.label}</dt>
                <dd className="font-df text-[1.9rem] font-bold leading-none tracking-[-0.02em] text-df-navy">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* TODO(devfest): these are GDG Nagpur photos, not DevFest ones (see data). */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {devfestLastYear.gallery.map((src) => (
            <figure
              key={src}
              data-image-reveal
              className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-df-mist sm:rounded-[1.75rem]"
            >
              <Image
                src={src}
                alt="GDG Nagpur community event"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

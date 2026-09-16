import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { communityPhotos } from "@/data/home";
import { cn } from "@/lib/cn";

/**
 * Three columns of event photos drifting at different speeds.
 * Photos are placeholders (see CONTEXT.md) - swap the files in /public/community.
 */
const columns = [
  { photos: communityPhotos.slice(0, 3), speed: 0.04, offset: "lg:mt-10" },
  { photos: communityPhotos.slice(4, 7), speed: 0.07, offset: "lg:mt-0" },
  { photos: communityPhotos.slice(8, 11), speed: 0.05, offset: "lg:mt-16" },
];

export default function CommunityMosaic() {
  return (
    <Section tone="cream" className="overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="The room"
          title="This is what a GDG Nagpur day looks like."
          lede="Not a stock photo in the set. Every one of these is from an event the chapter ran."
        />
      </Container>

      <div
        data-parallax-section
        className="mt-14 grid grid-cols-2 gap-3 px-5 sm:gap-4 sm:px-8 lg:mt-16 lg:grid-cols-3 lg:gap-5 lg:px-12"
      >
        {columns.map((column, ci) => (
          <div
            key={ci}
            data-parallax-layer
            data-parallax-speed={column.speed}
            className={cn(
              "flex flex-col gap-3 sm:gap-4 lg:gap-5",
              column.offset,
              ci === 2 && "hidden lg:flex",
            )}
          >
            {column.photos.map((src, pi) => (
              <figure
                key={src}
                data-image-reveal
                className={cn(
                  "relative w-full overflow-hidden rounded-[1.5rem] bg-cream-dark sm:rounded-[2rem]",
                  pi % 2 === 0 ? "aspect-4/5" : "aspect-square",
                )}
              >
                <Image
                  src={src}
                  alt="GDG Nagpur community event"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

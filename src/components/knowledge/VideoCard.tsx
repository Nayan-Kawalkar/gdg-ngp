"use client";

import { useState } from "react";
import { IconPlay } from "@/components/ui/Icons";
import { Ring } from "@/components/ui/Shapes";
import type { Accent, Video } from "@/data/knowledge";
import { socials } from "@/data/site";
import { cn } from "@/lib/cn";

const tint: Record<Accent, { bg: string; ring: string }> = {
  blue: { bg: "bg-blue-mist", ring: "text-blue-200" },
  red: { bg: "bg-red-mist", ring: "text-red-200" },
  yellow: { bg: "bg-yellow-mist", ring: "text-yellow-200" },
  green: { bg: "bg-green-mist", ring: "text-green-200" },
};

/**
 * Lightweight YouTube card: a thumbnail and a play button, and the real
 * <iframe> only once someone presses play - so a grid of six videos costs six
 * images, not six players. Without a `videoId` it links to the channel.
 */
export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const accent = tint[video.accent];

  const poster = (
    <>
      {video.videoId ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute -bottom-16 -right-12 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        >
          <Ring className={cn("w-48 opacity-60", accent.ring)} />
        </span>
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110">
          <IconPlay className="ml-0.5 size-5" />
        </span>
      </span>
      <span className="chip absolute bottom-3 right-3 px-2.5 py-1 text-[0.72rem] tabular-nums">
        {video.duration}
      </span>
    </>
  );

  return (
    <article data-reveal-item className="card-sticker card-pop group overflow-hidden">
      <div className={cn("relative aspect-video overflow-hidden", accent.bg)}>
        {playing && video.videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : video.videoId ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
            className="absolute inset-0 size-full"
          >
            {poster}
          </button>
        ) : (
          <a
            href={socials.youtube}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Watch on YouTube: ${video.title}`}
            className="absolute inset-0"
          >
            {poster}
          </a>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-[1.1rem] leading-snug tracking-[-0.025em]">{video.title}</h3>
        <p className="mt-1.5 text-[0.85rem] text-ink-soft">{video.by}</p>
      </div>
    </article>
  );
}

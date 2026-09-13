"use client";

import Image from "next/image";
import { useState } from "react";
import { heroVideo } from "@/content/media";
import { cn } from "@/lib/cn";

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn("h-14 w-14 sm:h-16 sm:w-16", className)}
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="white"
        fillOpacity="0.96"
        stroke="#312e81"
        strokeWidth="2.5"
      />
      <path d="M26 20.5v23L44 32 26 20.5Z" fill="#ec4899" />
    </svg>
  );
}

/**
 * Craft-framed YouTube embed for the hero.
 * Inject a live id via NEXT_PUBLIC_HERO_YOUTUBE_ID or content/media.ts.
 */
export function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(heroVideo.youtubeId);

  return (
    <figure className="hero-video-frame relative mx-auto w-full max-w-lg md:mx-0 md:max-w-none">
      <span className="masking-tape masking-tape--tl" aria-hidden />
      <span className="masking-tape masking-tape--tr" aria-hidden />

      <div className="relative aspect-video overflow-hidden rounded-[0.2rem] bg-paper-deep">
        {playing && hasVideo ? (
          <iframe
            title={heroVideo.title}
            src={`https://www.youtube-nocookie.com/embed/${heroVideo.youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <Image
              src={heroVideo.posterSrc}
              alt={heroVideo.posterAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/15 to-transparent" />
            <button
              type="button"
              onClick={() => {
                if (hasVideo) setPlaying(true);
              }}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-3 text-center",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard",
                !hasVideo && "cursor-default",
              )}
              aria-label={
                hasVideo
                  ? `Play video: ${heroVideo.title}`
                  : "Workshop video coming soon"
              }
            >
              <span className="hero-video-play tactile-press transition-transform duration-300 [@media(hover:hover)]:hover:scale-105">
                <PlayGlyph />
              </span>
              <span className="rounded-md bg-paper-bright/95 px-3 py-1.5 font-hand text-lg leading-none text-indigo shadow-sm">
                {hasVideo ? heroVideo.title : "Studio reel — coming soon"}
              </span>
            </button>
          </>
        )}
      </div>
    </figure>
  );
}

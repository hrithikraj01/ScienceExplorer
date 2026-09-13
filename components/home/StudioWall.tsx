"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HandSwoosh, MarginNote } from "@/components/ui/HandMarks";
import { SectionPill } from "@/components/ui/SectionPill";
import { studioWallPhotos } from "@/content/media";
import { cn } from "@/lib/cn";

type Photo = (typeof studioWallPhotos)[number];

function StoryBadge({ tag }: { tag: Photo["tag"] }) {
  return (
    <span className="polaroid-takeaway" data-kind="STORY">
      <span>{tag}</span>
    </span>
  );
}

function CardFastener({ photo }: { photo: Photo }) {
  if (photo.fastener === "tape") {
    return (
      <>
        <span className="masking-tape masking-tape--tl" aria-hidden />
        <span className="masking-tape masking-tape--tr" aria-hidden />
      </>
    );
  }

  if (photo.fastener === "thumbtack") {
    return (
      <span
        className="thumb-tack"
        style={{ ["--pin" as string]: photo.pinColor }}
        aria-hidden
      />
    );
  }

  return (
    <span
      className="push-pin"
      style={{ ["--pin" as string]: photo.pinColor }}
      aria-hidden
    />
  );
}

function PinboardPreview({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="pinboard-preview fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-ink/45"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-2xl border border-line bg-paper-bright shadow-[0_24px_60px_-20px_rgba(28,25,23,0.55)] outline-none sm:rounded-2xl"
      >
        <div className="relative aspect-[16/11] bg-paper-deep">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, 32rem"
            className="object-cover"
          />
        </div>
        <div className="p-5 sm:p-6">
          <StoryBadge tag={photo.tag} />
          <h3
            id={titleId}
            className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink"
          >
            {photo.caption}
          </h3>
          <p className="mt-2 text-ink-soft">{photo.detail}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/community">Peek into our community →</Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Keep browsing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudioWall() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active =
    studioWallPhotos.find((photo) => photo.id === activeId) ?? null;

  return (
    <section
      id="community"
      className="relative overflow-hidden grain bg-[#FDFBF9] py-6 md:py-10"
    >
      <div className="shell">
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <SectionPill tone="studio" className="mx-auto">
            Studio community
          </SectionPill>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Auntie Jonn&apos;s{" "}
            <span className="relative inline-block">
              <span className="font-hand text-magenta">Studio Family</span>
              <HandSwoosh className="text-mustard" />
            </span>
          </h2>
          <p className="mt-3 text-ink-soft">
            Real moments, shared curiosity, and lasting memories — pinned fresh
            from our latest sessions.
          </p>
        </Reveal>

        <Reveal>
          <div className="studio-pinboard relative mt-4 p-4 pb-10 sm:mt-5 sm:p-6 sm:pb-10 md:p-7 md:pb-10">
            <ul className="studio-pinboard__grid relative mt-1 sm:mt-2">
              {studioWallPhotos.map((photo) => (
                <li key={photo.id} className={cn("relative", photo.overlap)}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`${photo.tag}: ${photo.caption}`}
                    onClick={() => setActiveId(photo.id)}
                    className="polaroid tactile group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard"
                    style={{ ["--tilt" as string]: photo.tilt }}
                  >
                    <CardFastener photo={photo} />
                    <span className="relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper-deep">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-3 block space-y-2 px-0.5 pb-0.5">
                      <StoryBadge tag={photo.tag} />
                      <span className="block text-sm font-medium leading-snug text-ink">
                        {photo.caption}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/community">Peek into our community →</Button>
              <Button href="/experiences" variant="secondary">
                Book a making day
              </Button>
            </div>

            <MarginNote
              withConnector
              className="absolute right-4 bottom-3 text-magenta sm:right-6 sm:bottom-4"
            >
              Auntie Jonn&apos;s favorite corner!
            </MarginNote>
          </div>
        </Reveal>
      </div>

      {active ? (
        <PinboardPreview photo={active} onClose={() => setActiveId(null)} />
      ) : null}
    </section>
  );
}

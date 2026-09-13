import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MarginNote } from "@/components/ui/HandMarks";
import { SectionPill } from "@/components/ui/SectionPill";
import { founder } from "@/content/founder";
import { founderWorkshopPhoto } from "@/content/media";

function clean(text: string) {
  return text.replace(/^Placeholder:\s*/i, "");
}

export function FounderStory() {
  return (
    <section
      id="about-auntie-jonn"
      className="relative overflow-hidden grain bg-[#FAF4ED] py-8 md:py-12"
    >
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#FDE68A] bg-[#FFFBEB] p-5 shadow-[0_18px_40px_-28px_rgba(180,83,9,0.35)] sm:p-7 md:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-8 top-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35)_0%,rgba(244,114,182,0.18)_45%,transparent_70%)] blur-2xl md:left-4"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(253,230,138,0.55)_0%,transparent_70%)] blur-xl"
            />

            <div className="relative">
              <figure
                className="polaroid relative z-[1] mx-auto mb-8 w-full max-w-sm md:float-left md:mx-0 md:mb-5 md:mr-8 md:w-[min(100%,22rem)] lg:mr-10 lg:w-[min(100%,24rem)]"
                style={{ ["--tilt" as string]: "-2deg" }}
              >
                <span className="masking-tape masking-tape--tl" aria-hidden />
                <span className="masking-tape masking-tape--tr" aria-hidden />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper-deep shadow-[0_0_0_6px_rgba(253,230,138,0.55),0_18px_36px_-18px_rgba(251,146,60,0.45)]">
                  <Image
                    src={founderWorkshopPhoto.src}
                    alt={founderWorkshopPhoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 24rem"
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <figcaption className="mt-3 space-y-2 px-0.5 pb-0.5 text-left">
                  <span className="polaroid-takeaway" data-kind="STORY">
                    <span>At the making table</span>
                  </span>
                  <p className="text-sm font-medium leading-snug text-ink">
                    Auntie Jonn guiding young explorers through hands-on science
                  </p>
                </figcaption>
              </figure>

              <div className="relative z-[1]">
                <SectionPill tone="studio">Meet {founder.name}</SectionPill>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {founder.role}
                </h2>

                <blockquote className="relative mt-6 border-l-4 border-amber-400/70 pl-4">
                  <p className="font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>

                <p className="mt-5 text-lg font-medium text-ink">
                  {founder.promise}
                </p>
              </div>

              <div className="relative z-[1] mt-5 md:mt-6">
                {founder.story.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 max-w-3xl font-display text-[1.02rem] leading-relaxed text-ink first:mt-0 sm:text-base"
                  >
                    {clean(paragraph)}
                  </p>
                ))}

                <div className="relative mt-6 clear-both pb-10 sm:pb-8">
                  <Button href="/about" variant="secondary">
                    More about {founder.name}
                  </Button>
                  <MarginNote
                    withConnector
                    className="absolute right-0 bottom-0 text-magenta"
                  >
                    Come say hi at the table!
                  </MarginNote>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

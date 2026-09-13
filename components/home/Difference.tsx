import { ObjectArt } from "@/components/ui/ObjectArt";
import { ObjectTouch } from "@/components/ui/ObjectTouch";
import { Reveal } from "@/components/ui/Reveal";
import type { Experience } from "@/content/types";
import { cn } from "@/lib/cn";

function titleCase(title: string) {
  return title.replace(/^an?\s+/i, "").toUpperCase();
}

function MadeHere({
  title,
  className,
  onDark = false,
}: {
  title: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("absolute z-30", className)}>
      <span className={cn("em-made", onDark ? "text-white" : "text-ink")}>
        {titleCase(title)}
      </span>
      <span className="em-made-sub">made here</span>
    </span>
  );
}

export function Difference({ creations }: { creations: Experience[] }) {
  const items = creations.slice(0, 6);
  const bySlug = (slug: string) => items.find((item) => item.slug === slug);
  const soap = bySlug("colour-changing-soap-lab") ?? items[0];
  const cupcakes = bySlug("galaxy-cupcake-kitchen") ?? items[1];
  const press = bySlug("mangrove-morning") ?? items[2];

  return (
    <section className="overflow-hidden border-b border-ink/10">
      <div className="section-band bg-pink text-white">
        <div className="shell lg:flex lg:items-end lg:justify-between lg:gap-12">
          <Reveal className="measure">
            <h2 className="type-h2">Make something real</h2>
            <p className="type-lead stack-lead text-white/95">
              You don&apos;t just learn about something.
              <span className="mt-1 block">
                <span className="em text-white">You make something.</span>
              </span>
            </p>
          </Reveal>
          <p className="type-body mt-4 max-w-xs text-white/80 lg:mt-0">
            Every session ends with a tangible thing you take home.
          </p>
        </div>
      </div>

      <div className="bg-paper py-10 lg:py-12">
        <div className="shell">
          <Reveal className="relative h-[16rem] sm:h-[20rem] lg:h-[22rem]">
            <div
              className="absolute inset-x-0 bottom-0 h-[30%] bg-navy"
              aria-hidden
            />

            {/* Supporting press — small */}
            {press ? (
              <div
                className="absolute bottom-[31%] left-[4%] w-[12%] sm:left-[8%] sm:w-[9%]"
                aria-hidden
              >
                <ObjectArt theme={press.themes[0]} />
              </div>
            ) : null}

            {/* Dominant soap */}
            {soap ? (
              <>
                <div className="absolute bottom-[30%] left-[14%] z-20 w-[58%] sm:left-[18%] sm:w-[40%] lg:w-[36%]">
                  <ObjectTouch kind="soap">
                    <ObjectArt theme={soap.themes[0]} />
                  </ObjectTouch>
                </div>
                <p className="em-phrase absolute left-[18%] top-[6%] z-30 max-w-[9rem] sm:left-[48%] sm:top-[14%]">
                  Look at that swirl
                </p>
                <MadeHere
                  title={soap.creation.title}
                  onDark
                  className="bottom-[8%] left-[16%] sm:left-[20%]"
                />
              </>
            ) : null}

            {/* Supporting cupcakes — medium-small */}
            {cupcakes ? (
              <div
                className="absolute bottom-[31%] right-[6%] z-10 w-[18%] sm:right-[14%] sm:w-[12%]"
                aria-hidden
              >
                <ObjectArt theme={cupcakes.themes[0]} />
              </div>
            ) : null}
          </Reveal>

          <p className="type-caption mt-4">
            Things people make here · photographs to come
          </p>
        </div>
      </div>
    </section>
  );
}

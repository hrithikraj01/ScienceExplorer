import { Button } from "@/components/ui/Button";
import { founder } from "@/content/founder";
import { ObjectArt } from "@/components/ui/ObjectArt";
import { ObjectTouch } from "@/components/ui/ObjectTouch";
import { Reveal } from "@/components/ui/Reveal";
import { SparkNote } from "@/components/ui/Spark";

function copy(text: string) {
  return text.replace(/^Placeholder:\s*/, "");
}

export function CampGathering() {
  return (
    <section className="section overflow-hidden border-b-0 bg-amber-soft">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <Reveal className="lg:col-span-7">
          <h2 className="type-h2 text-navy">The Camp</h2>
          <p className="type-pull stack-lead text-navy">
            Sometimes you just need a place to try.
          </p>
          <p className="type-lead stack-lead measure text-ink">
            Come for something you&apos;re curious about. Stay for the people you
            meet.
          </p>
          <p className="type-body stack-meta measure text-ink-soft">
            {copy(founder.story[2])}
          </p>
          <SparkNote className="stack-meta" tone="navy">
            You might come back with another idea.
          </SparkNote>
          <div className="stack-cta">
            <Button href="/community" variant="navy">
              More about the Camp
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="flex items-end justify-end gap-4 border-b border-navy/25 pb-2 sm:gap-5">
            <div className="obj-sm" aria-hidden>
              <ObjectArt kind="pouch" />
            </div>
            <div className="obj-md" aria-hidden>
              <ObjectTouch kind="soap">
                <ObjectArt kind="soap" />
              </ObjectTouch>
            </div>
            <div className="obj-sm" aria-hidden>
              <ObjectArt kind="cupcake" />
            </div>
          </div>
          <p className="type-caption mt-2 text-right text-navy/45">
            Things people took home · photographs to come
          </p>
        </Reveal>
      </div>
    </section>
  );
}

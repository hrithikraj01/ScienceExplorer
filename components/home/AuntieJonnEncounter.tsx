import { Button } from "@/components/ui/Button";
import { founder } from "@/content/founder";
import { ObjectArt } from "@/components/ui/ObjectArt";
import { ObjectTouch } from "@/components/ui/ObjectTouch";
import { Reveal } from "@/components/ui/Reveal";
import { Spark } from "@/components/ui/Spark";

function copy(text: string) {
  return text.replace(/^Placeholder:\s*/, "");
}

export function AuntieJonnEncounter() {
  return (
    <section className="section overflow-hidden border-b-0 bg-navy text-white">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="type-eyebrow flex items-center gap-1.5 text-amber">
            <Spark tone="amber" />
            Meet Auntie Jonn
          </p>
          <h2 className="type-h2 stack-eyebrow">{founder.name}</h2>
          <p className="type-meta mt-2 text-white/65">{founder.role}</p>
          <p className="type-lead stack-lead measure-sm text-white">
            {founder.promise}
          </p>
          <p className="type-body stack-meta measure-sm text-white/80">
            {copy(founder.story[0])}
          </p>
          <p className="type-body mt-3 measure-sm text-white/80">
            {copy(founder.story[1])}
          </p>
          <div className="stack-cta">
            <Button
              href="/about"
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:text-white"
            >
              About Auntie Jonn
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="relative h-[14rem] sm:h-[17rem] lg:h-[19rem]">
            <div
              className="absolute inset-x-[-4%] bottom-0 h-[38%] bg-blue"
              aria-hidden
            />

            {/* Supporting mould */}
            <div
              className="absolute bottom-[39%] left-0 w-[28%] sm:w-[24%]"
              aria-hidden
            >
              <ObjectArt kind="mould" surface="dark" />
            </div>
            {/* Supporting beaker */}
            <div
              className="absolute bottom-[42%] left-[30%] w-[11%] sm:left-[28%] sm:w-[9%]"
              aria-hidden
            >
              <ObjectArt kind="beaker" surface="dark" />
            </div>
            {/* Dominant soap */}
            <div className="absolute bottom-[40%] right-[-2%] w-[46%] sm:right-0 sm:w-[40%]">
              <ObjectTouch kind="soap">
                <ObjectArt kind="soap" surface="dark" />
              </ObjectTouch>
            </div>

            <p className="type-caption absolute bottom-3 left-0 max-w-sm text-white/50">
              Auntie Jonn with someone, making · photograph to come
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

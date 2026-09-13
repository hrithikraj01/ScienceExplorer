import { ObjectArt, type ObjectKind } from "@/components/ui/ObjectArt";
import { ObjectTouch } from "@/components/ui/ObjectTouch";
import { Reveal } from "@/components/ui/Reveal";
import { getExperiences } from "@/lib/experiences";
import { cn } from "@/lib/cn";

const stages: {
  label: string;
  phrase: string;
  object: ObjectKind;
  scale: "sm" | "md" | "lg" | "dom";
}[] = [
  {
    label: "Idea",
    phrase: "Follow what interests you",
    object: "sheet",
    scale: "sm",
  },
  {
    label: "Experiment",
    phrase: "Try with your hands",
    object: "beaker",
    scale: "md",
  },
  {
    label: "Making",
    phrase: "Make a real thing",
    object: "mould",
    scale: "lg",
  },
  {
    label: "Result",
    phrase: "Take home something that feels like yours",
    object: "soap",
    scale: "dom",
  },
];

const scaleClass = {
  sm: "obj-sm",
  md: "obj-md",
  lg: "obj-lg",
  dom: "obj-dom",
} as const;

export function HowItGoes() {
  const result = getExperiences().find(
    (item) => item.slug === "colour-changing-soap-lab",
  );

  return (
    <section className="section bg-paper-bright">
      <div className="shell">
        <Reveal>
          <h2 className="type-h2 text-ink">What happens here?</h2>
          <p className="type-meta stack-meta measure-sm">
            You don&apos;t have to know how yet.
          </p>

          <ol className="mt-8">
            {stages.map((stage) => (
              <li
                key={stage.label}
                className="row flex items-end gap-5 sm:gap-8"
              >
                <span
                  className={cn("shrink-0", scaleClass[stage.scale])}
                  aria-hidden
                >
                  {stage.object === "soap" ? (
                    <ObjectTouch kind="soap">
                      <ObjectArt kind={stage.object} />
                    </ObjectTouch>
                  ) : (
                    <ObjectArt kind={stage.object} />
                  )}
                </span>
                <div className="min-w-0 pb-0.5">
                  <p className="type-label em">{stage.label}</p>
                  <p className="type-h3 mt-1 text-ink">{stage.phrase}</p>
                  {stage.label === "Result" && result ? (
                    <p className="type-meta mt-1">
                      {result.creation.title} · photograph to come
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

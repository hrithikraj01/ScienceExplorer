import { SurpriseMe, type SurprisePick } from "@/components/home/SurpriseMe";
import {
  ObjectArt,
  ObjectDetail,
  type ObjectKind,
} from "@/components/ui/ObjectArt";
import { ObjectTouch } from "@/components/ui/ObjectTouch";
import { Reveal } from "@/components/ui/Reveal";
import { SparkNote } from "@/components/ui/Spark";
import Link from "next/link";

type Area = {
  kicker: string;
  line: string;
  href: string;
  object: ObjectKind;
  touch?: "soap" | "magnet";
  magnified?: boolean;
};

/** Same row structure five times — only the object changes. */
const areas: Area[] = [
  {
    kicker: "Make",
    line: "something you can take home",
    href: "/experiences",
    object: "soap",
    touch: "soap",
  },
  {
    kicker: "Experiment",
    line: "see what happens",
    href: "/experiences?theme=science",
    object: "magnet",
    touch: "magnet",
  },
  {
    kicker: "Cook",
    line: "make something unexpected",
    href: "/experiences?theme=cooking",
    object: "cupcake",
  },
  {
    kicker: "Explore",
    line: "look more closely",
    href: "/experiences?theme=nature",
    object: "leaf",
    magnified: true,
  },
  {
    kicker: "Try something new",
    line: "start anywhere",
    href: "/experiences",
    object: "bottle",
  },
];

function AreaObject({ item }: { item: Area }) {
  const art = item.magnified ? (
    <ObjectDetail kind={item.object} zoom={1.7} className="w-full" />
  ) : (
    <ObjectArt kind={item.object} />
  );

  if (item.touch) {
    return <ObjectTouch kind={item.touch}>{art}</ObjectTouch>;
  }
  return art;
}

export function CuriosityPicker({ surprises }: { surprises: SurprisePick[] }) {
  return (
    <section className="section bg-paper-bright">
      <div className="shell md:grid md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <h2 className="type-h2 text-ink">What are you curious about?</h2>
          <SparkNote className="stack-meta" tone="pink">
            Start anywhere.
          </SparkNote>
          <SurpriseMe picks={surprises} />
        </Reveal>

        <Reveal className="mt-8 md:col-span-8 md:mt-0">
          <ul>
            {areas.map((item) => (
              <li key={item.kicker} className="row">
                <Link
                  href={item.href}
                  className="group flex items-center gap-5 sm:gap-7"
                >
                  <span className="obj-md shrink-0">
                    <AreaObject item={item} />
                  </span>
                  <span className="min-w-0">
                    <span className="type-invite block text-ink transition-colors group-hover:text-blue">
                      {item.kicker === "Make" ||
                      item.kicker === "Experiment" ? (
                        <span className="em">{item.kicker}</span>
                      ) : (
                        item.kicker
                      )}
                    </span>
                    <span className="type-meta mt-1 block">{item.line}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

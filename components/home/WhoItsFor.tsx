import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const people: {
  label: string;
  large?: boolean;
  emphasize?: boolean;
}[] = [
  { label: "Children" },
  { label: "Teens", large: true, emphasize: true },
  { label: "Young adults" },
  { label: "Adults", large: true, emphasize: true },
  { label: "Families" },
  { label: "Seniors" },
  { label: "Groups" },
];

export function WhoItsFor() {
  return (
    <section className="section bg-paper-bright">
      <div className="shell">
        <Reveal className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="measure">
            <p className="type-eyebrow text-pink">People</p>
            <h2 className="type-h2 stack-eyebrow text-ink">
              There isn&apos;t one kind of person who belongs here.
            </h2>
          </div>
          <p className="type-meta mt-3 max-w-sm lg:mt-0">
            Everyone can arrive with a different interest and have a different
            experience.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-9 flex flex-wrap items-baseline gap-x-5 gap-y-4 border-t border-ink/10 pt-8 sm:gap-x-8 sm:gap-y-5">
            {people.map((item) => (
              <li key={item.label}>
                <span
                  className={cn(
                    item.large ? "type-people-lg" : "type-people",
                    item.emphasize ? "em" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

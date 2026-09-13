import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  availabilityLabel,
  type UpcomingRow,
} from "@/lib/experiences";
import Link from "next/link";

function MetaCell({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-xl bg-paper px-3 py-2.5">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </dt>
      <dd
        className={
          emphasize
            ? "mt-0.5 text-base font-semibold text-blue"
            : "mt-0.5 text-sm font-semibold text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

export function WorkshopBooking({ upcoming }: { upcoming: UpcomingRow[] }) {
  const seen = new Set<string>();
  const rows = upcoming
    .filter(({ experience }) => {
      if (seen.has(experience.slug)) return false;
      seen.add(experience.slug);
      return true;
    })
    .slice(0, 4);

  return (
    <section className="section bg-paper">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-pink">What&apos;s on</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Upcoming workshops
            </h2>
            <p className="mt-2 text-ink-soft">
              Live schedule details — book when you&apos;re ready.
            </p>
          </div>
          <Button href="/calendar" variant="secondary">
            Full schedule
          </Button>
        </Reveal>

        {rows.length === 0 ? (
          <p className="mt-8 text-ink-soft">Nothing listed yet. Check back soon.</p>
        ) : (
          <Reveal>
            <ul className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
              {rows.map(({ experience, session }) => (
                <li
                  key={experience.slug}
                  className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-shadow [@media(hover:hover)]:hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-md bg-pink-soft px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-pink">
                      {experience.themes[0]}
                    </span>
                    <span className="inline-flex rounded-md bg-blue-soft px-2 py-0.5 text-[0.7rem] font-semibold text-blue">
                      {availabilityLabel(session.availability)}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
                    {experience.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    You make:{" "}
                    <span className="font-semibold text-ink">
                      {experience.creation.title}
                    </span>
                  </p>

                  <dl className="mt-5 grid flex-1 grid-cols-2 content-start gap-2.5">
                    <MetaCell label="Date" value={session.dateLabel} />
                    <MetaCell
                      label="Duration"
                      value={experience.durationLabel}
                    />
                    <MetaCell label="Age group" value={experience.ageLabel} />
                    <MetaCell
                      label="Price"
                      value={experience.priceLabel}
                      emphasize
                    />
                  </dl>

                  <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <Button href={`/experiences/${experience.slug}`}>
                      Book now
                    </Button>
                    <Link
                      href={`/experiences/${experience.slug}`}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-blue touch-manipulation [@media(hover:hover)]:hover:text-pink"
                    >
                      Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

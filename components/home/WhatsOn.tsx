import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { UpcomingRow } from "@/lib/experiences";
import Link from "next/link";

export function WhatsOn({ upcoming }: { upcoming: UpcomingRow[] }) {
  const seen = new Set<string>();
  const rows = upcoming
    .filter(({ experience }) => {
      if (seen.has(experience.slug)) return false;
      seen.add(experience.slug);
      return true;
    })
    .slice(0, 4);

  return (
    <section className="section">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="type-h2 text-ink">What&apos;s on</h2>
            <p className="type-meta mt-1">What would you like to try?</p>
          </div>
          <Button href="/experiences" variant="ghost">
            See all experiences
          </Button>
        </Reveal>

        {rows.length === 0 ? (
          <p className="type-meta mt-6">Nothing listed yet.</p>
        ) : (
          <Reveal>
            <ul className="mt-7">
              {rows.map(({ experience, session }) => (
                <li
                  key={experience.slug}
                  className="row grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <div className="min-w-0">
                    <p className="type-h3 text-ink">{experience.title}</p>
                    <p className="type-body mt-1 text-ink">
                      You make:{" "}
                      <span className="em">{experience.creation.title}</span>
                    </p>
                    <p className="type-meta mt-2">
                      {session.dateLabel} · {experience.ageLabel} ·{" "}
                      {experience.durationLabel} · {experience.priceLabel}
                    </p>
                  </div>
                  <Link
                    href={`/experiences/${experience.slug}`}
                    className="type-link"
                  >
                    See experience
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

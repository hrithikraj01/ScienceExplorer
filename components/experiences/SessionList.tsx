"use client";

import type { Experience } from "@/content/types";
import type { UpcomingRow } from "@/lib/experiences";
import { availabilityLabel } from "@/lib/experiences";
import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";

export function SessionList({
  rows,
  ctaLabel = "Book now",
  showCta = true,
}: {
  rows: UpcomingRow[];
  ctaLabel?: string;
  showCta?: boolean;
}) {
  const { openBooking } = useBooking();

  if (rows.length === 0) {
    return <p className="text-ink-soft">No sessions match these filters yet.</p>;
  }

  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {rows.map(({ experience, session }) => (
        <li
          key={session.id}
          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-ink">{experience.title}</p>
            <p className="text-sm text-ink-soft">
              You make: {experience.creation.title}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {experience.ageLabel} · {experience.durationLabel}
            </p>
          </div>
          <div className="text-sm text-ink-soft sm:text-right">
            <p>
              {session.dateLabel}
              {session.timeLabel ? ` · ${session.timeLabel}` : ""}
            </p>
            <p>
              {availabilityLabel(session.availability)} · {experience.priceLabel}
            </p>
            <p>{session.location}</p>
            {showCta ? (
              <Button
                className="mt-2"
                onClick={() => openBooking({ experience, session })}
              >
                {ctaLabel}
              </Button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceSessions({ experience }: { experience: Experience }) {
  return (
    <SessionList
      rows={experience.sessions.map((session) => ({ experience, session }))}
      ctaLabel="Book this session"
      showCta
    />
  );
}

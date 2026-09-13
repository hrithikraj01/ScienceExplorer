"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HandSwoosh, MarginNote } from "@/components/ui/HandMarks";
import { SectionPill } from "@/components/ui/SectionPill";
import {
  HOME_AUDIENCE_TABS,
  type HomeAudienceId,
} from "@/content/homeAudiences";
import {
  buildWhatsAppHref,
  inquiryWhatsAppMessage,
} from "@/lib/booking";
import { cn } from "@/lib/cn";
import {
  availabilityLabel,
  type UpcomingRow,
} from "@/lib/experiences";

function labTagClass(availability: string) {
  if (availability === "open") return "lab-tag lab-tag-open";
  if (availability === "limited") return "lab-tag lab-tag-limited";
  if (availability === "full") return "lab-tag lab-tag-full";
  return "lab-tag lab-tag-tba";
}

const TILTS = ["-1.2deg", "1.4deg", "-0.7deg", "1.1deg"] as const;

export function HomeDiscover({ upcoming }: { upcoming: UpcomingRow[] }) {
  const { openBooking } = useBooking();
  const [active, setActive] = useState<HomeAudienceId>("kids");
  const tab =
    HOME_AUDIENCE_TABS.find((item) => item.id === active) ??
    HOME_AUDIENCE_TABS[0];

  const rows = useMemo(() => {
    const seen = new Set<string>();
    return upcoming
      .filter(({ experience, session }) => {
        if (seen.has(experience.slug)) return false;
        seen.add(experience.slug);

        const openSession =
          session.availability === "open" ||
          session.availability === "limited";
        if (!openSession) return false;

        if (experience.homeTabs?.length) {
          return experience.homeTabs.includes(active);
        }

        if (tab.catalogueAudiences.length === 0) return false;
        return experience.audiences.some((audience) =>
          tab.catalogueAudiences.includes(audience),
        );
      })
      .slice(0, 4);
  }, [upcoming, active, tab]);

  return (
    <>
      <section
        id="who-is-this-for"
        className="section relative overflow-hidden grain bg-[#FDFBF9]"
      >
        <div className="shell">
          <Reveal className="max-w-2xl">
            <SectionPill tone="audience">Who is this for?</SectionPill>
            <h2 className="relative mt-3 inline-block font-hand text-3xl leading-none text-magenta sm:text-4xl">
              Made for every kind of explorer
              <HandSwoosh className="text-mustard" />
            </h2>
          </Reveal>

          <Reveal>
            <div
              className="mt-3 mb-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Audience"
            >
              {HOME_AUDIENCE_TABS.map((item, index) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "tactile-press touch-manipulation px-4 py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200",
                      isActive
                        ? "bg-indigo text-white shadow-[0_8px_18px_-8px_rgba(49,46,129,0.65)]"
                        : "bg-paper-deep text-ink-soft [@media(hover:hover)]:hover:bg-blue-soft [@media(hover:hover)]:hover:text-ink",
                    )}
                    style={{
                      transform: `rotate(${index % 2 === 0 ? -1.2 : 1.4}deg)`,
                      borderRadius: "999px",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              aria-live="polite"
              className="audience-panel torn-card mt-6 overflow-hidden"
            >
              <div key={tab.id} className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[14rem] md:min-h-full">
                  <Image
                    src={tab.image.src}
                    alt={tab.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 font-hand text-2xl text-white">
                    {tab.creationLabel}
                  </p>
                </div>
                <div className="relative p-6 pb-12 sm:p-8 sm:pb-12">
                  <p className="stamp-tag">{tab.label}</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                    {tab.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                    {tab.text}
                  </p>
                  <MarginNote
                    withConnector
                    className="absolute right-4 bottom-4 text-magenta sm:right-6 sm:bottom-5"
                  >
                    Made for real hands — not just watching.
                  </MarginNote>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="schedule-book"
        className="section grain bg-[#FDFBF9]"
      >
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionPill tone="make">What you&apos;ll make today</SectionPill>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Upcoming workshops
              </h2>
              <p className="mt-2 text-ink-soft">
                Open sessions for {tab.label.toLowerCase()}.
              </p>
            </div>
            <Button href="/calendar" variant="secondary">
              Full schedule
            </Button>
          </Reveal>

          {rows.length === 0 ? (
            <Reveal>
              <div className="torn-card mt-5 p-5 text-center sm:p-7">
                <p className="font-display text-xl font-semibold text-ink">
                  No open sessions today
                </p>
                <p className="mx-auto mt-2 max-w-md text-ink-soft">
                  Request a 1:1 tailored session — we&apos;ll shape something
                  for {tab.label.toLowerCase()}.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={() =>
                      openBooking({
                        intent: "inquiry",
                        inquiryLabel: tab.label,
                      })
                    }
                  >
                    Request a 1:1 session
                  </Button>
                  <Button
                    href={buildWhatsAppHref(
                      inquiryWhatsAppMessage(tab.label),
                    )}
                    variant="secondary"
                  >
                    WhatsApp us
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <ul className="mt-6 grid items-stretch gap-5 md:grid-cols-2">
                {rows.map(({ experience, session }, index) => (
                  <li
                    key={`${experience.slug}-${session.id}`}
                    className="lab-project module-card module-card--lab tilt-card flex h-full flex-col p-6"
                    style={{
                      ["--tilt" as string]: TILTS[index % TILTS.length],
                    }}
                  >
                    <div className="relative z-[1] flex flex-wrap items-center gap-2 pt-2">
                      <span className="stamp-tag">Live lab</span>
                      <span className="inline-flex max-w-full rounded-md bg-magenta/15 px-3 py-1.5 text-sm font-bold leading-snug text-magenta">
                        You make: {experience.creation.title}
                      </span>
                      <span className={labTagClass(session.availability)}>
                        {availabilityLabel(session.availability)}
                      </span>
                    </div>

                    <h3 className="relative z-[1] mt-4 font-display text-lg font-semibold leading-snug text-ink">
                      {experience.title}
                    </h3>

                    <dl className="relative z-[1] mt-5 grid flex-1 grid-cols-2 content-start gap-2.5">
                      <Meta
                        label="Date"
                        value={`${session.dateLabel}${session.timeLabel ? ` · ${session.timeLabel}` : ""}`}
                      />
                      <Meta label="Duration" value={experience.durationLabel} />
                      <Meta label="Age group" value={experience.ageLabel} />
                      <Meta
                        label="Price"
                        value={experience.priceLabel}
                        emphasize
                      />
                    </dl>

                    <div className="relative z-[1] mt-6 flex items-center gap-3 border-t border-line pt-5">
                      <Button
                        onClick={() => openBooking({ experience, session })}
                      >
                        Book now
                      </Button>
                      <Link
                        href={`/experiences/${experience.slug}`}
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-indigo touch-manipulation [@media(hover:hover)]:hover:text-magenta"
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
    </>
  );
}

function Meta({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-xl bg-mustard-soft/70 px-3 py-2.5">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </dt>
      <dd
        className={
          emphasize
            ? "mt-0.5 text-base font-semibold text-indigo"
            : "mt-0.5 text-sm font-semibold text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

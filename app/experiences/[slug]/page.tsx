import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookExperienceButton } from "@/components/booking/BookExperienceButton";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { ExperienceSessions } from "@/components/experiences/SessionList";
import { StickyBookBar } from "@/components/experiences/StickyBookBar";
import { PhotoWell, wallForTheme } from "@/components/ui/PhotoWell";
import { AUDIENCE_LABELS, type Audience } from "@/content/types";
import { JsonLd } from "@/lib/jsonLd";
import {
  availabilityLabel,
  getExperience,
  getExperienceSlugs,
  getRelated,
  nextSession,
} from "@/lib/experiences";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return { title: "Not found" };

  return {
    title: experience.title,
    description: `${experience.creation.title}. ${experience.summary}`,
    alternates: { canonical: `/experiences/${experience.slug}` },
    openGraph: {
      title: `${experience.title} · ${site.name}`,
      description: experience.summary,
    },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const session = nextSession(experience);
  const related = getRelated(experience);

  return (
    <main id="main" className="flex-1 bg-paper pb-28 lg:pb-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: experience.title,
          description: experience.summary,
          url: `${site.url}/experiences/${experience.slug}`,
        }}
      />
      <StickyBookBar experience={experience} session={session} />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:px-8">
        <PhotoWell
          className="h-[18rem] sm:h-[24rem] lg:sticky lg:top-24 lg:h-[28rem]"
          wall={wallForTheme(experience.themes[0])}
          object={{
            title: experience.creation.title,
            theme: experience.themes[0],
          }}
        />
        <div>
          <p className="text-xs font-semibold text-blue">What you&apos;ll make</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {experience.creation.title}
          </h1>
          <p className="mt-2 text-lg text-ink">{experience.title}</p>
          <p className="mt-4 text-ink-soft">{experience.creation.description}</p>
          <p className="mt-3 text-ink-soft">{experience.summary}</p>
          <p className="mt-5 text-sm text-ink-soft">
            {experience.ageLabel} · {experience.durationLabel} ·{" "}
            {experience.priceLabel} · {experience.locationLabel}
            {session ? ` · ${session.dateLabel}` : ""}
          </p>
          <div className="mt-6 hidden lg:block">
            <BookExperienceButton experience={experience} session={session}>
              Book now
            </BookExperienceButton>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="space-y-8">
          <Block title="What you’ll explore" items={experience.explore} />
          <Block title="What you’ll do" items={experience.itinerary} />
          <section>
            <h2 className="text-xl font-semibold text-ink">Who this is for</h2>
            <p className="mt-2 text-ink-soft">
              {experience.audiences
                .map((audience: Audience) => AUDIENCE_LABELS[audience])
                .join(" · ")}
            </p>
            <p className="mt-1 text-ink-soft">{experience.ageLabel}</p>
          </section>
        </div>
        <aside className="h-fit border border-ink/10 bg-paper-bright p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold text-ink">Details</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Meta label="Age" value={experience.ageLabel} />
            <Meta label="Time" value={experience.durationLabel} />
            <Meta label="Price" value={experience.priceLabel} />
            <Meta label="Where" value={experience.locationLabel} />
            <Meta label="Next" value={session?.dateLabel ?? "Date TBC"} />
            <Meta
              label="Places"
              value={session ? availabilityLabel(session.availability) : "TBC"}
            />
          </dl>
          <BookExperienceButton
            experience={experience}
            session={session}
            className="mt-5 hidden w-full lg:inline-flex"
          >
            Book now
          </BookExperienceButton>
        </aside>
      </div>

      <section id="book" className="scroll-mt-24 border-t border-ink/10 bg-paper-bright">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
          <p className="text-sm font-semibold text-blue">When can I come?</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Next dates</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Pick a session below, or open the booking flow to confirm details.
          </p>
          <div className="mt-6">
            <ExperienceSessions experience={experience} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
          <h2 className="text-xl font-semibold text-ink">Something else to try</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ExperienceCard experience={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2 text-ink-soft">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 bg-pink" />
            <span>{item.replace(/^Placeholder:\s*/, "")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-blue">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

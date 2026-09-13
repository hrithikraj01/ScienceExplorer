import type { Metadata } from "next";
import { CatalogueFilters } from "@/components/experiences/CatalogueFilters";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { getExperiences, parseExperienceFilters } from "@/lib/experiences";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Hands-on science, making and creative experiences in Singapore.",
};

export default async function ExperiencesPage({
  searchParams,
}: PageProps<"/experiences">) {
  const params = await searchParams;
  const filters = parseExperienceFilters(params);
  const experiences = getExperiences(filters);
  const first = experiences.slice(0, 2);
  const rest = experiences.slice(2);

  return (
    <main id="main" className="flex-1 pb-16">
      <div className="border-b border-ink/10 px-4 py-7 lg:px-8">
        <div className="mx-auto max-w-6xl border-l-4 border-blue pl-5">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">
            Experiences
          </h1>
          <p className="mt-2 text-lg text-ink">
            What would you like to make?
          </p>
          <p className="mt-1 max-w-2xl text-ink-soft">
            Hands-on science, making and creative experiences in Singapore.
            Start with what interests you.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        {first.length > 0 ? (
          <ul className="grid gap-10 md:grid-cols-2">
            {first.map((experience) => (
              <li key={experience.slug}>
                <ExperienceCard experience={experience} featured />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">Nothing matches yet. Clear a filter.</p>
        )}

        <div className="mt-8 border-t border-ink/10 pt-6">
          <p className="mb-4 text-xs font-medium tracking-tight text-ink-soft">
            Narrow the list
          </p>
          <CatalogueFilters base="/experiences" current={filters} />
        </div>

        {rest.length > 0 ? (
          <ul className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((experience) => (
              <li key={experience.slug}>
                <ExperienceCard experience={experience} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}

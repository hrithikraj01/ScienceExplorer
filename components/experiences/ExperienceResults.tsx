"use client";

import { CatalogueFilters } from "@/components/experiences/CatalogueFilters";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { useCatalogueFilters } from "@/components/experiences/useCatalogueFilters";
import { getExperiences, type ExperienceFilters } from "@/lib/experiences";

export function FilteredExperienceResults() {
  return <ExperienceResults filters={useCatalogueFilters()} />;
}

export function ExperienceResults({ filters }: { filters: ExperienceFilters }) {
  const experiences = getExperiences(filters);
  const first = experiences.slice(0, 2);
  const rest = experiences.slice(2);

  return (
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
  );
}
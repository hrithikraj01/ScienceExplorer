"use client";

import { CatalogueFilters } from "@/components/experiences/CatalogueFilters";
import { SessionList } from "@/components/experiences/SessionList";
import { useCatalogueFilters } from "@/components/experiences/useCatalogueFilters";
import { getUpcoming, type ExperienceFilters } from "@/lib/experiences";

export function FilteredCalendarResults() {
  return <CalendarResults filters={useCatalogueFilters()} />;
}

export function CalendarResults({ filters }: { filters: ExperienceFilters }) {
  return (
    <>
      <CatalogueFilters base="/calendar" current={filters} />
      <div className="mt-8">
        <SessionList rows={getUpcoming(filters)} />
      </div>
    </>
  );
}
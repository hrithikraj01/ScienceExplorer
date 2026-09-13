import type { Metadata } from "next";
import { CatalogueFilters } from "@/components/experiences/CatalogueFilters";
import { SessionList } from "@/components/experiences/SessionList";
import { Button } from "@/components/ui/Button";
import { getUpcoming, parseExperienceFilters } from "@/lib/experiences";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Upcoming Science Explorers sessions in Singapore. Dates are placeholders.",
};

export default async function CalendarPage({
  searchParams,
}: PageProps<"/calendar">) {
  const params = await searchParams;
  const filters = parseExperienceFilters(params);
  const rows = getUpcoming(filters);

  return (
    <main id="main" className="flex-1 pb-20">
      <div className="border-b border-ink/10 px-4 py-7 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Calendar</h1>
          <p className="mt-3 max-w-2xl text-ink-soft">
            When can I come? Same experiences, listed by date.
          </p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8">
        <CatalogueFilters base="/calendar" current={filters} />
        <div className="mt-8">
          <SessionList rows={rows} />
        </div>
        <div className="mt-8">
          <Button href="/experiences">See all experiences</Button>
        </div>
      </div>
    </main>
  );
}

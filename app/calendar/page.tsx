import type { Metadata } from "next";
import { Suspense } from "react";
import {
  CalendarResults,
  FilteredCalendarResults,
} from "@/components/experiences/CalendarResults";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Upcoming Science Explorers sessions in Singapore. Dates are placeholders.",
};

export default function CalendarPage() {
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
        <Suspense fallback={<CalendarResults filters={{}} />}>
          <FilteredCalendarResults />
        </Suspense>
        <div className="mt-8">
          <Button href="/experiences">See all experiences</Button>
        </div>
      </div>
    </main>
  );
}
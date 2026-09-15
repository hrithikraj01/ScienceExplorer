import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ExperienceResults,
  FilteredExperienceResults,
} from "@/components/experiences/ExperienceResults";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Hands-on science, making and creative experiences in Singapore.",
};

export default function ExperiencesPage() {
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

      <Suspense fallback={<ExperienceResults filters={{}} />}>
        <FilteredExperienceResults />
      </Suspense>
    </main>
  );
}
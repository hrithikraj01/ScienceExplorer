"use client";

import { useSearchParams } from "next/navigation";
import { parseExperienceFilters } from "@/lib/experiences";

/** Reads ?audience= and ?theme= in the browser (static export has no server searchParams). */
export function useCatalogueFilters() {
  const searchParams = useSearchParams();
  return parseExperienceFilters({
    audience: searchParams.get("audience") ?? undefined,
    theme: searchParams.get("theme") ?? undefined,
  });
}
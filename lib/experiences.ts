import { experiences } from "@/content/experiences";
import {
  parseAudience,
  parseTheme,
  THEMES,
  type Audience,
  type Availability,
  type Experience,
  type Session,
  type Theme,
} from "@/content/types";

export type UpcomingRow = {
  experience: Experience;
  session: Session;
};

export type ExperienceFilters = {
  audience?: Audience | null;
  theme?: Theme | null;
};

export function parseExperienceFilters(params: {
  audience?: string | string[];
  theme?: string | string[];
}): ExperienceFilters {
  return {
    audience: parseAudience(params.audience),
    theme: parseTheme(params.theme),
  };
}

export function catalogueHref(
  base: "/experiences" | "/calendar",
  current: ExperienceFilters,
  patch: Partial<ExperienceFilters>,
): string {
  const next = { ...current, ...patch };
  const search = new URLSearchParams();
  if (next.audience) search.set("audience", next.audience);
  if (next.theme) search.set("theme", next.theme);
  const query = search.toString();
  return query ? `${base}?${query}` : base;
}

export function usedThemes(): Theme[] {
  const seen = new Set<Theme>();
  for (const experience of experiences) {
    for (const theme of experience.themes) seen.add(theme);
  }
  return THEMES.filter((theme) => seen.has(theme));
}

function matchesFilters(
  experience: Experience,
  filters: ExperienceFilters = {},
): boolean {
  if (filters.audience && !experience.audiences.includes(filters.audience)) {
    return false;
  }
  if (filters.theme && !experience.themes.includes(filters.theme)) {
    return false;
  }
  return true;
}

export function getExperiences(
  audienceOrFilters?: Audience | ExperienceFilters,
): Experience[] {
  const filters: ExperienceFilters =
    typeof audienceOrFilters === "string"
      ? { audience: audienceOrFilters }
      : (audienceOrFilters ?? {});
  return experiences.filter((item) => matchesFilters(item, filters));
}

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((item) => item.slug === slug);
}

export function getExperienceSlugs(): string[] {
  return experiences.map((item) => item.slug);
}

export function getRelated(experience: Experience, limit = 3): Experience[] {
  return experiences
    .filter((item) => item.slug !== experience.slug)
    .filter(
      (item) =>
        item.themes.some((theme) => experience.themes.includes(theme)) ||
        item.audiences.some((audience) =>
          experience.audiences.includes(audience),
        ),
    )
    .slice(0, limit);
}

export function getFeaturedCreations(limit = 6): Experience[] {
  return experiences.filter((item) => item.featured).slice(0, limit);
}

export function nextSession(experience: Experience): Session | undefined {
  return experience.sessions[0];
}

export function availabilityLabel(status: Availability): string {
  switch (status) {
    case "open":
      return "Places open";
    case "limited":
      return "Limited seats";
    case "full":
      return "Full";
    default:
      return "Dates soon";
  }
}

export function getUpcoming(filters: ExperienceFilters = {}): UpcomingRow[] {
  return getExperiences(filters)
    .flatMap((experience) =>
      experience.sessions.map((session) => ({ experience, session })),
    )
    .sort((a, b) => {
      const aTime = a.session.startsAt
        ? Date.parse(a.session.startsAt)
        : Number.MAX_SAFE_INTEGER;
      const bTime = b.session.startsAt
        ? Date.parse(b.session.startsAt)
        : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });
}

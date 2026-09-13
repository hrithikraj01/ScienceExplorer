export const AUDIENCES = [
  "child",
  "self",
  "family",
  "group",
  "corporate",
] as const;

export type Audience = (typeof AUDIENCES)[number];

export const AUDIENCE_LABELS: Record<Audience, string> = {
  child: "My Child",
  self: "Myself",
  family: "My Family",
  group: "A Group",
  corporate: "A Corporate Team",
};

export const AUDIENCE_PROMPTS: Record<Audience, string> = {
  child: "Curious makers, roughly 5–12",
  self: "Adults making for the joy of it",
  family: "Grown-ups and kids, side by side",
  group: "Birthdays, schools and clubs",
  corporate: "Teams who want to make, not sit",
};

export const THEMES = [
  "science",
  "soap",
  "cooking",
  "nature",
  "jewellery",
  "drinks",
  "magnets",
  "shows",
  "marbling",
  "adventure",
] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_LABELS: Record<Theme, string> = {
  science: "Science",
  soap: "Soap",
  cooking: "Cooking",
  nature: "Nature",
  jewellery: "Jewellery",
  drinks: "Drinks",
  magnets: "Magnets",
  shows: "Shows",
  marbling: "Marbling",
  adventure: "Adventure",
};

export type Availability = "open" | "limited" | "full" | "tba";

export type Creation = {
  title: string;
  description: string;
};

export type HomeAudienceTab = "kids" | "teens" | "adults" | "special";

export type Session = {
  id: string;
  /** ISO date when known. Omit or leave empty when TBC. */
  startsAt?: string;
  dateLabel: string;
  /**
   * CONTENT HOOK — SESSION_TIME_LABEL
   * Local start time as "HH:MM" (24h). Used for calendar sync.
   * Swap via CMS / env-driven content without touching booking UI.
   */
  timeLabel?: string;
  durationMinutes: number;
  location: string;
  availability: Availability;
  /** false once the session is live-confirmed and bookable. */
  isPlaceholder: boolean;
};

export type Experience = {
  slug: string;
  title: string;
  summary: string;
  audiences: Audience[];
  themes: Theme[];
  creation: Creation;
  /** Illustrative bullets — not a live programme outline. */
  explore: string[];
  itinerary: string[];
  ageLabel: string;
  durationLabel: string;
  priceLabel: string;
  /**
   * CONTENT HOOK — LIVE_PRICE_SGD
   * Numeric SGD amount for checkout totals. When set, wins over parsing priceLabel.
   * Replace with live pricing from your CMS / booking system before launch.
   */
  priceSgd?: number;
  locationLabel: string;
  /**
   * CONTENT HOOK — HOME_AUDIENCE_TABS
   * Maps this workshop onto homepage audience filters.
   * Update tags when the live programme changes — card layout stays the same.
   */
  homeTabs?: HomeAudienceTab[];
  featured: boolean;
  sessions: Session[];
  /** false once pricing + schedule are live-confirmed. */
  isPlaceholder: boolean;
};

export function isAudience(value: string | undefined): value is Audience {
  return value !== undefined && (AUDIENCES as readonly string[]).includes(value);
}

export function parseAudience(
  value: string | string[] | undefined,
): Audience | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return isAudience(raw) ? raw : undefined;
}

export function isTheme(value: string | undefined): value is Theme {
  return value !== undefined && (THEMES as readonly string[]).includes(value);
}

export function parseTheme(
  value: string | string[] | undefined,
): Theme | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return isTheme(raw) ? raw : undefined;
}

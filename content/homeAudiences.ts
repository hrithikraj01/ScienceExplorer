import type { Audience, HomeAudienceTab } from "@/content/types";
import { audienceBackdrops } from "@/content/media";

/**
 * Homepage audience tabs + creation backdrops.
 *
 * CONTENT HOOK — HOME_AUDIENCE_TABS
 * Edit copy / catalogueAudiences here. Swap photos in content/media.ts
 * (`audienceBackdrops`) — do not hardcode image URLs in this file.
 */
export const HOME_AUDIENCE_TABS = [
  {
    id: "kids" as const satisfies HomeAudienceTab,
    label: "Kids & parent-child",
    title: "Explore together — gently guided",
    text: "A safe, playful table where grown-ups and kids make side by side. Clear steps, real materials, and something proud to take home.",
    creationLabel: "You might make swirl soap",
    catalogueAudiences: ["child", "family"] as Audience[],
    image: audienceBackdrops.kids,
  },
  {
    id: "teens" as const satisfies HomeAudienceTab,
    label: "Teens",
    title: "Room to invent — without the lecture",
    text: "Space to try ideas, get your hands dirty, and leave with a finished piece you designed. Curiosity over perfection.",
    creationLabel: "You might make marbled maps",
    catalogueAudiences: ["child", "self"] as Audience[],
    image: audienceBackdrops.teens,
  },
  {
    id: "adults" as const satisfies HomeAudienceTab,
    label: "Adults & seniors",
    title: "A soft landing for new hobbies",
    text: "Curious evenings and weekend making — no pressure, no grades. Just warm guidance and a finished piece you'll wear or gift.",
    creationLabel: "You might make brass jewellery",
    catalogueAudiences: ["self"] as Audience[],
    image: audienceBackdrops.adults,
  },
  {
    id: "special" as const satisfies HomeAudienceTab,
    label: "Special-abled learners",
    title: "Paced with care — shaped around you",
    text: "Flexible supports, patient coaching, and sessions adapted so everyone can explore, create, and feel at home at the table.",
    creationLabel: "You might make sensory magnets",
    catalogueAudiences: [] as Audience[],
    image: audienceBackdrops.special,
  },
] as const;

export type HomeAudienceId = (typeof HOME_AUDIENCE_TABS)[number]["id"];

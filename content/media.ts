/**
 * Homepage photography showcases.
 *
 * ============================================================================
 * CONTENT HOOK — MEDIA_ASSETS (launch swap)
 * ============================================================================
 * Local files under /public/media/ are the source of truth. Drop new studio
 * photos with the same filenames (or update `src` below) — no layout edits.
 *
 *   1. Replace files in /public/media/
 *   2. Or set NEXT_PUBLIC_MEDIA_BASE to a CDN prefix and use relative paths
 *   3. Keep alt text accurate for accessibility
 *
 * Current set: authentic Science Explorers / xplorers.life workshop photos
 * (Sunday Social + Anderson Primary Children's Day session).
 *
 * Recommended sizes: hero ≥1200px · founder ≥1400px · audience ≥1000px
 * ============================================================================
 */

import { withBasePath } from "@/lib/basePath";

const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE ?? "";

function mediaUrl(pathOrAbsolute: string) {
  if (/^https?:\/\//.test(pathOrAbsolute)) return pathOrAbsolute;
  if (!mediaBase) return withBasePath(pathOrAbsolute);
  return `${mediaBase.replace(/\/$/, "")}/${pathOrAbsolute.replace(/^\//, "")}`;
}

export const heroGallery = [
  {
    src: mediaUrl("/media/hero-studio.jpg"),
    alt: "Science Explorers Sunday Social — makers gathered around a hands-on table",
    caption: "At the studio table",
  },
  {
    src: mediaUrl("/media/hero-workshop.jpg"),
    alt: "Workshop participants making together at an Anderson Primary Children's Day session",
    caption: "Making together",
  },
  {
    src: mediaUrl("/media/hero-creation.png"),
    alt: "Science Explorers club mark — curiosity and community",
    caption: "Take-home pride",
  },
] as const;

export const founderWorkshopPhoto = {
  src: mediaUrl("/media/founder-table.jpg"),
  alt: "Auntie Jonn hosting explorers at a hands-on Science Explorers workshop",
} as const;

/**
 * CONTENT HOOK — HERO_VIDEO
 * YouTube id for the homepage hero craft-frame embed.
 * Leave `youtubeId` empty to keep the interactive placeholder;
 * set NEXT_PUBLIC_HERO_YOUTUBE_ID or update youtubeId below to go live.
 */
export const heroVideo = {
  youtubeId: process.env.NEXT_PUBLIC_HERO_YOUTUBE_ID ?? "",
  title: "A peek inside Auntie Jonn’s studio",
  posterSrc: mediaUrl("/media/hero-studio.jpg"),
  posterAlt:
    "Science Explorers studio table — placeholder for the hero workshop video",
} as const;

/**
 * CONTENT HOOK — AUDIENCE_BACKDROPS
 * Creation / session snapshots for homepage “Who is this for?” tabs.
 * Keys must match HomeAudienceTab ids in content/homeAudiences.ts.
 */
export const audienceBackdrops = {
  kids: {
    src: mediaUrl("/media/audience-kids.jpg"),
    alt: "Families and kids making together at a Science Explorers Sunday Social",
  },
  teens: {
    src: mediaUrl("/media/audience-teens.jpg"),
    alt: "Young explorers collaborating on a hands-on workshop project",
  },
  adults: {
    src: mediaUrl("/media/audience-adults.jpg"),
    alt: "Adults and caregivers sharing a warm making table at Science Explorers",
  },
  special: {
    src: mediaUrl("/media/audience-special.jpg"),
    alt: "Inclusive, paced making — every explorer welcome at the table",
  },
} as const;

/**
 * CONTENT HOOK — STUDIO_WALL_PHOTOS
 * Community polaroids for the homepage “Studio Pin Board”.
 * Swap files under /public/media/ (or update src) without layout edits.
 */
export const studioWallPhotos = [
  {
    id: "wall-1",
    src: mediaUrl("/media/hero-studio.jpg"),
    alt: "Families and young explorers smiling around a Sunday Social table",
    tag: "FAMILY MOMENT" as const,
    caption: "Sunday Social smiles with young explorers",
    detail:
      "Caregivers and kids sharing one warm table — mixing, laughing, and belonging together at Auntie Jonn’s studio.",
    tilt: "-3.6deg",
    fastener: "pushpin" as const,
    pinColor: "#ec4899",
    overlap: "z-[2]",
  },
  {
    id: "wall-2",
    src: mediaUrl("/media/hero-workshop.jpg"),
    alt: "Group making and storytelling with Auntie Jonn at a workshop",
    tag: "MAKING MAGIC" as const,
    caption: "Group experiment and storytelling with Auntie Jonn",
    detail:
      "Hands in, stories out — explorers discovering together while Auntie Jonn guides the making table.",
    tilt: "4.2deg",
    fastener: "tape" as const,
    pinColor: "#d4a017",
    overlap: "z-[3] sm:-ml-2 sm:-mt-4",
  },
  {
    id: "wall-3",
    src: mediaUrl("/media/audience-kids.jpg"),
    alt: "Hands collaborating on a project at the Science Explorers lab bench",
    tag: "STUDIO FAVOURITE" as const,
    caption: "Hands-on collaboration at the lab bench",
    detail:
      "Side-by-side making at the bench — colours, tools, and the quiet joy of figuring something out together.",
    tilt: "-4deg",
    fastener: "thumbtack" as const,
    pinColor: "#312e81",
    overlap: "z-[2] lg:mt-6",
  },
  {
    id: "wall-4",
    src: mediaUrl("/media/founder-table.jpg"),
    alt: "Inclusive parent-child bonding session at Science Explorers",
    tag: "NEW FRIENDS" as const,
    caption: "Special-abled & parent-child bonding sessions",
    detail:
      "Every explorer welcome — paced, inclusive sessions where new friendships and family bonds grow at the table.",
    tilt: "5deg",
    fastener: "pushpin" as const,
    pinColor: "#db2777",
    overlap: "z-[4] sm:-ml-3 sm:-mt-2",
  },
] as const;

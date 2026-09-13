/**
 * CONTENT HOOK — STUDIO_LOCATION
 * Update address, map links, and transit once the studio pin is final.
 */
export const studio = {
  name: "Science Explorers Studio",
  badge: "Visit us",
  headline: "Come find us at the making table",
  lines: [
    "Science Explorers Studio",
    "123 Making Lane, #02-01",
    "Singapore 123456",
  ],
  /** Used for Google Maps search / open links */
  mapsQuery: "Science Explorers Studio Singapore",
  mapsUrl:
    process.env.NEXT_PUBLIC_STUDIO_MAPS_URL ??
    "https://www.google.com/maps/search/?api=1&query=Science+Explorers+Studio+Singapore",
  /** Embed src — swap for a place pin when address is locked */
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_STUDIO_MAPS_EMBED_URL ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d103.8198!3d1.3521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjEnMDcuNiJOIDEwM8KwNDknMTEuMyJF!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg",
  mrt: {
    station: "Holland Village",
    lineCode: "CC21",
    lineName: "Circle Line",
    exit: "Exit B",
    walk: "5-min walk from Exit B along the covered walkway",
  },
  bus: {
    stopId: "11229",
    stopName: "Opp Holland V Mall",
    routes: ["7", "61", "75", "77", "106"],
  },
  car: {
    parking:
      "Public parking at Holland Village — short walk to the studio lobby.",
    dropoff:
      "Family-friendly kiss-and-go drop-off at the lobby entrance; wait zone along the side lane.",
  },
} as const;

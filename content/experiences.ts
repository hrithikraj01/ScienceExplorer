import type { Experience } from "./types";

/**
 * CONTENT HOOK — EXPERIENCES (launch swap)
 * ============================================================================
 * Live SGD prices and session dates live only in this file. Booking,
 * homepage cards, calendar, and detail pages read these fields — no layout
 * edits needed when the programme changes.
 *
 * Per experience, update:
 *   • creation.title / creation.description  → “You make: …” badges
 *   • priceLabel + priceSgd                  → display + checkout total
 *   • sessions[].startsAt / dateLabel / timeLabel / availability
 *   • homeTabs                               → homepage audience filter
 *   • isPlaceholder                          → false once live-confirmed
 *
 * Schedule below: Q4 2026 studio sessions (bookable). Confirm final rates
 * with Auntie Jonn before public launch if any fee has changed.
 * ============================================================================
 */
export const experiences: Experience[] = [
  {
    slug: "colour-changing-soap-lab",
    title: "Colour-changing soap lab",
    summary:
      "A chemistry bench that still smells like a garden. Mix, pour and take home a bar that shifts colour in the light.",
    audiences: ["child", "family"],
    themes: ["soap", "science"],
    creation: {
      title: "A swirl soap bar",
      description:
        "Your own glycerin bar, layered with colour that blooms when it meets water.",
    },
    explore: [
      "How colour sits in glycerin, and why it blooms in water.",
      "Safe mixing, pouring and layering on a real bench.",
      "Naming the bar you take home.",
    ],
    itinerary: [
      "Arrive, apron up, see the colour bench.",
      "Mix, pour and swirl your own bar.",
      "Wrap it and leave with something that still smells like a garden.",
    ],
    ageLabel: "Ages 6–12",
    durationLabel: "2 hours",
    priceLabel: "S$55",
    priceSgd: 55,
    homeTabs: ["kids"],
    locationLabel: "Singapore studio",
    featured: true,
    isPlaceholder: false,
    sessions: [
      {
        id: "soap-1",
        startsAt: "2026-09-27",
        dateLabel: "Sat 27 Sep",
        timeLabel: "10:00",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
      {
        id: "soap-2",
        startsAt: "2026-10-18",
        dateLabel: "Sat 18 Oct",
        timeLabel: "10:00",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "galaxy-cupcake-kitchen",
    title: "Galaxy cupcake kitchen",
    summary:
      "Baking as a small astronomy mission: batter, glaze and a constellation you can eat.",
    audiences: ["child", "family"],
    themes: ["cooking", "science"],
    creation: {
      title: "A tray of galaxy cupcakes",
      description:
        "Six cupcakes with a night-sky swirl and a star you piped yourself.",
    },
    explore: [
      "Batter, bake and glaze as a small astronomy mission.",
      "Colour, swirl and a constellation you can eat.",
      "Piping a star you designed.",
    ],
    itinerary: [
      "Mix the batter and learn why it rises.",
      "Glaze a night-sky swirl.",
      "Box a tray of six to take home.",
    ],
    ageLabel: "Ages 5–11",
    durationLabel: "2 hours",
    priceLabel: "S$58",
    priceSgd: 58,
    homeTabs: ["kids"],
    locationLabel: "Singapore studio",
    featured: true,
    isPlaceholder: false,
    sessions: [
      {
        id: "cake-1",
        startsAt: "2026-10-04",
        dateLabel: "Sat 4 Oct",
        timeLabel: "10:00",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "limited",
        isPlaceholder: false,
      },
      {
        id: "cake-2",
        startsAt: "2026-10-25",
        dateLabel: "Sat 25 Oct",
        timeLabel: "10:00",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "mangrove-morning",
    title: "Mangrove morning",
    summary:
      "A slow walk with notebooks and jars — noticing crabs, roots and the tide, then making a press of what you found.",
    audiences: ["family", "child"],
    themes: ["nature", "adventure"],
    creation: {
      title: "A nature press & field card",
      description:
        "A small pressed-leaf card and a field note you write on the boardwalk.",
    },
    explore: [
      "Crabs, roots and the tide — noticing, not racing.",
      "How a mangrove holds the shore.",
      "A field note written where you stood.",
    ],
    itinerary: [
      "Slow walk with notebooks and jars.",
      "Collect what the site allows, then press a leaf.",
      "Leave with a card and a note from the boardwalk.",
    ],
    ageLabel: "Ages 7+ with an adult",
    durationLabel: "3 hours",
    priceLabel: "S$68",
    priceSgd: 68,
    homeTabs: ["kids", "teens"],
    locationLabel: "Singapore field site",
    featured: false,
    isPlaceholder: false,
    sessions: [
      {
        id: "mangrove-1",
        startsAt: "2026-11-01",
        dateLabel: "Sun 1 Nov",
        timeLabel: "09:00",
        durationMinutes: 180,
        location: "Field site",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "brass-and-bloom",
    title: "Brass and bloom jewellery",
    summary:
      "An adult evening of wire, beads and a little botany — leave with a piece you actually want to wear.",
    audiences: ["self"],
    themes: ["jewellery"],
    creation: {
      title: "A wearable bloom",
      description:
        "A brass-and-bead pendant or pair of earrings finished on the night.",
    },
    explore: [
      "Wire, beads and a little botany.",
      "Form, finish and wear the same evening.",
      "An adult pace — no school-lab energy.",
    ],
    itinerary: [
      "Choose a bloom and a brass base.",
      "Wire and bead at the bench.",
      "Leave wearing the piece, or boxed.",
    ],
    ageLabel: "Adults",
    durationLabel: "2.5 hours",
    priceLabel: "S$72",
    priceSgd: 72,
    homeTabs: ["adults", "teens"],
    locationLabel: "Singapore studio",
    featured: true,
    isPlaceholder: false,
    sessions: [
      {
        id: "jewel-1",
        startsAt: "2026-10-09",
        dateLabel: "Thu 9 Oct",
        timeLabel: "19:00",
        durationMinutes: 150,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
      {
        id: "jewel-2",
        startsAt: "2026-11-06",
        dateLabel: "Thu 6 Nov",
        timeLabel: "19:00",
        durationMinutes: 150,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "fizz-and-bang-show",
    title: "Fizz & bang science show",
    summary:
      "A live show for birthdays and groups — reactions you can see, plus a small make-and-take at the end.",
    audiences: ["child", "group"],
    themes: ["shows", "science"],
    creation: {
      title: "A show kit keepsake",
      description:
        "A mini experiment pouch the birthday crew takes home after the finale.",
    },
    explore: [
      "Reactions you can see, not a worksheet.",
      "A live show built for birthdays and groups.",
      "A small make-and-take after the finale.",
    ],
    itinerary: [
      "The show — fizz, colour, bang.",
      "Helpers from the birthday crew on stage.",
      "Pack a mini experiment pouch to take home.",
    ],
    ageLabel: "Ages 5–10",
    durationLabel: "75 minutes",
    priceLabel: "From S$180",
    priceSgd: 180,
    homeTabs: ["kids"],
    locationLabel: "Your venue or ours",
    featured: false,
    isPlaceholder: false,
    sessions: [
      {
        id: "show-1",
        dateLabel: "Private bookings — enquire",
        durationMinutes: 75,
        location: "Singapore studio",
        availability: "tba",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "marbling-maps",
    title: "Marbling maps",
    summary:
      "Ink on water, then paper — you draw a map of a place that does not exist yet and take it home.",
    audiences: ["child", "self", "family"],
    themes: ["marbling", "science"],
    creation: {
      title: "A marbled map print",
      description:
        "Two sheets of marbled paper, one turned into a folded expedition map.",
    },
    explore: [
      "Ink on water, then paper.",
      "Colour, density and a print you cannot quite repeat.",
      "Drawing a map of a place that does not exist yet.",
    ],
    itinerary: [
      "Drop ink, pull two sheets.",
      "Dry, then draw a route on one print.",
      "Fold it into an expedition map to take home.",
    ],
    ageLabel: "Ages 8+ / adults",
    durationLabel: "2 hours",
    priceLabel: "S$60",
    priceSgd: 60,
    homeTabs: ["kids", "teens", "adults"],
    locationLabel: "Singapore studio",
    featured: true,
    isPlaceholder: false,
    sessions: [
      {
        id: "marble-1",
        startsAt: "2026-10-12",
        dateLabel: "Sun 12 Oct",
        timeLabel: "14:00",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
      {
        id: "marble-2",
        startsAt: "2026-11-15",
        dateLabel: "Sun 15 Nov",
        timeLabel: "14:00",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "magnet-expedition",
    title: "Fridge-magnet expedition",
    summary:
      "Poles, paint and a tiny sculpture that lives on the fridge — science you can stick next to the snacks.",
    audiences: ["child"],
    themes: ["magnets", "science"],
    creation: {
      title: "A pair of expedition magnets",
      description: "Two hand-painted magnets with a hidden polarity trick.",
    },
    explore: [
      "Poles, paint and a tiny sculpture.",
      "Why opposites pull, and why a fridge holds.",
      "Science you can stick next to the snacks.",
    ],
    itinerary: [
      "Test poles, then shape a pair.",
      "Paint and hide a polarity trick.",
      "Take two magnets home.",
    ],
    ageLabel: "Ages 5–9",
    durationLabel: "90 minutes",
    priceLabel: "S$48",
    priceSgd: 48,
    homeTabs: ["kids"],
    locationLabel: "Singapore studio",
    featured: false,
    isPlaceholder: false,
    sessions: [
      {
        id: "magnet-1",
        startsAt: "2026-10-11",
        dateLabel: "Sat 11 Oct",
        timeLabel: "10:30",
        durationMinutes: 90,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
      {
        id: "magnet-2",
        startsAt: "2026-10-31",
        dateLabel: "Sat 31 Oct",
        timeLabel: "10:30",
        durationMinutes: 90,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "night-drink-alchemy",
    title: "Night drink alchemy",
    summary:
      "An adults-only lab of infusions, colour and fizz. You bottle a drink to take home.",
    audiences: ["self", "corporate"],
    themes: ["drinks", "science"],
    creation: {
      title: "A bottled infusion",
      description:
        "One labelled bottle of a drink you designed — recipe card included.",
    },
    explore: [
      "Infusions, colour and fizz — adults only.",
      "Taste, adjust, name what you bottled.",
      "A recipe card so you can remake it.",
    ],
    itinerary: [
      "Taste the base and choose a direction.",
      "Infuse, colour and bottle.",
      "Label it and leave with one bottle.",
    ],
    ageLabel: "Adults 18+",
    durationLabel: "2 hours",
    priceLabel: "S$65",
    priceSgd: 65,
    homeTabs: ["adults"],
    locationLabel: "Singapore studio",
    featured: false,
    isPlaceholder: false,
    sessions: [
      {
        id: "drink-1",
        startsAt: "2026-10-17",
        dateLabel: "Fri 17 Oct",
        timeLabel: "19:30",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "limited",
        isPlaceholder: false,
      },
      {
        id: "drink-2",
        startsAt: "2026-11-20",
        dateLabel: "Fri 20 Nov",
        timeLabel: "19:30",
        durationMinutes: 120,
        location: "Singapore studio",
        availability: "open",
        isPlaceholder: false,
      },
    ],
  },
  {
    slug: "team-curiosity-lab",
    title: "Team curiosity lab",
    summary:
      "A corporate expedition: shared making, a little theatre, and a table of things the team built together.",
    audiences: ["corporate", "group"],
    themes: ["science", "adventure"],
    creation: {
      title: "A team-made artefact",
      description:
        "One shared centrepiece plus a small make-and-take for every person.",
    },
    explore: [
      "Shared making, a little theatre.",
      "Teams who want to make, not sit.",
      "One table of things you built together.",
    ],
    itinerary: [
      "Brief, then make in small crews.",
      "Assemble a shared centrepiece.",
      "Everyone leaves with a small make-and-take.",
    ],
    ageLabel: "Teams / adults",
    durationLabel: "Half day",
    priceLabel: "Custom quote",
    homeTabs: ["adults"],
    locationLabel: "Your office or ours",
    featured: false,
    isPlaceholder: false,
    sessions: [
      {
        id: "corp-1",
        dateLabel: "Private dates — enquire",
        durationMinutes: 240,
        location: "Singapore studio",
        availability: "tba",
        isPlaceholder: false,
      },
    ],
  },
];

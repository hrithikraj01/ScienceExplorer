"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import {
  DoodleAtom,
  DoodleBeaker,
  DoodleCupcake,
  DoodleMagnet,
  DoodleSoap,
  DoodleSwirl,
} from "@/components/ui/Doodles";
import { SectionPill } from "@/components/ui/SectionPill";
import { cn } from "@/lib/cn";

/**
 * CONTENT HOOK — TRAIL_CREATIONS
 * Tangible take-homes shown under Explorer’s Trail.
 * Swap titles, blurbs, or workshop links without layout edits.
 */
const creations = [
  {
    id: "soap",
    title: "Handcrafted Swirl Soap",
    blurb: "Colour, scent, and a bar you wash with and show off.",
    badge: "Take-home",
    href: "/experiences/colour-changing-soap-lab",
    Icon: DoodleSoap,
    well: "from-pink-soft/80 to-paper-bright",
    tilt: "-1.6deg",
  },
  {
    id: "cupcakes",
    title: "Galaxy Cupcakes",
    blurb: "Swirl frosting, edible sparkle, and a tray to share.",
    badge: "Bake & keep",
    href: "/experiences/galaxy-cupcake-kitchen",
    Icon: DoodleCupcake,
    well: "from-blue-soft/90 to-paper-bright",
    tilt: "1.4deg",
  },
  {
    id: "maps",
    title: "Marbled Map Prints",
    blurb: "Ink-on-water paper folded into your own expedition map.",
    badge: "Print",
    href: "/experiences/marbling-maps",
    Icon: DoodleSwirl,
    well: "from-mustard-soft/90 to-paper-bright",
    tilt: "-1.1deg",
  },
  {
    id: "magnets",
    title: "Expedition Magnets",
    blurb: "A painted pair that lives on your fridge at home.",
    badge: "Pair",
    href: "/experiences/magnet-expedition",
    Icon: DoodleMagnet,
    well: "from-pink-soft/70 to-blue-soft/60",
    tilt: "1.8deg",
  },
  {
    id: "beaker",
    title: "Custom Beaker Creations",
    blurb: "Mix, pour, and bottle a curious concoction of your own.",
    badge: "Lab keep",
    href: "/experiences",
    Icon: DoodleBeaker,
    well: "from-blue-soft/80 to-mustard-soft/50",
    tilt: "-0.9deg",
  },
] as const;

const processSteps = [
  {
    n: "01",
    label: "Idea",
    place: "Cairn of Insight",
    line: "A spark of curiosity that starts the trail.",
  },
  {
    n: "02",
    label: "Experiment",
    place: "Chemistry Station",
    line: "Hands-on testing — mix, try, and see.",
  },
  {
    n: "03",
    label: "Make",
    place: "Chamber of Creation",
    line: "Build something real you can take home.",
  },
  {
    n: "04",
    label: "Belong",
    place: "Haven of Belonging",
    line: "Share what you made — and come back.",
  },
] as const;

function IdeaSpark({ className }: { className?: string }) {
  return <DoodleAtom className={className} />;
}

function ExperimentMix({ className }: { className?: string }) {
  return <DoodleBeaker className={className} />;
}

function MakeGear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle cx="32" cy="32" r="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <circle cx="32" cy="32" r="4" fill="#2563eb" />
      <path
        d="M32 12v6M32 46v6M12 32h6M46 32h6M18 18l4 4M42 42l4 4M46 18l-4 4M22 42l-4 4"
        stroke="#2563eb"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M44 40l8 10M48 38l10 6"
        stroke="#ec4899"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BelongHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="#2563eb"
        strokeWidth="1.6"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      <path
        d="M32 38s-6-3.5-6-7.5a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4-6 7.5-6 7.5Z"
        fill="#fce7f3"
        stroke="#ec4899"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stepIcons = [IdeaSpark, ExperimentMix, MakeGear, BelongHeart] as const;

export function CorePromise() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const focused = hovered ?? active;

  useEffect(() => {
    if (paused || hovered !== null) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [paused, hovered]);

  return (
    <section
      id="explorers-trail"
      className="explorers-trail relative overflow-x-clip bg-[#FDFBF9] pb-6 md:pb-10"
    >
      <Reveal className="w-full">
        <div className="explorers-trail-banner relative left-1/2 w-screen max-w-none -translate-x-1/2 border-y border-[#EAE5DD]">
          <div className="trail-banner__grid" aria-hidden />

          <div className="trail-banner__inner relative z-[1] mx-auto flex max-w-6xl flex-col justify-center px-4 py-5 sm:px-8 sm:py-6 md:px-10">
            <header className="trail-banner__header flex flex-wrap items-end justify-between gap-2">
              <div>
                <SectionPill tone="trail">Explorer&apos;s Trail</SectionPill>
                <h2 className="sr-only">Idea, Experiment, Make, Belong</h2>
                <p className="trail-banner__lede">
                  Where curious sparks become real creations — walk our
                  hands-on science trail.
                </p>
              </div>
              <p className="trail-banner__hint hidden sm:block" aria-hidden>
                Idea → Experiment → Make → Belong
              </p>
            </header>

            <div
              className="trail-banner__pipeline"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => {
                setPaused(false);
                setHovered(null);
              }}
            >
              {/* Fluid connecting track */}
              <div className="trail-banner__track" aria-hidden>
                <span
                  className="trail-banner__track-fill"
                  style={{
                    width: `${(focused / (processSteps.length - 1)) * 100}%`,
                  }}
                />
                <span
                  className="trail-banner__pulse"
                  style={{
                    left: `calc(${(focused / (processSteps.length - 1)) * 100}% - 6px)`,
                  }}
                />
              </div>

              <ol className="trail-banner__steps">
                {processSteps.map((step, index) => {
                  const Icon = stepIcons[index];
                  const isActive = index === focused;

                  return (
                    <li
                      key={step.label}
                      className={cn(
                        "trail-banner__col",
                        isActive && "is-active",
                      )}
                      style={{ flexGrow: isActive ? 1.45 : 1 }}
                    >
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`${step.n} ${step.label}: ${step.place}`}
                        onClick={() => {
                          setActive(index);
                          setPaused(true);
                        }}
                        onMouseEnter={() => setHovered(index)}
                        onFocus={() => {
                          setHovered(index);
                          setPaused(true);
                        }}
                        onBlur={() => setHovered(null)}
                        className={cn(
                          "trail-banner__card",
                          isActive && "is-active",
                        )}
                      >
                        <div className="trail-banner__card-top">
                          <span className="trail-banner__num">{step.n}</span>
                          <span className="trail-banner__node" aria-hidden />
                        </div>

                        <p className="trail-banner__label">{step.label}</p>
                        <p className="trail-banner__place">{step.place}</p>
                        <p className="trail-banner__line">{step.line}</p>

                        <div
                          className={cn(
                            "trail-banner__art",
                            isActive && "is-open",
                          )}
                          aria-hidden
                        >
                          <Icon className="h-9 w-9 sm:h-10 sm:w-10" />
                        </div>

                        {index === 2 ? (
                          <span className="trail-banner__tag">
                            You take this home!
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="shell mt-6 sm:mt-8">
        <Reveal>
          <div className="mb-5 text-center sm:mb-6">
            <p className="mx-auto w-fit">
              <SectionPill tone="make">What you make &amp; take home</SectionPill>
            </p>
            <p className="mx-auto mt-2 max-w-lg text-ink-soft">
              Real things from Auntie Jonn&apos;s workshops — soap, prints,
              magnets, and more you can hold.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {creations.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  index === 3 && "lg:col-start-1 xl:col-start-auto",
                  index === 4 &&
                    "sm:col-span-2 sm:mx-auto sm:max-w-sm lg:col-span-1 lg:mx-0 lg:max-w-none",
                )}
              >
                <Link
                  href={item.href}
                  className="creation-card module-card module-card--make tactile group flex h-full flex-col p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard"
                  style={{ ["--tilt" as string]: item.tilt }}
                >
                  <span className="stamp-tag w-fit">{item.badge}</span>
                  <span
                    className={cn(
                      "relative mt-3 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-gradient-to-br",
                      item.well,
                    )}
                  >
                    <item.Icon className="h-16 w-16 transition-transform duration-300 group-hover:scale-110 sm:h-[4.5rem] sm:w-[4.5rem]" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                    {item.blurb}
                  </p>
                  <span className="mt-3 text-sm font-semibold text-indigo transition-colors group-hover:text-pink-deep">
                    See workshop →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
    label: "Idea",
    line: "A spark of curiosity that starts the trail.",
  },
  {
    label: "Experiment",
    line: "Hands-on testing — mix, try, and see.",
  },
  {
    label: "Make",
    line: "Build something real you can take home.",
  },
  {
    label: "Belong",
    line: "Share what you made — and come back.",
  },
] as const;

/** Make — original 2D sunburst / sparkle doodle */
function MakeSparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle
        cx="32"
        cy="32"
        r="10"
        fill="#dbeafe"
        stroke="#2563eb"
        strokeWidth="2"
      />
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

/** Belong — original 2D dotted ring + pink heart */
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

const stepIcons = [DoodleAtom, DoodleBeaker, MakeSparkle, BelongHeart] as const;

export function CorePromise() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const focused = hovered ?? active;
  const progress =
    processSteps.length <= 1 ? 0 : focused / (processSteps.length - 1);

  useEffect(() => {
    if (reduceMotion || paused || hovered !== null) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [paused, hovered, reduceMotion]);

  return (
    <section
      id="explorers-trail"
      className="explorers-trail relative overflow-x-clip bg-[#FDFBF9] pb-6 md:pb-10"
    >
      <Reveal className="w-full">
        <div className="shell pt-6 sm:pt-8">
          <SectionPill tone="trail">Explorer&apos;s Trail</SectionPill>
          <h2 className="sr-only">Idea, Experiment, Make, Belong</h2>

          <div
            className="relative mt-8 sm:mt-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHovered(null);
            }}
          >
            {/* Thin connecting rail */}
            <div className="trail-track" aria-hidden>
              <span className="trail-track__base" />
              <motion.span
                className="trail-track__fill"
                initial={false}
                animate={{ scaleX: progress }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 140, damping: 24 }
                }
                style={{ transformOrigin: "left center" }}
              />
            </div>

            <ol className="relative z-[1] grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
              {processSteps.map((step, index) => {
                const Icon = stepIcons[index];
                const isActive = index === focused;
                const isLive = hovered === index;

                return (
                  <li key={step.label} className="flex justify-center md:block">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`${step.label}: ${step.line}`}
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
                        "trail-step group mx-auto flex w-full max-w-[14rem] flex-col items-center text-center md:max-w-none",
                        isActive && "is-active",
                        isLive && "is-live",
                      )}
                    >
                      <span className="relative flex h-20 w-20 items-center justify-center">
                        <span
                          className={cn(
                            "trail-step__orb flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300",
                            isActive || isLive
                              ? "border border-pink-400 bg-pink-50/20 shadow-sm ring-4 ring-pink-100"
                              : "border border-slate-200/80 bg-white shadow-sm",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-9 w-9 transition-transform duration-300 sm:h-10 sm:w-10",
                              (isActive || isLive) && "scale-110",
                            )}
                          />
                        </span>
                      </span>

                      <p
                        className={cn(
                          "mt-3 font-display text-xl tracking-tight transition-colors duration-300",
                          isActive || isLive
                            ? "font-bold text-blue-600"
                            : "font-semibold text-slate-900",
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="mt-1.5 max-w-[200px] text-sm leading-relaxed text-slate-600">
                        {step.line}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Reveal>

      <div className="shell mt-6 sm:mt-8">
        <Reveal>
          <div className="mb-5 text-center sm:mb-6">
            <SectionPill tone="make" className="mx-auto w-fit">
              What you make &amp; take home
            </SectionPill>
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

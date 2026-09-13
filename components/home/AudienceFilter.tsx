"use client";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { useState } from "react";

const audiences = [
  {
    id: "kids",
    label: "Kids & parent-child",
    title: "Fun, structured hands-on sessions",
    text: "Explore together through making — clear steps, real materials, and something to take home.",
  },
  {
    id: "teens",
    label: "Teens",
    title: "A creative space to experiment and learn",
    text: "Room to try ideas, work with your hands, and leave with a finished piece you designed.",
  },
  {
    id: "adults",
    label: "Adults & seniors",
    title: "Safe space for new hobbies",
    text: "Curious evenings, weekend making, or 1:1 tailored sessions — no pressure, just discovery.",
  },
  {
    id: "special",
    label: "Special-abled learners",
    title: "Adaptable, supportive environments",
    text: "Sessions paced with care — flexible supports so everyone can explore and create.",
  },
] as const;

type Audience = (typeof audiences)[number];

export function AudienceFilter() {
  const [active, setActive] = useState<Audience["id"]>("kids");
  const current = audiences.find((item) => item.id === active) ?? audiences[0];

  return (
    <section className="section bg-white">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-blue">Who is this for?</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            There isn&apos;t one kind of explorer
          </h2>
          <p className="mt-3 text-ink-soft">
            Choose who you&apos;re planning for — the experience adapts.
          </p>
        </Reveal>

        <Reveal>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Audience"
          >
            {audiences.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "touch-manipulation rounded-full px-4 py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200",
                    isActive
                      ? "bg-blue text-white shadow-[0_6px_16px_-6px_rgba(36,87,214,0.7)] ring-2 ring-blue ring-offset-2"
                      : "bg-paper text-ink-soft [@media(hover:hover)]:hover:bg-blue-soft [@media(hover:hover)]:hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            aria-live="polite"
            className="mt-6 min-h-[7.5rem] overflow-hidden rounded-2xl border border-line bg-paper p-6 sm:p-8"
          >
            <div key={current.id} className="audience-panel">
              <h3 className="text-xl font-semibold text-ink">{current.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
                {current.text}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

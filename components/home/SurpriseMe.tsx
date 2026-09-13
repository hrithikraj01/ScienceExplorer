"use client";

import { useState } from "react";
import Link from "next/link";
import { Spark } from "@/components/ui/Spark";

export type SurprisePick = {
  slug: string;
  title: string;
  creationTitle: string;
  theme?: string;
};

function invite(pick: SurprisePick) {
  const made = pick.creationTitle.replace(/^A /, "a ");
  switch (pick.theme) {
    case "soap":
      return `Try making ${made}.`;
    case "cooking":
      return `Bake ${made}.`;
    case "nature":
      return `Go outside and make ${made}.`;
    case "jewellery":
      return `Make ${made}.`;
    case "shows":
      return `See something fizz, then take ${made} home.`;
    case "marbling":
      return `Pull ${made}.`;
    case "magnets":
      return `Make ${made}.`;
    case "drinks":
      return `Mix ${made}.`;
    default:
      return `Make ${made}.`;
  }
}

export function SurpriseMe({ picks }: { picks: SurprisePick[] }) {
  const [current, setCurrent] = useState<SurprisePick | null>(null);

  function surprise() {
    if (picks.length === 0) return;
    let next = picks[Math.floor(Math.random() * picks.length)];
    if (picks.length > 1 && next.slug === current?.slug) {
      next = picks.find((item) => item.slug !== current.slug) ?? next;
    }
    setCurrent(next);
  }

  return (
    <div className="mt-8 border-t border-ink/10 pt-5">
      <p className="type-meta">Not sure what you&apos;re looking for?</p>
      <button
        type="button"
        onClick={surprise}
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors hover:text-pink"
      >
        <span className="em">Surprise me</span>
        <span aria-hidden>→</span>
      </button>
      {current ? (
        <div className="fade-in mt-3 measure-sm">
          <p className="flex items-start gap-1.5 font-semibold text-ink">
            <Spark tone="pink" className="mt-1" />
            <span>{invite(current)}</span>
          </p>
          <p className="type-meta mt-1">{current.title}</p>
          <Link
            href={`/experiences/${current.slug}`}
            className="type-link mt-2 inline-block"
          >
            See this experience →
          </Link>
        </div>
      ) : null}
    </div>
  );
}

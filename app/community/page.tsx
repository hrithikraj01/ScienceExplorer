import type { Metadata } from "next";
import { community } from "@/content/community";
import { founder } from "@/content/founder";
import { Button } from "@/components/ui/Button";
import { ObjectBench } from "@/components/ui/ObjectBench";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The Science Explorers camp in Singapore — a place to try something and come back.",
};

function copy(text: string) {
  return text.replace(/^Placeholder:\s*/, "");
}

export default function CommunityPage() {
  return (
    <main id="main" className="flex-1 pb-20">
      <div className="border-b border-ink/10 bg-amber-soft px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-navy">
              {community.headline}
            </h1>
            <p className="mt-5 font-display text-xl italic text-navy">
              Sometimes you just need a place to try.
            </p>
            <p className="mt-4 text-ink">
              Come for something you&apos;re curious about. Stay for the people you
              meet.
            </p>
            <p className="mt-4 text-sm text-ink-soft">{copy(founder.story[0])}</p>
          </div>
          <ObjectBench caption="A place people return to · photograph to come" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="grid gap-4">
          {community.trails.map((trail) => (
            <article key={trail.title} className="border-b border-ink/10 pb-4">
              <h2 className="font-semibold text-ink">{trail.title}</h2>
              <p className="mt-1 text-ink-soft">{copy(trail.text)}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm text-ink-soft">{copy(community.intro)}</p>
        <div className="mt-8">
          <Button href="/experiences">See what&apos;s on</Button>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { founder } from "@/content/founder";
import { Button } from "@/components/ui/Button";
import { ObjectBench } from "@/components/ui/ObjectBench";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Auntie Jonn, founder of Science Explorers Singapore.",
};

function copy(text: string) {
  return text.replace(/^Placeholder:\s*/, "");
}

export default function AboutPage() {
  return (
    <main id="main" className="flex-1 pb-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:px-8">
        <ObjectBench
          className="w-full max-w-sm"
          caption="Auntie Jonn with someone, making · photograph to come"
        />
        <div>
          <p className="text-sm font-semibold text-blue">Meet Auntie Jonn</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {founder.name}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">{founder.role}</p>
          <p className="mt-6 max-w-xl text-lg text-ink">{founder.promise}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-12 lg:px-8">
        <div className="max-w-2xl space-y-4 text-ink-soft">
          {founder.story.map((paragraph) => (
            <p key={paragraph}>{copy(paragraph)}</p>
          ))}
        </div>
        <div className="mt-10 max-w-2xl space-y-4 text-ink-soft">
          {founder.philosophy.map((item) => (
            <p key={item.title}>{copy(item.text)}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/experiences">See what&apos;s on</Button>
          <Button
            href="/community"
            variant="secondary"
            className="uppercase tracking-[0.12em]"
          >
            More about the Camp
          </Button>
        </div>
      </div>
    </main>
  );
}

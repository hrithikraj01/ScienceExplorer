import { Reveal } from "@/components/ui/Reveal";
import { SectionPill } from "@/components/ui/SectionPill";
import { DoodleStar } from "@/components/ui/Doodles";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/cn";

function clean(text: string) {
  return text.replace(/^Placeholder:\s*/i, "");
}

const NOTE_TILTS = ["-2deg", "1.6deg", "-1.2deg"] as const;
const PIN_COLORS = ["#ec4899", "#312e81", "#d4a017"] as const;
const NOTE_TONES = ["note-mint", "note-lilac", "note-butter"] as const;

function QuotedNote({
  quote,
  highlight,
  highlightTone,
}: {
  quote: string;
  highlight: string;
  highlightTone: "mustard" | "pink" | "mint";
}) {
  const body = clean(quote);
  const index = body.toLowerCase().indexOf(highlight.toLowerCase());

  if (index < 0) {
    return (
      <p className="font-quote text-lg font-medium leading-snug text-ink md:text-xl">
        &ldquo;{body}&rdquo;
      </p>
    );
  }

  const before = body.slice(0, index);
  const match = body.slice(index, index + highlight.length);
  const after = body.slice(index + highlight.length);

  return (
    <p className="font-quote text-lg font-medium leading-snug text-ink md:text-xl">
      &ldquo;
      {before}
      <mark className={cn("quote-mark", `quote-mark--${highlightTone}`)}>
        <span className="font-hand text-[1.15em] font-semibold leading-none">
          {match}
        </span>
      </mark>
      {after}
      &rdquo;
    </p>
  );
}

export function PinnedNotes() {
  const quotes = testimonials.slice(0, 3);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden grain bg-[#FDFBF9] py-8 md:py-12"
    >
      <div className="shell">
        <Reveal>
          <div className="cork-board p-5 sm:p-7">
            <SectionPill tone="testimonials">Testimonials</SectionPill>
            <h2 className="mt-4 flex flex-wrap items-center gap-2 font-hand text-3xl leading-none text-white drop-shadow-[0_2px_6px_rgba(28,25,23,0.55)] sm:text-4xl">
              <span>Pinned notes from explorers</span>
              <DoodleStar className="h-8 w-8 shrink-0 drop-shadow-md sm:h-9 sm:w-9" />
            </h2>

            <ul className="mt-7 grid gap-5">
              {quotes.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    "sticky-note pinned-note relative px-5 pb-5 pt-8 drop-shadow-md",
                    NOTE_TONES[index % NOTE_TONES.length],
                  )}
                  style={{
                    ["--tilt" as string]: NOTE_TILTS[index % NOTE_TILTS.length],
                  }}
                >
                  <span className="note-tape" aria-hidden />
                  <span
                    className="push-pin"
                    style={{
                      ["--pin" as string]:
                        PIN_COLORS[index % PIN_COLORS.length],
                    }}
                    aria-hidden
                  />

                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <span className="tape-tag">{item.name}</span>
                    <span className="stamp-tag">{item.context}</span>
                  </div>

                  <QuotedNote
                    quote={item.quote}
                    highlight={item.highlight}
                    highlightTone={item.highlightTone}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

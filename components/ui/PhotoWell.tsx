import { cn } from "@/lib/cn";
import { ObjectArt } from "@/components/ui/ObjectArt";
import { Spark } from "@/components/ui/Spark";

export type StudioWall = "blue" | "pink" | "navy" | "amber" | "paper" | "stone";

const bands: Record<StudioWall, string> = {
  blue: "bg-blue",
  pink: "bg-pink",
  navy: "bg-navy",
  amber: "bg-amber",
  paper: "bg-amber-soft",
  stone: "bg-ink/10",
};

export function wallForTheme(theme?: string): StudioWall {
  switch (theme) {
    case "soap":
    case "jewellery":
    case "marbling":
      return "pink";
    case "science":
    case "drinks":
    case "magnets":
      return "blue";
    case "cooking":
      return "amber";
    case "shows":
    case "adventure":
      return "navy";
    default:
      return "stone";
  }
}

export function PhotoWell({
  caption,
  wall = "stone",
  className,
  object,
  note,
}: {
  caption?: string;
  wall?: StudioWall;
  className?: string;
  object?: { title?: string; theme?: string };
  note?: string;
}) {
  const bench = !object?.theme || object.theme === "together";

  return (
    <figure
      className={cn(
        "relative flex min-h-0 flex-col overflow-hidden border border-ink/15 bg-paper-bright",
        className,
      )}
    >
      <div className="relative min-h-0 flex-1">
        <div
          className={cn("absolute inset-x-0 bottom-0 h-[30%]", bands[wall])}
          aria-hidden
        />
        <div className="absolute inset-x-4 bottom-[30%] top-10 flex items-end justify-center gap-[3%]">
          {bench ? (
            <>
              <div className="w-[36%]" aria-hidden>
                <ObjectArt kind="mould" />
              </div>
              <div className="w-[13%]" aria-hidden>
                <ObjectArt kind="beaker" />
              </div>
              <div className="w-[32%]" aria-hidden>
                <ObjectArt kind="soap" />
              </div>
            </>
          ) : (
            <div className="h-[88%] max-w-full" aria-hidden>
              <ObjectArt theme={object?.theme} fit="height" />
            </div>
          )}
        </div>
        <div className="absolute inset-x-4 top-4">
          {object?.title ? (
            <p className="text-sm font-semibold leading-snug tracking-tight text-ink sm:text-base">
              {object.title}
            </p>
          ) : null}
          <p className="mt-0.5 text-[11px] tracking-wide text-ink/45">
            Photograph to come
          </p>
          {note ? (
            <p className="mt-1.5 flex items-center gap-1 text-xs italic text-ink/70">
              <Spark tone="pink" className="h-2.5 w-2.5" />
              {note}
            </p>
          ) : null}
        </div>
      </div>
      {caption ? (
        <figcaption className="shrink-0 border-t border-ink/10 bg-paper-bright px-3 py-2 text-xs leading-snug text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

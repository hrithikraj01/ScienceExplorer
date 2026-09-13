import { ObjectArt, type ObjectKind } from "@/components/ui/ObjectArt";
import { cn } from "@/lib/cn";

const arrangement: { kind: ObjectKind; width: string }[] = [
  { kind: "mould", width: "w-[36%]" },
  { kind: "beaker", width: "w-[13%]" },
  { kind: "soap", width: "w-[34%]" },
];

export function ObjectBench({
  caption,
  surface = "light",
  className,
}: {
  caption?: string;
  surface?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-end gap-[5%]" aria-hidden>
        {arrangement.map((item) => (
          <div key={item.kind} className={item.width}>
            <ObjectArt kind={item.kind} surface={surface} />
          </div>
        ))}
      </div>
      <div
        className={cn("h-px", surface === "dark" ? "bg-white/25" : "bg-ink/15")}
        aria-hidden
      />
      {caption ? (
        <p
          className={cn(
            "mt-2 text-[11px] leading-snug tracking-wide",
            surface === "dark" ? "text-white/55" : "text-ink/45",
          )}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

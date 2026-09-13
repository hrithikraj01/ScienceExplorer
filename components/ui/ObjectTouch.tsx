import { cn } from "@/lib/cn";

/** Subtle physical hover for made objects — not a generic UI hover. */
export function ObjectTouch({
  children,
  className,
  kind,
}: {
  children: React.ReactNode;
  className?: string;
  kind?: "soap" | "magnet" | "default";
}) {
  return (
    <span
      className={cn(
        "object-touch",
        kind === "soap" && "is-soap",
        kind === "magnet" && "is-magnet",
        className,
      )}
    >
      {children}
    </span>
  );
}

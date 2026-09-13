import { cn } from "@/lib/cn";

const tones = {
  blue: "text-blue",
  pink: "text-pink",
  amber: "text-amber",
  navy: "text-navy",
  white: "text-white",
};

export function Spark({
  className,
  tone = "blue",
}: {
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={cn("inline-block h-3 w-3 shrink-0", tones[tone], className)}
      aria-hidden
    >
      <path
        d="M7.1 0.6 7.7 5.1 12.8 3.4 8.6 7 13.4 10.2 8.2 8.6 7 13.5 5.7 8.5 0.6 10.1 5.4 7 1.3 3.5 6.4 5.1 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SparkNote({
  children,
  tone = "blue",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-body flex items-start gap-1.5 italic text-ink-soft",
        className,
      )}
    >
      <Spark tone={tone} className="mt-1" />
      <span>{children}</span>
    </p>
  );
}

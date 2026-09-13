import { cn } from "@/lib/cn";

type Props = { className?: string };

/** Hand-drawn underline swoosh beneath emphasized words. */
export function HandSwoosh({ className }: Props) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      aria-hidden
      className={cn("hand-swoosh w-full text-magenta", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M2 8c18-6 36 2 54-2s34-4 52 1"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M8 10c20-3 40 1 58-1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

/** Loose hand-drawn circle highlight around a word. */
export function HandCircle({ className }: Props) {
  return (
    <svg
      viewBox="0 0 100 48"
      fill="none"
      aria-hidden
      className={cn("hand-circle w-[110%] text-mustard", className)}
      preserveAspectRatio="none"
    >
      <ellipse
        cx="50"
        cy="24"
        rx="46"
        ry="18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeDasharray="4 3"
        transform="rotate(-3 50 24)"
      />
    </svg>
  );
}

/** Tiny hand-drawn starburst used as a playful separator. */
export function HandSparkle({ className }: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn("inline-block h-[0.7em] w-[0.7em] text-mustard", className)}
    >
      <path
        d="M10 2.5v3.2M10 14.3v3.2M2.5 10h3.2M14.3 10h3.2M5.2 5.2l2.2 2.2M12.6 12.6l2.2 2.2M14.8 5.2l-2.2 2.2M7.4 12.6l-2.2 2.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function MarginNote({
  children,
  className,
  withConnector = false,
}: {
  children: React.ReactNode;
  className?: string;
  withConnector?: boolean;
}) {
  if (!withConnector) {
    return (
      <p className={cn("margin-note font-hand text-lg sm:text-xl", className)}>
        {children}
      </p>
    );
  }

  return (
    <span className={cn("margin-callout", className)}>
      <svg
        className="margin-callout__line"
        viewBox="0 0 48 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 20c8-2 14-14 22-14 6 0 12 4 18 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        <circle cx="4" cy="20" r="2" fill="currentColor" />
      </svg>
      <p className="margin-note font-hand text-lg sm:text-xl">{children}</p>
    </span>
  );
}

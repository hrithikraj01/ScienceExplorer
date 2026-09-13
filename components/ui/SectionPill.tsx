import { cn } from "@/lib/cn";

const tones = {
  trail: "section-pill--trail",
  make: "section-pill--make",
  audience: "section-pill--audience",
  studio: "section-pill--studio",
  testimonials: "section-pill--testimonials",
  visit: "section-pill--visit",
} as const;

export type SectionPillTone = keyof typeof tones;

export function SectionPill({
  children,
  tone,
  className,
}: {
  children: React.ReactNode;
  tone: SectionPillTone;
  className?: string;
}) {
  return (
    <p className={cn("section-pill", tones[tone], className)}>{children}</p>
  );
}

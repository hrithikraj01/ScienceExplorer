import type { Experience } from "@/content/types";
import { nextSession } from "@/lib/experiences";
import { Button } from "@/components/ui/Button";
import { PhotoWell, wallForTheme } from "@/components/ui/PhotoWell";
import { cn } from "@/lib/cn";

export function ExperienceCard({
  experience,
  featured = false,
}: {
  experience: Experience;
  featured?: boolean;
}) {
  const session = nextSession(experience);

  return (
    <article>
      <PhotoWell
        className={cn("h-52", featured && "sm:h-64")}
        wall={wallForTheme(experience.themes[0])}
        object={{ theme: experience.themes[0] }}
      />
      <div className="pt-3">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-ink">
          {experience.title}
        </h3>
        <p className="mt-1 text-sm text-ink">You make: {experience.creation.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-ink-soft">
          {experience.ageLabel}
          {session ? ` · ${session.dateLabel}` : ""}
          {` · ${experience.durationLabel} · ${experience.priceLabel} · ${experience.locationLabel}`}
        </p>
        <Button
          href={`/experiences/${experience.slug}`}
          variant="ghost"
          className="mt-3 min-h-0 px-0 py-0"
        >
          See experience
        </Button>
      </div>
    </article>
  );
}

import Link from "next/link";
import { AUDIENCE_LABELS, THEME_LABELS, type Theme } from "@/content/types";
import { AUDIENCES } from "@/content/types";
import {
  catalogueHref,
  usedThemes,
  type ExperienceFilters,
} from "@/lib/experiences";
import { cn } from "@/lib/cn";

export function CatalogueFilters({
  base,
  current,
}: {
  base: "/experiences" | "/calendar";
  current: ExperienceFilters;
}) {
  const themes = usedThemes();

  return (
    <div className="space-y-4">
      <FilterRow label="Who's this for?">
        <Tag href={catalogueHref(base, current, { audience: null })} active={!current.audience}>
          Everyone
        </Tag>
        {AUDIENCES.map((audience) => (
          <Tag
            key={audience}
            href={catalogueHref(base, current, { audience })}
            active={current.audience === audience}
          >
            {AUDIENCE_LABELS[audience]}
          </Tag>
        ))}
      </FilterRow>
      <FilterRow label="What interests you?">
        <Tag href={catalogueHref(base, current, { theme: null })} active={!current.theme}>
          All
        </Tag>
        {themes.map((theme: Theme) => (
          <Tag
            key={theme}
            href={catalogueHref(base, current, { theme })}
            active={current.theme === theme}
          >
            {THEME_LABELS[theme]}
          </Tag>
        ))}
      </FilterRow>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      <div className="flex gap-x-4 gap-y-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

function Tag({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 border-b px-0 py-1 text-sm",
        active ? "border-ink font-semibold text-ink" : "border-transparent text-ink-soft hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

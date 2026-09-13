import { cn } from "@/lib/cn";

export function PeopleStill({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <svg
      viewBox={compact ? "0 0 140 180" : "0 0 280 170"}
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {compact ? <CompactFigures /> : <TableFigures />}
    </svg>
  );
}

function TableFigures() {
  return (
    <g>
      <rect x="18" y="118" width="244" height="10" fill="#c9c2b4" />
      <path d="M38 128 H242 L228 162 H52 Z" fill="#b7b09f" />
      <rect x="72" y="108" width="32" height="10" rx="2" fill="#f4a8cc" stroke="#1a1a1a" strokeWidth="1.2" />
      <rect x="128" y="98" width="16" height="20" fill="#7eb0ff" stroke="#1a1a1a" strokeWidth="1.2" />
      <circle cx="188" cy="112" r="9" fill="#d9a441" stroke="#1a1a1a" strokeWidth="1.2" />
      <Figure cx={52} cy={86} r={11} h={32} fill="#161b2c" />
      <Figure cx={108} cy={74} r={13} h={44} fill="#161b2c" />
      <Figure cx={168} cy={64} r={15} h={54} fill="#161b2c" />
      <Figure cx={228} cy={72} r={13} h={46} fill="#161b2c" />
    </g>
  );
}

function CompactFigures() {
  return (
    <g>
      <rect x="12" y="132" width="116" height="8" fill="#c9c2b4" />
      <path d="M22 140 H118 L110 168 H30 Z" fill="#b7b09f" />
      <Figure cx={38} cy={108} r={10} h={24} fill="#161b2c" />
      <Figure cx={70} cy={92} r={12} h={40} fill="#161b2c" />
      <Figure cx={104} cy={84} r={13} h={48} fill="#161b2c" />
    </g>
  );
}

function Figure({
  cx,
  cy,
  r,
  h,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  h: number;
  fill: string;
}) {
  const shoulder = r * 1.55;
  return (
    <g fill={fill}>
      <circle cx={cx} cy={cy} r={r} />
      <path
        d={`M${cx - shoulder} ${cy + r * 0.85}
           Q${cx} ${cy + r * 0.4} ${cx + shoulder} ${cy + r * 0.85}
           L${cx + shoulder * 0.92} ${cy + h}
           L${cx - shoulder * 0.92} ${cy + h} Z`}
      />
    </g>
  );
}

export function MaterialsStill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={cn("h-full w-full", className)} aria-hidden>
      <rect x="28" y="38" width="72" height="54" fill="#d63d8c" stroke="#1a1a1a" strokeWidth="1.6" />
      <rect x="36" y="48" width="56" height="4" fill="#f7f6f3" opacity="0.85" />
      <rect x="36" y="58" width="40" height="3" fill="#f7f6f3" opacity="0.7" />
      <rect x="36" y="66" width="48" height="3" fill="#f7f6f3" opacity="0.7" />
      <rect x="108" y="22" width="18" height="14" fill="#161b2c" />
      <path d="M96 40 H138 L130 96 H104 Z" fill="#2457d6" stroke="#1a1a1a" strokeWidth="1.6" />
      <path
        d="M158 28 C168 48 188 54 158 92 C128 54 148 48 158 28 Z"
        fill="#d9a441"
        stroke="#1a1a1a"
        strokeWidth="1.6"
      />
    </svg>
  );
}

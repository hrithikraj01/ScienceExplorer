import { cn } from "@/lib/cn";

const INK = "#1a1a1a";
const BLUE = "#2457d6";
const PINK = "#d63d8c";
const NAVY = "#161b2c";
const AMBER = "#d9a441";
const WHITE = "#ffffff";

export type ObjectKind =
  | "soap"
  | "cupcake"
  | "leaf"
  | "pendant"
  | "magnet"
  | "paper"
  | "bottle"
  | "pouch"
  | "artefact"
  | "beaker"
  | "sheet"
  | "mould";

const kindByTheme: Record<string, ObjectKind> = {
  soap: "soap",
  cooking: "cupcake",
  nature: "leaf",
  jewellery: "pendant",
  magnets: "magnet",
  marbling: "paper",
  drinks: "bottle",
  shows: "pouch",
  science: "beaker",
  adventure: "artefact",
};

export function objectKind(theme?: string): ObjectKind {
  return kindByTheme[theme ?? ""] ?? "beaker";
}

type Surface = "light" | "dark";

type Pal = {
  stroke: string;
  neutral: string;
  hairline: string;
  deep: string;
  sheen: string;
};

const palettes: Record<Surface, Pal> = {
  light: {
    stroke: INK,
    neutral: WHITE,
    hairline: "rgba(26,26,26,0.28)",
    deep: NAVY,
    sheen: "rgba(255,255,255,0.55)",
  },
  dark: {
    stroke: "#f7f6f3",
    neutral: NAVY,
    hairline: "rgba(247,246,243,0.4)",
    deep: NAVY,
    sheen: "rgba(255,255,255,0.22)",
  },
};

export function ObjectArt({
  theme,
  kind,
  surface = "light",
  fit = "width",
  className,
}: {
  theme?: string;
  kind?: ObjectKind;
  surface?: Surface;
  fit?: "width" | "height";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={cn(
        "block",
        fit === "height" ? "h-full w-auto" : "h-auto w-full",
        className,
      )}
      aria-hidden
    >
      {draw(kind ?? objectKind(theme), palettes[surface])}
    </svg>
  );
}

const focusByKind: Partial<Record<ObjectKind, [number, number]>> = {
  soap: [62, 54],
  cupcake: [100, 58],
  leaf: [100, 70],
  magnet: [100, 70],
  paper: [100, 66],
  bottle: [100, 84],
};

export function ObjectDetail({
  theme,
  kind,
  label,
  surface = "light",
  zoom = 2,
  className,
}: {
  theme?: string;
  kind?: ObjectKind;
  label?: string;
  surface?: Surface;
  zoom?: number;
  className?: string;
}) {
  const resolved = kind ?? objectKind(theme);
  const pal = palettes[surface];
  const [fx, fy] = focusByKind[resolved] ?? [100, 70];
  const clipId = `look-${resolved}`;

  return (
    <figure className={cn("w-24", className)}>
      <svg viewBox="0 0 100 100" className="block h-auto w-full" aria-hidden>
        <defs>
          <clipPath id={clipId}>
            <circle cx="50" cy="50" r="47" />
          </clipPath>
        </defs>
        <circle cx="50" cy="50" r="47" fill={surface === "dark" ? NAVY : "#f7f6f3"} />
        <g clipPath={`url(#${clipId})`}>
          <g transform={`translate(50 50) scale(${zoom}) translate(${-fx} ${-fy})`}>
            {draw(resolved, pal)}
          </g>
        </g>
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke={pal.stroke}
          strokeWidth="1.6"
        />
      </svg>
      {label ? (
        <figcaption
          className={cn(
            "em-phrase mt-1.5 text-center",
            surface === "dark" && "text-pink",
          )}
        >
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

function draw(kind: ObjectKind, p: Pal) {
  const line = { fill: "none", stroke: p.stroke, strokeWidth: 3 } as const;

  switch (kind) {
    case "soap":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect
            x="20"
            y="44"
            width="160"
            height="62"
            rx="20"
            fill={PINK}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M40 60c34-10 88-10 122 1" fill="none" stroke={p.sheen} strokeWidth="4" />
          <path
            d="M44 88c16-24 40 6 58-14s34 4 50-8"
            fill="none"
            stroke={BLUE}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="152" cy="92" r="6" fill={BLUE} />
        </g>
      );
    case "cupcake":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M62 76h76l-10 50H72Z"
            fill={AMBER}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M82 80l-4 44M100 80v44M118 80l4 44" {...line} strokeWidth="2" opacity="0.5" />
          <path
            d="M56 78c0-34 88-34 88 0Z"
            fill={p.deep}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <circle cx="78" cy="58" r="3" fill={WHITE} />
          <circle cx="108" cy="48" r="2.5" fill={WHITE} />
          <circle cx="126" cy="62" r="3" fill={WHITE} />
          <path
            d="M100 18l6 13 14 2-10 10 3 14-13-7-13 7 3-14-10-10 14-2Z"
            fill={PINK}
            stroke={p.stroke}
            strokeWidth="2.4"
          />
        </g>
      );
    case "leaf":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect
            x="34"
            y="20"
            width="132"
            height="100"
            fill={p.neutral}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path
            d="M100 34c30 12 38 50 0 72-38-22-30-60 0-72Z"
            fill={AMBER}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M100 38v64M100 60l-16-8M100 76l16-10M100 90l-14-9" {...line} strokeWidth="2" />
          <path d="M44 26h20M136 114h20" fill="none" stroke={BLUE} strokeWidth="4" />
        </g>
      );
    case "pendant":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M78 30a22 22 0 0 1 44 0" fill="none" stroke={p.stroke} strokeWidth="3" />
          <path
            d="M100 34c22 26 40 34 0 84-40-50-22-58 0-84Z"
            fill={AMBER}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <circle cx="100" cy="80" r="12" fill={PINK} stroke={p.stroke} strokeWidth="2.4" />
          <path d="M100 52v14" {...line} strokeWidth="2" />
        </g>
      );
    case "magnet":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M48 40v42a52 52 0 0 0 104 0V40h-34v42a18 18 0 0 1-36 0V40Z"
            fill={p.neutral}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <rect
            x="46"
            y="22"
            width="38"
            height="20"
            fill={PINK}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <rect
            x="116"
            y="22"
            width="38"
            height="20"
            fill={BLUE}
            stroke={p.stroke}
            strokeWidth="3"
          />
        </g>
      );
    case "paper":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g transform="rotate(-5 100 70)">
            <rect
              x="36"
              y="18"
              width="128"
              height="104"
              fill={p.neutral}
              stroke={p.stroke}
              strokeWidth="3"
            />
            <path
              d="M36 18h128v40c-26-16-48 10-64-2s-38 6-64-6Z"
              fill={BLUE}
            />
            <path
              d="M36 58c26 12 48-10 64 2s38-14 64 2v34c-26-14-48 10-64-2s-38 8-64-4Z"
              fill={PINK}
            />
            <path
              d="M36 94c26 12 48-10 64 2s38-12 64 2v24H36Z"
              fill={BLUE}
            />
            <rect
              x="36"
              y="18"
              width="128"
              height="104"
              fill="none"
              stroke={p.stroke}
              strokeWidth="3"
            />
          </g>
        </g>
      );
    case "bottle":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="88" y="14" width="24" height="18" fill={AMBER} stroke={p.stroke} strokeWidth="3" />
          <path
            d="M92 32h16l14 22v68a6 6 0 0 1-6 6H84a6 6 0 0 1-6-6V54Z"
            fill={p.neutral}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M78 78h44v44a6 6 0 0 1-6 6H84a6 6 0 0 1-6-6Z" fill={BLUE} />
          <rect x="80" y="88" width="40" height="16" fill={PINK} />
        </g>
      );
    case "pouch":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M66 58h68l8 46a14 14 0 0 1-10 16 130 130 0 0 1-64 0 14 14 0 0 1-10-16Z"
            fill={BLUE}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M66 58c12-10 56-10 68 0" fill="none" stroke={p.stroke} strokeWidth="3" />
          <path d="M80 48c8-8 32-8 40 0" fill="none" stroke={p.stroke} strokeWidth="3" />
          <rect x="88" y="82" width="24" height="18" fill={PINK} stroke={p.stroke} strokeWidth="2.4" />
        </g>
      );
    case "artefact":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="46" y="98" width="108" height="22" fill={p.deep} stroke={p.stroke} strokeWidth="3" />
          <rect x="62" y="60" width="44" height="38" fill={PINK} stroke={p.stroke} strokeWidth="3" />
          <rect x="114" y="44" width="30" height="54" fill={BLUE} stroke={p.stroke} strokeWidth="3" />
          <circle cx="84" cy="42" r="16" fill={AMBER} stroke={p.stroke} strokeWidth="3" />
        </g>
      );
    case "sheet":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g transform="rotate(-4 100 70)">
            <rect
              x="48"
              y="16"
              width="104"
              height="108"
              fill={p.neutral}
              stroke={p.stroke}
              strokeWidth="3"
            />
            <path d="M62 48h76M62 68h76M62 88h50" fill="none" stroke={p.hairline} strokeWidth="3" />
            <circle cx="142" cy="104" r="7" fill={PINK} />
          </g>
        </g>
      );
    case "mould":
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M34 62h132v40a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10Z"
            fill={p.neutral}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M46 86h108v16a6 6 0 0 1-6 6H52a6 6 0 0 1-6-6Z" fill={PINK} />
          <path d="M100 24c0 18 14 22 14 32" fill="none" stroke={BLUE} strokeWidth="8" />
          <path d="M34 62h132" fill="none" stroke={p.stroke} strokeWidth="3" />
        </g>
      );
    default:
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M62 26h76l-12 26v62a8 8 0 0 1-8 8H82a8 8 0 0 1-8-8V52Z"
            fill={p.neutral}
            stroke={p.stroke}
            strokeWidth="3"
          />
          <path d="M74 74h52v40a8 8 0 0 1-8 8H82a8 8 0 0 1-8-8Z" fill={BLUE} />
          <circle cx="92" cy="92" r="6" fill={p.neutral} opacity="0.85" />
          <circle cx="110" cy="104" r="4" fill={p.neutral} opacity="0.85" />
          <path d="M136 46h12M136 60h12" fill="none" stroke={p.hairline} strokeWidth="3" />
        </g>
      );
  }
}

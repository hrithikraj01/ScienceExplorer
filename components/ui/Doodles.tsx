/** Rich colorful studio motifs — fill + stroke for the workbench look. */

type Props = { className?: string };

export function DoodleSwirl({ className }: Props) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden className={className}>
      <circle cx="40" cy="40" r="28" fill="#fce7f3" />
      <path
        d="M22 42c2-14 14-24 26-22 12 2 18 12 16 22-2 10-10 16-20 15-8-1-14-6-14-12 0-5 4-9 10-9"
        stroke="#c026d3"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="56" cy="24" r="4" fill="#ec4899" />
      <circle cx="28" cy="56" r="3" fill="#d4a017" opacity="0.8" />
    </svg>
  );
}

export function DoodleBubbles({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle cx="24" cy="38" r="12" fill="#e0e7ff" stroke="#312e81" strokeWidth="2" />
      <circle cx="42" cy="24" r="8" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
      <circle cx="48" cy="44" r="6" fill="#fef3c7" stroke="#d4a017" strokeWidth="2" />
      <circle cx="20" cy="18" r="3.5" className="bubble" fill="#ec4899" opacity="0.55" />
      <circle
        cx="52"
        cy="14"
        r="2.5"
        className="bubble"
        fill="#312e81"
        opacity="0.4"
        style={{ animationDelay: "0.4s" }}
      />
    </svg>
  );
}

export function DoodleMagnet({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M18 16h12v18a8 8 0 0 0 16 0V16h12v18a20 20 0 0 1-40 0V16Z"
        fill="#e0e7ff"
        stroke="#312e81"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="18" y="16" width="12" height="8" fill="#ef4444" rx="1" />
      <rect x="46" y="16" width="12" height="8" fill="#312e81" rx="1" />
      <path
        d="M14 10c5 3 7 8 7 12M50 8l4 4M54 8l-4 4"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="52" cy="6" r="2.5" fill="#fbbf24" />
    </svg>
  );
}

export function DoodleBeaker({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M24 10h16M28 10v12l-9 30a7 7 0 0 0 7 9h12a7 7 0 0 0 7-9l-9-30V10"
        fill="#eef2ff"
        stroke="#312e81"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        className="beaker-fill"
        d="M24 42h20l-3 12a5 5 0 0 1-5 4h-4a5 5 0 0 1-5-4l-3-12Z"
        fill="#ec4899"
        opacity="0.55"
      />
      <circle cx="30" cy="48" r="2" className="bubble" fill="white" opacity="0.7" />
      <circle
        cx="38"
        cy="45"
        r="1.5"
        className="bubble"
        fill="white"
        opacity="0.55"
        style={{ animationDelay: "0.35s" }}
      />
    </svg>
  );
}

/** Playful atom / molecule for lab borders and corner accents */
export function DoodleAtom({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <ellipse
        cx="32"
        cy="32"
        rx="22"
        ry="10"
        stroke="#1e1b4b"
        strokeWidth="2"
        transform="rotate(-35 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="22"
        ry="10"
        stroke="#ec4899"
        strokeWidth="2"
        transform="rotate(35 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="10"
        ry="22"
        stroke="#312e81"
        strokeWidth="2"
        opacity="0.85"
      />
      <circle cx="32" cy="32" r="5" fill="#fef3c7" stroke="#d4a017" strokeWidth="1.8" />
      <circle cx="48" cy="22" r="3.2" fill="#ec4899" />
      <circle cx="18" cy="40" r="2.6" fill="#312e81" />
    </svg>
  );
}

export function DoodleStar({ className }: Props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path
        d="M20 3l4 12L36 18l-12 3.5L20 34l-4-12.5L4 18l12-3L20 3Z"
        fill="#fef3c7"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleCupcake({ className }: Props) {
  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden className={className}>
      <path d="M22 40h28l-4 22H26L22 40Z" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
      <path
        d="M18 40c0-10 8-18 18-18s18 8 18 18"
        fill="#e0e7ff"
        stroke="#312e81"
        strokeWidth="2"
      />
      <circle cx="28" cy="28" r="2" fill="#ec4899" />
      <circle cx="38" cy="24" r="2" fill="#d4a017" />
      <circle cx="46" cy="30" r="2" fill="#312e81" />
      <path d="M36 12v6M33 14l6 2M39 14l-6 2" stroke="#d4a017" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleSoap({ className }: Props) {
  return (
    <svg viewBox="0 0 72 48" fill="none" aria-hidden className={className}>
      <rect
        x="8"
        y="12"
        width="56"
        height="28"
        rx="10"
        fill="#fce7f3"
        stroke="#c026d3"
        strokeWidth="2.5"
      />
      <path
        d="M16 26c8-8 16 4 24-2s12-6 18 2"
        stroke="#ec4899"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="52" cy="18" r="3" fill="white" opacity="0.7" />
    </svg>
  );
}

/** Round fridge-magnet button with polar faces */
export function DoodleButtonMagnet({ className }: Props) {
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden className={className}>
      <circle cx="28" cy="28" r="22" fill="#fce7f3" stroke="#db2777" strokeWidth="2.5" />
      <circle cx="28" cy="28" r="14" fill="#fff7ed" stroke="#d4a017" strokeWidth="2" />
      <path
        d="M20 28h16M28 20v16"
        stroke="#312e81"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="38" cy="16" r="3" fill="#ec4899" />
      <circle cx="16" cy="38" r="2.5" fill="#312e81" opacity="0.7" />
    </svg>
  );
}

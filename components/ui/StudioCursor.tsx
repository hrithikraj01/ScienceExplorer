"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

type CursorTone = "light" | "dark" | "mid";

type Rgba = { r: number; g: number; b: number; a: number };

function parseCssColor(value: string): Rgba | null {
  const v = value.trim().toLowerCase();
  if (!v || v === "transparent") return null;

  const rgba = v.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/,
  );
  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: rgba[4] === undefined ? 1 : Number(rgba[4]),
    };
  }

  // Modern "rgb(r g b / a)" syntax
  const modern = v.match(
    /^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/,
  );
  if (modern) {
    const alphaRaw = modern[4];
    let a = 1;
    if (alphaRaw !== undefined) {
      a = alphaRaw.endsWith("%")
        ? Number(alphaRaw.slice(0, -1)) / 100
        : Number(alphaRaw);
    }
    return {
      r: Number(modern[1]),
      g: Number(modern[2]),
      b: Number(modern[3]),
      a,
    };
  }

  return null;
}

function relativeLuminance({ r, g, b }: Rgba) {
  const toLinear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  );
}

function toneFromLuminance(luma: number): CursorTone {
  if (luma < 0.28) return "dark";
  if (luma > 0.72) return "light";
  return "mid";
}

function sampleToneAt(x: number, y: number): CursorTone {
  const stack = document.elementsFromPoint(x, y) as HTMLElement[];

  for (const el of stack) {
    if (el.dataset.studioCursor === "root") continue;
    if (el.closest("footer, [data-cursor-surface='dark']")) return "dark";
    if (el.closest("[data-cursor-surface='light']")) return "light";
    if (el.closest("[data-cursor-surface='mid']")) return "mid";

    // Photos / video planes rarely expose a usable CSS background — keep a haloed mid tone.
    if (
      el.matches("img, video, canvas") ||
      el.closest("[data-cursor-surface='media'], .photo-well, .polaroid")
    ) {
      return "mid";
    }

    let node: HTMLElement | null = el;
    while (node && node !== document.documentElement) {
      const style = getComputedStyle(node);
      const bg = parseCssColor(style.backgroundColor);
      if (bg && bg.a >= 0.82) {
        return toneFromLuminance(relativeLuminance(bg));
      }
      node = node.parentElement;
    }
  }

  // Fallback to body / paper canvas
  const bodyBg = parseCssColor(getComputedStyle(document.body).backgroundColor);
  if (bodyBg && bodyBg.a > 0.5) {
    return toneFromLuminance(relativeLuminance(bodyBg));
  }
  return "light";
}

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[tabindex]:not([tabindex='-1'])",
  ".lab-project",
  ".sticky-note",
  ".polaroid",
  ".creation-card",
  ".module-card",
  ".trail-step",
  ".tactile-press",
].join(", ");

/**
 * Global desktop magnifying-glass cursor.
 * Hides the system cursor and adapts stroke/fill contrast to the surface below.
 */
export function StudioCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);
  const [tone, setTone] = useState<CursorTone>("light");

  const rootRef = useRef<HTMLDivElement>(null);
  const toneSampleAt = useRef(0);
  const lastTone = useRef<CursorTone>("light");

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("studio-cursor");
      return;
    }
    document.body.classList.add("studio-cursor");

    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
      const node = rootRef.current;
      if (node) {
        node.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      }
      setVisible(true);

      const target = event.target as HTMLElement | null;
      setHot(Boolean(target?.closest(INTERACTIVE_SELECTOR)));

      const now = performance.now();
      if (now - toneSampleAt.current > 48) {
        toneSampleAt.current = now;
        const next = sampleToneAt(x, y);
        if (next !== lastTone.current) {
          lastTone.current = next;
          setTone(next);
        }
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.body.classList.remove("studio-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const stroke =
    tone === "dark" ? "#FFFFFF" : tone === "mid" ? "#1E293B" : "#1E293B";
  const fill =
    tone === "dark" ? "rgba(255,255,255,0.12)" : "rgba(30,41,59,0.08)";
  const accent = tone === "dark" ? "#F472B6" : "#BE185D";
  const halo = tone === "dark" ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.95)";

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-studio-cursor="root"
      className={cn(
        "studio-cursor-layer pointer-events-none fixed left-0 top-0 z-[200]",
        !visible && "opacity-0",
      )}
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className={cn(
          "studio-cursor-glyph drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)] transition-transform duration-150",
          hot ? "scale-125" : "scale-100",
        )}
      >
        {/* Halo / outer stroke for mid-tone & gradient boundaries */}
        <circle
          cx="16"
          cy="16"
          r="9.2"
          stroke={halo}
          strokeWidth="4.2"
          fill="none"
        />
        <path
          d="M22.8 22.8L33 33"
          stroke={halo}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Lens */}
        <circle
          cx="16"
          cy="16"
          r="8"
          fill={fill}
          stroke={stroke}
          strokeWidth="2.4"
        />
        <path
          d="M12.2 13.2c1.1-1.6 3.2-2.4 5.1-1.7"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Handle */}
        <path
          d="M22.5 22.5L32.2 32.2"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M22.5 22.5L32.2 32.2"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

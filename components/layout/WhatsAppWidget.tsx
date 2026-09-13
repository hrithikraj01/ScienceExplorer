import { buildWhatsAppHref } from "@/lib/booking";

const DEFAULT_MESSAGE =
  "Hi Auntie Jonn! I have a question about workshops at Science Explorers.";

export function WhatsAppWidget() {
  const href = buildWhatsAppHref(DEFAULT_MESSAGE);

  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Questions? Chat with Auntie Jonn on WhatsApp"
        className="whatsapp-fab group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.85)] outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 [@media(hover:hover)]:hover:scale-105"
        data-cursor-surface="mid"
      >
        <span className="whatsapp-fab__pulse" aria-hidden />
        <WhatsAppGlyph className="relative z-[1] h-7 w-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Questions? Chat with Auntie Jonn
        </span>
      </a>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.43-9.91 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.91C21.94 6.43 17.5 2 12.04 2zm5.79 14.08c-.24.68-1.4 1.25-1.94 1.33-.5.08-1.13.11-1.82-.11-.42-.14-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.26.53-.33.71-.33h.51c.16 0 .38-.06.59.45.22.53.74 1.83.8 1.96.07.13.11.29.02.47-.09.19-.14.31-.27.47-.14.16-.29.35-.41.47-.14.13-.28.27-.12.53.16.26.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.28.13.44.11.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.1 1.66.78 1.95.93.28.14.47.21.54.33.07.12.07.7-.17 1.38z" />
    </svg>
  );
}

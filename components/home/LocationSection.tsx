import { Reveal } from "@/components/ui/Reveal";
import { SectionPill } from "@/components/ui/SectionPill";
import { studio } from "@/content/studio";

export function LocationSection() {
  return (
    <section
      id="find-the-studio"
      className="relative overflow-hidden grain bg-[#FDFBF9] py-8 md:py-12"
    >
      <div className="shell">
        <Reveal className="mx-auto max-w-6xl">
          <SectionPill tone="visit">{studio.badge}</SectionPill>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {studio.headline}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-indigo/10 shadow-sm md:aspect-square">
              <iframe
                title={`${studio.name} map`}
                src={studio.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              <span className="stamp-tag absolute top-3 left-3 z-[1] bg-paper-bright/95 shadow-sm">
                At the studio
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="torn-card p-5 sm:p-6">
                <p className="stamp-tag w-fit">Address</p>
                <address className="mt-3 not-italic leading-relaxed text-ink">
                  {studio.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={studio.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-press mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(49,46,129,0.65)] transition-transform [@media(hover:hover)]:hover:scale-[1.02]"
                >
                  Open in Google Maps
                </a>
              </div>

              <TransitCard
                eyebrow="By MRT"
                title={`${studio.mrt.station} · ${studio.mrt.lineCode}`}
              >
                <span className="inline-flex items-center rounded-md border border-indigo/25 bg-indigo/10 px-2 py-0.5 text-xs font-bold tracking-wide text-indigo uppercase">
                  {studio.mrt.lineName}
                </span>
                <p className="mt-2 text-ink-soft">
                  {studio.mrt.walk} ({studio.mrt.exit}).
                </p>
              </TransitCard>

              <TransitCard eyebrow="By bus" title={`Stop ${studio.bus.stopId}`}>
                <p className="text-ink-soft">{studio.bus.stopName}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {studio.bus.routes.map((route) => (
                    <span
                      key={route}
                      className="inline-flex min-w-9 items-center justify-center rounded-full bg-mustard-soft px-2.5 py-1 text-xs font-bold text-mustard-deep"
                    >
                      {route}
                    </span>
                  ))}
                </div>
              </TransitCard>

              <TransitCard eyebrow="By car" title="Parking & drop-off">
                <p className="text-ink-soft">{studio.car.parking}</p>
                <p className="mt-2 text-ink-soft">{studio.car.dropoff}</p>
              </TransitCard>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TransitCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-bright/80 p-5 shadow-sm">
      <p className="text-xs font-bold tracking-[0.12em] text-magenta uppercase">
        {eyebrow}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

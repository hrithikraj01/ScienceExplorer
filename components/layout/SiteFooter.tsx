import Image from "next/image";
import Link from "next/link";
import { bookNow, nav, site } from "@/lib/site";

export function SiteFooter() {
  const uen = site.legal.uen;

  return (
    <footer
      data-cursor-surface="dark"
      className="mt-auto border-t-2 border-pink/25 bg-ink text-white"
    >
      <div className="shell grid gap-8 py-8 sm:grid-cols-2 md:py-10 lg:grid-cols-3">
        <div>
          <Link
            href="/#hero"
            className="inline-flex items-center gap-3"
            aria-label={`${site.name} home`}
          >
            <Image
              src="/media/logo.png"
              alt="Science Explorers Logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-display text-lg font-semibold">
              {site.name}
            </span>
          </Link>
          <p className="mt-2 font-hand text-xl text-pink/90">
            Make · Discover · Belong
          </p>
          <p className="mt-2 text-sm text-white/70">
            {site.place}. Hands-on science, making and discovery.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm font-medium text-white/85 hover:text-white"
          >
            {site.email}
          </a>

          <div className="mt-5">
            <p className="text-xs font-semibold tracking-wide text-white/45 uppercase">
              Local payments
            </p>
            <ul
              className="mt-2 flex flex-wrap items-center gap-2"
              aria-label="Accepted payments"
            >
              <li>
                <PayNowBadge />
              </li>
              <li>
                <PayLahBadge />
              </li>
              <li>
                <VisaBadge />
              </li>
              <li>
                <MastercardBadge />
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <Link
              href={bookNow.href}
              className="inline-flex rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-deep"
            >
              {bookNow.label}
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white/50">Explore</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm" aria-label="Footer">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#find-the-studio"
              className="text-white/80 hover:text-white"
            >
              Find the studio
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold text-white/50">Connect</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a
                href={site.social.whatsapp}
                className="text-white/80 hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                className="text-white/80 hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                className="text-white/80 hover:text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                Facebook
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-white/45">
            Social enterprise · community partner placements (NLB and others) to
            be confirmed.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-4 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legal.entityName}. All rights
            reserved.
          </p>
          <p>
            {site.legal.entityName} | UEN: {uen}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:rounded focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
  );
}

function PayNowBadge() {
  return (
    <span
      className="inline-flex h-8 items-center rounded-md border border-white/15 bg-white px-2.5 text-[0.65rem] font-extrabold tracking-wide text-[#7B2D8E]"
      title="PayNow"
    >
      PayNow
    </span>
  );
}

function PayLahBadge() {
  return (
    <span
      className="inline-flex h-8 items-center rounded-md border border-white/15 bg-[#EE2E24] px-2.5 text-[0.65rem] font-extrabold tracking-wide text-white"
      title="PayLah!"
    >
      PayLah!
    </span>
  );
}

function VisaBadge() {
  return (
    <span
      className="inline-flex h-8 items-center rounded-md border border-white/15 bg-[#1A1F71] px-2.5 text-[0.7rem] font-extrabold tracking-[0.14em] text-white"
      title="Visa"
    >
      VISA
    </span>
  );
}

function MastercardBadge() {
  return (
    <span
      className="inline-flex h-8 items-center gap-0.5 rounded-md border border-white/15 bg-[#111] px-2"
      title="Mastercard"
      aria-label="Mastercard"
    >
      <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
      <span className="-ml-2 h-3.5 w-3.5 rounded-full bg-[#F79E1B]/60" />
    </span>
  );
}

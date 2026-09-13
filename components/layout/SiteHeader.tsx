"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBooking } from "@/components/booking/BookingProvider";
import { bookNow, nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

function isHashActive(pathname: string, href: string, hash: string) {
  if (!href.includes("#")) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (pathname !== "/") return false;
  const target = href.split("#")[1] ?? "";
  return hash === `#${target}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [pastHero, setPastHero] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");

    const syncElevated = () => {
      if (!hero || pathname !== "/") {
        setPastHero(window.scrollY > 12);
        return;
      }
      const headerOffset = 72;
      setPastHero(hero.getBoundingClientRect().bottom <= headerOffset);
    };

    syncElevated();
    window.addEventListener("scroll", syncElevated, { passive: true });
    window.addEventListener("resize", syncElevated);
    return () => {
      window.removeEventListener("scroll", syncElevated);
      window.removeEventListener("resize", syncElevated);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
        pastHero
          ? "border-[#E5E0D8] bg-[#F9F6F0]/90 shadow-[0_4px_18px_rgba(28,25,23,0.08)] backdrop-blur-md"
          : "border-[#E5E0D8]/70 bg-[#F9F6F0]/95 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm",
      )}
    >
      <div className="shell flex items-center justify-between gap-4 py-2.5 md:py-3">
        <Link
          href="/#hero"
          className="tactile-press relative flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/media/logo.png"
            alt=""
            width={96}
            height={96}
            priority
            className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo/15 sm:h-11 sm:w-11 md:h-12 md:w-12"
          />
          <span className="font-brand text-base font-bold tracking-tight text-[#1E3A8A] sm:text-lg [text-shadow:0_1px_0_rgba(30,58,138,0.22),0_2px_10px_rgba(37,99,235,0.22)]">
            {site.name}
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-1 md:flex md:gap-2 lg:gap-3">
          <nav className="flex items-center gap-0.5 lg:gap-1" aria-label="Primary">
            {nav.map((item) => {
              const active = isHashActive(pathname, item.href, hash);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "nav-link tactile-press relative rounded-full px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-[color,background-color,transform] duration-200 lg:px-3.5",
                    active
                      ? "bg-sky-100 text-indigo"
                      : "text-indigo [@media(hover:hover)]:hover:bg-pink-100 [@media(hover:hover)]:hover:text-pink-deep",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "nav-link-underline pointer-events-none absolute inset-x-3 -bottom-0.5 h-[3px]",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => openBooking()}
            className="tactile-press inline-flex min-h-10 touch-manipulation items-center rounded-xl bg-indigo px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(49,46,129,0.55)] transition-colors [@media(hover:hover)]:hover:bg-blue-deep"
          >
            {bookNow.label}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => openBooking()}
            className="tactile-press inline-flex min-h-10 touch-manipulation items-center rounded-xl bg-indigo px-3.5 py-2 text-sm font-semibold text-white"
          >
            {bookNow.label}
          </button>
          <button
            type="button"
            className="tactile-press rounded-xl border border-line bg-paper-bright px-3 py-2 text-sm font-semibold text-ink"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col border-l border-line bg-paper-bright shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Image
              src="/media/logo.png"
              alt={site.name}
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold"
            >
              Close
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 px-3 py-4"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full px-3 py-3 text-sm font-semibold tracking-wide uppercase",
                  isHashActive(pathname, item.href, hash)
                    ? "bg-sky-100 font-semibold text-indigo"
                    : "text-ink [@media(hover:hover)]:hover:bg-pink-100",
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo px-4 text-sm font-semibold text-white"
            >
              {bookNow.label}
            </button>
          </nav>

          <div className="border-t border-line px-5 py-5">
            <p className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
              Quick contact
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-indigo"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

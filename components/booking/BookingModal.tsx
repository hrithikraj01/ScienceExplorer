"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Experience, Session } from "@/content/types";
import {
  bookingWhatsAppMessage,
  buildGoogleCalendarUrl,
  buildIcsDataUri,
  buildWhatsAppHref,
  formatSgd,
  inquiryWhatsAppMessage,
  makeBookingReference,
  parsePriceSgd,
  type ParticipantDetails,
  type PaymentMethod,
} from "@/lib/booking";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type Step = "summary" | "details" | "payment" | "confirm";

const STEPS: Step[] = ["summary", "details", "payment", "confirm"];
const STEP_LABELS: Record<Step, string> = {
  summary: "Session",
  details: "Details",
  payment: "Payment",
  confirm: "Done",
};

type Props = {
  open: boolean;
  onClose: () => void;
  catalogue: Experience[];
  experience: Experience | null;
  session: Session | null;
  onSelectExperience: (experience: Experience, session?: Session) => void;
  intent: "book" | "inquiry";
  inquiryLabel?: string;
};

export function BookingModal({
  open,
  onClose,
  catalogue,
  experience,
  session,
  onSelectExperience,
  intent,
  inquiryLabel,
}: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("summary");
  const [details, setDetails] = useState<ParticipantDetails>({
    participants: 1,
    guardianName: "",
    email: "",
    phone: "",
    notes: inquiryLabel ? `1:1 request · ${inquiryLabel}` : "",
  });
  const [payment, setPayment] = useState<PaymentMethod>(
    intent === "inquiry" ? "whatsapp" : "paynow",
  );
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState<string | null>(null);

  const bookable = useMemo(
    () =>
      catalogue.filter((item) =>
        item.sessions.some(
          (s) => s.availability === "open" || s.availability === "limited",
        ),
      ),
    [catalogue],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const unitPrice = experience ? parsePriceSgd(experience) : null;
  const total =
    unitPrice !== null ? unitPrice * details.participants : null;
  const googleCal =
    experience && session
      ? buildGoogleCalendarUrl({ experience, session })
      : null;
  const ics =
    experience && session ? buildIcsDataUri({ experience, session }) : null;

  function validateDetails() {
    if (!details.guardianName.trim()) return "Please add a contact name.";
    if (!details.email.trim() || !details.email.includes("@")) {
      return "Please add a valid email.";
    }
    if (!details.phone.trim()) return "Please add a phone number.";
    if (details.participants < 1) return "Add at least one participant.";
    return null;
  }

  async function finishPayment() {
    setSubmitting(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setReference(makeBookingReference());
    setSubmitting(false);
    setStep("confirm");
  }

  function goNext() {
    if (step === "summary") {
      if (!experience || !session) {
        setError("Select a workshop with an open session.");
        return;
      }
      setError(null);
      setStep("details");
      return;
    }

    if (step === "details") {
      if (intent === "inquiry") {
        window.open(
          buildWhatsAppHref(
            inquiryWhatsAppMessage(inquiryLabel ?? "1:1 tailored session"),
          ),
          "_blank",
          "noopener,noreferrer",
        );
        setReference(makeBookingReference());
        setStep("confirm");
        return;
      }
      const problem = validateDetails();
      if (problem) {
        setError(problem);
        return;
      }
      setError(null);
      setStep("payment");
      return;
    }

    if (step === "payment") {
      if (payment === "whatsapp" && experience && session) {
        const ref = makeBookingReference();
        window.open(
          buildWhatsAppHref(
            bookingWhatsAppMessage({ experience, session }, details, ref),
          ),
          "_blank",
          "noopener,noreferrer",
        );
      }
      void finishPayment();
    }
  }

  function goBack() {
    if (step === "summary") onClose();
    else if (step === "details") setStep("summary");
    else if (step === "payment") setStep("details");
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close booking"
        className="absolute inset-0 bg-ink/45"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl outline-none sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue">
              {intent === "inquiry" ? "Request a session" : "Book a workshop"}
            </p>
            <h2 id={titleId} className="mt-1 text-lg font-semibold text-ink">
              {experience?.title ?? "Choose a session"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-ink-soft"
          >
            Close
          </button>
        </header>

        <ol className="flex gap-1 border-b border-line px-5 py-3">
          {STEPS.map((item, index) => {
            const activeIndex = STEPS.indexOf(step);
            const done = index < activeIndex;
            const active = item === step;
            return (
              <li key={item} className="flex-1">
                <div
                  className={cn(
                    "h-1 rounded-full",
                    done || active ? "bg-blue" : "bg-line",
                  )}
                />
                <p
                  className={cn(
                    "mt-1.5 text-[0.65rem] font-semibold uppercase tracking-wide",
                    active ? "text-blue" : "text-ink-soft",
                  )}
                >
                  {STEP_LABELS[item]}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "summary" ? (
            !experience ? (
              <div className="space-y-3">
                <p className="text-sm text-ink-soft">
                  Pick a workshop to continue.
                </p>
                <ul className="space-y-2">
                  {bookable.map((item) => {
                    const next = item.sessions.find(
                      (s) =>
                        s.availability === "open" ||
                        s.availability === "limited",
                    );
                    if (!next) return null;
                    return (
                      <li key={item.slug}>
                        <button
                          type="button"
                          onClick={() => onSelectExperience(item, next)}
                          className="w-full rounded-xl border border-line px-4 py-3 text-left transition-colors [@media(hover:hover)]:hover:border-blue"
                        >
                          <p className="font-semibold text-ink">{item.title}</p>
                          <p className="mt-1 text-sm text-ink-soft">
                            {next.dateLabel}
                            {next.timeLabel ? ` · ${next.timeLabel}` : ""} ·{" "}
                            {item.priceLabel}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : session ? (
              <dl className="grid grid-cols-2 gap-3">
                <Meta label="Workshop" value={experience.title} wide />
                <Meta
                  label="Date / time"
                  value={`${session.dateLabel}${session.timeLabel ? ` · ${session.timeLabel}` : ""}`}
                />
                <Meta label="Age group" value={experience.ageLabel} />
                <Meta label="Price" value={experience.priceLabel} />
                <Meta label="Duration" value={experience.durationLabel} />
                <Meta
                  label="Location"
                  value={session.location || experience.locationLabel}
                  wide
                />
              </dl>
            ) : (
              <p className="text-sm text-ink-soft">
                No open session on this workshop yet.
              </p>
            )
          ) : null}

          {step === "details" ? (
            <div className="space-y-4">
              {intent === "inquiry" ? (
                <p className="rounded-xl bg-blue-soft px-4 py-3 text-sm text-ink">
                  Request a 1:1 tailored session
                  {inquiryLabel ? ` for ${inquiryLabel}` : ""}. We&apos;ll confirm
                  times over WhatsApp or email.
                </p>
              ) : null}
              <Field label="Number of participants">
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={details.participants}
                  onChange={(e) =>
                    setDetails((d) => ({
                      ...d,
                      participants: Number(e.target.value) || 1,
                    }))
                  }
                  className="field"
                />
              </Field>
              <Field label="Parent / guardian name">
                <input
                  type="text"
                  autoComplete="name"
                  value={details.guardianName}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, guardianName: e.target.value }))
                  }
                  className="field"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, email: e.target.value }))
                  }
                  className="field"
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  type="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, phone: e.target.value }))
                  }
                  className="field"
                />
              </Field>
              <Field label="Accessibility or interest notes">
                <textarea
                  rows={3}
                  value={details.notes}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, notes: e.target.value }))
                  }
                  className="field resize-y"
                />
              </Field>
              {total !== null ? (
                <p className="text-sm font-semibold text-ink">
                  Estimated total:{" "}
                  <span className="text-blue">{formatSgd(total)}</span>
                </p>
              ) : null}
            </div>
          ) : null}

          {step === "payment" ? (
            <div className="space-y-4">
              <p className="text-sm text-ink-soft">
                Choose how you&apos;d like to confirm. Live payment rails can be
                swapped via site config without changing this layout.
              </p>
              <div className="space-y-2">
                {(
                  [
                    {
                      id: "paynow" as const,
                      title: "PayNow QR",
                      text: "Scan with your banking app (Singapore).",
                    },
                    {
                      id: "card" as const,
                      title: "Credit / debit card",
                      text: "Secure card checkout (processor TBA).",
                    },
                    {
                      id: "whatsapp" as const,
                      title: "Confirm on WhatsApp",
                      text: "Skip payment UI — confirm details with us directly.",
                    },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border px-4 py-3",
                      payment === option.id
                        ? "border-blue bg-blue-soft"
                        : "border-line",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="mt-1"
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                    />
                    <span>
                      <span className="block font-semibold text-ink">
                        {option.title}
                      </span>
                      <span className="text-sm text-ink-soft">{option.text}</span>
                    </span>
                  </label>
                ))}
              </div>

              {payment === "paynow" ? (
                <PayNowPanel total={total} />
              ) : null}

              {payment === "card" ? (
                <div className="space-y-3 rounded-xl border border-line p-4">
                  <Field label="Name on card">
                    <input className="field" placeholder="As printed on card" />
                  </Field>
                  <Field label="Card number">
                    <input className="field" placeholder="•••• •••• •••• ••••" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry">
                      <input className="field" placeholder="MM/YY" />
                    </Field>
                    <Field label="CVC">
                      <input className="field" placeholder="123" />
                    </Field>
                  </div>
                  <p className="text-xs text-ink-soft">
                    Card fields are UI-only until a processor is connected.
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === "confirm" ? (
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold text-pink">
                You&apos;re booked in
              </p>
              <h3 className="text-2xl font-semibold text-ink">
                Reference {reference}
              </h3>
              {experience && session ? (
                <p className="text-ink-soft">
                  {experience.title}
                  <br />
                  {session.dateLabel}
                  {session.timeLabel ? ` · ${session.timeLabel}` : ""}
                  <br />
                  {details.participants} participant
                  {details.participants === 1 ? "" : "s"}
                  {total !== null ? ` · ${formatSgd(total)}` : ""}
                </p>
              ) : null}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                {googleCal ? (
                  <Button href={googleCal} variant="secondary">
                    Add to Google Calendar
                  </Button>
                ) : null}
                {ics ? (
                  <a
                    href={ics}
                    download={`${experience?.slug ?? "workshop"}.ics`}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-5 text-sm font-semibold text-ink"
                  >
                    Download iCal
                  </a>
                ) : null}
              </div>
              {experience && session ? (
                <Button
                  href={buildWhatsAppHref(
                    bookingWhatsAppMessage(
                      { experience, session },
                      details,
                      reference,
                    ),
                  )}
                  variant="pink"
                >
                  Send WhatsApp confirmation
                </Button>
              ) : (
                <Button
                  href={buildWhatsAppHref(
                    inquiryWhatsAppMessage(
                      inquiryLabel ?? "Special request",
                    ),
                  )}
                  variant="pink"
                >
                  Continue on WhatsApp
                </Button>
              )}
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 text-sm font-medium text-pink">{error}</p>
          ) : null}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
          {step === "confirm" ? (
            <Button onClick={onClose} className="w-full sm:w-auto">
              Done
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={goBack}>
                {step === "summary" ? "Cancel" : "Back"}
              </Button>
              <Button
                disabled={submitting || (step === "summary" && !experience)}
                onClick={goNext}
              >
                {submitting
                  ? "Confirming…"
                  : step === "payment"
                    ? payment === "whatsapp"
                      ? "Confirm via WhatsApp"
                      : "Confirm booking"
                    : intent === "inquiry" && step === "details"
                      ? "Send request"
                      : "Continue"}
              </Button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

function PayNowPanel({ total }: { total: number | null }) {
  const [qrFailed, setQrFailed] = useState(false);

  return (
    <div className="rounded-xl border border-line bg-paper p-4 text-center">
      <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-lg bg-white p-2">
        {!qrFailed ? (
          <Image
            src={site.paynow.qrUrl}
            alt={`PayNow QR for ${site.paynow.displayName}`}
            fill
            sizes="160px"
            className="object-contain p-2"
            onError={() => setQrFailed(true)}
            unoptimized
          />
        ) : (
          <div
            aria-hidden
            className="grid h-full w-full grid-cols-5 grid-rows-5 gap-1 p-2"
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "rounded-[2px]",
                  [
                    0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24,
                  ].includes(index)
                    ? "bg-ink"
                    : "bg-line",
                )}
              />
            ))}
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">
        PayNow · {site.paynow.displayName}
      </p>
      <p className="text-xs text-ink-soft">UEN/Proxy: {site.paynow.proxyLabel}</p>
      {qrFailed ? (
        <p className="mt-2 text-xs text-ink-soft">
          Drop the studio PayNow QR at{" "}
          <code className="rounded bg-paper-deep px-1">public/media/paynow-qr.png</code>
        </p>
      ) : null}
      {total !== null ? (
        <p className="mt-2 text-base font-semibold text-blue">{formatSgd(total)}</p>
      ) : null}
    </div>
  );
}

function Meta({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={cn("rounded-xl bg-paper px-3 py-2.5", wide && "col-span-2")}>
      <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

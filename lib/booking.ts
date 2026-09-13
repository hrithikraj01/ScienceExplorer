import type { Experience, Session } from "@/content/types";
import { site } from "@/lib/site";

export type BookingTarget = {
  experience: Experience;
  session: Session;
};

export type ParticipantDetails = {
  participants: number;
  guardianName: string;
  email: string;
  phone: string;
  notes: string;
};

export type PaymentMethod = "paynow" | "card" | "whatsapp";

export function parsePriceSgd(experience: Experience): number | null {
  if (typeof experience.priceSgd === "number") return experience.priceSgd;
  const match = experience.priceLabel.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function formatSgd(amount: number): string {
  return `S$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

export function sessionStartDate(session: Session): Date | null {
  if (!session.startsAt) return null;
  const time = session.timeLabel ?? "10:00";
  const date = new Date(`${session.startsAt}T${time}:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function toCalStamp(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

export function buildGoogleCalendarUrl(target: BookingTarget): string | null {
  const start = sessionStartDate(target.session);
  if (!start) return null;
  const end = new Date(
    start.getTime() + target.session.durationMinutes * 60_000,
  );
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${target.experience.title} · ${site.name}`,
    dates: `${toCalStamp(start)}/${toCalStamp(end)}`,
    details: `${target.experience.summary}\n\nBooked via ${site.url}`,
    location: target.session.location || target.experience.locationLabel,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsDataUri(target: BookingTarget): string | null {
  const start = sessionStartDate(target.session);
  if (!start) return null;
  const end = new Date(
    start.getTime() + target.session.durationMinutes * 60_000,
  );
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Science Explorers//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${target.session.id}@scienceexplorers.sg`,
    `DTSTAMP:${toCalStamp(new Date())}`,
    `DTSTART:${toCalStamp(start)}`,
    `DTEND:${toCalStamp(end)}`,
    `SUMMARY:${target.experience.title}`,
    `DESCRIPTION:${target.experience.summary.replace(/\n/g, "\\n")}`,
    `LOCATION:${target.session.location || target.experience.locationLabel}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function buildWhatsAppHref(message: string): string {
  const base = site.social.whatsapp.replace(/\?.*$/, "").replace(/\/$/, "");
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function bookingWhatsAppMessage(
  target: BookingTarget,
  details: ParticipantDetails,
  reference: string,
): string {
  const unit = parsePriceSgd(target.experience);
  const total =
    unit !== null
      ? formatSgd(unit * details.participants)
      : target.experience.priceLabel;
  return [
    `Hi Science Explorers — booking confirmation ${reference}`,
    "",
    `Workshop: ${target.experience.title}`,
    `Session: ${target.session.dateLabel}${target.session.timeLabel ? ` · ${target.session.timeLabel}` : ""}`,
    `Age group: ${target.experience.ageLabel}`,
    `Participants: ${details.participants}`,
    `Total: ${total}`,
    `Name: ${details.guardianName}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    details.notes ? `Notes: ${details.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function inquiryWhatsAppMessage(audienceLabel: string): string {
  return [
    `Hi Science Explorers — I'd like to request a 1:1 tailored session.`,
    `Audience: ${audienceLabel}`,
    `Please share available times and pricing.`,
  ].join("\n");
}

export function makeBookingReference(): string {
  return `SE-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

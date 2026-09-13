"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BookingModal } from "@/components/booking/BookingModal";
import type { Experience, Session } from "@/content/types";

export type OpenBookingOptions = {
  experience?: Experience;
  session?: Session;
  intent?: "book" | "inquiry";
  inquiryLabel?: string;
};

type BookingContextValue = {
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  children,
  catalogue,
}: {
  children: ReactNode;
  catalogue: Experience[];
}) {
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState(0);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [intent, setIntent] = useState<"book" | "inquiry">("book");
  const [inquiryLabel, setInquiryLabel] = useState<string | undefined>();

  const closeBooking = useCallback(() => setOpen(false), []);

  const openBooking = useCallback((options: OpenBookingOptions = {}) => {
    const nextExperience = options.experience ?? null;
    const nextSession =
      options.session ??
      nextExperience?.sessions.find(
        (s) => s.availability === "open" || s.availability === "limited",
      ) ??
      nextExperience?.sessions[0] ??
      null;
    setExperience(nextExperience);
    setSession(nextSession);
    setIntent(options.intent ?? "book");
    setInquiryLabel(options.inquiryLabel);
    setOpenKey((value) => value + 1);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openBooking, closeBooking }),
    [openBooking, closeBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal
        key={openKey}
        open={open}
        onClose={closeBooking}
        catalogue={catalogue}
        experience={experience}
        session={session}
        onSelectExperience={(item, nextSession) => {
          setExperience(item);
          setSession(
            nextSession ??
              item.sessions.find(
                (s) => s.availability === "open" || s.availability === "limited",
              ) ??
              item.sessions[0] ??
              null,
          );
          setIntent("book");
        }}
        intent={intent}
        inquiryLabel={inquiryLabel}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import type { Experience, Session } from "@/content/types";

export function BookExperienceButton({
  experience,
  session,
  children = "Book now",
  variant = "primary",
  className,
}: {
  experience: Experience;
  session?: Session;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "pink" | "navy" | "ghost";
  className?: string;
}) {
  const { openBooking } = useBooking();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => openBooking({ experience, session })}
    >
      {children}
    </Button>
  );
}

"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import type { Experience, Session } from "@/content/types";

export function StickyBookBar({
  experience,
  session,
}: {
  experience: Experience;
  session?: Session;
}) {
  const { openBooking } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper p-3 lg:hidden">
      <Button
        className="min-h-12 w-full"
        onClick={() => openBooking({ experience, session })}
      >
        Book now
      </Button>
    </div>
  );
}

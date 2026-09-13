"use client";

import type { ReactNode } from "react";
import { BookingProvider } from "@/components/booking/BookingProvider";
import type { Experience } from "@/content/types";

export function AppProviders({
  children,
  catalogue,
}: {
  children: ReactNode;
  catalogue: Experience[];
}) {
  return <BookingProvider catalogue={catalogue}>{children}</BookingProvider>;
}

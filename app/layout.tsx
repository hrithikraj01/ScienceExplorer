import { Caveat, Figtree, Fraunces, Fredoka, Lora } from "next/font/google";
import type { Metadata } from "next";
import { AppProviders } from "@/components/booking/AppProviders";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter, SkipLink } from "@/components/layout/SiteFooter";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { StudioCursor } from "@/components/ui/StudioCursor";
import { JsonLd, organizationJsonLd } from "@/lib/jsonLd";
import { getExperiences } from "@/lib/experiences";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.place}`,
    template: `%s · ${site.name} ${site.place}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} ${site.place}`,
    description: site.description,
    locale: "en_SG",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const catalogue = getExperiences();

  return (
    <html
      lang="en-SG"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${figtree.variable} ${caveat.variable} ${fredoka.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <JsonLd data={organizationJsonLd()} />
        <AppProviders catalogue={catalogue}>
          <SkipLink />
          <SiteHeader />
          {children}
          <SiteFooter />
          <WhatsAppWidget />
          <StudioCursor />
        </AppProviders>
      </body>
    </html>
  );
}

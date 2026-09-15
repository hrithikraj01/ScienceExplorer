import { withBasePath } from "@/lib/basePath";

export const site = {
  name: "Science Explorers",
  place: "Singapore",
  tagline: "Hands-on science. Making. Discovery.",
  description:
    "Science Explorers creates hands-on science, making and creative experiences in Singapore for children, teens, adults, families and groups.",
  url: "https://www.xplorers.life",
  /**
   * CONTENT HOOK — SUPPORT_EMAIL
   * Live studio inbox for booking confirmations.
   */
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jonnansical@xplorers.life",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+6598235888",
  social: {
    /**
     * CONTENT HOOK — WHATSAPP_LINK
     * Full wa.me link used for booking confirmations + inquiry CTAs.
     * Live number from xplorers.life/shop (Chat with us).
     */
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/6598235888",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/science_xplorers/",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      "https://www.facebook.com/Sci.Xplorers.life",
  },
  /**
   * CONTENT HOOK — PAYNOW
   * Display name + UEN for PayNow transfers. Drop QR artwork at
   * /public/media/paynow-qr.png (or set NEXT_PUBLIC_PAYNOW_QR_URL).
   */
  paynow: {
    displayName:
      process.env.NEXT_PUBLIC_PAYNOW_NAME ?? "Science Explorers",
    proxyLabel:
      process.env.NEXT_PUBLIC_PAYNOW_PROXY ?? "UEN 53389785L",
    qrUrl: withBasePath(
      process.env.NEXT_PUBLIC_PAYNOW_QR_URL ?? "/media/paynow-qr.png",
    ),
  },
  /**
   * CONTENT HOOK — LEGAL_ENTITY
   * Registered name + UEN for footer trust signals / invoices.
   */
  legal: {
    entityName:
      process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Science Explorers Pte. Ltd.",
    uen: process.env.NEXT_PUBLIC_UEN ?? "53389785L",
  },
} as const;

export const nav = [
  { href: "/#explorers-trail", label: "Experiences" },
  { href: "/#about-auntie-jonn", label: "About Auntie Jonn" },
  { href: "/#community", label: "Community" },
  { href: "/#find-the-studio", label: "Visit Us" },
] as const;

export const bookNow = {
  href: "/#schedule-book",
  label: "Book now",
} as const;

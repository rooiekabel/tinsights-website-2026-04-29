import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Gratis Adviesgesprek | Tinsights",
  description:
    "Neem contact op met Tinsights voor een gratis adviesgesprek over uw website. Reactie binnen 24 uur. Bel 085 - 369 6652 of stuur een WhatsApp.",
  openGraph: {
    title: "Contact | Tinsights",
    description: "Gratis adviesgesprek over uw website. Reactie binnen 24 uur.",
    url: "https://tinsights.nl/contact",
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Ons — Tinsights | Webdevelopment Studio Groningen",
  description:
    "Klein team van developers uit Groningen. Wij bouwen snelle websites, beveiligen systemen en regelen je SEO. Persoonlijk contact, eerlijke prijzen.",
  keywords: [
    "webdevelopment studio Groningen",
    "website laten maken Groningen",
    "kleine developer team",
    "professionele websites bouwen",
    "Tinsights over ons",
  ],
  openGraph: {
    title: "Over Ons — Tinsights",
    description:
      "Een klein team van developers uit Groningen met grote passie voor snelle, professionele websites.",
    type: "website",
  },
};

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

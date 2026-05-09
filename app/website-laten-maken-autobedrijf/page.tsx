import type { Metadata } from "next";
import AutobedrijfPageClient from "./AutobedrijfPageClient";

export const metadata: Metadata = {
  title: "Website laten maken voor autobedrijven | Tinsights",
  description:
    "Professionele website laten maken voor uw autobedrijf of occasionhandel. Voorraad tonen, inkoopformulier met RDW kentekencheck en financieringsopties. Tinsights bouwt uw website op maat door heel Nederland.",
  keywords: [
    "website laten maken autobedrijf",
    "occasions website laten bouwen",
    "website autohandel nederland",
    "voorraad systeem autobedrijf website",
    "inkoopformulier kentekencheck website",
    "webdesign autobedrijf",
    "website occasions dealer nederland",
  ],
  openGraph: {
    title: "Website laten maken voor autobedrijven | Tinsights",
    description:
      "Professionele website voor uw autobedrijf. Voorraad, kentekencheck en meer.",
    url: "https://tinsights.nl/website-laten-maken-autobedrijf",
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tinsights.nl" },
    { "@type": "ListItem", position: 2, name: "Branches", item: "https://tinsights.nl/branches" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Autobedrijven & occasions",
      item: "https://tinsights.nl/website-laten-maken-autobedrijf",
    },
  ],
};

export default function AutobedrijfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AutobedrijfPageClient />
    </>
  );
}

import type { Metadata } from "next";
import TandartsPageClient from "./TandartsPageClient";

export const metadata: Metadata = {
  title: "Website laten maken voor tandartsen | Tinsights",
  description:
    "Professionele website laten maken voor uw tandartspraktijk. Online afspraken, behandelingen en patiëntinformatie. Tinsights bouwt uw website op maat door heel Nederland. Snel, betaalbaar en professioneel.",
  keywords: [
    "website laten maken tandarts",
    "tandartspraktijk website laten bouwen",
    "online afspraken tandarts website",
    "webdesign tandartspraktijk nederland",
    "website tandarts laten bouwen",
    "professionele website tandartspraktijk",
    "tandarts website nederland",
  ],
  openGraph: {
    title: "Website laten maken voor tandartsen | Tinsights",
    description:
      "Professionele website voor uw tandartspraktijk. Online afspraken, behandelingen en meer.",
    url: "https://tinsights.nl/website-laten-maken-tandarts",
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
      name: "Tandartspraktijken",
      item: "https://tinsights.nl/website-laten-maken-tandarts",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe lang duurt het bouwen van mijn website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemiddeld bouwen wij een website voor een tandartspraktijk binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag.",
      },
    },
    {
      "@type": "Question",
      name: "Kunnen patiënten online een afspraak maken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Wij integreren een online afsprakensysteem in uw website. Patiënten kiezen zelf een datum en tijd die voor hen uitkomt. U ontvangt automatisch een bevestiging en uw agenda wordt direct bijgewerkt.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik zelf mijn behandelingen en openingstijden aanpassen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Via uw beheerpaneel (CMS) past u zelf teksten, behandelingen, openingstijden en foto's aan. Wijzigingen zijn direct zichtbaar op uw website. Geen technische kennis vereist.",
      },
    },
    {
      "@type": "Question",
      name: "Werken jullie ook buiten Groningen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wij werken volledig op afstand en bedienen tandartspraktijken door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden. Afstand is geen enkel probleem.",
      },
    },
    {
      "@type": "Question",
      name: "Is mijn website veilig voor patiëntgegevens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Alle websites die wij bouwen worden voorzien van een SSL-certificaat (veilige verbinding) en worden gebouwd volgens de geldende privacywetgeving (AVG). Contactformulieren en afsprakensystemen verwerken gegevens veilig.",
      },
    },
    {
      "@type": "Question",
      name: "Kan mijn website later uitgebreid worden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zeker. Wij bouwen websites die eenvoudig uitgebreid kunnen worden. Een koppeling met uw praktijkmanagementsoftware, een extra pagina voor een nieuwe tandarts of een uitgebreider afsprakensysteem: dat regelen wij zonder problemen.",
      },
    },
  ],
};

export default function TandartsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TandartsPageClient />
    </>
  );
}

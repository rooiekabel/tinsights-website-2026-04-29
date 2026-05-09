import KapperPageClient from "./KapperPageClient";

export const metadata = {
  title: "Website laten maken voor kappers | Tinsights",
  description:
    "Professionele website laten maken voor uw kapperszaak of barbershop. Online afspraken, galerij en reviews. Tinsights bouwt uw website op maat \u2014 snel, betaalbaar en door heel Nederland.",
  keywords: [
    "website laten maken kapper",
    "kapperszaak website",
    "website barbershop",
    "online afsprakensysteem kapper",
    "webdesign kapper nederland",
    "website kapper laten bouwen",
    "professionele website kappersbedrijf",
  ],
  openGraph: {
    title: "Website laten maken voor kappers | Tinsights",
    description:
      "Professionele website voor uw kapperszaak. Online afspraken, galerij en meer.",
    url: "https://tinsights.nl/website-laten-maken-kapper",
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
      name: "Website voor kappers",
      item: "https://tinsights.nl/website-laten-maken-kapper",
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
        text: "Gemiddeld bouwen wij een website voor een kapperszaak binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag. Spoedopdrachten zijn in overleg ook mogelijk.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik zelf mijn afspraken en foto\u2019s beheren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, absoluut. Wij leveren uw website op met een gebruiksvriendelijk beheerpaneel. Daarmee past u zelf teksten aan, voegt u foto\u2019s toe en beheert u uw agenda \u2014 zonder technische kennis.",
      },
    },
    {
      "@type": "Question",
      name: "Heb ik een online boekingssysteem nodig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dit is niet verplicht, maar wij raden het sterk aan. Klanten boeken tegenwoordig liever zelf online dan dat zij bellen, zeker buiten openingstijden. Een online boekingssysteem verhoogt uw aantal afspraken merkbaar.",
      },
    },
    {
      "@type": "Question",
      name: "Werken jullie ook buiten Groningen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wij werken volledig op afstand en bedienen klanten door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden \u2014 afstand is geen enkel probleem. Alles wordt digitaal afgestemd.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als ik niet tevreden ben met het ontwerp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wij werken altijd met revisierondes. Na het eerste ontwerp kunt u feedback geven en passen wij het aan totdat u volledig tevreden bent. Uw website gaat pas live met uw goedkeuring.",
      },
    },
    {
      "@type": "Question",
      name: "Kan mijn website later uitgebreid worden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zeker. Wij bouwen websites die eenvoudig uit te breiden zijn. Wilt u later een webshop toevoegen, extra pagina\u2019s laten bouwen of een koppeling met een boekingssysteem? Dat regelen wij zonder problemen.",
      },
    },
  ],
};

export default function KapperPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <KapperPageClient />
    </>
  );
}

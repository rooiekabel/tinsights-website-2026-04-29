import RestaurantPageClient from "./RestaurantPageClient";

export const metadata = {
  title: "Website laten maken voor restaurants | Tinsights",
  description:
    "Professionele website laten maken voor uw restaurant, eetcaf\u00e9 of horecazaak. Online reserveringen, digitaal menu en reviews. Tinsights bouwt uw website op maat \u2014 snel, betaalbaar en door heel Nederland.",
  keywords: [
    "website laten maken restaurant",
    "restaurant website laten bouwen",
    "website horecazaak",
    "online reserveringssysteem restaurant",
    "webdesign restaurant nederland",
    "digitaal menu restaurant website",
    "website eetcafe nederland",
  ],
  openGraph: {
    title: "Website laten maken voor restaurants | Tinsights",
    description:
      "Professionele website voor uw restaurant. Online reserveringen, digitaal menu en meer.",
    url: "https://tinsights.nl/website-laten-maken-restaurant",
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
      name: "Website voor restaurants",
      item: "https://tinsights.nl/website-laten-maken-restaurant",
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
        text: "Gemiddeld bouwen wij een website voor een restaurant binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag. Spoedopdrachten zijn in overleg mogelijk.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik zelf mijn menukaart aanpassen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Wij leveren uw website op met een gebruiksvriendelijk beheerpaneel waarmee u zelf uw menukaart, prijzen en gerechten kunt aanpassen \u2014 zonder technische kennis. Wijzigingen zijn direct live op uw website.",
      },
    },
    {
      "@type": "Question",
      name: "Heb ik een online reserveringssysteem nodig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dit is niet verplicht maar sterk aan te raden. Gasten reserveren steeds vaker online en verwachten dit van een professioneel restaurant. Een online reserveringssysteem verhoogt uw bezetting merkbaar en bespaart u tijd aan de telefoon.",
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
      name: "Kan mijn website ook in meerdere talen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, wij bouwen meertalige websites voor restaurants die internationale gasten ontvangen. Denk aan een Nederlandse en Engelse versie, of andere talen op aanvraag. Neem contact op voor de mogelijkheden.",
      },
    },
    {
      "@type": "Question",
      name: "Kan mijn website later uitgebreid worden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zeker. Wij bouwen websites die eenvoudig uit te breiden zijn. Wilt u later een webshop voor cadeaubonnen, een bezorgmodule of extra pagina\u2019s laten toevoegen? Dat regelen wij zonder problemen.",
      },
    },
  ],
};

export default function RestaurantPage() {
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
      <RestaurantPageClient />
    </>
  );
}

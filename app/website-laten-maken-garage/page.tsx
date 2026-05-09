import GaragePageContent from "./GaragePageClient";

export const metadata = {
  title: "Website laten maken voor garages | Tinsights",
  description:
    "Professionele website laten maken voor uw garage of autobedrijf. Online werkplaatsplanning, RDW kentekencheck en afsprakensysteem. Tinsights bouwt uw website op maat door heel Nederland.",
  keywords: [
    "website laten maken garage",
    "garage website laten bouwen",
    "website APK garage",
    "website autogarage nederland",
    "online werkplaatsplanning garage",
    "RDW kentekencheck website",
    "webdesign autobedrijf nederland",
    "website garagebedrijf",
  ],
  openGraph: {
    title: "Website laten maken voor garages | Tinsights",
    description:
      "Professionele website voor uw garage. Werkplaatsplanning, kentekencheck en meer.",
    url: "https://tinsights.nl/website-laten-maken-garage",
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
    { "@type": "ListItem", position: 1, name: "Home",               item: "https://tinsights.nl" },
    { "@type": "ListItem", position: 2, name: "Branches",           item: "https://tinsights.nl/branches" },
    { "@type": "ListItem", position: 3, name: "Website voor garages", item: "https://tinsights.nl/website-laten-maken-garage" },
  ],
};

export default function GaragePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GaragePageContent />
    </>
  );
}

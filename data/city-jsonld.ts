import type { CityData } from "@/data/cities";
import { buildCityFaqItems } from "@/data/city-faq";

export function cityBreadcrumbJsonLd(city: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tinsights.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Steden",
        item: "https://tinsights.nl/steden",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Webdesign ${city.naam}`,
        item: city.ogUrl,
      },
    ],
  } as const;
}

export function cityFaqJsonLd(city: CityData) {
  const items = buildCityFaqItems(city);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } as const;
}

export function cityLocalBusinessJsonLd(city: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tinsights",
    url: "https://tinsights.nl",
    telephone: "+31853696652",
    email: "info@tinsights.nl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Groningen",
      addressRegion: "Groningen",
      addressCountry: "NL",
    },
    areaServed: city.areaServed,
    priceRange: "€€",
    openingHours: "Mo-Fr 09:00-18:00",
  } as const;
}

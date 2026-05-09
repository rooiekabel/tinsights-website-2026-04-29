import type { Metadata } from "next";
import CityLandingPage from "@/components/city/CityLandingPage";
import { cities } from "@/data/cities";
import { cityBreadcrumbJsonLd, cityFaqJsonLd, cityLocalBusinessJsonLd } from "@/data/city-jsonld";

const city = cities.leeuwarden;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: { canonical: city.ogUrl },
  openGraph: {
    title: city.metaTitle,
    description: city.metaDescription,
    url: city.ogUrl,
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
};

export default function WebdesignLeeuwardenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityBreadcrumbJsonLd(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityFaqJsonLd(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityLocalBusinessJsonLd(city)) }} />
      <CityLandingPage city={city} />
    </>
  );
}

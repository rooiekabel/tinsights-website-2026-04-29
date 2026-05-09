import BranchesPageClient from "./BranchesPageClient";

export const metadata = {
  title: "Websites per Branche | Tinsights",
  description:
    "Tinsights bouwt professionele websites voor elke branche in Nederland. Van kappers en restaurants tot garages en tandartsen. Bekijk alle branches.",
  keywords: [
    "website laten maken per branche",
    "webdesign voor bedrijven nederland",
    "website voor mijn branche",
    "professionele website laten bouwen",
    "webdesign bureau nederland alle branches",
  ],
  openGraph: {
    title: "Websites per Branche | Tinsights",
    description: "Professionele websites voor elke branche. Bekijk alle mogelijkheden.",
    url: "https://tinsights.nl/branches",
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
  ],
};

export default function BranchesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BranchesPageClient />
    </>
  );
}

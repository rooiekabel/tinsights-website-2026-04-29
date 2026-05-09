import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onze Projecten | Portfolio | Tinsights",
  description:
    "Bekijk de websites en projecten die Tinsights heeft gebouwd voor klanten door heel Nederland. Van webshops tot lokale bedrijfswebsites.",
  openGraph: {
    title: "Portfolio & Projecten | Tinsights",
    description: "Websites gebouwd door Tinsights voor ondernemers in Nederland.",
    url: "https://tinsights.nl/projecten",
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ProjectenLayout({ children }: { children: React.ReactNode }) {
  return children;
}

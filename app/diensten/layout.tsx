import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onze Diensten | Webdesign, SEO & Hosting | Tinsights",
  description:
    "Tinsights biedt professionele webdesign, SEO optimalisatie, hosting en automatisering voor Nederlandse ondernemers. Bekijk al onze diensten.",
  openGraph: {
    title: "Onze Diensten | Tinsights",
    description: "Webdesign, SEO, hosting en meer voor Nederlandse ondernemers.",
    url: "https://tinsights.nl/diensten",
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function DienstenLayout({ children }: { children: React.ReactNode }) {
  return children;
}

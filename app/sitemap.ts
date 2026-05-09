import type { MetadataRoute } from "next";

const base = "https://tinsights.nl";

/** Public marketing & legal URLs only (no demo embeds, no admin). */
const paths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projecten", priority: 0.9, changeFrequency: "weekly" },
  { path: "/prijzen", priority: 0.85, changeFrequency: "monthly" },
  { path: "/over-ons", priority: 0.85, changeFrequency: "monthly" },
  { path: "/werk", priority: 0.75, changeFrequency: "monthly" },
  { path: "/diensten", priority: 0.9, changeFrequency: "weekly" },
  { path: "/diensten/web-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diensten/ethical-hacking", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diensten/hosting-onderhoud", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diensten/seo-zichtbaarheid", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diensten/automatisering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacyverklaring", priority: 0.5, changeFrequency: "yearly" },
  { path: "/algemene-voorwaarden", priority: 0.5, changeFrequency: "yearly" },
  { path: "/herroepingsrecht", priority: 0.5, changeFrequency: "yearly" },
  { path: "/cookiebeleid", priority: 0.5, changeFrequency: "yearly" },
];

const additional: MetadataRoute.Sitemap = [
  { url: "https://tinsights.nl/webdesign-groningen", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: "https://tinsights.nl/webdesign-assen", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: "https://tinsights.nl/webdesign-zwolle", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: "https://tinsights.nl/webdesign-leeuwarden", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: "https://tinsights.nl/webdesign-drachten", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: "https://tinsights.nl/website-laten-maken-kapper", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "https://tinsights.nl/website-laten-maken-restaurant", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "https://tinsights.nl/website-laten-maken-garage", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "https://tinsights.nl/website-laten-maken-autobedrijf", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "https://tinsights.nl/website-laten-maken-tandarts", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: "https://tinsights.nl/branches", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: "https://tinsights.nl/steden", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: "https://tinsights.nl/website-laten-maken-hovenierbedrijf", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-schoonheidssalon", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-nagelstudio", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-fysiotherapeut", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-personal-trainer", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-schildersbedrijf", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-loodgieter", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-bakkerij", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-cafetaria", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-autohandel", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: "https://tinsights.nl/website-laten-maken-aannemer", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fromPaths = paths.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
  return [...fromPaths, ...additional];
}

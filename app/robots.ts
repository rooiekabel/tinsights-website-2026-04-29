import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tinsights.nl/sitemap.xml",
    host: "https://tinsights.nl",
  };
}

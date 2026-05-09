import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cities, type CityKey } from "@/data/cities";

export const metadata: Metadata = {
  title: "Webdesign per stad | Tinsights",
  description:
    "Professionele websites vanuit Groningen — o.a. Groningen, Assen, Zwolle, Leeuwarden en Drachten. Bekijk lokale pagina's per stad.",
  openGraph: {
    title: "Webdesign per stad | Tinsights",
    description: "Lokale webdesign en SEO — Tinsights bedient heel Noord-Nederland en daarbuiten.",
    url: "https://tinsights.nl/steden",
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
};

export default function StedenHubPage() {
  const keys = Object.keys(cities) as CityKey[];
  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1e", color: "#f1f5f9" }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 24px 80px" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: 12,
          }}
        >
          Steden
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.03em" }}>
          Webdesign in uw regio
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 32 }}>
          Kies uw stad voor lokale informatie, SEO en voorbeelden. Gevestigd in Groningen, actief door heel Nederland.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {keys.map((k) => {
            const c = cities[k];
            return (
              <li key={k}>
                <Link
                  href={`/${c.slug}`}
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#f1f5f9",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Webdesign {c.naam}
                  <span style={{ display: "block", fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                    {c.regio}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </main>
  );
}

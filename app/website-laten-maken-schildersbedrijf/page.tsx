import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Website laten maken voor schildersbedrijven | Tinsights",
  description: "Professionele website voor schildersbedrijven. Voor & na foto’s, diensten en offertes.",
  robots: { index: false, follow: false },
};

export default function PlaceholderPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1e" }}>
      <Navbar />

      <section
        style={{
          position: "relative",
          paddingTop: 160,
          paddingBottom: 80,
          paddingLeft: 24,
          paddingRight: 24,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
            <ol style={{ listStyle: "none", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, padding: 0, justifyContent: "center", flexWrap: "wrap" }}>
              <li><Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</Link></li>
              <li style={{ opacity: 0.4 }}>/</li>
              <li><Link href="/branches" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Branches</Link></li>
              <li style={{ opacity: 0.4 }}>/</li>
              <li style={{ color: "#f1f5f9", fontWeight: 500 }}>Schildersbedrijven</li>
            </ol>
          </nav>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: 20 }}>
            Branches &mdash; Schildersbedrijven
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.1, margin: "0 0 22px", letterSpacing: "-0.03em" }}>
            Website laten maken voor{" "}
            <span style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              schildersbedrijven
            </span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 40px" }}>
            Professionele website voor schildersbedrijven. Voor & na foto’s, diensten en offertes.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 32px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 24px rgba(99,102,241,0.35)" }}>
              Gratis offerte aanvragen
            </Link>
            <Link href="/branches" style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 32px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              Alle branches
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 120px", textAlign: "center" }}>
        <div style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 24, padding: "56px 40px" }}>
          <style>{`@keyframes spin-slow { to { transform: rotate(360deg); } }`}</style>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid rgba(99,102,241,0.2)", borderTopColor: "#6366f1", animation: "spin-slow 1.4s linear infinite", margin: "0 auto 28px" }} />
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Pagina wordt binnenkort uitgewerkt
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 28px" }}>
            We zijn druk bezig met deze pagina. In de tussentijd kunt u ons gewoon bereiken via het contactformulier voor een gratis gesprek.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", height: 46, padding: "0 28px", background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Neem contact op
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

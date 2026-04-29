import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Automatisering — Tinsights" };

export default function AutomatiseringPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section style={{ paddingTop: 120, paddingBottom: 96, textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>
            Dienst
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: "0 0 20px" }}>
            Automatisering
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", margin: "0 0 48px" }}>
            Slimmere processen, minder handmatig werk.
          </p>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "40px 32px", color: "#94a3b8", fontSize: 15 }}>
            Inhoud volgt binnenkort.
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

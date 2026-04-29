import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedWork from "@/components/FeaturedWork";

export const metadata = { title: "Ons werk — Tinsights" };

export default function WerkPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 64,
          textAlign: "center",
          background: "white",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: 16,
            }}
          >
            Portfolio
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
              margin: "0 0 20px",
            }}
          >
            Ons werk
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", margin: 0 }}>
            Een selectie van projecten die we hebben gebouwd voor onze klanten.
            Van snelle websites tot volledige webshops.
          </p>
        </div>
      </section>
      <FeaturedWork />
      <Footer />
    </main>
  );
}

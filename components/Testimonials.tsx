"use client";

const reviews = [
  { quote: "Tinsights heeft onze website volledig vernieuwd. In 3 weken live, supersnel en precies wat we wilden.", name: "Jan de Vries", role: "Eigenaar, AutoBedrijf Groningen", stars: 5 },
  { quote: "Eindelijk een webbureau dat gewoon reageert. Binnen een dag antwoord, vriendelijk en professioneel.", name: "Sarah Bakker", role: "Founder, The Beauty Room", stars: 5 },
  { quote: "Ze hebben ons geholpen met SEO. We staan nu op pagina 1 van Google voor onze stad.", name: "Marco van der Berg", role: "ZZP Loodgieter Utrecht", stars: 5 },
  { quote: "De website laadt razendsnel op mobiel. Onze bounce rate is met 40% gedaald.", name: "Lisa Smit", role: "E-commerce Manager", stars: 5 },
  { quote: "Hosting en domein geregeld, we hoeven er nooit meer naar om te kijken. Geweldig.", name: "Pieter Janssen", role: "Restauranthouder Amsterdam", stars: 5 },
  { quote: "Professioneel maar persoonlijk. Ze begrijpen echt wat je nodig hebt als ondernemer.", name: "Emma de Groot", role: "Personal Trainer & Coach", stars: 5 },
  { quote: "De ethical hacking scan vond kwetsbaarheden die we zelf nooit hadden gezien. Aanrader.", name: "Thomas Kok", role: "IT Manager, MKB Groningen", stars: 5 },
  { quote: "Onze webshop converteert veel beter. Snelheid omhoog, omzet omhoog. Top team.", name: "Anke Vos", role: "Eigenaar, Webwinkel Mode", stars: 5 },
  { quote: "Altijd bereikbaar via WhatsApp als er iets is. Dat is goud waard voor een ondernemer.", name: "Rudi Meijer", role: "Aannemer Friesland", stars: 5 },
  { quote: "Ze denken ook mee over groei en automatisering. Meer dan alleen een websitebouwer.", name: "Femke Brouwer", role: "Startup Founder, SaaS", stars: 5 },
];

const row1 = reviews.slice(0, 5);
const row2 = reviews.slice(5, 10);

function Card({ review }: { review: typeof reviews[number] }) {
  return (
    <div
      style={{
        width: 320,
        minHeight: 160,
        flexShrink: 0,
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ color: "#f59e0b", fontSize: 15, letterSpacing: 2 }} aria-label="5 sterren">
        {"★".repeat(5)}
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: "#475569", margin: 0, flex: 1 }}>
        &ldquo;{review.quote}&rdquo;
      </p>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>{review.name}</p>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{review.role}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: typeof reviews; direction: "left" | "right" }) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={e => {
        const track = e.currentTarget.querySelector<HTMLDivElement>(".marquee-track");
        if (track) track.style.animationPlayState = "paused";
      }}
      onMouseLeave={e => {
        const track = e.currentTarget.querySelector<HTMLDivElement>(".marquee-track");
        if (track) track.style.animationPlayState = "running";
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: 6,
          width: "max-content",
          animationName: animName,
          animationDuration: direction === "left" ? "35s" : "42s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: "running",
        }}
      >
        {/* Original + duplicate for seamless loop */}
        {[...items, ...items].map((r, i) => (
          <Card key={`${r.name}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>

      <section style={{ background: "#f8fafc", width: "100%" }} className="py-16 sm:py-24">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 40px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px" }}>
            Wat klanten zeggen
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, margin: 0 }}>
              Meer dan 50 tevreden klanten
            </h2>
            <a
              href="https://share.google/nesaAxYhNk1WtVbCl"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, fontWeight: 600, color: "#6366f1", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              Bekijk alle reviews op Google →
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </section>
    </>
  );
}

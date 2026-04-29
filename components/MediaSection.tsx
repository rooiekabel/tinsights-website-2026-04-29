"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    icon: "bi-image",
    title: "Eigen foto's & beelden",
    body: "Stuur je eigen productfoto's, portretfoto's of merkbeelden op. Wij verwerken ze als hero, achtergrond, galerij of sectie-illustratie. Altijd geoptimaliseerd voor snelheid.",
    tag: "JPG · PNG · WEBP · SVG",
    delay: 0.1,
  },
  {
    icon: "bi-camera-video",
    title: "Eigen video's & showreel",
    body: "Heb je een promovideo, drone-opname of sfeerfilm? Wij bouwen die in als geluidsloze achtergrondvideo of bewuste eyecatcher. Inclusief fallback-afbeelding voor mobiel.",
    tag: "MP4 · MOV · WEBM",
    delay: 0.2,
  },
  {
    icon: "bi-box",
    title: "3D-modellen & animaties",
    body: "Heb je een 3D-model, Lottie-animatie of After Effects-export? Wij integreren het naadloos — als laadanimatie, interactief element of visueel accent dat bezoekers bijblijft.",
    tag: "GLTF · LOTTIE · GIF · MP4",
    delay: 0.3,
  },
];

export default function MediaSection() {
  return (
    <section id="media" className="scroll-mt-20 relative bg-white w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        {/* Label + Heading + Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 14px" }}>
            Jouw media, onze techniek
          </p>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 2.9rem)",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.15,
              margin: "0 auto 0",
              maxWidth: 700,
            }}
          >
            Eigen foto&apos;s, video&apos;s of 3D-animaties — wij verwerken het.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#475569",
              maxWidth: 580,
              margin: "16px auto 0",
            }}
          >
            Geen stockfoto&apos;s van het internet. Lever jouw eigen beeldmateriaal aan en wij bouwen het in als achtergrond, hero-sectie, animatie of interactief element. Professioneel, snel ladend en geoptimaliseerd voor elk apparaat.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div
          style={{ display: "grid", gap: 20, marginTop: 56 }}
          className="grid-cols-1 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: card.delay, ease: "easeOut" }}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#6366f1";
                el.style.boxShadow = "0 8px 28px rgba(99,102,241,0.12)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#e2e8f0";
                el.style.boxShadow = "none";
              }}
            >
              <i
                className={`bi ${card.icon}`}
                style={{ fontSize: 32, color: "#6366f1", display: "block", marginBottom: 20 }}
                aria-hidden
              />
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 10px", lineHeight: 1.25 }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#475569", margin: "0 0 20px", flex: 1 }}>
                {card.body}
              </p>
              <div style={{ display: "inline-block" }}>
                <span style={{ background: "#ede9fe", color: "#6366f1", borderRadius: 99, fontSize: 12, fontWeight: 600, padding: "4px 12px", display: "inline-block" }}>
                  {card.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          style={{ display: "flex", justifyContent: "center", marginTop: 52 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            href="/diensten"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(to right, #6366f1, #4f46e5)",
              color: "white",
              borderRadius: 9999,
              padding: "15px 36px",
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
              transition: "box-shadow 200ms ease, transform 200ms ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.45)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.25)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Bekijk al onze diensten
            <i className="bi bi-arrow-right" style={{ fontSize: 17 }} aria-hidden />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

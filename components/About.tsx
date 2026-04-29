"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "bi-person",
    title: "Particulier",
    body: "Wil je een eenvoudige, nette site voor je hobby, portfolio of bijverdienste? Wij maken het betaalbaar en overzichtelijk.",
  },
  {
    icon: "bi-briefcase",
    title: "ZZP & Starter",
    body: "Net begonnen of bezig met je eerste professionele stap? Wij helpen je snel en goed online — zonder groot budget.",
  },
  {
    icon: "bi-building",
    title: "MKB & Bedrijven",
    body: "Groeiend bedrijf met wensen op het gebied van snelheid, SEO of koppelingen? Wij leveren maatwerk dat meegroeit.",
  },
];

const CARD_BASE: React.CSSProperties = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: "28px 24px",
  textAlign: "center",
  transition: "border-color 200ms ease, box-shadow 200ms ease",
};

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>

        {/* Label + Heading + Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px" }}>
            Over Tinsights
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
              margin: "0 0 20px",
            }}
          >
            Voor iedereen die online wil groeien
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#475569",
              maxWidth: 600,
              margin: "0 auto 56px",
            }}
          >
            Of je nu een simpele nette website wil, net begint als zzp&apos;er, of een groeiend bedrijf runt — wij bouwen wat jij nodig hebt. Geen templates, geen gedoe, gewoon resultaat.
          </p>
        </motion.div>

        {/* Three audience cards */}
        <div
          style={{ display: "grid", gap: 16, marginBottom: 40 }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              style={CARD_BASE}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#6366f1";
                el.style.boxShadow = "0 4px 20px rgba(99,102,241,0.1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#e2e8f0";
                el.style.boxShadow = "none";
              }}
            >
              <i
                className={`bi ${card.icon}`}
                style={{ fontSize: 28, color: "#6366f1", display: "block", marginBottom: 16 }}
                aria-hidden
              />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#475569", margin: 0 }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}
            transition={{ duration: 0.2 }}
            style={{ display: "inline-block", borderRadius: 9999 }}
          >
            <Link
              href="/over-ons"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "linear-gradient(to right, #6366f1, #4f46e5)",
                color: "white",
                borderRadius: 9999,
                padding: "14px 32px",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Leer ons kennen →
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

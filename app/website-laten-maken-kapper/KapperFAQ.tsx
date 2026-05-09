"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ACCENT = "#6366f1";
const BG2 = "#0d1117";

const faqs = [
  {
    q: "Hoe lang duurt het bouwen van mijn website?",
    a: "Gemiddeld bouwen wij een website voor een kapperszaak binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag. Spoedopdrachten zijn in overleg ook mogelijk.",
  },
  {
    q: "Kan ik zelf mijn afspraken en foto\u2019s beheren?",
    a: "Ja, absoluut. Wij leveren uw website op met een gebruiksvriendelijk beheerpaneel. Daarmee past u zelf teksten aan, voegt u foto\u2019s toe en beheert u uw agenda \u2014 zonder technische kennis.",
  },
  {
    q: "Heb ik een online boekingssysteem nodig?",
    a: "Dit is niet verplicht, maar wij raden het sterk aan. Klanten boeken tegenwoordig liever zelf online dan dat zij bellen, zeker buiten openingstijden. Een online boekingssysteem verhoogt uw aantal afspraken merkbaar.",
  },
  {
    q: "Werken jullie ook buiten Groningen?",
    a: "Wij werken volledig op afstand en bedienen klanten door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden \u2014 afstand is geen enkel probleem. Alles wordt digitaal afgestemd.",
  },
  {
    q: "Wat als ik niet tevreden ben met het ontwerp?",
    a: "Wij werken altijd met revisierondes. Na het eerste ontwerp kunt u feedback geven en passen wij het aan totdat u volledig tevreden bent. Uw website gaat pas live met uw goedkeuring.",
  },
  {
    q: "Kan mijn website later uitgebreid worden?",
    a: "Zeker. Wij bouwen websites die eenvoudig uit te breiden zijn. Wilt u later een webshop toevoegen, extra pagina\u2019s laten bouwen of een koppeling met een boekingssysteem? Dat regelen wij zonder problemen.",
  },
];

export default function KapperFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .kp-py-section { padding: 40px 24px; margin: 0; box-sizing: border-box; }
        @media (min-width: 1024px) { .kp-py-section { padding: 64px 24px; } }
        .kp-faq-btn {
          width: 100%;
          padding: 14px 0;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }
        .kp-faq-q {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
          line-height: 1.4;
          transition: color 200ms ease;
        }
        .kp-faq-chev {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 280ms cubic-bezier(0.4,0,0.2,1);
          color: rgba(255,255,255,0.5);
          font-size: 14px;
        }
        .kp-faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: transparent;
        }
      `}</style>
      <section id="faq" className="kp-py-section" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: 32 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
              Veelgestelde vragen
            </p>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              Veelgestelde vragen over een kappers website
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto" }}>
              Heeft u een vraag die hier niet tussen staat?{" "}
              <Link href="/contact" style={{ color: ACCENT, textDecoration: "none" }}>
                Neem gerust contact met ons op.
              </Link>
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="kp-faq-item"
              >
                <button
                  type="button"
                  className="kp-faq-btn"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <h3 className="kp-faq-q" style={{ color: open === i ? ACCENT : "#f1f5f9" }}>{faq.q}</h3>
                  <span className="kp-faq-chev" aria-hidden style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  style={{
                    maxHeight: open === i ? 900 : 0,
                    overflow: "hidden",
                    transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: 0, paddingBottom: 16 }}>
                    {faq.a}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

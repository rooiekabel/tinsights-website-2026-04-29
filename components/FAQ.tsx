"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Hoe lang duurt het bouwen van een website?",
    a: "Een standaard website is doorgaans binnen 2–4 weken live. Complexere projecten zoals webshops of maatwerk-applicaties duren langer. We bespreken altijd vooraf een realistische planning.",
  },
  {
    q: "Wat kost een website bij Tinsights?",
    a: "Dat hangt af van de scope. Een eenvoudige zakelijke website begint rond €500–€800. Webshops en uitgebreidere projecten zijn op aanvraag. We geven altijd een heldere offerte zonder verrassingen achteraf.",
  },
  {
    q: "Kan ik mijn bestaande website laten verbeteren of versnellen?",
    a: "Absoluut. We auditen je huidige site op snelheid, SEO en structuur, en pakken de knelpunten aan. Dit is vaak goedkoper dan een volledig nieuwe site en geeft snel resultaat.",
  },
  {
    q: "Bieden jullie ook hosting en doorlopend onderhoud aan?",
    a: "Ja. We bieden betrouwbare hosting op Nederlandse servers, inclusief domeinbeheer, SSL en periodieke updates. Zo blijft je site veilig en snel zonder dat jij er naar hoeft om te kijken.",
  },
  {
    q: "Werken jullie ook voor bedrijven buiten Groningen?",
    a: "Zeker. We werken voor klanten door heel Nederland. De meeste communicatie verloopt digitaal — via videocall, WhatsApp of e-mail. Dat werkt prima en bespaart iedereen tijd.",
  },
  {
    q: "Wat maakt Tinsights anders dan andere webbureaus?",
    a: "We zijn een klein, specialistisch team zonder overhead van grote bureaus. Dat betekent directe communicatie, eerlijke prijzen en maatwerk zonder generieke templates. Jouw doelen sturen alles.",
  },
];

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof faqs[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: "1px solid #e2e8f0" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          minHeight: 56,
          padding: "18px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", lineHeight: 1.4, flex: 1 }}>
          {item.q}
        </span>
        <motion.i
          className="bi bi-chevron-down"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ fontSize: 18, color: "#6366f1", flexShrink: 0, display: "block" }}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#475569", margin: "0 0 20px", paddingRight: 32 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <section style={{ background: "white", width: "100%" }} className="py-16 sm:py-24">
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px" }}>
            Veelgestelde vragen
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, margin: 0 }}>
            Alles wat je wil weten
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((item, idx) => (
            <FAQItem
              key={idx}
              item={item}
              isOpen={openIdx === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

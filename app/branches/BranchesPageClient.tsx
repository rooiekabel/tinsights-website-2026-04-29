"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── constants ─────────────────────────────────────────────── */
const ACCENT = "#6366f1";
const BG = "#0a0f1e";
const SECTION_BORDER = "1px solid rgba(255,255,255,0.05)";

/* ─── inline svg icons ───────────────────────────────────────── */
const IconScissors = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);
const IconSparkles = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3L13.09 8.26L18 9L13.09 9.74L12 15L10.91 9.74L6 9L10.91 8.26L12 3Z"/>
    <path d="M5 17L5.67 19.33L8 20L5.67 20.67L5 23L4.33 20.67L2 20L4.33 19.33L5 17Z"/>
    <path d="M19 3L19.5 4.5L21 5L19.5 5.5L19 7L18.5 5.5L17 5L18.5 4.5L19 3Z"/>
  </svg>
);
const IconHand = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  </svg>
);
const IconUtensils = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
);
const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IconBread = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);
const IconWrench = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconCar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z"/>
    <path d="M7 9H5"/><path d="M19 9h-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
    <path d="M8 9 5.5 6h13L16 9"/>
  </svg>
);
const IconKey = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </svg>
);
const IconTooth = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5.5c-1.5-2-3.5-3-5-2.5C4.5 4 3 6.5 3 9c0 2 .5 3.5 1.5 5 .5.8 1 3 1.5 5.5.3 1.2.8 2 2 2s1.7-.8 2-2L11 15c.3-1.2.7-2 1-2s.7.8 1 2l.5 4.5c.3 1.2.8 2 2 2s1.7-.8 2-2c.5-2.5 1-4.7 1.5-5.5 1-1.5 1.5-3 1.5-5 0-2.5-1.5-5-4-5.5-1.5-.5-3.5.5-5 2.5Z"/>
  </svg>
);
const IconActivity = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconDumbbell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/>
    <path d="m18 22 4-4-4-4-4 4Z"/><path d="m2 6 4-4 4 4-4 4Z"/>
    <path d="m10 10 4-4"/><path d="m14 14-4 4"/>
  </svg>
);
const IconTree = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22V12"/><path d="M12 12 8 8"/><path d="M12 12l4-4"/>
    <path d="M5 12h14"/><path d="M9 7h6L12 2Z"/>
  </svg>
);
const IconPaintbrush = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/>
  </svg>
);
const IconDroplet = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

/* ─── data ───────────────────────────────────────────────────── */
interface Branch {
  name: string;
  description: string;
  href: string;
  live: boolean;
  Icon: React.FC;
  category: string;
}

const clusters: { id: string; title: string; subtitle: string; branches: Branch[] }[] = [
  {
    id: "beauty",
    title: "Beauty & Verzorging",
    subtitle: "Voor salons, kappers en schoonheidsprofessionals",
    branches: [
      { name: "Kappers & Barbershops", description: "Online afspraken, fotogalerij en Google reviews voor uw kapperszaak.", href: "/website-laten-maken-kapper", live: true, Icon: IconScissors, category: "beauty" },
      { name: "Schoonheidssalons", description: "Behandelingen, boekingen en voor & na resultaten voor uw salon.", href: "/website-laten-maken-schoonheidssalon", live: false, Icon: IconSparkles, category: "beauty" },
      { name: "Nagelstudio's", description: "Portfolio, prijslijst en online boekingssysteem voor uw nagelstudio.", href: "/website-laten-maken-nagelstudio", live: false, Icon: IconHand, category: "beauty" },
    ],
  },
  {
    id: "horeca",
    title: "Horeca & Food",
    subtitle: "Voor restaurants, cafés en alle horecaondernemers",
    branches: [
      { name: "Restaurants & Eetcafés", description: "Online reserveringen, digitaal menu en sfeerbeelden voor uw zaak.", href: "/website-laten-maken-restaurant", live: true, Icon: IconUtensils, category: "horeca" },
      { name: "Cafetaria's & Snackbars", description: "Menu, openingstijden en online bestellen voor uw cafetaria.", href: "/website-laten-maken-cafetaria", live: false, Icon: IconBag, category: "horeca" },
      { name: "Bakkerijen", description: "Assortiment, openingstijden en bestelformulier voor uw bakkerij.", href: "/website-laten-maken-bakkerij", live: false, Icon: IconBread, category: "horeca" },
    ],
  },
  {
    id: "automotive",
    title: "Automotive",
    subtitle: "Voor garages, autodealers en autobedrijven",
    branches: [
      { name: "Garages & APK", description: "Werkplaatsplanning, RDW kentekencheck en afsprakensysteem.", href: "/website-laten-maken-garage", live: true, Icon: IconWrench, category: "automotive" },
      { name: "Autobedrijven & Occasions", description: "Voorraad tonen, inkoopformulier met kentekencheck en financieringsopties.", href: "/website-laten-maken-autobedrijf", live: true, Icon: IconCar, category: "automotive" },
      { name: "Autohandel", description: "Complete website voor autohandelaren met RDW integratie.", href: "/website-laten-maken-autohandel", live: false, Icon: IconKey, category: "automotive" },
    ],
  },
  {
    id: "zorg",
    title: "Zorg & Gezondheid",
    subtitle: "Voor zorgprofessionals en gezondheidsondernemers",
    branches: [
      { name: "Tandartspraktijken", description: "Afspraken, behandelingen en patiëntinformatie voor uw praktijk.", href: "/website-laten-maken-tandarts", live: true, Icon: IconTooth, category: "zorg" },
      { name: "Fysiotherapeuten", description: "Online intake, behandelingen en afsprakensysteem voor uw praktijk.", href: "/website-laten-maken-fysiotherapeut", live: false, Icon: IconActivity, category: "zorg" },
      { name: "Personal Trainers", description: "Trainingsschema's, programma's en online coaching website.", href: "/website-laten-maken-personal-trainer", live: false, Icon: IconDumbbell, category: "zorg" },
    ],
  },
  {
    id: "bouw",
    title: "Bouw & Tuin",
    subtitle: "Voor vakmensen in bouw, installatie en tuinbranche",
    branches: [
      { name: "Hoveniersbedrijven", description: "Portfolio, werkgebied en offerteformulier voor uw bedrijf.", href: "/website-laten-maken-hovenierbedrijf", live: false, Icon: IconTree, category: "bouw" },
      { name: "Schildersbedrijven", description: "Voor & na foto's, diensten en offertes voor uw schildersbedrijf.", href: "/website-laten-maken-schildersbedrijf", live: false, Icon: IconPaintbrush, category: "bouw" },
      { name: "Loodgieters", description: "Spoedservice, diensten en contactformulier voor uw bedrijf.", href: "/website-laten-maken-loodgieter", live: false, Icon: IconDroplet, category: "bouw" },
      { name: "Aannemers", description: "Projectportfolio, diensten en offerteformulier voor uw aannemer.", href: "/website-laten-maken-aannemer", live: false, Icon: IconBuilding, category: "bouw" },
    ],
  },
];

const allBranches = clusters.flatMap((c) => c.branches);

/* ─── branch card ────────────────────────────────────────────── */
function BranchCard({ branch }: { branch: Branch }) {
  const { live } = branch;
  return (
    <Link
      href={branch.href}
      aria-label={`Website laten maken voor ${branch.name}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 24,
        borderRadius: 14,
        border: `1px solid rgba(255,255,255,${live ? "0.12" : "0.07"})`,
        background: live ? "rgba(99,102,241,0.04)" : "rgba(255,255,255,0.02)",
        textDecoration: "none",
        opacity: live ? 1 : 0.72,
        transition: "border-color 220ms ease, background 220ms ease, box-shadow 220ms ease, transform 220ms ease",
        position: "relative",
        overflow: "hidden",
      }}
      className={live ? "br-card-live" : "br-card-soon"}
    >
      {/* Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          background: live ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.05)",
          color: live ? "#818cf8" : "rgba(255,255,255,0.35)",
          flexShrink: 0,
        }}>
          <branch.Icon />
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100,
          background: live ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.07)",
          color: live ? "#4ade80" : "rgba(255,255,255,0.35)",
          border: live ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.08)",
          whiteSpace: "nowrap",
        }}>
          {live ? "Beschikbaar" : "Binnenkort"}
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: live ? "#f1f5f9" : "rgba(255,255,255,0.6)", margin: "0 0 6px", lineHeight: 1.3 }}>
          {branch.name}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", margin: 0 }}>
          {branch.description}
        </p>
      </div>

      {live && (
        <div style={{ display: "flex", justifyContent: "flex-end", color: "rgba(255,255,255,0.3)", transition: "color 220ms ease" }} className="br-arrow">
          <IconArrow />
        </div>
      )}
    </Link>
  );
}

/* ─── cluster section ─────────────────────────────────────────── */
function ClusterSection({ cluster, visible }: { cluster: typeof clusters[0]; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ marginBottom: 64 }}
    >
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
          {cluster.title}
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>{cluster.subtitle}</p>
      </div>
      <div className="br-grid">
        {cluster.branches.filter((b) => !visible || b.name.toLowerCase().includes("") ).map((branch, i) => (
          <motion.div
            key={branch.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
          >
            <BranchCard branch={branch} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── page ───────────────────────────────────────────────────── */
export default function BranchesPageClient() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? allBranches.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const showSearch = query.trim().length > 0;

  return (
    <main style={{ minHeight: "100vh", background: BG }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .br-card-live:hover {
          border-color: rgba(99,102,241,0.35) !important;
          background: rgba(99,102,241,0.07) !important;
          box-shadow: 0 8px 32px rgba(99,102,241,0.1) !important;
          transform: translateY(-3px) !important;
        }
        .br-card-live:hover .br-arrow { color: rgba(255,255,255,0.65) !important; }
        .br-card-soon:hover { border-color: rgba(255,255,255,0.14) !important; }
        .br-grid {
          display: grid; grid-template-columns: 1fr; gap: 14px;
        }
        @media (min-width: 560px) { .br-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .br-grid { grid-template-columns: repeat(3, 1fr); } }
        .br-search::placeholder { color: rgba(255,255,255,0.3); }
        .br-search:focus { border-color: rgba(255,255,255,0.28) !important; outline: none; }
      `}</style>

      <Navbar />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: BG, padding: "76px 24px 0" }}>
        <ol style={{ listStyle: "none", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, padding: 0, justifyContent: "center", flexWrap: "wrap" }}>
          <li><Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</Link></li>
          <li style={{ opacity: 0.4 }}>/</li>
          <li style={{ color: "#f1f5f9", fontWeight: 500 }}>Branches</li>
        </ol>
      </nav>

      {/* Hero */}
      <section style={{ background: BG, padding: "40px 24px 72px", borderBottom: SECTION_BORDER, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}
          >
            Webdesign voor elke branche
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.03em" }}
          >
            Voor welke branche zoekt u een website?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 540, margin: "0 auto 32px" }}
          >
            Tinsights bouwt professionele websites voor bedrijven in elke sector. Kies uw branche en ontdek wat wij voor u kunnen betekenen. Alle websites zijn op maat gebouwd, SEO geoptimaliseerd en mobiel vriendelijk.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ maxWidth: 420, margin: "0 auto 32px" }}
          >
            <input
              type="text"
              className="br-search"
              placeholder="Zoek uw branche..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Zoek uw branche"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "13px 18px",
                fontSize: 15,
                color: "#f1f5f9",
                transition: "border-color 200ms ease",
              }}
            />
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}
          >
            {["50+ projecten", "4.9/5 Reviews", "Heel Nederland", "Binnen 2 weken online"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Branch clusters / search results */}
      <section id="branches" style={{ background: BG, padding: "80px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {showSearch ? (
            // Search results
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>
                {filtered && filtered.length > 0
                  ? `${filtered.length} resultaat${filtered.length !== 1 ? "en" : ""} voor "${query}"`
                  : `Geen resultaten gevonden voor "${query}"`}
              </p>
              {filtered && filtered.length > 0 ? (
                <div className="br-grid">
                  {filtered.map((branch, i) => (
                    <motion.div
                      key={branch.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <BranchCard branch={branch} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "48px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: "0 0 16px" }}>
                    Geen resultaten gevonden voor &ldquo;{query}&rdquo;
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                    Staat uw branche er niet bij?{" "}
                    <Link href="/contact" style={{ color: ACCENT, textDecoration: "none" }}>Neem contact op</Link>
                    {" "}en wij bespreken de mogelijkheden.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            // All clusters
            clusters.map((cluster) => (
              <ClusterSection key={cluster.id} cluster={cluster} visible={true} />
            ))
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
        padding: "88px 24px",
        textAlign: "center",
        borderTop: SECTION_BORDER,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ maxWidth: 520, margin: "0 auto" }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 16px" }}>
            Niet gevonden?
          </p>
          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Staat uw branche er niet bij?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: "0 0 36px" }}>
            Wij bouwen websites voor alle soorten bedrijven. Neem contact op en wij bespreken de mogelijkheden voor uw specifieke situatie.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              aria-label="Neem contact op met Tinsights"
              style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", background: ACCENT, color: "white", borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: "none", transition: "opacity 180ms" }}
            >
              Neem contact op
            </Link>
            <Link
              href="/diensten"
              aria-label="Bekijk onze diensten"
              style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", background: "transparent", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 50, fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "border-color 200ms, background 200ms" }}
            >
              Bekijk onze diensten
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

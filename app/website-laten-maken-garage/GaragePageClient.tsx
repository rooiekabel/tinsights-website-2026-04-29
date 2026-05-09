"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchLandingBreadcrumb from "@/components/BranchLandingBreadcrumb";
import Link from "next/link";
import BranchPricingBlock, { type PricingTierConfig } from "@/components/BranchPricingBlock";

const ORANGE = "#f97316";
const ORANGE_DIM = "rgba(249,115,22,0.10)";
const ORANGE_BORDER = "rgba(249,115,22,0.30)";
const BG1 = "#0a0f1e";
const BG2 = "#0d1117";
const SECTION_BORDER = "1px solid rgba(255,255,255,0.06)";

/* ── ANIMATION WRAPPER (scale-up — unique to garage page) ─────────── */

function ScaleUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── SVG ICONS ─────────────────────────────────────────────────────── */

function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconMobile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1.5 6 4.5 9 10.5 3" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── DATA ───────────────────────────────────────────────────────────── */

const heroSlideData = [
  { src: "/assets/car_garage.png",    alt: "Voorbeeld garage website met reparatiediensten",   url: "www.garage-automec.nl",         label: "Stijl A \u2014 Professioneel & Sterk" },
  { src: "/assets/car_detailing.png", alt: "Voorbeeld autodetailing werkplaats website",        url: "www.autodetail-werkplaats.nl",  label: "Stijl B \u2014 Modern & Strak" },
];

const exampleSlideData = [
  { src: "/assets/car_garage.png",    alt: "Voorbeeld garage website met reparatiediensten",   url: "www.automec-garage.nl",         label: "Stijl A \u2014 The Signature" },
  { src: "/assets/car_detailing.png", alt: "Voorbeeld autodetailing werkplaats website",        url: "www.autodetail-werkplaats.nl",  label: "Stijl B \u2014 Modern Food" },
];

const features = [
  {
    Icon: IconCalendar,
    title: "Online werkplaatsplanning",
    text: "Klanten plannen zelf een afspraak voor onderhoud, APK of reparatie via uw website. U ontvangt direct een bevestiging en uw agenda vult zich automatisch. Geen telefoontjes meer tussendoor.",
  },
  {
    Icon: IconSearch,
    title: "RDW kentekencheck",
    text: "Klanten voeren hun kenteken in op uw website en zien direct de voertuiggegevens (merk, model, bouwjaar, APK-vervaldatum). Dit werkt via de gratis RDW Open Data API en is standaard inbegrepen.",
  },
  {
    Icon: IconShield,
    title: "Diensten en prijzen overzicht",
    text: "Toon duidelijk welke diensten u aanbiedt en wat de verwachte kosten zijn. Transparantie wekt vertrouwen en voorkomt onnodige telefoontjes over prijzen.",
  },
  {
    Icon: IconStar,
    title: "Google Reviews integratie",
    text: "Uw beste Google reviews worden automatisch getoond op uw website. Positieve beoordelingen zijn de krachtigste manier om nieuwe klanten te overtuigen van uw vakmanschap.",
  },
  {
    Icon: IconMobile,
    title: "Mobiel geoptimaliseerd",
    text: "Meer dan 80% van uw bezoekers komt via de telefoon. Uw website werkt perfect op elk apparaat, van smartphone tot desktop. Snel, overzichtelijk en gebruiksvriendelijk.",
  },
  {
    Icon: IconPencil,
    title: "Zelf beheren via beheerpaneel",
    text: "Prijzen aanpassen, nieuwe diensten toevoegen of een aanbieding plaatsen? Dat doet u zelf via een eenvoudig beheerpaneel (CMS) zonder technische kennis.",
  },
];

const stats = [
  { value: "68%",    label: "Van automobilisten zoekt online naar een garage" },
  { value: "3x",     label: "Meer afspraken met online werkplaatsplanning" },
  { value: "24/7",   label: "Bereikbaar voor afspraken en kentekencheck" },
  { value: "2 wkn",  label: "Gemiddelde bouwtijd voor een garage website" },
];

const starterFeatures = [
  "Tot 3 pagina\u2019s",
  "Modern maatwerk design",
  "Contactformulier",
  "Diensten overzicht",
  "Mobiel geoptimaliseerd",
  "Basis SEO (gevonden worden in Google)",
  "SSL (veilige verbinding)",
  "Binnen 5 tot 7 dagen online",
  "2 weken support",
];

const proFeatures = [
  "3 tot 5 pagina\u2019s",
  "Volledig maatwerk design",
  "Online werkplaatsplanning",
  "RDW kentekencheck integratie",
  "Google Reviews integratie (automatisch op uw site)",
  "Uitgebreide SEO (maximaal zichtbaar in Google)",
  "CMS (beheerpaneel om zelf aanpassingen te maken)",
  "1 maand support na oplevering",
];

const businessPlusFeatures = [
  "Alles uit Professional",
  "Volledig maatwerk design",
  "Admin dashboard op maat",
  "Klanten- en voertuigbeheer systeem",
  "Automatische APK-herinneringen per mail",
  "Online betalingen integratie",
  "Uitgebreide analytics en rapportages",
  "Koppeling met externe systemen",
  "3 maanden support",
  "Prioriteit bij aanpassingen",
];

const exampleTags = ["Werkplaatsplanning", "Kentekencheck", "Google Reviews", "SEO geoptimaliseerd"];

const faqs = [
  {
    q: "Hoe lang duurt het bouwen van mijn website?",
    a: "Gemiddeld bouwen wij een garage website binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag. Spoedopdrachten zijn in overleg mogelijk.",
  },
  {
    q: "Wat is die RDW kentekencheck precies?",
    a: "De RDW (Dienst Wegverkeer) beheert alle voertuiggegevens in Nederland. Via hun gratis Open Data API kunnen bezoekers van uw website hun kenteken invoeren en direct hun voertuiggegevens zien: merk, model, bouwjaar en APK-vervaldatum. Wij integreren dit standaard in het Professional pakket.",
  },
  {
    q: "Kan ik zelf mijn diensten en prijzen aanpassen?",
    a: "Ja. U beheert uw website via een eenvoudig beheerpaneel (CMS). Diensten toevoegen, prijzen aanpassen of een aanbieding plaatsen doet u zelf zonder technische kennis. Wijzigingen zijn direct zichtbaar op uw website.",
  },
  {
    q: "Werken jullie ook buiten Groningen?",
    a: "Wij werken volledig op afstand en bedienen garages door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden. Alles wordt digitaal afgestemd, afstand is geen enkel probleem.",
  },
  {
    q: "Kan ik later extra functies toevoegen?",
    a: "Zeker. Wij bouwen websites die eenvoudig uit te breiden zijn. Wilt u later een voertuigbeheersysteem, automatische APK-herinneringen of een koppeling met uw garagemanagementsysteem toevoegen? Dat regelen wij zonder problemen.",
  },
  {
    q: "Wat als ik niet tevreden ben?",
    a: "Wij werken altijd met revisierondes. Na het eerste ontwerp kunt u feedback geven en passen wij aan totdat u volledig tevreden bent. Uw website gaat pas live met uw goedkeuring.",
  },
];

const internalLinks = [
  { label: "Kappers & barbershops",  href: "/website-laten-maken-kapper" },
  { label: "Restaurants & horeca",   href: "/website-laten-maken-restaurant" },
  { label: "Tandartspraktijken",     href: "/website-laten-maken-tandarts" },
  { label: "Hoveniersbedrijven",     href: "/website-laten-maken-hovenierbedrijf" },
];

const trustItems = [
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    text: "4.9/5 Google Reviews",
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    text: "Binnen 2 weken online",
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>,
    text: "Vaste prijs, geen verrassingen",
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    text: "Heel Nederland",
  },
];

/* ── SHARED BROWSER MOCKUP CAROUSEL ────────────────────────────────── */

interface CarouselProps {
  slides: typeof heroSlideData;
  slide: number;
  setSlide: (i: number) => void;
  paused: boolean;
  setPaused: (p: boolean) => void;
  touchRef: React.MutableRefObject<number | null>;
  showArrows?: boolean;
  aspectPadding?: string;
}

function BrowserCarousel({
  slides, slide, setSlide, paused, setPaused, touchRef, showArrows = false, aspectPadding = "56.25%",
}: CarouselProps) {
  return (
    <div>
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          background: "#1a1f2e",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 20px 60px rgba(249,115,22,0.15), 0 8px 32px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchRef.current === null) return;
          const diff = touchRef.current - e.changedTouches[0].clientX;
          if (diff > 50) setSlide((slide + 1) % slides.length);
          else if (diff < -50) setSlide((slide - 1 + slides.length) % slides.length);
          touchRef.current = null;
        }}
      >
        {/* Browser bar */}
        <div style={{ height: 32, background: "#1a1f2e", display: "flex", alignItems: "center", padding: "0 12px", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <div style={{ flex: 1, margin: "0 8px", height: 20, background: "rgba(255,255,255,0.10)", borderRadius: 100, display: "flex", alignItems: "center", padding: "0 12px", overflow: "hidden" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "opacity 300ms" }}>
              {slides[slide].url}
            </span>
          </div>
        </div>
        {/* Image area */}
        <div style={{ position: "relative", width: "100%", paddingTop: aspectPadding, background: "#0c1018", overflow: "hidden" }}>
          {slides.map((s, i) => (
            <div
              key={s.src}
              style={{
                position: "absolute", inset: 0,
                opacity: slide === i ? 1 : 0,
                zIndex: slide === i ? 10 : 0,
                transition: "opacity 700ms ease-in-out",
              }}
            >
              <Image src={s.src} alt={s.alt} fill style={{ objectFit: "cover" }} priority={i === 0} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          ))}
          {showArrows && (
            <>
              <button
                type="button"
                onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
                aria-label="Vorige slide"
                style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 36, height: 36, minWidth: 44, minHeight: 44, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                onClick={() => setSlide((slide + 1) % slides.length)}
                aria-label="Volgende slide"
                style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 36, height: 36, minWidth: 44, minHeight: 44, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </>
          )}
        </div>
      </div>
      {/* Dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Ga naar slide ${i + 1}`}
            style={{ width: slide === i ? 24 : 8, height: 8, borderRadius: 100, background: slide === i ? "#fb923c" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms", minWidth: 8 }}
          />
        ))}
      </div>
      {/* Label */}
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "8px 0 0", fontStyle: "italic" }}>
        {slides[slide].label}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTouchRef = useRef<number | null>(null);

  useEffect(() => {
    if (heroPaused) return;
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % heroSlideData.length), 3500);
    return () => clearInterval(t);
  }, [heroPaused]);

  return (
    <>
      <style>{`
        .gr-hero-btn-primary {
          display: inline-flex; align-items: center; min-height: 52px; padding: 0 32px;
          background: #f97316; color: #fff; border-radius: 100px;
          font-weight: 700; font-size: 15px; text-decoration: none; white-space: nowrap;
          box-shadow: 0 4px 24px rgba(249,115,22,0.35);
          transition: background 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        }
        .gr-hero-btn-primary:hover { background: #fb923c; box-shadow: 0 8px 36px rgba(249,115,22,0.5); transform: translateY(-2px); }
        .gr-hero-btn-secondary {
          display: inline-flex; align-items: center; min-height: 52px; padding: 0 28px;
          background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(249,115,22,0.5); border-radius: 100px;
          font-weight: 600; font-size: 15px; text-decoration: none; white-space: nowrap;
          transition: border-color 200ms, background 200ms;
        }
        .gr-hero-btn-secondary:hover { border-color: rgba(249,115,22,0.8); background: rgba(249,115,22,0.06); }
        @media (max-width: 1023px) {
          .gr-hero-btns { flex-direction: column !important; align-items: stretch !important; }
          .gr-hero-btn-primary, .gr-hero-btn-secondary {
            justify-content: center !important;
            width: 100% !important;
            max-width: 100% !important;
            white-space: normal !important;
            box-sizing: border-box;
            text-align: center;
          }
        }
        .gr-hero-inner { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; width: 100%; max-width: 100%; box-sizing: border-box; }
        .gr-hero-inner > * { min-width: 0; }
        @media (min-width: 1024px) { .gr-hero-inner { grid-template-columns: 55fr 45fr; gap: 64px; } }
        .gr-hero-text-col { text-align: center; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box; }
        @media (min-width: 1024px) { .gr-hero-text-col { text-align: left; } }
        @keyframes gr-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .gr-mockup-bob { animation: gr-bob 4s ease-in-out infinite; width: 100%; }
        .gr-trust-bar {
          display: flex; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;
          gap: 0; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08);
          -webkit-overflow-scrolling: touch; justify-content: flex-start; align-items: center;
          white-space: nowrap;
          width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box;
        }
        .gr-trust-bar::-webkit-scrollbar { display: none; }
        .gr-trust-bar { -ms-overflow-style: none; }
        .gr-trust-sep {
          flex-shrink: 0; padding: 0 12px; color: rgba(255,255,255,0.35); font-size: 13px; font-weight: 400;
        }
        .gr-trust-item { flex-shrink: 0; font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 500; line-height: 1.35; padding: min(48px - 13px * 1.35, 12px) 0; }
      `}</style>

      <section id="home" style={{ position: "relative", background: BG1, overflow: "hidden", paddingTop: 48, paddingBottom: 80, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(249,115,22,0.10) 0%, transparent 65%)", pointerEvents: "none" }} aria-hidden="true" />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: `linear-gradient(to top, ${BG1}, transparent)`, pointerEvents: "none" }} aria-hidden="true" />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
          <div className="gr-hero-inner">
            {/* LEFT */}
            <div className="gr-hero-text-col">
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 20 }}
              >
                Webdesign voor garages &amp; werkplaatsen
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.08, margin: "0 0 22px", letterSpacing: "-0.03em", overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                Professionele{" "}
                <span style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  website laten maken
                </span>{" "}
                voor uw garage
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: "0 0 36px", maxWidth: 520, overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                Een moderne, overzichtelijke website die klanten aantrekt en online werkplaatsafspraken mogelijk maakt. Tinsights bouwt websites voor garages, APK-stations en autobedrijven door heel Nederland. Op maat, betaalbaar en binnen twee weken online.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="gr-hero-btns"
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}
              >
                <Link href="/contact" className="gr-hero-btn-primary" aria-label="Gratis adviesgesprek aanvragen voor uw garage website">
                  Gratis adviesgesprek aanvragen
                </Link>
                <a href="#features" className="gr-hero-btn-secondary" aria-label="Bekijk wat Tinsights biedt voor garages">
                  Bekijk wat wij bieden
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="gr-trust-bar"
              >
                {trustItems.map((item, idx) => (
                  <Fragment key={item.text}>
                    {idx > 0 ? <span className="gr-trust-sep" aria-hidden>|</span> : null}
                    <span className="gr-trust-item">{item.text}</span>
                  </Fragment>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — mockup */}
            <div className="hidden lg:flex gr-hero-mockup-col justify-center items-start">
              <motion.div
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{ width: "100%", maxWidth: 380 }}
              >
                <div className="gr-mockup-bob">
                  <BrowserCarousel
                    slides={heroSlideData}
                    slide={heroSlide}
                    setSlide={setHeroSlide}
                    paused={heroPaused}
                    setPaused={setHeroPaused}
                    touchRef={heroTouchRef}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 2 — INTRO
══════════════════════════════════════════════════════════════════════ */

function IntroSection() {
  return (
    <>
      <style>{`
        .gr-stats-wrap {
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 40px 0;
          margin-top: 40px;
        }
        @media (min-width: 1024px) { .gr-stats-wrap { padding: 64px 0; margin-top: 48px; } }
        .gr-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (min-width: 1024px) { .gr-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .gr-stat-cell {
          border-top: 2px solid ${ORANGE};
          padding: 16px;
          background: transparent;
          box-sizing: border-box;
          min-width: 0;
        }
      `}</style>
      <section id="over" className="gr-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScaleUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 16 }}>
              Waarom online zichtbaarheid essentieel is
            </p>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.15, margin: "0 0 32px", letterSpacing: "-0.02em" }}>
              Waarom heeft uw garage een website nodig?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "Klanten zoeken tegenwoordig online naar een betrouwbare garage in hun buurt. Zonder website mist u opdrachten aan concurrenten die wel gevonden worden. Een professionele website zorgt dat u bovenaan staat wanneer iemand zoekt op \u2018garage\u2019 of \u2018APK\u2019 in uw regio.",
                "Een goede garagebedrijfwebsite laat zien welke diensten u aanbiedt, maakt het mogelijk om online afspraken in te plannen en toont uw Google reviews. Klanten weten zo direct dat u betrouwbaar bent nog voordat zij bellen.",
                "Of u nu een kleine eenpersoonswerkplaats runt of een groter garagebedrijf leidt, wij bouwen een website die past bij uw bedrijf. Inclusief mogelijkheden voor kentekencheck, werkplaatsplanning en meer.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", margin: 0 }}>{p}</p>
              ))}
            </div>
          </ScaleUp>

          <ScaleUp delay={0.08}>
            <div className="gr-stats-wrap">
              <div className="gr-stats-grid">
                {stats.map((s) => (
                  <div key={s.value} className="gr-stat-cell">
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: ORANGE, lineHeight: 1.1, marginBottom: 6 }}>{s.value}</div>
                    <div style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScaleUp>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 3 — FEATURES (2-column grid — unique layout for garage)
══════════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  return (
    <>
      <style>{`
        .gr-feat-grid {
          display: grid; grid-template-columns: 1fr; gap: 0;
        }
        @media (min-width: 768px) { .gr-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        .gr-feat-item {
          position: relative;
          padding: 16px 20px 16px 23px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          box-sizing: border-box;
        }
        .gr-feat-item::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: ${ORANGE};
        }
        .gr-feat-icon { width: 20px; height: 20px; margin-bottom: 8px; color: ${ORANGE}; display: flex; align-items: center; justify-content: flex-start; }
        .gr-feat-icon svg { width: 20px !important; height: 20px !important; flex-shrink: 0; display: block; }
      `}</style>
      <section id="features" className="gr-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScaleUp>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 14 }}>Wat wij voor u bouwen</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Wat zit er in uw website?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto" }}>
                Speciaal afgestemd op de behoeften van garages en autobedrijven.
              </p>
            </div>
          </ScaleUp>

          <div className="gr-feat-grid">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                className="gr-feat-item"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <div className="gr-feat-icon" aria-hidden>
                  <f.Icon />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.3 }}>{f.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>{f.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 4 — RDW KENTEKENCHECK DEMO (unique to garage page)
══════════════════════════════════════════════════════════════════════ */

interface RDWResult {
  kenteken?: string;
  merk?: string;
  handelsbenaming?: string;
  datum_eerste_toelating?: string;
  eerste_kleur?: string;
  vervaldatum_apk?: string;
  aantal_deuren?: string;
  voertuigsoort?: string;
  brandstof_omschrijving?: string;
}

function formatDate(d?: string): string {
  if (!d || d.length < 8) return d ?? "";
  return `${d.slice(6, 8)}-${d.slice(4, 6)}-${d.slice(0, 4)}`;
}

function KentekencheckSection() {
  const [kenteken, setKenteken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RDWResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheck() {
    const clean = kenteken.replace(/[-\s]/g, "").toUpperCase();
    if (!clean) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const url = `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${clean}`;
      const res = await fetch(url);
      const data: RDWResult[] = await res.json();
      if (data && data[0]) {
        setResult(data[0]);
      } else {
        setError("Kenteken niet gevonden. Controleer of u het kenteken correct heeft ingevoerd.");
      }
    } catch {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  const resultRows: { label: string; value: string | undefined }[] = result
    ? [
        { label: "Merk",           value: result.merk },
        { label: "Model",          value: result.handelsbenaming },
        { label: "Bouwjaar",       value: result.datum_eerste_toelating?.slice(0, 4) },
        { label: "Kleur",          value: result.eerste_kleur },
        { label: "APK vervaldatum", value: formatDate(result.vervaldatum_apk) },
        { label: "Aantal deuren",  value: result.aantal_deuren },
        { label: "Voertuigsoort",  value: result.voertuigsoort },
      ].filter((r) => r.value)
    : [];

  return (
    <section id="kentekencheck" className="gr-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <ScaleUp>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 14 }}>Inclusief in uw website</p>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              Kentekencheck op uw website
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto" }}>
              Klanten voeren hun kenteken in en zien direct hun voertuiggegevens. Volledig automatisch via de officiële RDW database.
            </p>
          </div>
        </ScaleUp>

        <ScaleUp delay={0.1}>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            {/* Kenteken input */}
            <input
              type="text"
              value={kenteken}
              onChange={(e) => setKenteken(e.target.value.toUpperCase())}
              onKeyDown={(e) => { if (e.key === "Enter") handleCheck(); }}
              placeholder="Bijv. AB-123-C"
              maxLength={9}
              aria-label="Voer uw kenteken in"
              style={{
                display: "block", width: "100%", boxSizing: "border-box",
                background: "#facc15", color: "#000",
                fontWeight: 800, fontSize: 28, textAlign: "center",
                letterSpacing: "0.18em", textTransform: "uppercase",
                borderRadius: 10, padding: "16px 24px",
                border: "4px solid #eab308",
                outline: "none", fontFamily: "inherit",
                marginBottom: 14,
              }}
            />

            {/* Check button */}
            <button
              type="button"
              onClick={handleCheck}
              disabled={loading || !kenteken.replace(/[-\s]/g, "")}
              aria-label="Kenteken controleren via RDW database"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                width: "100%", minHeight: 52, background: loading ? "rgba(249,115,22,0.6)" : ORANGE,
                color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 12,
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                transition: "background 200ms",
              }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ animation: "gr-spin 0.8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Controleren...
                </>
              ) : "Kenteken controleren"}
            </button>
            <style>{`@keyframes gr-spin { to { transform: rotate(360deg); } }`}</style>

            {/* Error */}
            {error && (
              <p style={{ color: "#fb923c", textAlign: "center", marginTop: 16, fontSize: 14, lineHeight: 1.6 }}>{error}</p>
            )}

            {/* Result */}
            {result && resultRows.length > 0 && (
              <div style={{ marginTop: 16, background: "#111827", border: `1px solid ${ORANGE_BORDER}`, borderRadius: 14, padding: "24px 24px 16px", overflow: "hidden" }}>
                {resultRows.map((row, i) => (
                  <div key={row.label}>
                    {i > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "10px 0" }} />}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{row.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", textAlign: "right" }}>{row.value}</span>
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 16, marginBottom: 0 }}>
                  Gegevens afkomstig van de officiële RDW database
                </p>
              </div>
            )}
          </div>
        </ScaleUp>

        <ScaleUp delay={0.2}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 620, margin: "40px auto 0", textAlign: "center" }}>
            Wij integreren deze kentekencheck gratis in uw website. Klanten voeren hun kenteken in bij het maken van een afspraak en alle voertuiggegevens worden automatisch ingevuld. Dit bespaart tijd en voorkomt invoerfouten.
          </p>
        </ScaleUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 5 — EXAMPLE PROJECT
══════════════════════════════════════════════════════════════════════ */

function ExampleSection() {
  const [exampleSlide, setExampleSlide] = useState(0);
  const [examplePaused, setExamplePaused] = useState(false);
  const exampleTouchRef = useRef<number | null>(null);
  const [mobileExSlide, setMobileExSlide] = useState(0);
  const [mobileExPaused, setMobileExPaused] = useState(false);
  const mobileExTouchRef = useRef<number | null>(null);

  useEffect(() => {
    if (examplePaused) return;
    const t = setInterval(() => setExampleSlide((s) => (s + 1) % exampleSlideData.length), 4000);
    return () => clearInterval(t);
  }, [examplePaused]);

  useEffect(() => {
    if (mobileExPaused) return;
    const timer = setInterval(() => {
      setMobileExSlide((s) => (s + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, [mobileExPaused]);

  return (
    <>
      <style>{`
        .gr-example-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 800px) { .gr-example-grid { grid-template-columns: 60fr 40fr; } }
        @keyframes gr-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .gr-float { animation: gr-float 4.5s ease-in-out infinite; }
        .gr-mobile-example { display: block; }
        @media (min-width: 1024px) { .gr-mobile-example { display: none; } }
        .gr-desktop-example { display: none; }
        @media (min-width: 1024px) { .gr-desktop-example { display: block; } }
      `}</style>
      <section id="voorbeeld" className="gr-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScaleUp>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 14 }}>Ons werk</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                Voorbeeld van ons werk
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto" }}>
                Zo kan uw website eruitzien. Elk project bouwen wij op maat naar uw bedrijf en huisstijl.
              </p>
            </div>
          </ScaleUp>

          <div className="gr-example-grid">
            <ScaleUp delay={0.15}>
              {/* Mobile example carousel */}
              <div
                className="gr-mobile-example w-full"
                onTouchStart={(e) => { mobileExTouchRef.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (mobileExTouchRef.current === null) return;
                  const diff = mobileExTouchRef.current - e.changedTouches[0].clientX;
                  if (diff > 40) setMobileExSlide((s) => (s + 1) % 3);
                  else if (diff < -40) setMobileExSlide((s) => (s - 1 + 3) % 3);
                  mobileExTouchRef.current = null;
                }}
              >
                <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden" }}>
                    {[
                      { src: "/assets/garage_mobile_1.png", alt: "Voorbeeld garage website op telefoon" },
                      { src: "/assets/garage_mobile_2.png", alt: "Voorbeeld garagebedrijf website op telefoon" },
                      { src: "/assets/garage_mobile_3.png", alt: "Voorbeeld autodetailing website op telefoon" },
                    ].map((slide, i) => (
                      <div key={slide.src} style={{ position: "absolute", inset: 0, opacity: mobileExSlide === i ? 1 : 0, transition: "opacity 600ms ease", zIndex: mobileExSlide === i ? 10 : 0 }}>
                        <img src={slide.src} alt={slide.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                      </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
                  {[0, 1, 2].map((i) => (
                    <button key={i} type="button" onClick={() => setMobileExSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: mobileExSlide === i ? 24 : 8, height: 8, borderRadius: 100, background: mobileExSlide === i ? "#f97316" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms", minWidth: 8 }} />
                  ))}
                </div>
              </div>
              {/* Desktop example carousel */}
              <div className="gr-desktop-example">
                <div className="gr-float">
                  <BrowserCarousel
                    slides={exampleSlideData}
                    slide={exampleSlide}
                    setSlide={setExampleSlide}
                    paused={examplePaused}
                    setPaused={setExamplePaused}
                    touchRef={exampleTouchRef}
                    showArrows
                    aspectPadding="62%"
                  />
                </div>
              </div>
            </ScaleUp>

            <ScaleUp delay={0.25}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 16 }}>Voorbeeldproject</p>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Garage AutoMec</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 24px" }}>
                Een complete website voor een modern garagebedrijf in Rotterdam. Met online werkplaatsplanning, RDW kentekencheck integratie en Google reviews. Het project was binnen 10 werkdagen live.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {exampleTags.map((tag) => (
                  <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: ORANGE, background: ORANGE_DIM, border: `1px solid ${ORANGE_BORDER}`, borderRadius: 100, padding: "5px 12px" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/projecten"
                aria-label="Bekijk meer garage website projecten van Tinsights"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", border: `1px solid ${ORANGE_BORDER}`, borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: "none" }}
              >
                Bekijk meer projecten &rarr;
              </Link>
            </ScaleUp>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 6 — PRICING
══════════════════════════════════════════════════════════════════════ */


const GR_PRICE_ACCENT = "#f97316";

const GR_PRICING_TIERS: PricingTierConfig[] = [
  {
    title: "Website Starter",
    tierIndicator: "Starter",
    description: "Voor garages die snel en professioneel online willen staan.",
    priceAmount: "€349",
    badge: false,
    highlight: false,
    features: starterFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Website Starter voor garages",
  },
  {
    title: "Professional",
    tierIndicator: "Professional",
    description: "Voor garages die meer klanten willen en slimmer willen werken.",
    priceAmount: "€699",
    badge: true,
    highlight: true,
    features: proFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Professional pakket voor garages",
  },
  {
    title: "Business Plus",
    tierIndicator: "Business Plus",
    description: "Voor garages die volledig digitaal willen werken en maximaal willen groeien.",
    priceAmount: "€1.499",
    badge: false,
    highlight: false,
    features: businessPlusFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Business Plus pakket voor garages",
  },
];

function PricingSection() {
  return (
    <BranchPricingBlock
      accentColor={GR_PRICE_ACCENT}
      sectionEyebrow="Investering"
      sectionTitle="Wat kost een website voor een garage?"
      intro="De prijs hangt af van uw wensen en functies. Onderstaande prijzen geven een indicatie. Wij denken graag vrijblijvend met u mee."
      tiers={GR_PRICING_TIERS}
      sectionClassName="gr-py-section"
      sectionStyle={{ background: BG2, borderTop: SECTION_BORDER }}
      footerBlurb={
        <>
          Twijfelt u welk pakket past? Wij denken graag vrijblijvend met u mee. De prijs kan hoger of lager uitvallen afhankelijk van uw specifieke wensen.{" "}
          <Link href="/contact" style={{ color: GR_PRICE_ACCENT, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>
            Vraag een gratis offerte aan
          </Link>
          .
        </>
      }
    />
  );
}


/* ══════════════════════════════════════════════════════════════════════
   SECTION 7 — FAQ
══════════════════════════════════════════════════════════════════════ */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .gr-faq-btn { width: 100%; padding: 14px 0; min-height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 16px; background: none; border: none; cursor: pointer; text-align: left; font-family: inherit; transition: color 180ms ease; }
        .gr-faq-q { font-size: 16px; font-weight: 700; color: #f1f5f9; margin: 0; line-height: 1.4; transition: color 200ms ease; }
        .gr-faq-chev { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 280ms cubic-bezier(0.4,0,0.2,1); color: rgba(255,255,255,0.5); font-size: 14px; }
        .gr-faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); background: transparent; }
      `}</style>
      <section id="faq" className="gr-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <ScaleUp>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, marginBottom: 14 }}>Veelgestelde vragen</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                Veelgestelde vragen over een garage website
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto" }}>
                Staat uw vraag er niet bij?{" "}
                <Link href="/contact" style={{ color: ORANGE, textDecoration: "none" }}>Neem gerust contact met ons op.</Link>
              </p>
            </div>
          </ScaleUp>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="gr-faq-item"
              >
                <button type="button" className="gr-faq-btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`gr-faq-${i}`}>
                  <h3 className="gr-faq-q" style={{ color: open === i ? ORANGE : "#f1f5f9" }}>{faq.q}</h3>
                  <span className="gr-faq-chev" aria-hidden style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </button>
                <div id={`gr-faq-${i}`} style={{ maxHeight: open === i ? 900 : 0, overflow: "hidden", transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)" }}>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: 0, paddingBottom: 16 }}>{faq.a}</p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* FAQ JSON-LD schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": { "@type": "Answer", "text": f.a },
                })),
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 8 — INTERNAL LINKS
══════════════════════════════════════════════════════════════════════ */

function InternalLinksSection() {
  return (
    <>
      <style>{`
        .gr-internal-wrap { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .gr-internal-pill {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 10px 24px;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: border-color 0.2s ease, color 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          box-sizing: border-box;
        }
        .gr-internal-pill:hover { border-color: ${ORANGE}; color: #fff; }
      `}</style>
      <section className="gr-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScaleUp>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#f1f5f9", textAlign: "center", margin: "0 0 28px", letterSpacing: "-0.02em" }}>
              Wij bouwen ook websites voor andere branches
            </h2>
          </ScaleUp>
          <nav className="gr-internal-wrap" aria-label="Andere branches">
            {internalLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}>
                <Link href={link.href} className="gr-internal-pill" aria-label={link.label}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 9 — BOTTOM CTA
══════════════════════════════════════════════════════════════════════ */

function BottomCTASection() {
  return (
    <>
      <style>{`
        .gr-cta-grid { display: grid; gap: 32px; align-items: center; text-align: left; max-width: 100%; }
        .gr-cta-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .gr-cta-grid { grid-template-columns: 60fr 40fr; gap: 48px; } }
        .gr-cta-buttons { display: flex; flex-direction: column; gap: 12px; align-items: stretch; width: 100%; max-width: 100%; box-sizing: border-box; }
        .gr-cta-btn-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: #25d366; color: #fff; font-size: 15px; font-weight: 700; padding: 0 28px; border-radius: 8px; text-decoration: none; box-shadow: none; transition: opacity 180ms; }
        .gr-cta-btn-wa:hover { opacity: 0.9; }
        .gr-cta-btn-mail {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: transparent; color: rgba(255,255,255,0.92);
          font-size: 15px; font-weight: 600; padding: 0 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); text-decoration: none;
          transition: border-color 200ms, background 200ms;
        }
        .gr-cta-btn-mail:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
        .gr-cta-btn-tel { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: transparent; color: rgba(255,255,255,0.92); font-size: 15px; font-weight: 600; padding: 0 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); text-decoration: none; transition: border-color 200ms, background 200ms; }
        .gr-cta-btn-tel:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
      `}</style>
      <section className="gr-py-section" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #1c1408 0%, #2a1e06 40%, #1a1b4b 100%)", textAlign: "left", borderTop: SECTION_BORDER }}>
        <ScaleUp>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0", width: "100%", boxSizing: "border-box" }}>
            <div className="gr-cta-grid">
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, margin: "0 0 16px" }}>Klaar om te starten?</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Klaar voor uw nieuwe garage website?
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.68)", margin: 0 }}>
                  Vertel ons over uw garagebedrijf. Wij reageren binnen 24 uur met een vrijblijvend advies en prijsindicatie. Geen verplichtingen.
                </p>
              </div>
              <div className="gr-cta-buttons">
                <a href="https://wa.me/31619181483" target="_blank" rel="noopener noreferrer" className="gr-cta-btn-wa" aria-label="Stuur een WhatsApp bericht naar Tinsights over uw garage website">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
                <a href="mailto:info@tinsights.nl" className="gr-cta-btn-mail" aria-label="Stuur een e-mail naar Tinsights over uw garage website">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                  E-mail sturen
                </a>
                <a href="tel:0853696652" className="gr-cta-btn-tel" aria-label="Bel Tinsights op 085 369 6652">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  085 - 369 6652
                </a>
              </div>
            </div>
          </div>
        </ScaleUp>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════ */

export default function GaragePageContent() {
  return (
    <main className="branch-landing-root" style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", background: BG1, color: "#f1f5f9", overflowX: "hidden", boxSizing: "border-box" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .branch-landing-root { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        .branch-landing-root section { width: 100%; max-width: 100%; box-sizing: border-box; }
        .gr-py-section { padding: 40px 24px; margin: 0; box-sizing: border-box; }
        @media (min-width: 1024px) { .gr-py-section { padding: 64px 24px; } }
      `}</style>
      <Navbar />
      <BranchLandingBreadcrumb currentLabel="Website voor garages" />
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <KentekencheckSection />
      <ExampleSection />
      <PricingSection />
      <FAQSection />
      <InternalLinksSection />
      <BottomCTASection />
      <Footer />
    </main>
  );
}

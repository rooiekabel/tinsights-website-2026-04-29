"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchLandingBreadcrumb from "@/components/BranchLandingBreadcrumb";
import Image from "next/image";
import Link from "next/link";
import BranchPricingBlock, { type PricingTierConfig } from "@/components/BranchPricingBlock";

const AMBER = "#f59e0b";
const AMBER_DIM = "rgba(245,158,11,0.12)";
const AMBER_BORDER = "rgba(245,158,11,0.28)";
const BG1 = "#0a0f1e";
const BG2 = "#0d1117";
const SECTION_BORDER = "1px solid rgba(255,255,255,0.06)";

/* ── ANIMATION HELPERS ─────────────────────────────────────────────── */

function SlideIn({
  children,
  from = "left",
  delay = 0,
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
}) {
  const x = from === "left" ? -40 : 40;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function FadeInUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconPhoto() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
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
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
function IconCamera() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/* ── DATA ───────────────────────────────────────────────────────────── */

const features = [
  { Icon: IconCalendar, title: "Online reserveringssysteem", text: "Gasten reserveren direct via uw website, dag en nacht. U ontvangt automatisch een bevestiging. Geen gemiste telefoontjes meer tijdens de service." },
  { Icon: IconMenu, title: "Digitaal menu", text: "Uw menukaart altijd up-to-date op uw website. Eenvoudig zelf aan te passen. Geen drukkosten meer voor elke menuwijziging." },
  { Icon: IconPhoto, title: "Sfeervolle fotogalerij", text: "Toon uw gerechten, interieur en sfeer. Professionele beelden op uw website geven gasten een goede indruk nog voordat zij binnenstappen." },
  { Icon: IconStar, title: "Reviews integratie", text: "Toon uw Google reviews automatisch. Positieve beoordelingen overtuigen nieuwe gasten om bij u te reserveren." },
  { Icon: IconMobile, title: "Mobiel geoptimaliseerd", text: "Meer dan 80% van uw gasten zoekt via de telefoon. Uw website werkt perfect op elk apparaat: snel, overzichtelijk en gebruiksvriendelijk." },
  { Icon: IconSearch, title: "Gevonden worden in Google", text: "Uw website wordt technisch en inhoudelijk geoptimaliseerd voor zoekmachines. Zo verschijnt u bovenaan wanneer iemand zoekt op ‘restaurant in uw stad’." },
];

const starterFeatures = [
  "Tot 3 pagina’s", "Modern maatwerk design", "Contactformulier", "Digitaal menu",
  "Mobiel geoptimaliseerd", "Basis SEO (gevonden worden in Google)", "SSL beveiliging (veilige verbinding, het slotje in de browser)",
  "Binnen 5 tot 7 dagen online", "2 weken support",
];

const proFeatures = [
  "3 tot 5 pagina’s", "Volledig maatwerk design", "Online reserveringssysteem",
  "Digitale menukaart", "Fotogalerij", "Google Reviews integratie",
  "Uitgebreide SEO", "CMS (beheerpaneel om zelf aanpassingen te maken)", "1 maand support",
];

const exampleTags = ["Online reserveringen", "Digitaal menu", "Fotogalerij", "SEO geoptimaliseerd"];

const faqs = [
  { q: "Hoe lang duurt het bouwen van mijn website?", a: "Gemiddeld bouwen wij een website voor een restaurant binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag. Spoedopdrachten zijn in overleg mogelijk." },
  { q: "Kan ik zelf mijn menukaart aanpassen?", a: "Ja. Wij leveren uw website op met een gebruiksvriendelijk beheerpaneel waarmee u zelf uw menukaart, prijzen en gerechten kunt aanpassen, zonder technische kennis. Wijzigingen zijn direct live op uw website." },
  { q: "Heb ik een online reserveringssysteem nodig?", a: "Dit is niet verplicht maar sterk aan te raden. Gasten reserveren steeds vaker online en verwachten dit van een professioneel restaurant. Een online reserveringssysteem verhoogt uw bezetting merkbaar en bespaart u tijd aan de telefoon." },
  { q: "Werken jullie ook buiten Groningen?", a: "Wij werken volledig op afstand en bedienen klanten door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden. Afstand is geen enkel probleem. Alles wordt digitaal afgestemd." },
  { q: "Kan mijn website ook in meerdere talen?", a: "Ja, wij bouwen meertalige websites voor restaurants die internationale gasten ontvangen. Denk aan een Nederlandse en Engelse versie, of andere talen op aanvraag. Neem contact op voor de mogelijkheden." },
  { q: "Kan mijn website later uitgebreid worden?", a: "Zeker. Wij bouwen websites die eenvoudig uit te breiden zijn. Wilt u later een webshop voor cadeaubonnen, een bezorgmodule of extra pagina’s laten toevoegen? Dat regelen wij zonder problemen." },
];

const internalLinks = [
  { label: "Website voor kappers", href: "/website-laten-maken-kapper" },
  { label: "Website voor garages", href: "/website-laten-maken-garage" },
  { label: "Website voor hoveniers", href: "/website-laten-maken-hovenierbedrijf" },
  { label: "Website voor tandartsen", href: "/website-laten-maken-tandarts" },
];

const stats = [
  { value: "70%", label: "Van restaurantbezoekers zoekt eerst online voordat zij reserveren" },
  { value: "3x", label: "Meer reserveringen met een online boekingssysteem" },
  { value: "80%", label: "Van uw bezoekers komt via de telefoon" },
  { value: "24/7", label: "Bereikbaar voor reserveringen, ook buiten openingstijden" },
];

const rsTrustTexts = ["4.9/5 Google Reviews", "Binnen 2 weken online", "Vaste prijs, geen verrassingen", "Heel Nederland"];

/* ══════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO (two-column on desktop, warm amber gradient)
══════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTouchRef = useRef<number | null>(null);

  const heroSlides = [
    { src: "/assets/restaurant_mockup.png",  alt: "Voorbeeld restaurant website donker thema",  url: "www.restaurant-signature.nl", label: "Stijl A — Donker & Sfeervol" },
    { src: "/assets/restaurant_mockup2.png", alt: "Voorbeeld restaurant website sfeervol thema", url: "www.foores-restaurant.nl",      label: "Stijl B — Elegant & Modern" },
    { src: "/assets/restaurant_mockup3.png", alt: "Voorbeeld restaurant website modern thema",   url: "www.restaurant-voorbeeld.nl",  label: "Stijl C — Strak & Professioneel" },
  ];

  useEffect(() => {
    if (heroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((s) => (s + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroPaused]);

  return (
    <>
      <style>{`
        .rs-hero-btn-primary {
          display: inline-flex; align-items: center; min-height: 52px; padding: 0 32px;
          background: #f59e0b; color: #000; border-radius: 100px;
          font-weight: 700; font-size: 15px; text-decoration: none; white-space: nowrap;
          box-shadow: 0 4px 24px rgba(245,158,11,0.35);
          transition: background 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        }
        .rs-hero-btn-primary:hover { background: #fbbf24; box-shadow: 0 8px 36px rgba(245,158,11,0.5); transform: translateY(-2px); }
        .rs-hero-btn-secondary {
          display: inline-flex; align-items: center; min-height: 52px; padding: 0 28px;
          background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(255,255,255,0.2); border-radius: 100px;
          font-weight: 600; font-size: 15px; text-decoration: none; white-space: nowrap;
          transition: border-color 200ms, background 200ms;
        }
        .rs-hero-btn-secondary:hover { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.08); }
        @media (max-width: 1023px) {
          .rs-hero-btns { flex-direction: column !important; align-items: stretch !important; }
          .rs-hero-btn-primary, .rs-hero-btn-secondary {
            justify-content: center !important;
            width: 100% !important;
            max-width: 100% !important;
            white-space: normal !important;
            box-sizing: border-box;
            text-align: center;
          }
        }
        /* Hero two-column layout */
        .rs-hero-inner {
          display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;
          width: 100%; max-width: 100%; box-sizing: border-box;
        }
        .rs-hero-inner > * { min-width: 0; }
        @media (min-width: 1024px) {
          .rs-hero-inner { grid-template-columns: 55fr 45fr; gap: 64px; }
        }
        .rs-hero-text-col { text-align: center; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box; }
        @media (min-width: 1024px) { .rs-hero-text-col { text-align: left; } }
        /* Slow bob animation — no rotation */
        @keyframes rs-hero-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .rs-hero-mockup-frame {
          animation: rs-hero-bob 4s ease-in-out infinite;
          border-radius: 12px; overflow: hidden;
          background: #1a1f2e;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 60px rgba(251,146,60,0.15), 0 8px 32px rgba(0,0,0,0.5);
          width: 100%;
        }
        /* Trust bar — single row with pipe separators */
        .rs-trust-bar {
          display: flex; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;
          gap: 0; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08);
          -webkit-overflow-scrolling: touch; justify-content: flex-start; align-items: center;
          white-space: nowrap; -ms-overflow-style: none;
          width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box;
        }
        .rs-trust-bar::-webkit-scrollbar { display: none; }
        .rs-trust-sep {
          flex-shrink: 0; padding: 0 12px; color: rgba(255,255,255,0.35); font-size: 13px; font-weight: 400;
        }
        .rs-trust-item { flex-shrink: 0; font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 500; line-height: 1.35; padding: min(48px - 13px * 1.35, 12px) 0; }
      `}</style>

      <section id="home" style={{ position: "relative", background: BG1, overflow: "hidden", paddingTop: 48, paddingBottom: 80, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
        {/* Warm amber radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(251,146,60,0.2) 0%, transparent 65%)", pointerEvents: "none" }} aria-hidden="true" />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: `linear-gradient(to top, ${BG1}, transparent)`, pointerEvents: "none" }} aria-hidden="true" />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
          <div className="rs-hero-inner">

            {/* LEFT — text */}
            <div className="rs-hero-text-col">
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: 20 }}
              >
                Webdesign voor restaurants &amp; horeca
              </motion.p>

              <motion.h1
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.08, margin: "0 0 22px", letterSpacing: "-0.03em", overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                Professionele{" "}
                <span style={{ background: "linear-gradient(135deg, #f59e0b, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  website laten maken
                </span>{" "}
                voor uw restaurant
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: "0 0 36px", maxWidth: 520, overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                Een stijlvolle, snelle website die gasten aantrekt en online reserveringen mogelijk maakt.
                Tinsights bouwt websites voor restaurants, eetcafés en horecazaken door heel
                Nederland. Op maat, betaalbaar en binnen twee weken online.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="rs-hero-btns"
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}
              >
                <Link href="/contact" className="rs-hero-btn-primary" aria-label="Gratis adviesgesprek aanvragen voor uw restaurant website">
                  Gratis adviesgesprek aanvragen
                </Link>
                <a href="#features" className="rs-hero-btn-secondary" aria-label="Bekijk wat Tinsights biedt voor restaurants">
                  Bekijk wat wij bieden
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="rs-trust-bar"
              >
                {rsTrustTexts.map((text, idx) => (
                  <Fragment key={text}>
                    {idx > 0 ? <span className="rs-trust-sep" aria-hidden>|</span> : null}
                    <span className="rs-trust-item">{text}</span>
                  </Fragment>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — floating mockup (desktop only) */}
            <div className="hidden lg:flex rs-hero-mockup-col justify-center items-start">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{ width: "100%", maxWidth: 560 }}
              >
                <div
                  className="rs-hero-mockup-frame"
                  onMouseEnter={() => setHeroPaused(true)}
                  onMouseLeave={() => setHeroPaused(false)}
                  onTouchStart={(e) => { heroTouchRef.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (heroTouchRef.current === null) return;
                    const diff = heroTouchRef.current - e.changedTouches[0].clientX;
                    if (diff > 50) setHeroSlide((s) => (s + 1) % 3);
                    else if (diff < -50) setHeroSlide((s) => (s - 1 + 3) % 3);
                    heroTouchRef.current = null;
                  }}
                >
                  {/* Browser top bar */}
                  <div style={{ height: 32, background: "#1a1f2e", display: "flex", alignItems: "center", padding: "0 12px", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
                    </div>
                    <div style={{ flex: 1, margin: "0 8px", height: 20, background: "rgba(255,255,255,0.1)", borderRadius: 100, display: "flex", alignItems: "center", padding: "0 12px", overflow: "hidden" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "opacity 300ms" }}>
                        {heroSlides[heroSlide].url}
                      </span>
                    </div>
                  </div>
                  {/* Image area — fixed height */}
                  <div style={{ position: "relative", width: "100%", height: "320px", overflow: "hidden" }}>
                    {heroSlides.map((slide, i) => (
                      <div
                        key={slide.src}
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: heroSlide === i ? 1 : 0,
                          zIndex: heroSlide === i ? 10 : 0,
                          transition: "opacity 700ms ease-in-out",
                        }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          priority
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                          sizes="560px"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation dots */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setHeroSlide(i)}
                      aria-label={`Ga naar slide ${i + 1}`}
                      style={{
                        width: heroSlide === i ? 24 : 8,
                        height: 8,
                        borderRadius: 100,
                        background: heroSlide === i ? "#f59e0b" : "rgba(255,255,255,0.2)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 300ms",
                        minWidth: 8,
                      }}
                    />
                  ))}
                </div>
                {/* Slide label */}
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "8px 0 0", fontStyle: "italic" }}>
                  {heroSlides[heroSlide].label}
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 2 — INTRO (two-column: text + stats)
══════════════════════════════════════════════════════════════════════ */

function IntroSection() {
  return (
    <>
      <style>{`
        .rs-stats-wrap {
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 40px 0;
          margin-top: 40px;
        }
        @media (min-width: 1024px) { .rs-stats-wrap { padding: 64px 0; margin-top: 48px; } }
        .rs-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (min-width: 1024px) { .rs-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .rs-stat-cell {
          border-top: 2px solid ${AMBER};
          padding: 16px;
          background: transparent;
          box-sizing: border-box;
          min-width: 0;
        }
      `}</style>
      <section id="over" className="rs-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SlideIn from="left">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: 16 }}>
              Waarom online zichtbaarheid essentieel is
            </p>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.15, margin: "0 0 32px", letterSpacing: "-0.02em" }}>
              Waarom heeft uw restaurant een website nodig?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "Gasten zoeken online naar een restaurant voordat zij reserveren. Zonder professionele website mist u reserveringen aan concurrenten die wél online vindbaar zijn. Een goede website is uw digitale etalage, open 24 uur per dag, 7 dagen per week.",
                "Een website voor uw restaurant doet meer dan alleen informatie tonen. Het stelt gasten in staat direct online te reserveren, uw menu te bekijken en sfeerbeelden te zien van uw zaak. Dit verlaagt de drempel om te komen en verhoogt uw bezetting.",
                "Of u nu een klein eetcafé runt of een groter restaurant beheert: wij bouwen een website die past bij uw concept en uitstraling. Van modern en minimalistisch tot warm en sfeervol. Altijd geoptimaliseerd voor Google en mobiele bezoekers.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", margin: 0 }}>{p}</p>
              ))}
            </div>
          </SlideIn>

          <SlideIn from="right" delay={0.06}>
            <div className="rs-stats-wrap">
              <div className="rs-stats-grid">
                {stats.map((stat) => (
                  <div key={stat.value} className="rs-stat-cell">
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: AMBER, lineHeight: 1.1, marginBottom: 6 }}>{stat.value}</div>
                    <div style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 3 — FEATURES (horizontal scroll mobile, grid desktop)
══════════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  return (
    <>
      <style>{`
        .rs-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) { .rs-features-grid { grid-template-columns: repeat(2, 1fr); } }
        .rs-feat-item {
          position: relative;
          padding: 16px 20px 16px 23px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          box-sizing: border-box;
        }
        .rs-feat-item::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: ${AMBER};
        }
        .rs-feat-icon { width: 20px; height: 20px; margin-bottom: 8px; color: ${AMBER}; display: flex; align-items: center; justify-content: flex-start; }
        .rs-feat-icon svg { width: 20px !important; height: 20px !important; flex-shrink: 0; display: block; }
      `}</style>
      <section id="features" className="rs-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeInUp>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: 14 }}>Wat wij voor u bouwen</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Wat zit er in uw website?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto" }}>
                Speciaal afgestemd op de behoeften van restaurants en horecazaken.
              </p>
            </div>
          </FadeInUp>

          <div className="rs-features-grid">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                className="rs-feat-item"
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <div className="rs-feat-icon" aria-hidden>
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
   SECTION 4 — EXAMPLE PROJECT (real image carousel)
══════════════════════════════════════════════════════════════════════ */

function ExampleSection() {
  const [exampleSlide, setExampleSlide] = useState(0);
  const [examplePaused, setExamplePaused] = useState(false);
  const exampleTouchRef = useRef<number | null>(null);

  const exampleSlides = [
    { src: "/assets/restaurant_mockup.png",  alt: "Voorbeeld restaurant website donker thema",  url: "www.restaurant-signature.nl", label: "Stijl A — The Signature" },
    { src: "/assets/restaurant_mockup2.png", alt: "Voorbeeld restaurant website sfeervol thema", url: "www.foores-restaurant.nl",      label: "Stijl B — Foores Restaurant" },
    { src: "/assets/restaurant_mockup3.png", alt: "Voorbeeld restaurant website modern thema",   url: "www.restaurant-modern.nl",     label: "Stijl C — Modern Food" },
  ];

  useEffect(() => {
    if (examplePaused) return;
    const timer = setInterval(() => {
      setExampleSlide((s) => (s + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, [examplePaused]);

  const [mobileExSlide, setMobileExSlide] = useState(0);
  const [mobileExPaused, setMobileExPaused] = useState(false);
  const mobileExTouchRef = useRef<number | null>(null);

  useEffect(() => {
    if (mobileExPaused) return;
    const timer = setInterval(() => {
      setMobileExSlide((s) => (s + 1) % 2);
    }, 4000);
    return () => clearInterval(timer);
  }, [mobileExPaused]);

  return (
    <>
      <style>{`
        .rs-example-grid {
          display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;
        }
        @media (min-width: 800px) { .rs-example-grid { grid-template-columns: 55fr 45fr; } }
        .rs-browser {
          background: #1a1f2e; border-radius: 14px; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
        }
        .rs-browser-bar {
          background: #252c3d; padding: 11px 16px; display: flex;
          align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .rs-browser-dots { display: flex; gap: 6px; }
        .rs-browser-dot { width: 11px; height: 11px; border-radius: 50%; }
        .rs-browser-url {
          flex: 1; background: rgba(0,0,0,0.35); border-radius: 6px; padding: 5px 12px;
          font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: opacity 300ms;
        }
        @keyframes rs-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .rs-floating { animation: rs-bob 4.5s ease-in-out infinite; }
        /* Arrow buttons */
        .rs-carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; min-width: 44px; min-height: 44px;
          border-radius: 50%; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 20; border: none; color: rgba(255,255,255,0.8);
          transition: background 200ms; padding: 0;
        }
        .rs-carousel-arrow:hover { background: rgba(0,0,0,0.85); }
        .rs-carousel-arrow-left { left: 8px; }
        .rs-carousel-arrow-right { right: 8px; }
        .rs-mobile-example { display: block; }
        @media (min-width: 1024px) { .rs-mobile-example { display: none; } }
        .rs-desktop-example { display: none; }
        @media (min-width: 1024px) { .rs-desktop-example { display: block; } }
      `}</style>

      <section id="voorbeeld" className="rs-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeInUp>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: 14 }}>Ons werk</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                Voorbeeld van ons werk
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto" }}>
                Zo kan uw website eruitzien. Elk project bouwen wij op maat naar uw concept en huisstijl.
              </p>
            </div>
          </FadeInUp>

          <div className="rs-example-grid">
            <SlideIn from="left" delay={0.3}>
              {/* Mobile example carousel */}
              <div
                className="rs-mobile-example w-full"
                onTouchStart={(e) => { mobileExTouchRef.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (mobileExTouchRef.current === null) return;
                  const diff = mobileExTouchRef.current - e.changedTouches[0].clientX;
                  if (diff > 40) setMobileExSlide((s) => (s + 1) % 2);
                  else if (diff < -40) setMobileExSlide((s) => (s - 1 + 2) % 2);
                  mobileExTouchRef.current = null;
                }}
              >
                <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden" }}>
                    {[
                      { src: "/assets/restaurant_mobile_1.png", alt: "Voorbeeld restaurant website op telefoon" },
                      { src: "/assets/restaurant_mobile_2.png", alt: "Voorbeeld horecazaak website op telefoon" },
                    ].map((slide, i) => (
                      <div key={slide.src} style={{ position: "absolute", inset: 0, opacity: mobileExSlide === i ? 1 : 0, transition: "opacity 600ms ease", zIndex: mobileExSlide === i ? 10 : 0 }}>
                        <img src={slide.src} alt={slide.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                      </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
                  {[0, 1].map((i) => (
                    <button key={i} type="button" onClick={() => setMobileExSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: mobileExSlide === i ? 24 : 8, height: 8, borderRadius: 100, background: mobileExSlide === i ? "#f59e0b" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms", minWidth: 8 }} />
                  ))}
                </div>
              </div>

              <div className="rs-desktop-example">
              <div
                className="rs-floating"
                role="region"
                aria-label="Voorbeeld restaurant website carousel"
                onMouseEnter={() => setExamplePaused(true)}
                onMouseLeave={() => setExamplePaused(false)}
                onTouchStart={(e) => { exampleTouchRef.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (exampleTouchRef.current === null) return;
                  const diff = exampleTouchRef.current - e.changedTouches[0].clientX;
                  if (diff > 50) setExampleSlide((s) => (s + 1) % 3);
                  else if (diff < -50) setExampleSlide((s) => (s - 1 + 3) % 3);
                  exampleTouchRef.current = null;
                }}
              >
                <div className="rs-browser">
                  <div className="rs-browser-bar">
                    <div className="rs-browser-dots">
                      <div className="rs-browser-dot" style={{ background: "#ff5f57" }} />
                      <div className="rs-browser-dot" style={{ background: "#febc2e" }} />
                      <div className="rs-browser-dot" style={{ background: "#28c840" }} />
                    </div>
                    <div className="rs-browser-url">{exampleSlides[exampleSlide].url}</div>
                  </div>
                  {/* Image carousel area */}
                  <div style={{ position: "relative", width: "100%", height: "380px", background: "#0c1018", overflow: "hidden" }}>
                    {exampleSlides.map((slide, i) => (
                      <div
                        key={slide.src}
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: exampleSlide === i ? 1 : 0,
                          zIndex: exampleSlide === i ? 10 : 0,
                          transition: "opacity 700ms ease-in-out",
                        }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          priority
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                          sizes="(max-width: 800px) 100vw, 55vw"
                        />
                      </div>
                    ))}
                    {/* Arrow buttons */}
                    <button
                      type="button"
                      className="rs-carousel-arrow rs-carousel-arrow-left"
                      onClick={() => setExampleSlide((s) => (s - 1 + 3) % 3)}
                      aria-label="Vorige slide"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="rs-carousel-arrow rs-carousel-arrow-right"
                      onClick={() => setExampleSlide((s) => (s + 1) % 3)}
                      aria-label="Volgende slide"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Navigation dots */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                  {exampleSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setExampleSlide(i)}
                      aria-label={`Ga naar slide ${i + 1}`}
                      style={{
                        width: exampleSlide === i ? 24 : 8,
                        height: 8,
                        borderRadius: 100,
                        background: exampleSlide === i ? "#f59e0b" : "rgba(255,255,255,0.2)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 300ms",
                        minWidth: 8,
                      }}
                    />
                  ))}
                </div>
                {/* Slide label */}
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "8px 0 0", fontStyle: "italic" }}>
                  {exampleSlides[exampleSlide].label}
                </p>
              </div>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.3}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: 16 }}>Voorbeeldproject</p>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Ristorante La Vita</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 24px" }}>
                Een stijlvolle website voor een Italiaans restaurant in Amsterdam. Met online
                reserveringssysteem, digitale menukaart en sfeervolle fotogalerij. Het project was
                binnen 12 werkdagen live.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {exampleTags.map((tag) => (
                  <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: AMBER, background: AMBER_DIM, border: `1px solid ${AMBER_BORDER}`, borderRadius: 100, padding: "5px 12px" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/projecten" aria-label="Bekijk meer restaurant website projecten van Tinsights"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", border: `1px solid ${AMBER_BORDER}`, borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Bekijk meer projecten &rarr;
              </Link>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 5 — PRICING (3 tiers)
══════════════════════════════════════════════════════════════════════ */

const businessPlusRestaurant = [
  "Alles uit Professional",
  "Volledig maatwerk design",
  "Admin dashboard op maat",
  "Reserveringsbeheer systeem",
  "Online betalingen & cadeaubonnen",
  "Automatische bevestigingsmails",
  "Uitgebreide analytics & rapportages",
  "Koppeling met kassasysteem (op aanvraag)",
  "3 maanden support",
  "Prioriteit bij aanpassingen",
];


const RS_PRICE_ACCENT = "#d97706";

const RS_PRICING_TIERS: PricingTierConfig[] = [
  {
    title: "Website Starter",
    tierIndicator: "Starter",
    description: "Voor horecazaken die snel en professioneel online willen staan.",
    priceAmount: "€349",
    badge: false,
    highlight: false,
    features: starterFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Website Starter voor restaurants",
  },
  {
    title: "Professional",
    tierIndicator: "Professional",
    description: "Voor restaurants die meer willen: meer gasten, meer reserveringen, meer omzet.",
    priceAmount: "€699",
    badge: true,
    highlight: true,
    features: proFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Professional pakket voor restaurants",
  },
  {
    title: "Business Plus",
    tierIndicator: "Business Plus",
    description: "Voor restaurants die volledig digitaal willen werken en maximaal willen groeien.",
    priceAmount: "€1.499",
    badge: false,
    highlight: false,
    features: businessPlusRestaurant,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Business Plus pakket voor restaurants",
  },
];

function PricingSection() {
  return (
    <BranchPricingBlock
      accentColor={RS_PRICE_ACCENT}
      sectionEyebrow="Investering"
      sectionTitle="Wat kost een website voor een restaurant?"
      intro="De prijs hangt af van uw wensen en de functies die u nodig heeft."
      tiers={RS_PRICING_TIERS}
      sectionClassName="rs-py-section"
      sectionStyle={{ background: BG1, borderTop: SECTION_BORDER }}
      footerBlurb={
        <>
          Twijfelt u welk pakket past bij uw situatie? Wij denken graag vrijblijvend met u mee. De prijs kan hoger of lager uitvallen afhankelijk van uw specifieke wensen.{" "}
          <Link href="/contact" style={{ color: RS_PRICE_ACCENT, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>
            Vraag een gratis offerte aan
          </Link>
          .
        </>
      }
    />
  );
}



/* ══════════════════════════════════════════════════════════════════════
   SECTION 6 — FAQ (inline accordion with useState)
══════════════════════════════════════════════════════════════════════ */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .rs-faq-btn {
          width: 100%; padding: 14px 0; min-height: 48px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          background: none; border: none; cursor: pointer; text-align: left; font-family: inherit;
        }
        .rs-faq-q { font-size: 16px; font-weight: 700; margin: 0; line-height: 1.4; transition: color 200ms ease; }
        .rs-faq-chev { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 280ms cubic-bezier(0.4,0,0.2,1); color: rgba(255,255,255,0.5); font-size: 14px; }
        .rs-faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); background: transparent; }
      `}</style>
      <section id="faq" className="rs-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeInUp>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, marginBottom: 14 }}>Veelgestelde vragen</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                Veelgestelde vragen over een restaurant website
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto" }}>
                Heeft u een vraag die hier niet tussen staat?{" "}
                <Link href="/contact" style={{ color: AMBER, textDecoration: "none" }}>Neem gerust contact met ons op.</Link>
              </p>
            </div>
          </FadeInUp>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="rs-faq-item"
              >
                <button type="button" className="rs-faq-btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`rs-faq-${i}`}>
                  <h3 className="rs-faq-q" style={{ color: open === i ? AMBER : "#f1f5f9" }}>{faq.q}</h3>
                  <span className="rs-faq-chev" aria-hidden style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </button>
                <div id={`rs-faq-${i}`} style={{ maxHeight: open === i ? 900 : 0, overflow: "hidden", transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)" }}>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: 0, paddingBottom: 16 }}>{faq.a}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 7 — INTERNAL LINKS
══════════════════════════════════════════════════════════════════════ */

function InternalLinksSection() {
  return (
    <>
      <style>{`
        .rs-internal-wrap { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .rs-internal-pill {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 10px 24px; font-size: 14px;
          color: rgba(255,255,255,0.75); text-decoration: none; transition: border-color 0.2s ease, color 0.2s ease;
          display: inline-flex; align-items: center; justify-content: center; min-height: 48px; box-sizing: border-box;
        }
        .rs-internal-pill:hover { border-color: ${AMBER}; color: #fff; }
      `}</style>
      <section className="rs-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeInUp>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#f1f5f9", textAlign: "center", margin: "0 0 28px", letterSpacing: "-0.02em" }}>
              Wij bouwen ook websites voor andere branches
            </h2>
          </FadeInUp>
          <nav className="rs-internal-wrap" aria-label="Andere branches">
            {internalLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}>
                <Link href={link.href} className="rs-internal-pill" aria-label={link.label}>
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
   SECTION 8 — BOTTOM CTA
══════════════════════════════════════════════════════════════════════ */

function BottomCTASection() {
  return (
    <>
      <style>{`
        .rs-cta-grid { display: grid; gap: 32px; align-items: center; text-align: left; max-width: 100%; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .rs-cta-grid { grid-template-columns: 60fr 40fr; gap: 48px; } }
        .rs-cta-buttons { display: flex; flex-direction: column; gap: 12px; align-items: stretch; width: 100%; }
        .rs-cta-wrap {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1c1408 0%, #2a1e06 40%, #1a1b4b 100%);
          text-align: left; border-top: ${SECTION_BORDER};
        }
        .rs-cta-btn-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: #25d366; color: #fff; font-size: 15px; font-weight: 700; padding: 0 28px; border-radius: 8px; text-decoration: none; transition: opacity 180ms; }
        .rs-cta-btn-wa:hover { opacity: 0.9; }
        .rs-cta-btn-mail {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px;
          background: transparent; color: rgba(255,255,255,0.92); font-size: 15px; font-weight: 600;
          padding: 0 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); text-decoration: none;
          transition: border-color 200ms, background 200ms;
        }
        .rs-cta-btn-mail:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
        .rs-cta-btn-tel { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: transparent; color: rgba(255,255,255,0.92); font-size: 15px; font-weight: 600; padding: 0 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); text-decoration: none; transition: border-color 200ms, background 200ms; }
        .rs-cta-btn-tel:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
      `}</style>
      <section className="rs-cta-wrap rs-py-section">
        <FadeInUp>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", boxSizing: "border-box", width: "100%" }}>
            <div className="rs-cta-grid">
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: AMBER, margin: "0 0 16px" }}>
                  Klaar om te starten?
                </p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Klaar voor uw nieuwe restaurantwebsite?
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.68)", margin: 0 }}>
                  Vertel ons over uw horecazaak. Wij reageren binnen 24 uur met een vrijblijvend advies
                  en prijsindicatie. Geen verplichtingen.
                </p>
              </div>
              <div className="rs-cta-buttons">
              <a href="https://wa.me/31619181483" target="_blank" rel="noopener noreferrer" className="rs-cta-btn-wa" aria-label="Stuur een WhatsApp bericht naar Tinsights over uw restaurant website">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a href="mailto:info@tinsights.nl" className="rs-cta-btn-mail" aria-label="Stuur een e-mail naar Tinsights over uw restaurant website">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                E-mail sturen
              </a>
              <a href="tel:0853696652" className="rs-cta-btn-tel" aria-label="Bel Tinsights op 085 369 6652">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                085 - 369 6652
              </a>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════ */

export default function RestaurantPageContent() {
  return (
    <main className="branch-landing-root" style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", background: BG1, color: "#f1f5f9", overflowX: "hidden", boxSizing: "border-box" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .branch-landing-root { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        .branch-landing-root section { width: 100%; max-width: 100%; box-sizing: border-box; }
        .rs-py-section { padding: 40px 24px; margin: 0; box-sizing: border-box; }
        @media (min-width: 1024px) { .rs-py-section { padding: 64px 24px; } }
      `}</style>
      <Navbar />
      <BranchLandingBreadcrumb currentLabel="Website voor restaurants" />
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <ExampleSection />
      <PricingSection />
      <FAQSection />
      <InternalLinksSection />
      <BottomCTASection />
      <Footer />
    </main>
  );
}

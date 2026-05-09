"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchLandingBreadcrumb from "@/components/BranchLandingBreadcrumb";
import Link from "next/link";
import KapperFAQ from "./KapperFAQ";
import BranchPricingBlock, { type PricingTierConfig } from "@/components/BranchPricingBlock";

const ACCENT = "#6366f1";
const BG1 = "#0a0f1e";
const BG2 = "#0d1117";
const SECTION_BORDER = "1px solid rgba(255,255,255,0.06)";

/* ── REUSABLE ANIMATION WRAPPER ────────────────────────────────────── */

function FadeUp({
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
      initial={{ opacity: 0, y: 30 }}
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconGallery() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconMobile() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
function IconCamera() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/* ── DATA ───────────────────────────────────────────────────────────── */

const features = [
  {
    Icon: IconCalendar,
    title: "Online afsprakensysteem",
    text: "Klanten boeken zelf een afspraak via uw website, dag en nacht. U ontvangt automatisch een bevestiging en herinnering. Geen telefoontjes meer tijdens het knippen.",
    color: ACCENT,
  },
  {
    Icon: IconGallery,
    title: "Fotogalerij",
    text: "Laat uw werk zien. Een professionele galerij met uw beste kapsels, kleurbehandelingen en sfeerbeelden geeft bezoekers direct vertrouwen in uw vakmanschap.",
    color: "#8b5cf6",
  },
  {
    Icon: IconStar,
    title: "Reviews en beoordelingen",
    text: "Toon uw Google reviews automatisch op uw website. Positieve beoordelingen zijn de krachtigste manier om nieuwe klanten te overtuigen.",
    color: "#f59e0b",
  },
  {
    Icon: IconMobile,
    title: "Mobiel geoptimaliseerd",
    text: "Meer dan 80% van uw bezoekers komt via de telefoon. Uw website werkt perfect op elk schermformaat, van smartphone tot desktop.",
    color: "#22c55e",
  },
  {
    Icon: IconSearch,
    title: "Gevonden worden in Google",
    text: "Uw website wordt volledig geoptimaliseerd voor zoekmachines. Zo verschijnt u bovenaan wanneer iemand zoekt op ‘kapper in uw regio’.",
    color: "#3b82f6",
  },
  {
    Icon: IconPencil,
    title: "Eenvoudig zelf aanpassen",
    text: "Wilt u een prijs aanpassen, een foto toevoegen of een aanbieding plaatsen? Dat doet u zelf via een overzichtelijk beheerpaneel. Geen technische kennis vereist.",
    color: "#ec4899",
  },
];

const starterFeatures = [
  "Tot 3 pagina’s",
  "Modern maatwerk design",
  "Contactformulier",
  "Mobiel geoptimaliseerd",
  "Basis SEO (gevonden worden in Google)",
  "SSL beveiliging (veilige verbinding voor bezoekers)",
  "Binnen 5 tot 7 dagen online",
  "2 weken support na oplevering",
];

const proFeatures = [
  "3 tot 5 pagina’s",
  "Volledig maatwerk design",
  "Online afsprakensysteem",
  "Fotogalerij",
  "Google Reviews integratie (automatisch op uw site)",
  "Uitgebreide SEO (maximaal zichtbaar in Google)",
  "CMS (zelf content beheren)",
  "1 maand support",
];

const exampleTags = ["Online boekingen", "Fotogalerij", "Google Reviews", "SEO geoptimaliseerd"];

const trustItems = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    text: "4.9/5 Google Reviews",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: "Binnen 2 weken online",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: "Vaste prijs, geen verrassingen",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: "Heel Nederland",
  },
];

const kpTrustTexts = trustItems.map((t) => t.text);

const internalLinks = [
  { label: "Website voor restaurants", href: "/website-laten-maken-restaurant" },
  { label: "Website voor garages", href: "/website-laten-maken-garage" },
  { label: "Website voor hoveniers", href: "/website-laten-maken-hovenierbedrijf" },
  { label: "Website voor tandartsen", href: "/website-laten-maken-tandarts" },
];

/* ══════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO (with floating card)
══════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTouchRef = useRef<number | null>(null);

  const kpHeroSlides = [
    { src: "/assets/salon_theme_dark.png", alt: "Voorbeeld kapperszaak website donker thema",  url: "www.kapperszaak-voorbeeld.nl", label: "Stijl A \u2014 Donker & Sfeervol" },
    { src: "/assets/salon_theme_rood.png", alt: "Voorbeeld barbershop website modern thema",   url: "www.barbershop-voorbeeld.nl",  label: "Stijl B \u2014 Modern & Fris" },
  ];

  useEffect(() => {
    if (heroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((s) => (s + 1) % kpHeroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroPaused]);

  return (
    <>
      <style>{`
        /* Buttons */
        .kp-hero-btn-primary {
          display: inline-flex; align-items: center; min-height: 52px; padding: 0 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white;
          border-radius: 100px; font-weight: 700; font-size: 15px; text-decoration: none;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35); white-space: nowrap;
          transition: box-shadow 200ms ease, transform 200ms ease;
        }
        .kp-hero-btn-primary:hover { box-shadow: 0 8px 36px rgba(99,102,241,0.55); transform: translateY(-2px); }
        .kp-hero-btn-secondary {
          display: inline-flex; align-items: center; min-height: 52px; padding: 0 28px;
          background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(255,255,255,0.2); border-radius: 100px;
          font-weight: 600; font-size: 15px; text-decoration: none; white-space: nowrap;
          transition: border-color 200ms, background 200ms;
        }
        .kp-hero-btn-secondary:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.08); }
        .kp-hero-text-col { min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box; }
        @media (max-width: 1023px) {
          .kp-hero-btns { flex-direction: column !important; align-items: stretch !important; }
          .kp-hero-btn-primary, .kp-hero-btn-secondary {
            justify-content: center !important;
            width: 100% !important;
            max-width: 100% !important;
            white-space: normal !important;
            box-sizing: border-box;
            text-align: center;
          }
        }

        /* Hero two-column layout */
        .kp-hero-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .kp-hero-inner > * { min-width: 0; }
        @media (min-width: 1024px) {
          .kp-hero-inner { grid-template-columns: 55fr 45fr; gap: 64px; }
        }

        /* Bob animation */
        @keyframes kp-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .kp-floating-card {
          animation: kp-bob 4s ease-in-out infinite;
          border-radius: 14px;
          overflow: hidden;
          background: #1a1f2e;
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 20px 60px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.5);
          width: 100%;
        }
        /* Mini browser inside floating card */
        .kp-fc-bar {
          background: #252c3d;
          padding: 13px 18px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .kp-fc-dots { display: flex; gap: 6px; }
        .kp-fc-dot { width: 11px; height: 11px; border-radius: 50%; }
        .kp-fc-url {
          flex: 1; background: rgba(0,0,0,0.3); border-radius: 6px;
          padding: 5px 12px; font-size: 11px; color: rgba(255,255,255,0.35);
          font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .kp-fc-img-area { position: relative; width: 100%; height: 320px; overflow: hidden; background: #0c1018; }

        /* Trust bar — pipes, single scroll row on mobile */
        .kp-trust-bar {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          gap: 0;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
          -webkit-overflow-scrolling: touch;
          justify-content: flex-start;
          align-items: center;
          white-space: nowrap;
          -ms-overflow-style: none;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .kp-trust-bar::-webkit-scrollbar { display: none; }
        .kp-trust-sep {
          flex-shrink: 0; padding: 0 12px; color: rgba(255,255,255,0.35); font-size: 13px; font-weight: 400;
        }
        .kp-trust-item {
          flex-shrink: 0; font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 500; line-height: 1.35;
          padding: min(48px - 13px * 1.35, 12px) 0;
        }
      `}</style>

      <section
        id="home"
        style={{
          position: "relative",
          background: BG1,
          overflow: "hidden",
          paddingTop: 48,
          paddingBottom: 40,
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 70% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
            background: `linear-gradient(to top, ${BG1}, transparent)`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
          <div className="kp-hero-inner">

            {/* LEFT — text */}
            <div className="kp-hero-text-col">
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}
              >
                Webdesign voor kappers &amp; barbershops
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.08, margin: "0 0 22px", letterSpacing: "-0.03em", overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                Professionele{" "}
                <span style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  website laten maken
                </span>{" "}
                voor uw kapperszaak
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: "0 0 36px", maxWidth: 520, overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                Een moderne, snelle website die klanten aantrekt en online afspraken mogelijk maakt.
                Tinsights bouwt websites voor kappers en barbershops door heel Nederland. Op maat,
                betaalbaar en binnen twee weken online.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="kp-hero-btns"
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}
              >
                <Link href="/contact" className="kp-hero-btn-primary" aria-label="Gratis adviesgesprek aanvragen voor uw kappers website">
                  Gratis adviesgesprek aanvragen
                </Link>
                <a href="#features" className="kp-hero-btn-secondary" aria-label="Bekijk wat Tinsights biedt voor kappers">
                  Bekijk wat wij bieden
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="kp-trust-bar"
              >
                {kpTrustTexts.map((text, idx) => (
                  <Fragment key={text}>
                    {idx > 0 ? <span className="kp-trust-sep" aria-hidden>|</span> : null}
                    <span className="kp-trust-item">{text}</span>
                  </Fragment>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — floating mockup (desktop only) */}
            <div className="hidden lg:flex kp-hero-card-col justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                style={{ width: "100%", maxWidth: 560 }}
              >
                <div
                  className="kp-floating-card"
                  onMouseEnter={() => setHeroPaused(true)}
                  onMouseLeave={() => setHeroPaused(false)}
                  onTouchStart={(e) => { heroTouchRef.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (heroTouchRef.current === null) return;
                    const diff = heroTouchRef.current - e.changedTouches[0].clientX;
                    if (diff > 50) setHeroSlide((s) => (s + 1) % kpHeroSlides.length);
                    else if (diff < -50) setHeroSlide((s) => (s - 1 + kpHeroSlides.length) % kpHeroSlides.length);
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
                        {kpHeroSlides[heroSlide].url}
                      </span>
                    </div>
                  </div>
                  {/* Image area — fixed height */}
                  <div style={{ position: "relative", width: "100%", height: "320px", overflow: "hidden" }}>
                    {kpHeroSlides.map((slide, i) => (
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
                  {kpHeroSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setHeroSlide(i)}
                      aria-label={`Ga naar slide ${i + 1}`}
                      style={{
                        width: heroSlide === i ? 24 : 8,
                        height: 8,
                        borderRadius: 100,
                        background: heroSlide === i ? "#6366f1" : "rgba(255,255,255,0.2)",
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
                  {kpHeroSlides[heroSlide].label}
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
   SECTION 2 — INTRO
══════════════════════════════════════════════════════════════════════ */

function IntroSection() {
  return (
    <section id="over" className="kp-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FadeUp>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            Waarom online zichtbaarheid essentieel is
          </p>
          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.15, margin: "0 0 36px", letterSpacing: "-0.02em" }}>
            Waarom heeft uw kapperszaak een website nodig?
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              Steeds meer mensen zoeken online naar een kapper in hun buurt. Zonder website bent u
              onzichtbaar voor potenti&euml;le klanten die via Google zoeken op &ldquo;kapper uw
              stad&rdquo; of &ldquo;barbershop near me&rdquo;. Een professionele website zorgt ervoor
              dat u gevonden wordt en dat bezoekers meteen een goede indruk krijgen van uw zaak.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              Een website is meer dan een visitekaartje. Het is uw digitale etalage die 24 uur per dag,
              7 dagen per week open is. Klanten kunnen uw werk bekijken, uw diensten en prijzen lezen en
              direct een afspraak inplannen, ook buiten uw openingstijden. Dat bespaart u tijd en
              zorgt voor meer boekingen.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              Of u nu net begint met uw kapperszaak of al jaren actief bent: een professionele
              website helpt u groeien. Wij bouwen websites die niet alleen mooi zijn, maar ook goed
              vindbaar zijn in Google en prettig werken op alle apparaten, van telefoon tot desktop.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 3 — FEATURES
══════════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  return (
    <>
      <style>{`
        .kp-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .kp-features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .kp-feat-item {
          position: relative;
          padding: 16px 20px 16px 23px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          box-sizing: border-box;
        }
        .kp-feat-item::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: ${ACCENT};
        }
        .kp-feat-icon {
          width: 20px; height: 20px; margin-bottom: 8px; color: ${ACCENT}; display: flex; align-items: center; justify-content: flex-start;
        }
        .kp-feat-icon svg { width: 20px !important; height: 20px !important; flex-shrink: 0; display: block; }
      `}</style>
      <section id="features" className="kp-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
                Wat wij voor u bouwen
              </p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Wat zit er in uw website?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 580, margin: "0 auto" }}>
                Wij bouwen websites die speciaal zijn afgestemd op de behoeften van kappers en barbershops.
                Geen standaard template, maar een website die werkt voor uw zaak.
              </p>
            </div>
          </FadeUp>

          <div className="kp-features-grid">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                className="kp-feat-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <div className="kp-feat-icon" aria-hidden>
                  <f.Icon />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                  {f.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


/* ══════════════════════════════════════════════════════════════════════
   SECTION 4 — EXAMPLE PROJECT (image carousel)
══════════════════════════════════════════════════════════════════════ */

const carouselSlides = [
  { url: "www.kapperszaak-voorbeeld.nl", label: "Stijl A: Donker & Sfeervol", src: "/assets/salon_theme_dark.png", alt: "Voorbeeld kapperszaak website donker thema" },
  { url: "www.barbershop-voorbeeld.nl", label: "Stijl B: Modern & Fris", src: "/assets/salon_theme_rood.png", alt: "Voorbeeld barbershop website modern thema" },
];

function ExampleSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const [mobileExSlide, setMobileExSlide] = useState(0);
  const [mobileExPaused, setMobileExPaused] = useState(false);
  const mobileExTouchRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

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
        .kp-example-grid {
          display: grid; grid-template-columns: 1fr; gap: 48px; align-items: start;
        }
        @media (min-width: 800px) { .kp-example-grid { grid-template-columns: 65fr 35fr; } }
        .kp-carousel-frame {
          background: #1a1f2e; border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .kp-carousel-bar {
          height: 32px; background: #1a1f2e;
          display: flex; align-items: center; padding: 0 12px; gap: 6px;
        }
        .kp-carousel-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
        .kp-carousel-url {
          flex: 1; margin: 0 8px; height: 20px; background: rgba(255,255,255,0.1);
          border-radius: 100px; padding: 0 12px; display: flex; align-items: center;
          font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .kp-carousel-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(0,0,0,0.6); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: white; z-index: 10; transition: background 200ms;
        }
        .kp-carousel-nav:hover { background: rgba(0,0,0,0.85); }
        .kp-mobile-example { display: block; }
        @media (min-width: 1024px) { .kp-mobile-example { display: none; } }
        .kp-desktop-example { display: none; }
        @media (min-width: 1024px) { .kp-desktop-example { display: block; } }
      `}</style>

      <section id="voorbeeld" className="kp-py-section" style={{ background: BG2, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
                Ons werk
              </p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                Voorbeeld van ons werk
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto" }}>
                Zo kan uw website eruitzien. Elk project bouwen wij op maat naar uw wensen en huisstijl.
              </p>
            </div>
          </FadeUp>

          <div className="kp-example-grid">
            {/* LEFT — image carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              >
              {/* Mobile example carousel */}
              <div
                className="kp-mobile-example w-full"
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
                      { src: "/assets/hair_salon_mobile_1.png", alt: "Voorbeeld kapperszaak website op telefoon" },
                      { src: "/assets/hair_salon_mobile_2.png", alt: "Voorbeeld barbershop website op telefoon" },
                    ].map((slide, i) => (
                      <div key={slide.src} style={{ position: "absolute", inset: 0, opacity: mobileExSlide === i ? 1 : 0, transition: "opacity 600ms ease", zIndex: mobileExSlide === i ? 10 : 0 }}>
                        <img src={slide.src} alt={slide.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                      </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
                  {[0, 1].map((i) => (
                    <button key={i} type="button" onClick={() => setMobileExSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: mobileExSlide === i ? 24 : 8, height: 8, borderRadius: 100, background: mobileExSlide === i ? "#6366f1" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms", minWidth: 8 }} />
                  ))}
                </div>
              </div>

              {/* Desktop browser carousel */}
              <div className="kp-desktop-example">
              <div
                className="kp-carousel-frame"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const diff = e.changedTouches[0].clientX - touchStartX.current;
                  if (diff > 50) setActiveSlide((s) => (s - 1 + carouselSlides.length) % carouselSlides.length);
                  else if (diff < -50) setActiveSlide((s) => (s + 1) % carouselSlides.length);
                  touchStartX.current = null;
                }}
              >
                <div className="kp-carousel-bar">
                  <div className="kp-carousel-dot" style={{ background: "#ff5f57" }} />
                  <div className="kp-carousel-dot" style={{ background: "#febc2e" }} />
                  <div className="kp-carousel-dot" style={{ background: "#28c840" }} />
                  <div className="kp-carousel-url">{carouselSlides[activeSlide].url}</div>
                </div>
                <div style={{ position: "relative", width: "100%", height: "380px", overflow: "hidden" }}>
                  {carouselSlides.map((slide, i) => (
                    <div
                      key={slide.src}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        opacity: activeSlide === i ? 1 : 0,
                        transition: "opacity 500ms ease",
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority
                        style={{ objectFit: "cover", objectPosition: "top center" }}
                        sizes="(max-width: 800px) 100vw, 65vw"
                      />
                    </div>
                  ))}
                  <button
                    className="kp-carousel-nav"
                    style={{ left: 12 }}
                    onClick={() => setActiveSlide((s) => (s - 1 + carouselSlides.length) % carouselSlides.length)}
                    aria-label="Vorige stijl"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="kp-carousel-nav"
                    style={{ right: 12 }}
                    onClick={() => setActiveSlide((s) => (s + 1) % carouselSlides.length)}
                    aria-label="Volgende stijl"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
                {carouselSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Ga naar stijl ${i + 1}`}
                    style={{
                      width: activeSlide === i ? 24 : 8,
                      height: 8,
                      borderRadius: 100,
                      background: activeSlide === i ? "white" : "rgba(255,255,255,0.3)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 300ms ease",
                    }}
                  />
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                {carouselSlides[activeSlide].label}
              </p>
              </div>
            </motion.div>

            {/* RIGHT — project info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
                Voorbeeldproject
              </p>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                Kapper De Stijl
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 14px" }}>
                Een complete website voor een moderne kapperszaak in Amsterdam. Met online boekingssysteem,
                fotogalerij en integratie van Google reviews. Het project was binnen 10 werkdagen live.
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontStyle: "italic", margin: "0 0 20px", lineHeight: 1.6 }}>
                Uw website wordt ontworpen in een stijl die aansluit bij uw merk en doelgroep.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {exampleTags.map((tag) => (
                  <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: ACCENT, background: `${ACCENT}14`, border: `1px solid ${ACCENT}28`, borderRadius: 100, padding: "5px 12px" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/projecten" aria-label="Bekijk meer kappers website projecten van Tinsights"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 24px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Bekijk meer projecten →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 5 — PRICING (3 tiers)
══════════════════════════════════════════════════════════════════════ */

const businessPlusKapper = [
  "Alles uit Professional",
  "Volledig maatwerk design",
  "Admin dashboard op maat",
  "Klantenbeheer systeem",
  "Online betalingen integratie",
  "Automatische afspraakbevestigingen",
  "Uitgebreide analytics & rapportages",
  "Koppeling met externe systemen",
  "3 maanden support",
  "Prioriteit bij aanpassingen",
];


const KP_PRICE_ACCENT = "#7c3aed";

const KP_PRICING_TIERS: PricingTierConfig[] = [
  {
    title: "Website Starter",
    tierIndicator: "Starter",
    description: "Voor kappers die snel en professioneel online willen staan.",
    priceAmount: "€349",
    badge: false,
    highlight: false,
    features: starterFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Website Starter voor kappers",
  },
  {
    title: "Professional",
    tierIndicator: "Professional",
    description: "Voor kappers die meer willen: meer pagina's, meer functionaliteit, meer klanten.",
    priceAmount: "€699",
    badge: true,
    highlight: true,
    features: proFeatures,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Professional pakket voor kappers",
  },
  {
    title: "Business Plus",
    tierIndicator: "Business Plus",
    description: "Voor kappers die volledig willen automatiseren en professioneel willen opschalen.",
    priceAmount: "€1.499",
    badge: false,
    highlight: false,
    features: businessPlusKapper,
    ctaLabel: "Vraag offerte aan →",
    ctaAria: "Vraag offerte aan voor Business Plus pakket voor kappers",
  },
];

function PricingSection() {
  return (
    <BranchPricingBlock
      accentColor={KP_PRICE_ACCENT}
      sectionEyebrow="Investering"
      sectionTitle="Wat kost een website voor een kapperszaak?"
      intro="De prijs van uw website hangt af van uw wensen en de functies die u nodig heeft."
      tiers={KP_PRICING_TIERS}
      sectionClassName="kp-py-section"
      sectionStyle={{ background: BG1, borderTop: SECTION_BORDER }}
      footerBlurb={
        <>
          Twijfelt u welk pakket past bij uw situatie? Wij denken graag vrijblijvend met u mee. De prijs kan hoger of lager uitvallen afhankelijk van uw specifieke wensen.{" "}
          <Link href="/contact" style={{ color: KP_PRICE_ACCENT, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>
            Vraag een gratis offerte aan
          </Link>
          .
        </>
      }
    />
  );
}



/* ══════════════════════════════════════════════════════════════════════
   SECTION 8 — INTERNAL LINKS
══════════════════════════════════════════════════════════════════════ */

function InternalLinksSection() {
  return (
    <>
      <style>{`
        .kp-internal-wrap { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .kp-internal-pill {
          border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 10px 24px; font-size: 14px;
          color: rgba(255,255,255,0.75); text-decoration: none; transition: border-color 0.2s ease, color 0.2s ease;
          display: inline-flex; align-items: center; justify-content: center; min-height: 48px; box-sizing: border-box;
        }
        .kp-internal-pill:hover { border-color: ${ACCENT}; color: #fff; }
      `}</style>
      <section className="kp-py-section" style={{ background: BG1, borderTop: SECTION_BORDER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#f1f5f9", textAlign: "center", margin: "0 0 28px", letterSpacing: "-0.02em" }}>
              Wij bouwen ook websites voor andere branches
            </h2>
          </FadeUp>
          <nav className="kp-internal-wrap" aria-label="Andere branches">
            {internalLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              >
                <Link href={link.href} className="kp-internal-pill" aria-label={link.label}>
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
   SECTION 7 — BOTTOM CTA
══════════════════════════════════════════════════════════════════════ */

function BottomCTASection() {
  return (
    <>
      <style>{`
        .kp-cta-grid { display: grid; gap: 32px; align-items: center; text-align: left; max-width: 100%; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .kp-cta-grid { grid-template-columns: 60fr 40fr; gap: 48px; } }
        .kp-cta-buttons { display: flex; flex-direction: column; gap: 12px; align-items: stretch; width: 100%; }
        .kp-cta-wrap {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          text-align: left; border-top: ${SECTION_BORDER};
        }
        .kp-cta-btn-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: #25d366; color: #fff; font-size: 15px; font-weight: 700; padding: 0 28px; border-radius: 8px; text-decoration: none; transition: opacity 180ms; }
        .kp-cta-btn-wa:hover { opacity: 0.9; }
        .kp-cta-btn-mail {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px;
          background: transparent; color: rgba(255,255,255,0.92); font-size: 15px; font-weight: 600;
          padding: 0 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); text-decoration: none;
          transition: border-color 200ms, background 200ms;
        }
        .kp-cta-btn-mail:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
        .kp-cta-btn-tel { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; background: transparent; color: rgba(255,255,255,0.92); font-size: 15px; font-weight: 600; padding: 0 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.35); text-decoration: none; transition: border-color 200ms, background 200ms; }
        .kp-cta-btn-tel:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }
      `}</style>
      <section className="kp-cta-wrap kp-py-section">
        <FadeUp>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", boxSizing: "border-box", width: "100%" }}>
            <div className="kp-cta-grid">
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 16px" }}>
                  Klaar om te starten?
                </p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Klaar voor uw nieuwe website?
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.68)", margin: 0 }}>
                  Vertel ons over uw kapperszaak. Wij reageren binnen 24 uur met een vrijblijvend advies en
                  prijsindicatie. Geen verplichtingen.
                </p>
              </div>
              <div className="kp-cta-buttons">
              <a href="https://wa.me/31619181483" target="_blank" rel="noopener noreferrer" className="kp-cta-btn-wa" aria-label="Stuur een WhatsApp bericht naar Tinsights over uw kappers website">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a href="mailto:info@tinsights.nl" className="kp-cta-btn-mail" aria-label="Stuur een e-mail naar Tinsights">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                E-mail sturen
              </a>
              <a href="tel:0853696652" className="kp-cta-btn-tel" aria-label="Bel Tinsights op 085 369 6652">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                085 - 369 6652
              </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════ */

export default function KapperPageContent() {
  return (
    <main className="branch-landing-root" style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", background: BG1, color: "#f1f5f9", overflowX: "hidden", boxSizing: "border-box" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .branch-landing-root { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        .branch-landing-root section { width: 100%; max-width: 100%; box-sizing: border-box; }
        .kp-py-section { padding: 40px 24px; margin: 0; box-sizing: border-box; }
        @media (min-width: 1024px) { .kp-py-section { padding: 64px 24px; } }
      `}</style>
      <Navbar />
      <BranchLandingBreadcrumb currentLabel="Website voor kappers" />
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <ExampleSection />
      <PricingSection />
      <KapperFAQ />
      <InternalLinksSection />
      <BottomCTASection />
      <Footer />
    </main>
  );
}

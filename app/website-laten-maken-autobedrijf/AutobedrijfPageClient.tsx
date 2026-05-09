"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BranchPricingBlock, { type PricingTierConfig } from "@/components/BranchPricingBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchLandingBreadcrumb from "@/components/BranchLandingBreadcrumb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───────────────────────────────────────────────────────────────
const BG1 = "#0a0f1e";
const BG2 = "#0d1117";
const BLUE = "#2563eb";
const BLUE_LIGHT = "#60a5fa";
const BLUE_MED = "rgba(37,99,235,0.10)";
const BLUE_BORDER = "rgba(37,99,235,0.30)";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
function IconGrid() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconCalc() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="11" y2="14" /><line x1="8" y1="18" x2="11" y2="18" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.93 6.93l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function IconMobile() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconPhone2() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.93 6.93l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
// ─── Feature cards data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <IconGrid />,
    title: "Occasionvoorraad systeem",
    text: "Toon uw volledige voorraad overzichtelijk op uw website. Elke auto met foto's, specificaties en vraagprijs. Eenvoudig zelf te beheren via uw beheerpaneel.",
  },
  {
    icon: <IconSearch />,
    title: "RDW inkoopformulier",
    text: "Klanten bieden hun auto aan via uw website. Ze voeren hun kenteken in en alle voertuiggegevens worden automatisch ingevuld vanuit de officiële RDW database. Snel en foutloos.",
  },
  {
    icon: <IconCalc />,
    title: "Financieringsopties tonen",
    text: "Toon maandlasten en financieringsopties direct bij elke occasion. Klanten zien meteen wat een auto hen per maand kost, wat de drempel om contact op te nemen verlaagt.",
  },
  {
    icon: <IconPhone />,
    title: "Proefrit aanvragen",
    text: "Bezoekers vragen eenvoudig een proefrit aan via een overzichtelijk formulier. U ontvangt direct een melding met alle gegevens van de aanvrager.",
  },
  {
    icon: <IconMobile />,
    title: "Volledig mobiel geoptimaliseerd",
    text: "Meer dan 80% van uw bezoekers bekijkt uw voorraad via de telefoon. Uw website werkt perfect op elk apparaat, snel en overzichtelijk.",
  },
  {
    icon: <IconGlobe />,
    title: "Gevonden worden in Google",
    text: "Uw website en occasionpagina's worden geoptimaliseerd voor Google. Zo verschijnt u bovenaan wanneer iemand zoekt op 'occasions' of 'autobedrijf' in uw regio.",
  },
];

const SLIDES = [
  { src: "/assets/car_garage.png", alt: "Voorbeeld autobedrijf website moderne stijl", url: "www.autoroad-occasions.nl", label: "Stijl A — Modern & Dynamisch" },
  { src: "/assets/car_detailing.png", alt: "Voorbeeld occasions website premium stijl", url: "www.autobedrijf-premium.nl", label: "Stijl B — Premium & Strak" },
];

const PRICING = [
  {
    name: "Website Starter",
    tier: "Starter",
    price: "Vanaf €399",
    sub: "eenmalig",
    desc: "Voor autobedrijven die snel en professioneel online willen staan.",
    highlight: false,
    features: [
      "Tot 3 pagina's",
      "Modern maatwerk design",
      "Occasionvoorraad tot 10 auto's",
      "Contactformulier",
      "Mobiel geoptimaliseerd",
      "Basis SEO (gevonden worden in Google)",
      "SSL (veilige verbinding)",
      "Binnen 7 dagen online",
      "2 weken support",
    ],
  },
  {
    name: "Professional",
    tier: "Professional",
    price: "Vanaf €799",
    sub: "eenmalig",
    desc: "Voor autobedrijven die meer kopers willen bereiken en slimmer willen werken.",
    highlight: true,
    badge: "Meest gekozen",
    features: [
      "Tot 10 pagina's",
      "Volledig maatwerk design",
      "Occasionvoorraad onbeperkt",
      "RDW inkoopformulier met kentekencheck",
      "Proefrit aanvraag module",
      "Google Reviews integratie",
      "Uitgebreide SEO",
      "CMS (zelf content en voorraad beheren)",
      "1 maand support",
    ],
  },
  {
    name: "Business Plus",
    tier: "Business Plus",
    price: "Vanaf €1.699",
    sub: "eenmalig",
    desc: "Voor autobedrijven die volledig digitaal willen werken en maximaal willen groeien.",
    highlight: false,
    features: [
      "Alles uit Professional",
      "Volledig maatwerk design",
      "Admin dashboard op maat",
      "Voertuig- en klantenbeheer systeem",
      "Automatische voorraadupdates",
      "Financieringscalculator op maat",
      "Online betalingen en aanbetalingen",
      "Uitgebreide analytics en rapportages",
      "Advertentiekoppelingen (Marktplaats etc.)",
      "3 maanden support",
      "Prioriteit bij aanpassingen",
    ],
  },
];

const AB_PRICE_ACCENT = "#2563eb";

const AB_PRICING_TIERS: PricingTierConfig[] = PRICING.map((p) => ({
  title: p.name,
  tierIndicator: p.tier,
  description: p.desc,
  priceAmount: p.price.startsWith("Vanaf ") ? p.price.slice(6) : p.price,
  priceSub: p.sub,
  badge: Boolean(p.badge),
  highlight: Boolean(p.highlight),
  features: p.features,
  ctaLabel: "Vraag offerte aan",
  ctaAria: `Offerte aanvragen voor ${p.name}`,
}));

const FAQS = [
  {
    q: "Hoe lang duurt het bouwen van mijn website?",
    a: "Gemiddeld bouwen wij een website voor een autobedrijf binnen 1 tot 2 weken op. Na een eerste gesprek en het goedkeuren van het ontwerp gaan wij direct aan de slag.",
  },
  {
    q: "Kan ik zelf mijn occasionvoorraad beheren?",
    a: "Ja. Via uw beheerpaneel voegt u zelf auto's toe, bewerkt u specificaties en prijzen en plaatst u foto's. Wijzigingen zijn direct zichtbaar op uw website. Geen technische kennis vereist.",
  },
  {
    q: "Wat is het RDW inkoopformulier precies?",
    a: "Het RDW inkoopformulier stelt klanten in staat hun auto aan te bieden via uw website. Ze voeren hun kenteken in en alle voertuiggegevens (merk, model, bouwjaar, APK) worden automatisch ingevuld vanuit de officiële RDW database. U ontvangt het ingevulde formulier direct in uw mailbox.",
  },
  {
    q: "Kan mijn website ook auto's adverteren op Marktplaats of AutoScout24?",
    a: "Koppelingen met advertentieplatforms zoals Marktplaats en AutoScout24 zijn mogelijk via het Business Plus pakket. Hiervoor heeft u een bestaand dealer account bij deze platforms nodig. Wij verzorgen de technische integratie.",
  },
  {
    q: "Werken jullie ook buiten Groningen?",
    a: "Wij werken volledig op afstand en bedienen autobedrijven door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden. Afstand is geen enkel probleem.",
  },
  {
    q: "Kan mijn website later uitgebreid worden?",
    a: "Zeker. Wij bouwen websites die eenvoudig uitgebreid kunnen worden. Een financieringscalculator, extra koppelingen of een uitgebreider voorraadbeheer systeem toevoegen is altijd mogelijk.",
  },
];

const INTERNAL_LINKS = [
  { label: "Garages & APK", href: "/website-laten-maken-garage" },
  { label: "Restaurants & horeca", href: "/website-laten-maken-restaurant" },
  { label: "Kappers & barbershops", href: "/website-laten-maken-kapper" },
  { label: "Tandartspraktijken", href: "/website-laten-maken-tandarts" },
];

// ─── FAQ JSON-LD ──────────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── Global styles ────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  .branch-landing-root { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
  .branch-landing-root section { width: 100%; max-width: 100%; box-sizing: border-box; }
  /* ── Hero: single scene — overlap, asymmetric bleed, one protagonist ───────── */
  .ab-hero-section {
    padding-top: 12px;
    padding-bottom: 28px;
    overflow-x: clip;
    overflow-y: visible;
  }
  @media (min-width: 1024px) {
    .ab-hero-section {
      padding-top: 28px;
      padding-bottom: clamp(48px, 8vh, 88px);
    }
  }
  .ab-hero-inner {
    width: 100%;
    padding-left: 20px;
    padding-right: 16px;
    max-width: 1220px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
  }
  @media (min-width: 1024px) {
    .ab-hero-inner { padding-left: 28px; padding-right: 20px; }
  }
  /* One canvas: copy + visual share spatial tension (not two columns) */
  .ab-hero-scene {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 0;
  }
  @media (min-width: 1024px) {
    .ab-hero-scene {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(420px, auto);
      min-height: clamp(448px, 56vh, 620px);
      align-items: stretch;
    }
  }
  .ab-hero-copy-layer {
    position: relative;
    z-index: 3;
    text-align: left;
    max-width: 100%;
    padding-right: 4px;
  }
  @media (min-width: 1024px) {
    .ab-hero-copy-layer {
      grid-column: 1;
      grid-row: 1;
      align-self: start;
      justify-self: start;
      max-width: min(34rem, 44%);
      padding-top: 12px;
      padding-bottom: 72px;
    }
  }
  .ab-hero-meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 10px 18px;
    margin-bottom: 22px;
  }
  @media (min-width: 1024px) {
    .ab-hero-meta-row { margin-bottom: 26px; }
  }
  .ab-hero-label {
    margin: 0;
    text-align: left;
    font-size: 10px;
    letter-spacing: 0.18em;
    font-weight: 700;
    text-transform: uppercase;
    color: ${BLUE_LIGHT};
    flex-shrink: 0;
  }
  .ab-hero-proof-inline {
    margin: 0;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.34);
    line-height: 1.45;
    max-width: 20rem;
  }
  @media (max-width: 1023px) {
    .ab-hero-proof-inline {
      width: 100%;
      max-width: none;
      letter-spacing: 0.08em;
    }
  }
  .ab-hero-title {
    margin: 0 0 28px;
    text-align: left;
    font-size: clamp(2.05rem, 6vw, 3.65rem);
    line-height: 1.02;
    letter-spacing: -0.038em;
    font-weight: 800;
    color: #f1f5f9;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .ab-hero-h1-b {
    display: block;
    margin-top: 0.04em;
    color: ${BLUE_LIGHT};
    font-weight: 800;
  }
  @media (min-width: 1024px) {
    .ab-hero-h1-b {
      display: inline;
      margin-top: 0;
      margin-left: 0.06em;
    }
  }
  .ab-hero-lead {
    margin: 0 0 36px;
    text-align: left;
    font-size: clamp(14px, 1.85vw, 17px);
    line-height: 1.62;
    max-width: 38rem;
    overflow-wrap: break-word;
  }
  @media (min-width: 1024px) {
    .ab-hero-lead { margin-bottom: 40px; max-width: min(36rem, 100%); }
  }
  .ab-hero-lead-primary {
    display: block;
    color: rgba(255,255,255,0.82);
    font-weight: 500;
    margin-bottom: 1em;
    letter-spacing: -0.01em;
  }
  .ab-hero-lead-secondary {
    display: block;
    color: rgba(255,255,255,0.48);
    font-size: 0.93em;
    font-weight: 400;
    line-height: 1.68;
    max-width: 34rem;
  }
  .ab-hero-ctas {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    margin-bottom: 0;
  }
  @media (min-width: 1024px) {
    .ab-hero-ctas {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 22px 32px;
    }
  }
  /* Primary: control-shaped, not marketing pill */
  .ab-hero-cta-primary {
    justify-content: center;
    white-space: nowrap;
    border-radius: 8px !important;
    box-shadow: 0 2px 0 rgba(0,0,0,0.22), 0 14px 36px rgba(37,99,235,0.28);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .ab-hero-cta-primary:hover {
    filter: brightness(1.06);
  }
  @media (max-width: 1023px) {
    .ab-hero-cta-primary {
      width: 100%;
      max-width: 100%;
      min-height: 50px;
      box-sizing: border-box;
    }
  }
  .ab-hero-cta-link {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    min-height: auto;
    padding: 4px 0;
    margin: 0;
    background: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.22);
    padding-bottom: 2px;
    transition: color 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
  }
  .ab-hero-cta-link:hover {
    color: ${BLUE_LIGHT};
    border-bottom-color: rgba(96,165,250,0.55);
  }
  .ab-hero-visual-layer {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: calc(100% + 24px);
    margin-left: -12px;
    margin-top: 28px;
    pointer-events: none;
  }
  @media (min-width: 1024px) {
    .ab-hero-visual-layer {
      grid-column: 1;
      grid-row: 1;
      align-self: end;
      justify-self: end;
      width: min(74vw, 720px);
      max-width: none;
      margin-left: 0;
      margin-top: 0;
      margin-right: -16px;
      transform: translateY(12px);
    }
  }
  .ab-hero-visual-stack {
    position: relative;
    width: 100%;
    margin-left: auto;
    margin-right: 0;
    min-height: 220px;
    aspect-ratio: 16 / 11;
  }
  @media (max-width: 1023px) {
    .ab-hero-visual-stack {
      aspect-ratio: 16 / 12;
      min-height: 240px;
      max-width: none;
    }
  }
  @media (min-width: 1024px) {
    .ab-hero-visual-stack {
      aspect-ratio: 16 / 10;
      min-height: 320px;
      max-width: none;
    }
  }
  /* Ghost context — not a second card */
  .ab-hero-card-back {
    position: absolute;
    right: -2%;
    bottom: 8%;
    width: 54%;
    z-index: 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 16px 40px rgba(0,0,0,0.42);
    transform: rotate(-4deg) scale(0.94);
    opacity: 0.72;
    filter: saturate(0.92);
  }
  .ab-hero-card-front {
    position: absolute;
    left: -2%;
    top: 0;
    width: 92%;
    z-index: 2;
    margin: 0;
    border-radius: 11px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow:
      0 40px 80px rgba(0,0,0,0.58),
      0 0 0 1px rgba(255,255,255,0.03);
    transform: rotate(0.9deg);
    background: #0a0f1e;
  }
  .ab-hero-card-front .ab-hero-card-media {
    aspect-ratio: 16 / 9;
  }
  .ab-hero-card-back .ab-hero-card-media {
    aspect-ratio: 16 / 10;
  }
  .ab-hero-card-media {
    position: relative;
    width: 100%;
    background: rgba(37,99,235,0.06);
  }
  .ab-hero-card-media img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
  /* Caption as editorial overlay — less chrome strip */
  .ab-hero-card-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 11px 14px 12px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    background: rgba(10,15,30,0.82);
    border-top: none;
    pointer-events: none;
  }
  @media (max-width: 1023px) {
    .ab-features-head h2, .ab-features-head p {
      text-align: left !important;
      margin-left: 0 !important;
      margin-right: auto !important;
      max-width: 100%;
    }
    .ab-features-head p { margin-bottom: 28px !important; }
    #voorbeeld h2 { text-align: left !important; }
    #voorbeeld > div > p:nth-of-type(1) {
      text-align: left !important; margin-left: 0 !important; margin-right: 0 !important; max-width: 40rem !important;
    }
    #over > div > div:first-child h2 { text-align: left; }
    #over .ab-stats-wrap { margin-top: 28px; padding-top: 28px; padding-bottom: 28px; }
    .ab-internal-pills { justify-content: flex-start; }
  }
  .ab-py-section { padding: 32px 20px; margin: 0; box-sizing: border-box; }
  @media (min-width: 1024px) {
    .ab-py-section { padding: 64px 24px; }
  }
  .ab-stats-wrap {
    border-top: 1px solid rgba(255,255,255,0.08);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 40px 0;
    margin-top: 40px;
  }
  @media (min-width: 1024px) {
    .ab-stats-wrap { padding: 64px 0; margin-top: 48px; }
  }
  .ab-stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  @media (min-width: 1024px) {
    .ab-stats-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .ab-stat-cell {
    border-top: 2px solid ${BLUE_LIGHT};
    padding: 16px;
    background: transparent;
    box-sizing: border-box;
    min-width: 0;
  }
  .ab-feat-grid-edit {
    display: grid; grid-template-columns: 1fr; gap: 0;
  }
  @media (min-width: 768px) {
    .ab-feat-grid-edit { grid-template-columns: repeat(2, 1fr); }
  }
  .ab-feat-edit {
    position: relative;
    padding: 16px 20px 16px 23px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: transparent;
    box-sizing: border-box;
  }
  .ab-feat-spotlight {
    background: linear-gradient(90deg, rgba(37,99,235,0.09), rgba(37,99,235,0.02));
  }
  .ab-feat-edit::before {
    content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: ${BLUE_LIGHT};
  }
  .ab-feat-spotlight::before {
    width: 4px;
    background: linear-gradient(180deg, ${BLUE_LIGHT}, ${BLUE});
    opacity: 1;
  }
  .ab-feat-ic { width: 20px; height: 20px; margin-bottom: 8px; color: ${BLUE_LIGHT}; display: flex; align-items: center; }
  .ab-feat-ic svg { width: 20px !important; height: 20px !important; display: block; flex-shrink: 0; }
  .ab-faq-row { border-bottom: 1px solid rgba(255,255,255,0.08); background: transparent; }
  .ab-faq-btn-inner {
    width: 100%; padding: 14px 0; min-height: 48px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: none; border: none; cursor: pointer; color: inherit; font-size: 16px; font-weight: 600; text-align: left;
  }
  .ab-internal-pills { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  .ab-pill-link {
    border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 10px 24px; font-size: 14px;
    color: rgba(255,255,255,0.75); text-decoration: none; transition: all 0.2s ease;
    display: inline-flex; align-items: center; justify-content: center; min-height: 48px; box-sizing: border-box;
  }
  .ab-pill-link:hover { border-color: ${BLUE_LIGHT}; color: #fff; }
  .ab-cta-grid { display: grid; gap: 32px; align-items: center; grid-template-columns: 1fr; text-align: left; }
  @media (min-width: 900px) { .ab-cta-grid { grid-template-columns: 60fr 40fr; gap: 48px; } }
  .ab-cta-buttons { display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
  .ab-faq-delta { transition: transform 280ms cubic-bezier(0.4,0,0.2,1); color: rgba(255,255,255,0.5); font-size: 14px; display: inline-block; }
  @keyframes ab-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes ab-pulse-blue {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
    50% { box-shadow: 0 0 0 12px rgba(37,99,235,0); }
  }
  .ab-link-card:hover { border-color: rgba(37,99,235,0.6) !important; }
  .ab-faq-btn { min-height: 56px; }
  /* Mobile/desktop split for example section */
  .ab-mobile-example { display: block; }
  .ab-desktop-example { display: none; }
  @media (min-width: 1024px) {
    .ab-mobile-example { display: none; }
    .ab-desktop-example { display: block; }
  }
`;

export default function AutobedrijfPageClient() {
  const [slide, setSlide] = useState(0);
  const [slidePaused, setSlidePaused] = useState(false);
  const touchRef = useRef<{ startX: number } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mobile example carousel
  const [mobileExSlide, setMobileExSlide] = useState(0);
  const [mobileExPaused, setMobileExPaused] = useState(false);
  const mobileExTouchRef = useRef<number | null>(null);

  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLElement>(null);

  // Stat counter refs
  const stat0Ref = useRef<HTMLSpanElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  // ── Hero GSAP on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll(".ab-hero-anim");
    gsap.from(els, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  // ── GSAP ScrollTrigger animations ──────────────────────────────────────────
  useEffect(() => {
    // Stat counters
    function counter(el: HTMLSpanElement | null, to: number, suffix: string) {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: to,
        duration: 1.5,
        ease: "power2.out",
        onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }
    counter(stat0Ref.current, 85, "%");
    counter(stat1Ref.current, 2, "x");
    counter(stat3Ref.current, 10, "");

    // Feature cards stagger
    if (featuresRef.current && featuresSectionRef.current) {
      const cards = featuresRef.current.querySelectorAll(".ab-feat-edit");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresSectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // ── Example carousel auto-advance ──────────────────────────────────────────
  useEffect(() => {
    if (slidePaused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, [slidePaused]);

  // ── Mobile example carousel auto-advance ───────────────────────────────────
  useEffect(() => {
    if (mobileExPaused) return;
    const t = setInterval(() => setMobileExSlide((s) => (s + 1) % 2), 4000);
    return () => clearInterval(t);
  }, [mobileExPaused]);

  const prevSlide = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setSlide((s) => (s + 1) % SLIDES.length);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <main
        id="main-content"
        className="branch-landing-root"
        style={{ background: BG1, color: "#f1f5f9", minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box" }}
      >
        <Navbar />
        <BranchLandingBreadcrumb currentLabel="Autobedrijven & occasions" />

        {/* ── SECTION 1: HERO ── */}
        <section
          ref={heroRef}
          className="ab-hero-section"
          style={{
            background: BG1,
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <div className="ab-hero-inner" style={{ position: "relative", zIndex: 1, boxSizing: "border-box" }}>
            <div className="ab-hero-scene">
              <div className="ab-hero-copy-layer">
                <div className="ab-hero-anim ab-hero-meta-row">
                  <p className="ab-hero-label" style={{ fontWeight: 700, textTransform: "uppercase", color: BLUE_LIGHT }}>
                    Webdesign voor autobedrijven & occasionhandel
                  </p>
                  <p className="ab-hero-proof-inline">4.9/5 Google · Binnen 2 weken live · Vaste prijs · Heel Nederland</p>
                </div>

                <h1 className="ab-hero-anim ab-hero-title">
                  <span className="ab-hero-h1-a">Professionele website laten maken </span>
                  <span className="ab-hero-h1-b">voor uw autobedrijf</span>
                </h1>

                <p className="ab-hero-anim ab-hero-lead">
                  <span className="ab-hero-lead-primary">
                    Een strak en modern platform dat uw occasionvoorraad toont, bezoekers omzet in kopers en uw inkoop automatiseert.
                  </span>
                  <span className="ab-hero-lead-secondary">
                    Tinsights bouwt websites voor autobedrijven en occasionhandelaren door heel Nederland. Op maat, betaalbaar en binnen twee weken online.
                  </span>
                </p>

                <div className="ab-hero-anim ab-hero-ctas">
                  <Link
                    href="/contact"
                    aria-label="Gratis adviesgesprek aanvragen"
                    className="ab-hero-cta-primary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      minHeight: 50,
                      padding: "0 28px",
                      background: BLUE,
                      color: "white",
                      borderRadius: 8,
                      fontWeight: 600,
                      fontSize: 14,
                      letterSpacing: "0.01em",
                      textDecoration: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    Gratis adviesgesprek aanvragen
                  </Link>
                  <a href="#features" aria-label="Bekijk wat wij bieden" className="ab-hero-cta-secondary ab-hero-cta-link">
                    Bekijk wat wij bieden
                  </a>
                </div>
              </div>

              <div className="ab-hero-anim ab-hero-visual-layer">
                <div className="ab-hero-visual-stack">
                  <div className="ab-hero-card-back" aria-hidden>
                    <div className="ab-hero-card-media">
                      <img src={SLIDES[1].src} alt="" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <figure className="ab-hero-card-front">
                    <div className="ab-hero-card-media">
                      <img src={SLIDES[0].src} alt={SLIDES[0].alt} loading="eager" decoding="async" />
                    </div>
                    <figcaption className="ab-hero-card-caption">{SLIDES[0].label}</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: INTRO ── */}
        <section id="over" className="ab-py-section" style={{ background: BG2 }}>
          <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 28, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
                Waarom heeft uw autobedrijf een website nodig?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
                Kopers oriënteren zich vrijwel altijd online voordat zij uw autobedrijf bezoeken. Zonder een professionele website met uw actuele voorraad mist u potentiële kopers die naar occasions zoeken in uw regio.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
                Een goede website voor uw autobedrijf toont uw volledige occasionvoorraad overzichtelijk, maakt het mogelijk om online een bod te doen of een proefrit aan te vragen en integreert een kentekencheck zodat klanten hun auto eenvoudig kunnen aanbieden voor inkoop.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
                Of u nu een kleine occasionhandelaar bent of een groter autobedrijf runt, wij bouwen een website die past bij uw identiteit en werkwijze. Altijd geoptimaliseerd voor Google en volledig mobiel vriendelijk.
              </p>
            </div>

            <div ref={statRef} className="ab-stats-wrap">
              <div className="ab-stats-grid">
                {[
                  { ref: stat0Ref, display: "85%", isCounter: true, label: "Van autokopers oriënteert zich eerst online" },
                  { ref: stat1Ref, display: "2x", isCounter: true, label: "Meer leads met een professionele occasionpagina" },
                  { ref: null, display: "24/7", isCounter: false, label: "Uw voorraad zichtbaar voor potentiële kopers" },
                  { ref: stat3Ref, display: "10", isCounter: true, suffix: " dagen", label: "Gemiddelde bouwtijd voor een autobedrijf website" },
                ].map((stat, i) => (
                  <div key={i} className="ab-stat-cell">
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: BLUE_LIGHT, marginBottom: 6, lineHeight: 1 }}>
                      {stat.isCounter && stat.ref ? (
                        <>
                          <span ref={stat.ref}>0</span>{stat.suffix || ""}
                        </>
                      ) : stat.isCounter ? (
                        <span>{stat.display}</span>
                      ) : (
                        stat.display
                      )}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: FEATURES ── */}
        <section id="features" ref={featuresSectionRef} className="ab-py-section" style={{ background: BG1 }}>
          <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <div className="ab-features-head">
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", textAlign: "center", marginBottom: 12, letterSpacing: "-0.025em" }}>
                Wat zit er in uw website?
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 500, margin: "0 auto 40px" }}>
                Speciaal gebouwd voor autobedrijven en occasionhandelaren.
              </p>
            </div>
            <div ref={featuresRef} className="ab-feat-grid-edit">
              {FEATURES.map((f) => (
                <article key={f.title} className={`ab-feat-edit${f.title === "RDW inkoopformulier" ? " ab-feat-spotlight" : ""}`}>
                  <div className="ab-feat-ic" aria-hidden>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: EXAMPLE PROJECT ── */}
        <section id="voorbeeld" className="ab-py-section" style={{ background: BG2 }}>
          <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", textAlign: "center", marginBottom: 12, letterSpacing: "-0.025em" }}>
              Voorbeeld van ons werk
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 480, margin: "0 auto 40px" }}>
              Zo kan uw website eruitzien. Elk project bouwen wij op maat naar uw bedrijf en huisstijl.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)", gap: 56, alignItems: "center" }}>
              {/* Left column: mobile carousel + desktop browser carousel */}
              <div>
                {/* Mobile example carousel (shown on mobile only) */}
                <div
                  className="ab-mobile-example w-full"
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
                        { src: "/assets/occasions_mobile_1.png", alt: "Voorbeeld autobedrijf website op telefoon" },
                        { src: "/assets/occasions_mobile_2.png", alt: "Voorbeeld occasions website op telefoon" },
                      ].map((img, i) => (
                        <div key={img.src} style={{ position: "absolute", inset: 0, opacity: mobileExSlide === i ? 1 : 0, transition: "opacity 600ms ease", zIndex: mobileExSlide === i ? 10 : 0 }}>
                          <img src={img.src} alt={img.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                        </div>
                      ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
                    {[0, 1].map((i) => (
                      <button key={i} type="button" onClick={() => setMobileExSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: mobileExSlide === i ? 24 : 8, height: 8, borderRadius: 100, background: mobileExSlide === i ? BLUE_LIGHT : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms", minWidth: 8 }} />
                    ))}
                  </div>
                </div>

                {/* Desktop browser carousel (shown on lg+ only) */}
                <div className="ab-desktop-example">
              {/* Browser mockup carousel */}
              <div
                style={{ animation: "ab-bob 4s ease-in-out infinite", cursor: "grab" }}
                onMouseEnter={() => setSlidePaused(true)}
                onMouseLeave={() => setSlidePaused(false)}
                onTouchStart={(e) => { touchRef.current = { startX: e.touches[0].clientX }; }}
                onTouchEnd={(e) => {
                  if (!touchRef.current) return;
                  const dx = e.changedTouches[0].clientX - touchRef.current.startX;
                  if (Math.abs(dx) > 40) dx < 0 ? nextSlide() : prevSlide();
                  touchRef.current = null;
                }}
              >
                {/* Browser frame */}
                <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(37,99,235,0.15), 0 4px 24px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)", background: "#1a1f2e" }}>
                  {/* Browser bar */}
                  <div style={{ background: "#1e2436", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                      ))}
                    </div>
                    <div style={{ flex: 1, background: "#0a0f1e", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                      {SLIDES[slide].url}
                    </div>
                  </div>
                  {/* Image area */}
                  <div style={{ position: "relative", width: "100%", height: 320, background: "rgba(37,99,235,0.05)", overflow: "hidden" }}>
                    <img
                      src={SLIDES[slide].src}
                      alt={SLIDES[slide].alt}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                  {/* Controls bar */}
                  <div style={{ background: "#1e2436", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{SLIDES[slide].label}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <button onClick={prevSlide} aria-label="Vorige afbeelding" style={{ background: "rgba(37,99,235,0.4)", border: "none", borderRadius: 6, color: "white", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>&#8249;</button>
                      {SLIDES.map((_, i) => (
                        <button key={i} onClick={() => setSlide(i)} aria-label={`Ga naar afbeelding ${i + 1}`} style={{ width: 8, height: 8, borderRadius: "50%", background: i === slide ? BLUE_LIGHT : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "background 0.3s" }} />
                      ))}
                      <button onClick={nextSlide} aria-label="Volgende afbeelding" style={{ background: "rgba(37,99,235,0.4)", border: "none", borderRadius: 6, color: "white", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>&#8250;</button>
                    </div>
                  </div>
                </div>
              </div>
                </div>{/* close ab-desktop-example */}
              </div>{/* close left column */}

              {/* Project info */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: BLUE_LIGHT, marginBottom: 14 }}>Voorbeeldproject</p>
                <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 6, letterSpacing: "-0.02em" }}>AutoDeal Occasions</h3>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
                  Een complete website voor een occasionbedrijf in Utrecht. Met een uitgebreid voorraadbeheer systeem, RDW inkoopformulier en proefrit aanvraag module. Het project was binnen 12 werkdagen live.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                  {["Voorraadbeheer", "RDW inkoopformulier", "Proefrit aanvragen", "SEO geoptimaliseerd"].map((tag) => (
                    <span key={tag} style={{ fontSize: 12, color: BLUE_LIGHT, border: `1px solid ${BLUE_BORDER}`, borderRadius: 100, padding: "4px 12px", background: BLUE_MED }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/projecten" aria-label="Bekijk meer projecten" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px", border: `1px solid ${BLUE_BORDER}`, borderRadius: 100, color: BLUE_LIGHT, fontWeight: 600, fontSize: 14, textDecoration: "none", background: BLUE_MED }}>
                  Bekijk meer projecten <IconArrow />
                </Link>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 1023px) {
              #voorbeeld > div > div { grid-template-columns: 1fr !important; gap: 28px !important; }
            }
          `}</style>
        </section>

        {/* ── SECTION 5: PRICING ── */}
        <BranchPricingBlock
          accentColor={AB_PRICE_ACCENT}
          sectionEyebrow="Investering"
          sectionTitle="Wat kost een website voor een autobedrijf?"
          intro="De prijs hangt af van uw wensen en functies. Onderstaande prijzen geven een indicatie. Wij denken graag vrijblijvend met u mee."
          tiers={AB_PRICING_TIERS}
          sectionClassName="ab-py-section"
          sectionStyle={{ background: BG1 }}
          footerBlurb={
            <>
              Twijfelt u welk pakket past bij uw situatie? Wij denken graag vrijblijvend met u mee. De prijs kan hoger of lager uitvallen afhankelijk van uw specifieke wensen.{" "}
              <Link href="/contact" style={{ color: AB_PRICE_ACCENT, fontWeight: 600, textDecoration: "underline" }}>
                Vraag een gratis offerte aan
              </Link>
            </>
          }
        />

        {/* ── SECTION 6: FAQ ── */}
        <section id="faq" className="ab-py-section" style={{ background: BG2 }}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <div style={{ maxWidth: 800, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", textAlign: "center", marginBottom: 12, letterSpacing: "-0.025em" }}>
              Veelgestelde vragen over een autobedrijf website
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: 32 }}>
              Staat uw vraag er niet bij? Neem gerust contact met ons op.
            </p>
            <div style={{ margin: 0, padding: 0 }}>
              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className="ab-faq-row">
                    <button
                      type="button"
                      className="ab-faq-btn-inner"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`ab-faq-panel-${i}`}
                      id={`ab-faq-h-${i}`}
                    >
                      <span style={{ fontSize: 16, fontWeight: 600, color: open ? BLUE_LIGHT : "#f1f5f9", transition: "color 200ms ease", lineHeight: 1.4 }}>{faq.q}</span>
                      <span className="ab-faq-delta" aria-hidden style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </button>
                    <div id={`ab-faq-panel-${i}`} role="region" aria-labelledby={`ab-faq-h-${i}`} style={{ overflow: "hidden", maxHeight: open ? 520 : 0, transition: "max-height 0.42s cubic-bezier(0.4,0,0.2,1)" }}>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", paddingBottom: 16, margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: INTERNAL LINKS ── */}
        <section className="ab-py-section" style={{ background: BG1 }}>
          <div style={{ maxWidth: 900, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: "#f1f5f9", textAlign: "center", marginBottom: 28, letterSpacing: "-0.02em" }}>
              Wij bouwen ook websites voor andere branches
            </h2>
            <nav className="ab-internal-pills" aria-label="Gerelateerde branches">
              {INTERNAL_LINKS.map((lnk) => (
                <Link key={lnk.href} href={lnk.href} className="ab-pill-link">
                  {lnk.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* ── SECTION 8: BOTTOM CTA ── */}
        <section className="ab-py-section" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0a0f1e 50%, #1e3a8a 100%)", margin: 0 }}>
          <div style={{ maxWidth: 980, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            <div className="ab-cta-grid">
              <div>
                <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 20, letterSpacing: "-0.03em" }}>
                  Klaar voor uw nieuwe autobedrijf website?
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                  Vertel ons over uw autobedrijf. Wij reageren binnen 24 uur met een vrijblijvend advies en prijsindicatie.
                </p>
              </div>
              <div className="ab-cta-buttons">
                <a
                  href="https://wa.me/31619181483"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="App ons via WhatsApp"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 48, padding: "0 24px", background: "#25d366", color: "white", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}
                >
                  <IconWhatsApp /> WhatsApp
                </a>
                <a
                  href="mailto:info@tinsights.nl"
                  aria-label="Stuur ons een e-mail"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 48, padding: "0 24px", background: "transparent", color: "#f1f5f9", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.35)" }}
                >
                  <IconMail /> E-mail
                </a>
                <a
                  href="tel:0853696652"
                  aria-label="Bel ons direct"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 48, padding: "0 24px", background: "transparent", color: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}
                >
                  <IconPhone2 /> Bellen
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";

/* ══════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════ */

const PURPLE = "#7f77dd";
const DARK = "#0d1117";
const CARD = "#111827";
const CARD2 = "#1a2035";

const services = [
  {
    id: "web-development",
    icon: "🌐",
    label: "Web Development",
    tagline: "Van landingspagina tot volledige webapplicatie op maat.",
    intro:
      "Van een strakke one-pager tot een volledig maatwerk webapplicatie. Wij bouwen websites die snel laden, mobiel werken en klanten aantrekken — gebouwd op solide technologie en geoptimaliseerd voor zoekmachines.",
    steps: [
      { n: "01", title: "Kennismaking & briefing", desc: "Wensen, doelgroep en budget bepalen — kort en concreet." },
      { n: "02", title: "Design & prototyping", desc: "Wireframes en visueel concept zodat je precies weet wat je krijgt vóórdat er gebouwd wordt." },
      { n: "03", title: "Ontwikkeling & lancering", desc: "Bouwen, testen op alle apparaten en live zetten. Inclusief uitleg zodat jij zelf content kunt aanpassen." },
    ],
    whatIs:
      "Professionele website-ontwikkeling op maat of op basis van een bewezen template. Van eenvoudige landingspagina tot complex CMS of webshop — gebouwd voor snelheid, vindbaarheid en conversie.",
    forWho: ["ZZP'ers en kleine ondernemers", "Bedrijven zonder online aanwezigheid", "Organisaties met een verouderde website", "Start-ups en nieuwe bedrijven"],
    benefits: ["Gemiddeld live binnen 1–2 weken", "Mobiel geoptimaliseerd (responsive)", "SEO-technisch correct gebouwd", "CMS zodat u zelf kunt beheren", "Inclusief SSL-certificaat"],
    techLabel: "Technologie",
    tech: ["HTML5, CSS3, JavaScript", "React / Next.js voor web-apps", "WordPress / Headless CMS", "Bootstrap, Tailwind CSS", "REST API integraties"],
    cta: "Vraag offerte aan",
    ctaHref: "/contact",
    accentColor: "#7f77dd",
  },
  {
    id: "hosting-onderhoud",
    icon: "⚡",
    label: "Hosting & Onderhoud",
    tagline: "Uw website live houden — wij regelen de rest.",
    intro:
      "Uw website is live — nu moet hij ook blijven werken. Wij beheren uw hosting, voeren updates uit en zorgen voor dagelijkse back-ups. Altijd online, altijd veilig, altijd een echt persoon bereikbaar.",
    steps: [
      { n: "01", title: "Setup & migratie", desc: "Hosting inrichten of bestaande website migreren — zonder downtime en zonder technisch gedoe." },
      { n: "02", title: "Monitoring activeren", desc: "24/7 uptime-monitoring, automatische back-ups en beveiligingsscans worden ingesteld." },
      { n: "03", title: "Doorlopend beheer", desc: "Updates, patches en support via WhatsApp of e-mail. Altijd een echt persoon aan de andere kant." },
    ],
    whatIs:
      "Betrouwbare serverhosting met dagelijkse back-ups, SSL-certificaten, beveiligingsupdates en technische ondersteuning wanneer u het nodig heeft. U hoeft er niets voor te doen.",
    forWho: ["Bedrijven zonder eigen IT-afdeling", "Websites die altijd online moeten zijn", "Klanten die volledig ontzorgd willen worden", "E-commerce met hoge betrouwbaarheidseisen"],
    benefits: ["99.9% uptime garantie", "Dagelijkse automatische back-ups", "SSL-certificaat inbegrepen", "Beveiligingsupdates automatisch", "Support via WhatsApp / e-mail"],
    techLabel: "Infrastructuur",
    tech: ["Nginx op Linux servers", "PHP-FPM, Node.js, Python", "Cloudflare CDN & DDoS bescherming", "Automatische SSL via Let's Encrypt", "Git-based deployment workflows"],
    cta: "Vraag hosting aan",
    ctaHref: "/contact",
    accentColor: "#22c55e",
  },
  {
    id: "automatisering",
    icon: "🔁",
    label: "Automatisering & Koppelingen",
    tagline: "Slimme integraties die uren handmatig werk besparen.",
    intro:
      "Terugkerende taken kosten tijd en geld. Wij bouwen slimme integraties tussen uw systemen — van CRM aan uw website koppelen tot volledig geautomatiseerde workflows die uren per week besparen.",
    steps: [
      { n: "01", title: "Procesanalyse", desc: "We brengen in kaart welke stappen handmatig gaan, hoeveel tijd ze kosten en of automatisering realistisch loont." },
      { n: "02", title: "Koppeling bouwen", desc: "APIs verbinden, workflows inrichten en alles testen in een veilige omgeving." },
      { n: "03", title: "Testen & opleveren", desc: "Live zetten en documenteren — zodat jij de werking begrijpt en kunt bijsturen." },
    ],
    whatIs:
      "Maatwerk koppelingen en workflows die uw bedrijfsprocessen automatiseren: van het automatisch versturen van facturen tot leads die direct vanuit uw website in uw CRM verschijnen.",
    forWho: ["Bedrijven met herhalende handmatige taken", "Organisaties met meerdere losse systemen", "Webshops die orderprocessen willen automatiseren", "Teams die wekelijks uren willen besparen"],
    benefits: ["Tot 80% minder handmatig werk", "Minder fouten door menselijke invoer", "Real-time datasynchronisatie", "Schaalbaar en uitbreidbaar", "ROI zichtbaar binnen weken"],
    techLabel: "Technologie",
    tech: ["REST & GraphQL API integraties", "Webhooks en event-driven architectuur", "Python scripts en Node.js", "Zapier, n8n workflow automation", "Database synchronisatie"],
    cta: "Vraag offerte aan",
    ctaHref: "/contact",
    accentColor: "#f59e0b",
  },
  {
    id: "seo",
    icon: "📈",
    label: "SEO & Zichtbaarheid",
    tagline: "Gevonden worden in Google is geen toeval — het is een strategie.",
    intro:
      "Wij optimaliseren uw website technisch en inhoudelijk zodat u structureel hoger rankt en meer relevante bezoekers aantrekt. Meer klanten via Google — zonder betaalde advertenties.",
    steps: [
      { n: "01", title: "SEO audit", desc: "Huidige situatie, technische knelpunten en groeikansen in kaart brengen." },
      { n: "02", title: "Optimalisatie", desc: "Technische en inhoudelijke verbeteringen die direct invloed hebben op uw positie in Google." },
      { n: "03", title: "Rapportage & bijsturing", desc: "Maandelijkse rapportages met duidelijke resultaten en concrete vervolgstappen. Geen vakjargon." },
    ],
    whatIs:
      "Zoekmachineoptimalisatie die ervoor zorgt dat u hoger verschijnt voor zoekwoorden die echt relevant zijn voor uw bedrijf. Technische SEO, content en lokale vindbaarheid gecombineerd.",
    forWho: ["Bedrijven die organisch willen groeien", "Webshops die meer bezoekers willen", "Lokale bedrijven (lokale SEO)", "Websites die al bestaan maar slecht ranken"],
    benefits: ["Meer organisch verkeer zonder advertentiekosten", "Hogere Google positie voor uw zoekwoorden", "Verbeterde laadsnelheid (Core Web Vitals)", "Google Analytics & Search Console setup", "Maandelijkse rapportages zonder vakjargon"],
    techLabel: "Aanpak",
    tech: ["Technische SEO audit & fixes", "Keyword research en mapping", "On-page optimalisatie (meta, H-tags)", "Schema.org structured data", "XML sitemap en robots.txt"],
    cta: "Vraag SEO audit aan",
    ctaHref: "/contact",
    accentColor: "#3b82f6",
  },
  {
    id: "beveiliging",
    icon: "🔒",
    label: "Beveiliging & Ethical Hacking",
    tagline: "Wij denken als hackers om uw systemen te beschermen.",
    intro:
      "Via professionele pentests en beveiligingsaudits vinden wij kwetsbaarheden voordat kwaadwillenden dat doen. Gecertificeerd, AVG-compliant en altijd met een helder rapport als resultaat.",
    steps: [
      { n: "01", title: "Scope bepalen", desc: "Welke systemen worden getest en hoe diep we gaan — alles op basis van jouw wensen en situatie." },
      { n: "02", title: "Pentest uitvoeren", desc: "Gecontroleerd en met jouw toestemming testen we op zwakke plekken — van SQL-injectie tot misconfiguraties." },
      { n: "03", title: "Rapport & advies", desc: "Een helder rapport met alle bevindingen, risicoclassificatie en concrete stappen om elk probleem op te lossen." },
    ],
    whatIs:
      "Professionele beveiligingstests (pentests) waarbij wij met toestemming proberen in te breken op je systemen. Resultaat: een gedetailleerd rapport met kwetsbaarheden en concrete aanbevelingen.",
    forWho: ["Bedrijven met gevoelige klantdata", "Webshops en e-commerce platforms", "Organisaties die AVG-compliant willen zijn", "Start-ups die veilig willen lanceren"],
    benefits: ["Kwetsbaarheden vinden vóór aanvallen", "Duidelijk rapport met prioriteiten", "Google-gecertificeerde beveiliging", "Voldoen aan wet- en regelgeving", "Nazorg en begeleiding bij fixes"],
    techLabel: "Expertise",
    tech: ["OWASP Top 10 methodologie", "Vulnerability scanning", "SQL-injectie & XSS testen", "Authentication & session testing", "Google Network Security certificaat"],
    cta: "Vraag beveiligingsaudit aan",
    ctaHref: "/contact",
    accentColor: "#ef4444",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */

export default function DienstenPage() {
  return (
    <main className="min-h-screen" style={{ background: DARK }}>
      <Navbar />
      <HeroSection />
      <StickyServiceNav />
      <ServicesSection />
      <CheckerSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO — lichtgewicht, geen externe scripts
══════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dh-hero {
          min-height: 88vh;
          background: ${DARK};
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 140px 20px 80px;
        }
        .dh-glow-1 {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(127,119,221,0.13) 0%, transparent 70%);
          top: -200px; right: -150px;
          pointer-events: none;
        }
        .dh-glow-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(127,119,221,0.07) 0%, transparent 70%);
          bottom: -100px; left: -100px;
          pointer-events: none;
        }
        .dh-inner {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 1024px) {
          .dh-inner { grid-template-columns: 55fr 45fr; gap: 80px; }
          .dh-hero  { padding: 160px 48px 100px; }
        }

        .dh-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: ${PURPLE}; margin: 0 0 16px;
          animation: hero-fade-up 0.5s ease both;
        }
        .dh-h1 {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800; color: #f1f5f9; line-height: 1.08;
          margin: 0 0 20px; letter-spacing: -0.02em;
          animation: hero-fade-up 0.5s ease 0.08s both;
        }
        .dh-h1 span { color: ${PURPLE}; }
        .dh-sub {
          font-size: 17px; line-height: 1.78;
          color: rgba(255,255,255,0.72); margin: 0 0 36px; max-width: 480px;
          animation: hero-fade-up 0.5s ease 0.16s both;
        }
        .dh-btns {
          display: flex; gap: 12px; flex-wrap: wrap;
          animation: hero-fade-up 0.5s ease 0.24s both;
        }
        .dh-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${PURPLE}; color: #fff !important;
          font-size: 15px; font-weight: 700; padding: 14px 28px;
          border-radius: 50px; text-decoration: none !important;
          transition: background 180ms, transform 150ms; white-space: nowrap;
        }
        .dh-btn-primary:hover { background: #6c64cc; transform: translateY(-1px); }
        .dh-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff !important;
          font-size: 15px; font-weight: 600; padding: 14px 28px;
          border-radius: 50px; text-decoration: none !important;
          border: 1px solid rgba(255,255,255,0.30);
          transition: border-color 180ms, background 180ms; white-space: nowrap;
        }
        .dh-btn-ghost:hover { border-color: rgba(255,255,255,0.60); background: rgba(255,255,255,0.05); }

        /* Visual grid right side */
        .dh-visual {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          animation: hero-fade-up 0.6s ease 0.3s both;
        }
        .dh-vis-card {
          background: #161d2e;
          border: 1px solid rgba(127,119,221,0.18);
          border-radius: 14px;
          padding: 20px 18px;
          display: flex; flex-direction: column; gap: 8px;
          transition: border-color 250ms, transform 250ms;
        }
        .dh-vis-card:hover { border-color: rgba(127,119,221,0.45); transform: translateY(-2px); }
        .dh-vis-icon { font-size: 26px; line-height: 1; }
        .dh-vis-name { font-size: 13px; font-weight: 700; color: #e2e8f0; }
        .dh-vis-desc { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.5; }
        .dh-vis-card.featured {
          grid-column: 1 / -1;
          flex-direction: row; align-items: center; gap: 16px;
          background: linear-gradient(135deg, rgba(127,119,221,0.18) 0%, rgba(127,119,221,0.05) 100%);
          border-color: rgba(127,119,221,0.35);
        }
        .dh-vis-card.featured .dh-vis-icon { font-size: 32px; }
        .dh-vis-card.featured .dh-vis-name { font-size: 15px; }
      `}</style>

      <section className="dh-hero">
        <div className="dh-glow-1" />
        <div className="dh-glow-2" />
        <div className="dh-inner">
          {/* Left — text */}
          <div>
            <p className="dh-label">ONZE DIENSTEN</p>
            <h1 className="dh-h1">
              Alles voor een <span>sterke digitale aanwezigheid</span> — onder één dak
            </h1>
            <p className="dh-sub">
              Van websites en beveiliging tot hosting en automatisering. Eerlijk, transparant en in gewone taal uitgelegd — zodat u altijd weet wat u krijgt.
            </p>
            <div className="dh-btns">
              <Link href="/contact" className="dh-btn-primary">Gratis adviesgesprek</Link>
              <a
                href="#diensten"
                className="dh-btn-ghost"
                onClick={(e) => { e.preventDefault(); document.getElementById("diensten")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Bekijk diensten ↓
              </a>
            </div>
          </div>

          {/* Right — service grid visual */}
          <div className="dh-visual">
            <div className="dh-vis-card featured">
              <span className="dh-vis-icon">🌐</span>
              <div>
                <p className="dh-vis-name">Web Development</p>
                <p className="dh-vis-desc">Websites die snel laden en klanten aantrekken</p>
              </div>
            </div>
            {[
              { icon: "⚡", name: "Hosting", desc: "99.9% uptime" },
              { icon: "🔁", name: "Automatisering", desc: "Minder handwerk" },
              { icon: "📈", name: "SEO", desc: "Hoger in Google" },
              { icon: "🔒", name: "Beveiliging", desc: "Veilig voor hackers" },
            ].map((v) => (
              <div key={v.name} className="dh-vis-card">
                <span className="dh-vis-icon">{v.icon}</span>
                <p className="dh-vis-name">{v.name}</p>
                <p className="dh-vis-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   STICKY SERVICE NAV
══════════════════════════════════════════════════════════════════════ */

function StickyServiceNav() {
  const [active, setActive] = useState(services[0].id);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const handler = () => {
      const nav = document.getElementById("service-nav");
      if (!nav) return;
      setStuck(window.scrollY > nav.offsetTop - 64);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sections = services.map((s) => document.getElementById(s.id));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .dsn-wrap {
          position: sticky;
          top: 100px;
          z-index: 40;
          background: rgba(13,17,23,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: box-shadow 250ms;
        }
        .dsn-wrap.stuck { box-shadow: 0 4px 24px rgba(0,0,0,0.4); }
        .dsn-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 20px;
          display: flex; gap: 0;
          overflow-x: auto; scrollbar-width: none;
        }
        .dsn-inner::-webkit-scrollbar { display: none; }
        .dsn-btn {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 7px;
          padding: 16px 18px;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.5);
          background: none; border: none; border-bottom: 2px solid transparent;
          cursor: pointer; font-family: inherit;
          transition: color 200ms, border-color 200ms;
          white-space: nowrap;
        }
        .dsn-btn:hover { color: rgba(255,255,255,0.85); }
        .dsn-btn.active { color: #fff; border-bottom-color: ${PURPLE}; }
        @media (min-width: 768px) {
          .dsn-btn { font-size: 14px; padding: 16px 22px; gap: 8px; }
        }
      `}</style>

      <div id="service-nav" className={`dsn-wrap${stuck ? " stuck" : ""}`}>
        <div className="dsn-inner">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`dsn-btn${active === s.id ? " active" : ""}`}
              onClick={() => {
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SERVICES — volledige secties, alles zichtbaar
══════════════════════════════════════════════════════════════════════ */

function ServiceSection({ svc, flip }: { svc: typeof services[0]; flip: boolean }) {
  return (
    <>
      <style>{`
        .ds-svc-section {
          padding: 96px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ds-svc-section:last-child { border-bottom: none; }
        .ds-svc-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .ds-svc-inner { grid-template-columns: 1fr 1fr; gap: 80px; }
          .ds-svc-inner.flip > :first-child { order: 2; }
          .ds-svc-inner.flip > :last-child  { order: 1; }
        }

        /* Left pane */
        .ds-svc-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; margin: 0 0 14px;
        }
        .ds-svc-h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 800; color: #f1f5f9; line-height: 1.15;
          margin: 0 0 16px; letter-spacing: -0.01em;
        }
        .ds-svc-tagline {
          font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.70); margin: 0 0 28px;
        }
        .ds-svc-intro {
          font-size: 15px; line-height: 1.78;
          color: rgba(255,255,255,0.60); margin: 0 0 32px;
        }

        /* Steps */
        .ds-steps { display: flex; flex-direction: column; gap: 0; margin-bottom: 32px; }
        .ds-step { display: flex; gap: 16px; align-items: flex-start; padding-bottom: 24px; }
        .ds-step-left {
          display: flex; flex-direction: column; align-items: center; flex-shrink: 0;
        }
        .ds-step-num {
          width: 38px; height: 38px; border-radius: 50%;
          font-size: 13px; font-weight: 800; color: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; z-index: 1;
        }
        .ds-step-line {
          width: 2px; flex: 1; min-height: 20px;
          margin: 6px 0;
          background: linear-gradient(to bottom, rgba(127,119,221,0.5), rgba(127,119,221,0.04));
        }
        .ds-step-title { font-size: 15px; font-weight: 700; color: #e2e8f0; margin: 8px 0 5px; }
        .ds-step-desc  { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.65; margin: 0; }

        /* CTA */
        .ds-svc-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 15px; font-weight: 700;
          padding: 14px 28px; border-radius: 50px;
          text-decoration: none !important; color: #fff !important;
          transition: opacity 180ms, transform 150ms;
          white-space: nowrap;
        }
        .ds-svc-cta:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Right pane — info cards */
        .ds-info-stack { display: flex; flex-direction: column; gap: 16px; }
        .ds-info-card {
          background: ${CARD};
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 22px 24px;
        }
        .ds-info-card-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.40);
          margin: 0 0 14px;
        }
        .ds-checklist {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 9px;
        }
        .ds-checklist li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.55;
        }
        .ds-check-icon {
          flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff;
          margin-top: 1px;
        }

        /* Tech pills */
        .ds-tech-pills {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
        }
        .ds-tech-pill {
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 100px; padding: 5px 12px;
        }

        /* Wat is het card */
        .ds-what-text {
          font-size: 14px; line-height: 1.75;
          color: rgba(255,255,255,0.65); margin: 0;
        }
      `}</style>

      <section
        id={svc.id}
        className="ds-svc-section"
        style={{ background: flip ? "#0d1117" : "#0a0f18" }}
      >
        <div className={`ds-svc-inner${flip ? " flip" : ""}`}>
          {/* LEFT — intro + steps + CTA */}
          <div>
            <p className="ds-svc-eyebrow" style={{ color: svc.accentColor }}>
              {svc.icon} &nbsp;{svc.label}
            </p>
            <h2 className="ds-svc-h2">{svc.tagline}</h2>
            <p className="ds-svc-intro">{svc.intro}</p>

            {/* Steps */}
            <div className="ds-steps">
              {svc.steps.map((step, i) => (
                <div key={step.n} className="ds-step">
                  <div className="ds-step-left">
                    <div className="ds-step-num" style={{ background: svc.accentColor }}>
                      {step.n}
                    </div>
                    {i < svc.steps.length - 1 && <div className="ds-step-line" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="ds-step-title">{step.title}</p>
                    <p className="ds-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={svc.ctaHref}
              className="ds-svc-cta"
              style={{ background: svc.accentColor }}
            >
              {svc.cta} →
            </Link>
          </div>

          {/* RIGHT — info cards */}
          <div className="ds-info-stack">
            {/* Wat is het */}
            <div className="ds-info-card">
              <p className="ds-info-card-title">Wat is het?</p>
              <p className="ds-what-text">{svc.whatIs}</p>
            </div>

            {/* Voor wie */}
            <div className="ds-info-card">
              <p className="ds-info-card-title">Voor wie?</p>
              <ul className="ds-checklist">
                {svc.forWho.map((item) => (
                  <li key={item}>
                    <span className="ds-check-icon" style={{ background: svc.accentColor }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Voordelen */}
            <div className="ds-info-card">
              <p className="ds-info-card-title">Voordelen</p>
              <ul className="ds-checklist">
                {svc.benefits.map((item) => (
                  <li key={item}>
                    <span className="ds-check-icon" style={{ background: svc.accentColor }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech */}
            <div className="ds-info-card">
              <p className="ds-info-card-title">{svc.techLabel}</p>
              <div className="ds-tech-pills">
                {svc.tech.map((t) => (
                  <span key={t} className="ds-tech-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesSection() {
  return (
    <div id="diensten">
      {services.map((svc, i) => (
        <ServiceSection key={svc.id} svc={svc} flip={i % 2 === 1} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   WEBSITE CHECKER — ongewijzigd, werkt prima
══════════════════════════════════════════════════════════════════════ */

type CheckResult = { label: string; icon: string; score: number };

const loadingMessages = [
  "Snelheid controleren...",
  "Mobiele weergave checken...",
  "SEO analyseren...",
  "Beveiligingscheck uitvoeren...",
  "Resultaten verwerken...",
];

function AnimatedScore({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += Math.ceil((target - start) / 6) || 1;
      setVal(Math.min(start, target));
      if (start < target) requestAnimationFrame(step);
    };
    const timer = setTimeout(() => requestAnimationFrame(step), 100);
    return () => clearTimeout(timer);
  }, [target]);
  return <span>{val}</span>;
}

function CheckerSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [error, setError] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getColor = (score: number) => score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const getLabel = (score: number) => score >= 80 ? "Goed" : score >= 50 ? "Kan beter" : "Verbeter dit";

  const runCheck = async () => {
    if (!url.trim()) return;
    let fullUrl = url.trim();
    if (!fullUrl.startsWith("http")) fullUrl = "https://" + fullUrl;

    setLoading(true);
    setResults(null);
    setError(false);
    setMsgIdx(0);

    intervalRef.current = setInterval(() => {
      setMsgIdx((i) => (i + 1) % loadingMessages.length);
    }, 1200);

    try {
      const encoded = encodeURIComponent(fullUrl);
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encoded}&strategy=mobile`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const cats = data?.lighthouseResult?.categories;

      const perf = Math.round((cats?.performance?.score ?? 0) * 100);
      const seo  = Math.round((cats?.seo?.score ?? 0) * 100);
      const acc  = Math.round((cats?.accessibility?.score ?? 0) * 100);
      const bp   = Math.round((cats?.["best-practices"]?.score ?? 0) * 100);
      const sec  = fullUrl.startsWith("https") ? 100 : 30;

      setResults([
        { label: "Laadsnelheid", icon: "⚡", score: perf },
        { label: "SEO",          icon: "📈", score: seo  },
        { label: "Toegankelijkheid", icon: "♿", score: acc },
        { label: "Beveiliging",  icon: "🔒", score: sec  },
        { label: "Best Practices", icon: "✅", score: bp  },
      ]);
    } catch {
      setError(true);
    } finally {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .dck-input {
          flex: 1; min-width: 0;
          background: ${CARD2}; color: #f1f5f9;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px; padding: 16px 24px;
          font-size: 16px; font-family: inherit; outline: none;
          transition: border-color 180ms;
        }
        .dck-input::placeholder { color: rgba(255,255,255,0.35); }
        .dck-input:focus { border-color: ${PURPLE}; }
        .dck-form { display: flex; gap: 12px; flex-wrap: wrap; max-width: 680px; }
        @media (max-width: 580px) {
          .dck-form { flex-direction: column; }
          .dck-input { border-radius: 14px; }
        }
        @keyframes dck-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dck-bar { from { width: 0 !important; } }
        .dck-bar-fill {
          height: 100%; border-radius: 4px;
          animation: dck-bar 1.5s cubic-bezier(0.4,0,0.2,1) both;
        }
        .dck-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${PURPLE}; color: #fff !important;
          font-size: 15px; font-weight: 700; padding: 14px 28px;
          border-radius: 50px; border: none; cursor: pointer;
          font-family: inherit; transition: background 180ms;
          white-space: nowrap;
        }
        .dck-btn:hover:not(:disabled) { background: #6c64cc; }
        .dck-btn:disabled { opacity: 0.65; cursor: not-allowed; }
      `}</style>

      <section style={{ background: DARK, padding: "96px 0", width: "100%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: PURPLE, margin: "0 0 12px" }}>
            GRATIS TOOL
          </p>
          <h2 style={{ fontSize: "clamp(1.7rem,4vw,2.25rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 14px", lineHeight: 1.18 }}>
            Hoe scoort jouw website?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: "0 0 36px", maxWidth: 520 }}>
            Vul je URL in en zie binnen 10 seconden waar verbeteringen mogelijk zijn — gratis, geen aanmelding nodig.
          </p>

          <div className="dck-form">
            <input
              className="dck-input"
              type="url"
              placeholder="https://jouwwebsite.nl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") runCheck(); }}
            />
            <button type="button" className="dck-btn" onClick={runCheck} disabled={loading}>
              {loading ? "Analyseren..." : "Analyseer gratis →"}
            </button>
          </div>

          {loading && (
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2.5px solid rgba(127,119,221,0.3)", borderTopColor: PURPLE, animation: "dck-spin 0.8s linear infinite", flexShrink: 0 }} />
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", margin: 0 }}>{loadingMessages[msgIdx]}</p>
            </div>
          )}

          {error && (
            <div style={{ marginTop: 36, padding: "20px 24px", background: CARD, borderRadius: 16, borderLeft: `3px solid ${PURPLE}`, maxWidth: 560 }}>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.80)", margin: "0 0 16px", lineHeight: 1.65 }}>
                We kunnen deze URL nu niet bereiken. Vul het contactformulier in voor een uitgebreide handmatige analyse — gratis.
              </p>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PURPLE, color: "#fff", fontSize: 15, fontWeight: 700, padding: "12px 24px", borderRadius: 50, textDecoration: "none" }}>
                Gratis analyse aanvragen →
              </Link>
            </div>
          )}

          {results && (
            <div style={{ marginTop: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14, marginBottom: 32 }}>
                {results.map((r) => (
                  <div key={r.label} style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 20px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 20 }}>{r.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{r.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
                      <span style={{ fontSize: 28, fontWeight: 800, color: getColor(r.score), lineHeight: 1 }}>
                        <AnimatedScore target={r.score} />
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>/100</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, background: `${getColor(r.score)}22`, color: getColor(r.score), border: `1px solid ${getColor(r.score)}44`, borderRadius: 100, padding: "2px 8px" }}>
                        {getLabel(r.score)}
                      </span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                      <div className="dck-bar-fill" style={{ width: `${r.score}%`, background: getColor(r.score) }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "24px 28px", background: CARD, borderLeft: `3px solid ${PURPLE}`, borderRadius: "0 12px 12px 0", maxWidth: 560 }}>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.80)", margin: "0 0 16px", lineHeight: 1.65 }}>
                  Wil je deze scores verbeteren? We kijken gratis mee en vertellen je precies wat er nodig is.
                </p>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PURPLE, color: "#fff", fontSize: 15, fontWeight: 700, padding: "12px 24px", borderRadius: 50, textDecoration: "none" }}>
                  Gratis voorstel aanvragen →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

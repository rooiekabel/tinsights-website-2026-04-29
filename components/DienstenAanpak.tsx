"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const services = [
  {
    id: "web-development",
    icon: "🌐",
    label: "Web Development",
    teaser: "Van landingspagina tot volledige webapplicatie op maat.",
    heading: "Een website die werkt voor jou — niet andersom",
    intro:
      "Van een strakke landingspagina tot een volledig maatwerk webapplicatie. We bouwen websites die snel laden, goed scoren in Google en bezoekers omzetten naar klanten. Geen templates die je beperken — code die precies doet wat jij nodig hebt.",
    steps: [
      { num: "01", title: "Kennismaking & briefing", desc: "We leren je bedrijf kennen, bepalen je doelgroep en maken heldere afspraken over wensen, tijdlijn en budget." },
      { num: "02", title: "Design & prototype", desc: "Je ziet wat je krijgt vóórdat er gebouwd wordt. Een visueel concept op maat — gebaseerd op jouw merk en doelgroep." },
      { num: "03", title: "Bouwen & live zetten", desc: "We bouwen, testen op alle apparaten en lanceren. Inclusief uitleg zodat jij zelfstandig content kunt aanpassen." },
    ],
    whatIs: "Een professionele website op maat — van eenvoudige landingspagina tot volledig CMS of webshop. Gebouwd voor snelheid, vindbaarheid en conversie. Geschikt voor elk bedrijf, elke sector.",
    forWho: ["ZZP'ers en kleine ondernemers", "Bedrijven zonder online aanwezigheid", "Organisaties met een verouderde website", "Start-ups en nieuwe bedrijven"],
    benefits: ["Gemiddeld live binnen 1–2 weken", "Mobiel geoptimaliseerd op elk apparaat", "SEO-technisch correct gebouwd", "CMS: beheer zelf je content", "SSL-certificaat inbegrepen"],
    techLabel: "Technologie",
    tech: ["React & Next.js voor web-apps", "WordPress & Headless CMS", "Tailwind CSS & custom design", "REST API integraties", "Core Web Vitals geoptimaliseerd"],
    ctaLabel: "Vraag offerte aan",
  },
  {
    id: "beveiliging",
    icon: "🔐",
    label: "Beveiliging",
    teaser: "Professionele pentests — kwetsbaarheden vinden vóór aanvallers.",
    heading: "Wij denken als hackers — om jou te beschermen",
    intro:
      "Via professionele pentests en beveiligingsaudits vinden we kwetsbaarheden in jouw systemen voordat kwaadwillenden dat doen. We rapporteren duidelijk en concreet — zonder ingewikkeld vakjargon.",
    steps: [
      { num: "01", title: "Scope bepalen", desc: "We inventariseren welke systemen, applicaties of netwerken getest moeten worden en stellen een testplan op." },
      { num: "02", title: "Pentest uitvoeren", desc: "Gecontroleerd en met jouw toestemming testen we op zwakke plekken — van SQL-injectie tot misconfiguraties." },
      { num: "03", title: "Rapport & advies", desc: "Een helder rapport met alle bevindingen, risicoclassificatie en concrete stappen om elk probleem op te lossen." },
    ],
    whatIs: "Professionele beveiligingstests (pentests) waarbij we met jouw toestemming proberen in te breken op je systemen. Resultaat: een gedetailleerd rapport zodat je weet waar je staat en wat er moet gebeuren.",
    forWho: ["Bedrijven met gevoelige klant- of patiëntdata", "Webshops en e-commerce platforms", "Organisaties die AVG-compliant willen zijn", "Start-ups die veilig willen lanceren"],
    benefits: ["Kwetsbaarheden vinden vóór aanvallen", "Concreet rapport met prioriteiten", "Voldoe aan AVG en wet- en regelgeving", "Gecertificeerde aanpak (OWASP)", "Nazorg en begeleiding bij fixes"],
    techLabel: "Expertise",
    tech: ["OWASP Top 10 methodologie", "SQL-injectie & XSS testing", "Authentication & session testing", "Vulnerability scanning", "Google Network Security certificaat"],
    ctaLabel: "Vraag beveiligingsaudit aan",
  },
  {
    id: "hosting",
    icon: "🖥️",
    label: "Hosting & Onderhoud",
    teaser: "Jij onderneemt — wij houden de techniek draaiend.",
    heading: "Jij onderneemt — wij houden de techniek draaiend",
    intro:
      "Je website is live — nu begint het echte onderhoud. Updates, backups, beveiligingspatches, monitoring. Wij regelen dat volledig zodat jij je geen moment zorgen hoeft te maken over techniek.",
    steps: [
      { num: "01", title: "Setup & migratie", desc: "We richten de hosting in of migreren je bestaande website — zonder downtime en zonder technisch gedoe voor jou." },
      { num: "02", title: "Monitoring activeren", desc: "24/7 uptime-monitoring, automatische backups en beveiligingsscans worden ingesteld en geactiveerd." },
      { num: "03", title: "Doorlopend beheer", desc: "Updates, patches en support via WhatsApp of e-mail. Altijd een echt persoon aan de andere kant." },
    ],
    whatIs: "Betrouwbare serverhosting met dagelijkse backups, SSL-certificaten, beveiligingsupdates en technische ondersteuning wanneer je het nodig hebt. Jij hoeft er niks voor te doen.",
    forWho: ["Bedrijven zonder eigen IT-afdeling", "Websites die altijd online moeten zijn", "Eigenaren die volledig ontzorgd willen worden", "Webshops met hoge betrouwbaarheidseisen"],
    benefits: ["99.9% uptime garantie", "Dagelijkse automatische backups", "SSL-certificaat inbegrepen", "Beveiligingsupdates automatisch verwerkt", "Support via WhatsApp & e-mail"],
    techLabel: "Infrastructuur",
    tech: ["Nginx op Linux servers", "Cloudflare CDN & DDoS-bescherming", "Automatische SSL via Let's Encrypt", "Git-based deployment workflows", "Node.js, PHP-FPM & Python"],
    ctaLabel: "Vraag hosting aan",
  },
  {
    id: "automatisering",
    icon: "⚙️",
    label: "Automatisering",
    teaser: "Slimme koppelingen die uren handmatig werk besparen.",
    heading: "Stop met knippen en plakken — laat het systeem het doen",
    intro:
      "Terugkerende taken kosten onnodig veel tijd. Wij bouwen slimme koppelingen en workflows tussen je systemen — van CRM aan je website tot volledig geautomatiseerde factuurverwerking. Uren besparen begint met één gesprek.",
    steps: [
      { num: "01", title: "Procesanalyse", desc: "We brengen in kaart welke taken handmatig gaan, hoeveel tijd ze kosten en of automatisering realistisch loont." },
      { num: "02", title: "Koppeling bouwen", desc: "APIs verbinden, workflows inrichten en alles grondig testen in een veilige testomgeving." },
      { num: "03", title: "Live zetten & documenteren", desc: "We activeren alles live, documenteren de werking en zorgen dat jij het begrijpt en kunt bijsturen." },
    ],
    whatIs: "Maatwerk koppelingen en workflows die jouw bedrijfsprocessen automatiseren. Van het automatisch versturen van facturen tot leads die direct vanuit je website in je CRM verschijnen.",
    forWho: ["Bedrijven met herhalende handmatige taken", "Organisaties met meerdere losse systemen", "Webshops die orderprocessen willen automatiseren", "Teams die wekelijks uren willen besparen"],
    benefits: ["Tot 80% minder handmatig werk", "Minder fouten door menselijke invoer", "Real-time datasynchronisatie", "Schaalbaar en uitbreidbaar", "ROI zichtbaar binnen enkele weken"],
    techLabel: "Technologie",
    tech: ["REST & GraphQL API integraties", "Webhooks & event-driven architectuur", "Python & Node.js scripts", "Zapier & n8n workflow automation", "Database synchronisatie"],
    ctaLabel: "Vraag offerte aan",
  },
  {
    id: "seo",
    icon: "📈",
    label: "SEO",
    teaser: "Hoger in Google zonder betaalde advertenties.",
    heading: "Gevonden worden door mensen die al naar jou zoeken",
    intro:
      "Hoger in Google is geen toeval — het is een doordachte strategie. We optimaliseren je website technisch en inhoudelijk zodat je structureel beter rankt en meer relevante bezoekers aantrekt. Zonder betaalde advertenties.",
    steps: [
      { num: "01", title: "SEO-audit", desc: "We analyseren je huidige positie: technische fouten, zoekwoorden, concurrentie en de grootste groeikansen voor jouw markt." },
      { num: "02", title: "Optimalisatie", desc: "Technische en inhoudelijke verbeteringen die direct invloed hebben op je positie in Google." },
      { num: "03", title: "Rapportage & bijsturing", desc: "Maandelijkse rapportages met duidelijke resultaten en concrete vervolgstappen. Geen vakjargon, gewoon wat werkt." },
    ],
    whatIs: "Zoekmachineoptimalisatie die ervoor zorgt dat je hoger verschijnt voor zoekwoorden die echt relevant zijn voor jouw bedrijf. Technische SEO, content en lokale vindbaarheid gecombineerd.",
    forWho: ["Bedrijven die organisch willen groeien", "Webshops die meer bezoekers willen trekken", "Lokale bedrijven (lokale SEO in de regio)", "Websites die al bestaan maar slecht ranken"],
    benefits: ["Meer organisch verkeer — geen advertentiekosten", "Hogere Google-positie voor jouw zoekwoorden", "Verbeterde laadsnelheid (Core Web Vitals)", "Google Analytics & Search Console setup", "Maandelijkse rapportages zonder vakjargon"],
    techLabel: "Aanpak",
    tech: ["Technische SEO-audit & fixes", "Keyword research en zoekwoordmapping", "On-page optimalisatie (meta, H-tags)", "Schema.org structured data", "XML sitemap en robots.txt optimalisatie"],
    ctaLabel: "Vraag SEO-audit aan",
  },
];

const aanpakSteps = [
  { n: "01", title: "Kennismaken", text: "Doel, doelgroep en planning — kort en concreet.", time: "~1–2 dagen" },
  { n: "02", title: "Vormgeving & techniek", text: "UI, snelheid en structuur: alles in lijn met je merk.", time: "~3–5 dagen" },
  { n: "03", title: "Bouwen", text: "Iteraties, testen, SEO-basis en koppelingen klaarzetten.", time: "~2–4 weken" },
  { n: "04", title: "Livegang & ondersteuning", text: "Lancering, hosting en domein, plus doorlopend onderhoud.", time: "Doorlopend" },
];

/* ─── Accordion item ───────────────────────────────────────────────────── */

function AccordionItem({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="da-accordion-item">
      <button
        type="button"
        className="da-accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <span className={`da-accordion-chevron${open ? " open" : ""}`}>▾</span>
      </button>
      {open && <div className="da-accordion-body">{children}</div>}
    </div>
  );
}

/* ─── Bottom Sheet ─────────────────────────────────────────────────────── */

function BottomSheet({ svc, onClose }: { svc: (typeof services)[0]; onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragCurrentY = useRef(0);

  /* lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* drag-to-dismiss */
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    dragCurrentY.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    if (dy < 0) return;
    dragCurrentY.current = dy;
    if (sheetRef.current) sheetRef.current.style.transform = `translateY(${dy}px)`;
  };
  const onTouchEnd = () => {
    if (dragCurrentY.current > 80) { onClose(); return; }
    if (sheetRef.current) sheetRef.current.style.transform = "";
    dragStartY.current = null;
  };

  return (
    <div className="da-overlay" onClick={onClose} role="dialog" aria-modal aria-label={svc.label}>
      <div
        ref={sheetRef}
        className="da-sheet"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Drag handle */}
        <div className="da-drag-handle" />

        {/* Scrollable content */}
        <div className="da-sheet-scroll">
          {/* Header */}
          <div className="da-sheet-header">
            <span className="da-sheet-icon">{svc.icon}</span>
            <h3 className="da-sheet-title">{svc.heading}</h3>
            <p className="da-sheet-intro">{svc.intro}</p>
          </div>

          {/* Steps */}
          <div className="da-sheet-steps">
            {svc.steps.map((step) => (
              <div key={step.num} className="da-sheet-step">
                <div className="da-step-badge">{step.num}</div>
                <div>
                  <p className="da-step-title">{step.title}</p>
                  <p className="da-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="da-accordions">
            <AccordionItem label="Wat is het?">
              <p className="da-acc-text">{svc.whatIs}</p>
            </AccordionItem>
            <AccordionItem label="Voor wie?">
              <ul className="da-acc-list">
                {svc.forWho.map((item) => <li key={item}><span className="da-dot" />{item}</li>)}
              </ul>
            </AccordionItem>
            <AccordionItem label="Voordelen">
              <ul className="da-acc-list">
                {svc.benefits.map((item) => <li key={item}><span className="da-dot" />{item}</li>)}
              </ul>
            </AccordionItem>
            <AccordionItem label={svc.techLabel}>
              <ul className="da-acc-list">
                {svc.tech.map((item) => <li key={item}><span className="da-dot" />{item}</li>)}
              </ul>
            </AccordionItem>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="da-sheet-cta">
          <Link href="/contact" className="da-cta-btn" onClick={onClose}>
            {svc.ctaLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */

export default function DienstenAanpak() {
  const [activeCard, setActiveCard] = useState(0);
  const [sheetSvc, setSheetSvc] = useState<(typeof services)[0] | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const aanpakRef = useRef<HTMLDivElement>(null);

  /* Sync dot when user scrolls the card rail */
  const handleCardScroll = useCallback(() => {
    if (!cardsRef.current) return;
    const rail = cardsRef.current;
    const cardWidth = rail.scrollWidth / services.length;
    const idx = Math.round(rail.scrollLeft / cardWidth);
    setActiveCard(Math.min(idx, services.length - 1));
  }, []);

  /* Dot click → scroll rail */
  const scrollToCard = (i: number) => {
    if (!cardsRef.current) return;
    const cardWidth = cardsRef.current.scrollWidth / services.length;
    cardsRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  /* IntersectionObserver for aanpak steps */
  useEffect(() => {
    if (!aanpakRef.current) return;
    const items = aanpakRef.current.querySelectorAll("[data-aanpak-step]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Close sheet on Escape */
  useEffect(() => {
    if (!sheetSvc) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSheetSvc(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sheetSvc]);

  return (
    <>
      <style>{`
        /* ── Section layout ── */
        .da-section {
          background: #0f172a;
          width: 100%;
          padding: 80px 0 96px;
        }
        .da-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── Header ── */
        .da-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7f77dd;
          margin: 0 0 12px;
        }
        .da-title {
          font-size: clamp(1.7rem, 4vw, 2.4rem);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.18;
          margin: 0 0 16px;
          max-width: 42rem;
        }
        .da-subtitle {
          font-size: 16px;
          line-height: 1.75;
          color: #64748b;
          margin: 0 0 40px;
          max-width: 52rem;
        }

        /* ── Card rail ── */
        .da-card-rail {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
          /* peek next card */
          padding-right: 40px;
        }
        .da-card-rail::-webkit-scrollbar { display: none; }

        .da-card {
          flex-shrink: 0;
          width: 240px;
          background: #161b27;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 22px 20px 18px;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
          transition: border-color 200ms ease, box-shadow 200ms ease;
          position: relative;
          overflow: hidden;
        }
        .da-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #7f77dd;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 250ms ease;
          border-radius: 16px 16px 0 0;
        }
        .da-card.active::before { transform: scaleX(1); }
        .da-card.active {
          border-color: rgba(127,119,221,0.35);
          box-shadow: 0 4px 24px rgba(127,119,221,0.12);
        }
        .da-card:hover {
          border-color: rgba(127,119,221,0.25);
        }
        .da-card-icon { font-size: 26px; line-height: 1; }
        .da-card-name {
          font-size: 15px;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.3;
        }
        .da-card-teaser {
          font-size: 13px;
          color: #64748b;
          line-height: 1.55;
          flex: 1;
        }
        .da-card-meer {
          font-size: 13px;
          font-weight: 600;
          color: #7f77dd;
          margin-top: 6px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: color 150ms;
        }
        .da-card-meer:hover { color: #a5a0f0; }

        /* ── Dots ── */
        .da-dots {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-top: 18px;
        }
        .da-dot-btn {
          height: 6px;
          border-radius: 3px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: #334155;
          transition: width 250ms ease, background 250ms ease;
        }
        .da-dot-btn.active {
          background: #7f77dd;
          width: 20px !important;
        }

        /* ── Overlay ── */
        .da-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          animation: da-fade-in 200ms ease both;
        }
        @keyframes da-fade-in { from { opacity:0 } to { opacity:1 } }

        /* ── Sheet ── */
        .da-sheet {
          width: 100%;
          max-height: 88vh;
          background: #0f172a;
          border-radius: 20px 20px 0 0;
          display: flex;
          flex-direction: column;
          animation: da-slide-up 350ms cubic-bezier(0.4,0,0.2,1) both;
          transition: transform 150ms ease;
        }
        @keyframes da-slide-up {
          from { transform: translateY(100%) }
          to   { transform: translateY(0) }
        }

        .da-drag-handle {
          width: 40px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.2);
          margin: 12px auto 0;
          flex-shrink: 0;
        }

        .da-sheet-scroll {
          overflow-y: auto;
          flex: 1;
          padding: 20px 20px 8px;
          scrollbar-width: thin;
          scrollbar-color: #334155 transparent;
        }

        .da-sheet-header { margin-bottom: 24px; }
        .da-sheet-icon { font-size: 32px; display: block; margin-bottom: 12px; }
        .da-sheet-title {
          font-size: clamp(1.2rem, 4vw, 1.5rem);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.25;
          margin: 0 0 12px;
        }
        .da-sheet-intro {
          font-size: 14px;
          line-height: 1.72;
          color: #64748b;
          margin: 0;
        }

        /* Steps */
        .da-sheet-steps {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }
        .da-sheet-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .da-step-badge {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #7f77dd;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }
        .da-step-title {
          font-size: 14px;
          font-weight: 700;
          color: #e2e8f0;
          margin: 0 0 4px;
        }
        .da-step-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        /* Accordions */
        .da-accordions {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .da-accordion-item {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .da-accordion-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          background: none;
          border: none;
          color: #cbd5e1;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: color 150ms;
        }
        .da-accordion-trigger:hover { color: #fff; }
        .da-accordion-chevron {
          transition: transform 200ms ease;
          color: #7f77dd;
          font-size: 16px;
        }
        .da-accordion-chevron.open { transform: rotate(180deg); }
        .da-accordion-body { padding-bottom: 14px; }
        .da-acc-text {
          font-size: 13.5px;
          line-height: 1.7;
          color: #94a3b8;
          margin: 0;
        }
        .da-acc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .da-acc-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: #94a3b8;
          line-height: 1.5;
        }
        .da-dot {
          flex-shrink: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #7f77dd;
          margin-top: 6px;
          display: inline-block;
        }

        /* Sheet CTA */
        .da-sheet-cta {
          padding: 14px 20px max(16px, env(safe-area-inset-bottom));
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .da-cta-btn {
          display: block;
          width: 100%;
          text-align: center;
          background: #7f77dd;
          color: #fff !important;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 20px;
          border-radius: 12px;
          text-decoration: none !important;
          transition: background 180ms ease;
        }
        .da-cta-btn:hover { background: #6c64cc; }

        /* ── Aanpak timeline ── */
        .da-aanpak-section {
          margin-top: 72px;
          padding-top: 64px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .da-aanpak-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7f77dd;
          margin: 0 0 12px;
        }
        .da-aanpak-title {
          font-size: clamp(1.5rem, 3.5vw, 2rem);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.2;
          margin: 0 0 48px;
          max-width: 36rem;
        }

        .da-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 560px;
        }
        .da-tl-item {
          display: flex;
          gap: 20px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 500ms ease, transform 500ms ease;
        }
        .da-tl-item:nth-child(2) { transition-delay: 100ms; }
        .da-tl-item:nth-child(3) { transition-delay: 200ms; }
        .da-tl-item:nth-child(4) { transition-delay: 300ms; }

        .da-tl-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .da-tl-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #7f77dd;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
        }
        .da-tl-line {
          width: 2px;
          flex: 1;
          min-height: 32px;
          background: linear-gradient(to bottom, rgba(127,119,221,0.5), rgba(127,119,221,0.05));
          margin: 6px 0;
        }

        .da-tl-content {
          padding-bottom: 40px;
          flex: 1;
        }
        .da-tl-item:last-child .da-tl-content { padding-bottom: 0; }

        .da-tl-title {
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 8px 0 6px;
        }
        .da-tl-text {
          font-size: 14px;
          line-height: 1.65;
          color: #64748b;
          margin: 0 0 10px;
        }
        .da-tl-pill {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #7f77dd;
          background: rgba(127,119,221,0.12);
          border: 1px solid rgba(127,119,221,0.2);
          border-radius: 100px;
          padding: 3px 10px;
          letter-spacing: 0.02em;
        }

        /* ── Desktop tweaks ── */
        @media (min-width: 768px) {
          .da-card-rail { padding-right: 20px; }
          .da-card { width: 260px; }
        }
        @media (min-width: 1024px) {
          .da-card-rail {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            overflow-x: unset;
            padding-right: 0;
          }
          .da-dots { display: none; }
          .da-card { width: auto; }
          .da-sheet { max-width: 560px; margin: 0 auto 0; border-radius: 20px; max-height: 80vh; }
          .da-overlay { align-items: center; justify-content: center; }
        }
      `}</style>

      <section className="da-section" id="services">
        <div className="da-inner">

          {/* Header */}
          <p className="da-eyebrow">ONZE DIENSTEN</p>
          <h2 className="da-title">Alles wat je nodig hebt voor een sterke digitale aanwezigheid</h2>
          <p className="da-subtitle">
            Kies de dienst die bij jou past. Liever alles samen? Dat kan ook — we denken graag mee over wat voor jouw situatie het meest logisch is.
          </p>

          {/* Card rail */}
          <div
            ref={cardsRef}
            className="da-card-rail"
            onScroll={handleCardScroll}
          >
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className={`da-card${activeCard === i ? " active" : ""}`}
                onClick={() => setActiveCard(i)}
              >
                <span className="da-card-icon">{svc.icon}</span>
                <p className="da-card-name">{svc.label}</p>
                <p className="da-card-teaser">{svc.teaser}</p>
                <button
                  type="button"
                  className="da-card-meer"
                  onClick={(e) => { e.stopPropagation(); setSheetSvc(svc); }}
                >
                  Meer info →
                </button>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="da-dots">
            {services.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`da-dot-btn${activeCard === i ? " active" : ""}`}
                style={{ width: activeCard === i ? 20 : 6 }}
                onClick={() => scrollToCard(i)}
                aria-label={`Ga naar ${services[i].label}`}
              />
            ))}
          </div>

          {/* Aanpak timeline */}
          <div className="da-aanpak-section" ref={aanpakRef}>
            <p className="da-aanpak-eyebrow">AANPAK</p>
            <h2 className="da-aanpak-title">Van plan tot live site, in zichtbare stappen</h2>

            <div className="da-timeline">
              {aanpakSteps.map((step, i) => (
                <div key={step.n} className="da-tl-item" data-aanpak-step>
                  <div className="da-tl-left">
                    <div className="da-tl-badge">{step.n}</div>
                    {i < aanpakSteps.length - 1 && <div className="da-tl-line" />}
                  </div>
                  <div className="da-tl-content">
                    <p className="da-tl-title">{step.title}</p>
                    <p className="da-tl-text">{step.text}</p>
                    <span className="da-tl-pill">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom sheet portal */}
      {sheetSvc && (
        <BottomSheet svc={sheetSvc} onClose={() => setSheetSvc(null)} />
      )}
    </>
  );
}

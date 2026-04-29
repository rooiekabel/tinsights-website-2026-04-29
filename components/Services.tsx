"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapClient";
import Link from "next/link";

const services = [
  {
    id: "web-development",
    label: "Web Development",
    heading: "Een website die werkt voor jou — niet andersom",
    intro:
      "Van een strakke landingspagina tot een volledig maatwerk webapplicatie. We bouwen websites die snel laden, goed scoren in Google en bezoekers omzetten naar klanten. Geen templates die je beperken — code die precies doet wat jij nodig hebt.",
    steps: [
      {
        num: "01",
        title: "Kennismaking & briefing",
        desc: "We leren je bedrijf kennen, bepalen je doelgroep en maken heldere afspraken over wensen, tijdlijn en budget.",
      },
      {
        num: "02",
        title: "Design & prototype",
        desc: "Je ziet wat je krijgt vóórdat er gebouwd wordt. Een visueel concept op maat — gebaseerd op jouw merk en doelgroep.",
      },
      {
        num: "03",
        title: "Bouwen & live zetten",
        desc: "We bouwen, testen op alle apparaten en lanceren. Inclusief uitleg zodat jij zelfstandig content kunt aanpassen.",
      },
    ],
    whatIs:
      "Een professionele website op maat — van eenvoudige landingspagina tot volledig CMS of webshop. Gebouwd voor snelheid, vindbaarheid en conversie. Geschikt voor elk bedrijf, elke sector.",
    forWho: [
      "ZZP'ers en kleine ondernemers",
      "Bedrijven zonder online aanwezigheid",
      "Organisaties met een verouderde website",
      "Start-ups en nieuwe bedrijven",
    ],
    benefits: [
      "Gemiddeld live binnen 1–2 weken",
      "Mobiel geoptimaliseerd op elk apparaat",
      "SEO-technisch correct gebouwd",
      "CMS: beheer zelf je content",
      "SSL-certificaat inbegrepen",
    ],
    techLabel: "Technologie",
    tech: [
      "React & Next.js voor web-apps",
      "WordPress & Headless CMS",
      "Tailwind CSS & custom design",
      "REST API integraties",
      "Core Web Vitals geoptimaliseerd",
    ],
    ctaLabel: "Vraag offerte aan",
    cta: "/contact",
  },
  {
    id: "beveiliging",
    label: "Beveiliging",
    heading: "Wij denken als hackers — om jou te beschermen",
    intro:
      "Via professionele pentests en beveiligingsaudits vinden we kwetsbaarheden in jouw systemen voordat kwaadwillenden dat doen. We rapporteren duidelijk en concreet — zonder ingewikkeld vakjargon.",
    steps: [
      {
        num: "01",
        title: "Scope bepalen",
        desc: "We inventariseren welke systemen, applicaties of netwerken getest moeten worden en stellen een testplan op.",
      },
      {
        num: "02",
        title: "Pentest uitvoeren",
        desc: "Gecontroleerd en met jouw toestemming testen we op zwakke plekken — van SQL-injectie tot misconfiguraties.",
      },
      {
        num: "03",
        title: "Rapport & advies",
        desc: "Een helder rapport met alle bevindingen, risicoclassificatie en concrete stappen om elk probleem op te lossen.",
      },
    ],
    whatIs:
      "Professionele beveiligingstests (pentests) waarbij we met jouw toestemming proberen in te breken op je systemen. Resultaat: een gedetailleerd rapport zodat je weet waar je staat en wat er moet gebeuren.",
    forWho: [
      "Bedrijven met gevoelige klant- of patiëntdata",
      "Webshops en e-commerce platforms",
      "Organisaties die AVG-compliant willen zijn",
      "Start-ups die veilig willen lanceren",
    ],
    benefits: [
      "Kwetsbaarheden vinden vóór aanvallen",
      "Concreet rapport met prioriteiten",
      "Voldoe aan AVG en wet- en regelgeving",
      "Gecertificeerde aanpak (OWASP)",
      "Nazorg en begeleiding bij fixes",
    ],
    techLabel: "Expertise",
    tech: [
      "OWASP Top 10 methodologie",
      "SQL-injectie & XSS testing",
      "Authentication & session testing",
      "Vulnerability scanning",
      "Google Network Security certificaat",
    ],
    ctaLabel: "Vraag beveiligingsaudit aan",
    cta: "/contact",
  },
  {
    id: "hosting",
    label: "Hosting & Onderhoud",
    heading: "Jij onderneemt — wij houden de techniek draaiend",
    intro:
      "Je website is live — nu begint het echte onderhoud. Updates, backups, beveiligingspatches, monitoring. Wij regelen dat volledig zodat jij je geen moment zorgen hoeft te maken over techniek.",
    steps: [
      {
        num: "01",
        title: "Setup & migratie",
        desc: "We richten de hosting in of migreren je bestaande website — zonder downtime en zonder technisch gedoe voor jou.",
      },
      {
        num: "02",
        title: "Monitoring activeren",
        desc: "24/7 uptime-monitoring, automatische backups en beveiligingsscans worden ingesteld en geactiveerd.",
      },
      {
        num: "03",
        title: "Doorlopend beheer",
        desc: "Updates, patches en support via WhatsApp of e-mail. Altijd een echt persoon aan de andere kant.",
      },
    ],
    whatIs:
      "Betrouwbare serverhosting met dagelijkse backups, SSL-certificaten, beveiligingsupdates en technische ondersteuning wanneer je het nodig hebt. Jij hoeft er niks voor te doen.",
    forWho: [
      "Bedrijven zonder eigen IT-afdeling",
      "Websites die altijd online moeten zijn",
      "Eigenaren die volledig ontzorgd willen worden",
      "Webshops met hoge betrouwbaarheidseisen",
    ],
    benefits: [
      "99.9% uptime garantie",
      "Dagelijkse automatische backups",
      "SSL-certificaat inbegrepen",
      "Beveiligingsupdates automatisch verwerkt",
      "Support via WhatsApp & e-mail",
    ],
    techLabel: "Infrastructuur",
    tech: [
      "Nginx op Linux servers",
      "Cloudflare CDN & DDoS-bescherming",
      "Automatische SSL via Let's Encrypt",
      "Git-based deployment workflows",
      "Node.js, PHP-FPM & Python",
    ],
    ctaLabel: "Vraag hosting aan",
    cta: "/contact",
  },
  {
    id: "automatisering",
    label: "Automatisering",
    heading: "Stop met knippen en plakken — laat het systeem het doen",
    intro:
      "Terugkerende taken kosten onnodig veel tijd. Wij bouwen slimme koppelingen en workflows tussen je systemen — van CRM aan je website tot volledig geautomatiseerde factuurverwerking. Uren besparen begint met één gesprek.",
    steps: [
      {
        num: "01",
        title: "Procesanalyse",
        desc: "We brengen in kaart welke taken handmatig gaan, hoeveel tijd ze kosten en of automatisering realistisch loont.",
      },
      {
        num: "02",
        title: "Koppeling bouwen",
        desc: "APIs verbinden, workflows inrichten en alles grondig testen in een veilige testomgeving.",
      },
      {
        num: "03",
        title: "Live zetten & documenteren",
        desc: "We activeren alles live, documenteren de werking en zorgen dat jij het begrijpt en kunt bijsturen.",
      },
    ],
    whatIs:
      "Maatwerk koppelingen en workflows die jouw bedrijfsprocessen automatiseren. Van het automatisch versturen van facturen tot leads die direct vanuit je website in je CRM verschijnen.",
    forWho: [
      "Bedrijven met herhalende handmatige taken",
      "Organisaties met meerdere losse systemen",
      "Webshops die orderprocessen willen automatiseren",
      "Teams die wekelijks uren willen besparen",
    ],
    benefits: [
      "Tot 80% minder handmatig werk",
      "Minder fouten door menselijke invoer",
      "Real-time datasynchronisatie",
      "Schaalbaar en uitbreidbaar",
      "ROI zichtbaar binnen enkele weken",
    ],
    techLabel: "Technologie",
    tech: [
      "REST & GraphQL API integraties",
      "Webhooks & event-driven architectuur",
      "Python & Node.js scripts",
      "Zapier & n8n workflow automation",
      "Database synchronisatie",
    ],
    ctaLabel: "Vraag offerte aan",
    cta: "/contact",
  },
  {
    id: "seo",
    label: "SEO",
    heading: "Gevonden worden door mensen die al naar jou zoeken",
    intro:
      "Hoger in Google is geen toeval — het is een doordachte strategie. We optimaliseren je website technisch en inhoudelijk zodat je structureel beter rankt en meer relevante bezoekers aantrekt. Zonder betaalde advertenties.",
    steps: [
      {
        num: "01",
        title: "SEO-audit",
        desc: "We analyseren je huidige positie: technische fouten, zoekwoorden, concurrentie en de grootste groeikansen voor jouw markt.",
      },
      {
        num: "02",
        title: "Optimalisatie",
        desc: "Technische en inhoudelijke verbeteringen die direct invloed hebben op je positie in Google.",
      },
      {
        num: "03",
        title: "Rapportage & bijsturing",
        desc: "Maandelijkse rapportages met duidelijke resultaten en concrete vervolgstappen. Geen vakjargon, gewoon wat werkt.",
      },
    ],
    whatIs:
      "Zoekmachineoptimalisatie die ervoor zorgt dat je hoger verschijnt voor zoekwoorden die echt relevant zijn voor jouw bedrijf. Technische SEO, content en lokale vindbaarheid gecombineerd.",
    forWho: [
      "Bedrijven die organisch willen groeien",
      "Webshops die meer bezoekers willen trekken",
      "Lokale bedrijven (lokale SEO in de regio)",
      "Websites die al bestaan maar slecht ranken",
    ],
    benefits: [
      "Meer organisch verkeer — geen advertentiekosten",
      "Hogere Google-positie voor jouw zoekwoorden",
      "Verbeterde laadsnelheid (Core Web Vitals)",
      "Google Analytics & Search Console setup",
      "Maandelijkse rapportages zonder vakjargon",
    ],
    techLabel: "Aanpak",
    tech: [
      "Technische SEO-audit & fixes",
      "Keyword research en zoekwoordmapping",
      "On-page optimalisatie (meta, H-tags)",
      "Schema.org structured data",
      "XML sitemap en robots.txt optimalisatie",
    ],
    ctaLabel: "Vraag SEO-audit aan",
    cta: "/contact",
  },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pendingDirRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  /* Entrance animation */
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-svc-in]"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  /* Animate content IN after React re-renders on tab change */
  useEffect(() => {
    const dir = pendingDirRef.current;
    if (dir === null || !contentRef.current) return;
    pendingDirRef.current = null;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: dir * 48 },
      { opacity: 1, x: 0, duration: 0.32, ease: "power2.out" }
    );
  }, [activeIdx]);

  const switchTab = (newIdx: number) => {
    if (newIdx === activeIdx || !contentRef.current) return;
    const dir = newIdx > activeIdx ? 1 : -1;
    gsap.to(contentRef.current, {
      overwrite: "auto",
      opacity: 0,
      x: dir * -48,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => {
        pendingDirRef.current = dir;
        setActiveIdx(newIdx);
      },
    });
  };

  /* Touch swipe support */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) < 60) return;
    const next =
      diff > 0
        ? Math.min(activeIdx + 1, services.length - 1)
        : Math.max(activeIdx - 1, 0);
    switchTab(next);
  };

  const s = services[activeIdx];

  return (
    <>
      <style>{`
        .svc-tab-bar {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }
        .svc-tab-bar::-webkit-scrollbar { display: none; }
        .svc-tab-pill {
          flex-shrink: 0;
          padding: 9px 20px;
          border-radius: 100px;
          border: 1px solid #334155;
          background: transparent;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: color 180ms, border-color 180ms, background 180ms;
          white-space: nowrap;
          font-family: inherit;
          line-height: 1;
        }
        .svc-tab-pill:hover {
          color: #cbd5e1;
          border-color: #475569;
        }
        .svc-tab-active {
          background: #6366f1 !important;
          border-color: #6366f1 !important;
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        .svc-steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .svc-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .svc-steps-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .svc-info-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .svc-card {
          background: #1e293b;
          border: 1px solid #1e3a5f;
          border-radius: 16px;
          padding: 28px;
        }
        .svc-step-num {
          font-size: 36px;
          font-weight: 800;
          color: rgba(99,102,241,0.2);
          line-height: 1;
          margin-bottom: 16px;
          font-variant-numeric: tabular-nums;
          letter-spacing: -1px;
        }
        .svc-info-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6366f1;
          margin: 0 0 14px;
        }
        .svc-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .svc-info-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.5;
        }
        .svc-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6366f1;
          flex-shrink: 0;
          margin-top: 5px;
        }
        .svc-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #6366f1;
          color: #ffffff !important;
          font-weight: 600;
          font-size: 14px;
          padding: 13px 26px;
          border-radius: 10px;
          text-decoration: none !important;
          transition: background 180ms ease;
        }
        .svc-cta-link:hover { background: #4f46e5; }
      `}</style>

      <section
        id="services"
        ref={sectionRef}
        style={{ background: "#0f172a" }}
        className="w-full scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ paddingTop: 80, paddingBottom: 96 }}>

          {/* Section heading */}
          <div data-svc-in style={{ maxWidth: "44rem", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px" }}>
              Onze Diensten
            </p>
            <h2 style={{ fontWeight: 800, lineHeight: 1.18, color: "#f1f5f9", margin: "0 0 16px" }} className="text-3xl sm:text-4xl">
              Alles wat je nodig hebt voor een sterke digitale aanwezigheid
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#64748b", margin: 0 }}>
              Kies de dienst die bij jou past. Liever alles samen? Dat kan ook — we denken graag mee over wat voor jouw situatie het meest logisch is.
            </p>
          </div>

          {/* Tab navigation */}
          <div data-svc-in className="svc-tab-bar" style={{ marginBottom: 40 }}>
            {services.map((svc, i) => (
              <button
                key={svc.id}
                className={`svc-tab-pill${activeIdx === i ? " svc-tab-active" : ""}`}
                onClick={() => switchTab(i)}
                type="button"
              >
                {svc.label}
              </button>
            ))}
          </div>

          {/* Content panel — swiped on mobile */}
          <div
            ref={contentRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ overflow: "hidden" }}
          >
            {/* Heading + intro */}
            <div style={{ marginBottom: 36 }}>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
                  fontWeight: 800,
                  color: "#f1f5f9",
                  lineHeight: 1.2,
                  margin: "0 0 14px",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.heading}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.78, color: "#64748b", margin: 0, maxWidth: "64ch" }}>
                {s.intro}
              </p>
            </div>

            {/* 3-step process */}
            <div className="svc-steps-grid">
              {s.steps.map((step) => (
                <div key={step.num} className="svc-card">
                  <div className="svc-step-num">{step.num}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", margin: "0 0 10px", lineHeight: 1.3 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #1e293b", margin: "32px 0" }} />

            {/* Info 2×2 grid */}
            <div className="svc-info-grid">
              <div className="svc-card">
                <p className="svc-info-label">Wat is het?</p>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{s.whatIs}</p>
              </div>
              <div className="svc-card">
                <p className="svc-info-label">Voor wie?</p>
                <ul className="svc-info-list">
                  {s.forWho.map((item) => (
                    <li key={item}><span className="svc-dot" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="svc-card">
                <p className="svc-info-label">Voordelen</p>
                <ul className="svc-info-list">
                  {s.benefits.map((item) => (
                    <li key={item}><span className="svc-dot" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="svc-card">
                <p className="svc-info-label">{s.techLabel}</p>
                <ul className="svc-info-list">
                  {s.tech.map((item) => (
                    <li key={item}><span className="svc-dot" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <Link href={s.cta} className="svc-cta-link">
                {s.ctaLabel} →
              </Link>
              {/* Tab position indicator */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {services.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => switchTab(i)}
                    aria-label={`Ga naar ${services[i].label}`}
                    style={{
                      width: i === activeIdx ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === activeIdx ? "#6366f1" : "#334155",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "width 250ms ease, background 250ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

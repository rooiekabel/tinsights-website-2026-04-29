"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesCanvas from "@/components/ParticlesCanvas";

/* ══════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════ */

const PURPLE = "#7f77dd";
const DARK = "#0d1117";

const tabs = [
  { id: "website",   label: "Website",        icon: "🌐" },
  { id: "hosting",   label: "Hosting",         icon: "⚡" },
  { id: "security",  label: "Beveiliging",     icon: "🔒" },
  { id: "marketing", label: "Marketing & SEO", icon: "📈" },
];

const websitePakketten = [
  {
    name: "Online Starter",
    price: "€99",
    period: "eenmalig",
    desc: "Snel online met een professionele pagina.",
    features: ["1 pagina", "Template design", "Mobiel geoptimaliseerd", "Contactformulier", "Basis SEO", "1 revisieronde", "1 week support"],
    cta: "Vraag offerte aan",
    featured: false,
  },
  {
    name: "ZZP Starter",
    price: "€249",
    period: "eenmalig",
    desc: "Ideaal voor zelfstandigen die snel zichtbaar willen zijn.",
    features: ["1 maatwerk pagina", "Mobiel geoptimaliseerd", "Contactformulier", "Basis SEO", "SSL beveiliging", "Binnen 3–5 dagen online", "2 weken support"],
    cta: "Vraag offerte aan",
    featured: false,
  },
  {
    name: "Website Starter",
    price: "€349",
    period: "eenmalig",
    desc: "Perfect voor kleine bedrijven die professioneel willen overkomen.",
    features: ["Tot 3 pagina's", "Modern design", "Contactformulier", "Mobiel geoptimaliseerd", "Basis SEO", "SSL beveiliging", "Binnen 5–7 dagen online", "2 weken support"],
    cta: "Vraag offerte aan",
    featured: true,
    badge: "Meest gekozen",
  },
  {
    name: "Professional",
    price: "€699",
    period: "eenmalig",
    desc: "Voor groeiende bedrijven die meer willen.",
    features: ["3–5 pagina's", "Maatwerk design", "CMS", "Blog mogelijkheid", "Basis SEO", "SSL", "Binnen 7 dagen online", "1 maand support"],
    cta: "Vraag offerte aan",
    featured: false,
  },
  {
    name: "Business",
    price: "€1.499",
    period: "eenmalig",
    desc: "Volledig pakket voor serieuze online aanwezigheid.",
    features: ["5–12 pagina's", "Custom design", "Blog / Nieuws", "Uitgebreide SEO", "Analytics dashboard", "CMS training", "3 maanden support"],
    cta: "Vraag offerte aan",
    featured: false,
  },
];

const hostingPakketten = [
  {
    name: "Starter",
    priceMonthly: "€19",
    priceYearly: "€190",
    oldPriceMonthly: "€24",
    oldPriceYearly: "€238",
    unitMonthly: "/m",
    unitYearly: "/jr",
    desc: "Voor kleine websites die betrouwbaar online moeten zijn.",
    features: ["Gratis .nl of .com domein", "5GB SSD storage", "50GB bandbreedte", "Gratis SSL certificaat", "Dagelijkse backup", "E-mail support"],
    cta: "Kies Starter",
    featured: false,
  },
  {
    name: "Basic",
    priceMonthly: "€29",
    priceYearly: "€290",
    oldPriceMonthly: "€36",
    oldPriceYearly: "€348",
    unitMonthly: "/m",
    unitYearly: "/jr",
    desc: "De meest gekozen optie voor professionele websites.",
    features: ["Gratis .nl of .com domein", "15GB SSD storage", "150GB bandbreedte", "Gratis SSL certificaat", "2x dagelijkse backup", "Priority support", "2 e-mailaccounts"],
    cta: "Kies Basic",
    featured: true,
    badge: "Populairste keuze",
  },
  {
    name: "Pro",
    priceMonthly: "€49",
    priceYearly: "€490",
    oldPriceMonthly: "€59",
    oldPriceYearly: "€588",
    unitMonthly: "/m",
    unitYearly: "/jr",
    desc: "Voor webshops en drukbezochte websites.",
    features: ["Gratis .nl of .com domein", "30GB SSD storage", "Onbeperkte bandbreedte", "Gratis SSL certificaat", "4x dagelijkse backup", "24/7 priority support", "10 e-mailaccounts", "Performance monitoring"],
    cta: "Kies Pro",
    featured: false,
  },
];

const securityPakketten = [
  {
    name: "Security Scan",
    price: "€195",
    period: "eenmalig",
    desc: "Snel inzicht in kwetsbaarheden van uw website.",
    features: ["Geautomatiseerde scan", "Vulnerability rapport", "Basis aanbevelingen", "1 week support"],
    cta: "Vraag scan aan",
    featured: false,
  },
  {
    name: "Penetration Test",
    price: "€695",
    period: "eenmalig",
    desc: "Diepgaande handmatige test door gecertificeerde experts.",
    features: ["Handmatige pentest", "OWASP Top 10", "Uitgebreid rapport", "1x retest", "1 maand support"],
    cta: "Vraag pentest aan",
    featured: true,
    badge: "Meest gekozen",
  },
  {
    name: "Full Audit",
    price: "€1.495",
    period: "eenmalig",
    desc: "Complete beveiligingsaudit voor organisaties met hoge eisen.",
    features: ["Complete security audit", "Infrastructuur + applicatie", "Compliance check", "2x retest", "3 maanden monitoring"],
    cta: "Vraag audit aan",
    featured: false,
  },
];

const marketingPakketten = [
  {
    name: "SEO Basis",
    price: "€145",
    period: "eenmalig",
    desc: "Een sterke SEO-fundatie voor uw website.",
    features: ["Keyword research", "On-page SEO", "Google setup", "Meta optimalisatie"],
    cta: "Vraag SEO aan",
    featured: false,
  },
  {
    name: "SEO Maandelijks",
    price: "€195",
    period: "per maand",
    desc: "Doorlopende groei in zoekmachines.",
    features: ["Continue optimalisatie", "Content strategie", "Backlink building", "Maandrapport"],
    cta: "Start SEO",
    featured: true,
    badge: "Beste resultaten",
  },
  {
    name: "Social Media",
    price: "€245",
    period: "per maand",
    desc: "Professioneel socialmediabeheer van A tot Z.",
    features: ["12 posts per maand", "Content creatie", "Community management", "Maandrapport"],
    cta: "Vraag social aan",
    featured: false,
  },
];

const hostingVoordelen = [
  { icon: "🌐", title: "Gratis Domein", desc: ".nl of .com domein inbegrepen" },
  { icon: "🔒", title: "SSL Certificaat", desc: "HTTPS voor veilige verbindingen" },
  { icon: "💾", title: "Dagelijkse Backups", desc: "Je data is altijd veilig" },
  { icon: "⚡", title: "99.9% Uptime", desc: "Jouw website altijd online" },
];

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */

export default function PrijzenPage() {
  const [activeTab, setActiveTab] = useState("website");

  return (
    <main style={{ background: DARK, minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div id="website"  style={{ display: activeTab === "website"   ? "block" : "none" }}><WebsiteSection /></div>
      <div id="hosting"  style={{ display: activeTab === "hosting"   ? "block" : "none" }}><HostingSection /></div>
      <div id="security" style={{ display: activeTab === "security"  ? "block" : "none" }}><SecuritySection /></div>
      <div id="marketing"style={{ display: activeTab === "marketing" ? "block" : "none" }}><MarketingSection /></div>
      <BottomCTA />
      <Footer />
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes ph-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ph-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, #0d1117 0%, #0f0c1f 60%, #0d1117 100%);
          padding: 160px 20px 80px;
          text-align: center;
        }
        .ph-hero-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
        .ph-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: ${PURPLE}; margin: 0 0 18px;
          animation: ph-fade 0.5s ease both;
        }
        .ph-h1 {
          font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800;
          color: #f1f5f9; line-height: 1.08; margin: 0 0 20px;
          letter-spacing: -0.02em;
          animation: ph-fade 0.5s ease 0.08s both;
        }
        .ph-h1 span { color: ${PURPLE}; }
        .ph-sub {
          font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.65);
          margin: 0 0 40px; max-width: 520px; margin-left: auto; margin-right: auto;
          animation: ph-fade 0.5s ease 0.16s both;
        }
        .ph-stats {
          display: flex; gap: 32px; justify-content: center; flex-wrap: wrap;
          animation: ph-fade 0.5s ease 0.24s both;
        }
        .ph-stat { text-align: center; }
        .ph-stat-num { font-size: 28px; font-weight: 800; color: #f1f5f9; line-height: 1; }
        .ph-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 4px; }
        @media (max-width: 640px) {
          .ph-hero { padding: 140px 20px 60px; }
          .ph-stats { gap: 20px; }
          .ph-stat-num { font-size: 22px; }
        }
      `}</style>
      <section className="ph-hero">
        <ParticlesCanvas
          id="prijzen-hero-particles"
          particleColor={PURPLE}
          linkColor={PURPLE}
          count={50}
          speed={0.5}
          particleOpacity={0.35}
          linkOpacity={0.1}
          repulse={false}
        />
        <div className="ph-hero-inner">
          <p className="ph-eyebrow">TRANSPARANTE PRIJZEN</p>
          <h1 className="ph-h1">
            Duidelijke pakketten,<br /><span>eerlijke prijzen</span>
          </h1>
          <p className="ph-sub">
            Geen verborgen kosten, geen verrassingen. Kies het pakket dat bij uw situatie past — of vraag een offerte op maat aan.
          </p>
          <div className="ph-stats">
            <div className="ph-stat">
              <div className="ph-stat-num">50+</div>
              <div className="ph-stat-lbl">Projecten opgeleverd</div>
            </div>
            <div className="ph-stat">
              <div className="ph-stat-num">4.9★</div>
              <div className="ph-stat-lbl">Google Reviews</div>
            </div>
            <div className="ph-stat">
              <div className="ph-stat-num">24u</div>
              <div className="ph-stat-lbl">Reactietijd</div>
            </div>
            <div className="ph-stat">
              <div className="ph-stat-num">100%</div>
              <div className="ph-stat-lbl">Geen verborgen kosten</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAB NAV
══════════════════════════════════════════════════════════════════════ */

function TabNav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
  return (
    <>
      <style>{`
        .ptab-wrap {
          position: sticky; top: 100px; z-index: 40;
          background: rgba(13,17,23,0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ptab-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 20px;
          display: flex; overflow-x: auto; scrollbar-width: none;
        }
        .ptab-inner::-webkit-scrollbar { display: none; }
        .ptab-btn {
          flex-shrink: 0; display: flex; align-items: center; gap: 8px;
          padding: 16px 22px; font-size: 14px; font-weight: 600;
          color: rgba(255,255,255,0.45); background: none; border: none;
          border-bottom: 2px solid transparent; cursor: pointer;
          font-family: inherit; transition: color 200ms, border-color 200ms;
          white-space: nowrap;
        }
        .ptab-btn:hover { color: rgba(255,255,255,0.80); }
        .ptab-btn.active { color: #fff; border-bottom-color: ${PURPLE}; }
      `}</style>
      <div className="ptab-wrap">
        <div className="ptab-inner">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`ptab-btn${activeTab === t.id ? " active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PRICING CARD
══════════════════════════════════════════════════════════════════════ */

type PakketType = {
  name: string; price: string; period: string; desc: string;
  features: string[]; cta: string; featured: boolean; badge?: string;
};

function PricingCard({ p, accentColor = PURPLE }: { p: PakketType; accentColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .pc-card {
          position: relative;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px 24px 24px;
          display: flex; flex-direction: column; gap: 0;
          opacity: 0; transform: translateY(24px);
          transition: opacity 500ms ease, transform 500ms ease, border-color 250ms, box-shadow 250ms;
        }
        .pc-card:hover {
          border-color: rgba(127,119,221,0.3);
          box-shadow: 0 8px 40px rgba(127,119,221,0.08);
          transform: translateY(-2px) !important;
        }
        .pc-card.featured {
          border-color: rgba(127,119,221,0.45);
          background: linear-gradient(160deg, #1a1f35 0%, #111827 100%);
          box-shadow: 0 4px 32px rgba(127,119,221,0.12);
        }
        .pc-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #fff;
          padding: 4px 14px; border-radius: 100px;
          white-space: nowrap;
        }
        .pc-name { font-size: 16px; font-weight: 700; color: #f1f5f9; margin: 0 0 6px; }
        .pc-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; margin: 0 0 20px; }
        .pc-price-row { margin-bottom: 24px; }
        .pc-price { font-size: 40px; font-weight: 800; color: #f1f5f9; line-height: 1; letter-spacing: -0.02em; }
        .pc-period { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 4px; }
        .pc-features {
          list-style: none; padding: 0; margin: 0 0 28px;
          display: flex; flex-direction: column; gap: 10px; flex: 1;
        }
        .pc-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.5;
        }
        .pc-check {
          flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff; margin-top: 1px;
        }
        .pc-cta {
          display: block; text-align: center; font-size: 14px; font-weight: 700;
          padding: 13px 20px; border-radius: 50px; text-decoration: none !important;
          transition: opacity 180ms, transform 150ms;
          color: #fff !important;
        }
        .pc-cta:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>
      <div ref={ref} className={`pc-card${p.featured ? " featured" : ""}`}>
        {p.badge && (
          <span className="pc-badge" style={{ background: accentColor }}>
            {p.badge}
          </span>
        )}
        <p className="pc-name">{p.name}</p>
        <p className="pc-desc">{p.desc}</p>
        <div className="pc-price-row">
          <div className="pc-price">{p.price}</div>
          <div className="pc-period">{p.period}</div>
        </div>
        <ul className="pc-features">
          {p.features.map((f) => (
            <li key={f}>
              <span className="pc-check" style={{ background: accentColor }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
        <Link href="/contact" className="pc-cta" style={{ background: p.featured ? accentColor : "rgba(255,255,255,0.08)", color: p.featured ? "#fff" : "rgba(255,255,255,0.8)" }}>
          {p.cta} →
        </Link>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION WRAPPER
══════════════════════════════════════════════════════════════════════ */

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: PURPLE, margin: "0 0 12px" }}>
        {eyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 14px", lineHeight: 1.12, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: 0 }}>
        {sub}
      </p>
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 20,
};

const sectionStyle: React.CSSProperties = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "80px 20px 100px",
};

/* ══════════════════════════════════════════════════════════════════════
   WEBSITE SECTION
══════════════════════════════════════════════════════════════════════ */

function WebsiteSection() {
  return (
    <section style={{ background: DARK }}>
      <div style={sectionStyle}>
        <SectionHeader
          eyebrow="WEBSITE PAKKETTEN"
          title="Van one-pager tot volledige webapplicatie"
          sub="Transparante prijzen voor elk type website. Geen verborgen kosten — wat je ziet is wat je betaalt."
        />
        <div style={gridStyle}>
          {websitePakketten.map((p) => (
            <PricingCard key={p.name} p={p} accentColor={PURPLE} />
          ))}
        </div>

        {/* Enterprise card */}
        <EnterpriseCard />
      </div>
    </section>
  );
}

function EnterpriseCard() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        marginTop: 20, opacity: 0, transform: "translateY(24px)",
        transition: "opacity 500ms ease 300ms, transform 500ms ease 300ms",
        background: "linear-gradient(135deg, rgba(127,119,221,0.12) 0%, rgba(127,119,221,0.05) 100%)",
        border: "1px solid rgba(127,119,221,0.25)",
        borderRadius: 20, padding: "32px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24, flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 28 }}>🏢</span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Enterprise</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}>Op maat · Custom quote</p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
          {["Onbeperkt pagina's", "Volledig maatwerk", "E-commerce / Webshop", "Custom dashboards", "API integraties", "Uitgebreide support"].map((f) => (
            <span key={f} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: PURPLE }}>✓</span> {f}
            </span>
          ))}
        </div>
      </div>
      <Link href="/contact" style={{
        flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8,
        background: PURPLE, color: "#fff", fontSize: 15, fontWeight: 700,
        padding: "14px 28px", borderRadius: 50, textDecoration: "none",
        transition: "opacity 180ms", whiteSpace: "nowrap",
      }}>
        Vraag offerte aan →
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HOSTING SECTION
══════════════════════════════════════════════════════════════════════ */

function HostingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section style={{ background: "#0a0f18" }}>
      <div style={sectionStyle}>
        <SectionHeader
          eyebrow="HOSTING & DOMEIN"
          title="Betrouwbare hosting met alles inbegrepen"
          sub="Snel, veilig en altijd online — wij regelen de techniek zodat u dat niet hoeft."
        />

        {/* Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, color: yearly ? "rgba(255,255,255,0.45)" : "#f1f5f9", fontWeight: yearly ? 400 : 700, transition: "color 200ms" }}>
            Maandelijks
          </span>
          <button
            type="button"
            onClick={() => setYearly((y) => !y)}
            aria-label="Wissel tussen maandelijks en jaarlijks"
            style={{
              width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
              background: yearly ? "#22c55e" : "rgba(255,255,255,0.12)",
              position: "relative", transition: "background 250ms", flexShrink: 0,
              padding: 0,
            }}
          >
            <span style={{
              position: "absolute", top: 3, left: yearly ? 26 : 3,
              width: 22, height: 22, borderRadius: "50%", background: "#fff",
              transition: "left 250ms cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
              display: "block",
            }} />
          </button>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14, color: yearly ? "#f1f5f9" : "rgba(255,255,255,0.45)", fontWeight: yearly ? 700 : 400, transition: "color 200ms" }}>
              Jaarlijks
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#22c55e",
              background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 100, padding: "3px 10px", letterSpacing: "0.04em",
            }}>
              2 MAANDEN GRATIS
            </span>
          </span>
        </div>

        <div id="hosting-cards" style={{ ...gridStyle, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {hostingPakketten.map((p) => (
            <HostingCard key={p.name} p={p} yearly={yearly} />
          ))}
        </div>

        {/* Voordelen */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {hostingVoordelen.map((v) => (
            <div key={v.title} style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "20px 22px", display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{v.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", margin: "0 0 4px" }}>{v.title}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.55 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <HostingComparisonTable />
      </div>
    </section>
  );
}

type HostingPakket = typeof hostingPakketten[0];

function HostingCard({ p, yearly }: { p: HostingPakket; yearly: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayPrice = yearly ? p.priceYearly : p.priceMonthly;
  const displayUnit  = yearly ? p.unitYearly  : p.unitMonthly;
  const oldPrice     = yearly ? p.oldPriceYearly : p.oldPriceMonthly;
  const GREEN = "#22c55e";

  return (
    <div
      ref={ref}
      className={`pc-card${p.featured ? " featured" : ""}`}
      style={{ borderColor: p.featured ? "rgba(34,197,94,0.45)" : undefined }}
    >
      {p.badge && (
        <span className="pc-badge" style={{ background: GREEN }}>{p.badge}</span>
      )}
      <p className="pc-name">{p.name}</p>
      <p className="pc-desc">{p.desc}</p>
      <div className="pc-price-row">
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <div className="pc-price" style={{ transition: "all 250ms" }}>{displayPrice}</div>
            <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 1 }}>{displayUnit}</span>
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", textDecoration: "line-through" }}>
            {oldPrice}
          </span>
        </div>
        <div className="pc-period" style={{ marginTop: 6 }}>
          {yearly ? "per jaar" : "per maand"}
        </div>
        {yearly && (
          <div style={{ marginTop: 6, fontSize: 12, color: GREEN, fontWeight: 600 }}>
            ✓ 2 maanden gratis
          </div>
        )}
      </div>
      <ul className="pc-features">
        {p.features.map((f) => (
          <li key={f}>
            <span className="pc-check" style={{ background: GREEN }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="pc-cta"
        style={{
          background: p.featured ? GREEN : "rgba(255,255,255,0.08)",
          color: p.featured ? "#fff" : "rgba(255,255,255,0.8)",
        }}
      >
        {p.cta} →
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HOSTING COMPARISON TABLE
══════════════════════════════════════════════════════════════════════ */

const comparisonRows: { feature: string; starter: string; basic: string; pro: string }[] = [
  { feature: "Gratis .nl of .com domein",  starter: "✓",         basic: "✓",         pro: "✓"         },
  { feature: "Gratis SSL certificaat",      starter: "✓",         basic: "✓",         pro: "✓"         },
  { feature: "SSD Storage",                starter: "5GB",        basic: "15GB",       pro: "30GB"      },
  { feature: "Bandbreedte",                starter: "50GB",       basic: "150GB",      pro: "Onbeperkt" },
  { feature: "Dagelijkse backup",          starter: "1x",         basic: "2x",         pro: "4x"        },
  { feature: "E-mailaccounts",             starter: "1",          basic: "2",          pro: "10"        },
  { feature: "E-mail support",             starter: "✓",         basic: "✓",         pro: "✓"         },
  { feature: "Priority support",           starter: "—",         basic: "✓",         pro: "✓"         },
  { feature: "24/7 support",              starter: "—",         basic: "—",         pro: "✓"         },
  { feature: "Performance monitoring",     starter: "—",         basic: "—",         pro: "✓"         },
  { feature: "Uptime garantie",            starter: "99.9%",      basic: "99.9%",      pro: "99.9%"     },
  { feature: "Geschikt voor webshops",     starter: "—",         basic: "✓",         pro: "✓"         },
  { feature: "Maandelijks opzegbaar",      starter: "✓",         basic: "✓",         pro: "✓"         },
];

function HostingComparisonTable() {
  const GREEN = "#22c55e";

  const renderCell = (val: string, isBasic = false) => {
    if (val === "✓") return (
      <span style={{ color: GREEN, fontWeight: 700, fontSize: 16 }}>✓</span>
    );
    if (val === "—") return (
      <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 15 }}>—</span>
    );
    return (
      <span style={{ color: isBasic ? "#a5b4fc" : "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: 13 }}>{val}</span>
    );
  };

  return (
    <div style={{ marginTop: 72 }}>
      {/* Section title */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#22c55e", margin: "0 0 12px" }}>
          VERGELIJKING
        </p>
        <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
          Alles overzichtelijk vergeleken
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto" }}>
          Niet zeker welk hostingpakket bij u past?{" "}
          Dit overzicht helpt u de juiste keuze te maken.
        </p>
      </div>

      {/* Scrollable table wrapper */}
      <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 580 }}>
          {/* Header */}
          <thead>
            <tr style={{ background: "#111827" }}>
              <th style={{
                padding: "18px 20px", textAlign: "left", fontSize: 13,
                fontWeight: 700, color: "rgba(255,255,255,0.45)",
                borderBottom: "1px solid rgba(255,255,255,0.08)", width: "38%",
              }}>
                Functie
              </th>
              {[
                { label: "Starter", price: "€19/m", highlight: false },
                { label: "Basic",   price: "€29/m", highlight: true  },
                { label: "Pro",     price: "€49/m", highlight: false },
              ].map((col) => (
                <th
                  key={col.label}
                  style={{
                    padding: "18px 16px", textAlign: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    background: col.highlight ? "rgba(34,197,94,0.07)" : undefined,
                    borderLeft: col.highlight ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    borderRight: col.highlight ? "1px solid rgba(34,197,94,0.2)" : undefined,
                    position: "relative",
                  }}
                >
                  {col.highlight && (
                    <span style={{
                      position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      background: GREEN, color: "#fff", padding: "2px 10px", borderRadius: "0 0 8px 8px",
                    }}>
                      Populair
                    </span>
                  )}
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>{col.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: col.highlight ? GREEN : "#7f77dd" }}>{col.price}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.feature} style={{ background: i % 2 === 0 ? "#0d1117" : "#0f1420" }}>
                <td style={{
                  padding: "13px 20px", fontSize: 13, color: "rgba(255,255,255,0.68)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: 500,
                }}>
                  {row.feature}
                </td>
                <td style={{
                  padding: "13px 16px", textAlign: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}>
                  {renderCell(row.starter)}
                </td>
                <td style={{
                  padding: "13px 16px", textAlign: "center",
                  borderBottom: "1px solid rgba(34,197,94,0.08)",
                  borderLeft: "1px solid rgba(34,197,94,0.2)",
                  borderRight: "1px solid rgba(34,197,94,0.2)",
                  background: "rgba(34,197,94,0.04)",
                }}>
                  {renderCell(row.basic, true)}
                </td>
                <td style={{
                  padding: "13px 16px", textAlign: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  {renderCell(row.pro)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center", margin: "16px 0 32px", lineHeight: 1.6 }}>
        Alle pakketten zijn maandelijks opzegbaar.{" "}
        Kies jaarlijks voor 2 maanden gratis.
      </p>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <a
          href="#hosting-cards"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("hosting-cards")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: GREEN, color: "#fff",
            fontSize: 14, fontWeight: 700, padding: "13px 28px",
            borderRadius: 50, textDecoration: "none",
            transition: "opacity 180ms",
          }}
        >
          Kies jouw pakket →
        </a>
        <Link
          href="/contact"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", color: "rgba(255,255,255,0.75)",
            fontSize: 14, fontWeight: 600, padding: "13px 28px",
            borderRadius: 50, border: "1px solid rgba(255,255,255,0.2)",
            textDecoration: "none", transition: "border-color 180ms, color 180ms",
          }}
        >
          Stel een vraag
        </Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SECURITY SECTION
══════════════════════════════════════════════════════════════════════ */

function SecuritySection() {
  return (
    <section style={{ background: DARK }}>
      <div style={sectionStyle}>
        <SectionHeader
          eyebrow="BEVEILIGING & ETHICAL HACKING"
          title="Bescherm uw website voordat het misgaat"
          sub="Wij denken als hackers om uw systemen te beschermen. Gecertificeerd en AVG-compliant."
        />
        <div style={gridStyle}>
          {securityPakketten.map((p) => (
            <PricingCard key={p.name} p={p} accentColor="#ef4444" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MARKETING SECTION
══════════════════════════════════════════════════════════════════════ */

function MarketingSection() {
  return (
    <section style={{ background: "#0a0f18" }}>
      <div style={sectionStyle}>
        <SectionHeader
          eyebrow="MARKETING & SEO"
          title="Vergroot uw online zichtbaarheid"
          sub="Gevonden worden in Google is geen toeval — wij zorgen voor een doordachte strategie."
        />
        <div style={gridStyle}>
          {marketingPakketten.map((p) => (
            <PricingCard key={p.name} p={p} accentColor="#3b82f6" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   BOTTOM CTA
══════════════════════════════════════════════════════════════════════ */

function BottomCTA() {
  return (
    <>
      <style>{`
        .pb-cta {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          padding: 96px 20px; text-align: center;
        }
        .pb-cta-inner { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
        .pb-cta h2 {
          font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
          color: #fff; margin: 0 0 14px; letter-spacing: -0.02em; line-height: 1.1;
        }
        .pb-cta p {
          font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.68); margin: 0 0 36px;
        }
        .pb-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .pb-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #4338ca !important;
          font-size: 15px; font-weight: 700; padding: 15px 32px;
          border-radius: 50px; text-decoration: none !important;
          transition: all 0.2s; box-shadow: 0 4px 24px rgba(0,0,0,0.25);
          white-space: nowrap;
        }
        .pb-btn-primary:hover { background: #eef2ff; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,0,0,0.3); }
        .pb-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.85) !important;
          font-size: 15px; font-weight: 600; padding: 15px 28px;
          border-radius: 50px; border: 1px solid rgba(255,255,255,0.28);
          text-decoration: none !important; transition: all 0.2s; white-space: nowrap;
        }
        .pb-btn-ghost:hover { border-color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.07); color: #fff !important; }
        @media (max-width: 580px) {
          .pb-cta { padding: 72px 20px; }
          .pb-cta-btns { flex-direction: column; align-items: center; }
          .pb-btn-primary, .pb-btn-ghost { width: 100%; max-width: 320px; justify-content: center; }
        }
      `}</style>
      <section className="pb-cta">
        <ParticlesCanvas
          id="prijzen-cta-particles"
          particleColor="#a5b4fc"
          linkColor="#818cf8"
          count={40}
          speed={0.4}
          particleOpacity={0.35}
          linkOpacity={0.1}
          repulse={false}
        />
        <div className="pb-cta-inner">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 16px" }}>
            NIET ZEKER WELK PAKKET?
          </p>
          <h2>Wij denken graag met u mee</h2>
          <p>Vraag een gratis offerte op maat aan — binnen 24 uur antwoord. Geen verplichtingen, geen verborgen kosten.</p>
          <div className="pb-cta-btns">
            <Link href="/contact" className="pb-btn-primary">Gratis offerte aanvragen →</Link>
            <a href="tel:0853696652" className="pb-btn-ghost">085 - 369 6652</a>
          </div>
        </div>
      </section>
    </>
  );
}

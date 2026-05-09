"use client";

import { Fragment, useEffect, useRef, useState, type TouchEvent } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import BranchPricingBlock, { type PricingTierConfig } from "@/components/BranchPricingBlock";

const BG1 = "#0a0f1e";
const BG2 = "#0d1117";
const TEAL = "#0d9488";
const TEAL_BRIGHT = "#2dd4bf";

const MOCKUP_SLIDES = [
  {
    src: "/assets/tandarts.png",
    alt: "Voorbeeld tandartspraktijk website licht thema",
    url: "www.tandartspraktijk-voorbeeld.nl",
    label: "Stijl A — Licht & Professioneel",
  },
  {
    src: "/assets/tandarts_mockup.png",
    alt: "Voorbeeld tandarts website modern thema",
    url: "www.dentista-praktijk.nl",
    label: "Stijl B — Modern & Vertrouwd",
  },
] as const;

const heroTrust = ["4.9/5 Google Reviews", "Binnen 2 weken online", "Vaste prijs, geen verrassingen", "Heel Nederland"] as const;

const features = [
  {
    title: "Online afsprakensysteem",
    text: "Patiënten plannen zelf een afspraak via uw website, dag en nacht. U ontvangt automatisch een bevestiging. Geen telefoontjes meer tussendoor en een altijd bijgewerkte agenda.",
    Icon: IconCalendar,
  },
  {
    title: "Behandelingen overzicht",
    text: "Toon duidelijk welke behandelingen u aanbiedt, van periodieke controle tot cosmetische tandheelkunde. Patiënten weten vooraf wat ze kunnen verwachten.",
    Icon: IconList,
  },
  {
    title: "Google Reviews integratie",
    text: "Uw beste Google reviews worden automatisch getoond op uw website. Positieve beoordelingen wekken vertrouwen bij nieuwe patiënten en overtuigen hen om een afspraak te maken.",
    Icon: IconStar,
  },
  {
    title: "Mobiel geoptimaliseerd",
    text: "Meer dan 80% van uw bezoekers komt via de telefoon. Uw website werkt perfect op elk apparaat, van smartphone tot desktop. Snel, overzichtelijk en gebruiksvriendelijk.",
    Icon: IconMobile,
  },
  {
    title: "Gevonden worden in Google",
    text: "Uw website wordt volledig geoptimaliseerd voor zoekmachines (SEO). Zo verschijnt u bovenaan wanneer iemand zoekt op 'tandarts in uw regio'.",
    Icon: IconSearch,
  },
  {
    title: "Zelf beheren via beheerpaneel",
    text: "Openingstijden aanpassen, nieuwe behandelingen toevoegen of een bericht plaatsen? Dat doet u zelf via een eenvoudig beheerpaneel (CMS). Geen technische kennis vereist.",
    Icon: IconPencil,
  },
];

const pricingTiers = [
  {
    name: "Website Starter",
    price: "Vanaf €349",
    desc: "Voor praktijken die snel en professioneel online willen staan.",
    features: [
      "Tot 3 pagina's",
      "Modern maatwerk design",
      "Contactformulier",
      "Behandelingen overzicht",
      "Mobiel geoptimaliseerd",
      "Basis SEO (gevonden worden in Google)",
      "SSL (veilige verbinding voor patiënten)",
      "Binnen 5 tot 7 dagen online",
      "2 weken support",
    ],
    ctaHighlight: false,
  },
  {
    name: "Professional",
    price: "Vanaf €699",
    desc: "Voor praktijken die meer patiënten willen bereiken en slimmer willen werken.",
    badge: "Meest gekozen",
    features: [
      "3 tot 5 pagina's",
      "Volledig maatwerk design",
      "Online afsprakensysteem",
      "Uitgebreid behandelingenoverzicht",
      "Google Reviews integratie",
      "Uitgebreide SEO",
      "CMS (zelf content beheren)",
      "1 maand support",
    ],
    ctaHighlight: true,
  },
  {
    name: "Business Plus",
    price: "Vanaf €1.499",
    desc: "Voor praktijken die volledig digitaal willen werken en maximaal willen groeien.",
    features: [
      "Alles uit Professional",
      "Volledig maatwerk design",
      "Admin dashboard op maat",
      "Patiëntenbeheer systeem",
      "Automatische afspraakherinneringen",
      "Online betalingen integratie",
      "Uitgebreide analytics en rapportages",
      "Koppeling met praktijkmanagementsoftware",
      "3 maanden support",
      "Prioriteit bij aanpassingen",
    ],
    ctaHighlight: false,
  },
];

const TD_PRICE_ACCENT = "#0d9488";

const TD_TIER_INDICATORS = ["Starter", "Professional", "Business Plus"] as const;

const TD_PRICING_TIERS: PricingTierConfig[] = pricingTiers.map((tier, idx) => ({
  title: tier.name,
  tierIndicator: TD_TIER_INDICATORS[idx],
  description: tier.desc,
  priceAmount: tier.price.startsWith("Vanaf ") ? tier.price.slice(6) : tier.price,
  badge: Boolean(tier.badge),
  highlight: tier.ctaHighlight,
  features: tier.features,
  ctaLabel: "Vraag offerte aan",
  ctaAria: `Vraag offerte aan voor ${tier.name}`,
}));

const faqItems = [
  {
    q: "Hoe lang duurt het bouwen van mijn website?",
    a: "Gemiddeld bouwen wij een website voor een tandartspraktijk binnen 1 tot 2 weken op. Na een eerste gesprek over uw wensen en het goedkeuren van het ontwerp gaan wij direct aan de slag.",
  },
  {
    q: "Kunnen patiënten online een afspraak maken?",
    a: "Ja. Wij integreren een online afsprakensysteem in uw website. Patiënten kiezen zelf een datum en tijd die voor hen uitkomt. U ontvangt automatisch een bevestiging en uw agenda wordt direct bijgewerkt.",
  },
  {
    q: "Kan ik zelf mijn behandelingen en openingstijden aanpassen?",
    a: "Ja. Via uw beheerpaneel (CMS) past u zelf teksten, behandelingen, openingstijden en foto's aan. Wijzigingen zijn direct zichtbaar op uw website. Geen technische kennis vereist.",
  },
  {
    q: "Werken jullie ook buiten Groningen?",
    a: "Wij werken volledig op afstand en bedienen tandartspraktijken door heel Nederland. Van Amsterdam tot Eindhoven en van Rotterdam tot Leeuwarden. Afstand is geen enkel probleem.",
  },
  {
    q: "Is mijn website veilig voor patiëntgegevens?",
    a: "Ja. Alle websites die wij bouwen worden voorzien van een SSL-certificaat (veilige verbinding) en worden gebouwd volgens de geldende privacywetgeving (AVG). Contactformulieren en afsprakensystemen verwerken gegevens veilig.",
  },
  {
    q: "Kan mijn website later uitgebreid worden?",
    a: "Zeker. Wij bouwen websites die eenvoudig uitgebreid kunnen worden. Een koppeling met uw praktijkmanagementsoftware, een extra pagina voor een nieuwe tandarts of een uitgebreider afsprakensysteem: dat regelen wij zonder problemen.",
  },
];

function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL_BRIGHT} strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL_BRIGHT} strokeWidth="1.8" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={TEAL_BRIGHT} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconMobile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL_BRIGHT} strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL_BRIGHT} strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TEAL_BRIGHT} strokeWidth="1.8" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function useCarousel(length: number, intervalMs: number, paused: boolean) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (paused || length <= 1) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, intervalMs, length]);
  return [slide, setSlide] as const;
}

function BreadcrumbBar() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "100px 16px 10px",
        background: "#0a0f1e",
        boxSizing: "border-box",
      }}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: 13,
        }}
      >
        <li>
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Home
          </Link>
        </li>
        <li style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>/</li>
        <li>
          <Link
            href="/branches"
            style={{
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Branches
          </Link>
        </li>
        <li style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>/</li>
        <li style={{ color: "#f1f5f9", fontWeight: 500, fontSize: 13 }}>Tandartspraktijken</li>
      </ol>
    </div>
  );
}

function HeroDesktopMockup({ slides }: { slides: typeof MOCKUP_SLIDES }) {
  const [paused, setPaused] = useState(false);
  const touchRef = useRef<number | null>(null);
  const [slide, setSlide] = useCarousel(slides.length, 3500, paused);

  const onTouchStart = (e: TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchRef.current === null) return;
    const d = touchRef.current - e.changedTouches[0].clientX;
    if (d > 50) setSlide((s) => (s + 1) % slides.length);
    else if (d < -50) setSlide((s) => (s - 1 + slides.length) % slides.length);
    touchRef.current = null;
  };

  return (
    <div
      className="td-bob-wrap relative hidden w-full max-w-[560px] justify-center lg:flex"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="td-bob-inner w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1f2e]"
        style={{ boxShadow: "0 20px 60px rgba(20,184,166,0.15)" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.08] bg-[#1a1f2e] px-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-full bg-white/10 px-3 py-1">
            <span className="truncate font-mono text-[11px] text-white/40 transition-opacity duration-300">
              {slides[slide].url}
            </span>
          </div>
        </div>
        <div className="relative h-[320px] w-full overflow-hidden">
          {slides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out"
              style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 10 : 0 }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex w-full flex-col items-center gap-2">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Toon slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-teal-500" : "w-2 bg-white/20"}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
        <p className="text-center text-[13px] text-white/45">{slides[slide].label}</p>
      </div>
    </div>
  );
}

function HeroMobileMockup({ slides }: { slides: typeof MOCKUP_SLIDES }) {
  const [paused, setPaused] = useState(false);
  const touchRef = useRef<number | null>(null);
  const [slide, setSlide] = useCarousel(slides.length, 3500, paused);

  const onTouchStart = (e: TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchRef.current === null) return;
    const d = touchRef.current - e.changedTouches[0].clientX;
    if (d > 50) setSlide((s) => (s + 1) % slides.length);
    else if (d < -50) setSlide((s) => (s - 1 + slides.length) % slides.length);
    touchRef.current = null;
  };

  return (
    <div className="mt-6 block px-4 lg:hidden">
      <div
        className="relative mx-auto max-w-xs overflow-hidden rounded-2xl border border-white/10"
        style={{ height: 280 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-full w-full">
          {slides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out"
              style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 10 : 0 }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Mobiele slide ${i + 1}`}
            className={`h-2 rounded-full ${i === slide ? "w-6 bg-teal-500" : "w-2 bg-white/20"}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[13px] text-white/45">{slides[slide].label}</p>
    </div>
  );
}

function ExampleCarousel() {
  const slides = MOCKUP_SLIDES;
  const [paused, setPaused] = useState(false);
  const touchRef = useRef<number | null>(null);
  const [slide, setSlide] = useCarousel(slides.length, 4000, paused);

  const prev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide((s) => (s + 1) % slides.length);

  const onTouchStart = (e: TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchRef.current === null) return;
    const d = touchRef.current - e.changedTouches[0].clientX;
    if (d > 50) next();
    else if (d < -50) prev();
    touchRef.current = null;
  };

  return (
    <div
      className="td-bob-wrap relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="td-bob-inner relative overflow-hidden rounded-xl border border-white/10 bg-[#1a1f2e]"
        style={{ boxShadow: "0 20px 60px rgba(20,184,166,0.15)" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.08] bg-[#1a1f2e] px-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-full bg-white/10 px-3 py-1">
            <span className="truncate font-mono text-[11px] text-white/40">{slides[slide].url}</span>
          </div>
        </div>
        <div className="relative h-[220px] w-full overflow-hidden md:h-[320px]">
          {slides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out"
              style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 10 : 0 }}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Vorige voorbeeld"
          className="absolute bottom-14 left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-teal-500/40 bg-[#0a0f1e]/80 text-teal-400 backdrop-blur-sm transition hover:bg-teal-500/10"
          onClick={prev}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button
          type="button"
          aria-label="Volgende voorbeeld"
          className="absolute bottom-14 right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-teal-500/40 bg-[#0a0f1e]/80 text-teal-400 backdrop-blur-sm transition hover:bg-teal-500/10"
          onClick={next}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Voorbeeld slide ${i + 1}`}
            className={`h-2 rounded-full ${i === slide ? "w-6 bg-teal-500" : "w-2 bg-white/20"}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[13px] text-white/45">{slides[slide].label}</p>
    </div>
  );
}

export default function TandartsPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="branch-landing-root min-h-dvh w-full max-w-[100vw] overflow-x-hidden box-border text-base text-slate-100 antialiased" style={{ background: BG1 }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .branch-landing-root { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        .branch-landing-root section { width: 100%; max-width: 100%; box-sizing: border-box; }
        @keyframes td-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .td-bob-inner { animation: td-bob 4s ease-in-out infinite; }
        .pricing-scroll-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .pricing-scroll-hide::-webkit-scrollbar { display: none; }
        .trust-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .trust-scroll::-webkit-scrollbar { display: none; }
        .td-py-section { padding: 40px 24px; margin: 0; box-sizing: border-box; }
        @media (min-width: 1024px) { .td-py-section { padding: 64px 24px; } }
        .td-stats-wrap {
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 40px 0;
          margin-top: 40px;
        }
        @media (min-width: 1024px) { .td-stats-wrap { padding: 40px 0; margin-top: 48px; } }
        .td-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        @media (min-width: 1024px) { .td-stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .td-stat-cell {
          border-top: 2px solid ${TEAL_BRIGHT};
          padding: 16px;
          background: transparent;
          box-sizing: border-box;
          min-width: 0;
        }
        .td-feat-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
        @media (min-width: 768px) { .td-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        .td-feat-edit {
          position: relative;
          padding: 16px 20px 16px 23px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          box-sizing: border-box;
        }
        .td-feat-edit::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: ${TEAL_BRIGHT};
        }
        .td-feat-ic { width: 20px; height: 20px; margin-bottom: 8px; color: ${TEAL_BRIGHT}; display: flex; align-items: center; }
        .td-feat-ic svg { width: 20px !important; height: 20px !important; display: block; flex-shrink: 0; }
        .td-faq-row { border-bottom: 1px solid rgba(255,255,255,0.08); background: transparent; }
        .td-faq-btn {
          width: 100%;
          padding: 14px 0;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          font-family: inherit;
        }
        .td-faq-chev { transition: transform 280ms cubic-bezier(0.4,0,0.2,1); color: rgba(255,255,255,0.5); font-size: 14px; display: inline-block; }
        .td-internal-pills { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .td-pill-link {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 10px 24px;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          box-sizing: border-box;
        }
        .td-pill-link:hover { border-color: ${TEAL_BRIGHT}; color: #fff; }
        .td-cta-grid { display: grid; gap: 32px; align-items: center; grid-template-columns: 1fr; text-align: left; }
        @media (min-width: 900px) { .td-cta-grid { grid-template-columns: 60fr 40fr; gap: 48px; } }
        .td-cta-buttons { display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
      `}</style>

      <Navbar />

      <BreadcrumbBar />

      {/* —— Hero —— */}
      <section
        className="relative overflow-hidden td-py-section lg:pb-24 lg:pt-8 w-full max-w-full box-border"
        style={{ background: BG1 }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(20,184,166,0.12) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-[1] mx-auto box-border w-full min-w-0 max-w-[1200px] px-6 lg:px-8">
          <div className="grid min-w-0 w-full max-w-full grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
            <div className="min-w-0 w-full max-w-full box-border text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-400"
              >
                Webdesign voor tandartspraktijken
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                className="mb-6 break-words text-[clamp(2rem,5.5vw,3.35rem)] font-extrabold leading-[1.08] tracking-tight text-slate-100"
              >
                Professionele website laten maken
                <br className="hidden sm:block" />
                <span className="text-teal-300"> voor uw tandartspraktijk</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
                className="mx-auto mb-9 max-w-[520px] break-words text-[17px] leading-relaxed text-white/65 lg:mx-0"
              >
                Een moderne, vertrouwenwekkende website die patiënten aantrekt en online afspraken mogelijk maakt.
                Tinsights bouwt websites voor tandartspraktijken door heel Nederland. Op maat, betaalbaar en binnen twee
                weken online.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
                className="flex flex-col gap-3.5 justify-center lg:flex-row lg:flex-wrap lg:justify-start"
              >
                <Link
                  href="/contact"
                  aria-label="Gratis adviesgesprek aanvragen voor uw tandartspraktijk website"
                  className="flex min-h-[52px] w-full items-center justify-center whitespace-normal rounded-full px-8 text-center text-[15px] font-bold text-white transition hover:opacity-95 lg:w-auto"
                  style={{ background: TEAL }}
                >
                  Gratis adviesgesprek aanvragen
                </Link>
                <a
                  href="#features"
                  aria-label="Bekijk welke onderdelen wij voor tandartsen bouwen"
                  className="flex min-h-[52px] w-full items-center justify-center whitespace-normal rounded-full border border-teal-500/50 bg-transparent px-8 text-center text-[15px] font-semibold text-teal-300 transition hover:bg-teal-500/10 lg:w-auto"
                >
                  Bekijk wat wij bieden
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="trust-scroll mt-10 flex w-full min-w-0 max-w-full flex-nowrap gap-0 overflow-x-auto whitespace-nowrap border-t border-white/[0.08] pt-7 lg:justify-center"
              >
                {heroTrust.map((text, idx) => (
                  <Fragment key={text}>
                    {idx > 0 ? (
                      <span className="shrink-0 px-3 text-[13px] text-white/35" aria-hidden>
                        |
                      </span>
                    ) : null}
                    <span
                      className="shrink-0 text-[13px] font-medium text-white/[0.65]"
                      style={{
                        paddingTop: "min(48px - 17.55px, 12px)",
                        paddingBottom: "min(48px - 17.55px, 12px)",
                        lineHeight: 1.35,
                      }}
                    >
                      {text}
                    </span>
                  </Fragment>
                ))}
              </motion.div>

              <HeroMobileMockup slides={MOCKUP_SLIDES} />
            </div>

            <div className="hidden lg:flex lg:justify-end">
              <HeroDesktopMockup slides={MOCKUP_SLIDES} />
            </div>
          </div>
        </div>
      </section>

      {/* —— Intro —— */}
      <section id="over" className="td-py-section" style={{ background: BG2 }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <h2 className="mb-8 text-[clamp(1.6rem,3.8vw,2.25rem)] font-extrabold leading-snug tracking-tight text-slate-100">
              Waarom heeft uw tandartspraktijk een website nodig?
            </h2>
            <p className="mb-6 text-[17px] leading-relaxed text-white/60">
              Patiënten zoeken steeds vaker online naar een tandarts in hun buurt. Zonder professionele website mist u
              nieuwe patiënten aan concurrenten die wél online gevonden worden. Een goede website zorgt voor een
              professionele eerste indruk en maakt het eenvoudig om een afspraak in te plannen.
            </p>
            <p className="mb-6 text-[17px] leading-relaxed text-white/60">
              Een website voor uw tandartspraktijk doet meer dan alleen uw contactgegevens tonen. Patiënten kunnen
              behandelingen bekijken, online een afspraak inplannen en uw reviews lezen. Dit verlaagt de drempel om contact
              op te nemen en zorgt voor een volle agenda.
            </p>
            <p className="text-[17px] leading-relaxed text-white/60">
              Of u nu een solo praktijk heeft of deel uitmaakt van een grotere groepspraktijk: wij bouwen een website die
              past bij uw praktijk en uitstraling. Altijd geoptimaliseerd voor Google en volledig mobiel vriendelijk.
            </p>
          </motion.div>
          <div className="td-stats-wrap">
            <div className="td-stats-grid">
              {[
                { n: "72%", t: "Van patiënten zoekt online naar een tandarts" },
                { n: "3x", t: "Meer nieuwe patiënten met online afspraken" },
                { n: "24/7", t: "Bereikbaar voor afspraken via uw website" },
                { n: "2 weken", t: "Gemiddelde bouwtijd voor een tandarts website" },
              ].map((s) => (
                <div key={s.n} className="td-stat-cell">
                  <p className="text-[2.5rem] font-bold leading-none" style={{ color: TEAL_BRIGHT }}>
                    {s.n}
                  </p>
                  <p className="mt-1.5 text-[0.8rem] leading-snug text-white/[0.55]">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* —— Features —— */}
      <section id="features" className="td-py-section" style={{ background: BG1 }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="mb-4 text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-slate-100">
            Wat zit er in uw website?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-[17px] text-white/50">
            Speciaal afgestemd op de behoeften van tandartspraktijken.
          </p>
          <div className="td-feat-grid">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="td-feat-edit"
              >
                <div className="td-feat-ic" aria-hidden>
                  <f.Icon />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="text-[13px] leading-[1.6] text-white/60">{f.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* —— Example —— */}
      <section id="voorbeeld" className="td-py-section" style={{ background: BG2 }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="mb-4 text-center text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold">Voorbeeld van ons werk</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-[17px] text-white/50">
            Zo kan uw website eruitzien. Elk project bouwen wij op maat naar uw praktijk en huisstijl.
          </p>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ExampleCarousel />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-400">Voorbeeldproject</p>
              <h3 className="mb-4 text-2xl font-extrabold text-slate-100">Tandartspraktijk De Glimlach</h3>
              <p className="mb-6 text-[17px] leading-relaxed text-white/60">
                Een complete website voor een moderne tandartspraktijk. Met online afsprakensysteem, behandelingenoverzicht
                en Google Reviews integratie. Het project was binnen 10 werkdagen live.
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {["Online afspraken", "Behandelingen", "Google Reviews", "SEO geoptimaliseerd"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-teal-500/40 px-3 py-1.5 text-[13px] font-semibold text-teal-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/projecten"
                aria-label="Bekijk meer projecten van Tinsights"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-teal-500/50 px-8 text-[15px] font-bold text-teal-300 transition hover:bg-teal-500/10 sm:w-auto"
              >
                Bekijk meer projecten
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <BranchPricingBlock
        accentColor={TD_PRICE_ACCENT}
        sectionEyebrow="Investering"
        sectionTitle="Wat kost een website voor een tandartspraktijk?"
        intro="De prijs hangt af van uw wensen en functies. Onderstaande prijzen geven een indicatie. Wij denken graag vrijblijvend met u mee."
        tiers={TD_PRICING_TIERS}
        sectionClassName="td-py-section"
        sectionStyle={{ background: BG1 }}
        footerBlurb={
          <>
            Twijfelt u welk pakket past bij uw praktijk? Wij denken graag vrijblijvend met u mee. De prijs kan hoger of lager
            uitvallen afhankelijk van uw specifieke wensen.{" "}
            <Link href="/contact" style={{ color: TD_PRICE_ACCENT, fontWeight: 600 }} className="underline-offset-4 hover:underline">
              Vraag een gratis offerte aan
            </Link>
          </>
        }
      />

      {/* —— FAQ —— */}
      <section id="faq" className="td-py-section" style={{ background: BG2 }}>
        <div className="mx-auto max-w-[720px] px-6">
          <h2 className="mb-4 text-center text-[clamp(1.55rem,3.5vw,2rem)] font-extrabold">
            Veelgestelde vragen over een tandarts website
          </h2>
          <p className="mb-8 text-center text-[16px] text-white/50">
            Staat uw vraag er niet bij? Neem gerust contact met ons op.
          </p>
          <div>
            {faqItems.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q} className="td-faq-row">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`td-faq-panel-${idx}`}
                    id={`td-faq-h-${idx}`}
                    className="td-faq-btn"
                    onClick={() => setOpenFaq(open ? null : idx)}
                  >
                    <span style={{ color: open ? TEAL_BRIGHT : "#f1f5f9", transition: "color 200ms ease" }} className="pr-3 text-[16px] font-semibold leading-snug">
                      {item.q}
                    </span>
                    <span className="td-faq-chev shrink-0" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} aria-hidden>
                      ▼
                    </span>
                  </button>
                  <div
                    id={`td-faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`td-faq-h-${idx}`}
                    style={{
                      overflow: "hidden",
                      maxHeight: open ? 560 : 0,
                      transition: "max-height 0.42s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <p className="pb-4 text-[14px] leading-[1.7] text-white/[0.65]">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* —— Internal links —— */}
      <section className="td-py-section" style={{ background: BG1 }}>
        <div className="mx-auto max-w-[1000px] px-6">
          <h2 className="mb-7 text-center text-xl font-bold text-white/90 sm:text-2xl">
            Wij bouwen ook websites voor andere branches
          </h2>
          <nav className="td-internal-pills" aria-label="Gerelateerde branches">
            {(
              [
                { label: "Kappers & barbershops", href: "/website-laten-maken-kapper" },
                { label: "Restaurants & horeca", href: "/website-laten-maken-restaurant" },
                { label: "Garages & APK", href: "/website-laten-maken-garage" },
                { label: "Autobedrijven & occasions", href: "/website-laten-maken-autobedrijf" },
              ] as const
            ).map((c) => (
              <Link key={c.href} href={c.href} aria-label={`${c.label} — bekijk deze branch`} className="td-pill-link">
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* —— Bottom CTA —— */}
      <section className="td-py-section px-6" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}>
        <div className="mx-auto max-w-[980px]">
          <div className="td-cta-grid">
            <div>
              <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.55rem)] font-extrabold leading-tight text-white">
                Klaar voor uw nieuwe praktijkwebsite?
              </h2>
              <p className="text-[16px] leading-relaxed text-white/[0.68]">
                Vertel ons over uw tandartspraktijk. Wij reageren binnen 24 uur met een vrijblijvend advies en prijsindicatie.
                Geen verplichtingen.
              </p>
            </div>
            <div className="td-cta-buttons">
              <a
                href="https://wa.me/31619181483"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Tinsights voor uw praktijkwebsite"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#25d366] px-7 text-[15px] font-bold text-white shadow-lg shadow-green-900/30"
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@tinsights.nl"
                aria-label="E-mail naar Tinsights"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-white/35 bg-transparent px-7 text-[15px] font-bold text-white"
              >
                E-mail sturen
              </a>
              <a
                href="tel:0853696652"
                aria-label="Bel Tinsights op 085 369 6652"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-white/35 bg-transparent px-7 text-[15px] font-semibold text-white/90"
              >
                085 - 369 6652
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

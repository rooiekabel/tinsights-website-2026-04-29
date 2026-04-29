"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Spline: client-only, no SSR ────────────────────────────────────── */
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const SPLINE_URL = "https://prod.spline.design/7gGYXgqkVLcS7Tp3/scene.splinecode";

/* ── Small inline SVG icons (no emojis) ─────────────────────────────── */
function IconBolt({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconShield({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconTrend({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconCheck({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HERO — full-screen with Spline as background
════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [splineReady, setSplineReady] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#0d1117",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Spline — full background, fades in when loaded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: splineReady ? 1 : 0,
          transition: "opacity 900ms ease",
          zIndex: 0,
        }}
      >
        <Spline
          scene={SPLINE_URL}
          onLoad={() => setSplineReady(true)}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Edge fades to blend Spline into page background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        {/* left — heavier on mobile so text stays readable */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "60%", background: "linear-gradient(to right, #0d1117 40%, transparent)" }} className="spline-fade-left" />
        {/* right */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "25%", background: "linear-gradient(to left, #0d1117 5%, transparent)" }} />
        {/* bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to top, #0d1117, transparent)" }} />
        {/* top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to bottom, #0d1117, transparent)" }} />
      </div>
      <style>{`
        @media (max-width: 768px) {
          .spline-fade-left {
            width: 100% !important;
            background: linear-gradient(to right, #0d1117 0%, rgba(13,17,23,0.7) 60%, rgba(13,17,23,0.3) 100%) !important;
          }
        }
      `}</style>

      {/* Particles */}
      <ParticlesCanvas
        id="over-ons-hero-particles"
        particleColor="#6366f1"
        linkColor="#818cf8"
        count={28}
        speed={0.3}
        particleOpacity={0.25}
        linkOpacity={0.06}
        repulse={false}
      />

      {/* Content — left aligned, zIndex above Spline */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "140px 32px 100px",
        }}
        className="hero-content"
      >
        <div style={{ maxWidth: 600 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: 20,
            }}
          >
            Over ons
          </p>
          <h1
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.08,
              margin: "0 0 24px",
              letterSpacing: "-0.03em",
            }}
          >
            Wij zijn{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tinsights
            </span>
            .
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 14,
              maxWidth: 520,
            }}
          >
            Een klein team van developers uit Groningen. Wij bouwen websites die
            gevonden worden, snel laden en klanten opleveren — zonder duur bureau-gedoe.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 44,
              maxWidth: 480,
            }}
          >
            Persoonlijk contact, eerlijke prijzen en resultaten die je kunt meten.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 52,
                padding: "0 32px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
              }}
            >
              Gratis gesprek starten
            </Link>
            <Link
              href="/projecten"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 52,
                padding: "0 32px",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Bekijk projecten
            </Link>
          </div>

          {/* Mini stats */}
          <div
            style={{
              display: "flex",
              gap: 36,
              marginTop: 56,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "50+", label: "Tevreden klanten" },
              { n: "4,9 / 5", label: "Google Reviews" },
              { n: "3+", label: "Jaar ervaring" },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>
                  {s.n}
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-content {
            padding: 120px 20px 80px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STORY SECTION — SETUP.jpg as faded background + tekst
════════════════════════════════════════════════════════════════════════ */
function StorySection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 700ms ease, transform 700ms ease";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        background: "#0a0f18",
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      {/* SETUP.jpg — faded background, right-aligned */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "55%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Image
          src="/assets/SETUP.jpg"
          alt="Tinsights developer setup Groningen"
          fill
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.07 }}
          priority={false}
        />
        {/* left fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, #0a0f18 0%, transparent 50%)",
          }}
        />
        {/* top fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, #0a0f18 0%, transparent 25%, transparent 75%, #0a0f18 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <div ref={textRef} style={{ maxWidth: 620 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: 16,
            }}
          >
            Ons verhaal
          </p>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.18,
              margin: "0 0 32px",
              letterSpacing: "-0.02em",
            }}
          >
            Klein team,{" "}
            <span style={{ color: "#818cf8" }}>grote impact.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
            Tinsights begon vanuit één simpele overtuiging:{" "}
            <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
              goede websites hoeven niet onbetaalbaar te zijn.
            </strong>{" "}
            Als developers zagen we dagelijks hoe bedrijven duizenden euro&apos;s neertelden bij grote bureaus —
            en toch bleven zitten met een trage, verouderde site die geen klanten opleverde.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
            Dus zijn we zelf begonnen. Vanuit onze setup in Groningen bouwden we website na website —
            voor ZZP&apos;ers, MKB&apos;ers en start-ups die iets neerzetten wilden dat <em>écht</em> werkt.
            Geen onnodige vergaderingen, geen hoge overheadkosten.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.6)", marginBottom: 40 }}>
            Inmiddels helpen we klanten door heel Nederland met{" "}
            <Link href="/diensten" style={{ color: "#818cf8", textDecoration: "none", borderBottom: "1px solid rgba(129,140,248,0.3)" }}>
              webdevelopment, hosting, beveiliging en SEO
            </Link>
            . Het team is klein — en dat houden we bewust zo. Want klein betekent: snel,
            persoonlijk en altijd bereikbaar.
          </p>

          {/* Location — plain, no badge */}
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 32, letterSpacing: "0.04em" }}>
            Gevestigd in Groningen — actief door heel Nederland
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/diensten"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 46,
                padding: "0 24px",
                background: "rgba(99,102,241,0.1)",
                color: "#818cf8",
                border: "1px solid rgba(99,102,241,0.22)",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Onze diensten
            </Link>
            <Link
              href="/prijzen"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 46,
                padding: "0 24px",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Bekijk prijzen
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STATS BAR
════════════════════════════════════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { n: "50+", label: "Klanten geholpen" },
    { n: "4,9 / 5", label: "Google Reviews" },
    { n: "3+", label: "Jaar ervaring" },
    { n: "99,9%", label: "Uptime garantie" },
    { n: "< 24u", label: "Reactietijd" },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.06) 100%)",
        borderTop: "1px solid rgba(99,102,241,0.12)",
        borderBottom: "1px solid rgba(99,102,241,0.12)",
        padding: "48px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
        }}
        className="stats-row"
      >
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "clamp(1.7rem, 2.5vw, 2.2rem)",
                fontWeight: 800,
                margin: "0 0 6px",
                background: "linear-gradient(135deg, #a5b4fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.n}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) { .stats-row { justify-content: center !important; } }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   VALUES SECTION — SVG icons, no emojis
════════════════════════════════════════════════════════════════════════ */
const values = [
  {
    Icon: IconBolt,
    title: "Snel & direct",
    desc: "Geen ellenlange trajecten. Gemiddeld binnen 1–2 weken live. Je hebt altijd direct contact met de developer.",
    color: "#f59e0b",
  },
  {
    Icon: IconShield,
    title: "Veiligheid voorop",
    desc: "Van SSL en backups tot professionele pentests. Wij denken als hackers om jouw systemen te beschermen.",
    color: "#6366f1",
  },
  {
    Icon: IconTrend,
    title: "Gevonden worden",
    desc: "Elke site die wij bouwen is SEO-technisch correct. We zorgen dat Google jou vindt — geen extra kosten.",
    color: "#22c55e",
  },
  {
    Icon: IconCheck,
    title: "Transparant & eerlijk",
    desc: "Geen verborgen kosten, geen jargon. Je weet altijd wat je krijgt en wat het kost.",
    color: "#ec4899",
  },
];

function ValuesSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLDivElement).style.opacity = "1";
            (e.target as HTMLDivElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity 600ms ease, transform 600ms ease";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#0d1117", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: 16,
            }}
          >
            Wat ons anders maakt
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Geen groot bureau. Wel topprestaties.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {values.map((v, i) => (
            <div
              key={v.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: v.color,
                  borderRadius: "18px 18px 0 0",
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${v.color}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <v.Icon color={v.color} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", margin: "0 0 10px" }}>
                {v.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SKILLS SHOWCASE
════════════════════════════════════════════════════════════════════════ */
const skillGroups = [
  {
    label: "Web Development",
    color: "#6366f1",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "WordPress", "REST API", "GraphQL"],
  },
  {
    label: "Beveiliging",
    color: "#ec4899",
    skills: ["OWASP Top 10", "Pentesting", "SQL Injection", "XSS Testing", "Burp Suite", "Nmap", "Metasploit", "AVG-compliant"],
  },
  {
    label: "Hosting & Infra",
    color: "#22c55e",
    skills: ["Linux / Nginx", "Cloudflare CDN", "SSL / Let's Encrypt", "PM2", "Docker", "Git Deployment", "DDoS bescherming", "99,9% Uptime"],
  },
  {
    label: "SEO & Marketing",
    color: "#f59e0b",
    skills: ["Google Analytics", "Search Console", "Core Web Vitals", "Schema.org", "Keyword Research", "On-page SEO", "Backlink Building", "Meta optimalisatie"],
  },
];

function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#0a0f18", padding: "96px 0" }}>
      <div ref={sectionRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: 16,
            }}
          >
            Onze expertise
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
            }}
          >
            Wat wij echt kunnen.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", margin: 0, maxWidth: 480, marginInline: "auto" }}>
            Van frontend tot security — één team, brede kennis, geen uitbesteding.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {skillGroups.map((group, gi) => (
            <div
              key={group.label}
              style={{
                background: "#111827",
                border: `1px solid ${group.color}22`,
                borderRadius: 20,
                padding: "28px 24px 24px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                transition: `opacity 550ms ease ${gi * 120}ms, transform 550ms cubic-bezier(0.34,1.56,0.64,1) ${gi * 120}ms`,
              }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: group.color,
                    boxShadow: `0 0 8px ${group.color}`,
                    flexShrink: 0,
                  }}
                />
                <p style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", margin: 0, letterSpacing: "0.04em" }}>
                  {group.label}
                </p>
              </div>

              {/* Skill badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: group.color,
                      background: `${group.color}12`,
                      border: `1px solid ${group.color}28`,
                      borderRadius: 100,
                      padding: "5px 12px",
                      letterSpacing: "0.02em",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.85)",
                      transition: `opacity 400ms ease ${gi * 120 + si * 50 + 200}ms, transform 400ms cubic-bezier(0.34,1.56,0.64,1) ${gi * 120 + si * 50 + 200}ms`,
                      display: "inline-block",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link
            href="/diensten"
            style={{
              fontSize: 14,
              color: "#818cf8",
              textDecoration: "none",
              borderBottom: "1px solid rgba(129,140,248,0.25)",
              paddingBottom: 2,
            }}
          >
            Bekijk al onze diensten
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CTA SECTION
════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #0d1117 0%, #13111f 100%)",
        padding: "96px 32px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <ParticlesCanvas
        id="over-ons-cta-particles"
        particleColor="#a5b4fc"
        linkColor="#818cf8"
        count={40}
        speed={0.5}
        particleOpacity={0.3}
        linkOpacity={0.08}
        repulse={false}
      />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 620, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: 16,
          }}
        >
          Klaar om te starten?
        </p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: "#f1f5f9",
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          Laten we samen iets{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            moois bouwen.
          </span>
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          Gratis adviesgesprek — geen verplichtingen, geen verkooppraatje.
          Gewoon kijken wat we voor je kunnen betekenen.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 54,
              padding: "0 36px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
            }}
          >
            Plan een gratis gesprek
          </Link>
          <a
            href="tel:0853696652"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 54,
              padding: "0 36px",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            085 - 369 6652
          </a>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════════════════════════════════ */
export default function OverOnsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0d1117" }}>
      <Navbar />
      <HeroSection />
      <StorySection />
      <StatsBar />
      <ValuesSection />
      <SkillsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

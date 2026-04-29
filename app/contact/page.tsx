"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

interface FormState {
  naam: string;
  email: string;
  telefoon: string;
  bericht: string;
}

const contactCards = [
  {
    icon: "bi-telephone-fill",
    label: "Bel ons",
    value: "085 - 369 6652",
    href: "tel:0853696652",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
  },
  {
    icon: "bi-whatsapp",
    label: "WhatsApp",
    value: "06 - 19 18 14 83",
    href: "https://wa.me/31619181483",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    external: true,
  },
  {
    icon: "bi-envelope-fill",
    label: "E-mail",
    value: "info@tinsights.nl",
    href: "mailto:info@tinsights.nl",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    icon: "bi-geo-alt-fill",
    label: "Locatie",
    value: "Groningen, Nederland",
    href: null,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.08)",
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.84v2.18h.06c.53-1 1.84-2.18 3.79-2.18 4.05 0 4.8 2.66 4.8 6.12V24h-4V15c0-2.14-.04-4.9-2.98-4.9-2.99 0-3.45 2.33-3.45 4.74V24H8V8z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.15-1.12-1.46-1.12-1.46-.92-.63.07-.62.07-.62 1.01.07 1.54 1.03 1.54 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.1-4.56-4.9 0-1.08.39-1.96 1.02-2.65-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.01A9.5 9.5 0 0 1 12 6.84a9.53 9.53 0 0 1 2.5.33c1.91-1.28 2.75-1.01 2.75-1.01.55 1.38.2 2.4.1 2.65.63.69 1.02 1.57 1.02 2.65 0 3.81-2.34 4.65-4.58 4.9.36.31.68.92.68 1.86v2.78c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ naam: "", email: "", telefoon: "", bericht: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fieldStyle(name: string): React.CSSProperties {
    return {
      display: "block",
      width: "100%",
      padding: "13px 16px",
      fontSize: 15,
      lineHeight: 1.5,
      color: "#0f172a",
      background: "#ffffff",
      border: `1.5px solid ${focused === name ? "#6366f1" : "#e2e8f0"}`,
      borderRadius: 10,
      outline: "none",
      boxShadow: focused === name ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
      transition: "border-color 150ms, box-shadow 150ms",
      boxSizing: "border-box",
      fontFamily: "inherit",
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Er ging iets mis. Probeer het opnieuw.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Verbindingsfout. Controleer je internet en probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100dvh", background: "#ffffff" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          paddingTop: 140,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#818cf8",
              marginBottom: 16,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.12,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Laten we iets moois bouwen
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#94a3b8", maxWidth: 520, margin: "0 auto" }}>
            Heb je een idee, vraag of wil je een gratis voorstel? Neem contact op — we reageren dezelfde werkdag.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section style={{ background: "#f8fafc", padding: "0 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            transform: "translateY(-36px)",
          }}
        >
          {contactCards.map((card) => {
            const inner = (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "24px 22px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
                  transition: "box-shadow 200ms, transform 200ms, border-color 200ms",
                  cursor: card.href ? "pointer" : "default",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (card.href) {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(15,23,42,0.12)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#c7d2fe";
                  }
                }}
                onMouseLeave={(e) => {
                  if (card.href) {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(15,23,42,0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                  }
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: card.bg,
                    color: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  <i className={`bi ${card.icon}`} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", margin: "0 0 4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                    {card.value}
                  </p>
                </div>
              </div>
            );

            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                style={{ textDecoration: "none", display: "block" }}
              >
                {inner}
              </a>
            ) : (
              <div key={card.label}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* Main content: left info + right form */}
      <section style={{ padding: "0 24px 96px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left: info */}
          <div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "0 0 16px",
                letterSpacing: "-0.02em",
              }}
            >
              Wij staan voor je klaar
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#475569", marginBottom: 32 }}>
              Van een simpele website tot een volledige webshop of marketingcampagne — wij denken met je mee. Stuur een bericht of neem direct contact op.
            </p>

            {/* Openingstijden */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "22px 24px",
                marginBottom: 32,
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", margin: "0 0 14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Bereikbaarheid
              </p>
              {[
                { dag: "Maandag — Vrijdag", tijd: "09:00 – 18:00", open: true },
                { dag: "Zaterdag", tijd: "Op afspraak", open: true },
                { dag: "Zondag", tijd: "Gesloten", open: false },
              ].map((row) => (
                <div
                  key={row.dag}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#374151" }}>{row.dag}</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: row.open ? "#6366f1" : "#94a3b8",
                    }}
                  >
                    {row.tijd}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />
                <span style={{ fontSize: 13, color: "#475569" }}>Doorgaans dezelfde dag reactie</span>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", margin: "0 0 14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Volg ons
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      background: "#ffffff",
                      textDecoration: "none",
                      transition: "border-color 150ms, color 150ms, background 150ms, transform 150ms",
                      boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#6366f1";
                      el.style.color = "#6366f1";
                      el.style.background = "rgba(99,102,241,0.06)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#e2e8f0";
                      el.style.color = "#64748b";
                      el.style.background = "#ffffff";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 20,
              padding: "36px 32px",
              boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background: "rgba(99,102,241,0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 28,
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
                  Bericht ontvangen!
                </h3>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  Bedankt voor je bericht. Je ontvangt direct een bevestigingsmail en we nemen <strong>dezelfde werkdag</strong> contact met je op.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Stuur een bericht
                </h3>
                <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 28px" }}>
                  Vul het formulier in en we reageren zsm.
                </p>

                {error && (
                  <div
                    style={{
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: 10,
                      padding: "12px 16px",
                      marginBottom: 20,
                      fontSize: 14,
                      color: "#dc2626",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <i className="bi bi-exclamation-circle" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                        Naam *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.naam}
                        onChange={(e) => setForm((p) => ({ ...p, naam: e.target.value }))}
                        placeholder="Jan de Vries"
                        style={fieldStyle("naam")}
                        onFocus={() => setFocused("naam")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        value={form.telefoon}
                        onChange={(e) => setForm((p) => ({ ...p, telefoon: e.target.value }))}
                        placeholder="+31 6 12 34 56 78"
                        style={fieldStyle("telefoon")}
                        onFocus={() => setFocused("telefoon")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="jan@bedrijf.nl"
                      style={fieldStyle("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                      Bericht *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.bericht}
                      onChange={(e) => setForm((p) => ({ ...p, bericht: e.target.value }))}
                      placeholder="Vertel ons over je project, vraag of idee..."
                      style={{ ...fieldStyle("bericht"), resize: "vertical", minHeight: 130 }}
                      onFocus={() => setFocused("bericht")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      width: "100%",
                      height: 52,
                      background: loading ? "#4338ca" : "#6366f1",
                      color: "white",
                      border: "none",
                      borderRadius: 100,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "background 200ms",
                      fontFamily: "inherit",
                      opacity: loading ? 0.85 : 1,
                    }}
                    onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#4f46e5"; }}
                    onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#6366f1"; }}
                  >
                    {loading ? (
                      <>
                        <svg style={{ animation: "spin 1s linear infinite", width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Versturen...
                      </>
                    ) : (
                      "Verstuur bericht →"
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 14, marginBottom: 0 }}>
                    <i className="bi bi-shield-check" style={{ marginRight: 4 }} />
                    Je gegevens worden veilig verwerkt en niet gedeeld.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </main>
  );
}

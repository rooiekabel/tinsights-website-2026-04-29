"use client";

import SiteIcon from "@/components/SiteIcon";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
        width: "100%",
      }}
      className="py-24 sm:py-32"
    >
      <ParticlesCanvas
        id="cta-particles"
        particleColor="#818cf8"
        linkColor="#818cf8"
        count={70}
        speed={0.6}
        particleOpacity={0.45}
        linkOpacity={0.2}
        repulse={true}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 768,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 9999,
            padding: "6px 18px",
            fontSize: 13,
            fontWeight: 600,
            color: "#a5b4fc",
            letterSpacing: "0.02em",
          }}
        >
          <SiteIcon bootstrap="bi bi-chat-dots" size={14} />
          Gratis kennismakingsgesprek
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(2.1rem, 5.5vw, 3.25rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.025em",
          }}
        >
          Klaar om te starten?
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "#94a3b8",
            margin: 0,
            maxWidth: 520,
          }}
        >
          Vertel ons over je project — we reageren binnen 24 uur. Geen verplichtingen, gewoon een goed gesprek.
        </p>

        {/* Rating row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#64748b" }}>
          <span style={{ color: "#f59e0b", fontSize: 15, letterSpacing: 2 }} aria-label="5 sterren">★★★★★</span>
          <span>4.9/5 · Meer dan 50 klanten</span>
        </div>

        {/* CTA Buttons */}
        <>
          <style>{`
            @media (max-width: 639px) {
              .cta-btn-group {
                flex-direction: column !important;
                width: 100% !important;
              }
              .cta-btn-group a {
                width: 100% !important;
                justify-content: center !important;
              }
            }
            .cta-btn-whatsapp:hover { background: #1fba55 !important; }
            .cta-btn-email:hover { background: #4f46e5 !important; }
            .cta-btn-bellen:hover { background: rgba(255,255,255,0.1) !important; }
          `}</style>

          <div
            className="cta-btn-group"
            style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/31619181483"
              target="_blank"
              rel="noreferrer"
              className="cta-btn-whatsapp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 52,
                padding: "0 28px",
                background: "#25D366",
                color: "white",
                border: "none",
                borderRadius: 9999,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              <SiteIcon bootstrap="bi bi-whatsapp" size={17} />
              WhatsApp
            </a>

            {/* E-mail */}
            <a
              href="mailto:info@tinsights.nl"
              className="cta-btn-email"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 52,
                padding: "0 28px",
                background: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: 9999,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              <SiteIcon bootstrap="bi bi-envelope" size={16} />
              <span suppressHydrationWarning>info@tinsights.nl</span>
            </a>

            {/* Bellen */}
            <a
              href="tel:0853696652"
              className="cta-btn-bellen"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 52,
                padding: "0 28px",
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.25)",
                borderRadius: 9999,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              <SiteIcon bootstrap="bi bi-telephone" size={16} />
              085 - 369 6652
            </a>
          </div>
        </>

        {/* KvK line */}
        <p style={{ fontSize: 12, color: "#334155", margin: 0 }}>
          KvK: 99957949 · Gevestigd te Groningen, Nederland
        </p>
      </div>
    </section>
  );
}

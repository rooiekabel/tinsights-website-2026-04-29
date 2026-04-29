"use client";

import Link from "next/link";

const diensten = [
  { href: "/diensten/web-development", label: "Web Development" },
  { href: "/diensten/ethical-hacking", label: "Ethical Hacking" },
  { href: "/diensten/hosting-onderhoud", label: "Hosting & Onderhoud" },
  { href: "/diensten/seo-zichtbaarheid", label: "SEO & Zichtbaarheid" },
  { href: "/diensten/automatisering", label: "Automatisering" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/projecten", label: "Projecten" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

const contactItems = [
  { icon: "bi-geo-alt", label: "Nederland", href: null },
  { icon: "bi-telephone", label: "085 - 369 6652", href: "tel:0853696652" },
  { icon: "bi-envelope", label: "info@tinsights.nl", href: "mailto:info@tinsights.nl" },
  { icon: "bi-globe", label: "www.tinsights.nl", href: "https://www.tinsights.nl" },
  { icon: "bi-star", label: "Google Reviews", href: "https://share.google/nesaAxYhNk1WtVbCl", external: true },
  { icon: "bi-whatsapp", label: "WhatsApp: 06-19181483", href: "https://wa.me/31619181483", external: true },
];

const legalLinks = [
  { href: "/privacyverklaring", label: "Privacyverklaring" },
  { href: "/algemene-voorwaarden", label: "Algemene Voorwaarden" },
  { href: "/herroepingsrecht", label: "Herroepingsrecht" },
  { href: "/cookiebeleid", label: "Cookiebeleid" },
];

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#6366f1",
  marginBottom: 16,
  display: "block",
};

const LINK_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  color: "#94a3b8",
  textDecoration: "none",
  padding: "4px 0",
  transition: "color 150ms ease",
};

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a", borderTop: "1px solid #1e293b" }}>
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 0" }}
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >

        {/* Column 1 — Brand */}
        <div>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Tinsights
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "#64748b", margin: "0 0 6px", maxWidth: 240 }}>
            Webdevelopment, hosting en marketing — vanuit Nederland.
          </p>
          <p style={{ fontSize: 12, color: "#475569", margin: "0 0 24px" }}>
            Gevestigd te Groningen, Nederland
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                href: "https://www.linkedin.com",
                label: "LinkedIn",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 10v8M7 6h.01M12 10v8m0-5a3 3 0 0 1 6 0v5m-6-5a3 3 0 0 0-3-3H7" />
                  </svg>
                ),
              },
              {
                href: "https://www.instagram.com",
                label: "Instagram",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                href: "https://github.com",
                label: "GitHub",
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.15-1.12-1.46-1.12-1.46-.92-.63.07-.62.07-.62 1.01.07 1.54 1.03 1.54 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.1-4.56-4.9 0-1.08.39-1.96 1.02-2.65-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.01A9.5 9.5 0 0 1 12 6.84a9.53 9.53 0 0 1 2.5.33c1.91-1.28 2.75-1.01 2.75-1.01.55 1.38.2 2.4.1 2.65.63.69 1.02 1.57 1.02 2.65 0 3.81-2.34 4.65-4.58 4.9.36.31.68.92.68 1.86v2.78c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                ),
              },
            ].map((s) => (
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
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1px solid #334155",
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "border-color 150ms, color 150ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#6366f1";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#334155";
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                }}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Diensten */}
        <div>
          <span style={LABEL_STYLE}>Diensten</span>
          {diensten.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={LINK_STYLE}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Column 3 — Navigatie */}
        <div>
          <span style={LABEL_STYLE}>Navigatie</span>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={LINK_STYLE}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Column 4 — Contact */}
        <div>
          <span style={LABEL_STYLE}>Contact</span>
          {contactItems.map((item) => {
            const content = (
              <span style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "inherit", padding: "4px 0" }}>
                <i className={`bi ${item.icon}`} style={{ fontSize: 15, marginTop: 1, flexShrink: 0 }} aria-hidden />
                {item.label}
              </span>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={(item as { external?: boolean }).external ? "_blank" : undefined}
                rel={(item as { external?: boolean }).external ? "noreferrer" : undefined}
                style={{ ...LINK_STYLE, display: "flex" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              >
                {content}
              </a>
            ) : (
              <div key={item.label} style={{ ...LINK_STYLE, cursor: "default", display: "flex" }}>
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: "48px auto 0",
          borderTop: "1px solid #1e293b",
          padding: "20px 24px",
        }}
      >
        {/* Row 1: copyright · designed by · legal links */}
        <div
          className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left"
          style={{ fontSize: 12, color: "#475569" }}
        >
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} Tinsights — All Rights Reserved</p>
          <p style={{ margin: 0 }}>Designed &amp; Developed by Tinsights</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {legalLinks.map((l, i) => (
              <span key={l.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ color: "#334155" }}>·</span>}
                <Link
                  href={l.href}
                  style={{ color: "#475569", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: KvK line */}
        <p style={{ fontSize: 11, color: "#334155", textAlign: "center", margin: "12px 0 0" }}>
          Tinsights — Gevestigd te Groningen, Nederland — KvK: 99957949
        </p>
      </div>
    </footer>
  );
}

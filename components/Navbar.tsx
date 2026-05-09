"use client";

import SiteIcon from "@/components/SiteIcon";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/branches", label: "Branches" },
  { href: "/projecten", label: "Projecten" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

const REVIEW_URL = "https://share.google/nesaAxYhNk1WtVbCl";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock + Escape key */
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen, closeMenu]);

  /* Close on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) closeMenu(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  return (
    <>
      <style>{`
        .nav-mobile-panel {
          position: fixed;
          top: 0; right: 0;
          z-index: 200;
          width: 100vw;
          height: 100dvh;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .nav-mobile-panel.open {
          transform: translateX(0);
        }
        .nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 199;
          background: rgba(0,0,0,0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 300ms ease;
        }
        .nav-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .nav-menu-link {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: #f1f5f9;
          padding: 16px 0;
          border-bottom: 1px solid #1e293b;
          letter-spacing: -0.02em;
          text-decoration: none;
          transition: color 150ms ease;
        }
        .nav-menu-link:hover { color: #6366f1; }
        .nav-cta-btn:hover { background: #4f46e5 !important; }
        .desktop-cta-btn:hover { background: #4f46e5 !important; }
      `}</style>

      {/* Header bar — sits below the 40px TopBar on desktop */}
      <header
        style={{
          position: "fixed",
          top: 40, left: 0, right: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(148,163,184,0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: isScrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.80)",
          boxShadow: isScrolled ? "0 10px 26px rgba(15,23,42,0.10)" : "none",
          transition: "background 250ms ease, box-shadow 250ms ease",
        }}
      >
        <nav
          style={{
            margin: "0 auto",
            maxWidth: 1280,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "0 24px",
          }}
          aria-label="Hoofdnavigatie"
        >
          {/* Logo */}
          <Link href="/" aria-label="Tinsights — startpagina" style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}>
            <Image
              src="/assets/logoo.png"
              alt="Tinsights"
              width={148}
              height={38}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul style={{ display: "none", alignItems: "center", gap: 4, listStyle: "none", margin: 0, padding: 0 }} className="md-flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 44,
                    padding: "0 12px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#374151",
                    textDecoration: "none",
                    borderRadius: 8,
                    transition: "color 150ms, background 150ms",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; (e.currentTarget as HTMLElement).style.color = "#0f172a"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="md-inline-flex desktop-cta-btn"
              style={{
                display: "none",
                alignItems: "center",
                height: 38,
                padding: "0 20px",
                background: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              Gratis voorstel
            </Link>

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((p) => !p)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                background: "white",
                color: "#0f172a",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
              }}
              className="md-hidden"
            >
              {isMenuOpen ? (
                <SiteIcon bootstrap="bi bi-x-lg" size={18} />
              ) : (
                <SiteIcon bootstrap="bi bi-list" size={20} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`nav-overlay${isMenuOpen ? " open" : ""} md-hidden`}
        onClick={closeMenu}
        aria-hidden
      />

      {/* ── Mobile slide-in panel ── */}
      <div
        ref={panelRef}
        className={`nav-mobile-panel${isMenuOpen ? " open" : ""} md-hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigatiemenu"
      >
        {/* Panel header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <Image
            src="/assets/logoo.png"
            alt="Tinsights"
            width={120}
            height={32}
            style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)", objectFit: "contain" }}
          />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Menu sluiten"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #334155",
              background: "transparent",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <SiteIcon bootstrap="bi bi-x-lg" size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobiele navigatie">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="nav-menu-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Google Reviews block */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            {/* Google G logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google" role="img">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div style={{ fontSize: 15, color: "#f59e0b", letterSpacing: 2, lineHeight: 1 }} aria-label="5 sterren">
              ★★★★★
            </div>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", margin: "0 0 6px" }}>
            4,9 op Google Reviews
          </p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", textDecoration: "none" }}
          >
            Bekijk onze reviews →
          </a>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: "auto", paddingTop: 32 }}>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="nav-cta-btn"
            style={{
              display: "block",
              textAlign: "center",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "18px 24px",
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 200ms ease",
              marginBottom: 40,
            }}
          >
            Gratis voorstel aanvragen
          </Link>
        </div>
      </div>

      {/* Responsive helpers */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .md-inline-flex { display: inline-flex !important; }
          .md-hidden { display: none !important; }
          .nav-mobile-panel { display: none !important; }
          .nav-overlay { display: none !important; }
        }
      `}</style>
    </>
  );
}

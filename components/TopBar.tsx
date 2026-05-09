"use client";

import SiteIcon from "@/components/SiteIcon";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  const demoRoutes = new Set([
    "/ashley",
    "/binabox",
    "/carola",
    "/crypgo",
    "/fashion-ecommerce",
    "/furnish",
    "/montek",
    "/template",
    "/udrone",
  ]);

  if (pathname && demoRoutes.has(pathname)) {
    return null;
  }

  return (
    <>
      <style>{`
        body:has(.demo-iframe-shell) .topbar { display: none !important; }
        .topbar a { font-size: 12px; font-weight: 500; color: #94a3b8; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
        .topbar a:hover { color: #ffffff !important; }
        .topbar a i { font-size: 13px; }
        .topbar-divider { width: 1px; height: 14px; background: #1e293b; flex-shrink: 0; }
        /* Hide desktop-only items on mobile */
        @media (max-width: 767px) {
          .topbar-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          .topbar-mobile-only { display: none !important; }
        }
      `}</style>

      <div
        className="topbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 52,
          height: 40,
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Left side */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Desktop only: location */}
            <span className="topbar-desktop" style={{ display: "flex", alignItems: "center" }}>
              <a href="https://maps.google.com/?q=Groningen,Nederland" target="_blank" rel="noreferrer">
                <SiteIcon bootstrap="bi bi-geo-alt-fill" size={13} />
                Groningen, Nederland
              </a>
              <span className="topbar-divider" aria-hidden style={{ margin: "0 16px" }} />
            </span>
            {/* Always visible: reviews */}
            <a href="https://share.google/nesaAxYhNk1WtVbCl" target="_blank" rel="noreferrer">
              <span style={{ color: "#f59e0b" }} aria-label="5 sterren">★★★★★</span>
              4.9/5 Google Reviews
            </a>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Desktop only: phone */}
            <span className="topbar-desktop" style={{ display: "flex", alignItems: "center" }}>
              <a href="tel:0853696652">
                <SiteIcon bootstrap="bi bi-telephone-fill" size={13} />
                085 - 369 6652
              </a>
              <span className="topbar-divider" aria-hidden style={{ margin: "0 16px" }} />
            </span>
            {/* Always visible: Bel ons nu */}
            <a href="tel:0853696652">
              <SiteIcon bootstrap="bi bi-telephone-fill" size={13} style={{ color: "#6366f1" }} />
              Bel ons nu
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

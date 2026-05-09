"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

export type PricingTierConfig = {
  title: string;
  tierIndicator: string;
  description: string;
  priceAmount: string;
  /** default "eenmalig" */
  priceSub?: string;
  badge?: boolean;
  features: string[];
  highlight: boolean;
  ctaLabel?: string;
  ctaAria: string;
};

type BranchPricingBlockProps = {
  accentColor: string;
  sectionEyebrow: string;
  sectionTitle: string;
  intro: string;
  tiers: PricingTierConfig[];
  footerBlurb: React.ReactNode;
  sectionClassName?: string;
  sectionStyle?: React.CSSProperties;
};

/** Shared pricing UX: desktop 3-column grid (lg+), mobile horizontal snap + swipe hint + dots. */
export default function BranchPricingBlock({
  accentColor,
  sectionEyebrow,
  sectionTitle,
  intro,
  tiers,
  footerBlurb,
  sectionClassName = "",
  sectionStyle,
}: BranchPricingBlockProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const onScrollPricing = useCallback(() => {
    const el = scrollRef.current;
    if (!el || tiers.length === 0) return;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return;
    const gap = 16;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    let idx = Math.round(el.scrollLeft / step);
    idx = Math.max(0, Math.min(tiers.length - 1, idx));
    setActiveIdx(idx);
  }, [tiers.length]);

  function renderCardContent(tier: PricingTierConfig, variant: "mobile" | "desktop") {
    const ctaLabel = tier.ctaLabel ?? "Vraag offerte aan";
    const sub = tier.priceSub ?? "eenmalig";
    const isHighlight = tier.highlight;

    const cardBg = variant === "mobile" ? "#0d1117" : "#111827";

    const ctaHighlight: React.CSSProperties = {
      marginTop: 24,
      display: "block",
      width: "100%",
      padding: "14px 20px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      textDecoration: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "none",
      backgroundColor: accentColor,
      color: "white",
      boxSizing: "border-box",
    };

    const ctaMuted: React.CSSProperties = {
      ...ctaHighlight,
      backgroundColor: "transparent",
      border: "1px solid rgba(255,255,255,0.25)",
      color: "white",
    };

    return (
      <div
        style={{
          backgroundColor: cardBg,
          padding: variant === "mobile" ? "28px 24px" : "28px 24px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
          minWidth: 0,
          ...(variant === "desktop" && isHighlight
            ? {
                position: "relative" as const,
                zIndex: 1,
                borderTop: `3px solid ${accentColor}`,
                transform: "translateY(-10px)",
                marginBottom: -10,
              }
            : {}),
        }}
      >
        {tier.badge ? (
          <span
            style={{
              display: "inline-block",
              backgroundColor: accentColor,
              color: "white",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 100,
              marginBottom: 16,
              alignSelf: "flex-start",
            }}
          >
            Meest gekozen
          </span>
        ) : null}

        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "white",
            marginBottom: 6,
            marginTop: 0,
          }}
        >
          {tier.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {tier.description}
        </p>

        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block" }}>Vanaf</span>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "white", lineHeight: 1 }}>{tier.priceAmount}</div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginTop: 4 }}>{sub}</span>
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)", margin: "20px 0" }} aria-hidden />

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flexGrow: 1,
          }}
        >
          {tier.features.map((line) => (
            <li
              key={line}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: accentColor, flexShrink: 0, marginTop: 1 }} aria-hidden>
                ✓
              </span>
              {line}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          aria-label={tier.ctaAria}
          style={isHighlight ? ctaHighlight : ctaMuted}
          onMouseEnter={(e) => {
            if (!isHighlight) {
              e.currentTarget.style.borderColor = accentColor;
            }
          }}
          onMouseLeave={(e) => {
            if (!isHighlight) {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            }
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .branch-pricing-mobile-scroll::-webkit-scrollbar { display: none; }
        .branch-pricing-desktop-wrap { display: none; }
        .branch-pricing-mobile-wrap { display: block; }
        @media (min-width: 1024px) {
          .branch-pricing-desktop-wrap { display: block; }
          .branch-pricing-mobile-wrap { display: none !important; }
        }
      `}</style>

      <section id="prijzen" className={sectionClassName} style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", ...sectionStyle }}>
        <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accentColor, marginBottom: 14 }}>
              {sectionEyebrow}
            </p>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.12, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              {sectionTitle}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 580, margin: "0 auto 24px", wordBreak: "break-word" }}>{intro}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                marginBottom: 32,
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
                flexWrap: "wrap",
              }}
            >
              {tiers.map((t) => (
                <span key={t.tierIndicator} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: accentColor }} aria-hidden>
                    •
                  </span>
                  {t.tierIndicator}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="branch-pricing-desktop-wrap" style={{ marginBottom: 32 }}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                overflow: "hidden",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.1)",
                paddingTop: 12,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1 }}>
                {tiers.map((tier, i) => (
                  <div key={tier.title}>{renderCardContent(tier, "desktop")}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="branch-pricing-mobile-wrap">
            <div
              ref={scrollRef}
              className="branch-pricing-mobile-scroll"
              onScroll={onScrollPricing}
              style={{
                width: "100%",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
                display: "flex",
                gap: "16px",
                padding: "0 24px 24px 24px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                boxSizing: "border-box",
              }}
            >
              {tiers.map((tier) => (
                <div
                  key={tier.title}
                  style={{
                    flexShrink: 0,
                    width: "calc(100vw - 64px)",
                    maxWidth: "calc(100vw - 64px)",
                    scrollSnapAlign: "center",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxSizing: "border-box",
                  }}
                >
                  {renderCardContent(tier, "mobile")}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
              }}
            >
              <span aria-hidden>←</span>
              <span>Swipe voor meer opties</span>
              <span aria-hidden>→</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 12, paddingBottom: 24 }}>
              {tiers.map((_, i) => (
                <span
                  key={i}
                  role="presentation"
                  style={{
                    width: activeIdx === i ? 24 : 8,
                    height: 8,
                    borderRadius: 100,
                    background: activeIdx === i ? accentColor : "rgba(255,255,255,0.2)",
                    transition: "width 200ms ease, background 200ms ease",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}>{footerBlurb}</div>
          </div>
        </div>
      </section>
    </>
  );
}

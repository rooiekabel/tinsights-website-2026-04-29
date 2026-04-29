"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideoBg, setUseVideoBg] = useState(true);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    const resolveVideoMode = () => {
      const lowPowerHints =
        nav.connection?.saveData ||
        (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) ||
        (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2);
      setUseVideoBg(!lowPowerHints);
    };

    resolveVideoMode();
  }, []);

  useEffect(() => {
    if (!useVideoBg) return;

    const v = videoRef.current;
    if (!v) return;

    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const el = videoRef.current;
      if (!el) return;
      el.muted = true;
      const p = el.play();
      if (p !== undefined) p.catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = videoRef.current;
          if (!el) return;
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(v);

    const onVisibility = () => {
      const el = videoRef.current;
      if (!el) return;
      if (document.visibilityState === "visible") {
        tryPlay();
      } else {
        el.pause();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryPlay();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [useVideoBg]);

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .hero-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 320px !important;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            justify-content: center !important;
            width: 100% !important;
          }
          .hero-text-col {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-subtext {
            text-align: center !important;
          }
          .hero-mockup-stack {
            width: 100% !important;
            margin-top: 32px !important;
            padding: 0 12px !important;
            max-width: none !important;
          }
          .hero-mockup-main {
            filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.5)) !important;
            border-radius: 10px !important;
          }
          .hero-delivered-badge {
            margin-top: 16px !important;
            justify-content: center !important;
          }
          .hero-delivered-pill {
            padding: 9px 16px !important;
          }
          .hero-delivered-subtitle {
            font-size: 12px !important;
          }
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }
        .hero-headline {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.45),
            0 2px 20px rgba(0, 0, 0, 0.35);
        }
        .hero-bg-vid {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .hero-mockup-panel {
          position: relative;
        }
        .hero-mockup-panel::before {
          content: "";
          position: absolute;
          inset: 10% 6% 10% 20%;
          background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.28) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 72%);
          filter: blur(18px);
          pointer-events: none;
          z-index: 0;
        }
        .hero-mockup-main {
          position: relative;
          z-index: 1;
        }
        .hero-subtext {
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
        }
        .hero-btn-primary:hover {
          background: #5458ff !important;
          transform: translateY(-1px) !important;
        }
        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.68) !important;
          color: #ffffff !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-video {
            display: none !important;
          }
          .hero-section {
            background: #0f172a !important;
          }
        }
      `}</style>

      <section
        id="home"
        className="hero-section relative flex min-h-[90vh] items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-28 md:pt-32 lg:px-8 lg:pt-24"
        style={!useVideoBg ? { background: "#0b1220" } : undefined}
      >
        {/* Full-bleed background video (playback hooks in useEffect above) */}
        {useVideoBg && (
          <div className="hero-bg-video absolute inset-0 z-0 overflow-hidden" aria-hidden>
            <video
              ref={videoRef}
              className="hero-bg-vid pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                top: 0,
                left: 0,
              }}
              aria-hidden="true"
            >
              <source src="/assets/developers_achtergrond.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* Readability scrim — dark so video stays visible + light text reads clearly */}
        <div
          className="hero-bg-overlay pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(96deg, rgba(3,8,20,0.92) 0%, rgba(7,16,34,0.85) 38%, rgba(10,20,42,0.62) 62%, rgba(11,25,48,0.35) 82%, rgba(11,25,48,0.16) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[90vh] w-full flex-col justify-center">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* ── Text column ── */}
            <motion.div
              className="hero-text-col flex flex-col items-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{ maxWidth: 620 }}
            >
              {/* Label */}
              <p
                className="font-display"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#a5b4fc",
                  margin: "0 0 20px",
                  textShadow: "0 1px 8px rgba(0,0,0,0.35)",
                }}
              >
                Tinsights — webdevelopment
              </p>

              {/* Headline */}
              <h1
                className="hero-headline font-display text-[clamp(1.85rem,5.4vw,3.5rem)] leading-[1.12] sm:leading-tight"
                style={{
                  fontWeight: 800,
                  color: "#f9fbff",
                  margin: "0 0 22px",
                  letterSpacing: "-0.03em",
                  textWrap: "balance",
                  maxWidth: 560,
                  lineHeight: 1.08,
                }}
              >
                Websites die laden.
                <br />
                Ranken. Verkopen.
              </h1>

              {/* Subtext */}
              <p
                className="hero-subtext"
                style={{
                  fontSize: 17,
                  lineHeight: 1.72,
                  color: "#d5deec",
                  maxWidth: 500,
                  margin: "0 0 34px",
                  fontWeight: 400,
                }}
              >
                We bouwen snelle websites en webshops die goed gevonden worden en converteren.
                Hosting, techniek en groei — alles geregeld zonder gedoe.
              </p>

              {/* CTA buttons */}
              <div
                className="hero-buttons"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <Link
                  href="/contact"
                  className="hero-btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: 54,
                    padding: "0 34px",
                    background: "#6366ff",
                    color: "white",
                    border: "none",
                    borderRadius: 100,
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: "none",
                    transition: "all 200ms ease",
                    whiteSpace: "nowrap",
                    boxShadow: "0 10px 30px rgba(99,102,255,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset",
                  }}
                >
                  Gratis voorstel aanvragen
                </Link>
                <Link
                  href="/projecten"
                  className="hero-btn-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: 52,
                    padding: "0 28px",
                    background: "rgba(255,255,255,0.03)",
                    color: "#dce5f4",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                    borderRadius: 100,
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "all 200ms ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  Bekijk projecten
                </Link>
              </div>
            </motion.div>

            {/* ── Chatvora single mockup ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="z-[2] w-full lg:flex lg:flex-col lg:items-end lg:justify-center lg:pr-0"
            >
              <div
                className="hero-mockup-stack hero-mockup-panel"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  width: "100%",
                  maxWidth: 740,
                  flexShrink: 0,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="hero-mockup-main animate-float"
                  src="/portfolio-voorbeelden/mockups/chatvora_breed.png"
                  alt="Chatvora.org website mockup — gebouwd door Tinsights"
                  style={{
                    width: "106%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 34px 90px rgba(0,0,0,0.58))",
                    borderRadius: 10,
                  }}
                />

                <div
                  className="hero-delivered-badge"
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <span
                    className="hero-delivered-pill"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 50,
                      padding: "10px 20px",
                    }}
                  >
                    <span aria-hidden style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#22c55e",
                          position: "relative",
                          zIndex: 1,
                          display: "block",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          inset: -4,
                          borderRadius: "50%",
                          border: "2px solid #22c55e",
                          opacity: 0.5,
                          animation: "ping 1.8s ease-out infinite",
                        }}
                      />
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 1,
                        height: 16,
                        background: "rgba(255,255,255,0.15)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span
                        className="hero-delivered-title"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#22c55e",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          lineHeight: 1,
                        }}
                      >
                        RECENT OPGELEVERD
                      </span>
                      <span
                        className="hero-delivered-subtitle"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.9)",
                          letterSpacing: 0,
                          lineHeight: 1.3,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Chatvora.org — Launch Website
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </>
  );
}

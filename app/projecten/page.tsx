"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import { Expand, Globe2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesCanvas from "@/components/ParticlesCanvas";

const projects = [
  {
    id: "ashley",
    tag: "Personal Brand",
    title: "Ashley Breed",
    domain: "ashleybreed.nl",
    description: "Persoonlijke merkwebsite met een strakke, moderne uitstraling gericht op conversie en herkenbaarheid.",
    url: "https://ashleybreed.nl",
    liveUrl: "/portfolio-voorbeelden/live/ashley/home-1.html",
    bgColor: "#0d0a14",
    accentColor: "#c9a96e",
    mockupBreed: "/portfolio-voorbeelden/mockups/ashley_breed_mockup.png",
    mockupMain: "/portfolio-voorbeelden/mockups/ashley_imac_mockup.png",
    mockupPhone: "/portfolio-voorbeelden/mockups/ashley_phone_momockup.png",
    gallery: [
      { src: "/portfolio-voorbeelden/mockups/ashley_breed_mockup.png", label: "Website overzicht" },
      { src: "/portfolio-voorbeelden/mockups/ashley_imac_mockup.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/ashley_phone_momockup.png", label: "Mobiel" },
    ],
  },
  {
    id: "binabox",
    tag: "Trading Platform",
    title: "Binabox",
    domain: "binabox.io",
    description: "Crypto trading signals platform — snel, donker en gebouwd voor mobiele conversie.",
    url: "https://binabox.io",
    liveUrl: "/portfolio-voorbeelden/live/binabox/index.html",
    bgColor: "#080c14",
    accentColor: "#f0a500",
    mockupBreed: "/portfolio-voorbeelden/mockups/binabox_breed.png",
    mockupMain: "/portfolio-voorbeelden/mockups/binabox_imac.png",
    mockupPhone: "/portfolio-voorbeelden/mockups/binabox_phone.png",
    gallery: [
      { src: "/portfolio-voorbeelden/mockups/binabox_breed.png", label: "Website overzicht" },
      { src: "/portfolio-voorbeelden/mockups/binabox_imac.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/binabox_phone.png", label: "Mobiel" },
    ],
  },
  {
    id: "heyligers",
    tag: "Service Bedrijf",
    title: "Heyligers Service",
    domain: "heyligersservice.nl",
    description: "Professionele servicewebsite met focus op vertrouwen, bereikbaarheid en lokale vindbaarheid.",
    url: "https://heyligersservice.nl",
    liveUrl: "https://heyligersservice.nl",
    bgColor: "#0a0f1a",
    accentColor: "#00c896",
    mockupBreed: "/portfolio-voorbeelden/mockups/heyligersservice_screen_mockup.png",
    mockupMain: "/portfolio-voorbeelden/mockups/heyligersservice_macbook.png",
    mockupPhone: "/portfolio-voorbeelden/mockups/heyligersservice_phone_mockup.png",
    gallery: [
      { src: "/portfolio-voorbeelden/mockups/heyligersservice_screen_mockup.png", label: "Website overzicht" },
      { src: "/portfolio-voorbeelden/mockups/heyligersservice_macbook.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/heyligersservice_phone_mockup.png", label: "Mobiel" },
    ],
  },
  {
    id: "udrone",
    tag: "Drone Services",
    title: "Udrone",
    domain: "udrone-flight.com",
    description: "Drone services showcase met een krachtige visuele uitstraling en duidelijke call-to-actions.",
    url: "https://udrone-flight.com",
    liveUrl: "/portfolio-voorbeelden/live/udrone/index.html",
    bgColor: "#080c18",
    accentColor: "#4a9eff",
    mockupBreed: "/portfolio-voorbeelden/mockups/udrone_breed.png",
    mockupMain: "/portfolio-voorbeelden/mockups/udrone_imac_mockup.png",
    mockupPhone: "/portfolio-voorbeelden/mockups/udrone_phone_mockup.png",
    gallery: [
      { src: "/portfolio-voorbeelden/mockups/udrone_breed.png", label: "Website overzicht" },
      { src: "/portfolio-voorbeelden/mockups/udrone_imac_mockup.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/udrone_phone_mockup.png", label: "Mobiel" },
    ],
  },
  {
    id: "chatvora",
    tag: "AI Platform",
    title: "Chatvora",
    domain: "chatvora.org",
    description: "Nieuwe launch website voor Chatvora met heldere positioning, moderne visuals en focus op conversie.",
    url: "https://chatvora.org",
    liveUrl: "https://chatvora.org",
    bgColor: "#0c1020",
    accentColor: "#22c55e",
    mockupBreed: "/portfolio-voorbeelden/mockups/chatvora_breed.png",
    mockupMain: "/portfolio-voorbeelden/mockups/chatvora_tablet_mockup.png",
    mockupPhone: "/portfolio-voorbeelden/mockups/chatvora_phone.png",
    gallery: [
      { src: "/portfolio-voorbeelden/mockups/chatvora_breed.png", label: "Website overzicht" },
      { src: "/portfolio-voorbeelden/mockups/chatvora_tablet_mockup.png", label: "Tablet" },
      { src: "/portfolio-voorbeelden/mockups/chatvora_phone.png", label: "Mobiel" },
    ],
  },
  {
    id: "chartsbezorgd",
    tag: "Trading Platform",
    title: "Charts Bezorgd",
    domain: "chartsbezorgd.info",
    description: "Crypto trading signals platform met een donkere uitstraling gebouwd voor snelle mobiele conversie.",
    url: "https://chartsbezorgd.info",
    liveUrl: "https://chartsbezorgd.info",
    bgColor: "#0c0a08",
    accentColor: "#f5a623",
    mockupBreed: "/portfolio-voorbeelden/mockups/chartsbezorgd_mockup_1.png",
    mockupMain: "/portfolio-voorbeelden/mockups/chartsbezorgd_mockup_2.png",
    mockupPhone: "/portfolio-voorbeelden/mockups/chartsbezorgd_mockup_3.png",
    gallery: [
      { src: "/portfolio-voorbeelden/mockups/chartsbezorgd_mockup_1.png", label: "Website overzicht" },
      { src: "/portfolio-voorbeelden/mockups/chartsbezorgd_mockup_2.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/chartsbezorgd_mockup_3.png", label: "Mobiel" },
    ],
  },
];

const isLightColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
};

export default function ProjectenPage() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryProject, setGalleryProject] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const galleryTouchStart = useRef<number>(0);
  const galleryTouchEnd = useRef<number>(0);
  const slideRootRef = useRef<HTMLDivElement | null>(null);

  const openGallery = useCallback((projectIndex: number, slideIndex: number) => {
    setGalleryProject(projectIndex);
    setGallerySlide(slideIndex);
    setGalleryOpen(true);
    setIsPaused(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    setIsPaused(false);
    document.body.style.overflow = "";
  }, []);

  const galleryNext = useCallback(() => {
    const total = projects[galleryProject].gallery.length;
    setGallerySlide((s) => (s + 1) % total);
  }, [galleryProject]);

  const galleryPrev = useCallback(() => {
    const total = projects[galleryProject].gallery.length;
    setGallerySlide((s) => (s - 1 + total) % total);
  }, [galleryProject]);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % projects.length);
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c + 1) % projects.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    intervalRef.current = progressRef.current;
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, current]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (galleryOpen) {
        if (e.key === "ArrowRight") galleryNext();
        if (e.key === "ArrowLeft") galleryPrev();
        if (e.key === "Escape") closeGallery();
        return;
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, galleryOpen, galleryNext, galleryPrev, closeGallery]);

  useEffect(() => {
    if (!slideRootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".slide-text-content",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        ".mockup-panel",
        { opacity: 0, x: 20, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: "power2.out", delay: 0.05 },
      );
    }, slideRootRef);
    return () => ctx.revert();
  }, [current]);

  useEffect(() => {
    if (galleryOpen) {
      gsap.fromTo(".gallery-overlay", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    }
  }, [galleryOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;
    gsap.fromTo(".gallery-image", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  }, [gallerySlide, galleryOpen]);

  const currentProject = projects[current];
  const projectDestination = currentProject.liveUrl ?? currentProject.url;

  const primaryTextColor = isLightColor(currentProject.accentColor) ? "#000" : "#fff";

  return (
    <main className="projecten-v2" style={{ overscrollBehavior: "auto" }}>
      <div className="projecten-top-info">
        <span className="info-left">📍 Groningen, Nederland</span>
        <span className="info-center">
          <span className="stars">⭐⭐⭐⭐⭐</span> 4.9/5 Google Reviews
        </span>
        <a href="tel:0853696652" className="info-right">
          📞 085-369 6652
        </a>
      </div>

      <Navbar />

      <section className="projecten-v2-page" id="template-demos">
        <header className="projecten-v2-header">
          <p className="eyebrow">PORTFOLIO</p>
          <h1>Onze projecten</h1>
          <p>Elk project gebouwd met aandacht voor detail, snelheid en resultaat.</p>
        </header>

        <div className="projecten-v2-slideshow-wrap">
          <div className="slide-counter">
            <span className="current">{`0${current + 1}`}</span> / {`0${projects.length}`}
          </div>

          <div className="progress-bar-wrap">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${currentProject.accentColor}80, ${currentProject.accentColor})`,
              }}
            />
          </div>

          <div
            className="projecten-v2-slide"
            ref={slideRootRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              touchEndX.current = e.changedTouches[0].clientX;
              const diff = touchStartX.current - touchEndX.current;
              if (Math.abs(diff) > 50) {
                if (diff > 0) goNext();
                else goPrev();
              }
            }}
          >
            <div className="slide-inner" key={current}>
              <div className="slide-text-content">
                <div className="tag-domain-row">
                  <span className="tag">{currentProject.tag}</span>
                  <span className="tag-domain-divider" aria-hidden />
                  <span className="project-domain-line">
                    <Globe2 size={12} />
                    <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      {currentProject.domain}
                    </a>
                  </span>
                </div>
                <h2>{currentProject.title}</h2>
                <p>{currentProject.description}</p>

                <div className="actions">
                  <a
                    href={projectDestination}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-primary"
                    style={{
                      background: currentProject.accentColor,
                      color: primaryTextColor,
                      ["--accent" as string]: currentProject.accentColor,
                      boxShadow: `0 0 20px ${currentProject.accentColor}55`,
                    }}
                  >
                    Bekijk project
                    <span className="project-link-arrow" aria-hidden>
                      →
                    </span>
                  </a>
                  <a
                    href="/projecten#template-demos"
                    className="project-link-secondary"
                    onClick={(e) => {
                      if (typeof window === "undefined" || window.location.pathname !== "/projecten") return;
                      const target = document.getElementById("template-demos");
                      if (!target) return;
                      e.preventDefault();
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Alle projecten
                  </a>
                </div>

                <div className="nav-controls">
                  <button type="button" className="nav-btn" onClick={goPrev} aria-label="Vorige project">
                    ←
                  </button>
                  <button type="button" className="nav-btn" onClick={goNext} aria-label="Volgende project">
                    →
                  </button>

                  <div className="dots">
                    {projects.map((project, index) => (
                      <button
                        key={project.id}
                        type="button"
                        className={`dot ${index === current ? "active" : ""}`}
                        style={index === current ? { background: currentProject.accentColor } : undefined}
                        onClick={() => {
                          setCurrent(index);
                          setProgress(0);
                        }}
                        aria-label={`Ga naar ${project.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="mockup-panel"
                style={{ background: currentProject.bgColor }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => openGallery(current, 0)}
              >
                <div className="breed-wrapper" style={{ height: "220px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentProject.mockupBreed}
                    alt={`${currentProject.title} website`}
                    className="breed-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top left",
                      opacity: 1,
                      display: "block",
                      filter: "none",
                      transform: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50px",
                      background: `linear-gradient(to bottom, transparent, ${currentProject.bgColor})`,
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                </div>

                <div className="devices-layer">
                  <div className="accent-glow" style={{ background: `radial-gradient(ellipse at bottom, ${currentProject.accentColor}20 0%, transparent 70%)` }} />
                  <div className="device-main-wrap">
                    <Image
                      src={currentProject.mockupMain}
                      alt={`${currentProject.title} main mockup`}
                      width={980}
                      height={680}
                      sizes="(max-width: 768px) 70vw, 420px"
                      className="mockup-main"
                      priority
                    />
                  </div>
                  <div className="device-phone-wrap">
                    <Image
                      src={currentProject.mockupPhone}
                      alt={`${currentProject.title} phone mockup`}
                      width={320}
                      height={640}
                      sizes="(max-width: 768px) 20vw, 200px"
                      className="mockup-phone"
                    />
                  </div>
                </div>
                <div className="gallery-hint">
                  <span>
                    <Expand size={12} />
                    Bekijk mockups
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="projecten-bottom-cta">
          <ParticlesCanvas
            id="projecten-cta-particles"
            particleColor="#a5b4fc"
            linkColor="#818cf8"
            count={45}
            speed={0.5}
            particleOpacity={0.4}
            linkOpacity={0.12}
            repulse={false}
          />
          <div className="projecten-cta-inner">
            <p className="projecten-cta-eyebrow">KLAAR OM TE STARTEN?</p>
            <h2>Jouw website als volgende?</h2>
            <p>We bouwen websites die werken, gevonden worden en bezoekers omzetten in klanten. Gratis adviesgesprek — binnen 24 uur reactie.</p>
            <div className="projecten-cta-btns">
              <Link
                href="/contact"
                className="cta-btn"
                style={{
                  background: "#fff",
                  color: "#4338ca",
                  fontFamily: '"Inter", var(--font-sans), sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "15px 32px",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#eef2ff";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 10px 36px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#fff";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25)";
                }}
              >
                Plan een gratis gesprek <span>→</span>
              </Link>
              <a href="tel:0853696652" className="cta-btn-ghost">
                085 - 369 6652
              </a>
            </div>
          </div>
        </section>
      </section>

      <Footer />

      {galleryOpen && (
        <div
          className="gallery-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.96)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeGallery();
          }}
        >
          <div className="gallery-topbar">
            <div className="gallery-title">
              <span className="name">{projects[galleryProject].title}</span>
              <span className="sep"> · </span>
              <span className="label">{projects[galleryProject].gallery[gallerySlide].label}</span>
            </div>
            <button type="button" className="gallery-close" onClick={closeGallery} aria-label="Sluit galerij">
              <X size={16} />
            </button>
          </div>

          <div
            className="gallery-main"
            onTouchStart={(e) => {
              galleryTouchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              galleryTouchEnd.current = e.changedTouches[0].clientX;
              const diff = galleryTouchStart.current - galleryTouchEnd.current;
              if (Math.abs(diff) > 40) {
                if (diff > 0) galleryNext();
                else galleryPrev();
              }
            }}
          >
            {projects[galleryProject].gallery.length > 1 ? (
              <button type="button" className="gallery-arrow left" onClick={galleryPrev} aria-label="Vorige mockup">
                ←
              </button>
            ) : null}

            <div className="gallery-image-wrap">
              <Image
                className="gallery-image"
                src={projects[galleryProject].gallery[gallerySlide].src}
                alt={projects[galleryProject].gallery[gallerySlide].label}
                width={1800}
                height={1200}
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>

            {projects[galleryProject].gallery.length > 1 ? (
              <button type="button" className="gallery-arrow right" onClick={galleryNext} aria-label="Volgende mockup">
                →
              </button>
            ) : null}
          </div>

          <div className="gallery-bottombar">
            <div className="gallery-dots">
              {projects[galleryProject].gallery.map((item, index) => (
                <button
                  key={`${item.label}-${index}`}
                  type="button"
                  className={`gallery-dot ${index === gallerySlide ? "active" : ""}`}
                  style={index === gallerySlide ? { background: projects[galleryProject].accentColor } : undefined}
                  onClick={() => setGallerySlide(index)}
                  aria-label={`Ga naar ${item.label}`}
                />
              ))}
            </div>
            <div className="gallery-labels">
              {projects[galleryProject].gallery.map((item, index) => (
                <button
                  key={`${item.label}-pill-${index}`}
                  type="button"
                  className={`gallery-pill ${index === gallerySlide ? "active" : ""}`}
                  style={
                    index === gallerySlide
                      ? {
                          color: projects[galleryProject].accentColor,
                          borderColor: `${projects[galleryProject].accentColor}40`,
                          background: `${projects[galleryProject].accentColor}10`,
                        }
                      : undefined
                  }
                  onClick={() => setGallerySlide(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .projecten-v2 {
          background: #080c14;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .projecten-top-info {
          height: 40px;
          background: #060403;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          padding: 0 24px;
        }
        .projecten-top-info span,
        .projecten-top-info a {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
        }
        .projecten-top-info .info-center {
          color: rgba(255, 255, 255, 0.5);
        }
        .stars {
          color: #c9a96e;
        }
        .projecten-v2-page {
          min-height: 100vh;
          padding-top: 0;
        }
        .projecten-v2-header {
          text-align: center;
          padding: 72px 24px 32px;
        }
        .eyebrow {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #c9a96e;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .projecten-v2-header h1 {
          font-family: "Syne", var(--font-sans), sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 10px;
        }
        .projecten-v2-header p {
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.4);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .projecten-v2-slideshow-wrap {
          position: relative;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 48px 120px;
        }
        .progress-bar-wrap {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 3px;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          transition: width 0.05s linear;
          border-radius: 3px;
        }
        .slide-counter {
          text-align: right;
          font-family: "Syne", var(--font-sans), sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.25);
          margin-bottom: 16px;
        }
        .slide-counter .current {
          color: rgba(255, 255, 255, 0.75);
          font-weight: 700;
        }
        .projecten-v2-slide {
          min-height: calc(100vh - 80px - 140px);
        }
        .slide-inner {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 60px;
          align-items: center;
        }
        .slide-text-content .tag {
          display: inline-flex;
          align-items: center;
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.06);
          white-space: nowrap;
        }
        .tag-domain-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .tag-domain-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }
        .project-domain-line {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .project-domain-line :global(svg) {
          color: rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
        }
        .project-domain-line a {
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .project-domain-line a:hover {
          color: rgba(255, 255, 255, 0.75);
        }
        .slide-text-content h2 {
          font-family: "Syne", var(--font-sans), sans-serif;
          font-size: clamp(34px, 4vw, 56px);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
        }
        .slide-text-content p {
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.85;
          margin: 0 0 28px;
          max-width: 380px;
        }
        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .project-link-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 9999px;
          text-decoration: none;
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: 0;
          transition:
            transform 150ms ease,
            box-shadow 150ms ease;
          cursor: pointer;
        }
        .project-link-primary:hover {
          transform: scale(1.03);
        }
        .project-link-primary:hover,
        .project-link-primary:focus-visible {
          box-shadow: 0 0 28px color-mix(in srgb, var(--accent, #ffffff) 60%, white 40%);
        }
        .project-link-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          line-height: 1;
          transition: transform 150ms ease;
        }
        .project-link-primary:hover .project-link-arrow {
          transform: translateX(3px);
        }
        .project-link-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 9999px;
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          transition: all 180ms ease;
        }
        .project-link-secondary:hover {
          border-color: rgba(255, 255, 255, 0.45);
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
        }
        .nav-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 17px;
        }
        .nav-btn:hover:first-of-type {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(-2px);
        }
        .nav-btn:hover:last-of-type {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(2px);
        }
        .dots {
          display: flex;
          gap: 8px;
          margin-left: 8px;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .dot.active {
          width: 28px;
          border-radius: 3px;
        }
        .mockup-panel {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 460px;
          max-height: calc(100vh - 280px);
          display: flex;
          flex-direction: column;
          padding: 0;
          cursor: pointer;
          border: 1px solid transparent;
          transition: border-color 0.2s ease;
        }
        .mockup-panel:hover {
          border-color: rgba(255, 255, 255, 0.15);
        }
        .breed-wrapper {
          width: 100%;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: #000;
        }
        .devices-layer {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 20px;
          padding: 16px 24px 24px;
          position: relative;
          flex: 1;
          min-height: 180px;
        }
        .accent-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 160px;
          pointer-events: none;
        }
        .device-main-wrap {
          flex: 0 0 62%;
          max-width: 62%;
          position: relative;
          z-index: 2;
        }
        .mockup-main {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
          display: block;
        }
        .device-phone-wrap {
          flex: 0 0 28%;
          max-width: 28%;
          align-self: flex-end;
          margin-bottom: 8px;
          position: relative;
          z-index: 3;
        }
        .mockup-phone {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
          transform: rotate(-4deg);
          display: block;
        }
        .gallery-hint {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .mockup-panel:hover .gallery-hint {
          opacity: 1;
        }
        .gallery-hint span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 6px 14px;
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
        }
        .gallery-overlay {
          opacity: 1;
        }
        .gallery-topbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          z-index: 1005;
          pointer-events: all;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .gallery-title {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.4);
          gap: 0;
        }
        .gallery-title .name {
          font-family: "Syne", var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }
        .gallery-title .label {
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }
        .gallery-close {
          position: absolute;
          top: 14px;
          right: 20px;
          z-index: 1010;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          pointer-events: all;
        }
        .gallery-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .gallery-main {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 80px 80px;
          position: relative;
        }
        .gallery-image-wrap {
          max-width: 900px;
          max-height: calc(100vh - 200px);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gallery-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8);
        }
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s;
        }
        .gallery-arrow.left {
          left: 16px;
        }
        .gallery-arrow.right {
          right: 16px;
        }
        .gallery-arrow.left:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-50%) translateX(-2px);
        }
        .gallery-arrow.right:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-50%) translateX(2px);
        }
        .gallery-bottombar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }
        .gallery-dots {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .gallery-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.25s ease;
          border: 0;
          padding: 0;
        }
        .gallery-dot.active {
          width: 20px;
          border-radius: 3px;
        }
        .gallery-labels {
          display: flex;
          gap: 8px;
        }
        .gallery-pill {
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.07);
          padding: 5px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.15);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        .projecten-bottom-cta {
          position: relative;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          padding: 100px 24px;
          text-align: center;
          overflow: hidden;
        }
        .projecten-cta-inner {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }
        .projecten-cta-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a5b4fc;
          margin: 0 0 16px;
        }
        .projecten-bottom-cta h2 {
          font-family: "Syne", var(--font-sans), sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .projecten-bottom-cta > .projecten-cta-inner > p {
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.68);
          max-width: 460px;
          margin: 0 auto 40px;
          line-height: 1.75;
        }
        .projecten-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cta-btn {
          background: #fff;
          color: #4338ca !important;
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 15px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
        }
        .cta-btn span {
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .cta-btn:hover {
          background: #eef2ff;
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.3);
        }
        .cta-btn:hover span {
          transform: translateX(4px);
        }
        .cta-btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.85) !important;
          font-family: "Inter", var(--font-sans), sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.28);
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none !important;
        }
        .cta-btn-ghost:hover {
          border-color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.07);
          color: #fff !important;
        }
        @media (max-width: 768px) {
          .info-left,
          .info-right {
            display: none;
          }
          .projecten-v2-header {
            padding: 72px 20px 20px;
          }
          .projecten-v2-header h1 {
            font-size: clamp(24px, 7vw, 32px);
          }
          .projecten-v2-header p {
            font-size: 14px;
          }
          .projecten-v2-slideshow-wrap {
            padding: 0 16px 72px;
          }
          .progress-bar-wrap {
            margin-bottom: 16px;
          }
          .slide-counter {
            font-size: 11px;
          }
          .projecten-v2-slide {
            gap: 20px;
            min-height: auto;
          }
          .slide-inner {
            grid-template-columns: 1fr;
          }
          .mockup-panel {
            order: -1;
            min-height: 280px;
            max-height: 320px;
            border-radius: 14px;
            margin-bottom: 20px;
          }
          .slide-text-content {
            order: 2;
            padding: 0 4px;
          }
          .breed-wrapper {
            height: 160px !important;
          }
          .devices-layer {
            padding: 12px 16px 16px;
            gap: 10px;
            min-height: 140px;
          }
          .device-main-wrap {
            flex: 0 0 62%;
            max-width: 62%;
          }
          .device-phone-wrap {
            flex: 0 0 30%;
            max-width: 30%;
            margin-bottom: 4px;
          }
          .slide-text-content h2 {
            font-size: clamp(22px, 6vw, 28px);
          }
          .slide-text-content p {
            font-size: 13px;
            line-height: 1.7;
            margin-bottom: 20px;
          }
          .slide-text-content .tag {
            font-size: 10px;
            padding: 5px 12px;
          }
          .tag-domain-row {
            gap: 8px;
          }
          .project-domain-line a {
            font-size: 12px;
          }
          .actions {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
          }
          .project-link-primary,
          .project-link-secondary {
            width: auto;
            justify-content: center;
            font-size: 12px;
            min-height: 36px;
          }
          .project-link-primary {
            padding: 8px 16px;
          }
          .project-link-secondary {
            padding: 8px 14px;
          }
          .nav-controls {
            justify-content: flex-start;
            margin-top: 20px;
            gap: 10px;
          }
          .nav-btn {
            width: 40px;
            height: 40px;
          }
          .dots {
            gap: 6px;
          }
          .projecten-bottom-cta {
            padding: 80px 20px;
          }
          .projecten-cta-btns {
            flex-direction: column;
            align-items: center;
          }
          .cta-btn, .cta-btn-ghost {
            width: 100%;
            justify-content: center;
            max-width: 320px;
          }
          .gallery-main {
            padding: 80px 16px 80px;
          }
          .gallery-labels {
            display: none;
          }
          .gallery-hint {
            animation: pulse-ring 2.5s infinite;
          }
        }
        @media (min-width: 769px) {
          .gallery-hint {
            animation: none;
          }
        }
      `}</style>
      <style jsx global>{`
        @media (max-width: 768px) {
          .breed-wrapper {
            height: 160px !important;
          }
        }
      `}</style>
    </main>
  );
}

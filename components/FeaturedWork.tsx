 "use client";

import Image from "next/image";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";

const homeProjects = [
  {
    id: "heyligers",
    tag: "Service Bedrijf",
    title: "Heyligers Service",
    domain: "heyligersservice.nl",
    description: "Professionele servicewebsite met focus op vertrouwen, bereikbaarheid en lokale vindbaarheid.",
    accentColor: "#00c896",
    bgColor: "#0a0f1a",
    mockups: [
      { src: "/portfolio-voorbeelden/mockups/heyligersservice_screen_mockup.png", label: "Overzicht" },
      { src: "/portfolio-voorbeelden/mockups/heyligersservice_macbook.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/heyligersservice_phone_mockup.png", label: "Mobiel" },
    ],
  },
  {
    id: "chatvora",
    tag: "AI Platform",
    title: "Chatvora",
    domain: "chatvora.org",
    description: "Nieuwe launch website met moderne uitstraling en focus op conversie.",
    accentColor: "#22c55e",
    bgColor: "#0c1020",
    mockups: [
      { src: "/portfolio-voorbeelden/mockups/chatvora_breed.png", label: "Overzicht" },
      { src: "/portfolio-voorbeelden/mockups/chatvora_tablet_mockup.png", label: "Tablet" },
      { src: "/portfolio-voorbeelden/mockups/chatvora_phone.png", label: "Mobiel" },
    ],
  },
  {
    id: "udrone",
    tag: "Drone Services",
    title: "Udrone",
    domain: "hueyfreeman.org",
    description: "Drone services showcase met een krachtige visuele uitstraling en duidelijke call-to-actions.",
    accentColor: "#4a9eff",
    bgColor: "#080c18",
    mockups: [
      { src: "/portfolio-voorbeelden/mockups/udrone_breed.png", label: "Overzicht" },
      { src: "/portfolio-voorbeelden/mockups/udrone_imac_mockup.png", label: "Desktop" },
      { src: "/portfolio-voorbeelden/mockups/udrone_phone_mockup.png", label: "Mobiel" },
    ],
  },
] as const;

export default function FeaturedWork() {
  const [mobileActive, setMobileActive] = useState(0);
  const [innerSlide, setInnerSlide] = useState<number[]>([0, 0, 0]);
  const mobileIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const innerTouchStart = useRef<{ [key: number]: number }>({});
  const innerTouchEnd = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    mobileIntervalRef.current = setInterval(() => {
      setMobileActive((prev) => (prev + 1) % homeProjects.length);
    }, 6000);
    return () => {
      if (mobileIntervalRef.current) clearInterval(mobileIntervalRef.current);
    };
  }, []);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setMobileActive((prev) => (prev + 1) % homeProjects.length);
      } else {
        setMobileActive((prev) => (prev - 1 + homeProjects.length) % homeProjects.length);
      }
      if (mobileIntervalRef.current) clearInterval(mobileIntervalRef.current);
      mobileIntervalRef.current = setInterval(() => {
        setMobileActive((prev) => (prev + 1) % homeProjects.length);
      }, 6000);
    }
  };

  const setInnerSlideForProject = (projectIndex: number, slideIndex: number) => {
    setInnerSlide((prev) => {
      const next = [...prev];
      next[projectIndex] = slideIndex;
      return next;
    });
  };

  const innerNext = (projectIndex: number, e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    const total = homeProjects[projectIndex].mockups.length;
    setInnerSlideForProject(projectIndex, (innerSlide[projectIndex] + 1) % total);
  };

  const innerPrev = (projectIndex: number, e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    const total = homeProjects[projectIndex].mockups.length;
    setInnerSlideForProject(projectIndex, (innerSlide[projectIndex] - 1 + total) % total);
  };

  return (
    <section id="work" style={{ scrollMarginTop: "5rem", padding: "100px 0", overflowX: "hidden", background: "#f8f9fc" }}>
      <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 64px", padding: "0 24px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: 0 }}>ONS WERK</p>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: "#0f172a", margin: "8px 0 12px", lineHeight: 1.2 }}>Geselecteerde projecten</h2>
        <p style={{ margin: 0, color: "#64748b", fontSize: 16, lineHeight: 1.7 }}>Een selectie van onze recente projecten.</p>
      </div>

      <div className="desktop-projects-grid">
        {homeProjects.map((project, index) => (
          <article key={project.id} className="home-project-card" style={{ background: project.bgColor }}>
            <div
              className="card-mockup-area"
              onTouchStart={(e) => {
                innerTouchStart.current[index] = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                innerTouchEnd.current[index] = e.changedTouches[0].clientX;
                const diff = innerTouchStart.current[index] - innerTouchEnd.current[index];
                if (Math.abs(diff) > 30) {
                  if (diff > 0) innerNext(index, e);
                  else innerPrev(index, e);
                }
              }}
            >
              <div className="inner-track" style={{ transform: `translateX(-${innerSlide[index] * 100}%)` }}>
                {project.mockups.map((mockup, mockupIndex) => (
                  <div className="inner-slide" key={`${project.id}-${mockup.src}`}>
                    <Image
                      src={mockup.src}
                      alt={`${project.title} ${mockup.label}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="inner-slide-image"
                      priority={index === 0 && mockupIndex === 0}
                    />
                  </div>
                ))}
              </div>
              <button type="button" className="inner-arrow left" onClick={(e) => innerPrev(index, e)} aria-label={`Vorige mockup ${project.title}`}>
                ←
              </button>
              <button type="button" className="inner-arrow right" onClick={(e) => innerNext(index, e)} aria-label={`Volgende mockup ${project.title}`}>
                →
              </button>
              <span className="slide-label">{project.mockups[innerSlide[index]].label}</span>
              <div className="inner-dots">
                {project.mockups.map((mockup, dotIndex) => (
                  <button
                    key={`${project.id}-desktop-dot-${mockup.src}`}
                    className={`inner-dot ${dotIndex === innerSlide[index] ? "active" : ""}`}
                    style={dotIndex === innerSlide[index] ? { background: project.accentColor } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      setInnerSlideForProject(index, dotIndex);
                    }}
                    aria-label={`Ga naar ${mockup.label}`}
                  />
                ))}
              </div>
            </div>
            <div className="home-project-bottom">
              <div className="home-meta">
                <span className="home-tag" style={{ color: project.accentColor, background: `${project.accentColor}20`, borderColor: `${project.accentColor}35` }}>
                  {project.tag}
                </span>
                <span className="home-domain">
                  <Globe2 size={11} />
                  {project.domain}
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link href="/projecten" className="home-link" style={{ color: project.accentColor }}>
                Bekijk project <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mobile-carousel">
        <div className="mobile-track" style={{ transform: `translateX(-${mobileActive * 100}%)` }}>
          {homeProjects.map((project, index) => (
            <div className="mobile-slide" key={project.id}>
              <article className="mobile-card" style={{ background: project.bgColor }}>
                <div
                  className="mobile-top"
                  onTouchStart={(e) => {
                    innerTouchStart.current[index] = e.touches[0].clientX;
                  }}
                  onTouchEnd={(e) => {
                    innerTouchEnd.current[index] = e.changedTouches[0].clientX;
                    const diff = innerTouchStart.current[index] - innerTouchEnd.current[index];
                    if (Math.abs(diff) > 30) {
                      if (diff > 0) innerNext(index, e);
                      else innerPrev(index, e);
                    }
                  }}
                >
                  <div className="inner-track" style={{ transform: `translateX(-${innerSlide[index] * 100}%)` }}>
                    {project.mockups.map((mockup) => (
                      <div className="inner-slide" key={`${project.id}-mobile-${mockup.src}`}>
                        <Image src={mockup.src} alt={`${project.title} ${mockup.label}`} fill sizes="100vw" className="inner-slide-image" />
                      </div>
                    ))}
                  </div>
                  <span className="slide-label">{project.mockups[innerSlide[index]].label}</span>
                  <div className="inner-dots">
                    {project.mockups.map((mockup, dotIndex) => (
                      <button
                        key={`${project.id}-mobile-dot-${mockup.src}`}
                        className={`inner-dot ${dotIndex === innerSlide[index] ? "active" : ""}`}
                        style={dotIndex === innerSlide[index] ? { background: project.accentColor } : undefined}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInnerSlideForProject(index, dotIndex);
                        }}
                        aria-label={`Ga naar ${mockup.label}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mobile-bottom" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                  <div className="home-meta">
                    <span className="home-tag" style={{ color: project.accentColor, background: `${project.accentColor}20`, borderColor: `${project.accentColor}35` }}>
                      {project.tag}
                    </span>
                    <span className="home-domain">
                      <Globe2 size={11} />
                      {project.domain}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Link href="/projecten" className="home-link" style={{ color: project.accentColor }}>
                    Bekijk project <span>→</span>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
        <div className="mobile-dots">
          {homeProjects.map((project, index) => (
            <button
              key={`${project.id}-dot`}
              className={`mobile-dot ${index === mobileActive ? "active" : ""}`}
              style={index === mobileActive ? { background: homeProjects[mobileActive].accentColor } : undefined}
              onClick={() => setMobileActive(index)}
              aria-label={`Ga naar ${project.title}`}
            />
          ))}
        </div>
        <div className="mobile-progress">
          <div key={mobileActive} className="mobile-progress-fill" style={{ background: homeProjects[mobileActive].accentColor }} />
        </div>
      </div>

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <Link href="/projecten" className="home-all-link">
          Bekijk alle projecten <span>→</span>
        </Link>
      </div>

      <style jsx>{`
        .desktop-projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .mobile-carousel {
          display: none;
        }
        .home-project-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .home-project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }
        .card-mockup-area {
          height: 260px;
          position: relative;
          overflow: hidden;
          cursor: grab;
        }
        .inner-track {
          display: flex;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100%;
        }
        .inner-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          position: relative;
        }
        .inner-slide-image {
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .inner-arrow {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.2s;
          padding: 0;
        }
        .inner-arrow.right {
          left: auto;
          right: 8px;
        }
        .card-mockup-area:hover .inner-arrow {
          opacity: 1;
        }
        .slide-label {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 4px 10px;
          font-family: Inter, sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .inner-dots {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 10;
          bottom: 8px;
        }
        .inner-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.25s ease;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .inner-dot.active {
          width: 14px;
          border-radius: 3px;
        }
        .home-breed-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          pointer-events: none;
        }
        .home-project-bottom {
          padding: 20px;
        }
        .home-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .home-tag {
          font-family: Inter, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid;
          padding: 5px 12px;
          border-radius: 20px;
        }
        .home-domain {
          font-family: Inter, sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .home-domain :global(svg) {
          color: rgba(255, 255, 255, 0.25);
        }
        .home-project-bottom h3 {
          font-family: Syne, sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .home-project-bottom p {
          font-family: Inter, sans-serif;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.65;
          margin: 0 0 16px;
        }
        .home-link {
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .home-link span {
          transition: transform 0.2s ease;
        }
        .home-link:hover span {
          transform: translateX(4px);
        }
        .home-all-link {
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 12px 32px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          background: #0f172a;
        }
        .home-all-link:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.3);
        }
        @media (max-width: 768px) {
          .desktop-projects-grid {
            display: none;
          }
          .mobile-carousel {
            display: block;
            position: relative;
            width: 100%;
            overflow: hidden;
            padding: 0 0 24px;
          }
          .mobile-track {
            display: flex;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
          }
          .mobile-slide {
            flex: 0 0 100%;
            width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
          }
          .mobile-card {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.07);
          }
          .mobile-top {
            height: 260px;
            position: relative;
            overflow: hidden;
            border-radius: 14px 14px 0 0;
          }
          .mobile-bottom {
            padding: 20px 16px;
            background: inherit;
            border-radius: 0 0 14px 14px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
          }
          .mobile-bottom h3 {
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 8px;
            line-height: 1.2;
            letter-spacing: -0.01em;
          }
          .mobile-bottom p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.7;
            margin-bottom: 16px;
          }
          .mobile-bottom .home-link {
            font-size: 14px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .inner-arrow {
            display: none;
          }
          .mobile-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 16px;
          }
          .mobile-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            padding: 0;
          }
          .mobile-dot.active {
            width: 20px;
            border-radius: 3px;
          }
          .mobile-progress {
            width: 60px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            margin: 8px auto 0;
            overflow: hidden;
          }
          .mobile-progress-fill {
            height: 100%;
            border-radius: 2px;
            animation: progress-fill 6s linear infinite;
          }
        }
        @keyframes progress-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

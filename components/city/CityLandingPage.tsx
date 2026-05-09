"use client";

import { Fragment, useState, type CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { CityData } from "@/data/cities";
import { buildCityFaqItems } from "@/data/city-faq";

const ACCENT = "#6366f1";
const BG1 = "#0a0f1e";
const BG2 = "#0d1117";
const SECTION_BORDER = "1px solid rgba(255,255,255,0.06)";

function buildServices(city: CityData) {
  const stad = city.naam;
  return [
    {
      n: "01",
      title: "Webdesign op maat",
      desc: "Geen templates. Elke website bouwen wij van nul op basis van uw merk en doelgroep. Mobiel geoptimaliseerd en klaar binnen twee weken.",
      href: "/diensten/web-development",
    },
    {
      n: "02",
      title: "SEO & vindbaarheid",
      desc: `Gevonden worden in Google wanneer klanten zoeken op uw dienst in ${stad}. Technische SEO en lokale optimalisatie.`,
      href: "/diensten/seo-zichtbaarheid",
    },
    {
      n: "03",
      title: "Hosting & onderhoud",
      desc: "Uw website snel en veilig online houden. SSL, backups en support inbegrepen. Wij regelen de techniek.",
      href: "/diensten/hosting-onderhoud",
    },
    {
      n: "04",
      title: "Webshops & platformen",
      desc: "Online verkopen met een snelle, gebruiksvriendelijke webshop. Betaalsysteem en voorraadbeheer inbegrepen.",
      href: "/diensten/web-development",
    },
  ];
}

const BRANCH_PILLS: { label: string; href: string }[] = [
  { label: "Kappers", href: "/website-laten-maken-kapper" },
  { label: "Restaurants", href: "/website-laten-maken-restaurant" },
  { label: "Garages", href: "/website-laten-maken-garage" },
  { label: "Autobedrijven", href: "/website-laten-maken-autobedrijf" },
  { label: "Tandartsen", href: "/website-laten-maken-tandarts" },
  { label: "Alle branches →", href: "/branches" },
];

const PROCESS_STEPS: { n: string; title: string; text: string }[] = [
  {
    n: "01",
    title: "Kennismaking",
    text: "Gratis gesprek over uw wensen. Wij stellen de juiste vragen en denken met u mee.",
  },
  {
    n: "02",
    title: "Ontwerp",
    text: "Eerste concept op basis van uw merk. U geeft feedback, wij passen aan.",
  },
  {
    n: "03",
    title: "Bouw",
    text: "Technisch correct, snel en SEO-klaar. U blijft op de hoogte van de voortgang.",
  },
  {
    n: "04",
    title: "Live",
    text: "Online met hosting, domein en SSL. Inclusief uitleg zodat u zelf aanpassingen kunt doen.",
  },
];

const pStyle: CSSProperties = {
  fontSize: 15,
  color: "rgba(255,255,255,0.65)",
  lineHeight: 1.85,
  marginBottom: 18,
};

export default function CityLandingPage({ city }: { city: CityData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqItems = buildCityFaqItems(city);
  const services = buildServices(city);
  const localH2Lines = city.localAuthorityH2.split("\n");
  const ctaH2Lines = city.ctaH2.split("\n");

  return (
    <>
      <style>{`
        .cityld-root { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        .cityld-root section { box-sizing: border-box; }
        .cityld-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .cityld-hero-grid {
            grid-template-columns: 55fr 45fr;
            gap: 0 48px;
            align-items: center;
          }
        }
        .cityld-hero-photo { display: none !important; }
        @media (min-width: 1024px) {
          .cityld-hero-photo { display: block !important; }
        }
        .cityld-hero-btns {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: stretch;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .cityld-hero-btns {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            width: auto;
          }
        }
        .cityld-stats-row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
          gap: 28px 16px;
          max-width: 680px;
          margin: 0 auto;
        }
        @media (max-width: 1023px) {
          .cityld-stats-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            gap: 24px 12px;
          }
        }
        .cityld-services-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .cityld-services-grid { grid-template-columns: 1fr 1fr; }
        }
        .cityld-process-desktop {
          display: none;
        }
        .cityld-process-mobile {
          display: block;
        }
        @media (min-width: 1024px) {
          .cityld-process-desktop {
            display: flex !important;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
            gap: 12px;
          }
          .cityld-process-mobile { display: none !important; }
        }
        .cityld-faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .cityld-faq-grid {
            grid-template-columns: 58fr 42fr;
            gap: 48px;
          }
        }
        .cityld-cta-sticky {
          position: relative;
        }
        @media (min-width: 1024px) {
          .cityld-cta-sticky {
            position: sticky;
            top: 40px;
          }
        }
        .cityld-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .cityld-bottom-grid {
            grid-template-columns: 55fr 45fr;
            gap: 40px;
          }
        }
        .cityld-bottom-btns {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .cityld-bottom-btns a,
        .cityld-bottom-btns a[href] {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 900px) {
          .cityld-bottom-btns a,
          .cityld-bottom-btns a[href] { width: auto; max-width: none; }
        }
      `}</style>

      <div className="cityld-root" style={{ background: BG1, color: "#f1f5f9" }}>
        <Navbar />

        {/* SECTION 1 — HERO */}
        <section
          style={{
            background: BG1,
            padding: "70px 20px 50px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .cityld-hero-pad { padding: 100px 24px 80px !important; }
            }
          `}</style>
          <div className="cityld-hero-pad" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
            <nav
              aria-label="Breadcrumb"
              style={{
                marginBottom: 28,
                fontSize: 13,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                Home
              </Link>
              <span style={{ color: "rgba(255,255,255,0.25)" }} aria-hidden>
                /
              </span>
              <Link href="/steden" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                Steden
              </Link>
              <span style={{ color: "rgba(255,255,255,0.25)" }} aria-hidden>
                /
              </span>
              <span style={{ color: "rgba(255,255,255,0.75)" }}>{city.naam}</span>
            </nav>

            <div className="cityld-hero-grid">
              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    color: ACCENT,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginBottom: 20,
                    display: "block",
                  }}
                >
                  {city.eyebrow}
                </span>

                <h1
                  style={{
                    fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1.05,
                    marginBottom: 24,
                    letterSpacing: -1,
                    marginTop: 0,
                  }}
                >
                  {city.h1Line1}
                  <span style={{ display: "block", color: ACCENT }}>{city.h1Line2}</span>
                </h1>

                <p
                  style={{
                    fontSize: 17,
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.75,
                    maxWidth: 430,
                    marginBottom: 36,
                    marginTop: 0,
                  }}
                >
                  {city.heroParagraph}
                </p>

                <div className="cityld-hero-btns">
                  <Link
                    href="/contact"
                    style={{
                      background: ACCENT,
                      color: "white",
                      padding: "14px 28px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: "none",
                      display: "inline-block",
                      textAlign: "center",
                      minHeight: 48,
                      lineHeight: "20px",
                      boxSizing: "border-box",
                    }}
                  >
                    Gratis adviesgesprek
                  </Link>
                  <Link
                    href="/projecten"
                    style={{
                      background: "transparent",
                      color: "rgba(255,255,255,0.55)",
                      padding: "14px 20px",
                      fontSize: 14,
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                      minHeight: 48,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    Bekijk onze projecten
                  </Link>
                </div>

                <p style={{ marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5, marginBottom: 0 }}>
                  {city.trustLine}
                </p>
              </div>

              <div className="cityld-hero-photo" style={{ minWidth: 0 }}>
                <img
                  src={city.image}
                  alt={`Webdesign ${city.naam} - Tinsights`}
                  style={{
                    width: "100%",
                    height: 480,
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 20,
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — LOCAL AUTHORITY */}
        <section
          style={{
            background: BG2,
            padding: "48px 20px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .cityld-s2 { padding: 72px 24px !important; }
            }
          `}</style>
          <div className="cityld-s2" style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}>
            <span
              style={{
                color: ACCENT,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: 20,
                display: "block",
                textAlign: "center",
              }}
            >
              WAAROM {city.localOndernemersLabel} ONDERNEMERS KIEZEN VOOR TINSIGHTS
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 700,
                color: "white",
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: 32,
                marginTop: 0,
              }}
            >
              {localH2Lines.map((line, idx) => (
                <Fragment key={idx}>
                  {idx > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.8,
                textAlign: "center",
                marginBottom: 20,
                maxWidth: 680,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {city.localP1}
            </p>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.8,
                textAlign: "center",
                marginBottom: 40,
                maxWidth: 680,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {city.localP2}
            </p>

            <div className="cityld-stats-row">
              {(
                [
                  { num: "50+", lab: "Projecten" },
                  { num: "4.9★", lab: "Reviews" },
                  { num: "2 wkn", lab: "Bouwtijd" },
                  { num: "100%", lab: "Vaste prijs" },
                ] as const
              ).map((s) => (
                <div key={s.lab} style={{ textAlign: "center", maxWidth: 160, minWidth: 0 }}>
                  <div
                    style={{
                      height: 2,
                      width: 32,
                      background: ACCENT,
                      marginBottom: 12,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <span style={{ fontSize: "2.4rem", fontWeight: 800, color: "white", display: "block", textAlign: "center", lineHeight: 1.1 }}>
                    {s.num}
                  </span>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      textAlign: "center",
                      marginTop: 6,
                      lineHeight: 1.35,
                    }}
                  >
                    {s.lab}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — SERVICES */}
        <section
          style={{
            background: BG1,
            padding: "48px 20px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .cityld-s3 { padding: 72px 24px !important; }
            }
          `}</style>
          <div className="cityld-s3" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
            <p
              style={{
                color: ACCENT,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 12,
                marginTop: 0,
              }}
            >
              WAT WIJ VOOR U BOUWEN
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "white",
                margin: 0,
                lineHeight: 1.2,
                textAlign: "left",
                maxWidth: 720,
              }}
            >
              Van website tot webshop — alles voor {city.servicesAdjective} ondernemers
            </h2>
            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "28px 0" }} />

            <div className="cityld-services-grid">
              {services.map((sv) => (
                <div
                  key={sv.n}
                  style={{
                    paddingTop: 24,
                    paddingBottom: 24,
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    boxSizing: "border-box",
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT, marginBottom: 12, letterSpacing: 2, marginTop: 0 }}>
                    {sv.n}
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 10, marginTop: 0 }}>{sv.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 1.7, margin: 0 }}>{sv.desc}</p>
                  <Link
                    href={sv.href}
                    style={{
                      color: ACCENT,
                      fontSize: 13,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 12,
                      minHeight: 44,
                    }}
                  >
                    Meer informatie →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — LOCAL SEO */}
        <section
          style={{
            background: BG2,
            padding: "40px 20px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .cityld-s4 { padding: 64px 24px !important; }
            }
          `}</style>
          <div className="cityld-s4" style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "white",
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              {city.seoH2}
            </h2>
            <p style={{ ...pStyle }}>{city.seoP1}</p>
            <p style={{ ...pStyle }}>{city.seoP2}</p>
            <p style={{ ...pStyle, marginBottom: 28 }}>{city.seoP3}</p>

            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 14,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginTop: 0,
              }}
            >
              Branches die wij bedienen in {city.naam}:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {BRANCH_PILLS.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 100,
                    padding: "10px 16px",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 48,
                    boxSizing: "border-box",
                  }}
                >
                  {b.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — PROCESS */}
        <section
          id="werkwijze"
          style={{
            background: BG1,
            padding: "48px 20px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .cityld-s5 { padding: 72px 24px !important; }
            }
          `}</style>
          <div className="cityld-s5" style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
            <p
              style={{
                color: ACCENT,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: 12,
                marginTop: 0,
              }}
            >
              WERKWIJZE
            </p>
            <h2
              style={{
                fontSize: "clamp(1.65rem, 2.8vw, 2.15rem)",
                fontWeight: 700,
                color: "white",
                textAlign: "center",
                marginBottom: 40,
                marginTop: 0,
                lineHeight: 1.2,
              }}
            >
              Van eerste gesprek tot live website
            </h2>

            {/* Desktop timeline */}
            <div className="cityld-process-desktop">
              {PROCESS_STEPS.map((st, idx) => (
                <Fragment key={st.n}>
                  <div style={{ flex: "1 1 22%", minWidth: 0, maxWidth: "25%" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: ACCENT,
                        letterSpacing: "3px",
                        marginBottom: 16,
                        display: "block",
                      }}
                    >
                      {st.n}
                    </span>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 8 }}>{st.title}</div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{st.text}</p>
                  </div>
                  {idx < PROCESS_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      style={{
                        color: "rgba(255,255,255,0.15)",
                        fontSize: 20,
                        alignSelf: "flex-start",
                        marginTop: 8,
                        paddingTop: 16,
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                  ) : null}
                </Fragment>
              ))}
            </div>

            {/* Mobile vertical */}
            <div
              className="cityld-process-mobile"
              style={{
                borderLeft: `2px solid rgba(99,102,241,0.3)`,
                paddingLeft: 20,
                marginLeft: 14,
              }}
            >
              {PROCESS_STEPS.map((st) => (
                <div key={st.n} style={{ marginBottom: 28 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: ACCENT,
                      letterSpacing: "3px",
                      marginBottom: 16,
                      display: "block",
                    }}
                  >
                    {st.n}
                  </span>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 8 }}>{st.title}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{st.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — FAQ + CTA */}
        <section
          style={{
            background: BG2,
            padding: "48px 20px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .cityld-s6 { padding: 72px 24px !important; }
            }
          `}</style>
          <div className="cityld-s6" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
            <div className="cityld-faq-grid">
              <div style={{ minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: 32,
                    marginTop: 0,
                    lineHeight: 1.25,
                  }}
                >
                  Veelgestelde vragen over webdesign in {city.naam}
                </h2>
                {faqItems.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={item.q} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        style={{
                          width: "100%",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#fff",
                          padding: "14px 0",
                          minHeight: 52,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 16,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "inherit",
                        }}
                        aria-expanded={open}
                      >
                        <span style={{ flex: 1, minWidth: 0 }}>{item.q}</span>
                        <span
                          aria-hidden
                          style={{
                            display: "inline-block",
                            transition: "transform 0.2s ease",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            color: "rgba(255,255,255,0.45)",
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          ▼
                        </span>
                      </button>
                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight: open ? 800 : 0,
                          transition: "max-height 0.28s ease",
                        }}
                      >
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cityld-cta-sticky">
                <div
                  style={{
                    background: "rgba(99,102,241,0.07)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 16,
                    padding: 32,
                    boxSizing: "border-box",
                  }}
                >
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", margin: 0 }}>Direct contact</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, margin: "10px 0 28px" }}>
                    Wij reageren altijd binnen 24 uur. Gratis en vrijblijvend.
                  </p>
                  <a
                    href="https://wa.me/31619181483"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#22c55e",
                      color: "white",
                      padding: "13px 20px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "block",
                      textAlign: "center",
                      marginBottom: 10,
                      minHeight: 48,
                      lineHeight: "22px",
                      boxSizing: "border-box",
                    }}
                  >
                    WhatsApp ons
                  </a>
                  <a
                    href="mailto:info@tinsights.nl"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "white",
                      padding: "13px 20px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "block",
                      textAlign: "center",
                      marginBottom: 10,
                      minHeight: 48,
                      lineHeight: "22px",
                      boxSizing: "border-box",
                    }}
                  >
                    E-mail sturen
                  </a>
                  <a
                    href="tel:0853696652"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "white",
                      padding: "13px 20px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "block",
                      textAlign: "center",
                      marginBottom: 0,
                      minHeight: 48,
                      lineHeight: "22px",
                      boxSizing: "border-box",
                    }}
                  >
                    085 - 369 6652
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — BOTTOM CTA */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
            borderTop: SECTION_BORDER,
            padding: "48px 20px",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            @media (min-width: 900px) {
              .cityld-s7 { padding: 72px 24px !important; }
            }
          `}</style>
          <div className="cityld-s7" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
            <div className="cityld-bottom-grid">
              <div style={{ minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {ctaH2Lines.map((line, idx) => (
                    <Fragment key={idx}>
                      {idx > 0 ? <br /> : null}
                      {line}
                    </Fragment>
                  ))}
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 16, marginBottom: 0, lineHeight: 1.65 }}>
                  Vertel ons over uw bedrijf in {city.naam}. Wij reageren binnen 24 uur met een concreet voorstel.
                </p>
              </div>
              <div className="cityld-bottom-btns">
                <Link
                  href="/contact"
                  style={{
                    background: ACCENT,
                    color: "white",
                    padding: "14px 28px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 48,
                    boxSizing: "border-box",
                    textAlign: "center",
                  }}
                >
                  Gratis adviesgesprek
                </Link>
                <a
                  href="tel:0853696652"
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.92)",
                    padding: "14px 28px",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.35)",
                    minHeight: 48,
                    boxSizing: "border-box",
                  }}
                >
                  Bel direct: 085 369 6652
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

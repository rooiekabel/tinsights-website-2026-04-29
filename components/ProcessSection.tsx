"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapClient";

const steps = [
  {
    n: "01",
    icon: "bi-people",
    title: "Kennismaken",
    text: "Doel, doelgroep en planning — kort en concreet.",
    time: "~1–2 dagen",
  },
  {
    n: "02",
    icon: "bi-palette",
    title: "Vormgeving & techniek",
    text: "UI, snelheid en structuur: alles in lijn met je merk.",
    time: "~3–5 dagen",
  },
  {
    n: "03",
    icon: "bi-code-slash",
    title: "Bouwen",
    text: "Iteraties, testen, SEO-basis en koppelingen klaarzetten.",
    time: "~2–4 weken",
  },
  {
    n: "04",
    icon: "bi-rocket-takeoff",
    title: "Livegang & ondersteuning",
    text: "Lancering, hosting en domein, plus doorlopend onderhoud.",
    time: "Doorlopend",
  },
] as const;

export default function ProcessSection() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const items = root.current.querySelectorAll("[data-step]");
      if (!items.length) return;
      gsap.fromTo(
        items,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        }
      );
    },
    { scope: root, dependencies: [] }
  );

  return (
    <section
      ref={root}
      style={{ background: "#0f172a", width: "100%" }}
      className="scroll-mt-20"
    >
      <style>{`
        .proc-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          padding: 28px 24px 24px;
          position: relative;
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }
        .proc-card:hover {
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 4px 24px rgba(99,102,241,0.2);
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        {/* Label */}
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px" }}>
          Aanpak
        </p>

        {/* Headline */}
        <h2
          style={{ fontWeight: 700, lineHeight: 1.2, color: "#f1f5f9", margin: "0 0 0", maxWidth: "36rem" }}
          className="text-3xl sm:text-4xl"
        >
          Van plan tot live site, in zichtbare stappen
        </h2>

        {/* Card grid */}
        <div style={{ marginTop: 48 }}>

          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((s) => (
              <li key={s.n} data-step className="proc-card">

                {/* Step number badge */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#6366f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    flexShrink: 0,
                  }}
                  aria-label={`Stap ${s.n}`}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: "white", lineHeight: 1 }}>
                    {s.n}
                  </span>
                </div>

                {/* Icon */}
                <i
                  className={`bi ${s.icon}`}
                  style={{ fontSize: 28, color: "#a5b4fc", display: "block", marginBottom: 14 }}
                  aria-hidden
                />

                {/* Title */}
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px", lineHeight: 1.25 }}>
                  {s.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#94a3b8", margin: "0 0 16px", flex: 1 }}>
                  {s.text}
                </p>

                {/* Time estimate */}
                <span style={{ fontSize: 12, fontWeight: 600, color: "#818cf8", letterSpacing: "0.03em" }}>
                  {s.time}
                </span>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

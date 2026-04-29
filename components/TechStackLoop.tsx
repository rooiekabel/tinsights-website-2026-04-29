"use client";

import Image from "next/image";

type Item = { id: string; label: string; src: string };

const items: Item[] = [
  { id: "nextjs", label: "Next.js", src: "/assets/logos/nextjs.svg" },
  { id: "react", label: "React", src: "/assets/logos/react.svg" },
  { id: "typescript", label: "TypeScript", src: "/assets/logos/typescript.svg" },
  { id: "tailwindcss", label: "Tailwind CSS", src: "/assets/logos/tailwindcss.svg" },
  { id: "nodejs", label: "Node.js", src: "/assets/logos/nodejs.svg" },
  { id: "vercel", label: "Vercel", src: "/assets/logos/vercel.svg" },
  { id: "stripe", label: "Stripe", src: "/assets/logos/stripe.svg" },
  { id: "postgresql", label: "PostgreSQL", src: "/assets/logos/postgresql.svg" },
  { id: "docker", label: "Docker", src: "/assets/logos/docker.svg" },
  { id: "github", label: "GitHub", src: "/assets/logos/github.svg" },
  { id: "google", label: "Google", src: "/assets/logos/google.svg" },
  { id: "meta", label: "Meta", src: "/assets/logos/meta.svg" },
  { id: "cloudflare", label: "Cloudflare", src: "/assets/logos/cloudflare.svg" },
];

function Pill({ item, instanceId }: { item: Item; instanceId: string }) {
  const capId = `tsl-cap-${instanceId}`;
  return (
    <figure
      className="tsl-pill font-display"
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 118,
        minHeight: 108,
        padding: "14px 12px 14px",
        margin: 0,
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        cursor: "default",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.05)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 10px 28px rgba(15, 23, 42, 0.12)";
        el.style.borderColor = "#cbd5e1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.05)";
        el.style.borderColor = "#e2e8f0";
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 36,
          flexShrink: 0,
        }}
      >
        <Image
          src={item.src}
          alt=""
          fill
          sizes="120px"
          className="object-contain"
          unoptimized
          aria-hidden
        />
      </div>
      <figcaption
        id={capId}
        style={{
          marginTop: 10,
          width: "100%",
          minHeight: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.25,
          color: "#334155",
        }}
      >
        {item.label}
      </figcaption>
    </figure>
  );
}

function Track({ trackKey }: { trackKey: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 14,
        flexShrink: 0,
        paddingRight: 14,
      }}
    >
      {items.map((item) => (
        <Pill key={`${trackKey}-${item.id}`} item={item} instanceId={`${trackKey}-${item.id}`} />
      ))}
    </div>
  );
}

export default function TechStackLoop() {
  return (
    <section
      style={{
        background: "white",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
        padding: "32px 0 36px",
        overflow: "hidden",
      }}
      aria-label="Technologie en vertrouwde platformen"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 24px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            fontWeight: 500,
            color: "#94a3b8",
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          We bouwen op tools en platformen die bedrijven al vertrouwen
        </p>
      </div>

      <div className="tsl-marquee-outer" style={{ position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 56,
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0))",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 56,
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to left, #ffffff, rgba(255,255,255,0))",
          }}
        />

        <div
          className="tsl-marquee-track"
          style={{
            display: "flex",
            width: "max-content",
            alignItems: "stretch",
            minHeight: 108,
            animation: "tsl-scroll 48s linear infinite",
            willChange: "transform",
          }}
        >
          <Track trackKey="a" />
          <Track trackKey="b" />
        </div>

        <div
          className="tsl-static-logos"
          style={{
            display: "none",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 14,
            padding: "6px 24px 12px",
            rowGap: 14,
          }}
        >
          {items.map((item) => (
            <Pill key={item.id} item={item} instanceId={`static-${item.id}`} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tsl-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tsl-marquee-track {
            animation-play-state: paused !important;
            display: none !important;
          }
          .tsl-static-logos {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}

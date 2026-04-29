import Link from "next/link";

export default function DienstenCTA() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
        width: "100%",
      }}
    >
      <div
        className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: 72,
          paddingBottom: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Klaar om te starten?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.82)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            We reageren binnen één werkdag.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#ffffff",
              color: "#4f46e5",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              transition: "transform 200ms ease, box-shadow 200ms ease",
            }}
          >
            <i className="bi bi-send" aria-hidden />
            Gratis voorstel aanvragen
          </Link>

          <Link
            href="tel:0853696652"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.55)",
              whiteSpace: "nowrap",
              transition: "border-color 200ms ease, background 200ms ease",
            }}
          >
            <i className="bi bi-telephone" aria-hidden />
            Bel direct: 085-369 6652
          </Link>
        </div>
      </div>
    </section>
  );
}

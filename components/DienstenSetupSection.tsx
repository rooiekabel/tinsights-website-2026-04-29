import Image from "next/image";
import Link from "next/link";

export default function DienstenSetupSection() {
  return (
    <section
      style={{ background: "#f8fafc" }}
      className="w-full"
    >
      <div
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: 96, paddingBottom: 96 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 56,
            alignItems: "center",
          }}
          className="lg:grid-cols-2-setup"
        >
          {/* Left: image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 24px 56px rgba(15,23,42,0.12)",
            }}
            className="setup-img-col"
          >
            <Image
              src="/assets/SETUP.jpg"
              alt="Tinsights werkplek — drie schermen, code en live sites"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>

          {/* Right: text */}
          <div className="setup-text-col">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6366f1",
                margin: "0 0 16px",
              }}
            >
              Onze werkwijze
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.2,
                margin: "0 0 20px",
              }}
            >
              Gebouwd vanuit één werkplek — geen tussenpartijen
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "#475569",
                margin: "0 0 32px",
              }}
            >
              Alles wat wij opleveren, bouwen wij zelf. Geen freelancers die
              doorsturen, geen offshore-teams, geen wachttijden. Jij hebt één
              contactpersoon die ook echt degene is die bouwt.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {[
                "Direct contact met de developer — altijd",
                "Snelle doorlooptijd: van briefing naar live in 1–4 weken",
                "Transparante communicatie en eerlijke prijsafspraken",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    fontSize: 15,
                    color: "#1e293b",
                    lineHeight: 1.55,
                  }}
                >
                  <i
                    className="bi bi-check-circle-fill"
                    style={{ color: "#6366f1", fontSize: 18, flexShrink: 0, marginTop: 1 }}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/over-ons"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#6366f1",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Bekijk onze werkwijze <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2-setup {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

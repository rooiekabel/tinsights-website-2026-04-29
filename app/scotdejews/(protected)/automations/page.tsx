export default function AutomationsPage() {
  const cards = [
    {
      title: "Inbox Follow-up",
      status: "Concept",
      text: "Automatisch opvolgen van nieuwe contactberichten na X uur zonder reactie.",
    },
    {
      title: "Dagelijkse Digest",
      status: "Concept",
      text: "Elke ochtend een samenvatting met nieuwe leads, ongelezen berichten en prioriteit.",
    },
    {
      title: "Deploy Checklist",
      status: "Actief",
      text: "Standaard checklist voor release: build, restart, smoke test en live health-check.",
    },
    {
      title: "Security Routine",
      status: "Concept",
      text: "Periodieke update-checks en notificatie wanneer kritieke updates beschikbaar zijn.",
    },
  ];

  return (
    <div className="auto-page">
      <header className="auto-head">
        <h1 className="auto-title">Automations</h1>
        <p className="auto-lead">
          Centrale plek voor workflows en routine-taken. Hier haken we later acties, webhooks en cron-jobs aan.
        </p>
      </header>

      <section className="auto-grid" aria-label="Automation modules">
        {cards.map((card) => (
          <article key={card.title} className="auto-card">
            <div className="auto-card-top">
              <h2>{card.title}</h2>
              <span data-status={card.status === "Actief" ? "active" : "draft"}>{card.status}</span>
            </div>
            <p>{card.text}</p>
            <button type="button" className="auto-btn">
              Configureren
            </button>
          </article>
        ))}
      </section>

      <style>{`
        .auto-page { --t:#0f172a; --m:#64748b; --b:#e2e8f0; --card:#fff; }
        .auto-head { margin-bottom: 18px; }
        .auto-title { margin:0 0 6px; font-size:1.35rem; font-weight:800; letter-spacing:-0.03em; color:var(--t); }
        .auto-lead { margin:0; font-size:.875rem; line-height:1.55; color:var(--m); max-width:44rem; }
        .auto-grid {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:14px;
        }
        .auto-card {
          background:var(--card);
          border:1px solid var(--b);
          border-radius:14px;
          padding:16px;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .auto-card-top {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
        }
        .auto-card h2 { margin:0; font-size:.95rem; font-weight:700; color:var(--t); }
        .auto-card p { margin:0; font-size:.8125rem; line-height:1.55; color:var(--m); }
        .auto-card span {
          font-size:.625rem;
          font-weight:800;
          text-transform:uppercase;
          letter-spacing:.08em;
          border-radius:999px;
          padding:4px 8px;
          background:#f8fafc;
          color:#64748b;
          border:1px solid #e2e8f0;
          flex-shrink:0;
        }
        .auto-card span[data-status="active"] {
          background:rgba(5,150,105,.1);
          color:#047857;
          border-color:rgba(5,150,105,.25);
        }
        .auto-btn {
          margin-top:auto;
          border:1px solid var(--b);
          background:#f8fafc;
          color:#334155;
          border-radius:10px;
          padding:10px 12px;
          font-size:.8125rem;
          font-weight:600;
          cursor:pointer;
          font-family:inherit;
        }
        .auto-btn:hover { border-color:#cbd5e1; background:#fff; }
        @media (max-width: 900px) {
          .auto-grid { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  );
}

export default function SettingsPage() {
  const sections = [
    {
      title: "Authenticatie",
      items: ["Admin gebruikersnaam via environment", "Admin wachtwoord via environment", "Session-cookie (httpOnly, sameSite=lax)"],
    },
    {
      title: "E-mail & Leads",
      items: ["Resend API key", "From-reply adres", "Template placeholders"],
    },
    {
      title: "Beheer & Operaties",
      items: ["PM2 procesnaam: tinsights", "Deploy script", "Back-up / restore workflow"],
    },
  ];

  return (
    <div className="set-page">
      <header className="set-head">
        <h1 className="set-title">Instellingen</h1>
        <p className="set-lead">
          Basis-overzicht voor beheerinstellingen. We kunnen hier later echte formulieren, opslag en permissies aan koppelen.
        </p>
      </header>

      <div className="set-grid">
        {sections.map((section) => (
          <section key={section.title} className="set-card">
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="set-note" role="note">
        Tip: zet gevoelige waardes alleen in `.env.local` of server-secrets, nooit in code of chatlogs.
      </div>

      <style>{`
        .set-page { --t:#0f172a; --m:#64748b; --b:#e2e8f0; }
        .set-head { margin-bottom:18px; }
        .set-title { margin:0 0 6px; font-size:1.35rem; font-weight:800; letter-spacing:-0.03em; color:var(--t); }
        .set-lead { margin:0; font-size:.875rem; color:var(--m); line-height:1.55; max-width:44rem; }
        .set-grid {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:14px;
        }
        .set-card {
          background:#fff;
          border:1px solid var(--b);
          border-radius:14px;
          padding:16px;
        }
        .set-card h2 { margin:0 0 10px; font-size:.875rem; font-weight:800; color:var(--t); letter-spacing:0; }
        .set-card ul { margin:0; padding-left:18px; display:flex; flex-direction:column; gap:7px; }
        .set-card li { font-size:.8125rem; color:#475569; line-height:1.45; }
        .set-note {
          margin-top:14px;
          border:1px solid #fde68a;
          background:#fffbeb;
          color:#92400e;
          border-radius:12px;
          padding:12px 14px;
          font-size:.8125rem;
          line-height:1.45;
        }
        @media (max-width: 1000px) {
          .set-grid { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  );
}

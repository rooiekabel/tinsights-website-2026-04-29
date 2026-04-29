import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import type { ContactEntry } from "@/lib/types/contact";

async function getContacts(): Promise<ContactEntry[]> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", "contacts.json"),
      "utf-8"
    );
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const contacts = await getContacts();
  const today = new Date();
  const todayStr = today.toLocaleDateString("nl-NL");

  const totalContacts = contacts.length;
  const ongelezen = contacts.filter((c) => !c.gelezen).length;
  const vandaag = contacts.filter((c) => {
    const d = new Date(c.timestamp);
    return d.toLocaleDateString("nl-NL") === todayStr;
  }).length;

  const recentContacts = contacts.slice(0, 6);

  const stats = [
    { label: "Berichten", value: totalContacts, hint: "totaal", accent: "#6366f1" },
    { label: "Ongelezen", value: ongelezen, hint: "inbox", accent: "#d97706" },
    { label: "Vandaag", value: vandaag, hint: "nieuw", accent: "#059669" },
  ];

  const quick = [
    {
      href: "/scotdejews/contacts",
      title: "Contacten",
      text: "Inbox en antwoorden",
      icon: "inbox",
    },
    {
      href: "/scotdejews/mailer",
      title: "Mailer",
      text: "Templates versturen",
      icon: "send",
    },
    {
      href: "/contact",
      title: "Live pagina",
      text: "Publiek contactformulier",
      icon: "globe",
      external: true,
    },
  ] as const;

  return (
    <div className="dash">
      <header className="dash-head">
        <div>
          <h1 className="dash-title">Overzicht</h1>
          <p className="dash-lead">
            Welkom terug — hier zie je het korte overzicht van je inbox en snelkoppelingen.
          </p>
        </div>
      </header>

      <section className="dash-stats" aria-label="Statistieken">
        {stats.map((s) => (
          <div key={s.label} className="dash-stat" style={{ "--stat-accent": s.accent } as React.CSSProperties}>
            <span className="dash-stat-value">{s.value}</span>
            <span className="dash-stat-label">{s.label}</span>
            <span className="dash-stat-hint">{s.hint}</span>
          </div>
        ))}
      </section>

      <div className="dash-grid">
        <section className="dash-panel">
          <h2 className="dash-panel-title">Snel naar</h2>
          <ul className="dash-quick">
            {quick.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={"external" in item && item.external ? "_blank" : undefined}
                  className="dash-quick-link"
                >
                  <span className={`dash-quick-ico dash-quick-ico--${item.icon}`} aria-hidden />
                  <span className="dash-quick-body">
                    <span className="dash-quick-title">{item.title}</span>
                    <span className="dash-quick-text">{item.text}</span>
                  </span>
                  <span className="dash-quick-arrow" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="dash-panel dash-panel--wide">
          <div className="dash-panel-head">
            <h2 className="dash-panel-title">Recent</h2>
            <Link href="/scotdejews/contacts" className="dash-panel-link">
              Alles
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="dash-empty">Nog geen berichten via het formulier.</p>
          ) : (
            <ul className="dash-list">
              {recentContacts.map((contact) => (
                <li key={contact.id} className="dash-row">
                  <span className="dash-avatar" aria-hidden>
                    {contact.naam.charAt(0).toUpperCase()}
                  </span>
                  <div className="dash-row-main">
                    <div className="dash-row-top">
                      <span className="dash-name">{contact.naam}</span>
                      {!contact.gelezen && <span className="dash-new">Nieuw</span>}
                    </div>
                    <p className="dash-preview">{contact.bericht}</p>
                  </div>
                  <time className="dash-time">{contact.submittedAt}</time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <style>{`
        .dash { --t: #0f172a; --m: #64748b; --b: #e2e8f0; --card: #fff; }
        .dash-head { margin-bottom: 20px; }
        .dash-title { font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; color: var(--t); margin: 0 0 6px; }
        .dash-lead { font-size: 0.875rem; color: var(--m); margin: 0; line-height: 1.5; max-width: 42rem; }
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }
        @media (max-width: 640px) {
          .dash-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        }
        .dash-stat {
          background: var(--card);
          border: 1px solid var(--b);
          border-radius: 12px;
          padding: 14px 16px;
          position: relative;
          overflow: hidden;
        }
        .dash-stat::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--stat-accent, #6366f1);
          border-radius: 12px 0 0 12px;
        }
        .dash-stat-value {
          display: block;
          font-size: 1.375rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--t);
          line-height: 1.1;
        }
        .dash-stat-label { font-size: 0.8125rem; font-weight: 600; color: var(--t); margin-top: 4px; display: block; }
        .dash-stat-hint { font-size: 0.6875rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; display: block; }
        .dash-grid {
          display: grid;
          grid-template-columns: minmax(240px, 320px) 1fr;
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .dash-grid { grid-template-columns: 1fr; }
        }
        .dash-panel {
          background: var(--card);
          border: 1px solid var(--b);
          border-radius: 14px;
          padding: 18px 18px 8px;
        }
        .dash-panel--wide { padding-bottom: 4px; }
        .dash-panel-title { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--m); margin: 0 0 12px; }
        .dash-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding: 0 2px; }
        .dash-panel-head .dash-panel-title { margin: 0; }
        .dash-panel-link { font-size: 0.8125rem; font-weight: 600; color: #6366f1; text-decoration: none; }
        .dash-panel-link:hover { text-decoration: underline; }
        .dash-quick { list-style: none; margin: 0; padding: 0; }
        .dash-quick li { margin-bottom: 8px; }
        .dash-quick-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          border: 1px solid transparent;
          transition: background 0.15s, border-color 0.15s;
        }
        .dash-quick-link:hover { background: #f8fafc; border-color: var(--b); }
        .dash-quick-ico {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: #f1f5f9;
          flex-shrink: 0;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 18px;
        }
        .dash-quick-ico--inbox {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1' stroke-width='1.75'%3E%3Cpath d='M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z'/%3E%3Cpath d='m22 6-10 7L2 6'/%3E%3C/svg%3E");
        }
        .dash-quick-ico--send {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23059669' stroke-width='1.75'%3E%3Cpath d='M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z'/%3E%3C/svg%3E");
        }
        .dash-quick-ico--globe {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706' stroke-width='1.75'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E");
        }
        .dash-quick-body { flex: 1; min-width: 0; }
        .dash-quick-title { display: block; font-size: 0.9375rem; font-weight: 700; color: var(--t); }
        .dash-quick-text { display: block; font-size: 0.75rem; color: var(--m); margin-top: 2px; }
        .dash-quick-arrow { color: #cbd5e1; font-weight: 600; font-size: 0.875rem; }
        .dash-empty { font-size: 0.875rem; color: var(--m); padding: 20px 8px 24px; margin: 0; text-align: center; }
        .dash-list { list-style: none; margin: 0; padding: 0; }
        .dash-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 10px;
          border-top: 1px solid #f1f5f9;
        }
        .dash-row:first-of-type { border-top: none; }
        .dash-avatar {
          width: 34px; height: 34px;
          border-radius: 999px;
          background: rgba(99,102,241,0.12);
          color: #6366f1;
          font-size: 0.8125rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dash-row-main { flex: 1; min-width: 0; }
        .dash-row-top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .dash-name { font-size: 0.875rem; font-weight: 600; color: var(--t); }
        .dash-new {
          font-size: 0.625rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: #6366f1;
          color: #fff;
          padding: 2px 6px;
          border-radius: 999px;
        }
        .dash-preview {
          font-size: 0.8125rem;
          color: var(--m);
          margin: 4px 0 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dash-time {
          font-size: 0.6875rem;
          color: #94a3b8;
          flex-shrink: 0;
          white-space: nowrap;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}

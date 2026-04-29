"use client";

import { useState } from "react";
import { mailerTemplates } from "@/lib/emailTemplates";

export default function MailerPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(mailerTemplates[0].id);
  const [to, setTo] = useState("");
  const [vars, setVars] = useState<Record<string, string>>({});
  const [customSubject, setCustomSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const template = mailerTemplates.find((t) => t.id === selectedTemplateId)!;

  function handleTemplateChange(id: string) {
    setSelectedTemplateId(id);
    setVars({});
    setCustomSubject("");
    setResult(null);
  }

  function fillVar(key: string, value: string) {
    setVars((prev) => ({ ...prev, [key]: value }));
  }

  function getSubject(): string {
    let sub = customSubject || template.subject;
    Object.entries(vars).forEach(([k, v]) => {
      sub = sub.replace(`{{${k}}}`, v);
    });
    return sub;
  }

  function getHtml(): string {
    const filledVars: Record<string, string> = {};
    template.vars.forEach((v) => {
      filledVars[v] = vars[v] || "";
    });
    return template.html(filledVars);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!to.trim()) return;
    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/mailer/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: to.trim(),
          subject: getSubject(),
          html: getHtml(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ type: "success", message: `Verstuurd naar ${to.trim()}` });
        setTo("");
        setVars({});
        setCustomSubject("");
      } else {
        setResult({ type: "error", message: data.error || "Versturen mislukt." });
      }
    } catch {
      setResult({ type: "error", message: "Netwerkfout. Probeer opnieuw." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mailer">
      <header className="mailer-head">
        <h1 className="mailer-title">Mailer</h1>
        <p className="mailer-lead">
          Kies een template, vul het e-mailadres en de velden in. Live preview zie je rechts (op desktop) of hieronder.
        </p>
      </header>

      <div className="mailer-layout">
        <section className="mailer-templates" aria-label="Templates">
          <h2 className="mailer-section-label">1. Template</h2>
          <div className="mailer-template-list">
            {mailerTemplates.map((t) => {
              const active = t.id === selectedTemplateId;
              return (
                <button
                  key={t.id}
                  type="button"
                  className="mailer-template-btn"
                  data-active={active}
                  onClick={() => handleTemplateChange(t.id)}
                >
                  <span className="mailer-template-name">{t.label}</span>
                  <span className="mailer-template-desc">{t.description}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mailer-main">
          <form className="mailer-form" onSubmit={handleSend}>
            <h2 className="mailer-section-label">2. Verzenden</h2>

            <div className="mailer-card">
              <label className="mailer-label" htmlFor="mailer-to">
                Ontvanger
              </label>
              <input
                id="mailer-to"
                className="mailer-input"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                placeholder="naam@voorbeeld.nl"
                autoComplete="email"
              />

              <label className="mailer-label" htmlFor="mailer-subj">
                Onderwerp
              </label>
              <input
                id="mailer-subj"
                className="mailer-input"
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder={template.subject}
              />
              <p className="mailer-hint">Leeg laten = standaard: {template.subject}</p>
            </div>

            {template.vars.length > 0 && (
              <div className="mailer-card">
                <h3 className="mailer-card-title">Inhoud</h3>
                <div className="mailer-fields">
                  {template.vars.map((v) => (
                    <div key={v} className="mailer-field">
                      <label className="mailer-label" htmlFor={`var-${v}`}>
                        {v}
                      </label>
                      {v === "inhoud" ? (
                        <textarea
                          id={`var-${v}`}
                          className="mailer-textarea"
                          value={vars[v] || ""}
                          onChange={(e) => fillVar(v, e.target.value)}
                          rows={5}
                          placeholder={`Tekst voor “${v}”`}
                        />
                      ) : (
                        <input
                          id={`var-${v}`}
                          className="mailer-input"
                          type="text"
                          value={vars[v] || ""}
                          onChange={(e) => fillVar(v, e.target.value)}
                          placeholder={`Bijv. …`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className={`mailer-toast mailer-toast--${result.type}`} role="status">
                {result.message}
              </div>
            )}

            <div className="mailer-actions">
              <button type="submit" className="mailer-submit" disabled={sending}>
                {sending ? "Bezig…" : "Verstuur via Resend"}
              </button>
              <button
                type="button"
                className="mailer-secondary"
                onClick={() => setShowPreview((p) => !p)}
              >
                {showPreview ? "Preview verbergen" : "Preview tonen"}
              </button>
            </div>
          </form>

          {showPreview && (
            <section className="mailer-preview-wrap" aria-label="Voorbeeld">
              <h2 className="mailer-section-label">3. Preview</h2>
              <p className="mailer-preview-subj">
                <strong>Onderwerp:</strong> {getSubject()}
              </p>
              <div className="mailer-preview-frame">
                <iframe title="E-mail preview" srcDoc={getHtml()} sandbox="allow-same-origin" className="mailer-iframe" />
              </div>
            </section>
          )}
        </div>
      </div>

      <style>{`
        .mailer { --t: #0f172a; --m: #64748b; --b: #e2e8f0; --card: #fff; --accent: #6366f1; }
        .mailer-head { margin-bottom: 20px; }
        .mailer-title { font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 6px; color: var(--t); }
        .mailer-lead { font-size: 0.875rem; color: var(--m); margin: 0; line-height: 1.55; max-width: 40rem; }
        .mailer-section-label {
          font-size: 0.6875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          margin: 0 0 10px;
        }
        .mailer-layout {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .mailer-layout { grid-template-columns: 1fr; }
        }
        .mailer-templates {
          position: sticky;
          top: 72px;
        }
        @media (max-width: 960px) {
          .mailer-templates { position: static; }
          .mailer-template-list {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }
          .mailer-template-btn {
            flex: 0 0 auto;
            min-width: 200px;
          }
        }
        .mailer-template-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (max-width: 960px) {
          .mailer-template-list { flex-direction: row; }
        }
        .mailer-template-btn {
          text-align: left;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid var(--b);
          background: var(--card);
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .mailer-template-btn:hover {
          border-color: #cbd5e1;
        }
        .mailer-template-btn[data-active="true"] {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
          background: rgba(99, 102, 241, 0.04);
        }
        .mailer-template-name {
          display: block;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--t);
        }
        .mailer-template-desc {
          display: block;
          font-size: 0.75rem;
          color: var(--m);
          margin-top: 4px;
          line-height: 1.35;
        }
        .mailer-main {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }
        .mailer-form { display: flex; flex-direction: column; gap: 14px; }
        .mailer-card {
          background: var(--card);
          border: 1px solid var(--b);
          border-radius: 14px;
          padding: 18px 18px 16px;
        }
        .mailer-card-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--t);
          margin: 0 0 12px;
        }
        .mailer-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--m);
          margin-bottom: 6px;
        }
        .mailer-input, .mailer-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          font-size: 0.875rem;
          border: 1px solid var(--b);
          border-radius: 10px;
          background: #f8fafc;
          color: var(--t);
          font-family: inherit;
          margin-bottom: 12px;
        }
        .mailer-input:last-child, .mailer-textarea:last-child { margin-bottom: 0; }
        .mailer-input:focus, .mailer-textarea:focus {
          outline: none;
          border-color: var(--accent);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .mailer-textarea { resize: vertical; min-height: 120px; margin-bottom: 0; }
        .mailer-hint { font-size: 0.6875rem; color: #94a3b8; margin: -6px 0 0; }
        .mailer-fields { display: flex; flex-direction: column; gap: 4px; }
        .mailer-field { margin-bottom: 4px; }
        .mailer-toast {
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .mailer-toast--success {
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
        .mailer-toast--error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        .mailer-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .mailer-submit {
          padding: 12px 22px;
          border: none;
          border-radius: 10px;
          background: var(--accent);
          color: #fff;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          font-family: inherit;
        }
        .mailer-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .mailer-submit:hover:not(:disabled) { background: #4f46e5; }
        .mailer-secondary {
          padding: 11px 18px;
          border-radius: 10px;
          border: 1px solid var(--b);
          background: var(--card);
          color: var(--m);
          font-weight: 600;
          font-size: 0.8125rem;
          cursor: pointer;
          font-family: inherit;
        }
        .mailer-secondary:hover { border-color: #cbd5e1; color: var(--t); }
        .mailer-preview-subj {
          font-size: 0.8125rem;
          color: var(--m);
          margin: 0 0 10px;
          word-break: break-word;
        }
        .mailer-preview-frame {
          border: 1px solid var(--b);
          border-radius: 14px;
          overflow: hidden;
          background: #eef2f6;
        }
        .mailer-iframe {
          width: 100%;
          height: min(520px, 70vh);
          border: none;
          display: block;
          background: #fff;
        }
      `}</style>
    </div>
  );
}

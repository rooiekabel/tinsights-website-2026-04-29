"use client";

import { useEffect, useState } from "react";

interface ContactEntry {
  id: string;
  naam: string;
  email: string;
  telefoon: string;
  bericht: string;
  submittedAt: string;
  timestamp: number;
  gelezen: boolean;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactEntry | null>(null);
  const [filter, setFilter] = useState<"alle" | "ongelezen">("alle");

  async function fetchContacts() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setContacts(data);
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function markGelezen(id: string) {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, gelezen: true } : c))
    );
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, gelezen: true } : null);
    }
  }

  function openContact(contact: ContactEntry) {
    setSelected(contact);
    if (!contact.gelezen) markGelezen(contact.id);
  }

  const filtered =
    filter === "ongelezen" ? contacts.filter((c) => !c.gelezen) : contacts;

  const ongelezen = contacts.filter((c) => !c.gelezen).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
          Contactberichten
        </h1>
        <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>
          {contacts.length} bericht{contacts.length !== 1 ? "en" : ""} totaal
          {ongelezen > 0 && (
            <span
              style={{
                marginLeft: 8,
                background: "#6366f1",
                color: "white",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 100,
              }}
            >
              {ongelezen} ongelezen
            </span>
          )}
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["alle", "ongelezen"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: "1px solid",
              borderColor: filter === f ? "#6366f1" : "#1e293b",
              background: filter === f ? "rgba(99,102,241,0.1)" : "transparent",
              color: filter === f ? "#6366f1" : "#64748b",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 150ms",
              textTransform: "capitalize",
            }}
          >
            {f === "alle" ? "Alle berichten" : `Ongelezen (${ongelezen})`}
          </button>
        ))}
        <button
          onClick={fetchContacts}
          style={{
            marginLeft: "auto",
            padding: "7px 14px",
            borderRadius: 8,
            border: "1px solid #1e293b",
            background: "transparent",
            color: "#64748b",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 3v5h-5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          </svg>
          Vernieuwen
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 20 }}>
        {/* Lijst */}
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#475569", fontSize: 14 }}>
              Laden...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#334155", fontSize: 14 }}>
              {filter === "ongelezen" ? "Geen ongelezen berichten." : "Nog geen berichten ontvangen."}
            </div>
          ) : (
            filtered.map((contact, i) => (
              <div
                key={contact.id}
                onClick={() => openContact(contact)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "16px 20px",
                  borderBottom: i < filtered.length - 1 ? "1px solid #1e293b" : "none",
                  cursor: "pointer",
                  background: selected?.id === contact.id ? "rgba(99,102,241,0.08)" : "transparent",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  if (selected?.id !== contact.id)
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  if (selected?.id !== contact.id)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: contact.gelezen ? "rgba(51,65,85,0.5)" : "rgba(99,102,241,0.15)",
                    color: contact.gelezen ? "#475569" : "#6366f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {contact.naam.charAt(0).toUpperCase()}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: contact.gelezen ? 500 : 700,
                        color: contact.gelezen ? "#94a3b8" : "#f1f5f9",
                      }}
                    >
                      {contact.naam}
                    </span>
                    {!contact.gelezen && (
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#6366f1",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#475569",
                      margin: "0 0 3px",
                    }}
                  >
                    {contact.email}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#334155",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {contact.bericht}
                  </p>
                </div>

                <span style={{ fontSize: 11, color: "#334155", flexShrink: 0, paddingTop: 2 }}>
                  {contact.submittedAt}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 14,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>
                  {selected.naam}
                </h2>
                <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>{selected.submittedAt}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #1e293b",
                  background: "transparent",
                  color: "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "E-mail", value: selected.email, href: `mailto:${selected.email}` },
                { label: "Telefoon", value: selected.telefoon || "—", href: selected.telefoon ? `tel:${selected.telefoon}` : undefined },
              ].map((row) => (
                <div key={row.label}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#334155", margin: "0 0 4px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {row.label}
                  </p>
                  {row.href && row.value !== "—" ? (
                    <a href={row.href} style={{ fontSize: 14, color: "#6366f1", textDecoration: "none" }}>
                      {row.value}
                    </a>
                  ) : (
                    <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>{row.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#334155", margin: "0 0 10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Bericht
              </p>
              <div
                style={{
                  background: "#060d1a",
                  border: "1px solid #1e293b",
                  borderRadius: 10,
                  padding: "16px 18px",
                  fontSize: 14,
                  color: "#94a3b8",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {selected.bericht}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={`mailto:${selected.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  background: "#6366f1",
                  color: "white",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Reageer per mail
              </a>
              {selected.telefoon && (
                <a
                  href={`https://wa.me/${selected.telefoon.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 18px",
                    background: "rgba(34,197,94,0.1)",
                    color: "#22c55e",
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Inloggen mislukt.");
      } else {
        router.push("/scotdejews/dashboard");
        router.refresh();
      }
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Image
            src="/assets/logoo.png"
            alt="Tinsights"
            width={160}
            height={42}
            style={{ height: 40, width: "auto", filter: "brightness(0) invert(1)", margin: "0 auto" }}
            priority
          />
        </div>

        {/* Card */}
        <div
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 20,
            padding: "40px 36px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#f1f5f9",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Inloggen
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 32px" }}>
            Toegang tot het Tinsights dashboard
          </p>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 10,
                padding: "12px 16px",
                marginBottom: 20,
                fontSize: 14,
                color: "#fca5a5",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i className="bi bi-exclamation-circle" style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: 8,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Gebruikersnaam
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Gebruikersnaam"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "13px 16px",
                  fontSize: 15,
                  color: "#f1f5f9",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 10,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  transition: "border-color 150ms",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#6366f1"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#334155"; }}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: 8,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Wachtwoord
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "13px 48px 13px 16px",
                    fontSize: 15,
                    color: "#f1f5f9",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    transition: "border-color 150ms",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#6366f1"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#334155"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={-1}
                >
                  <i className={`bi bi-eye${showPass ? "-slash" : ""}`} style={{ fontSize: 16 }} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                height: 50,
                background: loading ? "#4338ca" : "#6366f1",
                color: "white",
                border: "none",
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                transition: "background 200ms",
                opacity: loading ? 0.8 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#4f46e5"; }}
              onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#6366f1"; }}
            >
              {loading ? (
                <>
                  <svg
                    style={{ animation: "spin 1s linear infinite", width: 18, height: 18 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Inloggen...
                </>
              ) : (
                "Inloggen →"
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#334155", marginTop: 24 }}>
          © {new Date().getFullYear()} Tinsights — Beveiligde toegang
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

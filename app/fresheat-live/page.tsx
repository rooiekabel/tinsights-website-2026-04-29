"use client";

export default function FresheatLivePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0b1220" }}>
      <iframe
        src="/fresheat-live/index.html"
        title="Fresheat live preview"
        style={{ width: "100%", height: "100vh", border: 0, display: "block", background: "#0b1220" }}
      />
    </main>
  );
}


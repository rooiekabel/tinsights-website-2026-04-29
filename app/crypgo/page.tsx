export default function DemoPage() {
  return (
    <div className="demo-iframe-shell" style={{ position: "fixed", inset: 0, background: "#fff", overflow: "hidden", zIndex: 2147483647 }}>
      <iframe
        src="/portfolio-voorbeelden/live/crypgo/index.html"
        title="crypgo demo"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ width: "100%", height: "100%", border: 0, display: "block", background: "#fff" }}
      />
    </div>
  );
}

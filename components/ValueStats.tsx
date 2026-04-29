"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapClient";

const reviewUrl = "https://share.google/nesaAxYhNk1WtVbCl";

const stats = [
  {
    value: "4.9",
    suffix: "/5",
    decimals: 1,
    label: "Google Reviews score",
    icon: <span className="text-sm font-bold text-amber-500 sm:text-base" aria-label="Vijf sterren">★★★★★</span>,
    link: { href: reviewUrl, label: "Bekijk reviews →", external: true },
  },
  {
    value: "24",
    suffix: " uur",
    decimals: 0,
    label: "Binnen 24 uur reactie (vaak sneller)",
    icon: <span className="text-sm sm:text-base" aria-hidden>⚡</span>,
    link: { href: "/contact", label: "Neem contact op →", external: false },
  },
  {
    value: "50",
    suffix: "+",
    decimals: 0,
    label: "Projecten & partners",
    icon: <span className="text-sm sm:text-base" aria-hidden>🏆</span>,
    link: { href: "/werk", label: "Bekijk ons werk →", external: false },
  },
] as const;

export default function ValueStats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      root.current.querySelectorAll("[data-stat-block]").forEach((block) => {
        const el = block.querySelector("[data-stat-value]") as HTMLElement | null;
        if (!el) return;
        const target = parseFloat(el.getAttribute("data-end") ?? "0");
        const decimals = Number(el.getAttribute("data-decimals") ?? 0);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: block, start: "top 88%" },
          onUpdate: () => {
            el.textContent = obj.n.toLocaleString("nl-NL", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        });
      });
    },
    { scope: root, dependencies: [] }
  );

  return (
    <section
      id="reviews"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 20, fontWeight: 500 }}>
        Meer dan 50 bedrijven gingen je voor.
      </p>
      <div
        ref={root}
        className="grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)]"
      >
        {stats.map((s, index) => {
          const inner = (
            <div
              data-stat-block
              className="px-2 py-5 sm:px-6 sm:py-8"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                flex: 1,
                gap: 2,
              }}
            >
              {/* Top group: icon + number + label */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div className="flex h-5 items-center sm:h-6">{s.icon}</div>
                <p className="font-display text-[1.55rem] font-bold leading-none tabular-nums text-slate-900 sm:text-5xl">
                  <span
                    data-stat-value
                    data-end={s.value}
                    data-decimals={s.decimals}
                    className="inline-block"
                  >
                    0
                  </span>
                  {s.suffix}
                </p>
                <p className="text-center text-[0.62rem] leading-snug text-slate-500 sm:text-sm">
                  {s.label}
                </p>
              </div>

              {/* Link — always pinned at the bottom */}
              <span className="text-[0.62rem] font-semibold text-indigo-700 sm:text-xs" style={{ marginTop: "auto" }}>
                {s.link.label}
              </span>
            </div>
          );

          return index === 0 ? (
            <a
              key={s.label}
              href={s.link.href}
              target={s.link.external ? "_blank" : undefined}
              rel={s.link.external ? "noreferrer" : undefined}
              className="rounded-l-xl transition hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              style={{ display: "flex", flexDirection: "column" }}
              aria-label="Bekijk Tinsights Google Reviews"
            >
              {inner}
            </a>
          ) : (
            <a
              key={s.label}
              href={s.link.href}
              className={`transition hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${index === stats.length - 1 ? "rounded-r-xl" : ""}`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {inner}
            </a>
          );
        })}
      </div>
    </section>
  );
}

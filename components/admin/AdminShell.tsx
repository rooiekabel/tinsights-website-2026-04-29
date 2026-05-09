"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  {
    href: "/scotdejews/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="admin-nav-icon" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/scotdejews/contacts",
    label: "Contacten",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="admin-nav-icon" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    href: "/scotdejews/mailer",
    label: "Mailer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="admin-nav-icon" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.5 12V6a2 2 0 0 0-2-2h-15a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8" />
      </svg>
    ),
  },
  {
    href: "/scotdejews/automations",
    label: "Automations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="admin-nav-icon" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 22h4M12 2v2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41M2 12h2M20 12h2M6 12a6 6 0 1 1 12 0c0 2.24-1.24 3.79-2.42 4.95-.34.34-.58.77-.58 1.24V19H9v-.81c0-.47-.24-.9-.58-1.24C7.24 15.79 6 14.24 6 12Z" />
      </svg>
    ),
  },
  {
    href: "/scotdejews/settings",
    label: "Instellingen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="admin-nav-icon" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.4 15 .1.5a1.9 1.9 0 0 1-.4 1.7l-.1.2a1.9 1.9 0 0 1-2.3.4l-.5-.2a1.9 1.9 0 0 0-1.7.2l-.4.3a1.9 1.9 0 0 0-.7 1.5V20a1.9 1.9 0 0 1-1.9 1.9h-.3A1.9 1.9 0 0 1 9.3 20v-.5a1.9 1.9 0 0 0-.7-1.5l-.4-.3a1.9 1.9 0 0 0-1.7-.2l-.5.2a1.9 1.9 0 0 1-2.3-.4l-.1-.2a1.9 1.9 0 0 1-.4-1.7L3.3 15a1.9 1.9 0 0 0-.4-1.6l-.3-.4a1.9 1.9 0 0 1 0-2.3l.3-.4a1.9 1.9 0 0 0 .4-1.6l-.1-.5a1.9 1.9 0 0 1 .4-1.7l.1-.2a1.9 1.9 0 0 1 2.3-.4l.5.2a1.9 1.9 0 0 0 1.7-.2l.4-.3a1.9 1.9 0 0 0 .7-1.5V4a1.9 1.9 0 0 1 1.9-1.9h.3A1.9 1.9 0 0 1 13.4 4v.5a1.9 1.9 0 0 0 .7 1.5l.4.3a1.9 1.9 0 0 0 1.7.2l.5-.2a1.9 1.9 0 0 1 2.3.4l.1.2a1.9 1.9 0 0 1 .4 1.7l-.1.5a1.9 1.9 0 0 0 .4 1.6l.3.4a1.9 1.9 0 0 1 0 2.3l-.3.4a1.9 1.9 0 0 0-.4 1.6Z" />
      </svg>
    ),
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = navItems.find((n) => n.href === pathname)?.label ?? "Beheer";

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <div className="admin-root">
      {/* Mobile overlay */}
      <button
        type="button"
        className="admin-overlay"
        aria-label="Menu sluiten"
        onClick={() => setOpen(false)}
        data-visible={open}
      />

      <aside id="admin-sidebar" className="admin-sidebar" data-open={open} aria-label="Admin menu">
        <div className="admin-sidebar-head">
          <div className="admin-logo-wrap">
            <Link href="/" target="_blank" className="admin-logo-link">
              <Image
                src="/assets/logoo.png"
                alt="Tinsights"
                width={132}
                height={36}
                className="admin-logo-img"
                priority
              />
            </Link>
            <span className="admin-badge">Beheer</span>
          </div>
          <button
            type="button"
            className="admin-sidebar-close"
            aria-label="Menu sluiten"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="admin-nav-link"
                data-active={active}
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <span className="admin-nav-text">
                  <span className="admin-nav-label">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-foot">
          <a href="/scotdejews/logout" className="admin-logout">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
            </svg>
            Uitloggen
          </a>
        </div>
      </aside>

      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-burger"
            aria-expanded={open}
            aria-controls="admin-sidebar"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="admin-burger-lines" data-open={open} />
          </button>

          <div className="admin-topbar-center">
            <span className="admin-topbar-title">{current}</span>
            <span className="admin-topbar-sub">Tinsights</span>
          </div>

          <Link href="/" target="_blank" className="admin-topbar-site">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span className="admin-topbar-site-txt">Site</span>
          </Link>
        </header>

        <main className="admin-content">{children}</main>
      </div>

      <style>{`
        .admin-root {
          --admin-bg: #f1f5f9;
          --admin-surface: #ffffff;
          --admin-border: #e2e8f0;
          --admin-text: #0f172a;
          --admin-muted: #64748b;
          --admin-accent: #6366f1;
          --admin-sidebar-w: 260px;
          min-height: 100dvh;
          display: flex;
          background: var(--admin-bg);
          color: var(--admin-text);
        }
        .admin-nav-icon { width: 20px; height: 20px; flex-shrink: 0; }
        .admin-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          z-index: 90;
          border: none;
          padding: 0;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .admin-overlay[data-visible="true"] {
          opacity: 1;
          pointer-events: auto;
        }
        .admin-sidebar {
          width: var(--admin-sidebar-w);
          background: var(--admin-surface);
          border-right: 1px solid var(--admin-border);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          z-index: 100;
          box-shadow: 2px 0 24px rgba(15, 23, 42, 0.04);
        }
        .admin-sidebar-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 18px 16px;
          border-bottom: 1px solid var(--admin-border);
        }
        .admin-logo-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .admin-logo-link { display: inline-block; line-height: 0; }
        .admin-logo-img { height: 32px; width: auto; object-fit: contain; }
        .admin-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--admin-muted);
        }
        .admin-sidebar-close {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--admin-border);
          border-radius: 10px;
          background: #f8fafc;
          color: var(--admin-text);
          cursor: pointer;
          flex-shrink: 0;
        }
        .admin-nav {
          flex: 1;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          text-decoration: none;
          color: var(--admin-muted);
          font-size: 14px;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
        }
        .admin-nav-link:hover {
          background: #f1f5f9;
          color: var(--admin-text);
        }
        .admin-nav-link[data-active="true"] {
          background: rgba(99, 102, 241, 0.1);
          color: var(--admin-accent);
          font-weight: 600;
        }
        .admin-nav-link[data-active="true"] svg {
          stroke: var(--admin-accent);
        }
        .admin-sidebar-foot {
          padding: 14px 12px 20px;
          border-top: 1px solid var(--admin-border);
        }
        .admin-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: var(--admin-muted);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .admin-logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }
        .admin-main-wrap {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          margin-left: var(--admin-sidebar-w);
        }
        .admin-topbar {
          height: 56px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 16px;
          background: var(--admin-surface);
          border-bottom: 1px solid var(--admin-border);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .admin-burger {
          display: none;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--admin-border);
          border-radius: 10px;
          background: #f8fafc;
          cursor: pointer;
          padding: 0;
        }
        .admin-burger-lines {
          position: relative;
          width: 18px;
          height: 2px;
          background: var(--admin-text);
          border-radius: 1px;
          transition: transform 0.2s;
        }
        .admin-burger-lines::before,
        .admin-burger-lines::after {
          content: "";
          position: absolute;
          left: 0;
          width: 18px;
          height: 2px;
          background: var(--admin-text);
          border-radius: 1px;
          transition: transform 0.2s;
        }
        .admin-burger-lines::before { top: -6px; }
        .admin-burger-lines::after { top: 6px; }
        .admin-burger-lines[data-open="true"] {
          background: transparent;
        }
        .admin-burger-lines[data-open="true"]::before {
          transform: translateY(6px) rotate(45deg);
        }
        .admin-burger-lines[data-open="true"]::after {
          transform: translateY(-6px) rotate(-45deg);
        }
        .admin-topbar-center {
          display: flex;
          flex-direction: column;
          gap: 0;
          text-align: center;
          flex: 1;
          min-width: 0;
        }
        .admin-topbar-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--admin-text);
          letter-spacing: -0.02em;
        }
        .admin-topbar-sub {
          font-size: 11px;
          color: var(--admin-muted);
          font-weight: 500;
        }
        .admin-topbar-site {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid var(--admin-border);
          background: #f8fafc;
          color: var(--admin-muted);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }
        .admin-topbar-site:hover {
          border-color: var(--admin-accent);
          color: var(--admin-accent);
        }
        .admin-content {
          flex: 1;
          padding: 24px 22px 32px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .admin-content { padding: 18px 16px 28px; }
          .admin-topbar-site-txt { display: none; }
        }
        @media (max-width: 768px) {
          .admin-overlay { display: block; }
          .admin-burger { display: flex; }
          .admin-sidebar-close { display: flex; }
          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
            transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .admin-sidebar[data-open="true"] {
            transform: translateX(0);
          }
          .admin-main-wrap {
            margin-left: 0;
          }
          .admin-topbar-center {
            text-align: left;
            padding-left: 4px;
          }
        }
      `}</style>
    </div>
  );
}

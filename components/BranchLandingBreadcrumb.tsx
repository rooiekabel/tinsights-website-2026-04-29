"use client";

import type { MouseEvent } from "react";
import Link from "next/link";

type BranchLandingBreadcrumbProps = {
  currentLabel: string;
};

/** Branch landing breadcrumb: flex row without an ordered list so numeric markers never appear in snippets or readers. */
export default function BranchLandingBreadcrumb({ currentLabel }: BranchLandingBreadcrumbProps) {
  const linkStyle = { color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" as const };

  const onLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#fff";
  };
  const onLinkLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
  };

  const sepStyle = { color: "rgba(255,255,255,0.3)", fontSize: 13 } as const;

  return (
    <>
      <style>{`
        .branch-bc-inner::-webkit-scrollbar { display: none; }
        .branch-bc-inner { -ms-overflow-style: none; scrollbar-width: none; }
        nav.branch-landing-bc {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding-bottom: 8px;
          padding-left: 16px;
          padding-right: 16px;
          margin: 0;
          background: #0a0f1e;
          background-color: #0a0f1e;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 1023px) {
          nav.branch-landing-bc { padding-top: 72px; padding-bottom: 6px; }
        }
        @media (min-width: 1024px) {
          nav.branch-landing-bc { padding-top: 100px; padding-bottom: 8px; }
        }
      `}</style>
      <nav aria-label="Breadcrumb" className="branch-landing-bc">
        <div
          className="branch-bc-inner"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            maxWidth: "100%",
            overflowX: "auto",
            fontSize: 13,
            lineHeight: 1.2,
          }}
        >
          <Link href="/" style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
            Home
          </Link>
          <span style={sepStyle} aria-hidden="true">
            /
          </span>
          <Link href="/branches" style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
            Branches
          </Link>
          <span style={sepStyle} aria-hidden="true">
            /
          </span>
          <span style={{ color: "#f1f5f9", fontWeight: 500, fontSize: 13 }} aria-current="page">
            {currentLabel}
          </span>
        </div>
      </nav>
    </>
  );
}

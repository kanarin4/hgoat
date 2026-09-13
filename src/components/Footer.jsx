import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const OWNER_NAME = "A Space Caret Program _^";
const OWNER_URL = "https://spacecaret.com";
const SHOW_QUICK_LINKS = false;
const QUICK_LINKS = [
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

const SOCIAL_LINKS = [];

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { pathname } = useLocation();

  const HIDE_ON = new Set([]);
  if (HIDE_ON.has(pathname)) return null;

  return (
    <footer
      aria-label="Site footer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        background: "var(--background-color)",
        zIndex: 999,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          color: "var(--foreground-color, #111)",
          fontSize: 14,
          lineHeight: 1.4,
        }}
      >
        {/* Left: credit */}
        <div>
          © {year}{" "}
          <a
            href={OWNER_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#4a90e2",
              textDecoration: "none",
              fontFamily: "FuturaExtraBold, sans-serif",
              fontWeight: 800,
              letterSpacing: "0.5px",
            }}
          >
            {OWNER_NAME}
          </a>{" "}
          • All rights reserved.
        </div>

        {/* Right: links */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {SHOW_QUICK_LINKS && (
            <nav aria-label="Footer links" style={{ display: "flex", gap: 14 }}>
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          )}

          {SOCIAL_LINKS.length > 0 && (
            <nav aria-label="Social links" style={{ display: "flex", gap: 12 }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    opacity: 0.85,
                  }}
                  title={s.label}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
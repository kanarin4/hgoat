import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSession } from "../hooks/useSession";
import { supabase } from "../services/supabaseClient";
import { USE_SUPABASE } from "../services/config";

export default function Navbar({ onTriggerDemo = null }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSession();
  const isLoggedIn = Boolean(session?.user);

  const isDemoRoute =
    location.pathname === "/review" ||
    location.pathname === "/sampleReport" ||
    location.search.includes("demo=true");

  const NAV_HEIGHT = 60;
  const buttonBase = {
    height: 34,
    padding: "0 12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    fontSize: "0.85rem",
    fontWeight: "600",
  };

  const handleAccount = () => {
    navigate("/account");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ja" : "en");
  };

  const handleLogout = async () => {
    if (!USE_SUPABASE) {
      console.log("Mocking logout...");
      localStorage.setItem("mock_logged_out", "true");
      window.location.reload();
      return;
    }
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDemoClick = () => {
    if (onTriggerDemo) {
      onTriggerDemo();
    } else {
      navigate("/sampleReport");
    }
  };

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        height: NAV_HEIGHT,
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <h2
        onClick={() => navigate("/")}
        style={{
          margin: 0,
          cursor: "pointer",
          userSelect: "none",
          fontSize: "1.2rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
        }}
      >
        🐐 HGoat Care
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Demo Button (Hidden when already in demo mode / review) */}
        {!isDemoRoute && (
          <button
            onClick={handleDemoClick}
            style={{
              ...buttonBase,
              backgroundColor: "#4f46e5",
              color: "white",
              padding: "0 10px",
              fontSize: "0.8rem",
            }}
            title="Demo"
          >
            Demo
          </button>
        )}

        {/* 🇯🇵 / 🇬🇧 Language Switch */}
        <button
          onClick={toggleLanguage}
          style={{
            background: "none",
            border: "none",
            color: "#4a90e2",
            cursor: "pointer",
            fontSize: "0.85rem",
            padding: "0 4px",
            whiteSpace: "nowrap",
          }}
        >
          {i18n.language === "en" ? "🇯🇵 日本語" : "🇬🇧 English"}
        </button>

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAccount}
              title="Account"
              style={{
                background: "#f3f4f6",
                border: "none",
                borderRadius: "999px",
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "1rem",
                display: "inline-block",
                lineHeight: 1.2,
              }}
            >
              👤
            </button>

            <button
              onClick={handleLogout}
              style={{
                ...buttonBase,
                backgroundColor: "#f44336",
                color: "white",
                padding: "0 10px",
                fontSize: "0.8rem",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button
              style={{
                ...buttonBase,
                backgroundColor: "#4a90e2",
                color: "white",
                padding: "0 12px",
                fontSize: "0.82rem",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
            >
              🔑 {t("login")}
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
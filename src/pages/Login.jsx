import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../services/supabaseClient";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { USE_SUPABASE } from "../services/config";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!USE_SUPABASE) {
      console.log("Mocking login...");
      localStorage.removeItem("mock_logged_out");
      navigate("/");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Navbar />

      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "10px" }}>
        🐐 HGoat Care
      </h1>
      <p style={{ color: "gray", marginBottom: "30px" }}>{t("pleaseLogin")}</p>

      <Card style={{ width: "350px", textAlign: "center", padding: "40px" }}>
        <button
          onClick={handleLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            padding: "12px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: USE_SUPABASE ? "#444" : "white",
            backgroundColor: USE_SUPABASE ? "white" : "#4a90e2",
            border: USE_SUPABASE ? "1px solid #ddd" : "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = USE_SUPABASE ? "#f9f9f9" : "#357ABD")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = USE_SUPABASE ? "white" : "#4a90e2")}
        >
          {USE_SUPABASE && (
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: "20px" }}
            />
          )}
          {USE_SUPABASE ? t("loginWithGoogle") : t("loginButton")}
        </button>
      </Card>
    </div>
  );
}
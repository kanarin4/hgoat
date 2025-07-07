import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { downloadGoatReportsCSV } from "../services/csvDownload";
import { supabase } from "../services/supabaseClient";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
// import TemperatureGraph from "../components/TemperatureGraph"; // ✅ Import Graph Component

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [reportStatus, setReportStatus] = useState(null);

  useEffect(() => {
    const checkReportSubmitted = async () => {
      const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" }); // yyyy-mm-dd
      const { data, error } = await supabase
        .from("goat_reports")
        .select("caretaker_name")
        .eq("date", today)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error checking report status:", error);
        setReportStatus({ submitted: false });
      } else if (data) {
        setReportStatus({ submitted: true, name: data.caretaker_name });
      } else {
        setReportStatus({ submitted: false });
      }
    };

    checkReportSubmitted();
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "var(--background-color)"
    }}>
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("home")}
      </h1>

      <Card style={{ width: "90%", maxWidth: "700px", padding: "20px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
          📅 {t("todayIs")}: {new Date().toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}
        </h2>
        {reportStatus ? (
          reportStatus.submitted ? (
            <p style={{ color: "green", textAlign: "center", fontSize: "1.2rem" }}>
              ✅ {t("reportSubmittedBy")} {reportStatus.name}
            </p>
          ) : (
            <p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>
              ❌ {t("reportNotSubmitted")}
            </p>
          )
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>{t("loadingStatus")}</p>
        )}
      </Card>

      {/* 📈 Temperature Graph Inside a Scrollable Card */}
      {/* <Card style={{ width: "90%", maxWidth: "700px", padding: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
          📈 {t("temperatureTrends")}
        </h2>

        
        <div style={{
          width: "100%",
          overflowX: "auto",   // ✅ Enable horizontal scrolling
          overflowY: "hidden",
          whiteSpace: "nowrap",
          paddingBottom: "10px" // ✅ Avoid cutting off scroll bar
        }}>
          <div style={{ minWidth: "800px" }}> 
            <TemperatureGraph />
          </div>
        </div>
      </Card> */}


      {/* 📋 Start Report & 📥 Download CSV */}
      <Card style={{ width: "90%", maxWidth: "400px", padding: "20px", marginTop: "20px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px"
        }}>
          <button 
            onClick={() => navigate("/basic-info")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#4a90e2",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: "1rem",
              width: "100%"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
            📋 {t("startReport")}
          </button>

          <button 
            onClick={downloadGoatReportsCSV}
            style={{
              padding: "12px 24px",
              backgroundColor: "#2ecc71",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: "1rem",
              width: "100%"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#27ae60"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}>
            📥 {t("downloadCSV")}
          </button>
        </div>
      </Card>
    </div>
  );
}
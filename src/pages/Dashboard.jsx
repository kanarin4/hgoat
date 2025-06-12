



import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { downloadGoatReportsCSV } from "../services/csvDownload";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
// import TemperatureGraph from "../components/TemperatureGraph"; // ✅ Import Graph Component

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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


// import { useTranslation } from "react-i18next";
// import Card from "../components/Card";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const { t } = useTranslation();

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       minHeight: "100vh",
//       backgroundColor: "#f9fafb"
//     }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       {/* Empty space to prevent content from being covered by navbar */}
//       <div style={{ height: "60px" }}></div>

//       {/* 🐐 Welcome Message */}
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("home")}
//       </h1>

//       {/* 📊 Placeholder for Graph / Visualization */}
//       <div style={{
//         width: "80%",
//         minHeight: "250px",
//         backgroundColor: "#e0e0e0",
//         borderRadius: "12px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontSize: "1.2rem",
//         color: "#666",
//         marginBottom: "20px"
//       }}>
//         📊 Future Graph / Visualization Here
//       </div>

//       {/* 📦 Card Container */}
//       <Card>
//         <div style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "15px"
//         }}>
//           {/* 🚀 Start Report Button */}
//           <button style={{
//             padding: "12px 24px",
//             backgroundColor: "#4a90e2",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "1rem"
//           }}
//           onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
//           onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
//             📋 {t("startReport")}
//           </button>

//           {/* 📥 Download CSV Button */}
//           <button style={{
//             padding: "12px 24px",
//             backgroundColor: "#2ecc71",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "1rem"
//           }}
//           onMouseOver={(e) => e.target.style.backgroundColor = "#27ae60"}
//           onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}>
//             📥 {t("downloadCSV")}
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// }






import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // ✅ Added navigation hook

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb"
    }}>
      {/* 🏠 Navbar */}
      <Navbar />

      {/* Empty space to prevent content from being covered by navbar */}
      <div style={{ height: "60px" }}></div>

      {/* 🐐 Welcome Message */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("home")}
      </h1>

      {/* 📊 Placeholder for Graph / Visualization */}
      <div style={{
        width: "80%",
        minHeight: "250px",
        backgroundColor: "#e0e0e0",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.2rem",
        color: "#666",
        marginBottom: "20px"
      }}>
        📊 Future Graph / Visualization Here
      </div>

      {/* 📦 Card Container */}
      <Card>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px"
        }}>
          {/* 🚀 Start Report Button */}
          <button 
            onClick={() => navigate("/basic-info")} // ✅ Navigates to /basic-info
            style={{
              padding: "12px 24px",
              backgroundColor: "#4a90e2",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: "1rem"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
            📋 {t("startReport")}
          </button>

          {/* 📥 Download CSV Button */}
          <button style={{
            padding: "12px 24px",
            backgroundColor: "#2ecc71",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
            fontSize: "1rem"
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
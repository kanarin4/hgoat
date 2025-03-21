// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import StepNavigation from "../components/StepNavigation";

// export default function GeneralNotes({ formData, handleChange }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

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

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("generalNotes")}
//       </h1>

//       {/* 📝 General Notes Input */}
//       <textarea
//         value={formData.general_notes}
//         onChange={(e) => handleChange("general_notes", null, e.target.value)}
//         placeholder={t("additionalNotes")}
//         style={{
//           width: "80%",
//           maxWidth: "600px",
//           height: "200px",
//           padding: "10px",
//           borderRadius: "8px",
//           border: "1px solid #ccc",
//           fontSize: "1rem",
//           resize: "vertical"
//         }}
//       />

//       {/* 🔄 Step Navigation */}
//       <StepNavigation
//         prevPage={() => navigate("/task-checklist")}
//         nextPage={() => navigate("/review")}
//       />
//     </div>
//   );
// }


import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function GeneralNotes({ formData = {}, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Ensure formData.general_notes is always defined
  const generalNotes = formData.general_notes || "";

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

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("generalNotes")}
      </h1>

      {/* 📝 General Notes Input */}
      <textarea
        value={generalNotes} // ✅ Now always has a value
        onChange={(e) => handleChange("general_notes", null, e.target.value)}
        placeholder={t("additionalNotes")}
        style={{
          width: "80%",
          maxWidth: "600px",
          height: "200px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          resize: "vertical"
        }}
      />

      {/* 🏠 Back to Task Checklist */}
      <button 
        onClick={() => navigate("/task-checklist")}
        style={{
          padding: "12px 24px",
          backgroundColor: "#4a90e2",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "0.3s",
          fontSize: "1rem",
          marginTop: "20px",
          marginBottom: "20px"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
        ⬅️ {t("back")}
      </button>

      {/* ➡️ Next to Review */}
      <button 
        onClick={() => navigate("/review")}
        style={{
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
        ➡️ {t("next")}
      </button>
    </div>
  );
}
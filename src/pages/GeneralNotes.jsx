



import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import Card component

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
      backgroundColor: "var(--background-color)"
    }}>
      {/* 🏠 Navbar */}
      <Navbar />

      {/* Empty space to prevent content from being covered by navbar */}
      <div style={{ height: "60px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("generalNotes")}
      </h1>

      {/* 📝 General Notes Input Wrapped in a Card */}
      <Card>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "10px" }}>
          {t("additionalNotes")}
        </label>
        <textarea
          value={generalNotes} // ✅ Now always has a value
          onChange={(e) => handleChange("general_notes", null, e.target.value)}
          placeholder={t("additionalNotes")}
          style={{
            width: "95%",
            height: "200px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            resize: "vertical"
          }}
        />
      </Card>

      {/* 🔄 Navigation Buttons */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        {/* ⬅️ Back Button */}
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
            fontSize: "1rem"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}
        >
          ⬅️ {t("back")}
        </button>

        {/* ➡️ Next Button */}
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
          onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}
        >
          ➡️ {t("next")}
        </button>
      </div>
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import Card component

export default function GoatForm({ formData, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 🐐 Get goat ID from URL query params
  const searchParams = new URLSearchParams(location.search);
  const goatId = searchParams.get("goat") === "B" ? "B" : "A";
  const formKey = goatId === "A" ? "goatA" : "goatB";

  if (!formData || !formData.goats) {
    console.warn("🚨 formData.goats is undefined!");
    return <div>Loading...</div>;
  }

  const goatData = formData.goats[formKey] || {
    temperature: "",
    stool: "",
    appetite: "",
    notes: "",
    confirmationChecked: false,
  };

  // const [confirmationChecked, setConfirmationChecked] = useState(goatData.confirmationChecked || false);
  const [showGuide, setShowGuide] = useState(false); // ✅ State for toggling guide visibility

  // const isTempOutOfRange = (temperature) => {
  //   const temp = parseFloat(temperature);
  //   return temp < 38.5 || temp > 40.5;
  // };

  // const handleTempChange = (e) => {
  //   const value = e.target.value;
  //   handleChange("goats", "temperature", value, formKey);
  //   setConfirmationChecked(false);
  //   handleChange("goats", "confirmationChecked", false, formKey);
  // };

  // const handleCheckboxChange = (e) => {
  //   const checked = e.target.checked;
  //   setConfirmationChecked(checked);
  //   handleChange("goats", "confirmationChecked", checked, formKey);
  // };

  // useEffect(() => {
  //   if (!isTempOutOfRange(goatData.temperature) && confirmationChecked) {
  //     setConfirmationChecked(false);
  //     handleChange("goats", "confirmationChecked", false, formKey);
  //   }
  // }, [goatData.temperature, confirmationChecked, handleChange, formKey]);

  const goToPrevious = () => {
    navigate(goatId === "B" ? "/goat-form?goat=A" : "/basic-info");
  };

  const goToNext = () => {
    navigate(goatId === "A" ? "/goat-form?goat=B" : "/task-checklist");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)" }}>
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {goatId === "A" ? t("goatKai") : t("goatMayu")}
      </h1>

      {/* 🐐 Form Inside a Card */}
      <Card>
        {/* <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{t("bodyTemp")}:</label>
        <input
          type="number"
          value={goatData.temperature}
          onChange={handleTempChange}
          placeholder="e.g., 38.5~40.5"
          style={{ width: "95%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
          step="0.1"
        />

        <div style={{ marginTop: "5px" }}>
          <label htmlFor={`confirmCheck-${formKey}`} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id={`confirmCheck-${formKey}`}
              checked={confirmationChecked}
              onChange={handleCheckboxChange}
              disabled={!isTempOutOfRange(goatData.temperature)}
              style={{ marginRight: "10px" }}
            />
            <span style={{ color: !isTempOutOfRange(goatData.temperature) ? "#9CA3AF" : "#EF4444", fontWeight: "bold" }}>
              {t("tempOutsideRangeWarning")}
            </span>
          </label>
        </div> */}

        {/* 💩 Stool */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: "15px", marginBottom: "5px" }}>{t("stoolCondition")}:</label>
        {["good", "soft", "hard"].map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name={`stool-${formKey}`}
              value={option}
              checked={goatData.stool === option}
              onChange={(e) => handleChange("goats", "stool", e.target.value, formKey)}
              style={{ marginRight: "10px" }}
            />
            {t(option)}
          </label>
        ))}

        {/* 🍽️ Appetite */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: "15px", marginBottom: "5px" }}>{t("appetite")}:</label>
        {["good", "normal", "poor"].map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name={`appetite-${formKey}`}
              value={option}
              checked={goatData.appetite === option}
              onChange={(e) => handleChange("goats", "appetite", e.target.value, formKey)}
              style={{ marginRight: "10px" }}
            />
            {t(option)}
          </label>
        ))}

        {/* 📝 Notes */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: "15px", marginBottom: "5px" }}>{t("additionalNotes")}:</label>
        <textarea
          value={goatData.notes}
          onChange={(e) => handleChange("goats", "notes", e.target.value, formKey)}
          placeholder={t("additionalNotes")}
          style={{ width: "95%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
      </Card>

    {/* 🔄 Navigation */}

        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <button
          onClick={goToPrevious}
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
        >
          ⬅️ {t("back")}
        </button>

        <button
          onClick={goToNext}
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
        >
          ➡️ {t("next")}
        </button>
      </div>

      {/* 🏥 Guide Toggle Button */}
      <button
        onClick={() => setShowGuide(!showGuide)}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#ff9800",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        📖 {t("openGuide")}
      </button>

      {/* 📖 Health Monitoring Guide (Collapsible) */}
      {showGuide && (
        <Card style={{ marginTop: "20px" }}>
        <h2 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>📖 {t("healthMonitoringGuide")}</h2>
        {/* <p><strong>{t("bodyTemp")}:</strong></p>
        <p>{t("bodyTempDesc")}</p>
        <ul>
          <li>{t("useLubricatedThermometer")}</li>
          <li>{t("holdGoatSecurely")}</li>
          <li>{t("waitForStableReading")}</li>
          <li>{t("cleanThermometerAfterUse")}</li>
        </ul> */}
        <p><strong>{t("stoolCondition")}:</strong></p>
        <p>{t("stoolConditionDesc")}</p>
        <ul>
          <li>{t("normalStool")}</li>
          <li>{t("softStool")}</li>
          <li>{t("hardStool")}</li>
          <li>{t("persistentDiarrhea")}</li>
        </ul>
        <p><strong>{t("appetite")}:</strong></p>
        <p>{t("appetiteDesc")}</p>
        <ul>
          <li>{t("goodAppetite")}</li>
          <li>{t("normalAppetite")}</li>
          <li>{t("poorAppetite")}</li>
          <li>{t("noFoodFor24h")}</li>
        </ul>
        <p><strong>⚠️ {t("emergencySigns")}:</strong></p>
        <p>{t("callAVetIf")}</p>
        <ul>
          <li>{t("highOrLowTemp")}</li>
          <li>{t("severeDiarrheaOrConstipation")}</li>
          <li>{t("noFoodFor24h")}</li>
          <li>{t("breathingIssues")}</li>
          <li>{t("abnormalDischarge")}</li>
          <li>{t("unableToStandOrWalk")}</li>
        </ul>
      </Card>
      )}


    </div>
  );
}
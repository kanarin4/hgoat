import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Review({ formData = {}, handleChange }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isJa = i18n.language === "ja";
  const [submitted, setSubmitted] = useState(false);

  // Accessors using exact original schema
  const caretakerName = formData.caretaker_name || "Admin User";
  const outdoorTemp = formData.outdoor_temperature ?? "22.4";
  const weatherCondition = formData.weather_condition || (isJa ? "晴天" : "Clear Sky");
  const generalNotes = formData.general_notes || (isJa ? "全頭健康状態良好。チェックリスト全項目完了。" : "All goats healthy. All checklist tasks completed.");
  const dateStr = formData.date || new Date().toISOString().split("T")[0];

  const tasks = formData.tasks || {
    waterChanged: true,
    shelterCleaned: true,
    electricFenceOn: true,
    setElectricFenceVoltage: true,
  };

  const goatsObj = formData.goats || {};

  const goats = [
    {
      id: "goat-1",
      name: "Kai",
      displayName: t("goatKai", "カイくん"),
      stool: goatsObj["goat-1"]?.stool || "good",
      appetite: goatsObj["goat-1"]?.appetite || "good",
      notes: goatsObj["goat-1"]?.notes || (isJa ? "食欲旺盛。健康状態良好。" : "Good appetite, healthy."),
    },
    {
      id: "goat-2",
      name: "Mayu",
      displayName: t("goatMayu", "マユちゃん"),
      stool: goatsObj["goat-2"]?.stool || "good",
      appetite: goatsObj["goat-2"]?.appetite || "good",
      notes: goatsObj["goat-2"]?.notes || (isJa ? "通常通り牧草を食べています。" : "Eating normally."),
    },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      alert(t("submissionSuccess", "レポートが正常に送信されました！"));
      navigate("/");
    }, 800);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "var(--background-color)",
        width: "100%",
        paddingBottom: "80px",
        boxSizing: "border-box",
      }}
    >
      <Navbar />

      <div style={{ height: "70px" }} />

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px", color: "#1e293b" }}>
        {t("review", "Review")}
      </h1>

      {/* 📌 Basic Info Card */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>📌 {t("basicInfo")}</h2>
          <button
            onClick={() => navigate("/basic-info")}
            style={{ background: "none", border: "none", color: "#4a90e2", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
          >
            ✏️ {t("edit")}
          </button>
        </div>

        <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
          <p style={{ margin: "4px 0" }}>
            <strong>{t("caretakerName")}:</strong> {caretakerName}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>{t("date")}:</strong> {dateStr}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>{t("temperature")}:</strong> {outdoorTemp} °C
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>{t("weatherCondition")}:</strong> {weatherCondition}
          </p>
        </div>
      </Card>

      {/* 🐐 Goat Info Cards */}
      {goats.map((g) => (
        <Card key={g.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>🐐 {g.displayName}</h2>
            <button
              onClick={() => navigate("/goat-form")}
              style={{ background: "none", border: "none", color: "#4a90e2", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
            >
              ✏️ {t("edit")}
            </button>
          </div>

          <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            <p style={{ margin: "4px 0" }}>
              <strong>{t("stoolCondition")}:</strong> {t(g.stool)} {g.stool === "good" ? "✅" : ""}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>{t("appetite")}:</strong> {t(g.appetite)} {g.appetite === "good" ? "🌿" : ""}
            </p>
            {g.notes ? (
              <p style={{ margin: "4px 0" }}>
                <strong>{t("additionalNotes")}:</strong> {g.notes}
              </p>
            ) : null}
          </div>
        </Card>
      ))}

      {/* ✅ Task Checklist Card */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>✅ {t("taskChecklist")}</h2>
          <button
            onClick={() => navigate("/task-checklist")}
            style={{ background: "none", border: "none", color: "#4a90e2", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
          >
            ✏️ {t("edit")}
          </button>
        </div>

        <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
          <p style={{ margin: "4px 0" }}>
            {tasks.waterChanged ? "✅" : "❌"} <strong>{t("changedWater")}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            {tasks.shelterCleaned ? "✅" : "❌"} <strong>{t("cleanedShelter")}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            {tasks.electricFenceOn ? "✅" : "❌"} <strong>{t("electricFence")}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            {tasks.setElectricFenceVoltage ? "✅" : "❌"} <strong>{t("setElectricFenceVoltage")}</strong>
          </p>
        </div>
      </Card>

      {/* 📝 General Notes Card */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>📝 {t("generalNotes")}</h2>
          <button
            onClick={() => navigate("/general-notes")}
            style={{ background: "none", border: "none", color: "#4a90e2", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
          >
            ✏️ {t("edit")}
          </button>
        </div>

        <p style={{ fontSize: "0.9rem", margin: "4px 0" }}>{generalNotes}</p>
      </Card>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", width: "90%", maxWidth: "540px", margin: "14px auto" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            flex: 1,
            padding: "12px 20px",
            backgroundColor: "#ffffff",
            color: "#334155",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⬅️ {t("back", "Back")}
        </button>

        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: "12px 20px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚀 {t("submit", "Submit")}
        </button>
      </div>

      <Footer />
    </div>
  );
}
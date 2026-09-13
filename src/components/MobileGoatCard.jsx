import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";

export default function MobileGoatCard({
  name = "Kai",
  japaneseName = "カイくん",
  stool = "good",
  appetite = "good",
  notes = "",
}) {
  const { t, i18n } = useTranslation();
  const isJa = i18n.language === "ja";

  const displayName = isJa ? japaneseName : name;

  const getStoolText = () => {
    if (stool === "good") return isJa ? "良好" : "Good";
    if (stool === "soft") return isJa ? "柔らかい" : "Soft";
    if (stool === "hard") return isJa ? "硬い" : "Hard";
    return stool || "—";
  };

  const getAppetiteText = () => {
    if (appetite === "good") return isJa ? "良好" : "Good";
    if (appetite === "normal") return isJa ? "普通" : "Normal";
    if (appetite === "poor") return isJa ? "不良" : "Poor";
    return appetite || "—";
  };

  const isHealthy = stool === "good" && (appetite === "good" || appetite === "normal");

  return (
    <Card style={{ margin: "8px auto" }}>
      {/* Header: Goat Icon, Name, Status Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "1.3rem" }}>🐐</span>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#1e293b" }}>
            {displayName}
          </h3>
        </div>

        <span
          style={{
            backgroundColor: isHealthy ? "#e8f5e9" : "#fff8e1",
            color: isHealthy ? "#2e7d32" : "#f57f17",
            padding: "3px 10px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            border: `1px solid ${isHealthy ? "#c8e6c9" : "#ffe082"}`,
          }}
        >
          {isHealthy ? (isJa ? "良好" : "Normal") : (isJa ? "要観察" : "Attention")}
        </span>
      </div>

      {/* Metrics: Stool Condition & Appetite */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          backgroundColor: "#f8fafc",
          padding: "10px 12px",
          borderRadius: "8px",
          marginTop: "10px",
        }}
      >
        <div>
          <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>
            {t("stoolCondition", "Stool Condition")}
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#0f172a", marginTop: "2px" }}>
            {getStoolText()} {stool === "good" ? "✅" : ""}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>
            {t("appetite", "Appetite")}
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#0f172a", marginTop: "2px" }}>
            {getAppetiteText()} {appetite === "good" ? "🌿" : ""}
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      {notes ? (
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.8rem",
            color: "#475569",
            lineHeight: 1.4,
            padding: "8px 10px",
            backgroundColor: "#f8fafc",
            borderRadius: "6px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <strong>{t("additionalNotes", "Additional Notes")}:</strong> {notes}
        </div>
      ) : null}
    </Card>
  );
}

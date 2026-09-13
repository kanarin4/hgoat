import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import MobileGoatCard from "../components/MobileGoatCard";

export default function Dashboard({ formData = {}, handleChange = () => {} }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isJa = i18n.language === "ja";

  const session = useSession();
  const isLoggedIn = Boolean(session?.user);

  // Quick Demo Mode Handler
  const handleTriggerDemo = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    handleChange("site_id", null, "site-1");
    handleChange("site_label", null, "H-Village");
    handleChange("date", null, todayStr);
    handleChange("caretaker_name", null, "Admin User");
    handleChange("outdoor_temperature", null, "22.4");
    handleChange("weather_condition", null, isJa ? "晴天" : "Clear Sky");
    handleChange("weather_code", null, "0");

    // Populate Goats (Strictly real fields: stool, appetite, notes)
    handleChange("goats", "stool", "good", "goat-1");
    handleChange("goats", "appetite", "good", "goat-1");
    handleChange("goats", "notes", isJa ? "食欲旺盛。健康状態良好。" : "Good appetite, healthy.", "goat-1");

    handleChange("goats", "stool", "good", "goat-2");
    handleChange("goats", "appetite", "good", "goat-2");
    handleChange("goats", "notes", isJa ? "通常通り牧草を食べています。" : "Eating normally.", "goat-2");

    handleChange("goatsOrder", null, ["goat-1", "goat-2"]);

    // Populate Tasks
    handleChange("tasks", "waterChanged", true);
    handleChange("tasks", "shelterCleaned", true);
    handleChange("tasks", "electricFenceOn", true);
    handleChange("tasks", "setElectricFenceVoltage", true);
    handleChange("general_notes", null, isJa ? "全頭健康状態良好。チェックリスト全項目完了。" : "All goats healthy. All checklist tasks completed.");

    // Navigate to review report
    navigate("/review");
  };

  const handleStartReport = () => {
    handleChange("site_id", null, "site-1");
    handleChange("site_label", null, "H-Village");
    navigate("/basic-info");
  };

  const siteName = formData.site_label || "H-Village";
  const dateDisplay = new Date().toLocaleDateString(isJa ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const outdoorTemp = formData.outdoor_temperature || "22.4";
  const weatherCond = formData.weather_condition || (isJa ? "晴天" : "Clear Sky");

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
      <Navbar onTriggerDemo={handleTriggerDemo} />

      {/* Spacing below fixed Navbar */}
      <div style={{ height: "70px" }} />

      {/* 1. Site & Weather Overview Card */}
      <Card
        style={{
          background: "linear-gradient(135deg, #064e3b, #047857)",
          color: "#ffffff",
          padding: "16px 18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.5px",
                color: "#a7f3d0",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {t("site", "SITE")}: {siteName}
            </div>
            <h1
              style={{
                margin: "4px 0 0 0",
                fontSize: "1.3rem",
                fontWeight: "bold",
                letterSpacing: "-0.3px",
              }}
            >
              {isJa ? "ヤギ飼育管理システム" : "HGoat Caretaker System"}
            </h1>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.72rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span className="pulse-dot" />
            <span>{isJa ? "正常" : "Active"}</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "12px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "#d1fae5",
          }}
        >
          <span>📅 {dateDisplay}</span>
          <span>🌤 {outdoorTemp}°C {weatherCond}</span>
        </div>
      </Card>

      {/* 2. Goat Status Section Header */}
      <div
        style={{
          width: "90%",
          maxWidth: "540px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "6px auto 2px auto",
          padding: "0 4px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "bold", color: "#1e293b" }}>
          🐐 {isJa ? "ヤギ健康ステータス" : "Goat Status"}
        </h2>
        <span style={{ fontSize: "0.75rem", color: "#166534", fontWeight: "bold" }}>
          {isJa ? "全2頭 良好" : "2/2 Normal"}
        </span>
      </div>

      {/* Kai */}
      <MobileGoatCard
        name="Kai"
        japaneseName={t("goatKai", "カイくん")}
        stool="good"
        appetite="good"
        notes={isJa ? "食欲旺盛。健康状態良好。" : "Good appetite, healthy."}
      />

      {/* Mayu */}
      <MobileGoatCard
        name="Mayu"
        japaneseName={t("goatMayu", "マユちゃん")}
        stool="good"
        appetite="good"
        notes={isJa ? "通常通り牧草を食べています。" : "Eating normally."}
      />

      {/* 3. Task Checklist Card */}
      <Card>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "0.95rem", fontWeight: "bold", color: "#334155" }}>
          ✅ {t("taskChecklist", "Task Checklist")}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              padding: "8px 10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>💧</span>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: "#14532d" }}>
                {t("changedWater", "Changed Water")}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#166534" }}>{t("yes", "Yes")} ✅</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              padding: "8px 10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🏠</span>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: "#14532d" }}>
                {t("cleanedShelter", "Cleaned Shelter")}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#166534" }}>{t("yes", "Yes")} ✅</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "8px 10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>⚡</span>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: "#1e3a8a" }}>
                {t("electricFence", "Electric Fence")}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#1e40af" }}>{t("yes", "Yes")} ✅</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "8px 10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>⚡</span>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: "#1e3a8a" }}>
                {t("setElectricFenceVoltage", "Set Electric Fence Voltage")}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#1e40af" }}>{t("yes", "Yes")} ✅</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Action Card (NO duplicate Demo Mode button in the body) */}
      <Card style={{ textAlign: "center", padding: "16px 20px" }}>
        <button
          onClick={handleStartReport}
          style={{
            width: "100%",
            padding: "12px 24px",
            backgroundColor: "#4a90e2",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "8px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
        >
          📋 {t("startReport", "Start Report")}
        </button>

        <button
          onClick={() => navigate("/sampleReport")}
          style={{
            background: "none",
            border: "none",
            color: "#4a90e2",
            fontSize: "0.85rem",
            fontWeight: "bold",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          👀 {t("viewSampleReport", "View Sample Report")}
        </button>
      </Card>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

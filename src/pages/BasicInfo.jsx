



import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCurrentWeather } from "../services/weatherService";
import { getWeatherCondition } from "../services/getWeatherCondition";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import Card component

export default function BasicInfo({ formData = {}, handleChange = () => {} }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [weatherFetched, setWeatherFetched] = useState(false);

  // Set default values to prevent undefined errors
  const defaultFormData = {
    outdoor_temperature: formData.outdoor_temperature || "",
    weather_condition: formData.weather_condition || "Clear sky",
    weather_code: formData.weather_code || "",
    date: formData.date || new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" }), // Default to today
    caretaker_name: formData.caretaker_name || "",
  };

  // Fetch weather on first render
  useEffect(() => {
    const fetchWeather = async () => {
      console.log("Fetching weather...");
      try {
        const data = await getCurrentWeather(35.39004, 139.42771); // Example location
        console.log("Weather Data:", data);

        if (data) {
          handleChange("outdoor_temperature", null, data.temperature || 0);
          handleChange("weather_code", null, data.weather_code || 0);
          handleChange("weather_condition", null, getWeatherCondition(data.weather_code, i18n.language));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setWeatherFetched(true);
      }
    };

    if (!weatherFetched) {
      fetchWeather();
    }
  }, [weatherFetched, handleChange, i18n.language]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)" }}>
      {/* 🏠 Navbar */}
      <Navbar />

      {/* Empty space to prevent content from being covered by navbar */}
      <div style={{ height: "60px" }}></div>

      {/* 📝 Page Title */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("basicInfo")}
      </h1>

      {/* 📌 Wrap Everything in a Card */}
      <Card>
        {/* 🌦️ Current Weather */}
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🌦️ {t("currentWeather")}</h2>

        {/* Temperature Input */}
        <label style={{ fontWeight: "bold" }}>{t("temperature")}:</label>
        <input
          type="number"
          value={defaultFormData.outdoor_temperature}
          onChange={(e) => handleChange("outdoor_temperature", null, parseFloat(e.target.value))}
          style={{ width: "95%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        {/* Weather Condition Input */}
        <label style={{ fontWeight: "bold" }}>{t("weatherCondition")}:</label>
        <input
          type="text"
          value={defaultFormData.weather_condition}
          onChange={(e) => handleChange("weather_condition", null, e.target.value)}
          style={{ width: "95%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        {/* 📅 Date Field */}
        <label style={{ fontWeight: "bold", display: "block" }}>{t("date")}:</label>
        <input
          type="date"
          value={defaultFormData.date}
          onChange={(e) => handleChange("date", null, e.target.value)}
          style={{ width: "95%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />

        {/* 👤 Caretaker Name Field */}
        <label style={{ fontWeight: "bold", display: "block" }}>{t("caretakerName")}:</label>
        <input
          type="text"
          value={defaultFormData.caretaker_name}
          onChange={(e) => handleChange("caretaker_name", null, e.target.value)}
          style={{ width: "95%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
      </Card>

      {/* 🔙 Back & ➡️ Next Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
        {/* 🏠 Back to Dashboard */}
        <button
          onClick={() => navigate("/")}
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
          ⬅️ {t("backToHome")}
        </button>

        {/* ➡️ Next to Goat A Form */}
        <button
          onClick={() => navigate("/goat-form?goat=A")}
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
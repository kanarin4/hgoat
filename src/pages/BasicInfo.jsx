// // src/pages/BasicInfo.jsx
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getCurrentWeather } from "../services/weatherService";
// import { getWeatherCondition } from "../services/getWeatherCondition";
// import { supabase } from "../services/supabaseClient";
// import { useSession } from "../hooks/useSession";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";

// export default function BasicInfo({ formData = {}, handleChange = () => {} }) {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const session = useSession();

//   const [weatherFetched, setWeatherFetched] = useState(false);
//   const [siteCoords, setSiteCoords] = useState(null); // { lat, lon } | null

//   // Prefer nickname for caretaker display
//   const preferredName =
//     session?.user?.user_metadata?.nickname ||
//     session?.user?.user_metadata?.full_name ||
//     session?.user?.user_metadata?.name ||
//     session?.user?.email?.split("@")[0] ||
//     "";

//   // 1) Read ?site= and (optional) ?siteName=; load site name & coords
//   useEffect(() => {
//     const sp = new URLSearchParams(location.search);
//     const siteId = sp.get("site") || "";
//     const siteNameFromURL = sp.get("siteName") || "";

//     (async () => {
//       if (!siteId) return;

//       // Persist the site_id we’ll submit with the report
//       handleChange("site_id", null, siteId);

//       // If a name was passed in query, use it; otherwise fetch from Supabase
//       if (siteNameFromURL) {
//         handleChange("site_label", null, siteNameFromURL);
//       } else {
//         const { data, error } = await supabase
//           .from("sites")
//           .select("name, latitude, longitude")
//           .eq("id", siteId)
//           .maybeSingle();
//           console.log("site lookup", data, error);

//         if (!error && data) {
//           if (data.name) handleChange("site_label", null, data.name);
//           if (data.lat != null && data.lon != null) {
//             setSiteCoords({ lat: data.lat, lon: data.lon });
//           } else {
//             setSiteCoords(null);
//           }
//         }
//       }

//       // Remember last site locally (optional)
//       try {
//         localStorage.setItem("last_site_id", siteId);
//       } catch {}
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.search]);

//   // 2) Prefill caretaker name with nickname if empty
//   useEffect(() => {
//     if (!formData.caretaker_name && preferredName) {
//       handleChange("caretaker_name", null, preferredName);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [preferredName]);

//   // 3) Fetch weather (use site coords if available; fallback to your default)
//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const lat = siteCoords?.lat ?? 35.39004;
//         const lon = siteCoords?.lon ?? 139.42771;

//         const data = await getCurrentWeather(lat, lon);
//         if (data) {
//           handleChange("outdoor_temperature", null, data.temperature ?? 0);
//           handleChange("weather_code", null, data.weather_code ?? 0);
//           handleChange(
//             "weather_condition",
//             null,
//             getWeatherCondition(data.weather_code, i18n.language)
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       } finally {
//         setWeatherFetched(true);
//       }
//     };

//     if (!weatherFetched) fetchWeather();
//   }, [weatherFetched, siteCoords, handleChange, i18n.language]);

//   // 4) Safe fallbacks for controlled inputs
//   const valueOr = (v, fallback = "") => (v ?? v === 0 ? v : fallback);

//   const reportingLabel = formData.site_label || formData.site_id || "";

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "var(--background-color)",
//       }}
//     >
//       <Navbar />
//       <div style={{ height: "60px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("basicInfo")}
//       </h1>

//       <Card>
//         {/* 📍 Reporting site banner */}
//         {reportingLabel && (
//           <div
//             style={{
//               marginBottom: "12px",
//               padding: "8px 12px",
//               borderRadius: "8px",
//               background: "#f3f4f6",
//               fontWeight: 600,
//             }}
//           >
//             📍 {t("reportingFor")}{" "}
//             <span style={{ fontFamily: "monospace" }}>{reportingLabel}</span>
//           </div>
//         )}

//         {/* 🌦️ Current Weather */}
//         <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🌦️ {t("currentWeather")}</h2>

//         {/* Temperature */}
//         <label style={{ fontWeight: "bold" }}>{t("temperature")}:</label>
//         <input
//           type="number"
//           value={valueOr(formData.outdoor_temperature, "")}
//           onChange={(e) =>
//             handleChange("outdoor_temperature", null, parseFloat(e.target.value))
//           }
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />

//         {/* Weather Condition */}
//         <label style={{ fontWeight: "bold" }}>{t("weatherCondition")}:</label>
//         <input
//           type="text"
//           value={valueOr(formData.weather_condition, "Clear sky")}
//           onChange={(e) => handleChange("weather_condition", null, e.target.value)}
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />

//         {/* 📅 Date */}
//         <label style={{ fontWeight: "bold", display: "block" }}>{t("date")}:</label>
//         <input
//           type="date"
//           value={
//             valueOr(
//               formData.date,
//               new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" })
//             )
//           }
//           onChange={(e) => handleChange("date", null, e.target.value)}
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />

//         {/* 👤 Caretaker Name */}
//         <label style={{ fontWeight: "bold", display: "block" }}>
//           {t("caretakerName")}:
//         </label>
//         <input
//           type="text"
//           value={valueOr(formData.caretaker_name, preferredName)}
//           onChange={(e) => handleChange("caretaker_name", null, e.target.value)}
//           placeholder={preferredName || t("account.nicknamePlaceholder")}
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />
//       </Card>

//       {/* 🔙 Back & ➡️ Next */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "15px",
//           marginTop: "20px",
//         }}
//       >
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#4a90e2",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "1rem",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
//         >
//           ⬅️ {t("backToHome")}
//         </button>

//         <button
//           onClick={() => navigate("/goat-form?goat=A")}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#2ecc71",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "1rem",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2ecc71")}
//         >
//           ➡️ {t("next")}
//         </button>
//       </div>
//     </div>
//   );
// }


// src/pages/BasicInfo.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCurrentWeather } from "../services/weatherService";
import { getWeatherCondition } from "../services/getWeatherCondition";
import { supabase } from "../services/supabaseClient";
import { useSession } from "../hooks/useSession";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function BasicInfo({ formData = {}, handleChange = () => {} }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const session = useSession();

  const [weatherFetched, setWeatherFetched] = useState(false);
  const [siteCoords, setSiteCoords] = useState(null); // { lat, lon } | null

  // Prefer nickname for caretaker display
  const preferredName =
    session?.user?.user_metadata?.nickname ||
    session?.user?.user_metadata?.full_name ||
    session?.user?.user_metadata?.name ||
    session?.user?.email?.split("@")[0] ||
    "";

  // 1) Ensure we have the selected site’s name & coords from Supabase (by formData.site_id)
  useEffect(() => {
    const siteId = formData.site_id || "";
    if (!siteId) {
      setSiteCoords(null);
      return;
    }

    (async () => {
      // If site_label is missing, fetch it; also grab lat/lon
      const needName = !formData.site_label;
      const { data, error } = await supabase
        .from("sites")
        .select("name, lat, lon")
        .eq("id", siteId)
        .maybeSingle();

      if (!error && data) {
        if (needName && data.name) handleChange("site_label", null, data.name);
        if (data.lat != null && data.lon != null) {
          setSiteCoords({ lat: data.lat, lon: data.lon });
        } else {
          setSiteCoords(null);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.site_id]);

  // 2) Prefill caretaker name with nickname if empty
  useEffect(() => {
    if (!formData.caretaker_name && preferredName) {
      handleChange("caretaker_name", null, preferredName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredName]);

  // 3) Fetch weather (use site coords if available; fallback coords)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = siteCoords?.lat ?? 35.39004;
        const lon = siteCoords?.lon ?? 139.42771;

        const data = await getCurrentWeather(lat, lon);
        if (data) {
          handleChange("outdoor_temperature", null, data.temperature ?? 0);
          handleChange("weather_code", null, data.weather_code ?? 0);
          handleChange(
            "weather_condition",
            null,
            getWeatherCondition(data.weather_code, i18n.language)
          );
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setWeatherFetched(true);
      }
    };

    if (!weatherFetched) fetchWeather();
  }, [weatherFetched, siteCoords, handleChange, i18n.language]);

  // 4) Safe value helper
  const valueOr = (v, fallback = "") => (v ?? v === 0 ? v : fallback);

  const reportingLabel = formData.site_label || formData.site_id || "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("basicInfo")}
      </h1>

      <Card>
        {/* 📍 Reporting site banner */}
        {reportingLabel && (
          <div
            style={{
              marginBottom: "12px",
              padding: "8px 12px",
              borderRadius: "8px",
              background: "#f3f4f6",
              fontWeight: 600,
            }}
          >
            📍 {t("reportingFor")}{" "}
            <span style={{ fontFamily: "monospace" }}>{reportingLabel}</span>
          </div>
        )}

        {/* 🌦️ Current Weather */}
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🌦️ {t("currentWeather")}</h2>

        {/* Temperature */}
        <label style={{ fontWeight: "bold" }}>{t("temperature")}:</label>
        <input
          type="number"
          value={valueOr(formData.outdoor_temperature, "")}
          onChange={(e) =>
            handleChange("outdoor_temperature", null, parseFloat(e.target.value))
          }
          style={{
            width: "95%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        {/* Weather Condition */}
        <label style={{ fontWeight: "bold" }}>{t("weatherCondition")}:</label>
        <input
          type="text"
          value={valueOr(formData.weather_condition, "Clear sky")}
          onChange={(e) => handleChange("weather_condition", null, e.target.value)}
          style={{
            width: "95%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        {/* 📅 Date */}
        <label style={{ fontWeight: "bold", display: "block" }}>{t("date")}:</label>
        <input
          type="date"
          value={
            valueOr(
              formData.date,
              new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" })
            )
          }
          onChange={(e) => handleChange("date", null, e.target.value)}
          style={{
            width: "95%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        {/* 👤 Caretaker Name */}
        <label style={{ fontWeight: "bold", display: "block" }}>
          {t("caretakerName")}:
        </label>
        <input
          type="text"
          value={valueOr(formData.caretaker_name, preferredName)}
          onChange={(e) => handleChange("caretaker_name", null, e.target.value)}
          placeholder={preferredName || t("account.nicknamePlaceholder")}
          style={{
            width: "95%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
      </Card>

      {/* 🔙 Back & ➡️ Next */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
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
            fontSize: "1rem",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
        >
          ⬅️ {t("backToHome")}
        </button>

        <button
          onClick={() => navigate("/goat-form")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2ecc71",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
            fontSize: "1rem",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2ecc71")}
        >
          ➡️ {t("next")}
        </button>
      </div>
    </div>
  );
}



// // src/pages/BasicInfo.jsx
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate, useLocation } from "react-router-dom";
// import { getCurrentWeather } from "../services/weatherService";
// import { getWeatherCondition } from "../services/getWeatherCondition";
// import { supabase } from "../services/supabaseClient";
// import { useSession } from "../hooks/useSession";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";
// import { buildSiteQS } from "../utils/siteQuery";


// export default function BasicInfo({ formData = {}, handleChange = () => {} }) {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const session = useSession();

//   const [weatherFetched, setWeatherFetched] = useState(false);
//   const [siteCoords, setSiteCoords] = useState(null); // { lat, lon } | null

//   const qs = buildSiteQS({ formData, location });

//   // Prefer nickname for caretaker display
//   const preferredName =
//     session?.user?.user_metadata?.nickname ||
//     session?.user?.user_metadata?.full_name ||
//     session?.user?.user_metadata?.name ||
//     session?.user?.email?.split("@")[0] ||
//     "";

//   // 1) Read ?site= and (optional) ?siteName=; load site name & coords
//   useEffect(() => {
//     const sp = new URLSearchParams(location.search);
//     const siteId = sp.get("site") || "";
//     const siteNameFromURL = sp.get("siteName") || "";

//     (async () => {
//       if (!siteId) return;

//       // Persist the site_id we’ll submit with the report
//       handleChange("site_id", null, siteId);

//       // If a name was passed in query, use it; otherwise fetch from Supabase
//       if (siteNameFromURL) {
//         handleChange("site_label", null, siteNameFromURL);

//         // ✅ ADDED: still fetch coords from DB so weather works
//         const { data: dbSite, error: dbErr } = await supabase
//           .from("sites")
//           .select("lat, lon")       // ✅ FIX: correct column names
//           .eq("id", siteId)
//           .maybeSingle();

//         if (!dbErr && dbSite && dbSite.lat != null && dbSite.lon != null) {
//           setSiteCoords({ lat: dbSite.lat, lon: dbSite.lon });
//         } else {
//           setSiteCoords(null);
//         }
//       } else {
//         const { data, error } = await supabase
//           .from("sites")
//           .select("name, lat, lon") // ✅ FIX: correct column names
//           .eq("id", siteId)
//           .maybeSingle();
//         console.log("site lookup", data, error);

//         if (!error && data) {
//           if (data.name) handleChange("site_label", null, data.name);
//           if (data.lat != null && data.lon != null) {
//             setSiteCoords({ lat: data.lat, lon: data.lon }); // ✅ FIX
//           } else {
//             setSiteCoords(null);
//           }
//         }
//       }

//       // Remember last site locally (optional)
//       try {
//         localStorage.setItem("last_site_id", siteId);
//       } catch {}
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.search]);

//   // 2) Prefill caretaker name with nickname if empty
//   useEffect(() => {
//     if (!formData.caretaker_name && preferredName) {
//       handleChange("caretaker_name", null, preferredName);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [preferredName]);

//   // 3) Fetch weather (use site coords if available; fallback to your default)
//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const lat = siteCoords?.lat ?? 35.39004;
//         const lon = siteCoords?.lon ?? 139.42771;

//         const data = await getCurrentWeather(lat, lon);
//         if (data) {
//           handleChange("outdoor_temperature", null, data.temperature ?? 0);
//           handleChange("weather_code", null, data.weather_code ?? 0);
//           handleChange(
//             "weather_condition",
//             null,
//             getWeatherCondition(data.weather_code, i18n.language)
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       } finally {
//         setWeatherFetched(true);
//       }
//     };

//     if (!weatherFetched) fetchWeather();
//   }, [weatherFetched, siteCoords, handleChange, i18n.language]);

//   // 4) Safe fallbacks for controlled inputs
//   const valueOr = (v, fallback = "") => (v ?? v === 0 ? v : fallback);

//   const reportingLabel = formData.site_label || formData.site_id || "";

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "var(--background-color)",
//       }}
//     >
//       <Navbar />
//       <div style={{ height: "60px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("basicInfo")}
//       </h1>

//       <Card>
//         {/* 📍 Reporting site banner */}
//         {reportingLabel && (
//           <div
//             style={{
//               marginBottom: "12px",
//               padding: "8px 12px",
//               borderRadius: "8px",
//               background: "#f3f4f6",
//               fontWeight: 600,
//             }}
//           >
//             📍 {t("reportingFor")}{" "}
//             <span style={{ fontFamily: "monospace" }}>{reportingLabel}</span>
//           </div>
//         )}

//         {/* 🌦️ Current Weather */}
//         <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🌦️ {t("currentWeather")}</h2>

//         {/* Temperature */}
//         <label style={{ fontWeight: "bold" }}>{t("temperature")}:</label>
//         <input
//           type="number"
//           value={valueOr(formData.outdoor_temperature, "")}
//           onChange={(e) =>
//             handleChange("outdoor_temperature", null, parseFloat(e.target.value))
//           }
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />

//         {/* Weather Condition */}
//         <label style={{ fontWeight: "bold" }}>{t("weatherCondition")}:</label>
//         <input
//           type="text"
//           value={valueOr(formData.weather_condition, "Clear sky")}
//           onChange={(e) => handleChange("weather_condition", null, e.target.value)}
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />

//         {/* 📅 Date */}
//         <label style={{ fontWeight: "bold", display: "block" }}>{t("date")}:</label>
//         <input
//           type="date"
//           value={
//             valueOr(
//               formData.date,
//               new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" })
//             )
//           }
//           onChange={(e) => handleChange("date", null, e.target.value)}
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />

//         {/* 👤 Caretaker Name */}
//         <label style={{ fontWeight: "bold", display: "block" }}>
//           {t("caretakerName")}:
//         </label>
//         <input
//           type="text"
//           value={valueOr(formData.caretaker_name, preferredName)}
//           onChange={(e) => handleChange("caretaker_name", null, e.target.value)}
//           placeholder={preferredName || t("account.nicknamePlaceholder")}
//           style={{
//             width: "95%",
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />
//       </Card>

//       {/* 🔙 Back & ➡️ Next */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "15px",
//           marginTop: "20px",
//         }}
//       >
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#4a90e2",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "1rem",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
//         >
//           ⬅️ {t("backToHome")}
//         </button>

//         <button
//           onClick={() => {
//             const sp = new URLSearchParams(location.search);
//             const site = formData.site_id || sp.get("site") || "";
//             const siteName = formData.site_label || sp.get("siteName") || "";

//             // Always start at the first goat (index 0)
//             navigate(
//               `/goat-form?gi=0&site=${encodeURIComponent(site)}&siteName=${encodeURIComponent(siteName)}`
//             );
//           }}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#2ecc71",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "1rem",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2ecc71")}
//         >
//           ➡️ {t("next")}
//         </button>
//       </div>
//     </div>
//   );
// }
// src/pages/TaskChecklist.jsx
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function TaskChecklist({ formData = {}, handleChange = () => {} }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false); // ✅ Toggle guide visibility

  // Ensure formData.tasks is always defined
  const tasks = formData.tasks || {
    waterChanged: false,
    shelterCleaned: false,
    electricFenceOn: false,
    setElectricFenceVoltage: false,
  };

  // Figure out the last goat index from the roster you put in formData on "Start Report"
  const goatCount = Array.isArray(formData.goatsList)
    ? formData.goatsList.length
    : Math.max(Object.keys(formData.goats || {}).length, 1);
  const lastGoatIndex = Math.max(0, goatCount - 1);

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

      {/* Spacer for navbar */}
      <div style={{ height: "60px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("taskChecklist")}
      </h1>

      {/* ✅ Task Checklist Wrapped in a Card */}
      <Card>
        <label style={{ fontSize: "1.2rem", fontWeight: "bold", display: "block", marginBottom: "10px" }}>
          {t("tasksCompleted")}
        </label>

        {[
          { id: "waterChanged", label: t("changedWater") },
          { id: "shelterCleaned", label: t("cleanedShelter") },
          { id: "electricFenceOn", label: t("electricFence") },
          { id: "setElectricFenceVoltage", label: t("setElectricFenceVoltage") },
        ].map(task => (
          <label key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="checkbox"
              id={task.id}
              checked={tasks[task.id]}
              onChange={(e) => handleChange("tasks", task.id, e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            {task.label}
          </label>
        ))}
      </Card>

      {/* 🔄 Navigation Buttons */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        {/* ⬅️ Back to last goat */}
        <button
          onClick={() => {
            // Tell GoatForm which page to open, then navigate.
            handleChange("goatIndex", null, lastGoatIndex);
            navigate("/goat-form");
          }}
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

        {/* ➡️ Next to General Notes */}
        <button
          onClick={() => navigate("/general-notes")}
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

      {/* 📖 Guide Toggle Button */}
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

      {/* 📖 Task Procedure Guide (Collapsible) */}
      {showGuide && (
        <Card style={{ marginTop: "20px" }}>
          <h2 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>📖 {t("taskProcedureGuide")}</h2>

          {/* 🚰 Water Change */}
          <p><strong>{t("waterChange")}:</strong></p>
          <p>{t("waterChangeDesc")}</p>
          <ul>
            <li>{t("emptyAndRinseBucket")}</li>
            <li>{t("refillWithFreshWater")}</li>
            <li>{t("secureBucketProperly")}</li>
          </ul>

          {/* 🏠 Shelter Cleaning */}
          <p><strong>{t("shelterCleaning")}:</strong></p>
          <p>{t("shelterCleaningDesc")}</p>
          <ul>
            <li>{t("removeDirtyBedding")}</li>
            <li>{t("checkForRepairs")}</li>
            <li>{t("addNewBeddingIfNeeded")}</li>
            <li>{t("ensureProperVentilation")}</li>
          </ul>

          {/* ⚡ Electric Fence */}
          <p><strong>{t("electricFence")}:</strong></p>
          <p>{t("electricFenceDesc")}</p>
          <ul>
            <li>{t("ensureFencePowerOn")}</li>
            <li>{t("inspectForDamage")}</li>
            <li>{t("removeVegetationTouchingFence")}</li>
            <li>{t("checkIndicatorLight")}</li>
            <li>{t("checkVoltage")}</li>
          </ul>
        </Card>
      )}
    </div>
  );
}


// import { useTranslation } from "react-i18next";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useMemo } from "react";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card"; // ✅ Import Card component

// export default function TaskChecklist({ formData = {}, handleChange }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showGuide, setShowGuide] = useState(false); // ✅ Toggle guide visibility

//   // Ensure formData.tasks is always defined
//   const tasks = formData.tasks || {
//     waterChanged: false,
//     shelterCleaned: false,
//     electricFenceOn: false,
//     setElectricFenceVoltage: false, // ✅ New Task Added
//   };

//   // ── preserve site context if available ────────────────────────────────
//   const sp = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const site = sp.get("site") || formData.site_id || "";
//   const siteName = sp.get("siteName") || formData.site_label || "";

//   // Robust last-goat detection:
//   const clampIdx = (n) => (Number.isFinite(n) && n >= 0 ? n : 0);
//   const gLastParam = sp.get("gLast");
//   const gParam = sp.get("g");
//   const gTotalParam = sp.get("gTotal");

//   let lastGoatIndex = 0;
//   if (gLastParam !== null) {
//     lastGoatIndex = clampIdx(parseInt(gLastParam, 10));
//   } else if (gParam !== null) {
//     lastGoatIndex = clampIdx(parseInt(gParam, 10));
//   } else if (gTotalParam !== null) {
//     const total = parseInt(gTotalParam, 10);
//     lastGoatIndex = clampIdx((isNaN(total) ? 1 : total) - 1);
//   } else {
//     const capturedCount = Object.keys(formData.goats || {}).length;
//     lastGoatIndex = clampIdx(capturedCount - 1);
//   }

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       minHeight: "100vh",
//       backgroundColor: "var(--background-color)"
//     }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       {/* Empty space to prevent content from being covered by navbar */}
//       <div style={{ height: "60px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("taskChecklist")}
//       </h1>

//       {/* ✅ Task Checklist Wrapped in a Card */}
//       <Card>
//         <label style={{ fontSize: "1.2rem", fontWeight: "bold", display: "block", marginBottom: "10px" }}>
//           {t("tasksCompleted")}
//         </label>

//         {[
//           { id: "waterChanged", label: t("changedWater") },
//           { id: "shelterCleaned", label: t("cleanedShelter") },
//           { id: "electricFenceOn", label: t("electricFence") },
//           { id: "setElectricFenceVoltage", label: t("setElectricFenceVoltage") } // ✅ New Checkbox
//         ].map(task => (
//           <label key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//             <input
//               type="checkbox"
//               id={task.id}
//               checked={tasks[task.id]} // ✅ Use `tasks` instead of `formData.tasks`
//               onChange={(e) => handleChange("tasks", task.id, e.target.checked)}
//               style={{ marginRight: "10px" }}
//             />
//             {task.label}
//           </label>
//         ))}
//       </Card>

//       {/* 🔄 Navigation Buttons */}
//       <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
//         {/* ⬅️ Back to last goat */}
//         <button
//           onClick={() =>
//             navigate(
//               `/goat-form?g=${lastGoatIndex}` +
//                 (site ? `&site=${encodeURIComponent(site)}` : "") +
//                 (siteName ? `&siteName=${encodeURIComponent(siteName)}` : "")
//             )
//           }
//           style={{
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
//           onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}
//         >
//           ⬅️ {t("back")}
//         </button>

//         {/* ➡️ Next to General Notes (preserve context) */}
//         <button
//           onClick={() =>
//             navigate(
//               `/general-notes` +
//                 (site ? `?site=${encodeURIComponent(site)}` : "") +
//                 (siteName ? `${site ? "&" : "?"}siteName=${encodeURIComponent(siteName)}` : "")
//             )
//           }
//           style={{
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
//           onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}
//         >
//           ➡️ {t("next")}
//         </button>
//       </div>

//       {/* 📖 Guide Toggle Button */}
//       <button
//         onClick={() => setShowGuide(!showGuide)}
//         style={{
//           padding: "10px 20px",
//           marginTop: "20px",
//           backgroundColor: "#ff9800",
//           color: "white",
//           borderRadius: "8px",
//           border: "none",
//           cursor: "pointer",
//           fontSize: "1rem",
//         }}
//       >
//         📖 {t("openGuide")}
//       </button>

//       {/* 📖 Task Procedure Guide (Collapsible) */}
//       {showGuide && (
//         <Card style={{ marginTop: "20px" }}>
//           <h2 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>📖 {t("taskProcedureGuide")}</h2>

//           {/* 🚰 Water Change */}
//           <p><strong>{t("waterChange")}:</strong></p>
//           <p>{t("waterChangeDesc")}</p>
//           <ul>
//             <li>{t("emptyAndRinseBucket")}</li>
//             <li>{t("refillWithFreshWater")}</li>
//             <li>{t("secureBucketProperly")}</li>
//           </ul>

//           {/* 🏠 Shelter Cleaning */}
//           <p><strong>{t("shelterCleaning")}:</strong></p>
//           <p>{t("shelterCleaningDesc")}</p>
//           <ul>
//             <li>{t("removeDirtyBedding")}</li>
//             <li>{t("checkForRepairs")}</li>
//             <li>{t("addNewBeddingIfNeeded")}</li>
//             <li>{t("ensureProperVentilation")}</li>
//           </ul>

//           {/* ⚡ Electric Fence */}
//           <p><strong>{t("electricFence")}:</strong></p>
//           <p>{t("electricFenceDesc")}</p>
//           <ul>
//             <li>{t("ensureFencePowerOn")}</li>
//             <li>{t("inspectForDamage")}</li>
//             <li>{t("removeVegetationTouchingFence")}</li>
//             <li>{t("checkIndicatorLight")}</li>
//             <li>{t("checkVoltage")}</li>
//           </ul>
//         </Card>
//       )}
//     </div>
//   );
// }
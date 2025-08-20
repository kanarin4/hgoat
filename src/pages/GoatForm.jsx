// src/pages/GoatForm.jsx
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function GoatForm({ formData = {}, handleChange = () => {} }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showGuide, setShowGuide] = useState(false);

  // From formData (already set on Start Report)
  const siteName = formData.site_label || "";  // optional, purely for UX
  const goatsList = Array.isArray(formData.goatsList) ? formData.goatsList : []; // [{id,name}]

  // ✅ init from formData.goatIndex (fallback 0)
  const [idx, setIdx] = useState(() => Math.max(0, formData.goatIndex ?? 0)); // current goat page

  // ✅ keep formData.goatIndex in sync whenever idx changes
  useEffect(() => {
    handleChange("goatIndex", null, idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // Clamp idx if list length changes
  useEffect(() => {
    if (goatsList.length === 0) {
      if (idx !== 0) setIdx(0);
    } else if (idx > goatsList.length - 1) {
      setIdx(goatsList.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goatsList.length]);

  const currentGoat = goatsList[idx];
  const formKey = currentGoat?.id; // store answers under goats[goat_uuid]

  // No goats for this site → let the user continue
  if (!currentGoat) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background-color)" }}>
        <Navbar />
        <div style={{ height: 60 }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ maxWidth: 560 }}>
            <h2 style={{ marginTop: 0 }}>{t("goatForm.noGoatsTitle")}</h2>
            <p>{t("goatForm.noGoatsBody")}</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => navigate("/basic-info")}
                style={{ padding: "10px 18px", background: "#4a90e2", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
              >
                ⬅️ {t("backToHome")}
              </button>
              <button
                onClick={() => navigate("/task-checklist")}
                style={{ padding: "10px 18px", background: "#2ecc71", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
              >
                ➡️ {t("next")}
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Pull existing values; default if missing
  const goatData =
    (formData.goats && formData.goats[formKey]) || {
      stool: "",
      appetite: "",
      notes: "",
    };

  // Persist changes under goats[goat_uuid]
  const onChangeField = (field, value) => {
    handleChange("goats", field, value, formKey);
  };

  // Nav across goats (state-only)
  const goPrev = () => {
    if (idx > 0) {
      setIdx((i) => i - 1);
    } else {
      // first goat -> back to Basic Info
      navigate("/basic-info");
    }
  };

  const goNext = () => {
    if (idx < goatsList.length - 1) {
      setIdx((i) => i + 1);
    } else {
      // last goat -> Task Checklist
      navigate("/task-checklist");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)" }}>
      <Navbar />
      <div style={{ height: 60 }} />

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 6 }}>
        {currentGoat.name}
      </h1>
      {siteName && (
        <p style={{ marginTop: 0, color: "#666" }}>
          {t("reportingFor")} <span style={{ fontFamily: "monospace" }}>{siteName}</span>
        </p>
      )}
      {goatsList.length > 1 && (
        <p style={{ marginTop: 0, color: "#666" }}>
          {t("goatForm.progress", { current: idx + 1, total: goatsList.length })}
        </p>
      )}

      <Card>
        {/* 💩 Stool */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: 6, marginBottom: 5 }}>
          {t("stoolCondition")}:
        </label>
        {["good", "soft", "hard"].map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name={`stool-${formKey}`}
              value={option}
              checked={goatData.stool === option}
              onChange={(e) => onChangeField("stool", e.target.value)}
              style={{ marginRight: 10 }}
            />
            {t(option)}
          </label>
        ))}

        {/* 🍽️ Appetite */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: 15, marginBottom: 5 }}>
          {t("appetite")}:
        </label>
        {["good", "normal", "poor"].map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name={`appetite-${formKey}`}
              value={option}
              checked={goatData.appetite === option}
              onChange={(e) => onChangeField("appetite", e.target.value)}
              style={{ marginRight: 10 }}
            />
            {t(option)}
          </label>
        ))}

        {/* 📝 Notes */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: 15, marginBottom: 5 }}>
          {t("additionalNotes")}:
        </label>
        <textarea
          value={goatData.notes}
          onChange={(e) => onChangeField("notes", e.target.value)}
          placeholder={t("additionalNotes")}
          style={{ width: "95%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginBottom: 10 }}
        />
      </Card>

      {/* 🔄 Navigation */}
      <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
        <button
          onClick={goPrev}
          style={{
            padding: "12px 24px",
            backgroundColor: "#4a90e2",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          ⬅️ {t("back")}
        </button>

        <button
          onClick={goNext}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2ecc71",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          ➡️ {idx < goatsList.length - 1 ? t("next") : t("next")}
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
        <Card style={{ marginTop: "20px", maxWidth: 560 }}>
          <h2 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
            📖 {t("healthMonitoringGuide")}
          </h2>

          {/* 🟡 Stool */}
          <p><strong>{t("stoolCondition")}:</strong></p>
          <p>{t("stoolConditionDesc")}</p>
          <ul>
            <li>{t("normalStool")}</li>
            <li>{t("softStool")}</li>
            <li>{t("hardStool")}</li>
            <li>{t("persistentDiarrhea")}</li>
          </ul>

          {/* 🟡 Appetite */}
          <p><strong>{t("appetite")}:</strong></p>
          <p>{t("appetiteDesc")}</p>
          <ul>
            <li>{t("goodAppetite")}</li>
            <li>{t("normalAppetite")}</li>
            <li>{t("poorAppetite")}</li>
            <li>{t("noFoodFor24h")}</li>
          </ul>

          {/* ⚠️ Emergency Signs */}
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





// // src/pages/GoatForm.jsx
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";

// export default function GoatForm({ formData = {}, handleChange = () => {} }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   // From formData (already set on Start Report)
//   const siteName = formData.site_label || "";  // optional, purely for UX
//   const goatsList = Array.isArray(formData.goatsList) ? formData.goatsList : []; // [{id,name}]

//   const [idx, setIdx] = useState(0); // current goat page

//   // Clamp idx if list length changes
//   useEffect(() => {
//     if (goatsList.length === 0) {
//       setIdx(0);
//     } else if (idx > goatsList.length - 1) {
//       setIdx(goatsList.length - 1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [goatsList.length]);

//   const currentGoat = goatsList[idx];
//   const formKey = currentGoat?.id; // store answers under goats[goat_uuid]

//   // No goats for this site → let the user continue
//   if (!currentGoat) {
//     return (
//       <div style={{ minHeight: "100vh", background: "var(--background-color)" }}>
//         <Navbar />
//         <div style={{ height: 60 }} />
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Card style={{ maxWidth: 560 }}>
//             <h2 style={{ marginTop: 0 }}>{t("goatForm.noGoatsTitle")}</h2>
//             <p>{t("goatForm.noGoatsBody")}</p>
//             <div style={{ display: "flex", gap: 12 }}>
//               <button
//                 onClick={() => navigate("/basic-info")}
//                 style={{ padding: "10px 18px", background: "#4a90e2", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
//               >
//                 ⬅️ {t("backToHome")}
//               </button>
//               <button
//                 onClick={() => navigate("/task-checklist")}
//                 style={{ padding: "10px 18px", background: "#2ecc71", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
//               >
//                 ➡️ {t("next")}
//               </button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // Pull existing values; default if missing
//   const goatData =
//     (formData.goats && formData.goats[formKey]) || {
//       stool: "",
//       appetite: "",
//       notes: "",
//     };

//   // Persist changes under goats[goat_uuid]
//   const onChangeField = (field, value) => {
//     handleChange("goats", field, value, formKey);
//   };

//   // Nav across goats (state-only)
//   const goPrev = () => {
//     if (idx > 0) {
//       setIdx((i) => i - 1);
//     } else {
//       // first goat -> back to Basic Info
//       navigate("/basic-info");
//     }
//   };

//   const goNext = () => {
//     if (idx < goatsList.length - 1) {
//       setIdx((i) => i + 1);
//     } else {
//       // last goat -> Task Checklist
//       navigate("/task-checklist");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)" }}>
//       <Navbar />
//       <div style={{ height: 60 }} />

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 6 }}>
//         {currentGoat.name}
//       </h1>
//       {siteName && (
//         <p style={{ marginTop: 0, color: "#666" }}>
//           {t("reportingFor")} <span style={{ fontFamily: "monospace" }}>{siteName}</span>
//         </p>
//       )}
//       {goatsList.length > 1 && (
//         <p style={{ marginTop: 0, color: "#666" }}>
//           {t("goatForm.progress", { current: idx + 1, total: goatsList.length })}
//         </p>
//       )}

//       <Card>
//         {/* 💩 Stool */}
//         <label style={{ fontWeight: "bold", display: "block", marginTop: 6, marginBottom: 5 }}>
//           {t("stoolCondition")}:
//         </label>
//         {["good", "soft", "hard"].map((option) => (
//           <label key={option} style={{ display: "flex", alignItems: "center" }}>
//             <input
//               type="radio"
//               name={`stool-${formKey}`}
//               value={option}
//               checked={goatData.stool === option}
//               onChange={(e) => onChangeField("stool", e.target.value)}
//               style={{ marginRight: 10 }}
//             />
//             {t(option)}
//           </label>
//         ))}

//         {/* 🍽️ Appetite */}
//         <label style={{ fontWeight: "bold", display: "block", marginTop: 15, marginBottom: 5 }}>
//           {t("appetite")}:
//         </label>
//         {["good", "normal", "poor"].map((option) => (
//           <label key={option} style={{ display: "flex", alignItems: "center" }}>
//             <input
//               type="radio"
//               name={`appetite-${formKey}`}
//               value={option}
//               checked={goatData.appetite === option}
//               onChange={(e) => onChangeField("appetite", e.target.value)}
//               style={{ marginRight: 10 }}
//             />
//             {t(option)}
//           </label>
//         ))}

//         {/* 📝 Notes */}
//         <label style={{ fontWeight: "bold", display: "block", marginTop: 15, marginBottom: 5 }}>
//           {t("additionalNotes")}:
//         </label>
//         <textarea
//           value={goatData.notes}
//           onChange={(e) => onChangeField("notes", e.target.value)}
//           placeholder={t("additionalNotes")}
//           style={{ width: "95%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginBottom: 10 }}
//         />
//       </Card>

//       {/* 🔄 Navigation */}
//       <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
//         <button
//           onClick={goPrev}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#4a90e2",
//             color: "white",
//             borderRadius: 8,
//             border: "none",
//             cursor: "pointer",
//             fontSize: "1rem"
//           }}
//         >
//           ⬅️ {t("back")}
//         </button>

//         <button
//           onClick={goNext}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#2ecc71",
//             color: "white",
//             borderRadius: 8,
//             border: "none",
//             cursor: "pointer",
//             fontSize: "1rem"
//           }}
//         >
//           ➡️ {idx < goatsList.length - 1 ? t("next") : t("continue")}
//         </button>
//       </div>
//     </div>
//   );
// }
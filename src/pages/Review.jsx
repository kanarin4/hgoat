import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabaseClient";
import Card from "../components/Card";

export default function Review({ formData = {}, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ---- Safe accessors -------------------------------------------------------
  const caretakerName = formData.caretaker_name || "";
  const outdoorTemp = formData.outdoor_temperature ?? "N/A";
  const weatherCondition = formData.weather_condition || t("noData");
  const generalNotes = formData.general_notes || t("noAdditionalNotes");

  const tasks = formData.tasks || {};
  // New model: goats keyed by goat UUIDs + goatsList [{id,name}]
  const goatsObj = formData.goats || {};
  const goatsList = Array.isArray(formData.goatsList) ? formData.goatsList : [];

  // Fallback support for legacy goatA/goatB so you don't crash
  const legacyGoats =
    goatsList.length === 0
      ? [
          { id: "goatA", name: t("goatKai") },
          { id: "goatB", name: t("goatMayu") },
        ]
      : [];

  // Validation helpers
  const allGoatsFilled =
    (goatsList.length
      ? goatsList
      : legacyGoats
    ).every((g) => {
      const gd =
        goatsList.length > 0
          ? goatsObj[g.id] || {}
          : (formData.goats?.[g.id] || {});
      return Boolean(gd.stool) && Boolean(gd.appetite);
    });

  const isFormComplete =
    caretakerName &&
    outdoorTemp !== "N/A" &&
    weatherCondition !== t("noData") &&
    tasks.waterChanged &&
    tasks.shelterCleaned &&
    tasks.electricFenceOn &&
    tasks.setElectricFenceVoltage &&
    allGoatsFilled;

  // ---- Submit ---------------------------------------------------------------
  const handleSubmit = async () => {
    try {
      const formattedDate =
        formData.date || new Date().toISOString().split("T")[0];

      // 1) Insert parent report
      const { data: reportRow, error: repErr } = await supabase
        .from("goat_reports")
        .insert([
          {
            site_id: formData.site_id || null,
            caretaker_name: caretakerName,
            date: formattedDate,
            outdoor_temperature:
              formData.outdoor_temperature ?? null,
            weather_condition: formData.weather_condition || null,
            weather_code: formData.weather_code ?? null,
            general_notes: formData.general_notes || null,
            water_changed: !!tasks.waterChanged,
            shelter_cleaned: !!tasks.shelterCleaned,
            electric_fence_on: !!tasks.electricFenceOn,
            set_electric_fence_voltage: !!tasks.setElectricFenceVoltage,
          },
        ])
        .select("id")
        .single();

      if (repErr) throw repErr;
      const reportId = reportRow.id;

      // 2) Build observations from current data model
      const sourceList = goatsList.length ? goatsList : legacyGoats;
      const obs = sourceList.map((g) => {
        const gd =
          goatsList.length > 0
            ? goatsObj[g.id] || {}
            : (formData.goats?.[g.id] || {});
        return {
          report_id: reportId,
          goat_id: goatsList.length ? g.id : null, // legacy path may not have an id
          goat_label: g.name, // helpful for audits; okay if nullable in DB
          stool: gd.stool ?? null,
          appetite: gd.appetite ?? null,
          notes: gd.notes ?? null,
          confirmation_checked: !!gd.confirmationChecked,
        };
      });

      // If your schema has NOT NULL on goat_id, drop any without an id
      const obsClean = obs.filter((o) => o.goat_id);

      if (obsClean.length) {
        const { error: obsErr } = await supabase
          .from("goat_observations")
          .insert(obsClean);
        if (obsErr) throw obsErr;
      }

      alert(t("submissionSuccess"));
      // navigate("/") // optional
    } catch (e) {
      console.error("Submit error:", e);
      alert(t("submissionError"));
    }
  };

  // ---- UI -------------------------------------------------------------------
  const renderGoatCards = () => {
    const items = goatsList.length ? goatsList : legacyGoats;

    return items.map((g) => {
      const gd =
        goatsList.length > 0
          ? goatsObj[g.id] || {}
          : (formData.goats?.[g.id] || {});
      const displayName =
        g.name ||
        (g.id === "goatA" ? t("goatKai") : g.id === "goatB" ? t("goatMayu") : t("goat"));

      return (
        <Card key={g.id}>
          <h2 style={{ fontWeight: "bold" }}>{displayName}</h2>
          <p>
            {t("stoolCondition")}: {t(gd.stool || "N/A")}
          </p>
          <p>
            {t("appetite")}: {t(gd.appetite || "N/A")}
          </p>
          <button
            onClick={() => navigate("/goat-form")}
            className="edit-button"
          >
            ✏️ {t("edit")}
          </button>
        </Card>
      );
    });
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
      }}
    >
      <Navbar />
      <div style={{ height: "80px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("review")}
      </h1>

      {/* 📌 Basic Info */}
      <Card>
        <h2 style={{ fontWeight: "bold" }}>{t("basicInfo")}</h2>
        <p>
          {t("caretakerName")}: {caretakerName}
        </p>
        <p>
          {t("date")}: {formData.date || new Date().toISOString().split("T")[0]}
        </p>
        <p>
          {t("temperature")}: {outdoorTemp} °C
        </p>
        <p>
          {t("weatherCondition")}: {weatherCondition}
        </p>
        <button onClick={() => navigate("/basic-info")} className="edit-button">
          ✏️ {t("edit")}
        </button>
      </Card>

      {/* 🐐 Goat Info (dynamic) */}
      {renderGoatCards()}

      {/* ✅ Task Checklist */}
      <Card>
        <h2 style={{ fontWeight: "bold" }}>{t("taskChecklist")}</h2>
        <p>
          {t("changedWater")}: {tasks.waterChanged ? "✅" : "❌"}
        </p>
        <p>
          {t("cleanedShelter")}: {tasks.shelterCleaned ? "✅" : "❌"}
        </p>
        <p>
          {t("electricFence")}: {tasks.electricFenceOn ? "✅" : "❌"}
        </p>
        <p>
          {t("setElectricFenceVoltage")}:{" "}
          {tasks.setElectricFenceVoltage ? "✅" : "❌"}
        </p>
        <button onClick={() => navigate("/task-checklist")} className="edit-button">
          ✏️ {t("edit")}
        </button>
      </Card>

      {/* 📝 General Notes */}
      <Card>
        <h2 style={{ fontWeight: "bold" }}>{t("generalNotes")}</h2>
        <p>{generalNotes}</p>
        <button onClick={() => navigate("/general-notes")} className="edit-button">
          ✏️ {t("edit")}
        </button>
      </Card>

      {/* 🔙 Back & 🚀 Submit */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <button
          onClick={() => navigate("/general-notes")}
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
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#357ABD")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a90e2")
          }
        >
          ⬅️ {t("back")}
        </button>

        <button
          onClick={handleSubmit}
          disabled={!isFormComplete}
          style={{
            padding: "12px 24px",
            backgroundColor: isFormComplete ? "#2ecc71" : "#ccc",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: isFormComplete ? "pointer" : "not-allowed",
            transition: "0.3s",
            fontSize: "1rem",
          }}
          onMouseOver={(e) => {
            if (isFormComplete)
              e.currentTarget.style.backgroundColor = "#27ae60";
          }}
          onMouseOut={(e) => {
            if (isFormComplete)
              e.currentTarget.style.backgroundColor = "#2ecc71";
          }}
        >
          ✅ {t("submit")}
        </button>
      </div>
    </div>
  );
}



// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { supabase } from "../services/supabaseClient"; // ✅ Import Supabase client
// import Card from "../components/Card"; // ✅ Import Card component

// export default function Review({ formData = {}, handleChange }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   console.log("Review: formData =", formData);

//   // Ensure formData is always defined
//   const caretakerName = formData.caretaker_name || "";
//   const outdoorTemp = formData.outdoor_temperature || "N/A";
//   const weatherCondition = formData.weather_condition || t("noData");
//   const generalNotes = formData.general_notes || t("noAdditionalNotes");

//   // Ensure tasks and goats are defined
//   const tasks = formData.tasks || {};
//   const goats = formData.goats || { goatA: {}, goatB: {} };

//   // const isTempOutOfRange = (temperature) => {
//   //   const temp = parseFloat(temperature);
//   //   return temp < 38.5 || temp > 40.5;
//   // };

//   // ✅ Check if form is complete for submission
//   const isFormComplete =
//     caretakerName &&
//     outdoorTemp !== "N/A" &&
//     weatherCondition !== t("noData") &&
//     // goats.goatA.temperature &&
//     goats.goatA.stool &&
//     goats.goatA.appetite &&
//     // goats.goatB.temperature &&
//     goats.goatB.stool &&
//     goats.goatB.appetite &&
//     tasks.waterChanged &&
//     tasks.shelterCleaned &&
//     tasks.electricFenceOn &&
//     tasks.setElectricFenceVoltage;
//     // &&
//     // (!isTempOutOfRange(goats.goatA.temperature) || goats.goatA.confirmationChecked) &&
//     // (!isTempOutOfRange(goats.goatB.temperature) || goats.goatB.confirmationChecked);

//     // const handleSubmit = async () => {
//     //     console.log("Submitting Form Data:", formData);
        
//     //     // Ensure date is properly formatted, fallback to today if empty
//     //     const formattedDate = formData.date ? formData.date : new Date().toISOString().split("T")[0];

//     //     const { data, error } = await supabase.from("goat_reports").insert([
//     //     {
//     //         caretaker_name: formData.caretaker_name,
//     //         date: formattedDate,
//     //         outdoor_temperature: formData.outdoor_temperature,
//     //         weather_condition: formData.weather_condition,
//     //         weather_code: formData.weather_code,
//     //         general_notes: formData.general_notes,
    
//     //         // goat_a_temperature: formData.goats.goatA.temperature,
//     //         goat_a_stool_condition: formData.goats.goatA.stool,
//     //         goat_a_appetite: formData.goats.goatA.appetite,
//     //         goat_a_notes: formData.goats.goatA.notes,
//     //         // goat_a_confirmation_checked: formData.goats.goatA.confirmationChecked,
    
//     //         // goat_b_temperature: formData.goats.goatB.temperature,
//     //         goat_b_stool_condition: formData.goats.goatB.stool,
//     //         goat_b_appetite: formData.goats.goatB.appetite,
//     //         goat_b_notes: formData.goats.goatB.notes,
//     //         // goat_b_confirmation_checked: formData.goats.goatB.confirmationChecked,
    
//     //         water_changed: formData.tasks.waterChanged,
//     //         shelter_cleaned: formData.tasks.shelterCleaned,
//     //         electric_fence_on: formData.tasks.electricFenceOn,
//     //         set_electric_fence_voltage: formData.tasks.setElectricFenceVoltage, // ✅ New column!
//     //     },
//     //     ]);
    
//     //     if (error) {
//     //     console.error("Supabase Insert Error:", error);
//     //     alert(t("submissionError"));
//     //     } else {
//     //     console.log("Report Submitted Successfully:", data);
//     //     alert(t("submissionSuccess"));
//     //     }
//     // };
//     const handleSubmit = async () => {
//       try {
//         // 1) Insert the parent report (with site_id if you have it in formData)
//         const formattedDate =
//           formData.date ? formData.date : new Date().toISOString().split("T")[0];

//         const { data: reportRows, error: repErr } = await supabase
//           .from("goat_reports")
//           .insert([{
//             site_id: formData.site_id || null,              // <-- important
//             caretaker_name: formData.caretaker_name,
//             date: formattedDate,
//             outdoor_temperature: formData.outdoor_temperature,
//             weather_condition: formData.weather_condition,
//             weather_code: formData.weather_code,
//             general_notes: formData.general_notes,
//             water_changed: formData.tasks?.waterChanged ?? false,
//             shelter_cleaned: formData.tasks?.shelterCleaned ?? false,
//             electric_fence_on: formData.tasks?.electricFenceOn ?? false,
//             set_electric_fence_voltage: formData.tasks?.setElectricFenceVoltage ?? false,
//           }])
//           .select("id")
//           .single();

//         if (repErr) throw repErr;
//         const reportId = reportRows.id;

//         // 2) Fetch goats for this site and build a name -> id map
//         let goatMap = new Map();
//         if (formData.site_id) {
//           const { data: goats, error: goatsErr } = await supabase
//             .from("goats")
//             .select("id, name")
//             .eq("site_id", formData.site_id);

//           if (goatsErr) throw goatsErr;
//           (goats || []).forEach(g =>
//             goatMap.set(String(g.name).trim().toLowerCase(), g.id)
//           );
//         }

//         // helper to resolve a label like "Kai"/"Mayu" to an id
//         const resolveGoatId = (label) =>
//           goatMap.get(String(label).trim().toLowerCase()) || null;

//         // 3) Build observations from your current two-goat form
//         const obs = [];
//         // Goat A
//         {
//           const g = formData.goats?.goatA || {};
//           const label = "Kai"; // your current assumption; later you can source this from DB/UI
//           obs.push({
//             report_id: reportId,
//             goat_id: resolveGoatId(label),  // <-- FK to goats.id
//             goat_label: label,              // keep for now; you can drop later
//             stool: g.stool ?? null,
//             appetite: g.appetite ?? null,
//             notes: g.notes ?? null,
//             confirmation_checked: !!g.confirmationChecked,
//           });
//         }
//         // Goat B
//         {
//           const g = formData.goats?.goatB || {};
//           const label = "Mayu";
//           obs.push({
//             report_id: reportId,
//             goat_id: resolveGoatId(label),
//             goat_label: label,
//             stool: g.stool ?? null,
//             appetite: g.appetite ?? null,
//             notes: g.notes ?? null,
//             confirmation_checked: !!g.confirmationChecked,
//           });
//         }

//         // 4) Optional: warn if any goat_id couldn't be resolved
//         if (obs.some(o => !o.goat_id)) {
//           console.warn("Some observations missing goat_id. Check goat names / site mapping.");
//           // You can choose to throw here to prevent partial data:
//           // throw new Error("Unknown goat name for this site.");
//         }

//         // 5) Insert observations
//         const { error: obsErr } = await supabase
//           .from("goat_observations")
//           .insert(obs);

//         if (obsErr) throw obsErr;

//         alert(t("submissionSuccess"));
//         // navigate("/") // if you want to return home
//       } catch (e) {
//         console.error("Submit error:", e);
//         alert(t("submissionError"));
//       }
//     };


//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)", width: "100%" }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       {/* Add padding to prevent navbar overlap */}
//       <div style={{ height: "80px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>{t("review")}</h1>

//       {/* 📌 Basic Info */}
//       <Card>
//         <h2 style={{ fontWeight: "bold" }}>{t("basicInfo")}</h2>
//         <p>{t("caretakerName")}: {caretakerName}</p>
//         {/* <p>{t("date")}: {formData.date || "N/A"}</p> ✅ Added Date Field */}
//         <p>{t("date")}: {formData.date || new Date().toISOString().split("T")[0]}</p> {/* ✅ Fix here */}
  
//         <p>{t("temperature")}: {outdoorTemp} °C</p>
//         <p>{t("weatherCondition")}: {weatherCondition}</p>
//         <button onClick={() => navigate("/basic-info")} className="edit-button">✏️ {t("edit")}</button>
//       </Card>

//       {/* 🐐 Goat Info */}
//       {["goatA", "goatB"].map((goat, index) => (
//         <Card key={goat}>
//           {/* <h2 style={{ fontWeight: "bold" }}>{t("goatInfo", { id: index === 0 ? "A" : "B" })}</h2> */}
//           <h2 style={{ fontWeight: "bold" }}>
//             {index === 0 ? t("goatKai") : t("goatMayu")}
//           </h2>
//           {/* <p>{t("bodyTemp")}: {goats[goat].temperature || "N/A"} °C</p> */}
//           <p>{t("stoolCondition")}: {t(goats[goat].stool || "N/A")}</p>
//           <p>{t("appetite")}: {t(goats[goat].appetite || "N/A")}</p>
//           {/* <p style={{ color: isTempOutOfRange(goats[goat].temperature) ? "red" : "green", fontWeight: "bold" }}>
//             {isTempOutOfRange(goats[goat].temperature)
//               ? (goats[goat].confirmationChecked ? t("verifiedByCaretaker") : t("notVerifiedPleaseConfirm"))
//               : t("withinNormalRange")}
//           </p> */}
//           <button onClick={() => navigate(`/goat-form?goat=${index === 0 ? "A" : "B"}`)} className="edit-button">✏️ {t("edit")}</button>
//         </Card>
//       ))}

//       {/* ✅ Task Checklist */}
//       <Card>
//         <h2 style={{ fontWeight: "bold" }}>{t("taskChecklist")}</h2>
//         <p>{t("changedWater")}: {tasks.waterChanged ? "✅" : "❌"}</p>
//         <p>{t("cleanedShelter")}: {tasks.shelterCleaned ? "✅" : "❌"}</p>
//         <p>{t("electricFence")}: {tasks.electricFenceOn ? "✅" : "❌"}</p>
//         <p>{t("setElectricFenceVoltage")}: {tasks.setElectricFenceVoltage ? "✅" : "❌"}</p>
//         <button onClick={() => navigate("/task-checklist")} className="edit-button">✏️ {t("edit")}</button>
//       </Card>

//       {/* 📝 General Notes */}
//       <Card>
//         <h2 style={{ fontWeight: "bold" }}>{t("generalNotes")}</h2>
//         <p>{generalNotes}</p>
//         <button onClick={() => navigate("/general-notes")} className="edit-button">✏️ {t("edit")}</button>
//       </Card>

//       {/* ⚠️ Warning Messages */}
//       {/* {(!tasks.waterChanged || !tasks.shelterCleaned || !tasks.electricFenceOn || !tasks.setElectricFenceVoltage) && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("pleaseCompleteChecklist")}</p>
//       )}
//       {isTempOutOfRange(goats.goatA.temperature) && !goats.goatA.confirmationChecked && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatATemp")}</p>
//       )}
//       {isTempOutOfRange(goats.goatB.temperature) && !goats.goatB.confirmationChecked && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatBTemp")}</p>
//       )} */}

//       {/* 🔙 Back & 🚀 Submit Buttons */}
//        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px", width: "100%" }}>
//          <button
//           onClick={() => navigate("/general-notes")}
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

//         <button
//           onClick={handleSubmit}
//           disabled={!isFormComplete}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: isFormComplete ? "#2ecc71" : "#ccc",
//             color: "white",
//             borderRadius: "8px",
//             border: "none",
//             cursor: isFormComplete ? "pointer" : "not-allowed",
//             transition: "0.3s",
//             fontSize: "1rem"
//           }}
//           onMouseOver={(e) => { if (isFormComplete) e.target.style.backgroundColor = "#27ae60"; }}
//           onMouseOut={(e) => { if (isFormComplete) e.target.style.backgroundColor = "#2ecc71"; }}
//         >
//           ✅ {t("submit")}
//         </button>
//       </div>
//     </div>
//   );
// }
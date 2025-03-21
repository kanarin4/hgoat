// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { submitGoatReport } from "../services/goatReports";
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

//   const isTempOutOfRange = (temperature) => {
//     const temp = parseFloat(temperature);
//     return temp < 38.5 || temp > 40.5;
//   };

//   // ✅ Check if form is complete for submission
//   const isFormComplete =
//     caretakerName &&
//     outdoorTemp !== "N/A" &&
//     weatherCondition !== t("noData") &&
//     goats.goatA.temperature &&
//     goats.goatA.stool &&
//     goats.goatA.appetite &&
//     goats.goatB.temperature &&
//     goats.goatB.stool &&
//     goats.goatB.appetite &&
//     tasks.waterChanged &&
//     tasks.shelterCleaned &&
//     tasks.electricFenceOn &&
//     tasks.setElectricFenceVoltage &&
//     (!isTempOutOfRange(goats.goatA.temperature) || goats.goatA.confirmationChecked) &&
//     (!isTempOutOfRange(goats.goatB.temperature) || goats.goatB.confirmationChecked);

//   const handleSubmit = async () => {
//     console.log("Submitting Form Data:", formData);
//     const result = await submitGoatReport(formData);
//     if (result.success) {
//       alert(t("submissionSuccess"));
//     } else {
//       alert(t("submissionError"));
//       console.error(result.error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>{t("review")}</h1>

//       {/* 📌 Basic Info */}
//       <Card>
//         <h2 style={{ fontWeight: "bold" }}>{t("basicInfo")}</h2>
//         <p>{t("caretakerName")}: {caretakerName}</p>
//         <p>{t("temperature")}: {outdoorTemp} °C</p>
//         <p>{t("weatherCondition")}: {weatherCondition}</p>
//         <button onClick={() => navigate("/basic-info")} className="edit-button">✏️ {t("edit")}</button>
//       </Card>

//       {/* 🐐 Goat Info */}
//       {["goatA", "goatB"].map((goat, index) => (
//         <Card key={goat}>
//           <h2 style={{ fontWeight: "bold" }}>{t("goatInfo", { id: index === 0 ? "A" : "B" })}</h2>
//           <p>{t("bodyTemp")}: {goats[goat].temperature || "N/A"} °C</p>
//           <p>{t("stoolCondition")}: {t(goats[goat].stool || "N/A")}</p>
//           <p>{t("appetite")}: {t(goats[goat].appetite || "N/A")}</p>
//           <p className={isTempOutOfRange(goats[goat].temperature) ? "text-red" : "text-green"}>
//             {isTempOutOfRange(goats[goat].temperature)
//               ? (goats[goat].confirmationChecked ? t("verifiedByCaretaker") : t("notVerifiedPleaseConfirm"))
//               : t("withinNormalRange")}
//           </p>
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
//       {(!tasks.waterChanged || !tasks.shelterCleaned || !tasks.electricFenceOn || !tasks.setElectricFenceVoltage) && (
//         <p className="warning-text">{t("pleaseCompleteChecklist")}</p>
//       )}
//       {isTempOutOfRange(goats.goatA.temperature) && !goats.goatA.confirmationChecked && (
//         <p className="warning-text">{t("confirmGoatATemp")}</p>
//       )}
//       {isTempOutOfRange(goats.goatB.temperature) && !goats.goatB.confirmationChecked && (
//         <p className="warning-text">{t("confirmGoatBTemp")}</p>
//       )}

//       {/* 🚀 Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={!isFormComplete}
//         className={`submit-button ${isFormComplete ? "active" : "disabled"}`}
//       >
//         ✅ {t("submit")}
//       </button>
//     </div>
//   );
// }





// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { submitGoatReport } from "../services/goatReports";
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

//   const isTempOutOfRange = (temperature) => {
//     const temp = parseFloat(temperature);
//     return temp < 38.5 || temp > 40.5;
//   };

//   // ✅ Check if form is complete for submission
//   const isFormComplete =
//     caretakerName &&
//     outdoorTemp !== "N/A" &&
//     weatherCondition !== t("noData") &&
//     goats.goatA.temperature &&
//     goats.goatA.stool &&
//     goats.goatA.appetite &&
//     goats.goatB.temperature &&
//     goats.goatB.stool &&
//     goats.goatB.appetite &&
//     tasks.waterChanged &&
//     tasks.shelterCleaned &&
//     tasks.electricFenceOn &&
//     tasks.setElectricFenceVoltage &&
//     (!isTempOutOfRange(goats.goatA.temperature) || goats.goatA.confirmationChecked) &&
//     (!isTempOutOfRange(goats.goatB.temperature) || goats.goatB.confirmationChecked);

//   const handleSubmit = async () => {
//     console.log("Submitting Form Data:", formData);
//     const result = await submitGoatReport(formData);
//     if (result.success) {
//       alert(t("submissionSuccess"));
//     } else {
//       alert(t("submissionError"));
//       console.error(result.error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fafb", width: "100%" }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>{t("review")}</h1>

//       {/* 📌 Basic Info */}
//       <Card>
//         <h2 style={{ fontWeight: "bold" }}>{t("basicInfo")}</h2>
//         <p>{t("caretakerName")}: {caretakerName}</p>
//         <p>{t("temperature")}: {outdoorTemp} °C</p>
//         <p>{t("weatherCondition")}: {weatherCondition}</p>
//         <button onClick={() => navigate("/basic-info")} className="edit-button">✏️ {t("edit")}</button>
//       </Card>

//       {/* 🐐 Goat Info */}
//       {["goatA", "goatB"].map((goat, index) => (
//         <Card key={goat}>
//           <h2 style={{ fontWeight: "bold" }}>{t("goatInfo", { id: index === 0 ? "A" : "B" })}</h2>
//           <p>{t("bodyTemp")}: {goats[goat].temperature || "N/A"} °C</p>
//           <p>{t("stoolCondition")}: {t(goats[goat].stool || "N/A")}</p>
//           <p>{t("appetite")}: {t(goats[goat].appetite || "N/A")}</p>
//           <p style={{ color: isTempOutOfRange(goats[goat].temperature) ? "red" : "green", fontWeight: "bold" }}>
//             {isTempOutOfRange(goats[goat].temperature)
//               ? (goats[goat].confirmationChecked ? t("verifiedByCaretaker") : t("notVerifiedPleaseConfirm"))
//               : t("withinNormalRange")}
//           </p>
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
//       {(!tasks.waterChanged || !tasks.shelterCleaned || !tasks.electricFenceOn || !tasks.setElectricFenceVoltage) && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("pleaseCompleteChecklist")}</p>
//       )}
//       {isTempOutOfRange(goats.goatA.temperature) && !goats.goatA.confirmationChecked && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatATemp")}</p>
//       )}
//       {isTempOutOfRange(goats.goatB.temperature) && !goats.goatB.confirmationChecked && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatBTemp")}</p>
//       )}

//       {/* 🔙 Back & 🚀 Submit Buttons */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px", width: "100%" }}>
//         <button
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











// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { submitGoatReport } from "../services/goatReports";
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

//   const isTempOutOfRange = (temperature) => {
//     const temp = parseFloat(temperature);
//     return temp < 38.5 || temp > 40.5;
//   };

//   // ✅ Check if form is complete for submission
//   const isFormComplete =
//     caretakerName &&
//     outdoorTemp !== "N/A" &&
//     weatherCondition !== t("noData") &&
//     goats.goatA.temperature &&
//     goats.goatA.stool &&
//     goats.goatA.appetite &&
//     goats.goatB.temperature &&
//     goats.goatB.stool &&
//     goats.goatB.appetite &&
//     tasks.waterChanged &&
//     tasks.shelterCleaned &&
//     tasks.electricFenceOn &&
//     tasks.setElectricFenceVoltage &&
//     (!isTempOutOfRange(goats.goatA.temperature) || goats.goatA.confirmationChecked) &&
//     (!isTempOutOfRange(goats.goatB.temperature) || goats.goatB.confirmationChecked);

//   const handleSubmit = async () => {
//     console.log("Submitting Form Data:", formData);
//     const result = await submitGoatReport(formData);
//     if (result.success) {
//       alert(t("submissionSuccess"));
//     } else {
//       alert(t("submissionError"));
//       console.error(result.error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fafb", width: "100%" }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       {/* Add padding to prevent navbar overlap */}
//       <div style={{ height: "80px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>{t("review")}</h1>

//       {/* 📌 Basic Info */}
//       <Card>
//         <h2 style={{ fontWeight: "bold" }}>{t("basicInfo")}</h2>
//         <p>{t("caretakerName")}: {caretakerName}</p>
//         <p>{t("temperature")}: {outdoorTemp} °C</p>
//         <p>{t("weatherCondition")}: {weatherCondition}</p>
//         <button onClick={() => navigate("/basic-info")} className="edit-button">✏️ {t("edit")}</button>
//       </Card>

//       {/* 🐐 Goat Info */}
//       {["goatA", "goatB"].map((goat, index) => (
//         <Card key={goat}>
//           <h2 style={{ fontWeight: "bold" }}>{t("goatInfo", { id: index === 0 ? "A" : "B" })}</h2>
//           <p>{t("bodyTemp")}: {goats[goat].temperature || "N/A"} °C</p>
//           <p>{t("stoolCondition")}: {t(goats[goat].stool || "N/A")}</p>
//           <p>{t("appetite")}: {t(goats[goat].appetite || "N/A")}</p>
//           <p style={{ color: isTempOutOfRange(goats[goat].temperature) ? "red" : "green", fontWeight: "bold" }}>
//             {isTempOutOfRange(goats[goat].temperature)
//               ? (goats[goat].confirmationChecked ? t("verifiedByCaretaker") : t("notVerifiedPleaseConfirm"))
//               : t("withinNormalRange")}
//           </p>
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
//       {(!tasks.waterChanged || !tasks.shelterCleaned || !tasks.electricFenceOn || !tasks.setElectricFenceVoltage) && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("pleaseCompleteChecklist")}</p>
//       )}
//       {isTempOutOfRange(goats.goatA.temperature) && !goats.goatA.confirmationChecked && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatATemp")}</p>
//       )}
//       {isTempOutOfRange(goats.goatB.temperature) && !goats.goatB.confirmationChecked && (
//         <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatBTemp")}</p>
//       )}

//       {/* 🔙 Back & 🚀 Submit Buttons */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px", width: "100%" }}>
//         <button
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













import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../services/supabaseClient"; // ✅ Import Supabase client
import Card from "../components/Card"; // ✅ Import Card component

export default function Review({ formData = {}, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  console.log("Review: formData =", formData);

  // Ensure formData is always defined
  const caretakerName = formData.caretaker_name || "";
  const outdoorTemp = formData.outdoor_temperature || "N/A";
  const weatherCondition = formData.weather_condition || t("noData");
  const generalNotes = formData.general_notes || t("noAdditionalNotes");

  // Ensure tasks and goats are defined
  const tasks = formData.tasks || {};
  const goats = formData.goats || { goatA: {}, goatB: {} };

  const isTempOutOfRange = (temperature) => {
    const temp = parseFloat(temperature);
    return temp < 38.5 || temp > 40.5;
  };

  // ✅ Check if form is complete for submission
  const isFormComplete =
    caretakerName &&
    outdoorTemp !== "N/A" &&
    weatherCondition !== t("noData") &&
    goats.goatA.temperature &&
    goats.goatA.stool &&
    goats.goatA.appetite &&
    goats.goatB.temperature &&
    goats.goatB.stool &&
    goats.goatB.appetite &&
    tasks.waterChanged &&
    tasks.shelterCleaned &&
    tasks.electricFenceOn &&
    tasks.setElectricFenceVoltage &&
    (!isTempOutOfRange(goats.goatA.temperature) || goats.goatA.confirmationChecked) &&
    (!isTempOutOfRange(goats.goatB.temperature) || goats.goatB.confirmationChecked);

  // ✅ Submit form data to Supabase
//   const handleSubmit = async () => {
//     console.log("Submitting Form Data:", formData);

//     const { data, error } = await supabase.from("goat_reports").insert([
//       {
//         caretaker_name: caretakerName,
//         outdoor_temperature: outdoorTemp,
//         weather_condition: weatherCondition,
//         general_notes: generalNotes,
//         tasks: tasks,
//         goatA: goats.goatA,
//         goatB: goats.goatB,
//         submitted_at: new Date().toISOString()
//       }
//     ]);

    const handleSubmit = async () => {
        console.log("Submitting Form Data:", formData);
        
        // Ensure date is properly formatted, fallback to today if empty
        const formattedDate = formData.date ? formData.date : new Date().toISOString().split("T")[0];

        const { data, error } = await supabase.from("goat_reports").insert([
        {
            caretaker_name: formData.caretaker_name,
            date: formattedDate,
            outdoor_temperature: formData.outdoor_temperature,
            weather_condition: formData.weather_condition,
            weather_code: formData.weather_code,
            general_notes: formData.general_notes,
    
            goat_a_temperature: formData.goats.goatA.temperature,
            goat_a_stool_condition: formData.goats.goatA.stool,
            goat_a_appetite: formData.goats.goatA.appetite,
            goat_a_notes: formData.goats.goatA.notes,
            goat_a_confirmation_checked: formData.goats.goatA.confirmationChecked,
    
            goat_b_temperature: formData.goats.goatB.temperature,
            goat_b_stool_condition: formData.goats.goatB.stool,
            goat_b_appetite: formData.goats.goatB.appetite,
            goat_b_notes: formData.goats.goatB.notes,
            goat_b_confirmation_checked: formData.goats.goatB.confirmationChecked,
    
            water_changed: formData.tasks.waterChanged,
            shelter_cleaned: formData.tasks.shelterCleaned,
            electric_fence_on: formData.tasks.electricFenceOn,
            set_electric_fence_voltage: formData.tasks.setElectricFenceVoltage, // ✅ New column!
        },
        ]);
    
        if (error) {
        console.error("Supabase Insert Error:", error);
        alert(t("submissionError"));
        } else {
        console.log("Report Submitted Successfully:", data);
        alert(t("submissionSuccess"));
        }
    };


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fafb", width: "100%" }}>
      {/* 🏠 Navbar */}
      <Navbar />

      {/* Add padding to prevent navbar overlap */}
      <div style={{ height: "80px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>{t("review")}</h1>

      {/* 📌 Basic Info */}
      <Card>
        <h2 style={{ fontWeight: "bold" }}>{t("basicInfo")}</h2>
        <p>{t("caretakerName")}: {caretakerName}</p>
        <p>{t("temperature")}: {outdoorTemp} °C</p>
        <p>{t("weatherCondition")}: {weatherCondition}</p>
        <button onClick={() => navigate("/basic-info")} className="edit-button">✏️ {t("edit")}</button>
      </Card>

      {/* 🐐 Goat Info */}
      {["goatA", "goatB"].map((goat, index) => (
        <Card key={goat}>
          <h2 style={{ fontWeight: "bold" }}>{t("goatInfo", { id: index === 0 ? "A" : "B" })}</h2>
          <p>{t("bodyTemp")}: {goats[goat].temperature || "N/A"} °C</p>
          <p>{t("stoolCondition")}: {t(goats[goat].stool || "N/A")}</p>
          <p>{t("appetite")}: {t(goats[goat].appetite || "N/A")}</p>
          <p style={{ color: isTempOutOfRange(goats[goat].temperature) ? "red" : "green", fontWeight: "bold" }}>
            {isTempOutOfRange(goats[goat].temperature)
              ? (goats[goat].confirmationChecked ? t("verifiedByCaretaker") : t("notVerifiedPleaseConfirm"))
              : t("withinNormalRange")}
          </p>
          <button onClick={() => navigate(`/goat-form?goat=${index === 0 ? "A" : "B"}`)} className="edit-button">✏️ {t("edit")}</button>
        </Card>
      ))}

      {/* ✅ Task Checklist */}
      <Card>
        <h2 style={{ fontWeight: "bold" }}>{t("taskChecklist")}</h2>
        <p>{t("changedWater")}: {tasks.waterChanged ? "✅" : "❌"}</p>
        <p>{t("cleanedShelter")}: {tasks.shelterCleaned ? "✅" : "❌"}</p>
        <p>{t("electricFence")}: {tasks.electricFenceOn ? "✅" : "❌"}</p>
        <p>{t("setElectricFenceVoltage")}: {tasks.setElectricFenceVoltage ? "✅" : "❌"}</p>
        <button onClick={() => navigate("/task-checklist")} className="edit-button">✏️ {t("edit")}</button>
      </Card>

      {/* 📝 General Notes */}
      <Card>
        <h2 style={{ fontWeight: "bold" }}>{t("generalNotes")}</h2>
        <p>{generalNotes}</p>
        <button onClick={() => navigate("/general-notes")} className="edit-button">✏️ {t("edit")}</button>
      </Card>

      {/* ⚠️ Warning Messages */}
      {(!tasks.waterChanged || !tasks.shelterCleaned || !tasks.electricFenceOn || !tasks.setElectricFenceVoltage) && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("pleaseCompleteChecklist")}</p>
      )}
      {isTempOutOfRange(goats.goatA.temperature) && !goats.goatA.confirmationChecked && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatATemp")}</p>
      )}
      {isTempOutOfRange(goats.goatB.temperature) && !goats.goatB.confirmationChecked && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>{t("confirmGoatBTemp")}</p>
      )}

      {/* 🔙 Back & 🚀 Submit Buttons */}
       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px", width: "100%" }}>
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
            fontSize: "1rem"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}
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
            fontSize: "1rem"
          }}
          onMouseOver={(e) => { if (isFormComplete) e.target.style.backgroundColor = "#27ae60"; }}
          onMouseOut={(e) => { if (isFormComplete) e.target.style.backgroundColor = "#2ecc71"; }}
        >
          ✅ {t("submit")}
        </button>
      </div>
    </div>
  );
}
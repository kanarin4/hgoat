

// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function TaskChecklist({ formData = {}, handleChange }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   // Ensure formData.tasks is always defined
//   const tasks = formData.tasks || {
//     waterChanged: false,
//     shelterCleaned: false,
//     electricFenceOn: false,
//     setElectricFenceVoltage: false, // ✅ New Task Added
//   };

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       minHeight: "100vh",
//       backgroundColor: "#f9fafb"
//     }}>
//       {/* 🏠 Navbar */}
//       <Navbar />

//       {/* Empty space to prevent content from being covered by navbar */}
//       <div style={{ height: "60px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("taskChecklist")}
//       </h1>

//       {/* ✅ Task Checklist */}
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "start",
//         gap: "15px",
//         width: "80%",
//         maxWidth: "500px"
//       }}>
//         <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
//           {t("tasksCompleted")}
//         </label>

//         {[
//           { id: "waterChanged", label: t("changedWater") },
//           { id: "shelterCleaned", label: t("cleanedShelter") },
//           { id: "electricFenceOn", label: t("electricFence") },
//           { id: "setElectricFenceVoltage", label: t("setElectricFenceVoltage") } // ✅ New Checkbox
//         ].map(task => (
//           <label key={task.id} style={{ display: "flex", alignItems: "center" }}>
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
//       </div>

//       {/* 🏠 Back to Goat B Form */}
//       <button 
//         onClick={() => navigate("/goat-form?goat=B")}
//         style={{
//           padding: "12px 24px",
//           backgroundColor: "#4a90e2",
//           color: "white",
//           borderRadius: "8px",
//           border: "none",
//           cursor: "pointer",
//           transition: "0.3s",
//           fontSize: "1rem",
//           marginTop: "20px",
//           marginBottom: "20px"
//         }}
//         onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
//         onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
//         ⬅️ {t("back")}
//       </button>

//       {/* ➡️ Next to General Notes */}
//       <button 
//         onClick={() => navigate("/general-notes")}
//         style={{
//           padding: "12px 24px",
//           backgroundColor: "#2ecc71",
//           color: "white",
//           borderRadius: "8px",
//           border: "none",
//           cursor: "pointer",
//           transition: "0.3s",
//           fontSize: "1rem"
//         }}
//         onMouseOver={(e) => e.target.style.backgroundColor = "#27ae60"}
//         onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}>
//         ➡️ {t("next")}
//       </button>
//     </div>
//   );
// }







// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card"; // ✅ Import Card component

// export default function TaskChecklist({ formData = {}, handleChange }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   // Ensure formData.tasks is always defined
//   const tasks = formData.tasks || {
//     waterChanged: false,
//     shelterCleaned: false,
//     electricFenceOn: false,
//     setElectricFenceVoltage: false, // ✅ New Task Added
//   };

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       minHeight: "100vh",
//       backgroundColor: "#f9fafb"
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
//         {/* ⬅️ Back Button */}
//         <button 
//           onClick={() => navigate("/goat-form?goat=B")}
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

//         {/* ➡️ Next Button */}
//         <button 
//           onClick={() => navigate("/general-notes")}
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
//     </div>
//   );
// }













import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import Card component

export default function TaskChecklist({ formData = {}, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false); // ✅ Toggle guide visibility

  // Ensure formData.tasks is always defined
  const tasks = formData.tasks || {
    waterChanged: false,
    shelterCleaned: false,
    electricFenceOn: false,
    setElectricFenceVoltage: false, // ✅ New Task Added
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb"
    }}>
      {/* 🏠 Navbar */}
      <Navbar />

      {/* Empty space to prevent content from being covered by navbar */}
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
          { id: "turnedOnElectricFenceOn", label: t("electricFence") },
          { id: "setElectricFenceVoltage", label: t("setElectricFenceVoltage") } // ✅ New Checkbox
        ].map(task => (
          <label key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="checkbox"
              id={task.id}
              checked={tasks[task.id]} // ✅ Use `tasks` instead of `formData.tasks`
              onChange={(e) => handleChange("tasks", task.id, e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            {task.label}
          </label>
        ))}
      </Card>

      {/* 🔄 Navigation Buttons */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        {/* ⬅️ Back Button */}
        <button 
          onClick={() => navigate("/goat-form?goat=B")}
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

        {/* ➡️ Next Button */}
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
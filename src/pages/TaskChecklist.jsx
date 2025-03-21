// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import StepNavigation from "../components/StepNavigation";

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

//       {/* 🔄 Step Navigation */}
//       <StepNavigation
//         prevPage={() => navigate("/goat-form?goat=B")}
//         nextPage={() => navigate("/general-notes")}
//       />
//     </div>
//   );
// }




import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TaskChecklist({ formData = {}, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

      {/* ✅ Task Checklist */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "15px",
        width: "80%",
        maxWidth: "500px"
      }}>
        <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {t("tasksCompleted")}
        </label>

        {[
          { id: "waterChanged", label: t("changedWater") },
          { id: "shelterCleaned", label: t("cleanedShelter") },
          { id: "electricFenceOn", label: t("electricFence") },
          { id: "setElectricFenceVoltage", label: t("setElectricFenceVoltage") } // ✅ New Checkbox
        ].map(task => (
          <label key={task.id} style={{ display: "flex", alignItems: "center" }}>
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
      </div>

      {/* 🏠 Back to Goat B Form */}
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
          fontSize: "1rem",
          marginTop: "20px",
          marginBottom: "20px"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
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
        onMouseOut={(e) => e.target.style.backgroundColor = "#2ecc71"}>
        ➡️ {t("next")}
      </button>
    </div>
  );
}
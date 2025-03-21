





// import { useTranslation } from "react-i18next";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";

// export default function GoatForm({ formData, handleChange }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 🐐 Get goat ID from URL query params
//   const searchParams = new URLSearchParams(location.search);
//   const goatId = searchParams.get("goat") === "B" ? "B" : "A"; // Default to A if missing/invalid
//   const formKey = goatId === "A" ? "goatA" : "goatB";

//   // 🛠 Debugging: Log formData
//   console.log("GoatForm: formData =", formData);

//   // 🛠 Ensure `formData.goats` exists before accessing it
//   if (!formData || !formData.goats) {
//     console.warn("🚨 formData.goats is undefined!");
//     return <div>Loading...</div>; // Prevents crashing while state initializes
//   }

//   // ✅ Ensure goatData always exists
//   const goatData = formData.goats[formKey] || {
//     temperature: "",
//     stool: "",
//     appetite: "",
//     notes: "",
//     confirmationChecked: false,
//   };

//   const [confirmationChecked, setConfirmationChecked] = useState(goatData.confirmationChecked || false);

//   // 🔄 Check if temperature is out of range
//   const isTempOutOfRange = (temperature) => {
//     const temp = parseFloat(temperature);
//     return temp < 38.5 || temp > 40.5;
//   };

//   // 🔄 Handle Temperature Input Change
//   const handleTempChange = (e) => {
//     const value = e.target.value;
//     handleChange("goats", "temperature", value, formKey);

//     // Reset confirmation checkbox if temperature changes
//     setConfirmationChecked(false);
//     handleChange("goats", "confirmationChecked", false, formKey);
//   };

//   // 🔄 Handle Checkbox Change
//   const handleCheckboxChange = (e) => {
//     const checked = e.target.checked;
//     setConfirmationChecked(checked);
//     handleChange("goats", "confirmationChecked", checked, formKey);
//   };

//   // ✅ Ensure confirmation checkbox resets when temperature changes
//   useEffect(() => {
//     if (!isTempOutOfRange(goatData.temperature) && confirmationChecked) {
//       setConfirmationChecked(false);
//       handleChange("goats", "confirmationChecked", false, formKey);
//     }
//   }, [goatData.temperature, confirmationChecked, handleChange, formKey]);

//   // **🔄 Navigation Functions**
//   const goToPrevious = () => {
//     navigate(goatId === "B" ? "/goat-form?goat=A" : "/basic-info");
//   };

//   const goToNext = () => {
//     navigate(goatId === "A" ? "/goat-form?goat=B" : "/task-checklist");
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
//       <Navbar />
//       <div style={{ height: "60px" }}></div>

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {t("goatInfo", { id: goatId })}
//       </h1>

//       {/* 🐐 Temperature */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">{t("bodyTemp")}:</label>
//         <input
//           type="number"
//           value={goatData.temperature}
//           onChange={handleTempChange}
//           placeholder="e.g., 38.5~40.5"
//           className="w-full p-2 border rounded"
//           step="0.1"
//         />
//         <div className="mt-2">
//           <label htmlFor={`confirmCheck-${formKey}`} className="flex items-center">
//             <input
//               type="checkbox"
//               id={`confirmCheck-${formKey}`}
//               checked={confirmationChecked}
//               onChange={handleCheckboxChange}
//               disabled={!isTempOutOfRange(goatData.temperature)}
//               className="mr-2"
//             />
//             <span style={{ color: !isTempOutOfRange(goatData.temperature) ? "#9CA3AF" : "#EF4444", fontWeight: "bold" }}>
//               {t("tempOutsideRangeWarning")}
//             </span>
//           </label>
//         </div>
//       </div>

//       {/* 💩 Stool */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">{t("stoolCondition")}:</label>
//         {["good", "soft", "hard"].map((option) => (
//           <label key={option} className="flex items-center">
//             <input
//               type="radio"
//               name={`stool-${formKey}`}
//               value={option}
//               checked={goatData.stool === option}
//               onChange={(e) => handleChange("goats", "stool", e.target.value, formKey)}
//               className="mr-2"
//             />
//             {t(option)}
//           </label>
//         ))}
//       </div>

//       {/* 🍽️ Appetite */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">{t("appetite")}:</label>
//         {["good", "normal", "poor"].map((option) => (
//           <label key={option} className="flex items-center">
//             <input
//               type="radio"
//               name={`appetite-${formKey}`}
//               value={option}
//               checked={goatData.appetite === option}
//               onChange={(e) => handleChange("goats", "appetite", e.target.value, formKey)}
//               className="mr-2"
//             />
//             {t(option)}
//           </label>
//         ))}
//       </div>

//       {/* 📝 Notes */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">{t("additionalNotes")}:</label>
//         <textarea
//           value={goatData.notes}
//           onChange={(e) => handleChange("goats", "notes", e.target.value, formKey)}
//           placeholder={t("additionalNotes")}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* 🔄 Navigation */}
//       <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
//         <button
//           onClick={goToPrevious}
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
//         >
//           ⬅️ {t("back")}
//         </button>

//         <button
//           onClick={goToNext}
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
//         >
//           ➡️ {t("next")}
//         </button>
//       </div>
//     </div>
//   );
// }









import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import Card component

export default function GoatForm({ formData, handleChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 🐐 Get goat ID from URL query params
  const searchParams = new URLSearchParams(location.search);
  const goatId = searchParams.get("goat") === "B" ? "B" : "A"; // Default to A if missing/invalid
  const formKey = goatId === "A" ? "goatA" : "goatB";

  // 🛠 Debugging: Log formData
  console.log("GoatForm: formData =", formData);

  // 🛠 Ensure `formData.goats` exists before accessing it
  if (!formData || !formData.goats) {
    console.warn("🚨 formData.goats is undefined!");
    return <div>Loading...</div>; // Prevents crashing while state initializes
  }

  // ✅ Ensure goatData always exists
  const goatData = formData.goats[formKey] || {
    temperature: "",
    stool: "",
    appetite: "",
    notes: "",
    confirmationChecked: false,
  };

  const [confirmationChecked, setConfirmationChecked] = useState(goatData.confirmationChecked || false);

  // 🔄 Check if temperature is out of range
  const isTempOutOfRange = (temperature) => {
    const temp = parseFloat(temperature);
    return temp < 38.5 || temp > 40.5;
  };

  // 🔄 Handle Temperature Input Change
  const handleTempChange = (e) => {
    const value = e.target.value;
    handleChange("goats", "temperature", value, formKey);

    // Reset confirmation checkbox if temperature changes
    setConfirmationChecked(false);
    handleChange("goats", "confirmationChecked", false, formKey);
  };

  // 🔄 Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setConfirmationChecked(checked);
    handleChange("goats", "confirmationChecked", checked, formKey);
  };

  // ✅ Ensure confirmation checkbox resets when temperature changes
  useEffect(() => {
    if (!isTempOutOfRange(goatData.temperature) && confirmationChecked) {
      setConfirmationChecked(false);
      handleChange("goats", "confirmationChecked", false, formKey);
    }
  }, [goatData.temperature, confirmationChecked, handleChange, formKey]);

  // **🔄 Navigation Functions**
  const goToPrevious = () => {
    navigate(goatId === "B" ? "/goat-form?goat=A" : "/basic-info");
  };

  const goToNext = () => {
    navigate(goatId === "A" ? "/goat-form?goat=B" : "/task-checklist");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {t("goatInfo", { id: goatId })}
      </h1>

      {/* 🐐 Wrap Everything Inside a Card */}
      <Card>
        {/* 🐐 Temperature */}
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{t("bodyTemp")}:</label>
        <input
          type="number"
          value={goatData.temperature}
          onChange={handleTempChange}
          placeholder="e.g., 38.5~40.5"
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
          step="0.1"
        />

        <div style={{ marginTop: "5px" }}>
          <label htmlFor={`confirmCheck-${formKey}`} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id={`confirmCheck-${formKey}`}
              checked={confirmationChecked}
              onChange={handleCheckboxChange}
              disabled={!isTempOutOfRange(goatData.temperature)}
              style={{ marginRight: "10px" }}
            />
            <span style={{ color: !isTempOutOfRange(goatData.temperature) ? "#9CA3AF" : "#EF4444", fontWeight: "bold" }}>
              {t("tempOutsideRangeWarning")}
            </span>
          </label>
        </div>

        {/* 💩 Stool */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: "15px", marginBottom: "5px" }}>{t("stoolCondition")}:</label>
        {["good", "soft", "hard"].map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name={`stool-${formKey}`}
              value={option}
              checked={goatData.stool === option}
              onChange={(e) => handleChange("goats", "stool", e.target.value, formKey)}
              style={{ marginRight: "10px" }}
            />
            {t(option)}
          </label>
        ))}

        {/* 🍽️ Appetite */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: "15px", marginBottom: "5px" }}>{t("appetite")}:</label>
        {["good", "normal", "poor"].map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name={`appetite-${formKey}`}
              value={option}
              checked={goatData.appetite === option}
              onChange={(e) => handleChange("goats", "appetite", e.target.value, formKey)}
              style={{ marginRight: "10px" }}
            />
            {t(option)}
          </label>
        ))}

        {/* 📝 Notes */}
        <label style={{ fontWeight: "bold", display: "block", marginTop: "15px", marginBottom: "5px" }}>{t("additionalNotes")}:</label>
        <textarea
          value={goatData.notes}
          onChange={(e) => handleChange("goats", "notes", e.target.value, formKey)}
          placeholder={t("additionalNotes")}
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
      </Card>

      {/* 🔄 Navigation */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <button
          onClick={goToPrevious}
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
        >
          ⬅️ {t("back")}
        </button>

        <button
          onClick={goToNext}
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
        >
          ➡️ {t("next")}
        </button>
      </div>
    </div>
  );
}
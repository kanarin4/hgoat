import React, { useState } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import i18n from "./i18n";
import Navigation from "./components/Navigation";

function App() {
  const [formData, setFormData] = useState({
    // ── Site context ───────────────────────────────────────────
    site_id: "",            // UUID of the site you’re reporting for
    site_label: "",         // Human-friendly site name

    // ── Basic info ─────────────────────────────────────────────
    date: "",
    caretaker_name: "",
    outdoor_temperature: "",
    weather_condition: "",
    weather_code: "",

    // ── Goats (dynamic) ────────────────────────────────────────
    // Store goats by UUID. Example:
    // goats: {
    //   "uuid-1": { name: "Kai", stool: "good", appetite: "normal", notes: "" },
    //   "uuid-2": { name: "Mayu", ... }
    // }
    goats: {},

    // Optional: preserve display order/paging order
    goatsOrder: [],         // ["uuid-1", "uuid-2", ...]

    // ── Tasks & notes ──────────────────────────────────────────
    tasks: {
      waterChanged: false,
      shelterCleaned: false,
      electricFenceOn: false,
      setElectricFenceVoltage: false,
    },
    general_notes: "",
  });

  /**
   * Generic state updater used by all pages.
   * - For top-level scalars: handleChange("site_id", null, value)
   * - For nested sections:   handleChange("tasks", "waterChanged", true)
   * - For goats (dynamic):   handleChange("goats", "stool", "good", goatUUID)
   * - For goats order:       handleChange("goatsOrder", null, arrayOfGoatIds)
   */
  const handleChange = (section, field, value, key = null) => {
    setFormData((prev) => {
      // Dynamic goats: store under goats[goatUUID]
      if (section === "goats" && key) {
        return {
          ...prev,
          goats: {
            ...prev.goats,
            [key]: {
              ...(prev.goats?.[key] || {}),
              [field]: value,
            },
          },
        };
      }

      // Replace whole array for goatsOrder
      if (section === "goatsOrder" && field === null) {
        return { ...prev, goatsOrder: Array.isArray(value) ? value : prev.goatsOrder };
      }

      // Set a top-level scalar (e.g., site_id, site_label, date, caretaker_name, etc.)
      if (field === null) {
        return { ...prev, [section]: value };
      }

      // Set nested object property (e.g., tasks.waterChanged)
      return {
        ...prev,
        [section]: {
          ...(prev[section] || {}),
          [field]: value,
        },
      };
    });
  };

  // Debug: see the full form object evolve
  console.log("App: formData =", formData);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Navigation formData={formData} handleChange={handleChange} />
      </Router>
    </I18nextProvider>
  );
}

export default App;



// import React, { useState } from "react";
// import { I18nextProvider } from "react-i18next";
// import { BrowserRouter as Router } from "react-router-dom";
// import i18n from "./i18n"; // Translations
// import Navigation from "./components/Navigation";

// function App() {
//   const [formData, setFormData] = useState({
//     date: "",
//     caretaker_name: "",
//     outdoor_temperature: "",
//     weather_condition: "",
//     weather_code: "",
//     goats: {
//       goatA: { temperature: "", stool: "", appetite: "", notes: "", confirmationChecked: false },
//       goatB: { temperature: "", stool: "", appetite: "", notes: "", confirmationChecked: false },
//     },
//     tasks: {
//       waterChanged: false,
//       shelterCleaned: false,
//       electricFenceOn: false,
//       setElectricFenceVoltage: false,
//     },
//     general_notes: "",
//   });

//   const handleChange = (section, field, value, goatId = null) => {
//     setFormData((prev) => {
//       if (goatId) {
//         return {
//           ...prev,
//           goats: {
//             ...prev.goats,
//             [goatId]: {
//               ...prev.goats[goatId],
//               [field]: value,
//             },
//           },
//         };
//       }
//       if (field === null) {
//         return { ...prev, [section]: value };
//       }
//       return { ...prev, [section]: { ...prev[section], [field]: value } };
//     });
//   };

//   console.log("App: formData =", formData); // ✅ Debug log

//   return (
//     <I18nextProvider i18n={i18n}>
//       <Router>
//         <Navigation formData={formData} handleChange={handleChange} />
//       </Router>
//     </I18nextProvider>
//   );
// }

// export default App;







import React, { useState } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import i18n from "./i18n"; // Translations
import Navigation from "./components/Navigation";

function App() {
  const [formData, setFormData] = useState({
    date: "",
    caretaker_name: "",
    outdoor_temperature: "",
    weather_condition: "",
    weather_code: "",
    goats: {
      goatA: { temperature: "", stool: "", appetite: "", notes: "", confirmationChecked: false },
      goatB: { temperature: "", stool: "", appetite: "", notes: "", confirmationChecked: false },
    },
    tasks: {
      waterChanged: false,
      shelterCleaned: false,
      electricFenceOn: false,
      setElectricFenceVoltage: false,
    },
    general_notes: "",
  });

  const handleChange = (section, field, value, goatId = null) => {
    setFormData((prev) => {
      if (goatId) {
        return {
          ...prev,
          goats: {
            ...prev.goats,
            [goatId]: {
              ...prev.goats[goatId],
              [field]: value,
            },
          },
        };
      }
      if (field === null) {
        return { ...prev, [section]: value };
      }
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  console.log("App: formData =", formData); // ✅ Debug log

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Navigation formData={formData} handleChange={handleChange} />
      </Router>
    </I18nextProvider>
  );
}

export default App;


import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BasicInfo from "../pages/BasicInfo";
import GoatForm from "../pages/GoatForm";
import TaskChecklist from "../pages/TaskChecklist";
import GeneralNotes from "../pages/GeneralNotes";
import Review from "../pages/Review";
import Login from "../pages/Login";

export default function Navigation({ formData, handleChange }) {
  console.log("Navigation: formData =", formData); // ✅ Debug log

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/basic-info" element={<BasicInfo formData={formData} handleChange={handleChange} />} />
      <Route path="/goat-form" element={<GoatForm formData={formData} handleChange={handleChange} />} />
      <Route path="/task-checklist" element={<TaskChecklist formData={formData} handleChange={handleChange} />} />
      <Route path="/general-notes" element={<GeneralNotes formData={formData} handleChange={handleChange} />} />
      <Route path="/review" element={<Review formData={formData} />} />
      <Route path="/login" element={<Login />} /> {/* ✅ Add this line */}

    </Routes>
  );
}
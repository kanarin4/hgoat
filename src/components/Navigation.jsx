

// import { Routes, Route } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import BasicInfo from "../pages/BasicInfo";
// import GoatForm from "../pages/GoatForm";
// import TaskChecklist from "../pages/TaskChecklist";
// import GeneralNotes from "../pages/GeneralNotes";
// import Review from "../pages/Review";
// import Login from "../pages/Login";
// import Account from "../pages/Account";
// import SampleReport from "../pages/SampleReport"; // stub if not created yet
// import RequestAccess from "../pages/RequestAccess"; // stub if not created yet

// export default function Navigation({ formData, handleChange }) {
//   console.log("Navigation: formData =", formData); // ✅ Debug log

//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/basic-info" element={<BasicInfo formData={formData} handleChange={handleChange} />} />
//       <Route path="/goat-form" element={<GoatForm formData={formData} handleChange={handleChange} />} />
//       <Route path="/task-checklist" element={<TaskChecklist formData={formData} handleChange={handleChange} />} />
//       <Route path="/general-notes" element={<GeneralNotes formData={formData} handleChange={handleChange} />} />
//       <Route path="/review" element={<Review formData={formData} />} />
//       <Route path="/login" element={<Login />} /> {/* ✅ Add this line */}

//       <Route path="/account" element={<Account />} />
//       <Route path="/sampleReport" element={<SampleReport />} />
//       <Route path="/request-access" element={<RequestAccess />} />

//       {/* Optional: fallback */}
//       <Route path="*" element={<Dashboard />} />

//     </Routes>
//   );
// }



import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BasicInfo from "../pages/BasicInfo";
import GoatForm from "../pages/GoatForm";
import TaskChecklist from "../pages/TaskChecklist";
import GeneralNotes from "../pages/GeneralNotes";
import Review from "../pages/Review";
import Login from "../pages/Login";
import Account from "../pages/Account";
import SampleReport from "../pages/SampleReport"; // stub if not created yet
import RequestAccess from "../pages/RequestAccess"; // stub if not created yet

export default function Navigation({ formData, handleChange }) {
  console.log("Navigation: formData =", formData);

  return (
    <Routes>
      {/* ✅ Pass formData + handleChange so Dashboard can save site in central state */}
      <Route path="/" element={<Dashboard formData={formData} handleChange={handleChange} />} />

      <Route path="/basic-info" element={<BasicInfo formData={formData} handleChange={handleChange} />} />
      <Route path="/goat-form" element={<GoatForm formData={formData} handleChange={handleChange} />} />
      <Route path="/task-checklist" element={<TaskChecklist formData={formData} handleChange={handleChange} />} />
      <Route path="/general-notes" element={<GeneralNotes formData={formData} handleChange={handleChange} />} />
      {/* ✅ Give Review handleChange too (harmless; useful if you need tweaks later) */}
      <Route path="/review" element={<Review formData={formData} handleChange={handleChange} />} />

      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/sampleReport" element={<SampleReport />} />
      <Route path="/request-access" element={<RequestAccess />} />

      {/* Fallback */}
      <Route path="*" element={<Dashboard formData={formData} handleChange={handleChange} />} />
    </Routes>
  );
}
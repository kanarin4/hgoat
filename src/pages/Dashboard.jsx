import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { downloadGoatReportsCSV } from "../services/csvDownload";
import { supabase } from "../services/supabaseClient";
import { useSession } from "../hooks/useSession";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { USE_SUPABASE } from "../services/config";
import * as mockData from "../services/mockData";

export default function Dashboard({ formData = {}, handleChange = () => { } }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const session = useSession();
  const isLoggedIn = Boolean(session?.user);
  const name =
    session?.user?.user_metadata?.nickname ||
    session?.user?.user_metadata?.full_name ||
    session?.user?.user_metadata?.name ||
    session?.user?.email?.split("@")[0] ||
    "there";

  // ── Today’s per-site status table ───────────────────────────────
  const [rows, setRows] = useState([]);
  const [perSiteEnabled, setPerSiteEnabled] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const loadTodayStatus = async () => {
      setLoadingTable(true);
      const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });

      if (!USE_SUPABASE) {
        setRows(
          mockData.mockSites.map((s) => ({
            siteId: s.id,
            siteName: s.name,
            submitted: mockData.mockTodayReports.some((r) => r.site_id === s.id),
            by: mockData.mockTodayReports.find((r) => r.site_id === s.id)?.caretaker_name || null,
          }))
        );
        setLoadingTable(false);
        return;
      }

      const { data: sites, error: sitesErr } = await supabase
        .from("sites")
        .select("id, name")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (sitesErr) {
        console.error("Error loading sites:", sitesErr);
        setRows([]);
        setLoadingTable(false);
        return;
      }

      const { data: reports, error: repErr } = await supabase
        .from("goat_reports")
        .select("site_id, caretaker_name")
        .eq("date", today);

      if (repErr) {
        setPerSiteEnabled(false);
        setRows(sites.map(s => ({ siteId: s.id, siteName: s.name, submitted: null, by: null })));
        setLoadingTable(false);
        return;
      }

      const firstBySite = new Map();
      for (const r of reports || []) {
        if (r.site_id && !firstBySite.has(r.site_id)) {
          firstBySite.set(r.site_id, r.caretaker_name || "");
        }
      }

      setRows(
        sites.map(s => ({
          siteId: s.id,
          siteName: s.name,
          submitted: firstBySite.has(s.id),
          by: firstBySite.get(s.id) || null,
        }))
      );
      setLoadingTable(false);
    };

    loadTodayStatus();
  }, []);

  // ── user’s accessible sites: store into formData ─────────────────
  useEffect(() => {
    if (!session?.user?.id) {
      handleChange("sites", null, []); // clear
      handleChange("site_id", null, "");
      handleChange("site_label", null, "");
      return;
    }

    const loadMySites = async () => {
      if (!USE_SUPABASE) {
        const unique = mockData.mockMemberships.map((m) => ({ id: m.site_id, name: m.site_name }));
        handleChange("sites", null, unique);
        if (!formData.site_id && unique[0]) {
          handleChange("site_id", null, unique[0].id);
          handleChange("site_label", null, unique[0].name);
        }
        return;
      }

      const { data, error } = await supabase
        .from("site_memberships_full")
        .select("site_id, site_name")
        .eq("user_id", session.user.id);

      if (!error && data) {
        const unique = Array.from(
          new Map(data.map(d => [d.site_id, { id: d.site_id, name: d.site_name }])).values()
        );
        handleChange("sites", null, unique);
        if (!formData.site_id && unique[0]) {
          handleChange("site_id", null, unique[0].id);
          handleChange("site_label", null, unique[0].name);
        }
        return;
      }

      // fallback
      const { data: ms } = await supabase
        .from("site_memberships")
        .select("site_id")
        .eq("user_id", session.user.id);

      if (!ms?.length) {
        handleChange("sites", null, []);
        handleChange("site_id", null, "");
        handleChange("site_label", null, "");
        return;
      }

      const ids = ms.map(m => m.site_id);
      const { data: s2 } = await supabase.from("sites").select("id, name").in("id", ids);
      handleChange("sites", null, s2 || []);
      if (!formData.site_id && s2?.[0]) {
        handleChange("site_id", null, s2[0].id);
        handleChange("site_label", null, s2[0].name);
      }
    };

    loadMySites();
  }, [session?.user?.id]);

  // ── fetch goats on Start Report ──────────────────────────────────
  const [startingReport, setStartingReport] = useState(false);

  const handleStartReport = async () => {
    if (!formData.site_id || startingReport) return;

    setStartingReport(true);
    try {
      if (!USE_SUPABASE) {
        const goatsList = mockData.mockGoats.filter((g) => g.site_id === formData.site_id);
        handleChange("goatsList", null, goatsList);
        const nextGoatsAnswers = { ...(formData.goats || {}) };
        goatsList.forEach((g) => {
          if (!nextGoatsAnswers[g.id]) {
            nextGoatsAnswers[g.id] = { stool: "", appetite: "", notes: "" };
          }
        });
        handleChange("goats", null, nextGoatsAnswers);
        navigate("/basic-info");
        return;
      }

      // 1) Fetch goats for this site
      const { data, error } = await supabase
        .from("goats")
        .select("id, name")
        .eq("site_id", formData.site_id)
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching goats:", error);
        // even if goats failed to load, keep going; form can still work with none
      }

      const goatsList = data || [];

      // 2) Store the roster list
      handleChange("goatsList", null, goatsList);

      // 3) Ensure answers object has keys for each goat id (but keep existing answers)
      const existing = formData.goats || {};
      const nextGoatsAnswers = { ...existing };
      goatsList.forEach((g) => {
        if (!nextGoatsAnswers[g.id]) {
          nextGoatsAnswers[g.id] = { stool: "", appetite: "", notes: "" };
        }
      });
      handleChange("goats", null, nextGoatsAnswers);

      // 4) Go to Basic Info (everything is in formData)
      navigate("/basic-info");
    } finally {
      setStartingReport(false);
    }
  };

  const handleDownload = () => {
    if (!formData.site_id) return;
    downloadGoatReportsCSV(formData.site_id, formData.site_label);
  };

  const mySites = formData.sites || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)" }}>
      <Navbar />
      <div style={{ height: "60px" }} />

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        {isLoggedIn ? t("hiName", { name, defaultValue: `Hi, ${name}` }) : t("home")}
      </h1>

      {/* Today status table */}
      <Card style={{ width: "90%", maxWidth: "800px", padding: "20px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>
          📅 {t("todayIs")}: {new Date().toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}
        </h2>

        {loadingTable ? (
          <p style={{ textAlign: "center", fontSize: "1.1rem" }}>{t("loadingReportStatus")}</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{t("location")}</th>
                  <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{t("status")}</th>
                  <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{t("submittedBy")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.siteId}>
                    <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{r.siteName}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
                      {r.submitted === true && <span style={{ color: "green" }}>✅ {t("reportSubmittedBy")}</span>}
                      {r.submitted === false && <span style={{ color: "red" }}>❌ {t("reportNotSubmitted")}</span>}
                      {r.submitted === null && <span style={{ color: "#999" }}>—</span>}
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
                      {r.by ? r.by : <span style={{ color: "#999" }}>—</span>}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: "10px", textAlign: "center", color: "#666" }}>
                      {t("noSitesFound")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Actions */}
      <Card style={{ width: "90%", maxWidth: "460px", padding: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {isLoggedIn ? (
            <>
              <label style={{ fontWeight: 600 }}>
                {t("selectSite")}
              </label>
              <select
                value={formData.site_id || ""}
                onChange={(e) => {
                  const id = e.target.value;
                  const site = mySites.find(s => s.id === id);
                  handleChange("site_id", null, id);
                  handleChange("site_label", null, site?.name || "");
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  background: "white"
                }}
              >
                {mySites.length === 0 ? (
                  <option value="">{t("noSitesAssigned")}</option>
                ) : (
                  mySites.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))
                )}
              </select>

              <button
                onClick={handleStartReport}
                disabled={!formData.site_id || startingReport}
                style={{
                  padding: "12px 24px",
                  backgroundColor: !formData.site_id || startingReport ? "#9bbbe6" : "#4a90e2",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: !formData.site_id || startingReport ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                }}
              >
                {startingReport ? "⏳ " : "📋 "}
                {startingReport ? t("loadingSites") : t("startReport")}
              </button>

              <button
                onClick={handleDownload}
                disabled={!formData.site_id}
                style={{
                  padding: "12px 24px",
                  backgroundColor: formData.site_id ? "#2ecc71" : "#a9e5c5",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: formData.site_id ? "pointer" : "not-allowed",
                  fontSize: "1rem",
                }}
              >
                📥 {t("downloadCSV")}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#f39c12",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                🔑 {t("loginToStart")}
              </button>

              <button
                onClick={() => navigate("/sampleReport")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#95a5a6",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                👀 {t("viewSampleReport")}
              </button>
            </>
          )}
        </div>
      </Card>

      <Footer />
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { downloadGoatReportsCSV } from "../services/csvDownload";
// import { supabase } from "../services/supabaseClient";
// import { useSession } from "../hooks/useSession";
// import Card from "../components/Card";
// import Navbar from "../components/Navbar";

// export default function Dashboard({ formData = {}, handleChange = () => {} }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const session = useSession();
//   const isLoggedIn = Boolean(session?.user);
//   const name =
//     session?.user?.user_metadata?.nickname ||
//     session?.user?.user_metadata?.full_name ||
//     session?.user?.user_metadata?.name ||
//     session?.user?.email?.split("@")[0] ||
//     "there";

//   // ── Today’s per-site status table ───────────────────────────────
//   const [rows, setRows] = useState([]);
//   const [perSiteEnabled, setPerSiteEnabled] = useState(true);
//   const [loadingTable, setLoadingTable] = useState(true);

//   useEffect(() => {
//     const loadTodayStatus = async () => {
//       setLoadingTable(true);
//       const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });

//       const { data: sites, error: sitesErr } = await supabase
//         .from("sites")
//         .select("id, name")
//         .eq("is_active", true)
//         .order("name", { ascending: true });

//       if (sitesErr) {
//         console.error("Error loading sites:", sitesErr);
//         setRows([]);
//         setLoadingTable(false);
//         return;
//       }

//       const { data: reports, error: repErr } = await supabase
//         .from("goat_reports")
//         .select("site_id, caretaker_name")
//         .eq("date", today);

//       if (repErr) {
//         setPerSiteEnabled(false);
//         setRows(sites.map(s => ({ siteId: s.id, siteName: s.name, submitted: null, by: null })));
//         setLoadingTable(false);
//         return;
//       }

//       const firstBySite = new Map();
//       for (const r of reports || []) {
//         if (r.site_id && !firstBySite.has(r.site_id)) {
//           firstBySite.set(r.site_id, r.caretaker_name || "");
//         }
//       }

//       setRows(
//         sites.map(s => ({
//           siteId: s.id,
//           siteName: s.name,
//           submitted: firstBySite.has(s.id),
//           by: firstBySite.get(s.id) || null,
//         }))
//       );
//       setLoadingTable(false);
//     };

//     loadTodayStatus();
//   }, []);

//   // ── user’s accessible sites: store into formData ─────────────────
//   useEffect(() => {
//     if (!session?.user?.id) {
//       handleChange("sites", null, []); // clear
//       handleChange("site_id", null, "");
//       handleChange("site_label", null, "");
//       return;
//     }

//     const loadMySites = async () => {
//       const { data, error } = await supabase
//         .from("site_memberships_full")
//         .select("site_id, site_name")
//         .eq("user_id", session.user.id);

//       if (!error && data) {
//         const unique = Array.from(
//           new Map(data.map(d => [d.site_id, { id: d.site_id, name: d.site_name }])).values()
//         );
//         handleChange("sites", null, unique);
//         if (!formData.site_id && unique[0]) {
//           handleChange("site_id", null, unique[0].id);
//           handleChange("site_label", null, unique[0].name);
//         }
//         return;
//       }

//       // fallback
//       const { data: ms } = await supabase
//         .from("site_memberships")
//         .select("site_id")
//         .eq("user_id", session.user.id);

//       if (!ms?.length) {
//         handleChange("sites", null, []);
//         handleChange("site_id", null, "");
//         handleChange("site_label", null, "");
//         return;
//       }

//       const ids = ms.map(m => m.site_id);
//       const { data: s2 } = await supabase.from("sites").select("id, name").in("id", ids);
//       handleChange("sites", null, s2 || []);
//       if (!formData.site_id && s2?.[0]) {
//         handleChange("site_id", null, s2[0].id);
//         handleChange("site_label", null, s2[0].name);
//       }
//     };

//     loadMySites();
//   }, [session?.user?.id]);

//   // const handleStartReport = () => {
//   //   if (!formData.site_id) return;
//   //   navigate("/basic-info");
//   // };

//   const handleStartReport = () => {
//     if (!formData.site_id) return;

//     // nothing else to pass via URL — we already keep site_id/site_label in formData
//     navigate("/basic-info");
//   };


//   const handleDownload = () => {
//     if (!formData.site_id) return;
//     downloadGoatReportsCSV(formData.site_id, formData.site_label);
//   };

//   const mySites = formData.sites || [];

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)" }}>
//       <Navbar />
//       <div style={{ height: "60px" }} />

//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         {isLoggedIn ? t("hiName", { name, defaultValue: `Hi, ${name}` }) : t("home")}
//       </h1>

//       {/* Today status table */}
//       <Card style={{ width: "90%", maxWidth: "800px", padding: "20px", marginBottom: "20px" }}>
//         <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>
//           📅 {t("todayIs")}: {new Date().toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}
//         </h2>

//         {loadingTable ? (
//           <p style={{ textAlign: "center", fontSize: "1.1rem" }}>{t("loadingStatus")}</p>
//         ) : (
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ background: "#f3f4f6" }}>
//                   <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{t("location")}</th>
//                   <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{t("status")}</th>
//                   <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{t("submittedBy")}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((r) => (
//                   <tr key={r.siteId}>
//                     <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{r.siteName}</td>
//                     <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
//                       {r.submitted === true && <span style={{ color: "green" }}>✅ {t("reportSubmittedBy")}</span>}
//                       {r.submitted === false && <span style={{ color: "red" }}>❌ {t("reportNotSubmitted")}</span>}
//                       {r.submitted === null && <span style={{ color: "#999" }}>—</span>}
//                     </td>
//                     <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
//                       {r.by ? r.by : <span style={{ color: "#999" }}>—</span>}
//                     </td>
//                   </tr>
//                 ))}
//                 {rows.length === 0 && (
//                   <tr>
//                     <td colSpan={3} style={{ padding: "10px", textAlign: "center", color: "#666" }}>
//                       {t("noSitesFound")}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>

//       {/* Actions */}
//       <Card style={{ width: "90%", maxWidth: "460px", padding: "20px", marginTop: "20px" }}>
//         <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
//           {isLoggedIn ? (
//             <>
//               <label style={{ fontWeight: 600 }}>
//                 {t("selectSite")}
//               </label>
//               <select
//                 value={formData.site_id || ""}
//                 onChange={(e) => {
//                   const id = e.target.value;
//                   const site = mySites.find(s => s.id === id);
//                   handleChange("site_id", null, id);
//                   handleChange("site_label", null, site?.name || "");
//                 }}
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   background: "white"
//                 }}
//               >
//                 {mySites.length === 0 ? (
//                   <option value="">{t("noSitesAssigned")}</option>
//                 ) : (
//                   mySites.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))
//                 )}
//               </select>

//               <button
//                 onClick={handleStartReport}
//                 disabled={!formData.site_id}
//                 style={{
//                   padding: "12px 24px",
//                   backgroundColor: formData.site_id ? "#4a90e2" : "#9bbbe6",
//                   color: "white",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: formData.site_id ? "pointer" : "not-allowed",
//                   fontSize: "1rem",
//                 }}
//               >
//                 📋 {t("startReport")}
//               </button>

//               <button
//                 onClick={handleDownload}
//                 disabled={!formData.site_id}
//                 style={{
//                   padding: "12px 24px",
//                   backgroundColor: formData.site_id ? "#2ecc71" : "#a9e5c5",
//                   color: "white",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: formData.site_id ? "pointer" : "not-allowed",
//                   fontSize: "1rem",
//                 }}
//               >
//                 📥 {t("downloadCSV")}
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => navigate("/login")}
//                 style={{
//                   padding: "12px 24px",
//                   backgroundColor: "#f39c12",
//                   color: "white",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                 }}
//               >
//                 🔑 {t("loginToStart")}
//               </button>

//               <button
//                 onClick={() => navigate("/sampleReport")}
//                 style={{
//                   padding: "12px 24px",
//                   backgroundColor: "#95a5a6",
//                   color: "white",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                 }}
//               >
//                 👀 {t("viewSampleReport")}
//               </button>
//             </>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// }



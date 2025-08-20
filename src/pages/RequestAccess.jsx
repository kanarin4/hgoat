


// import { useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";

// export default function RequestAccess() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const [sites, setSites] = useState([]);
//   const [sitesLoading, setSitesLoading] = useState(true);
//   const [sitesError, setSitesError] = useState("");

//   const [fullName, setFullName] = useState("");
//   const [siteId, setSiteId] = useState("");
//   const [accessCode, setAccessCode] = useState("");
//   const [email, setEmail] = useState("");

//   const [submitting, setSubmitting] = useState(false);

//   const submitDisabled = useMemo(
//     () =>
//       submitting ||
//       !siteId ||
//       !accessCode.trim() ||
//       sitesLoading ||
//       !!sitesError ||
//       !fullName.trim(),
//     [submitting, siteId, accessCode, sitesLoading, sitesError, fullName]
//   );

//   useEffect(() => {
//     (async () => {
//       setSitesLoading(true);
//       setSitesError("");

//       const { data: userRes, error: userErr } = await supabase.auth.getUser();
//       if (!userErr && userRes?.user) {
//         const u = userRes.user;
//         setEmail(u.email ?? "");
//         const meta = u.user_metadata || {};
//         const computedFullName =
//           meta.full_name ||
//           meta.name ||
//           `${meta.given_name ?? ""} ${meta.family_name ?? ""}`.trim();
//         setFullName(computedFullName || "");
//       }

//       const { data, error } = await supabase
//         .from("sites")
//         .select("id,name")
//         .eq("is_active", true)
//         .order("name", { ascending: true });

//       if (error) {
//         console.error("Load sites error:", error);
//         setSitesError(t("errorLoadingSites") || "Failed to load sites.");
//         setSites([]);
//       } else {
//         setSites(data || []);
//       }
//       setSitesLoading(false);
//     })();
//   }, [t]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (submitDisabled) return;

//     setSubmitting(true);
//     try {
//       const { data: ures, error: uerr } = await supabase.auth.getUser();
//       if (uerr || !ures?.user) {
//         alert(t("pleaseSignInFirst") || "Please sign in first.");
//         return;
//       }
//       const user = ures.user;

//       const payload = {
//         user_id: user.id,
//         email: user.email,
//         full_name: fullName.trim(),
//         site_id: siteId,
//         access_code: accessCode.trim(),
//       };

//       const { data, error } = await supabase.functions.invoke("submit-access-request", {
//         body: payload,
//       });

//       if (error) {
//         console.error("submit-access-request error:", error);
//         alert(error.message || (t("requestFailed") || "Failed to submit request."));
//         return;
//       }

//       alert(t("requestSent") || "Request sent! We’ll review and get back to you.");
//       navigate("/account");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "var(--background-color)" }}>
//       <Navbar />
//       <div style={{ height: 70 }} />
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Card style={{ maxWidth: 560, width: "90%" }}>
//           <h2 style={{ marginTop: 0 }}>{t("account.requestAccess") || "Request Access"}</h2>

//           <form onSubmit={handleSubmit}>
//             <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>
//               {t("fullName") || "Full Name"}
//             </label>
//             <input
//               value={fullName || ""}
//               disabled
//               style={{ width: "100%", padding: 10, marginTop: 4, opacity: 0.8 }}
//             />
//             {!fullName?.trim() && (
//               <p style={{ marginTop: 6, color: "#e74c3c" }}>
//                 {t("account.updateProfileForName") ||
//                   "Full name not found in your profile. Please update it on your Account page."}
//               </p>
//             )}

//             <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
//               {t("account.email") || "Email"}
//             </label>
//             <input
//               value={email}
//               disabled
//               style={{ width: "100%", padding: 10, marginTop: 4, opacity: 0.8 }}
//             />

//             <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
//               {t("site") || "Site"}
//             </label>

//             {sitesLoading ? (
//               <p style={{ opacity: 0.8 }}>{t("loadingStatus") || "Loading…"}</p>
//             ) : sitesError ? (
//               <p style={{ color: "#e74c3c" }}>{sitesError}</p>
//             ) : (
//               <select
//                 value={siteId}
//                 onChange={(e) => setSiteId(e.target.value)}
//                 required
//                 style={{ width: "100%", padding: 10, marginTop: 4 }}
//               >
//                 <option value="" disabled>
//                   {t("selectASite") || "Select a site…"}
//                 </option>
//                 {sites.map((s) => (
//                   <option key={s.id} value={s.id}>
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//             )}

//             <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
//               {t("accessCode") || "Access Code"}
//             </label>
//             <input
//               value={accessCode}
//               onChange={(e) => setAccessCode(e.target.value)}
//               placeholder={t("providedByCoordinator") || "Provided by coordinator"}
//               required
//               style={{ width: "100%", padding: 10, marginTop: 4 }}
//             />

//             <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 style={{
//                   padding: "12px 16px",
//                   backgroundColor: "#6b7280",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   cursor: "pointer",
//                 }}
//               >
//                 {t("back") || "Back"}
//               </button>

//               <button
//                 type="submit"
//                 disabled={submitDisabled}
//                 style={{
//                   padding: "12px 16px",
//                   backgroundColor: submitDisabled ? "#9bbbe6" : "#4a90e2",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   cursor: submitDisabled ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {submitting ? t("submitting") || "Submitting…" : t("submitRequest") || "Submit Request"}
//               </button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function RequestAccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [sites, setSites] = useState([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  const [sitesError, setSitesError] = useState("");

  const [fullName, setFullName] = useState("");
  const [siteId, setSiteId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const submitDisabled = useMemo(
    () =>
      submitting ||
      !siteId ||
      !accessCode.trim() ||
      sitesLoading ||
      !!sitesError ||
      !fullName.trim(),
    [submitting, siteId, accessCode, sitesLoading, sitesError, fullName]
  );

  useEffect(() => {
    (async () => {
      setSitesLoading(true);
      setSitesError("");

      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (!userErr && userRes?.user) {
        const u = userRes.user;
        setEmail(u.email ?? "");
        const meta = u.user_metadata || {};
        const computedFullName =
          meta.full_name ||
          meta.name ||
          `${meta.given_name ?? ""} ${meta.family_name ?? ""}`.trim();
        setFullName(computedFullName || "");
      }

      const { data, error } = await supabase
        .from("sites")
        .select("id,name")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (error) {
        console.error("Load sites error:", error);
        setSitesError(t("errorLoadingSites") || "Failed to load sites.");
        setSites([]);
      } else {
        setSites(data || []);
      }
      setSitesLoading(false);
    })();
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitDisabled) return;

    setSubmitting(true);
    try {
      const { data: ures, error: uerr } = await supabase.auth.getUser();
      if (uerr || !ures?.user) {
        alert(t("pleaseSignInFirst") || "Please sign in first.");
        return;
      }
      const user = ures.user;

      const payload = {
        user_id: user.id,
        email: user.email,
        full_name: fullName.trim(),
        site_id: siteId,
        access_code: accessCode.trim(),
      };

      const { data: resp, error: fnErr } = await supabase.functions.invoke(
        "submit-access-request",
        { body: payload }
      );

      if (fnErr) {
        console.error("submit-access-request invoke error:", fnErr);
        alert(fnErr.message || (t("requestFailed") || "Failed to submit request."));
        return;
      }

      // The edge function always returns 200 with a JSON body: { ok, error?, verified, already_exists }
      if (!resp?.ok) {
        console.error("submit-access-request returned error:", resp);
        alert(resp?.error || (t("requestFailed") || "Failed to submit request."));
        return;
      }

      if (resp.already_exists) {
        alert(
          resp.verified
            ? (t("requestVerified") || "Your previous request is now verified.")
            : (t("requestAlreadyExists") || "You already submitted a request for this site.")
        );
      } else {
        alert(
          resp.verified
            ? (t("requestSentVerified") || "Request sent (code verified).")
            : (t("requestSent") || "Request sent! We’ll review and get back to you.")
        );
      }

      navigate("/account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--background-color)" }}>
      <Navbar />
      <div style={{ height: 70 }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ maxWidth: 560, width: "90%" }}>
          <h2 style={{ marginTop: 0 }}>{t("account.requestAccess") || "Request Access"}</h2>

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>
              {t("fullName") || "Full Name"}
            </label>
            <input
              value={fullName || ""}
              disabled
              style={{ width: "100%", padding: 10, marginTop: 4, opacity: 0.8 }}
            />
            {!fullName?.trim() && (
              <p style={{ marginTop: 6, color: "#e74c3c" }}>
                {t("account.updateProfileForName") ||
                  "Full name not found in your profile. Please update it on your Account page."}
              </p>
            )}

            <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
              {t("account.email") || "Email"}
            </label>
            <input
              value={email}
              disabled
              style={{ width: "100%", padding: 10, marginTop: 4, opacity: 0.8 }}
            />

            <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
              {t("site") || "Site"}
            </label>

            {sitesLoading ? (
              <p style={{ opacity: 0.8 }}>{t("loadingStatus") || "Loading…"}</p>
            ) : sitesError ? (
              <p style={{ color: "#e74c3c" }}>{sitesError}</p>
            ) : (
              <select
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                required
                style={{ width: "100%", padding: 10, marginTop: 4 }}
              >
                <option value="" disabled>
                  {t("selectASite") || "Select a site…"}
                </option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}

            <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
              {t("accessCode") || "Access Code"}
            </label>
            <input
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder={t("providedByCoordinator") || "Provided by coordinator"}
              required
              style={{ width: "100%", padding: 10, marginTop: 4 }}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#6b7280",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                {t("back") || "Back"}
              </button>

              <button
                type="submit"
                disabled={submitDisabled}
                style={{
                  padding: "12px 16px",
                  backgroundColor: submitDisabled ? "#9bbbe6" : "#4a90e2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: submitDisabled ? "not-allowed" : "pointer",
                }}
              >
                {submitting ? t("submitting") || "Submitting…" : t("submitRequest") || "Submit Request"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
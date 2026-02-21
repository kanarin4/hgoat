import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useSession } from "../hooks/useSession";
import { USE_SUPABASE } from "../services/config";
import * as mockData from "../services/mockData";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Account() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const session = useSession();
  const user = session?.user;

  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [loadingSites, setLoadingSites] = useState(true);

  // Prefill nickname from user metadata
  useEffect(() => {
    if (!user) return;
    const meta = user.user_metadata || {};
    setNickname(meta.nickname || meta.full_name || meta.name || "");
  }, [user]);

  // Load site memberships (via the readable view)
  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setMemberships([]);
        setLoadingSites(false);
        return;
      }
      if (!USE_SUPABASE) {
        setMemberships(mockData.mockMemberships);
        setLoadingSites(false);
        return;
      }
      const { data, error } = await supabase
        .from("site_memberships_full") // view created earlier
        .select("site_name, role, created_at")
        .eq("user_id", user.id)
        .order("site_name", { ascending: true });

      if (error) {
        console.error("Load memberships error:", error);
        setMemberships([]);
      } else {
        setMemberships(data || []);
      }
      setLoadingSites(false);
    };
    load();
  }, [user?.id]);

  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      setSaveMsg("");
      if (!USE_SUPABASE) {
        console.log("Mocking profile update...");
        setSaveMsg(t("account.saved"));
        setSaving(false);
        return;
      }
      const { error } = await supabase.auth.updateUser({
        data: { nickname: nickname || null },
      });
      if (error) throw error;
      setSaveMsg(t("account.saved"));
    } catch (e) {
      console.error(e);
      setSaveMsg(t("account.saveError"));
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    // Not logged in → nudge to login
    return (
      <div style={{ minHeight: "100vh", background: "var(--background-color)" }}>
        <Navbar />
        <div style={{ height: 60 }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ maxWidth: 520 }}>
            <h1 style={{ marginTop: 0 }}>{t("account.title")}</h1>
            <p>{t("account.loginRequired")}</p>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "10px 18px",
                background: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              🔑 {t("login")}
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background-color)" }}>
      <Navbar />
      <div style={{ height: 60 }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <h1 style={{ margin: 0 }}>{t("account.title")}</h1>

        {/* Profile card */}
        <Card style={{ maxWidth: 640, width: "90%" }}>
          <h2 style={{ marginTop: 0 }}>{t("account.profile")}</h2>
          <p>
            <strong>{t("account.email")}:</strong> {user.email}
          </p>
          <p>
            <strong>{t("account.currentName")}:</strong>{" "}
            {user.user_metadata?.full_name || user.user_metadata?.name || "—"}
          </p>

          <label style={{ display: "block", fontWeight: 600, marginTop: 12 }}>
            {t("account.preferredNickname")}
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t("account.nicknamePlaceholder")}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginTop: 6,
              marginBottom: 12,
            }}
          />

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "10px 18px",
              background: saving ? "#9bbbe6" : "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            💾 {saving ? t("account.saving") : t("account.save")}
          </button>
          {saveMsg && (
            <p style={{ marginTop: 10, color: saveMsg === t("account.saved") ? "#2ecc71" : "#e74c3c" }}>
              {saveMsg}
            </p>
          )}
        </Card>

        {/* Memberships card */}
        <Card style={{ maxWidth: 640, width: "90%" }}>
          <h2 style={{ marginTop: 0 }}>{t("account.mySites")}</h2>

          {loadingSites ? (
            <p>{t("loadingSites")}</p>
          ) : memberships.length === 0 ? (
            <p>{t("account.noSites")}</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e5e7eb" }}>
                      {t("location")}
                    </th>
                    <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e5e7eb" }}>
                      {t("account.role")}
                    </th>
                    <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #e5e7eb" }}>
                      {t("account.since")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((m, i) => (
                    <tr key={i}>
                      <td style={{ padding: 10, borderBottom: "1px solid #e5e7eb" }}>{m.site_name}</td>
                      <td style={{ padding: 10, borderBottom: "1px solid #e5e7eb", textTransform: "capitalize" }}>
                        {m.role}
                      </td>
                      <td style={{ padding: 10, borderBottom: "1px solid #e5e7eb" }}>
                        {new Date(m.created_at).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => navigate("/request-access")}
              style={{
                padding: "10px 18px",
                background: "#f39c12",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              📨 {t("account.requestAccess")}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
// src/pages/SampleReport.jsx
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

// === Steps definition ===
const STEPS = [
  { title: "Login with Google", desc: "Sign in to start using HGOAT. First time users will need to request access after logging in from the Account page available from the top right" },
  { title: "Start Report", desc: "From the dashboard, begin a new report." },
  { title: "Basic Info", desc: "Automatically pre-filled but editable." },
  { title: "Fill Goat Forms", desc: "Enter details for each goat." },
  { title: "Complete Task Checklist", desc: "Verify all required tasks are done." },
  { title: "Add General Notes (Optional)", desc: "Include any comments." },
  { title: "Review", desc: "Check anything missing before submitting." },
  { title: "Submit Report!", desc: "Send it for recordkeeping and review." }
];

// === Login Preview mock ===
function LoginPreview() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 360,
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        background: "#fff",
        overflow: "hidden",
        border: "1px solid #e5e7eb"
      }}
    >
      {/* Navbar strip */}
      {/* <div
        style={{
          height: 56,
          background: "var(--background-color, #f3f4f6)",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            background: "#4a90e2",
            opacity: 0.9
          }}
        />
        <div style={{ fontWeight: 700, opacity: 0.9 }}>HGOAT</div>
      </div> */}

      {/* Body */}
      <div
        style={{
          padding: 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Login</div>
        <div style={{ fontSize: 13, opacity: 0.7, textAlign: "center" }}>
          Sign in with your Google account to continue
        </div>

        <div
          style={{
            marginTop: 12,
            padding: "12px 18px",
            backgroundColor: "#4285F4",
            border: "#f44242ff",
            color: "white",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            userSelect: "none",
            pointerEvents: "none"
          }}
        >
          Sign in with Google
        </div>
      </div>
    </div>
  );
}


function DashboardPreview() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none" // make sure it's visual-only
      }}
    >
      {/* Top bar (like Navbar gap) */}
      {/* <div
        style={{
          height: 44,
          background: "var(--background-color, #f3f4f6)",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8
        }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 4, background: "#4a90e2" }} />
        <div style={{ fontWeight: 700, fontSize: 14, opacity: 0.9 }}>HGOAT</div>
      </div> */}

      {/* Body */}
      <div style={{ padding: 16, display: "grid", gap: 12 }}>
        {/* Greeting */}
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Hi, Yagi</div>

        {/* Today status (mini table) */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 10,
            display: "grid",
            gap: 8,
            background: "#fafafa"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, textAlign: "center" }}>
            📅 Today: 2025/08/20
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #e5e7eb" }}>Location</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #e5e7eb" }}>Status</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #e5e7eb" }}>Submitted By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: 8, borderBottom: "1px solid #e5e7eb" }}>Goat Park</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #e5e7eb", color: "green" }}>✅ Submitted</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #e5e7eb" }}>Jane</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}>River Site</td>
                  <td style={{ padding: 8, color: "red" }}>❌ Not Submitted</td>
                  <td style={{ padding: 8 }}>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions card */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 12,
            display: "grid",
            gap: 10
          }}
        >
          <label style={{ fontWeight: 700, fontSize: 13 }}>Select Site</label>
          <select
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              background: "#fff"
            }}
          >
            <option>Goat Park</option>
            <option>River Site</option>
          </select>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                flex: 1,
                padding: "10px 14px",
                backgroundColor: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700
              }}
            >
              📋 Start Report
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px 14px",
                backgroundColor: "#2ecc71",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700
              }}
            >
              📥 Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicInfoPreview() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none"
      }}
    >
      <div style={{ padding: 16 }}>
        {/* Title */}
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Basic Info</div>

        {/* Reporting site banner */}
        <div
          style={{
            marginBottom: 12,
            padding: "8px 12px",
            borderRadius: 8,
            background: "#f3f4f6",
            fontWeight: 600
          }}
        >
          📍 Reporting For <span style={{ fontFamily: "monospace" }}>Goat Park</span>
        </div>

        {/* Current Weather */}
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🌦️ Current Weather</div>

        {/* Temperature */}
        <label style={{ fontWeight: 700, display: "block" }}>Temperature:</label>
        <input
          readOnly
          value={"28"}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10
          }}
        />

        {/* Weather Condition */}
        <label style={{ fontWeight: 700, display: "block" }}>Weather Condition:</label>
        <input
          readOnly
          value={"Clear sky"}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10
          }}
        />

        {/* Date */}
        <label style={{ fontWeight: 700, display: "block" }}>Date:</label>
        <input
          readOnly
          value={"2025-08-20"}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10
          }}
        />

        {/* Caretaker Name */}
        <label style={{ fontWeight: 700, display: "block" }}>Caretaker Name:</label>
        <input
          readOnly
          value={"Yagi Goat"}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 12
          }}
        />

        {/* Buttons (visual only) */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ⬅️ Back to Home
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ➡️ Next
          </button>
        </div>
      </div>
    </div>
  );
}

function GoatFormPreview() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none"
      }}
    >
      <div style={{ padding: 16 }}>
        {/* Title + context */}
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Clover</div>
        <div style={{ color: "#666", marginBottom: 6 }}>
          Reporting For <span style={{ fontFamily: "monospace" }}>Goat Park</span>
        </div>
        <div style={{ color: "#666", marginBottom: 12 }}>Goat 1 of 3</div>

        {/* Card body */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12
          }}
        >
          {/* 💩 Stool */}
          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>
            Stool Condition:
          </label>
          {["good", "soft", "hard"].map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
              <input type="radio" readOnly style={{ marginRight: 10 }} />
              {opt}
            </label>
          ))}

          {/* 🍽️ Appetite */}
          <label style={{ fontWeight: 700, display: "block", marginTop: 12, marginBottom: 6 }}>
            Appetite:
          </label>
          {["good", "normal", "poor"].map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
              <input type="radio" readOnly style={{ marginRight: 10 }} />
              {opt}
            </label>
          ))}

          {/* 📝 Notes */}
          <label style={{ fontWeight: 700, display: "block", marginTop: 12, marginBottom: 6 }}>
            Additional Notes:
          </label>
          <textarea
            readOnly
            value={"Eating well. Active with the herd."}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              minHeight: 70
            }}
          />
        </div>

        {/* Nav buttons (visual only) */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ⬅️ Back
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ➡️ Next
          </button>
        </div>

        {/* Guide toggle (static hint) */}
        <div
          style={{
            marginTop: 10,
            padding: "8px 10px",
            background: "#fff7e6",
            border: "1px solid #ffe0b3",
            borderRadius: 8,
            fontSize: 13
          }}
        >
          📖 Health Monitoring Guide available in the form
        </div>
      </div>
    </div>
  );
}

function ChecklistPreview() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none"
      }}
    >
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Task Checklist</div>

        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            display: "grid",
            gap: 8
          }}
        >
          {[
            { label: "Changed water", checked: true },
            { label: "Cleaned shelter", checked: false },
            { label: "Electric fence ON", checked: true },
            { label: "Set fence voltage", checked: false }
          ].map((item, idx) => (
            <label
              key={idx}
              style={{ display: "flex", alignItems: "center", gap: 10, color: item.checked ? "#111" : "#444" }}
            >
              <input type="checkbox" readOnly checked={item.checked} />
              {item.label}
            </label>
          ))}
        </div>

        {/* Buttons (visual only) */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ⬅️ Back
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ➡️ Continue
          </button>
        </div>

        {/* Tiny hint */}
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7, textAlign: "center" }}>
          Complete all tasks to before submitting
        </div>
      </div>
    </div>
  );
}

function GeneralNotesPreview() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none"
      }}
    >
      <div style={{ padding: 16 }}>
        {/* Title */}
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>General Notes</div>

        {/* Notes area in a faux card */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            display: "grid",
            gap: 8
          }}
        >
          <label style={{ fontWeight: 700, display: "block" }}>Additional Notes</label>
          <textarea
            readOnly
            value={"ummmmmmmm"}
            style={{
              width: "100%",
              minHeight: 140,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              resize: "none"
            }}
          />
        </div>

        {/* Buttons (visual only) */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ⬅️ Back
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            ➡️ Next
          </button>
        </div>
      </div>
    </div>
  );
}


function ReviewPreview() {
  const dummyTasks = {
    waterChanged: true,
    shelterCleaned: true,
    electricFenceOn: true,
    setElectricFenceVoltage: false,
  };

  const goats = [
    { id: "1", name: "Kai", stool: "good", appetite: "normal" },
    { id: "2", name: "Mayu", stool: "soft", appetite: "poor" },
  ];

  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        maxWidth: 480,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
          Review Report
        </div>

        {/* Basic Info */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: "0 0 6px", fontWeight: 700 }}>Basic Info</h3>
          <p>Caretaker: Alice</p>
          <p>Date: 2025-08-20</p>
          <p>Temp: 24 °C</p>
          <p>Weather: Clear sky</p>
        </div>

        {/* Goats */}
        {goats.map((g) => (
          <div
            key={g.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 10,
              marginBottom: 12,
            }}
          >
            <h3 style={{ margin: "0 0 6px", fontWeight: 700 }}>{g.name}</h3>
            <p>Stool: {g.stool}</p>
            <p>Appetite: {g.appetite}</p>
          </div>
        ))}

        {/* Tasks */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: "0 0 6px", fontWeight: 700 }}>Task Checklist</h3>
          <p>Changed water: {dummyTasks.waterChanged ? "✅" : "❌"}</p>
          <p>Cleaned shelter: {dummyTasks.shelterCleaned ? "✅" : "❌"}</p>
          <p>Electric fence: {dummyTasks.electricFenceOn ? "✅" : "❌"}</p>
          <p>Voltage set: {dummyTasks.setElectricFenceVoltage ? "✅" : "❌"}</p>
        </div>

        {/* Notes */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: "0 0 6px", fontWeight: 700 }}>General Notes</h3>
          <p>Observed mild limping on one goat.</p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              background: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            ⬅️ Back
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 14px",
              background: "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "not-allowed",
            }}
          >
            ✅ Submit
          </button>
        </div>
      </div>
    </div>
  );
}


export default function SampleReport() {
  return (
    <div
      style={{
        paddingTop: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--background-color)",
        paddingBottom: 60,
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* spacer for navbar */}
        <div style={{ height: 60 }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
          <h1 style={{ margin: "0 0 12px 0" }}>Sample Report</h1>
          <p style={{ margin: "0 0 20px 0", opacity: 0.8 }}>
            A quick visual walkthrough of how reporting works.
          </p>

          {/* ===== Timeline wrapper ===== */}
          <div
            style={{
              position: "relative",
              paddingLeft: 56,         // room for the rail + badges
            }}
          >
            {/* Vertical rail */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 26,               // centers the rail under the badges
                top: 0,
                bottom: 0,
                width: 2,
                background: "rgba(0,0,0,0.08)",
              }}
            />

            {/* Steps */}
            <div style={{ display: "grid", gap: 18 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* Number badge */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -56 + 9,       // align with the rail
                      top: 18,
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "#4a90e2",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Content card */}
                  <Card
                    style={{
                      padding: 18,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{s.title}</div>
                    <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>
                      {s.desc}
                    </div>

                    {/* Step previews */}
                    {i === 0 && <LoginPreview />}
                    {i === 1 && <DashboardPreview />}
                    {i === 2 && <BasicInfoPreview />}
                    {i === 3 && <GoatFormPreview />}
                    {i === 4 && <ChecklistPreview />}
                    {i === 5 && <GeneralNotesPreview />}
                    {i === 6 && <ReviewPreview />}
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {/* ===== /Timeline wrapper ===== */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
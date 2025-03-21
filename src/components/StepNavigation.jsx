import { useNavigate } from "react-router-dom";

export default function StepNavigation({ prevPage, nextPage }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      {prevPage && (
        <button
          onClick={() => navigate(prevPage)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4a90e2",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          ← Back
        </button>
      )}
      {nextPage && (
        <button
          onClick={() => navigate(nextPage)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}
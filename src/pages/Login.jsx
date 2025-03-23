import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import Card

export default function Login() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)"
    }}>
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <Card>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center"
        }}>
          Login
        </h1>

        <p style={{
          fontSize: "1.2rem",
          color: "#555",
          textAlign: "center",
          maxWidth: "500px",
          marginTop: "10px"
        }}>
          🚧 This feature is coming soon!
        </p>
      </Card>
    </div>
  );
}
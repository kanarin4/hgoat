// import Navbar from "../components/Navbar";
// import Card from "../components/Card"; // ✅ Import Card

// export default function Login() {
//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       minHeight: "100vh",
//       backgroundColor: "var(--background-color)",
//       color: "var(--text-color)"
//     }}>
//       <Navbar />
//       <div style={{ height: "60px" }}></div>

//       <Card>
//         <h1 style={{
//           fontSize: "2rem",
//           fontWeight: "bold",
//           marginBottom: "10px",
//           textAlign: "center"
//         }}>
//           Login
//         </h1>

//         <p style={{
//           fontSize: "1.2rem",
//           color: "#555",
//           textAlign: "center",
//           maxWidth: "500px",
//           marginTop: "10px"
//         }}>
//           🚧 This feature is coming soon!
//         </p>
//       </Card>
//     </div>
//   );
// }




import { supabase } from "../services/supabaseClient";
import Navbar from "../components/Navbar";

export default function Login() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Login error:', error.message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ height: "60px" }}></div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</h1>
      <p>🚧 This feature is kinda working!!</p>
      <button onClick={handleLogin} style={{
        padding: "12px 24px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "20px"
      }}>
        Sign in with Google
      </button>
    </div>
  );
}
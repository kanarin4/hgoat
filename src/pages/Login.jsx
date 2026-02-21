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






// import { supabase } from "../services/supabaseClient";
// import Navbar from "../components/Navbar";

// export default function Login() {
//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "https://hgoat.spacecaret.com/dashboard" // 👈 Set this to where you want users to go after login
//       },
//     });
//     if (error) console.error("Login error:", error.message);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
//       <Navbar />
//       <div style={{ height: "60px" }}></div>
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</h1>
//       <p>🚧 This feature is kinda working!!</p>
//       <button
//         onClick={handleLogin}
//         style={{
//           padding: "12px 24px",
//           backgroundColor: "#4285F4",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           fontSize: "1rem",
//           cursor: "pointer",
//           marginTop: "20px"
//         }}
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// }


import { supabase } from "../services/supabaseClient";
import Navbar from "../components/Navbar";
import { USE_SUPABASE } from "../services/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!USE_SUPABASE) {
      console.log("Mocking login...");
      // In mock mode, we just redirect to dashboard
      navigate("/");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // ✅ Works in dev (http://localhost:5173) and prod (https://hgoat.spacecaret.com)
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ height: "60px" }} />
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</h1>
      <p></p>
      <button
        onClick={handleLogin}
        style={{
          padding: "12px 24px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}





// import { supabase } from "../services/supabaseClient";
// import Navbar from "../components/Navbar";

// export default function Login() {
//   const handleLogin = async () => {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: 'https://hgoat.spacecaret.com/auth/callback', // ✅ ADD THIS LINE
//     },
//   });
//   if (error) console.error('Login error:', error.message);
// };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
//       <Navbar />
//       <div style={{ height: "60px" }}></div>
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</h1>
//       <p>🚧 This feature is kinda working!!</p>
//       <button onClick={handleLogin} style={{
//         padding: "12px 24px",
//         backgroundColor: "#4285F4",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         fontSize: "1rem",
//         cursor: "pointer",
//         marginTop: "20px"
//       }}>
//         Sign in with Google
//       </button>
//     </div>
//   );
// }
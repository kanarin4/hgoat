


// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useSession } from "../hooks/useSession"; // ✅ make sure this is the correct path
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const { t, i18n } = useTranslation();
//   const sessionResult = useSession(); // ✅ rename to avoid destructuring crash
//   const session = sessionResult?.session;
//   const navigate = useNavigate(); // ✅ Add this line

//   const toggleLanguage = () => {
//     i18n.changeLanguage(i18n.language === "en" ? "ja" : "en");
//   };

//   return (
//     <nav style={{
//       width: "100%",
//       backgroundColor: "#ffffff",
//       padding: "10px 20px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000
//     }}>
//       {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//         <h2 style={{ margin: 0, cursor: "pointer" }}>🐐 HGoat Care</h2>
//       </Link> */}

//       <h2
//         onClick={() => navigate("/")} // ✅ Programmatic nav works everywhere
//         style={{
//           margin: 0,
//           cursor: "pointer",
//           userSelect: "none"
//         }}
//       >
//         🐐 HGoat Care
//       </h2>


//       <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//         <button onClick={toggleLanguage} style={{
//           background: "none",
//           border: "none",
//           color: "#4a90e2",
//           cursor: "pointer",
//           fontSize: "1rem"
//         }}>
//           {i18n.language === "en" ? "🇯🇵 日本語" : "🇬🇧 English"}
//         </button>

//         {session ? (
//           <button
//             onClick={() => sessionResult.logout()}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "#f44336",
//               color: "white",
//               borderRadius: "6px",
//               border: "none",
//               cursor: "pointer",
//               transition: "0.3s",
//               fontSize: "0.9rem",
//               marginRight: "30px"
//             }}
//             onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
//             onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
//           >
//             🚪 {t("logout")}
//           </button>
//         ) : (
//           <Link to="/login">
//             <button
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: "#4a90e2",
//                 color: "white",
//                 borderRadius: "6px",
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "0.3s",
//                 fontSize: "0.9rem",
//                 marginRight: "30px"
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
//               onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}
//             >
//               🔑 {t("login")}
//             </button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }




// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSession } from "../hooks/useSession";
import { supabase } from "../services/supabaseClient";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const session = useSession();            // ← your hook returns the session object
  const isLoggedIn = Boolean(session?.user);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ja" : "en");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // optional, send home after logout
  };

  return (
    <nav
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* Clickable brand → Home */}
      <h2
        onClick={() => navigate("/")}
        style={{ margin: 0, cursor: "pointer", userSelect: "none" }}
      >
        🐐 HGoat Care
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          style={{
            background: "none",
            border: "none",
            color: "#4a90e2",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {i18n.language === "en" ? "🇯🇵 日本語" : "🇬🇧 English"}
        </button>

        {isLoggedIn ? (
          <>
            {/* Account button (optional route) */}
            <button
              onClick={() => navigate("/account")}
              title="Account"
              style={{
                background: "#f3f4f6",
                border: "none",
                borderRadius: "999px",
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              👤
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: "0.9rem",
                marginRight: "10px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
            >
              🚪 {t("logout")}
            </button>
          </>
        ) : (
          <Link to="/login">
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#4a90e2",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: "0.9rem",
                marginRight: "30px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
            >
              🔑 {t("login")}
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
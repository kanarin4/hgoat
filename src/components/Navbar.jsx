// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// export default function Navbar() {
//   const { t, i18n } = useTranslation();

//   // Function to toggle language
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
//       {/* 🏠 Clickable Logo → Home */}
//       <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//         <h2 style={{
//           margin: 0,
//           cursor: "pointer"
//         }}>
//           🐐 HGoat Care
//         </h2>
//       </Link>

//       {/* Right-side elements */}
//       <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//         {/* 🌐 Language Toggle */}
//         <button onClick={toggleLanguage} style={{
//           background: "none",
//           border: "none",
//           color: "#4a90e2",
//           cursor: "pointer",
//           fontSize: "1rem"
//         }}>
//           {i18n.language === "en" ? "🇯🇵 日本語" : "🇬🇧 English"}
//         </button>

//         {/* 🔑 Login Button */}
//         <Link to="/login">
//           <button style={{
//             padding: "8px 16px",
//             backgroundColor: "#4a90e2",
//             color: "white",
//             borderRadius: "6px",
//             border: "none",
//             cursor: "pointer",
//             transition: "0.3s",
//             fontSize: "0.9rem",
//             marginRight: "30px"
//           }}
//           onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
//           onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}>
//             🔑 {t("login")}
//           </button>
//         </Link>
//       </div>
//     </nav>
//   );
// }





import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSession } from "../hooks/useSession"; // ✅ make sure this is the correct path
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const sessionResult = useSession(); // ✅ rename to avoid destructuring crash
  const session = sessionResult?.session;
  const navigate = useNavigate(); // ✅ Add this line

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ja" : "en");
  };

  return (
    <nav style={{
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
      zIndex: 1000
    }}>
      {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 style={{ margin: 0, cursor: "pointer" }}>🐐 HGoat Care</h2>
      </Link> */}

      <h2
        onClick={() => navigate("/")} // ✅ Programmatic nav works everywhere
        style={{
          margin: 0,
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        🐐 HGoat Care
      </h2>


      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={toggleLanguage} style={{
          background: "none",
          border: "none",
          color: "#4a90e2",
          cursor: "pointer",
          fontSize: "1rem"
        }}>
          {i18n.language === "en" ? "🇯🇵 日本語" : "🇬🇧 English"}
        </button>

        {session ? (
          <button
            onClick={() => sessionResult.logout()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: "0.9rem",
              marginRight: "30px"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
          >
            🚪 {t("logout")}
          </button>
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
                marginRight: "30px"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#357ABD"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}
            >
              🔑 {t("login")}
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
// export default function Card({ children }) {
//     return (
//       <div style={{
//         background: "white",
//         borderRadius: "12px",
//         padding: "20px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         margin: "10px"
//       }}>
//         {children}
//       </div>
//     );
//   }




export default function Card({ children }) {
    return (
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "10px",
        width: "80%", // Ensure all cards take up the same width
        maxWidth: "600px", // Consistent max width
      }}>
        {children}
      </div>
    );
  }
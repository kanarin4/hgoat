export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "18px 20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08)",
        margin: "12px auto",
        width: "90%",
        maxWidth: "540px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
import { supabase } from "./supabaseClient";

export const downloadGoatReportsCSV = async () => {
  try {
    // 🔍 Fetch all reports from the database
    const { data, error } = await supabase.from("goat_reports").select("*");

    if (error) throw error;

    if (!data || data.length === 0) {
      console.warn("No data found for CSV download.");
      alert("No data available to download.");
      return;
    }

    // 📝 Convert JSON data to CSV format
    const csv = convertToCSV(data);

    // 📄 Create a Blob for the CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 📥 Create a download link and trigger click
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "goat_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error during CSV download:", error);
    alert("Failed to download CSV.");
  }
};

// 📊 Convert JSON data to CSV format
const convertToCSV = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("No data available to convert to CSV.");
  }

  const keys = Object.keys(data[0]); // Get column names
  const csv = [
    keys.join(","), // Header row
    ...data.map((row) =>
      keys
        .map((key) => {
          let value = row[key] || "";
          if (key === "date" && value) {
            value = new Date(value).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
          }
          return `"${value}"`;
        })
        .join(",")
    ),
  ].join("\n");

  return csv;
};
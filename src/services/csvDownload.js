// // services/csvDownload.js
// import { supabase } from "./supabaseClient";

// /**
//  * Download goat reports as CSV.
//  *
//  * @param {string}   [siteId]      Optional site_id to filter reports
//  * @param {string}   [siteLabel]   Optional label for filename (e.g., "H-Village")
//  * @param {string}   [dateFrom]    Optional start date (YYYY-MM-DD)
//  * @param {string}   [dateTo]      Optional end date (YYYY-MM-DD)
//  */
// export const downloadGoatReportsCSV = async (siteId, siteLabel, dateFrom, dateTo) => {
//   try {
//     // Try filtered fetch first (site_id + date range)
//     const { data, error, fallbackAll } = await fetchReports({ siteId, dateFrom, dateTo });

//     if (error) throw error;

//     // If site_id column didn’t exist, we fallback to all reports (unfiltered)
//     const rows = fallbackAll ?? data;

//     if (!rows || rows.length === 0) {
//       console.warn("No data found for CSV download.");
//       alert("No data available to download.");
//       return;
//     }

//     finalizeDownload(rows, siteLabel);
//   } catch (error) {
//     console.error("Error during CSV download:", error);
//     alert("Failed to download CSV.");
//   }
// };

// /**
//  * Fetch reports with optional site/date filters, with pagination.
//  * Gracefully falls back to unfiltered when site_id is missing on the table.
//  */
// async function fetchReports({ siteId, dateFrom, dateTo }) {
//   const pageSize = 1000;
//   let start = 0;
//   let allRows = [];

//   // Build a base query function so we can re-run for pagination
//   const buildQuery = () => {
//     let q = supabase.from("goat_reports").select("*"); // select all columns
//     if (siteId) q = q.eq("site_id", siteId);          // will throw if column missing
//     if (dateFrom) q = q.gte("date", dateFrom);
//     if (dateTo) q = q.lte("date", dateTo);
//     return q;
//   };

//   try {
//     while (true) {
//       const { data, error } = await buildQuery().range(start, start + pageSize - 1);
//       if (error) return { data: null, error };

//       allRows = allRows.concat(data || []);
//       if (!data || data.length < pageSize) break; // done
//       start += pageSize;
//     }

//     return { data: allRows, error: null, fallbackAll: null };
//   } catch (e) {
//     // If site_id doesn’t exist yet, PostgREST typically throws a 400 with message about unknown column.
//     const msg = String(e?.message || e);
//     if (siteId && msg.includes('column "site_id"')) {
//       console.warn('site_id not found on goat_reports; falling back to unfiltered download.');
//       // Fallback: fetch everything without filters (paginated)
//       return await fetchAllReportsUnfiltered();
//     }
//     // Unknown error
//     return { data: null, error: e };
//   }
// }

// /** Fallback: fetch all rows without filters, paginated. */
// async function fetchAllReportsUnfiltered() {
//   const pageSize = 1000;
//   let start = 0;
//   let allRows = [];
//   while (true) {
//     const { data, error } = await supabase
//       .from("goat_reports")
//       .select("*")
//       .range(start, start + pageSize - 1);
//     if (error) return { data: null, error };

//     allRows = allRows.concat(data || []);
//     if (!data || data.length < pageSize) break;
//     start += pageSize;
//   }
//   return { data: null, error: null, fallbackAll: allRows };
// }

// function finalizeDownload(data, siteLabel) {
//   const csv = convertToCSV(data);
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const fileSafe = siteLabel ? `_${slugify(siteLabel)}` : "";
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", `goat_reports${fileSafe}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// // Convert JSON to CSV with basic quoting/escaping
// const convertToCSV = (rows) => {
//   if (!rows || !Array.isArray(rows) || rows.length === 0) {
//     throw new Error("No data available to convert to CSV.");
//   }

//   const headers = Object.keys(rows[0]);
//   const lines = [headers.join(",")];

//   for (const row of rows) {
//     const line = headers
//       .map((key) => {
//         let value = row[key];
//         if (value == null) value = "";
//         if (key === "date" && value) {
//           const d = new Date(value);
//           if (!isNaN(d)) value = d.toISOString().split("T")[0];
//         }
//         // Quote-wrapping + escape quotes
//         return `"${String(value).replace(/"/g, '""')}"`;
//       })
//       .join(",");
//     lines.push(line);
//   }
//   return lines.join("\n");
// };

// function slugify(s = "") {
//   return s
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }







// services/csvDownload.js
import { supabase } from "./supabaseClient";
import { USE_SUPABASE } from "./config";
import { mockTodayReports } from "./mockData";

/**
 * Download reports as CSV, preferring the flattened view.
 * @param {string} [siteId]
 * @param {string} [siteLabel]
 * @param {string} [dateFrom] - YYYY-MM-DD
 * @param {string} [dateTo]   - YYYY-MM-DD
 */
export async function downloadGoatReportsCSV(siteId, siteLabel, dateFrom, dateTo) {
  if (!USE_SUPABASE) {
    console.log("Mocking CSV download...");
    finalizeDownload(mockTodayReports, siteLabel || "Mock-Site", "mock_reports");
    return;
  }
  try {
    // 1) Try the flat view (v_site_report_goat_flat)
    const flat = await fetchFlatView({ siteId, dateFrom, dateTo });
    if (flat.ok) {
      finalizeDownload(flat.rows, siteLabel || flat.siteNameGuess, /*filenameBase*/ "site_report_goat_flat");
      return;
    }

    console.warn("Falling back to goat_reports (flat view unavailable):", flat.error?.message || flat.error);

    // 2) Fallback → raw goat_reports
    const raw = await fetchGoatReports({ siteId, dateFrom, dateTo });
    if (raw.error) throw raw.error;

    finalizeDownload(raw.rows, siteLabel, /*filenameBase*/ "goat_reports");
  } catch (err) {
    console.error("Error during CSV download:", err);
    alert("Failed to download CSV.");
  }
}

/* ---------- Fetch helpers ---------- */

async function fetchFlatView({ siteId, dateFrom, dateTo }) {
  const pageSize = 1000;
  let start = 0;
  let all = [];

  const build = () => {
    // If the view doesn't exist or columns differ, this will error and we'll catch below.
    let q = supabase.from("v_site_report_goat_flat").select("*", { count: "exact" });

    if (siteId) q = q.eq("site_id", siteId);
    if (dateFrom) q = q.gte("report_date", dateFrom);
    if (dateTo) q = q.lte("report_date", dateTo);

    // Order by report_id for stable CSV
    q = q.order("report_id", { ascending: true });

    return q;
  };

  try {
    while (true) {
      const { data, error } = await build().range(start, start + pageSize - 1);
      if (error) return { ok: false, error };

      all = all.concat(data || []);
      if (!data || data.length < pageSize) break;
      start += pageSize;
    }
    return { ok: true, rows: all, siteNameGuess: all?.[0]?.site_name || "" };
  } catch (e) {
    // e.g. PGRST204 (relation not found) or similar
    return { ok: false, error: e };
  }
}

async function fetchGoatReports({ siteId, dateFrom, dateTo }) {
  const pageSize = 1000;
  let start = 0;
  let all = [];

  const build = () => {
    let q = supabase.from("goat_reports").select("*");
    if (siteId) q = q.eq("site_id", siteId);      // if site_id doesn't exist, this will throw and be caught by caller
    if (dateFrom) q = q.gte("date", dateFrom);
    if (dateTo) q = q.lte("date", dateTo);
    q = q.order("id", { ascending: true });       // stable order
    return q;
  };

  try {
    while (true) {
      const { data, error } = await build().range(start, start + pageSize - 1);
      if (error) return { rows: null, error };

      all = all.concat(data || []);
      if (!data || data.length < pageSize) break;
      start += pageSize;
    }
    return { rows: all, error: null };
  } catch (e) {
    // If site_id column doesn’t exist yet, caller will show fallback message already
    return { rows: null, error: e };
  }
}

/* ---------- CSV & helpers ---------- */

function finalizeDownload(rows, siteLabel, filenameBase) {
  if (!rows || rows.length === 0) {
    alert("No data available to download.");
    return;
  }
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const suffix = siteLabel ? `_${slugify(siteLabel)}` : "";
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filenameBase}${suffix}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function toCSV(rows) {
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];

  for (const r of rows) {
    const line = headers.map((k) => {
      let v = r[k];
      if (v == null) v = "";
      // normalize date-like fields
      if (/(^date$|_date$)/.test(k) && v) {
        const d = new Date(v);
        if (!isNaN(d)) v = d.toISOString().split("T")[0];
      }
      return `"${String(v).replace(/"/g, '""')}"`;
    }).join(",");
    lines.push(line);
  }
  return lines.join("\n");
}

function slugify(s = "") {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
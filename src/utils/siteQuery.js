// src/utils/siteQuery.js
export function buildSiteQS({ formData, location }) {
  const sp = new URLSearchParams(location?.search || "");
  const site = formData?.site_id || sp.get("site") || localStorage.getItem("last_site_id") || "";
  const siteName = formData?.site_label || sp.get("siteName") || "";

  const qs = new URLSearchParams();
  if (siteName) qs.set("siteName", siteName);
  if (site) qs.set("site", site);

  const s = qs.toString();
  return s ? `?${s}` : "";
}
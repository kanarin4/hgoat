// src/services/mockData.js

export const mockSites = [
    { id: "site-1", name: "H-Village Main Pen" },
    { id: "site-2", name: "Mountain Pasture" },
    { id: "site-3", name: "Riverside Annex" },
];

export const mockMemberships = [
    { site_id: "site-1", site_name: "H-Village Main Pen", role: "admin", created_at: "2023-01-01T00:00:00Z" },
    { site_id: "site-2", site_name: "Mountain Pasture", role: "caretaker", created_at: "2023-05-15T00:00:00Z" },
];

export const mockTodayReports = [
    { site_id: "site-1", caretaker_name: "Admin User", date: new Date().toISOString().split("T")[0] },
];

export const mockGoats = [
    { id: "goat-1", name: "Kai", site_id: "site-1" },
    { id: "goat-2", name: "Mayu", site_id: "site-1" },
    { id: "goat-3", name: "Yuki", site_id: "site-2" },
];

export const mockTemperatureData = [
    { date: "2024-03-01", goat_a_temperature: 38.5, goat_b_temperature: 39.1 },
    { date: "2024-03-02", goat_a_temperature: 38.7, goat_b_temperature: 38.9 },
    { date: "2024-03-03", goat_a_temperature: 39.0, goat_b_temperature: 39.2 },
    { date: "2024-03-04", goat_a_temperature: 38.4, goat_b_temperature: 38.8 },
    { date: "2024-03-05", goat_a_temperature: 38.6, goat_b_temperature: 39.0 },
];

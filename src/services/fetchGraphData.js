import { supabase } from "./supabaseClient";

export const fetchTemperatureData = async () => {
    try {
        const { data, error } = await supabase
            .from("goat_reports")
            .select("date, goat_a_temperature, goat_b_temperature")
            .order("date", { ascending: true }); // Sort by date

        if (error) {
            console.error("Error fetching temperature data:", error);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching temperature data:", err);
        return null;
    }
};
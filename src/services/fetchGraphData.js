
export const fetchTemperatureData = async () => {
    if (!USE_SUPABASE) {
        // Return mock data for development/testing when Supabase is toggled off
        console.log("Using mock data for temperature data (USE_SUPABASE is false).");
        return [
            { date: "2023-01-01", goat_a_temperature: 38.5, goat_b_temperature: 39.0 },
            { date: "2023-01-02", goat_a_temperature: 38.7, goat_b_temperature: 39.1 },
            { date: "2023-01-03", goat_a_temperature: 38.6, goat_b_temperature: 38.9 },
            { date: "2023-01-04", goat_a_temperature: 38.8, goat_b_temperature: 39.2 },
            { date: "2023-01-05", goat_a_temperature: 38.9, goat_b_temperature: 39.0 },
        ];
    }

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
import { useEffect, useState } from "react";
import { fetchTemperatureData } from "../services/fetchGraphData"; // ✅ Import Data Fetching
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function TemperatureGraph() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchTemperatureData();
            if (data) {
                setChartData(data.map(entry => ({
                    date: entry.date, 
                    goatA: entry.goat_a_temperature, 
                    goatB: entry.goat_b_temperature
                })));
            }
        };

        getData();
    }, []);

    return (
        <div style={{ width: "100%", height: 300, backgroundColor: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>📈 Goat Temperatures Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="goatA" stroke="#FF6384" strokeWidth={2} />
                    <Line type="monotone" dataKey="goatB" stroke="#36A2EB" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
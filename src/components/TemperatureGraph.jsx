// import { useEffect, useState } from "react";
// import { fetchTemperatureData } from "../services/fetchGraphData"; // ✅ Import Data Fetching
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import { useTranslation } from "react-i18next"; // ✅ Add this

// export default function TemperatureGraph() {
//     const [chartData, setChartData] = useState([]);
//     const { t } = useTranslation();

//     useEffect(() => {
//         const getData = async () => {
//             const data = await fetchTemperatureData();
//             if (data) {
//                 setChartData(data.map(entry => ({
//                     date: entry.date, 
//                     goatA: entry.goat_a_temperature, 
//                     goatB: entry.goat_b_temperature
//                 })));
//             }
//         };

//         getData();
//     }, []);

//     return (
//         <div style={{ width: "100%", height: 300, backgroundColor: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
//             <h2 style={{ textAlign: "center", marginBottom: "10px" }}>📈 Goat Temperatures Over Time</h2>
//             <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="goatA" name={t("goatKai")} stroke="#FF6384" strokeWidth={2} />
//                     <Line type="monotone" dataKey="goatB" name={t("goatMayu")} stroke="#36A2EB" strokeWidth={2} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }



import { useEffect, useRef, useState } from "react";
import { fetchTemperatureData } from "../services/fetchGraphData";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { useTranslation } from "react-i18next";

export default function TemperatureGraph() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTemperatureData();
      if (data) {
        const formatted = data.map(entry => ({
          date: entry.date,
          goatA: entry.goat_a_temperature,
          goatB: entry.goat_b_temperature
        }));
        setChartData(formatted);

        // 👇 Scroll to the rightmost side after a delay
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
          }
        }, 100);
      }
    };

    getData();
  }, []);

  return (
    <div style={{
      width: "100%",
      height: 300,
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      {/* 📌 Keep heading fixed */}
      {/* <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        📈 {t("temperatureTrends")}
      </h2> */}

      {/* Scrollable chart container */}
      <div
        ref={scrollRef}
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          paddingBottom: "10px"
        }}
      >
        <div style={{ minWidth: "800px" }}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip />
              <Line type="monotone" dataKey="goatA" name={t("goatKai")} stroke="#36A2EB" strokeWidth={2} />
              <Line type="monotone" dataKey="goatB" name={t("goatMayu")} stroke="#FF6384" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
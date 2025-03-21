import { weatherCodeDescriptions } from "./weatherCodes";

export const getWeatherCondition = (weatherCode, language = "en") => {
    return weatherCodeDescriptions[language]?.[weatherCode] || "Unknown";
};
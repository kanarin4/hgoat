export const getCurrentWeather = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Asia%2FTokyo`
        );
        const data = await response.json();
        
        if (data?.current_weather) {
            console.log("Weather Data:", data.current_weather);
            return {
                temperature: data.current_weather.temperature,
                weather_code: data.current_weather.weathercode
            };
        }
        
        return { temperature: null, weather_code: null };
    } catch (error) {
        console.error("Error fetching current weather data:", error);
        return { temperature: null, weather_code: null };
    }
};
// Weather code (WMO) -> label, emoji icon, and background theme
export const getWeatherInfo = (code) => {
  if (code === 0) return { label: "Clear sky", icon: "☀️", theme: "clear" };
  if (code === 1) return { label: "Mainly clear", icon: "🌤️", theme: "clear" };
  if (code === 2) return { label: "Partly cloudy", icon: "⛅", theme: "cloudy" };
  if (code === 3) return { label: "Overcast", icon: "☁️", theme: "cloudy" };
  if (code === 45 || code === 48) return { label: "Fog", icon: "🌫️", theme: "fog" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", icon: "🌦️", theme: "rain" };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { label: "Rain", icon: "🌧️", theme: "rain" };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { label: "Snow", icon: "❄️", theme: "snow" };
  if (code >= 95) return { label: "Thunderstorm", icon: "⛈️", theme: "storm" };
  return { label: "Unknown", icon: "🌡️", theme: "clear" };
};
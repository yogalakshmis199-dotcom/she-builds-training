const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const getCoordinates = async (city) => {
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);
  if (!res.ok) throw new Error("Could not reach the location service.");
  const data = await res.json();
  if (!data.results?.length) throw new Error(`City "${city}" not found. Check the spelling and try again.`);
  const { name, country, latitude, longitude } = data.results[0];
  return { name, country, latitude, longitude };
};

// Current weather + 5-day forecast in one call
export const getWeather = async ({ latitude, longitude }) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: 5,
  });
  const res = await fetch(`${WEATHER_URL}?${params}`);
  if (!res.ok) throw new Error("Could not load weather data. Try again later.");
  return res.json();
};
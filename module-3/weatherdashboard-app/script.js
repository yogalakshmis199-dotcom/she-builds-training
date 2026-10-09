// Weather Dashboard - uses the free Open-Meteo API (no API key needed)
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// WMO weather codes -> description + emoji
const WEATHER_CODES = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌦️"],
  61: ["Light rain", "🌧️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Rain showers", "🌧️"],
  82: ["Violent showers", "⛈️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with hail", "⛈️"],
};

const form = document.querySelector("#search-form");
const input = document.querySelector("#city-input");
const message = document.querySelector("#message");
const weatherCard = document.querySelector("#weather");

const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.classList.toggle("error", isError);
};

// Step 1: city name -> coordinates
const getCoordinates = async (city) => {
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);
  if (!res.ok) throw new Error("Could not reach the location service.");
  const data = await res.json();
  if (!data.results?.length) throw new Error(`City "${city}" not found. Check the spelling and try again.`);
  const { name, country, latitude, longitude } = data.results[0];
  return { name, country, latitude, longitude };
};

// Step 2: coordinates -> current weather
const getWeather = async ({ latitude, longitude }) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
  });
  const res = await fetch(`${WEATHER_URL}?${params}`);
  if (!res.ok) throw new Error("Could not load weather data. Try again later.");
  const data = await res.json();
  return data.current;
};

const displayWeather = ({ name, country }, current) => {
  const [description, icon] = WEATHER_CODES[current.weather_code] ?? ["Unknown", "🌡️"];

  document.querySelector("#city-name").textContent = `${name}, ${country}`;
  document.querySelector("#icon").textContent = icon;
  document.querySelector("#temp").textContent = `${Math.round(current.temperature_2m)}°C`;
  document.querySelector("#condition").textContent = description;
  document.querySelector("#feels").textContent = `${Math.round(current.apparent_temperature)}°C`;
  document.querySelector("#humidity").textContent = `${current.relative_humidity_2m}%`;
  document.querySelector("#wind").textContent = `${current.wind_speed_10m} km/h`;
  weatherCard.hidden = false;
};

const searchCity = async (city) => {
  weatherCard.hidden = true;
  showMessage("Loading...");
  try {
    const location = await getCoordinates(city);
    const current = await getWeather(location);
    displayWeather(location, current);
    showMessage("");
  } catch (error) {
    // Network failures throw TypeError; show a friendlier message
    const text = error instanceof TypeError ? "Network error. Check your internet connection." : error.message;
    showMessage(text, true);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = input.value.trim();

  // Input validation: empty or contains no letters (e.g. "123", "!!!")
  if (!city) return showMessage("Please enter a city name.", true);
  if (!/\p{L}/u.test(city)) return showMessage("Enter a valid city name using letters.", true);

  searchCity(city);
});

// Show a default city on first load
searchCity("Chennai");
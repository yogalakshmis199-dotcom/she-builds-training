console.log("main.js loaded");
import { getCoordinates, getWeather } from "./api.js";
import { showMessage, hideDashboard, displayCurrent, displayForecast } from "./ui.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#city-input");

const searchCity = async (city) => {
  hideDashboard();
  showMessage("Loading...");
  try {
    const location = await getCoordinates(city);
    const data = await getWeather(location);
    displayCurrent(location, data.current);
    displayForecast(data.daily);
    showMessage("");
  } catch (error) {
    const text = error instanceof TypeError ? "Network error. Check your internet connection." : error.message;
    showMessage(text, true);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = input.value.trim();

  if (!city) return showMessage("Please enter a city name.", true);
  if (!/\p{L}/u.test(city)) return showMessage("Enter a valid city name using letters.", true);

  searchCity(city);
});

searchCity("Chennai"); // default city on first load
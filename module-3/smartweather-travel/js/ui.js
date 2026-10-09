import { getWeatherInfo } from "./icons.js";
import { getTravelTip } from "./travel.js";

const $ = (selector) => document.querySelector(selector);

export const showMessage = (text, isError = false) => {
  $("#message").textContent = text;
  $("#message").classList.toggle("error", isError);
};

export const hideDashboard = () => { $("#dashboard").hidden = true; };

export const displayCurrent = ({ name, country }, current) => {
  const { label, icon, theme } = getWeatherInfo(current.weather_code);

  document.body.dataset.theme = theme; // dynamic background
  $("#city-name").textContent = `${name}, ${country}`;
  $("#icon").textContent = icon;
  $("#temp").textContent = `${Math.round(current.temperature_2m)}°C`;
  $("#condition").textContent = label;
  $("#feels").textContent = `${Math.round(current.apparent_temperature)}°C`;
  $("#humidity").textContent = `${current.relative_humidity_2m}%`;
  $("#wind").textContent = `${current.wind_speed_10m} km/h`;
  $("#travel-tip").textContent = getTravelTip(current.weather_code, current.temperature_2m);
  $("#dashboard").hidden = false;
};

export const displayForecast = (daily) => {
  $("#forecast").innerHTML = daily.time
    .map((date, i) => {
      const { label, icon } = getWeatherInfo(daily.weather_code[i]);
      const day = new Date(`${date}T00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
      return `
        <div class="day">
          <p>${day}</p>
          <div class="d-icon" aria-hidden="true">${icon}</div>
          <p>${label}</p>
          <p class="range">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</p>
        </div>`;
    })
    .join("");
};
import { getWeatherInfo } from "./icons.js";

// Travel suggestion based on weather theme and temperature (°C)
export const getTravelTip = (code, temp) => {
  const { theme } = getWeatherInfo(code);

  const tips = {
    rain: "Rain expected. Carry an umbrella and plan indoor visits like museums, malls or cafes.",
    storm: "Thunderstorm alert. Avoid outdoor trips and stay safe indoors.",
    snow: "Snowy weather. Wear warm layers and check road conditions before travelling.",
    fog: "Low visibility. Drive carefully and keep sightseeing plans flexible.",
    cloudy: "Pleasant, cloudy weather. A good day for sightseeing and walking tours.",
    clear: "Clear skies. A great day for outdoor activities, beaches and photography.",
  };

  let tip = tips[theme];
  if (temp >= 35) tip += " It is very hot, so drink plenty of water and avoid midday sun.";
  else if (temp <= 10) tip += " It is cold, so carry a jacket.";
  return tip;
};
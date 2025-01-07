import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 63.1105,
  longitude: 7.7279,
  current: "temperature_2m",
  timezone: "Europe/Berlin",
  forecast_days: 1,
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current();

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  current: {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature2m: current.variables(0).value(),
  },
};

// Non-NPM
console.log(weatherData.current.temperature2m);
const temperatureField = document.querySelector("#temperatureField");
const currentTemperature = document.createElement("p");
currentTemperature.textContent = `${weatherData.current.temperature2m}°C`;
temperatureField.append(currentTemperature);

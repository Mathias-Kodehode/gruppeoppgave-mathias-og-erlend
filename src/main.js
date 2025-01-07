import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 63.1105,
  longitude: 7.7279,
  current: [
    "temperature_2m",
    "apparent_temperature",
    "wind_speed_10m",
    "wind_direction_10m",
  ],
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
    apparentTemperature: current.variables(1).value(),
    windSpeed10m: current.variables(2).value(),
    windDirection10m: current.variables(3).value(),
  },
};

// Non-NPM
console.log(weatherData.current.time);
console.log(weatherData.current.temperature2m);
console.log(weatherData.current.apparentTemperature);
console.log(weatherData.current.windSpeed10m);
console.log(weatherData.current.windDirection10m);

let realTemperature = weatherData.current.temperature2m.toFixed(2);
console.log(realTemperature);

let realFeelsTemperature = weatherData.current.apparentTemperature.toFixed(2);
console.log(realFeelsTemperature);

let realWindSpeed = weatherData.current.windSpeed10m.toFixed(2);
console.log(realWindSpeed);

// Display weather data dynamically
const temperatureField = document.querySelector("#temperatureField");

// Current Time
const currentTime = document.createElement("p");
currentTime.textContent = weatherData.current.time;

// Current Temperature
const currentTemperatureTitle = document.createElement("p");
currentTemperatureTitle.textContent = "Temperature:";
const currentTemperature = document.createElement("p");
currentTemperature.textContent = `Temperature: ${realTemperature}°C`;
if (realTemperature >= 0) {
  currentTemperature.classList = "aboveZero";
} else {
  currentTemperature.classList = "belowZero";
}

// Apparent Temperature
const apparentTemperature = document.createElement("p");
apparentTemperature.textContent = `Feels Like: ${realFeelsTemperature}°C`;
if (realFeelsTemperature >= 0) {
  apparentTemperature.classList = "aboveZero";
} else {
  apparentTemperature.classList = "belowZero";
}

// Wind Speed
const windSpeed = document.createElement("p");
windSpeed.textContent = `Wind Speed: ${realWindSpeed} km/h`;

// Wind Direction
const windDirection = document.createElement("p");
windDirection.textContent = `Wind Direction: ${weatherData.current.windDirection10m}°`;

// Append
temperatureField.append(
  currentTime,
  currentTemperature,
  apparentTemperature,
  windSpeed,
  windDirection
);

import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 63.1105,
  longitude: 7.7279,
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "is_day",
    "precipitation",
    "rain",
    "showers",
    "snowfall",
    "weather_code",
    "cloud_cover",
    "pressure_msl",
    "surface_pressure",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
  ],
  timezone: "auto",
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
    relativeHumidity2m: current.variables(1).value(),
    apparentTemperature: current.variables(2).value(),
    isDay: current.variables(3).value(),
    precipitation: current.variables(4).value(),
    rain: current.variables(5).value(),
    showers: current.variables(6).value(),
    snowfall: current.variables(7).value(),
    weatherCode: current.variables(8).value(),
    cloudCover: current.variables(9).value(),
    pressureMsl: current.variables(10).value(),
    surfacePressure: current.variables(11).value(),
    windSpeed10m: current.variables(12).value(),
    windDirection10m: current.variables(13).value(),
    windGusts10m: current.variables(14).value(),
  },
};

// Non-NPM
console.log("Current Time:", weatherData.current.time);
console.log("Current Temperature:", weatherData.current.temperature2m);
console.log("Apparent Temperature:", weatherData.current.apparentTemperature);
console.log("Current Windspeed:", weatherData.current.windSpeed10m);
console.log("Current Wind direction:", weatherData.current.windDirection10m);
console.log("Cloud Cover:", `${weatherData.current.cloudCover}%`);
console.log("WMO Weather Code", weatherData.current.weatherCode);

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

// Weather Code
const weatherCode = document.createElement("p");
weatherCode.classList = "weatherField";
// Curse of YandereDev 2 Thunderstorm boogaloo
if (weatherData.current.weatherCode == 0) {
  weatherCode.textContent = "Cloud development not observed or not observable";
} else if (weatherData.current.weatherCode == 1) {
  weatherCode.textContent =
    "Clouds generally dissolving or becoming less developed";
} else if (weatherData.current.weatherCode == 2) {
  weatherCode.textContent = "State of sky on the whole unchanged";
} else if (weatherData.current.weatherCode == 3) {
  weatherCode.textContent = "Clouds generally forming or developing";
} else if (weatherData.current.weatherCode == 4) {
  weatherCode.textContent =
    "Visibility reduced by smoke, e.g. veldt or forest fires, industrial smoke or volcanic ashes";
} else if (weatherData.current.weatherCode == 5) {
  weatherCode.textContent = "Haze";
} else if (weatherData.current.weatherCode == 6) {
  weatherCode.textContent =
    "Widespread dust in suspension in the air, not raised by wind at or near the station at the time of observation";
} else if (weatherData.current.weatherCode == 7) {
  weatherCode.textContent =
    "Dust or sand raised by wind at or near the station at the time of observation, but no well developed dust whirl(s) or sand whirl(s), and no duststorm or sandstorm seen";
} else if (weatherData.current.weatherCode == 8) {
  weatherCode.textContent =
    "Well developed dust whirl(s) or sand whirl(s) seen at or near the station during the preceding hour or at the time ot observation, but no duststorm or sandstorm";
} else if (weatherData.current.weatherCode == 9) {
  weatherCode.textContent =
    "Duststorm or sandstorm within sight at the time of observation, or at the station during the preceding hour";
} else if (weatherData.current.weatherCode == 10) {
  weatherCode.textContent = "Mist";
} else if (weatherData.current.weatherCode == 11) {
  weatherCode.textContent =
    "Patches of shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea";
} else if (weatherData.current.weatherCode == 12) {
  weatherCode.textContent =
    "	More or less continuous shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea";
} else if (weatherData.current.weatherCode == 13) {
  weatherCode.textContent = "	Lightning visible, no thunder heard";
} else if (weatherData.current.weatherCode == 14) {
  weatherCode.textContent =
    "Precipitation within sight, not reaching the ground or the surface of the sea";
} else if (weatherData.current.weatherCode == 15) {
  weatherCode.textContent =
    "Precipitation within sight, reaching the ground or the surface of the sea, but distant, i.e. estimated to be more than 5 km from the station";
} else if (weatherData.current.weatherCode == 16) {
  weatherCode.textContent =
    "Precipitation within sight, reaching the ground or the surface of the sea, near to, but not at the station";
} else if (weatherData.current.weatherCode == 17) {
  weatherCode.textContent =
    "Thunderstorm, but no precipitation at the time of observation";
} else if (weatherData.current.weatherCode == 18) {
  weatherCode.textContent =
    "Squalls at or within sight of the station during the preceding hour or at the time of observation";
} else if (weatherData.current.weatherCode == 19) {
  weatherCode.textContent =
    "Funnel cloud(s), Tornado cloud(s) or Water-spout(s) at or within sight of the station during the preceding hour or at the time of observation";
} else if (weatherData.current.weatherCode == 20) {
  weatherCode.textContent =
    "Drizzle (not freezing) or snow grains not falling as shower(s)";
} else if (weatherData.current.weatherCode == 21) {
  weatherCode.textContent = "Rain (not freezing) not falling as shower(s)";
} else if (weatherData.current.weatherCode == 22) {
  weatherCode.textContent = "Snow not falling as shower(s)";
} else if (weatherData.current.weatherCode == 23) {
  weatherCode.textContent =
    "Rain and snow or ice pellets not falling as shower(s)";
} else if (weatherData.current.weatherCode == 24) {
  weatherCode.textContent =
    "Freezing drizzle or freezing rain not falling as shower(s)";
} else if (weatherData.current.weatherCode == 25) {
  weatherCode.textContent = "Shower(s) of rain";
} else if (weatherData.current.weatherCode == 26) {
  weatherCode.textContent = "Shower(s) of snow, or of rain and snow";
} else if (weatherData.current.weatherCode == 27) {
  weatherCode.textContent = "Shower(s) of hail, or of rain and hail";
} else if (weatherData.current.weatherCode == 28) {
  weatherCode.textContent = "Fog or ice fog";
} else if (weatherData.current.weatherCode == 29) {
  weatherCode.textContent = "Thunderstorm (with or without precipitation)";
} else if (weatherData.current.weatherCode == 30) {
  weatherCode.textContent =
    "Slight or moderate duststorm or sandstorm - has decreased during the preceding hour";
} else if (weatherData.current.weatherCode == 31) {
  weatherCode.textContent =
    "Slight or moderate duststorm or sandstorm - no appreciable change during the preceding hour";
} else if (weatherData.current.weatherCode == 32) {
  weatherCode.textContent =
    "Slight or moderate duststorm or sandstorm - has begun or has increased during the preceding hour";
} else if (weatherData.current.weatherCode == 33) {
  weatherCode.textContent =
    "Severe duststorm or sandstorm - has decreased during the preceding hour";
} else if (weatherData.current.weatherCode == 34) {
  weatherCode.textContent =
    "Severe duststorm or sandstorm - no appreciable change during the preceding hour";
} else if (weatherData.current.weatherCode == 35) {
  weatherCode.textContent =
    "Severe duststorm or sandstorm - has begun or has increased during the preceding hour";
} else if (weatherData.current.weatherCode == 36) {
  weatherCode.textContent =
    "Slight or moderate blowing snow generally low (below eye level)";
} else if (weatherData.current.weatherCode == 37) {
  weatherCode.textContent =
    "Heavy drifting snow generally low (below eye level)";
} else if (weatherData.current.weatherCode == 38) {
  weatherCode.textContent =
    "Slight or moderate blowing snow generally high (above eye level)";
} else if (weatherData.current.weatherCode == 39) {
  weatherCode.textContent =
    "Heavy drifting snow generally high (above eye level)";
} else if (weatherData.current.weatherCode == 40) {
  weatherCode.textContent =
    "Fog or ice fog at a distance at the time of observation, but not at the station during the preceding hour, the fog or ice fog extending to a level above that of the observer";
} else if (weatherData.current.weatherCode == 41) {
  weatherCode.textContent = "Fog or ice fog in patches";
} else if (weatherData.current.weatherCode == 42) {
  weatherCode.textContent =
    "Fog or ice fog, sky visible - has become thinner during the preceding hour";
} else if (weatherData.current.weatherCode == 43) {
  weatherCode.textContent =
    "Fog or ice fog, sky invisible - has become thinner during the preceding hour";
} else if (weatherData.current.weatherCode == 44) {
  weatherCode.textContent =
    "Fog or ice fog, sky visible - no appreciable change during the preceding hour";
} else if (weatherData.current.weatherCode == 45) {
  weatherCode.textContent =
    "Fog or ice fog, sky invisible - no appreciable change during the preceding hour";
} else if (weatherData.current.weatherCode == 46) {
  weatherCode.textContent =
    "Fog or ice fog, sky visible - has begun or has become thicker during the preceding hour";
} else if (weatherData.current.weatherCode == 47) {
  weatherCode.textContent =
    "Fog or ice fog, sky invisible - has begun or has become thicker during the preceding hour";
} else if (weatherData.current.weatherCode == 48) {
  weatherCode.textContent = "Fog, depositing rime, sky visible";
} else if (weatherData.current.weatherCode == 49) {
  weatherCode.textContent = "Fog, depositing rime, sky invisible";
} else if (weatherData.current.weatherCode == 50) {
  weatherCode.textContent =
    "	Drizzle, not freezing, intermittent - slight at time of observation";
} else if (weatherData.current.weatherCode == 51) {
  weatherCode.textContent =
    "Drizzle, not freezing, continuous - slight at time of observation";
} else if (weatherData.current.weatherCode == 52) {
  weatherCode.textContent =
    "	Drizzle, not freezing, intermittent - moderate at time of observation";
} else if (weatherData.current.weatherCode == 53) {
  weatherCode.textContent =
    "Drizzle, not freezing, continuous - moderate at time of observation";
} else if (weatherData.current.weatherCode == 54) {
  weatherCode.textContent =
    "	Drizzle, not freezing, intermittent - heavy (dense) at time of observation";
} else if (weatherData.current.weatherCode == 55) {
  weatherCode.textContent =
    "Drizzle, not freezing, continuous - heavy (dense) at time of observation";
} else if (weatherData.current.weatherCode == 56) {
  weatherCode.textContent = "Drizzle, freezing, slight";
} else if (weatherData.current.weatherCode == 57) {
  weatherCode.textContent = "Drizzle, freezing, moderate or heavy (dense)";
} else if (weatherData.current.weatherCode == 58) {
  weatherCode.textContent = "	Drizzle and rain, slight";
} else if (weatherData.current.weatherCode == 59) {
  weatherCode.textContent = "Drizzle and rain, moderate or heavy";
} else if (weatherData.current.weatherCode == 60) {
  weatherCode.textContent =
    "Rain, not freezing, intermittent - slight at time of observation";
} else if (weatherData.current.weatherCode == 61) {
  weatherCode.textContent =
    "Rain, not freezing, continuous - slight at time of observation";
} else if (weatherData.current.weatherCode == 62) {
  weatherCode.textContent =
    "Rain, not freezing, intermittent - moderate at time of observation";
} else if (weatherData.current.weatherCode == 63) {
  weatherCode.textContent =
    "Rain, not freezing, continuous - moderate at time of observation";
} else if (weatherData.current.weatherCode == 64) {
  weatherCode.textContent =
    "Rain, not freezing, intermittent - heavy at time of observation";
} else if (weatherData.current.weatherCode == 65) {
  weatherCode.textContent =
    "Rain, not freezing, continuous - heavy at time of observation";
} else if (weatherData.current.weatherCode == 66) {
  weatherCode.textContent = "Rain, freezing, slight";
} else if (weatherData.current.weatherCode == 67) {
  weatherCode.textContent = "Rain, freezing, moderate or heavy (dense)";
} else if (weatherData.current.weatherCode == 68) {
  weatherCode.textContent = "Rain or drizzle and snow, slight";
} else if (weatherData.current.weatherCode == 69) {
  weatherCode.textContent = "Rain or drizzle and snow, moderate or heavy";
} else if (weatherData.current.weatherCode == 70) {
  weatherCode.textContent =
    "Intermittent fall of snowflakes - slight at time of observation";
} else if (weatherData.current.weatherCode == 71) {
  weatherCode.textContent =
    "Continuous fall of snowflakes - slight at time of observation";
} else if (weatherData.current.weatherCode == 72) {
  weatherCode.textContent =
    "Intermittent fall of snowflakes - moderate at time of observation";
} else if (weatherData.current.weatherCode == 73) {
  weatherCode.textContent =
    "Continuous fall of snowflakes - moderate at time of observation";
} else if (weatherData.current.weatherCode == 74) {
  weatherCode.textContent =
    "Intermittent fall of snowflakes - heavy at time of observation";
} else if (weatherData.current.weatherCode == 75) {
  weatherCode.textContent =
    "Continuous fall of snowflakes - heavy at time of observation";
} else if (weatherData.current.weatherCode == 76) {
  weatherCode.textContent = "Diamond dust (with or without fog)";
} else if (weatherData.current.weatherCode == 77) {
  weatherCode.textContent = "Snow grains (with or without fog)";
} else if (weatherData.current.weatherCode == 78) {
  weatherCode.textContent =
    "Isolated star-like snow crystals (with or without fog)";
} else if (weatherData.current.weatherCode == 79) {
  weatherCode.textContent = "Ice pellets";
} else if (weatherData.current.weatherCode == 80) {
  weatherCode.textContent = "Rain shower(s), slight";
} else if (weatherData.current.weatherCode == 81) {
  weatherCode.textContent = "Rain shower(s), moderate or heavy";
} else if (weatherData.current.weatherCode == 82) {
  weatherCode.textContent = "Rain shower(s), violent";
} else if (weatherData.current.weatherCode == 83) {
  weatherCode.textContent = "	Shower(s) of rain and snow mixed, slight";
} else if (weatherData.current.weatherCode == 84) {
  weatherCode.textContent =
    "Shower(s) of rain and snow mixed, moderate or heavy";
} else if (weatherData.current.weatherCode == 85) {
  weatherCode.textContent = "Snow shower(s), slight";
} else if (weatherData.current.weatherCode == 86) {
  weatherCode.textContent = "Snow shower(s), moderate or heavy";
} else if (weatherData.current.weatherCode == 87) {
  weatherCode.textContent =
    "Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed - slight";
} else if (weatherData.current.weatherCode == 88) {
  weatherCode.textContent =
    "Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed - moderate or heavy";
} else if (weatherData.current.weatherCode == 89) {
  weatherCode.textContent =
    "Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder - slight";
} else if (weatherData.current.weatherCode == 90) {
  weatherCode.textContent =
    "Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder - moderate or heavy";
} else if (weatherData.current.weatherCode == 91) {
  weatherCode.textContent =
    "Slight rain at time of observation - Thunderstorm during the preceding hour but not at time of observation";
} else if (weatherData.current.weatherCode == 92) {
  weatherCode.textContent =
    "Moderate or heavy rain at time of observation - Thunderstorm during the preceding hour but not at time of observation";
} else if (weatherData.current.weatherCode == 93) {
  weatherCode.textContent =
    "Slight snow, or rain and snow mixed or hail at time of observation - Thunderstorm during the preceding hour but not at time of observation";
} else if (weatherData.current.weatherCode == 94) {
  weatherCode.textContent =
    "Moderate or heavy snow, or rain and snow mixed or hail at time of observation - Thunderstorm during the preceding hour but not at time of observation";
} else if (weatherData.current.weatherCode == 95) {
  weatherCode.textContent =
    "Thunderstorm, slight or moderate, without hail but with rain and/or snow at time of observation - Thunderstorm at time of observation";
} else if (weatherData.current.weatherCode == 96) {
  weatherCode.textContent =
    "Thunderstorm, slight or moderate, with hail at time of observation - Thunderstorm at time of observation";
} else if (weatherData.current.weatherCode == 97) {
  weatherCode.textContent =
    "Thunderstorm, heavy, without hail but with rain and/or snow at time of observation - Thunderstorm at time of observation";
} else if (weatherData.current.weatherCode == 98) {
  weatherCode.textContent =
    "Thunderstorm combined with duststorm or sandstorm at time of observation - Thunderstorm at time of observation";
} else if (weatherData.current.weatherCode == 99) {
  weatherCode.textContent =
    "Thunderstorm, heavy, with hail at time of observation - Thunderstorm at time of observation";
} else {
  weatherCode.textContent = "Weather can not be determined";
}

// Append
temperatureField.append(
  currentTime,
  currentTemperature,
  apparentTemperature,
  weatherCode,
  windSpeed,
  windDirection
);

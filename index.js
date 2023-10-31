function formatDate(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "040ffb19o36e1562a0f417abf724b2t9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//getting weather info from open-weather-map
function showTemperature(response) {
  let displayDate = document.querySelector("#current-date");
  displayDate.innerHTML = formatDate(response.data.time * 1000);

  let cityElement = response.data.city;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `  ${cityElement}`;

  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let currTemp = document.querySelector("#current-temp");
  currTemp.innerHTML = `${temperature} °C`;

  let description = response.data.condition.description;
  let tempDescrip = document.querySelector("#description");
  tempDescrip.innerHTML = `${description}`;

  let actualTemp = Math.round(response.data.temperature.feels_like);
  let feelslikeTemp = document.querySelector("#feels-like");
  feelslikeTemp.innerHTML = actualTemp;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = wind;

  let humidity = Math.round(response.data.temperature.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;

  let pressure = Math.round(response.data.temperature.pressure);
  let displayPressure = document.querySelector("#pressure");
  displayPressure.innerHTML = pressure;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

//search function
function searchCity(city) {
  let apiKey = "040ffb19o36e1562a0f417abf724b2t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function newCity(event) {
  event.preventDefault(); //prevent from reloading
  let newCity = document.querySelector("#search-input").value;
  searchCity(newCity);
}

function getCoord(position) {
  let apiKey = "040ffb19o36e1562a0f417abf724b2t9";
  let la = position.coords.latitude;
  let lo = position.coords.longitude;
  let owapi = `https://api.shecodes.io/weather/v1/current?lon=${lo}&lat=${la}&key=${apiKey}&units=metric`;
  axios.get(owapi).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search");
form.addEventListener("submit", newCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

searchCity("Sydney");

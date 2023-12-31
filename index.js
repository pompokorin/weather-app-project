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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src ="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png">
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "040ffb19o36e1562a0f417abf724b2t9";
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
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

  getForecast(response.data.coordinates);
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

let form = document.querySelector("#search");
form.addEventListener("submit", newCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

searchCity("Sydney");

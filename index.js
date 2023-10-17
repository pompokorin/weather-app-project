function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let displayDate = document.querySelector("#current-date");
let currentTime = new Date();
displayDate.innerHTML = formatDate(currentTime);

//getting weather info from open-weather-map
function showTemperature(response) {
  let cityElement = response.data.city;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `📍${cityElement}`;

  let temperature = Math.round(response.data.temperature.current);
  let currTemp = document.querySelector("#current-temp");
  currTemp.innerHTML = `${temperature}℃`;

  let description = response.data.condition.description;
  let tempDescrip = document.querySelector("#description");
  tempDescrip.innerHTML = description;

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
}

//search function
function searchCity(city) {
  let apiKey = "040ffb19o36e1562a0f417abf724b2t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Sydney");

function newCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-input").value;
  searchCity(newCity);
}

let form = document.querySelector("#search");
form.addEventListener("submit", newCity);

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

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

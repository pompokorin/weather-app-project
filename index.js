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
  let cityElement = response.data.name;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `📍${cityElement}`;

  let temperature = Math.round(response.data.main.temp);
  let currTemp = document.querySelector("#current-temp");
  currTemp.innerHTML = `${temperature}℃`;

  let description = response.data.weather[0].description;
  let tempDescrip = document.querySelector("#description");
  tempDescrip.innerHTML = description;

  let actualTemp = Math.round(response.data.main.feels_like);
  let feelslikeTemp = document.querySelector("#feels-like");
  feelslikeTemp.innerHTML = actualTemp;

  let minTemp = Math.round(response.data.main.temp_min);
  let minimumTemp = document.querySelector("#min-temp");
  minimumTemp.innerHTML = minTemp;

  let maxTemp = Math.round(response.data.main.temp_max);
  let maximumTemp = document.querySelector("#max-temp");
  maximumTemp.innerHTML = maxTemp;

  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = wind;

  console.log(response);
}

function searchCity(city) {
  let apiKey = "5ad4d6552040940c65e12ddec5df0535";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
  let apiKey = "5ad4d6552040940c65e12ddec5df0535";
  let la = position.coords.latitude;
  let lo = position.coords.longitude;
  let units = "metric";
  let owapi = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&units=${units}&appid=${apiKey}`;
  axios.get(owapi).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoord);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

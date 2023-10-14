//formatting date
let now = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = months[now.getMonth()];
let dateOfMonth = now.getDate();

let currentDay = days[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();

let currdate = document.querySelector("#current-date");
currdate.innerHTML = `${dateOfMonth} ${currentMonth} ${currentDay}, ${hour}:${minute}`;

//getting weather info from open-weather-map
function showTemperature(response) {
  let cityElement = response.data.name;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `📍${cityElement}`;

  let temperature = Math.round(response.data.main.temp);
  let currTemp = document.querySelector("#current-temp");
  currTemp.innerHTML = `${temperature}℃`;

  //let minTemp = Math.round(response.data.main.temp_min);
  //let maxTemp = Math.round(response.data.main.temp_max);
  //let minmaxTemp = document.querySelector("#minmax-temp");
  //minmaxTemp.innerHTML = `${minTemp}℃/${maxTemp}℃`;

  let description = response.data.weather[0].main;
  let tempDescrip = document.querySelector("#description");
  tempDescrip.innerHTML = description;

  console.log(response);
}

function searchCity(city) {
  let apiKey = "5ad4d6552040940c65e12ddec5df0535";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Tokyo");

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

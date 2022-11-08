function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return (day = `${day} ${hours}:${minutes}`);
}

function showWeatherTemprature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windelement = document.querySelector("#wind");
  windelement.innerHTML = Math.round(response.data.wind.speed);
  let weatherElement = document.querySelector("#weather");
  weatherElement.innerHTML = response.data.weather[0].main;
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
}
let city = "behshahr";
let apiKey = `c8784affc7f48d97a3ffacdb8dec2d4c`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeatherTemprature);

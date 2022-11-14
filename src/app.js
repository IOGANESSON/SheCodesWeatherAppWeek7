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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                    <div class="weather-forecast-date">${formatDay(
                      forecastDay.dt
                    )}</div>
                    <div class="weather-forecast-image">
                      <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }.png"
                        alt=""
                      />
                    </div>
                    <span class="weather-forecast-max"> ${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="weather-forecast-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = `c8784affc7f48d97a3ffacdb8dec2d4c`;
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeatherTemprature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windelement = document.querySelector("#wind");
  windelement.innerHTML = Math.round(response.data.wind.speed);
  let weatherElement = document.querySelector("#weather");
  weatherElement.innerHTML = response.data.weather[0].main;
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElemnent = document.querySelector("#icon");
  iconElemnent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElemnent.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = `c8784affc7f48d97a3ffacdb8dec2d4c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherTemprature);
}
function handlesubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiustLink.classList.remove("active");
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiustLink.classList.add("active");
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiustLink = document.querySelector("#celsius-link");
celsiustLink.addEventListener("click", displayCelsiusTemperature);
search("oslo");
displayForecast();

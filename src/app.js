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
function displayForcast() {
  let forcastElement = document.querySelector("#weather-forcast");

  let days = ["Sun", "Mon", "Thu", "Wed"];

  let forcastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
      
      <div class="row forcast">
       <div class="col-2">
        <div class="weather-forcast-date">${day}</div>
         <div class="weather-forcast-image">
      <img
        src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
          alt=""
      />
    </div>
    <span class="weather-forcast-max">14°</span>
    <span class="weather-forcast-min">12°</span>
  </div>
</div></div>`;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
  console.log(forcastHTML);
}

function showWeatherTemprature(response) {
  console.log(response.data);
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
displayForcast();

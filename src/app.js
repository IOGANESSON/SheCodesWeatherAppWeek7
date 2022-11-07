function showWeatherTemprature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.main.temp;
}
let apiKey = `c8784affc7f48d97a3ffacdb8dec2d4c`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}`;
axios.get(apiUrl).then(showWeatherTemprature);

var inputEl = $('#input-city');

// Step One: attach the event listener to the search button
// Step two: api fetch
// step three: 

// 
// console.log("JS loaded");

$('#search-btn').on("click", function (e) {
  e.preventDefault();
  const cityName = inputEl.val();
  getCurrentWeatherAndForecast(cityName);
});

function getCurrentWeatherAndForecast(cityName) {
  const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8e59768c25d3dfbef2890d8b5a57cae6&units=imperial&appid`;

  fetch(currentApiUrl)
    .then((response) => response.json())
    .then((cityData) => {
      console.log(cityData);
      // const { name, lat, lon } = cityData[0]
      // console.log(name, lat, lon)
      currentWeatherDisplay(cityData)
    });

  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8e59768c25d3dfbef2890d8b5a57cae6&units=imperial&appid`;
  fetch(forecastApiUrl)
    .then((response) => response.json())
    .then((fcData) => {
      console.log(fcData);
      forecastDisplay(fcData, 0)
      forecastDisplay(fcData, 1)
      forecastDisplay(fcData, 2)
      forecastDisplay(fcData, 3)
      forecastDisplay(fcData, 4)
    })

  function currentWeatherDisplay(data) {
    const cityNameCurrent = $('#city-name');
    cityNameCurrent.text(`${data.name}`);
    const currentDate = $('#current-date');
    currentDate.text(dayjs().format('MMMM DD, YYYY'));
    const currentTemp = $('#current-temperature');
    currentTemp.text((`Temperature: ${data.main.temp}\u00B0F`));
    const currentWindSpeed = $('#current-wind-speed');
    currentWindSpeed.text((`Wind Speed: ${data.wind.speed} MPH`));
    const currentHumidity = $('#current-humidity');
    currentHumidity.text((`Humidity: ${data.main.humidity}%`));
    const currentWeatherIcon = $('#icon');
    currentWeatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.@2x.png`
  }

  function forecastDisplay(fcData, index) {
    const forecastDay = $('#forecastday' + (index + 1));
    forecastDay.text(dayjs().add(index + 1, 'day').format('MMMM DD, YYYY'));
    const forecastTemp = $('#forecasttemp' + (index + 1));
    forecastTemp.text(`Temperature: ${fcData.list[index].main.temp}\u00B0F`);
    const forecastHumidity = $('#forecasthum' + (index + 1));
    forecastHumidity.text(`Humidity: ${fcData.list[index].main.humidity}%`);
    const forecastWindSpeed = $('#forecastwindspeed' + (index + 1));
    forecastWindSpeed.text(`Wind Speed: ${fcData.list[index].wind.speed} MPH`)
  }
}
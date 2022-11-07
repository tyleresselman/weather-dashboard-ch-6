// Some global variables I'll need for this app
const inputEl = $('#input-city');
const forecastSection = $('.forecast-section');
const searchHistory = JSON.parse(localStorage.getItem('cityName')) || [];

// Event listener for search button
$('#search-btn').on("click", function (e) {
  e.preventDefault();
  const cityName = inputEl.val();
  getCurrentWeatherAndForecast(cityName);
});

// The api fecthes that fire when a city is searched
function getCurrentWeatherAndForecast(cityName) {
  const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8e59768c25d3dfbef2890d8b5a57cae6&units=imperial&appid`;

  fetch(currentApiUrl)
    .then((response) => response.json())
    .then((cityData) => {
      console.log(cityData);
      currentWeatherDisplay(cityData)
    });

  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8e59768c25d3dfbef2890d8b5a57cae6&units=imperial&appid`;
  fetch(forecastApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      forecastDisplay(data);
      saveCitySearch();
    })
}

// Function to display current weather data in the main box
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
  const currentWeatherIconEl = $('<img>');
  const iconSrc = data.weather[0].icon;
  currentWeatherIconEl.attr('src', 'http://openweathermap.org/img/wn/' + iconSrc + '.png');
  $('#city-name').append(currentWeatherIconEl);

}

// Function to display the five day forecast
function forecastDisplay(data) {
  forecastSection.empty();
  for (let i = 3; i < (data.list.length); i = i + 8) {
    let forecastHeading = $('#forecast-heading');
    forecastHeading.removeClass('hidden');
    let forecastDateData = data.list[i].dt_txt;
    let forecastTempData = `Temperature: ${data.list[i].main.temp}\u00B0F`;
    let forecastHumData = `Humidity: ${data.list[i].main.humidity}%`;
    let forecastWindData = `Wind Speed: ${data.list[i].wind.speed} MPH`


    let iconImgEl = $('<img>');
    let iconData = data.list[i].weather[0].icon;
    iconImgEl.attr('src', 'http://openweathermap.org/img/wn/' + iconData + '.png')
    let forecastDayCards = $('<div class= "column card">');

    let forecastCardDate = $('<h3>');
    let forecastCardTemp = $('<h4>');
    let forecastCardHum = $('<h4>');
    let forecastCardWind = $('<h4>');

    forecastCardDate.text(dayjs(forecastDateData).format(('MMMM DD, YYYY')));
    forecastCardTemp.text(forecastTempData);
    forecastCardHum.text(forecastHumData);
    forecastCardWind.text(forecastWindData);

    forecastDayCards.append(forecastCardDate);
    forecastDayCards.append(iconImgEl)
    forecastDayCards.append(forecastCardTemp);
    forecastDayCards.append(forecastCardHum);
    forecastDayCards.append(forecastCardWind);

    forecastSection.append(forecastDayCards);
  }
};

// function to save cities to localstorage and in recent searches section
function saveCitySearch() {
  let recentSearches = $('#button-section');
  let recentCityButton = $('<btn class="button is-rounded">');
  let searchedCity = inputEl.val();

  if (searchHistory.includes(searchedCity) || searchedCity == '') {
    return;
  } else {
    recentCityButton.text(searchedCity);
    recentCityButton.val(inputEl);
    recentSearches.append(recentCityButton);
    searchHistory.push(searchedCity);
    localStorage.setItem('cityName', JSON.stringify(searchHistory));
    inputEl.val('');
  }
}
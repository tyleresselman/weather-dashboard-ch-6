var apiKey = "8e59768c25d3dfbef2890d8b5a57cae6";
var searchBtn = $('#search-btn');
var inputEl = $('#input-city');

var currentWeatherSection = function(inputEl) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${inputEl}&appid=${apiKey}')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;
    })
    
}

// var searchBtn = $('#search-btn');
var inputEl = $('#input-city');

// Step One: attach the event listener to the search button
// Step two: api fetch
// step three: 

// 
console.log("JS loaded");

$('#search-btn').on("click", function (e) {
    e.preventDefault();
    const cityName = inputEl.val();
    findCoord(cityName);
  });

function findCoord(cityName) {
    const geoCoordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=8e59768c25d3dfbef2890d8b5a57cae6`;

    fetch(geoCoordUrl)
    .then((response) => response.json())
    .then((cityData) => {
        console.log(cityData);
        const { name, lat, lon } = cityData[0]
        console.log(name, lat, lon)});
}


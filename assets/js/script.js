var apiKey = "8e59768c25d3dfbef2890d8b5a57cae6";
var searchBtn = $('#search-btn');
var inputEl = $('#input-city');

;

// var currentWeatherSection = function(inputEl) {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=${inputEl}&appid=${apiKey}')
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(response) {
//         var cityLon = response.coord.lon;
//         var cityLat = response.coord.lat;
//     })
    
// }

// Need event listener for button
searchBtn.on("click", function(){
    console.log("hello")
    // Need search parameters from button
   var currentCity = inputEl.val();
   console.log(currentCity);
    // I captured the city name from input, now I send that to the API to get the weather information 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`)
        .then(function(response) {
            console.log(response.json());
        })

    });

// value = $("#txt_name").val();
// fetch('http://example.com/movies.json')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
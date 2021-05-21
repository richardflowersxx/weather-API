
var tempEl = document.querySelector("#temp");
var humidity = document.querySelector("#humidity")
var wind = document.querySelector("#wind")
var uvIndex = document.querySelector("#uvIndex")

var cityName = document.querySelector("#cityName")
var api = 'https://api.openweathermap.org/data/2.5/weather?q='

var apiKey = '&appid=729f5bb07186b173f99eddc857ac24ca'
var units = '&units=imperial'








function getWeather(city){
    
    var url = api + city + apiKey + units
    
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            tempEl.textContent = "Temperature: " + data.main.temp;
            humidity.textContent = "Humidity: " + data.main.humidity;
            wind.textContent = "Wind Speed: " + data.wind.speed + " MPH"
            cityName.textContent = $("#city").val(); 

    })
}

$("#searchBtn").on("click",function(){
    var cityInput = $("#city").val();
    getWeather(cityInput);
    console.log(cityInput)
});

// getWeather ()

var tempEl = document.querySelector("#temp");
var humidity = document.querySelector("#humidity")
var wind = document.querySelector("#wind")
var uvIndex = document.querySelector("#uvIndex")
var cityName = document.querySelector("#cityName")
var fiveDayContainer = document.getElementById("fiveDayforecast")
var imgICON = document.getElementById("currentIcon")
var api = 'https://api.openweathermap.org/data/2.5/weather?q='
var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q='
var uvApi = "https://api.openweathermap.org/data/2.5/onecall?"
var apiKey = '&appid=729f5bb07186b173f99eddc857ac24ca'
var units = '&units=imperial'

// get data from the weather api
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
            wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            imgICON.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            var lat = data.coord.lat
            var lon=data.coord.lon
            getUV(lat,lon)
            cityName.textContent = $("#city").val(); 
            // console.log(coordinatates);
    });
    
    
}

function getUV(lat,lon)
{
    var url = uvApi + `lat=${lat}&lon=${lon}` + apiKey 
    // var coordinatates = []
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            var uvi = data.current.uvi
            if(uvi > 10){
                uvIndex.className="bg-dark col-2"
            }else if ( uvi > 7){
                uvIndex.className="bg-danger col-2"
            }else if(uvIndex > 5){
                uvIndex.className="bg-warning col-2"
            }else if(uvIndex > 2){
                uvIndex.className="bg-info col-2"
            }else{
                uvIndex.className="bg-success col-2"
            }
            uvIndex.textContent = "UV index: " + data.current.uvi
        })
}





function fiveDay (city){
 var url = forecastAPI + city + apiKey + units

    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            var fiveDayData= data.list
            var htmlCode=""
            for (let i = 0; i < fiveDayData.length; i=i+8){
                htmlCode+= `<div class="container">
                <p>${fiveDayData[i].dt_txt}</p>
                <span> <img src= "https://openweathermap.org/img/wn/${fiveDayData[i].weather[0].icon}@2x.png"></span>
                <h6>Temp:${fiveDayData[i].main.temp}</h6>
                <h6> humidity: ${fiveDayData[i].main.humidity}</h6>
                <h6> wind speed: ${fiveDayData[i].wind.speed}</h6>
                </div>`
            }
            fiveDayContainer.innerHTML = htmlCode
            
    });
}

$("#searchBtn").on("click",function(){
    var cityInput = $("#city").val();
    getWeather(cityInput);
    fiveDay(cityInput)
    console.log(cityInput)
});


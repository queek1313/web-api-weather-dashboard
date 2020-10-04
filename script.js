// need to create a folder for images to be downloaded.
// variables for city search with AJAX
    // need to find an API for weather, copy down API key and http site to link to
// console log out response fromm AJAX search find variables for city name, date (moment JS) temperature, humidity, UV index and wind speed
//https://openweathermap.org/ will be the API to pull information down form
// need a form field to be able to search for city name.  this info needs to be stored browser side and saved into a list on the side of the page.
// need to display current city in a field form and have 5 day forecast displayed under that display.
// all this data can be pulled from API and stored into variables that can be called on to fill out the forms
// there is a way to pull images from openweathermap.org (you will need to look this up)
// 
$(document).ready(function () {

    $("#findCity").on("click", function(event){
        event.preventDefault();
        var city = $("#cityInput").val();
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=e144f0dfab5a93d9b52ab5f20f611b1b&units=imperial";
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
            var latRes = response.coord.lat;
            var LonRes = response.coord.lon;
            var temperature = JSON.stringify(response.main.temp)
            var humidity = JSON.stringify(response.main.humidity)
            var windSpeed = JSON.stringify(response.wind.speed)
            $("#temp").text("The temperature: " + temperature)
            $("#windSpeed").text("The wind speed: " + windSpeed) 
            $("#humidity").text("The humidity: " + humidity)
            
            
            
            var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

             var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
             $("#imageTag").append(imgDiv);

             
            var queryURLUv = "http://api.openweathermap.org/data/2.5/uvi?lat="+ latRes+"&lon=" + LonRes+ "&appid=e144f0dfab5a93d9b52ab5f20f611b1b"

            $.ajax({
                url: queryURLUv,
                method: "GET"
              }).then(function(response) {
                  console.log (response)
                  var UvIndex = response.value
                  $("#uvIndex").text("The UV Index: " + UvIndex)
              });
          });     

         var queryURLTwo ="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=e144f0dfab5a93d9b52ab5f20f611b1b&units=imperial";

         $.ajax({
            url: queryURLTwo,
            method: "GET"
          }).then(function(response) {
              console.log(response);
          }); 





    });













});

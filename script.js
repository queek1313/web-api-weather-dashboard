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

    var search =JSON.parse(localStorage.getItem("search")) || []

    function makeList(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".search").append(li);
    }
    for (var i=0; i<search.length; i++){
        makeList(search[i])
    }

    $(".search").on("click", "li", function(event){
        event.preventDefault();
        var city = $(this).text();
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=e144f0dfab5a93d9b52ab5f20f611b1b&units=imperial";
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            if(search.indexOf(city)===-1){
                search.push(city)
                localStorage.setItem("search", JSON.stringify(search))
                makeList(city)
            }  
            $("#imageTag").empty()
            $("#temp").empty()
            $("#windSpeed").empty()
            $("#humidity").empty()
            console.log(response);
            var latRes = response.coord.lat;
            var LonRes = response.coord.lon;
            var temperature = JSON.stringify(response.main.temp)
            var humidity = JSON.stringify(response.main.humidity)
            var windSpeed = JSON.stringify(response.wind.speed)
            $("#temp").text("The temperature: " + temperature)
            $("#windSpeed").text("The wind speed: " + windSpeed) 
            $("#humidity").text("The humidity: " + humidity)
            
            
            
            var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";

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

         var queryURLTwo ="https://api.openweathermap.org/data/2.5/forecast/daily?q="+ city + "&cnt=5&appid=166a433c57516f51dfab1f7edaed8413&units=imperial";

         $.ajax({
            url: queryURLTwo,
            method: "GET"
          }).then(function(response) {
            $("#forecastImg").empty();
              console.log(response);
              console.log(response.list[4].weather[0].main)
              var iconURL = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png";

              var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
              $("#forecastImg").append(imgDiv);
               var iconURL = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + ".png";

              var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
              $("#forecastImg").append(imgDiv);
             
              var iconURL = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + ".png";

              var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
              $("#forecastImg").append(imgDiv);

          });
          $("#currentDay").text(moment().format("dddd MMMM Do, YYYY"))

        });

    $("#findCity").on("click", function(event){
        event.preventDefault();
        var city = $("#cityInput").val();
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=e144f0dfab5a93d9b52ab5f20f611b1b&units=imperial";
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            if(search.indexOf(city)===-1){
                search.push(city)
                localStorage.setItem("search", JSON.stringify(search))
                makeList(city)
            }  
            $("#imageTag").empty()
            $("#temp").empty()
            $("#windSpeed").empty()
            $("#humidity").empty()
            console.log(response);
            var latRes = response.coord.lat;
            var LonRes = response.coord.lon;
            var temperature = JSON.stringify(response.main.temp)
            var humidity = JSON.stringify(response.main.humidity)
            var windSpeed = JSON.stringify(response.wind.speed)
            $("#temp").text("The temperature: " + temperature)
            $("#windSpeed").text("The wind speed: " + windSpeed) 
            $("#humidity").text("The humidity: " + humidity)
            
            
            
            var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";

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

         var queryURLTwo ="https://api.openweathermap.org/data/2.5/forecast/daily?q="+ city + "&cnt=5&appid=166a433c57516f51dfab1f7edaed8413&units=imperial";

         $.ajax({
            url: queryURLTwo,
            method: "GET"
          }).then(function(response) {
              $("#forecastImg").empty();
              console.log(response);
              console.log(response.list[4].weather[0].main)
              var iconURL = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png";

              var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
              $("#forecastImg").append(imgDiv);
               var iconURL = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + ".png";

              var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
              $("#forecastImg").append(imgDiv);
             
              var iconURL = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + ".png";

              var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
              $("#forecastImg").append(imgDiv);

          }); 





    });
});

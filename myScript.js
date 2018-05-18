$(document).ready(function() {
  //show hide div celuius fahr
  $("#divcelu").on("click", function() {
    $(this).hide();
    $("#divfah").show();
  });
  $("#divfah").on("click", function() {
    $(this).hide();
    $("#divcelu").show();
  });
           });
var lat;
var lon;
var imgbacktemp;
window.addEventListener("load", function(event) {
  // get the weather
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      var url =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        lon; //move it here
      $.getJSON(url, function(weathObj) {
        // console.log(myObj);
        var wcity = weathObj.name;
        var condition = weathObj.weather[0].description;
        var tempc = weathObj.main.temp;
        var temp_c = tempc.toFixed(0);
        var hum = weathObj.main.humidity;
        var iconurl = weathObj.weather[0].icon;
        var winddegree = weathObj.wind.deg;
        var windmph = weathObj.wind.speed;
        // capitalize first letters for condition
        function capitalizeFirstLetters(str) {
          return str.toLowerCase().replace(/^\w|\s\w/g, function(letter) {
            return letter.toUpperCase();
          });
        }

        document.getElementById("city").innerHTML = wcity;
        document.getElementById("condition").innerHTML = capitalizeFirstLetters(
          condition
        );
        document.getElementById("hum").innerHTML = hum;
        document.getElementById("ctemp").innerHTML = temp_c;
        document.getElementById("windmph").innerHTML = windmph;
        document.getElementById("iconurl").src = iconurl;
                if(winddegree == undefined ){
           document.getElementById("winddegree").innerHTML = "Not Available";
           }else{
           document.getElementById("winddegree").innerHTML = winddegree;
           }
        // cal fahr
        var cToFahr = (temp_c * 9 / 5 + 32).toFixed(0);
        document.getElementById("ftemp").innerHTML = cToFahr;
        // background image setting
        // get temprture from div
        var imgbacktemp = document.getElementById("ctemp").innerHTML;
        //setting the image background
        var thebody = document.getElementById("body");
        var imgarray = [
          "https://res.cloudinary.com/guypro/image/upload/v1502837858/snow_kogucq.jpg",
          "https://res.cloudinary.com/guypro/image/upload/v1502837712/clouds_x73xqa.jpg",
          "https://res.cloudinary.com/guypro/image/upload/v1502840108/spring_sxqe21.jpg",
          "https://res.cloudinary.com/guypro/image/upload/v1502827513/pexels-photo-532324_qcarey.jpg",
          "https://res.cloudinary.com/guypro/image/upload/v1502840111/summer_wmfazq.jpg"
        ];
        // setting for changing the background image according to temp
        if (imgbacktemp < 5) {
          thebody.style.background =
            "url(" + imgarray[0] + ")no-repeat center center fixed";
        }
        if ((imgbacktemp >= 5) & (imgbacktemp < 10)) {
          thebody.style.background =
            "url(" + imgarray[1] + ") no-repeat center center fixed";
        }
        if ((imgbacktemp >= 10) & (imgbacktemp < 20)) {
          thebody.style.background =
            "url(" + imgarray[2] + ")no-repeat center center fixed";
        }

        if ((imgbacktemp >= 20) & (imgbacktemp < 30)) {
          thebody.style.background =
            "url(" + imgarray[3] + ")no-repeat center center fixed";
        }
        if (imgbacktemp >= 30) {
          thebody.style.background =
            "url(" + imgarray[4] + ") no-repeat center center fixed";
        }
        // end of background image
      });
    });
  }
});

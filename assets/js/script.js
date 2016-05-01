$(document).ready(function(){
    
   if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var geocoder = new google.maps.Geocoder;
    var point = new google.maps.LatLng(
        position.coords.latitude, position.coords.longitude);
      var latit = new google.maps.LatLng(
      position.coords.latitude);
      var longit = new google.maps.LatLng(
      position.coords.longitude);
      console.log(longit + latit);
      
      geocoder.geocode({'latLng': point}, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            for (var i = 0; i < results.length; i++) {
						if (results[i].types[0] === "locality") {
							var city = results[i].address_components[0].short_name;
							var country = results[i].address_components[3].long_name;
                            console.log(city + " " + country);
                            $('.location').text(city + ", " + country);
                            var cityLwr = city.replace(/\s+/g, '-').toLowerCase();
                            console.log(cityLwr);
                            
                            var metServiceNow = "http://uni.ey.nz/metservice.php?localObs_" + cityLwr;
 
                             $.getJSON(metServiceNow, function (json) {
                                 var nowTemperature = json.threeHour.temp;
                                 console.log('Temperature : ', nowTemperature);
                                 $('.nowTemp').text(nowTemperature + '°');

                                 var nowWindDir = json.threeHour.windDirection;
                                 var nowWindSpeed = json.threeHour.windSpeed;
                                 $('.windForecast').text(nowWindDir + " " + nowWindSpeed + " KPH");
                             });
                            
                            var metServiceForecast = "http://uni.ey.nz/metservice.php?localForecast" + cityLwr;
    
                            $.getJSON(metServiceForecast, function (json) {
                                var nowConditions = json.days[0].forecastWord;
                                console.log('Forecast: ' + nowConditions);
                                if (nowConditions === "Fine") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/mostly-sunny.png");
                                } else if (nowConditions === "Partly cloudy") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/partly-cloudy.png");
                                } else if (nowConditions === "Showers") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/showers.png");
                                } else if (nowConditions === "Rain") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/heavy-rain.png");
                                } else if (nowConditions === "Cloudy") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/mostly-cloudy.png");
                                } else if (nowConditions === "Drizzle") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/drizzle.png");
                                } else if (nowConditions === "Windy") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/windy.png"); 
                                } else {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/sadface.jpg");
                                }
                                var currentForecast = json.days[0].forecast;
                                $('.currentForecast').text(currentForecast);
                            });
                            
                        }
                    }
          }
      }
  });
      
  });
}

    $('#termsLink').click(function(){
        $('#terms').css("display", "block");
    });
    
    $('#privacyLink').click(function(){
        $('#privacy').css("display", "block");
    });
    
    $('.legalClose').click(function(){
       $('#terms').css("display", "none");
        $('#privacy').css("display", "none");
    });
    
    $(function(){
      $("#layerPick").on('change', function(){
        $("#mapImage").attr("src", $(this).find(":selected").attr("data-src"));
      });
    });
    
    $('#authContinueButton').click(function(){
        $('#googleAuthorize').css("display", "none");
    });
    
    $('#nowSectionHeader').click(function(){
        $('#rightNowContainer').css("height", "55px");
        $('#nowCloseArrow').css("display", "none");
        $('#nowOpenArrow').css("display", "block");
    });
    
    $('#nowSectionHeader').click(function(){
        $('#rightNowContainer').css("height", "420px");
        $('#nowCloseArrow').css("display", "block");
        $('#nowOpenArrow').css("display", "none");
    });
    
    /* METSERVICE API
        Used without requesting permission but for solely educational purposes, with no intention of breaching any rights or licenses.
        The API used is the one adapted and hosted by Sam Jones, avoiding the origin errors from the MetService's own public data system, and fighting with third party proxy servers. */
    
    /* var metServiceNow = "http://uni.ey.nz/metservice.php?localObs_wellington";
 
     $.getJSON(metServiceNow, function (json) {
         var nowTemperature = json.threeHour.temp;
         console.log('Temperature : ', nowTemperature);
         $('.nowTemp').text(nowTemperature + '°');
         
         var nowWindDir = json.threeHour.windDirection;
         var nowWindSpeed = json.threeHour.windSpeed;
         $('.windForecast').text(nowWindDir + " " + nowWindSpeed + " KPH");
     }); */
    
    /* var metServiceForecast = "http://uni.ey.nz/metservice.php?localForecastwellington";
    
    $.getJSON(metServiceForecast, function (json) {
        var nowConditions = json.days[0].forecastWord;
        console.log('Forecast: ' + nowConditions);
        if (nowConditions = "Fine") {
            $('#nowWeatherIcon').attr("src", "/assets/images/weatherIcons/mostly-sunny.tiff");
        } else if (nowConditions = "Partly cloudy") {
            $('#nowWeatherIcon').attr("src", "/assets/images/weatherIcons/partly-cloudy-day.tiff");
        } else if (nowConditions = "Showers") {
            $('#nowWeatherIcon').attr("src", "/assets/images/weatherIcons/scattered-showers.tiff");
        } else {
            $('#nowWeatherIcon').attr("src", "/assets/images/weatherIcons/sadface.jpg");
        }
        var currentForecast = json.days[0].forecast;
        $('.currentForecast').text(currentForecast);
    }); */
    
    var metServiceWarnings = "http://uni.ey.nz/metservice.php?warningsForRegion3_urban.wellington";
    
    $.getJSON(metServiceWarnings,function(json){
        if ( json.length == 0 ) {
            console.log("NO DATA!")
        }
    });

    
    
});
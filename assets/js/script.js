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
                                if (nowConditions = "Fine") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/mostly-sunny.tiff");
                                } else if (nowConditions = "Partly cloudy") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/partly-cloudy-day.tiff");
                                } else if (nowConditions = "Showers") {
                                    $('#nowWeatherIcon').attr("src", "/MDDN352-Project2/assets/images/weatherIcons/scattered-showers.tiff");
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

    var now = new Date();
    var hours = now.getHours();
    var mins = now.getMinutes();
    var msg;
    if (hours < 12) msg = "Morning";
    else if (hours < 18) msg = "Afternoon";
    else msg = "Evening";
 
    $('.headerCaption').text("Good " + msg + "!");

    /*  function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

    function loadUserProfile() {
        gapi.client.load('plus','v1', function(){
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.execute(function(resp) {
                console.log('Retrieved profile for:' + resp.name.givenName);
                var nameStr = resp.name.givenName;
                $('#userName').text("Good " + msg + nameStr + "!");
            });
        });
    } */
    
});

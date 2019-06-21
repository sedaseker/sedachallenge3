function getAPIdata() {
	
	var url = "https://api.openweathermap.org/data/2.5/forecast";
	var apiKey ="45a1b045e387a7b1d4654e2d735e6aa2";
	var city = "new York";
	var units = "metric"
	var humid = "list.humidity"

	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city + "&units="+ units + "&" + humid;
	
	fetch(request)

	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		console.log(response);
		onAPISucces(response);
	})
}


// weerberichtlijst
function onAPISucces(response) {

	var weatherList = response.list;
	var weatherBox = document.getElementById('weer');

	for(var i=0; i< weatherList.length; i++){
		//this gets the date, time, temprature, humidity and prints them out in each square
		var dateTime = new Date(weatherList[i].dt_txt);
		var date = formDate(dateTime);
		var time = formTime(dateTime);
		var temp = Math.floor(weatherList[i].main.temp);
		var humi = Math.floor(weatherList[i].main.humidity);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';
		var tekst = "<b>New York:</b>"
		forecastMessage =  '<div class="forecastMoment">';
		forecastMessage +=   '<div class="tekst"> '+tekst+' </div>';
		forecastMessage +=   '<div class="date"> '+date+' </div>';
		forecastMessage +=	 '<div class="time"> '+ time +' </div>';
		forecastMessage +=	 '<div class="humi"> '+ '<b>humidity: </b>' + humi + '%' +' </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
		forecastMessage +=	 '<div class="icon"> <img src="'+iconUrl+'"> </div>';
		forecastMessage += '</div>';
		weatherBox.innerHTML += forecastMessage;
	}
}


//format voor dag en maand
function formDate(date) { 
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +'/'+ month;
}
//einde format dag en maand

function formTime(date) {
	var hours = date.getHours(); 
	if(hours<10){ 
		hours = '0'+hours;
	}
	var minutes = date.getMinutes(); 
	if(minutes < 10){
		minutes = '0'+ minutes;
	}
	return hours +':'+ minutes;
}



function initMap(){
      var options = {
        zoom:13,
        center:{lat:40.742616 ,lng:-73.987845

}
      }

      // code om de google maps map te creeren 
      var map = new google.maps.Map(document.getElementById('map'), options);

     
      var markers = [ 
        {
          coords:{lat:40.741567, lng:-73.992770},
          content:'<h1>Inscape - Meditation Studio</h1><h4>for regaining your balance</h4>'
        },
		{
          coords:{lat:40.760813, lng:-73.977372},
          iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
          content:'<h1>New York Public Library</h1><h4>Finding new and old information</h4>'
        },
        {
          coords:{lat:40.742616 ,lng:-73.987845},
          content:'<h1>Maddison square park</h1><h4>a fun walk in the park</h4>'
        },
        {
          coords:{lat:40.744412,lng: -73.992040},
          content:'<h1>2 Bros. Pizza</h1><h4>For forgeting the liquid food</h4>'
        },
        {
          coords:{lat:40.741900,lng: -73.995581},
		  content:'<h1>Barrys Bootcamp Chelsea</h1><h4>for getting back into shape</h4>'
        }
      ];


      for(var i = 0;i < markers.length;i++){
        addMarker(markers[i]);
      }

      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
        });

        if(props.iconImage){
          marker.setIcon(props.iconImage);
        }

        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    }



getAPIdata();

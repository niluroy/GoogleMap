// Markers appear when the user clicks on the map.
var htmlText = '';
var markers = [];
function initialize() {
    var bangalore = {lat : 12.97, lng : 77.59};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom : 10,
		center : bangalore
	});
		
	var lattitude = '';
	var longitude = '';
		
	// Add a marker at the current location(Bengaluru) of the map.
	//addMarker(bangalore, map);
		
	// This event listener calls addMarker() when the map is clicked.
	google.maps.event.addListener(map, 'click', function(event) {
		lattitude = event.latLng.lat();
		longitude = event.latLng.lng();
		addMarker(event.latLng, map);

		//removeMarkers(event.latLng, map);

		var getJSON = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) {
				callback(null, xhr.response);
            } 
            else {
				callback(status);
			}
		};
		xhr.send();
	};
		
	getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lattitude + '&lon=' + longitude
					+ '&appid=71fd48c8855761dead72343a65917c6a', function(err, data) {
			if (err != null) {
				alert('Something went wrong: ' + err);
			} 
            else {
				var json = JSON.parse(JSON.stringify(data));
				htmlText = '';
				htmlText += '<p> Humidity: ' + json.main.humidity + '</p>';
				htmlText += '<p> MaxTemp: ' + json.main.temp_max + '</p>';
				htmlText += '<p> Min Temp: ' + json.main.temp_min + '</p>';
				htmlText += '<p> avg: '
						+ (json.main.temp_max + json.main.temp_min) / 2
						+ '</p>';
			}
		});
	});
}
		
	// Adds a marker to the map.
	function addMarker(location, map) {
		//var marker;
		//1) removing all the existing marker
		alert("hello to all");
		removeMarkers();
        //2)creating a new marker and added to a particular postion on the map
            var marker = new google.maps.Marker({
                position : location,
                map : map
            });
            markers.push(marker);            
        
		
        //markers.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content : htmlText
		});
		
		marker.addListener('click', function() {
			//htmlText = '';
			infowindow.setContent(htmlText);
			infowindow.open(map, marker);
			
		});
        
	}

function removeMarkers(){
    for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    markers= [];

}
	google.maps.event.addDomListener(window, 'load', initialize);
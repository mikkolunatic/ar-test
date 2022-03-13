//Distance between 2 points
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  var m = d * 1000; //Distance in meters
  return m.toFixed(2);
}


//Return if user position is close to the marker
function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint[1]) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint[0]) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

var vMarkerFound = document.getElementById('marker-found');
var vMarkerPopup = document.getElementById('marker-popup');

vMarkerFound.style.display = "none";
vMarkerPopup.style.display = "none";

//Marker found
function setMarkerFoundView(state){
  if(state == true){
    vMarkerFound.style.display = "block";
    setTimeout(function test(){
      vMarkerFound.classList.toggle("spinning");
    }, 2000);
    setTimeout(setMarkerFoundView, 3000, false);
  }else{
    vMarkerFound.style.display = "none";
    vMarkerFound.classList.remove("spinning");
  }
}

function setMarkerFoundViewContent(content){
  vMarkerFound.innerHTML = content;
}

// Marker Popup
function setMarkerPopupView(state){
  if(state == true){
    vMarkerPopup.style.display = "block";
  }else{
    vMarkerPopup.style.display = "none";
  }
}

function setMarkerPopupViewContent(content){
  vMarkerPopup.innerHTML = content;
}

//NOTES
//Have a radius selector (precise, medium, large)
//Turn high accuracy on and off?

var m;

var map;
var current_position, current_accuracy;
var blueDot, markerUnknow, testCirlce;
var popup = document.querySelector(".popup");
var btnFound = document.getElementById('btn-found');

fetch('/api/markers').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
  m = {markers : []};
  data.data.forEach(function(marker){
    m.markers.push(marker);
  })
  initMap();
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

//Initialize map
function initMap(){
  map = L.map('map', {
      center: [46.8125, -71.2214],
      zoom: 13
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxNativeZoom: 19,
      maxZoom: 22,
  }).addTo( map );

  blueDot = L.icon({
      iconUrl: './images/blue-dot.png',

      iconSize: [25, 25], // size of the icon
  });
  markerUnknow = L.icon({
      iconUrl: './images/marker-unknow.png',

      iconSize: [21, 30], // size of the icon
      iconAnchor: [10.5, 28]
  });
	markerKnown = L.icon({
      iconUrl: './images/marker-known.png',

      iconSize: [21, 30], // size of the icon
      iconAnchor: [10.5, 28]
  });

  m.markers.forEach(function(index, key){
    m.markers[key]["lmarker"] = L.marker([index.long, index.lat], {icon: markerUnknow, key: key}).on('click', onClick).addTo(map);
    m.markers[key]["radius"] = (L.circle([index.long, index.lat], 35).addTo(map));
  });

  map.on('locationfound', onLocationFound);
  map.locate({ watch: true, maxNativeZoom: 19, maxZoom: 22, enableHighAccuracy: true, maximumAge: 0});
}

function onClick(e){
  showPopup(this.options.key)
}

//Error on location not onLocation not found - FALSE
// TO DO

//When location is found - TRUE
function onLocationFound(e) {
    var radius = e.accuracy;

    //Check if the position was initialized before
    if (current_position) {
      current_position.setLatLng(e.latlng);
      current_accuracy.setLatLng(e.latlng);
    }else{ // If not
      //Set the map view to position if it is the first time
      map.setView(e.latlng, 19);
      current_position = L.marker(e.latlng, {icon: blueDot}).addTo(map);
      current_accuracy = L.circle(e.latlng, {radius: radius, stroke: false}).addTo(map);
    }

    //Check if the user position is within the radius of the marker
		var inRange = false;

    m.markers.forEach(function(index, key){

      if(arePointsNear([index.long, index.lat], e.latlng, 0.015)){ //15 meters
        index.radius.setStyle({color: 'green'});
        index.radius.setRadius(15);

				if(inRange != true){
					btnFound.classList.add("show");
					btnFound.setAttribute('onclick', "getToken(" + key + ")");
				}
				inRange = true;

      }else if(arePointsNear([index.long, index.lat], e.latlng, 0.035)){ //35 meters
        index.radius.setStyle({color: 'yellow'});
        index.radius.setRadius(35);

				if(inRange != true){
					btnFound.classList.remove("show");
					inRange = false;
				}

      }else{
        index.radius.setStyle({color: '#B8B8B8'});
				index.radius.setRadius(35);
				if(inRange != true){
					btnFound.classList.remove("show");
					inRange = false;
				}
      }
    });
}
function arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint[1]) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint[0]) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

function getToken(id){
  //Get the token on click
  if(id >= 0){
    var marker = m.markers[id];

    var html="";
    html += "<div class='street'><span><img src='assets/images/icons/location-icon.svg' />" + marker.street + "<\/span><\/div>";
    html += "   <div class=\"content\">";
    html += "      <div class=\"rnd-img-container\">";
    html += "        <img src=\"assets\/images\/marker\/" + id + "\/hint.jpg\" \/>";
    html += "      <\/div>";
    html += "    <\/div>";
    html += "    <div class=\"background\" style=\"background-image:url('assets\/images\/marker\/" + id + "\/hint.jpg')\"><\/div>";

    setMarkerFoundViewContent(html);
    setMarkerFoundView(true);

    //Mark the marker as found
    m.markers[id].lmarker.setIcon(markerKnown);
  }
}

function showPopup(id){
  //Get the token on click
  if(id >= 0){
    var marker = m.markers[id];

    var html="";
    html += "<div class=\"popup\">";
    html += "      <div class=\"street\"><span><img src=\"assets\/images\/icons\/location-icon.svg\" \/>" + marker.street + "<\/span><\/div>";
    html += "      <input type=\"image\" onclick=\"setMarkerPopupView(false)\" class=\"close\" src=\"assets\/images\/icons\/close.png\" \/>";
    html += "      <div class=\"content\">";
    html += "        <img class=\"trophy\" src=\"assets\/images\/icons\/unknown.png\" \/>";
    html += "        <h3 id=\"marker-name\">???<\/h3>";
    html += "        <div class=\"rnd-img-container\">";
    html += "          <img src=\"assets\/images\/marker\/" + id + "\/hint.jpg\" \/>";
    html += "        <\/div>";
    html += "        <p id=\"hint-name\">" + marker.name + "<\/p>";
    html += "      <\/div>";
    html += "    <\/div>";

    setMarkerPopupViewContent(html);
    setMarkerPopupView(true);
  }
}

var marker1 = [46.851877428451104, -71.24749780508182];
var user = null;
var x = document.getElementById('demo');
var r = document.getElementById('data');
var compass = null;

//Maps
var map = L.map('map', {
    center: [46.8125, -71.2214],
    zoom: 13
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 19,
    maxZoom: 22,
}).addTo( map );

var current_position, current_accuracy;

var blueDot = L.icon({
    iconUrl: './assets/blue-dot.png',

    iconSize: [25, 25], // size of the icon
});
var markerUnknow = L.icon({
    iconUrl: './assets/marker-unknow.png',

    iconSize: [21, 30], // size of the icon
    iconAnchor: [10.5, 28]
});

L.marker(marker1, {icon: markerUnknow}).addTo(map);
var testCirlce = L.circle(marker1, 25).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy;

    if (current_position) {
      current_position.setLatLng(e.latlng);
      current_accuracy.setLatLng(e.latlng);
    }else{
      //Set the view to position if it is the first time
      map.setView(e.latlng, 19);
      current_position = L.marker(e.latlng, {icon: blueDot}).addTo(map);
      current_accuracy = L.circle(e.latlng, {radius: radius, stroke: false}).addTo(map);
    }

    if(arePointsNear(marker1, e.latlng, 0.025)){
      testCirlce.setStyle({color: 'green'});
    }else{
      testCirlce.setStyle({color: '#B8B8B8'});
    }
    // dist = getDistanceFromLatLonInKm(marker1.lat, marker1.lng, user.lat, user.lng);
    // x.innerHTML = 'Distance from point: ' + dist + 'm<br>' + 'Your position: ' + user.lat + ', ' + user.lng + '<br>' + 'Marker\'s position: ' + marker1.lat + ', ' + marker1.lng;
    // if(n == true){
    //   r.innerHTML = 'True';
    //   r.className = '';
    //   r.classList.add("true");
    // }else{
    //   r.innerHTML = 'False';
    //   r.className = '';
    //   r.classList.add("false");
    // }

}

map.on('locationfound', onLocationFound);
map.locate({ watch: true, maxNativeZoom: 19, maxZoom: 22, enableHighAccuracy: true, maximumAge: 0});


function arePointsNear(checkPoint, centerPoint, km) {

    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint[1]) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint[0]) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

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

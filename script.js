var marker1 = { lat: 46.84750141414454, lng: -71.21877981084529 };
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

function onLocationFound(e) {
    var radius = e.accuracy;

    if (current_position) {
      map.removeLayer(current_position);
      map.removeLayer(current_accuracy);
    }else{
      //Set the view to position if it is the first time
      map.setView(e.latlng, 19);
    }

    current_position = L.marker(e.latlng).addTo(map);
    current_accuracy = L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
map.locate({ watch: true, maxNativeZoom: 19, maxZoom: 22, enableHighAccuracy: true, maximumAge: 0});


// function arePointsNear(checkPoint, centerPoint, km) {
//     var ky = 40000 / 360;
//     var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
//     var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
//     var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
//     return Math.sqrt(dx * dx + dy * dy) <= km;
// }

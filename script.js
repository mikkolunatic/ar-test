var marker1 = { lat: 46.851931, lng: -71.2478621 };
var user = null;
var x = document.getElementById('demo');

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  user = { lat: position.coords.latitude, lng: position.coords.longitude };
  console.log(user);


  var n = arePointsNear(marker1, user, 0.002);
  x.innerHTML = 'Your position: ' + user.lat + ', ' + user.lng + '<br>' + 'Marker\'s position: ' + marker1.lat + ', ' + marker1.lng + '<br>' + n;
}

function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

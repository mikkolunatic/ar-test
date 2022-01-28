var marker1 = { lat: 46.851931, lng: -71.2478621 };
var user = null;
var x = document.getElementById('demo');

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}

//Event that triggers the GPS location
function showPosition(position) {
  user = { lat: position.coords.latitude, lng: position.coords.longitude };
  console.log(user);


  var n = arePointsNear(marker1, user, 0.005);
  dist = getDistanceFromLatLonInKm(marker1.lat, marker1.lng, user.lat, user.lng);
  x.innerHTML = 'Distance from point: ' + dist + 'm<br>' + 'Your position: ' + user.lat + ', ' + user.lng + '<br>' + 'Marker\'s position: ' + marker1.lat + ', ' + marker1.lng + '<br>' + n;
}

function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
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

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

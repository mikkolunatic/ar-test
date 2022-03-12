/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./resources/js/map.js ***!
  \*****************************/
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
  m = {
    markers: []
  };
  data.data.forEach(function (marker) {
    m.markers.push(marker);
  });
  initMap();
})["catch"](function (err) {
  // There was an error
  console.warn('Something went wrong.', err);
}); //Initialize map

function initMap() {
  map = L.map('map', {
    center: [46.8125, -71.2214],
    zoom: 13
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 19,
    maxZoom: 22
  }).addTo(map);
  blueDot = L.icon({
    iconUrl: './images/blue-dot.png',
    iconSize: [25, 25] // size of the icon

  });
  markerUnknow = L.icon({
    iconUrl: './images/marker-unknow.png',
    iconSize: [21, 30],
    // size of the icon
    iconAnchor: [10.5, 28]
  });
  markerKnown = L.icon({
    iconUrl: './images/marker-known.png',
    iconSize: [21, 30],
    // size of the icon
    iconAnchor: [10.5, 28]
  });
  m.markers.forEach(function (index, key) {
    m.markers[key]["lmarker"] = L.marker([index["long"], index.lat], {
      icon: markerUnknow,
      key: key
    }).on('click', onClick).addTo(map);
    m.markers[key]["radius"] = L.circle([index["long"], index.lat], 35).addTo(map);
  });
  map.on('locationfound', onLocationFound);
  map.locate({
    watch: true,
    maxNativeZoom: 19,
    maxZoom: 22,
    enableHighAccuracy: true,
    maximumAge: 0
  });
}

function onClick(e) {
  showPopup(this.options.key);
} //Error on location not onLocation not found - FALSE
// TO DO
//When location is found - TRUE


function onLocationFound(e) {
  var radius = e.accuracy; //Check if the position was initialized before

  if (current_position) {
    current_position.setLatLng(e.latlng);
    current_accuracy.setLatLng(e.latlng);
  } else {
    // If not
    //Set the map view to position if it is the first time
    map.setView(e.latlng, 19);
    current_position = L.marker(e.latlng, {
      icon: blueDot
    }).addTo(map);
    current_accuracy = L.circle(e.latlng, {
      radius: radius,
      stroke: false
    }).addTo(map);
  } //Check if the user position is within the radius of the marker


  var inRange = false;
  m.markers.forEach(function (index, key) {
    if (arePointsNear([index["long"], index.lat], e.latlng, 0.015)) {
      //15 meters
      index.radius.setStyle({
        color: 'green'
      });
      index.radius.setRadius(15);

      if (inRange != true) {
        btnFound.classList.add("show");
        btnFound.setAttribute('onclick', "getToken(" + key + ")");
      }

      inRange = true;
    } else if (arePointsNear([index["long"], index.lat], e.latlng, 0.035)) {
      //35 meters
      index.radius.setStyle({
        color: 'yellow'
      });
      index.radius.setRadius(35);

      if (inRange != true) {
        btnFound.classList.remove("show");
        inRange = false;
      }
    } else {
      index.radius.setStyle({
        color: '#B8B8B8'
      });
      index.radius.setRadius(35);

      if (inRange != true) {
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
/******/ })()
;
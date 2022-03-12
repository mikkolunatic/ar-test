/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./resources/js/showPopup.js ***!
  \***********************************/
function showPopup(id) {
  //Get the token on click
  if (id >= 0) {
    var marker = m.markers[id];
    var html = "";
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
/******/ })()
;
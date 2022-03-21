function getToken(id){
  //Get the token on click
  if(id >= 0){
    var marker = m.markers[id];

    var html="";
    html += "<div class='street'><span><img src='images/icons/location-icon.svg' />" + marker.street + "<\/span><\/div>";
    html += "   <div class=\"content\">";
    html += "      <div class=\"rnd-img-container\">";
    html += "        <img src=\"images\/marker\/" + id + "\/hint.jpg\" \/>";
    html += "      <\/div>";
    html += "    <\/div>";
    html += "    <div class=\"background\" style=\"background-image:url('images\/marker\/" + id + "\/hint.jpg')\"><\/div>";

    setMarkerFoundViewContent(html);
    setMarkerFoundView(true);

    //Mark the marker as found
    m.markers[id].lmarker.setIcon(markerKnown);
  }
}

function getToken(id){
  //Get the token on click
  if(id){
    var marker = m.markers[id];

    var html="";
    html += "<div class=\"content\">";
    html += "      <h3>" + marker.name + "<\/h3>";
    html += "      <div class=\"rnd-img-container\">";
    html += "        <img src=\"assets\/images\/marker\/" + id + "\/hint.jpg\" \/>";
    html += "      <\/div>";
    html += "    <\/div>";
    html += "    <div class=\"background\" style=\"background-image:url('assets\/images\/marker\/" + id + "\/hint.jpg')\"><\/div>";

    setMarkerFoundViewContent(html);
    setMarkerFoundView(true);
  }
}

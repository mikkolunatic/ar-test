var vMarkerFound = document.getElementById('marker-found');

vMarkerFound.style.display = "none";

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

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

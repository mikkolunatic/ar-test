<div>
      <!-- VIEW : MAIN MAP -->
  <div id="main-view">
    <div id="map"></div>
  </div>

  <!-- POPUP -->
  <div id="marker-popup" class="popup-group">
    <div class="popup">
      <div class="street"><span><img src="images/icons/location-icon.svg" />Nom du lieu</span></div>
      <input type="image" onclick="setMarkerPopupView(false)" class="close" src="images/icons/close.png" />
      <div class="content">
        <img class="trophy" src="images/icons/unknown.png" />
        <h3 id="marker-name">???</h3>
        <div class="rnd-img-container">
          <img src="images/marker/3/hint.jpg" />
        </div>
        <p id="hint-name">Plaque François-Xavier Garneau</p>
      </div>
    </div>
  </div>

  <div id="marker-found" class="floating-section">
    <div class="street"><span><img src="images/icons/location-icon.svg" />Nom du lieu</span></div>
    <div class="content">
      <div class="rnd-img-container">
        <img src="images/marker/3/hint.jpg" />
      </div>
    </div>
    <div class="background" style="background-image:url('images/marker/3/hint.jpg')"></div>
  </div>

  <!-- VIEW : STAMPS  -->
  <div id="stamps-view">
  </div>

  <!-- VIEW : AR CAMERA -->
  <div id="ar-view">
  </div>

  <!-- VIEW : SETTINGS -->
  <div id="settings-view">
  </div>

  <button id="btn-found" class="low-flt-btn">J'ai trouvé l'emplacement</button>
</div>

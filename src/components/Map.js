import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';



export function initMap() {
  const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
    
  var map = L.map('map').setView([27.6345, 77.2692], 6);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  
  var delhiMarker = L.marker([28.7041, 77.1025], { icon: customIcon }).addTo(map);
  var uttarakhandMarker = L.marker([30.0668, 79.0193], { icon: customIcon }).addTo(map);
  
  delhiMarker.bindPopup('<b>Delhi</b>').on('click', function () {
    map.setView(delhiMarker.getLatLng());
  });
  
  uttarakhandMarker.bindPopup('<b>Uttarakhand</b>').on('click', function () {
    map.setView(uttarakhandMarker.getLatLng());
  });
}

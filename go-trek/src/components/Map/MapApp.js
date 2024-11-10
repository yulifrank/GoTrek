import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapSearch } from "./MapSearch";
import './MapApp.css'; // קובץ הסגנונות

// הגדרת אייקון מותאם אישית
const userIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // ניתן להחליף ב-URL של אייקון מותאם
  iconSize: [25, 41], // גודל האייקון
  iconAnchor: [12, 41], // מיקום העוגן של האייקון
  popupAnchor: [1, -34] // מיקום העוגן של הפופאפ
});

const LocationMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div>
          <strong>Your Location:</strong>
          <br />
          {position[0]}, {position[1]}
        </div>
      </Popup>
    </Marker>
  );
};

function MapApp() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Could not get your location.");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="map-container">
      {userLocation ? (
        <MapContainer center={userLocation} zoom={13} style={{ height: "80%", width: "80%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker position={userLocation} />
          <MapSearch />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}

export default MapApp;

import React, { useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

export const MapSearch = () => {
  const map = useMap();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!address.trim()) {
      alert("Please enter a valid address.");
      return;
    }

    setLoading(true);
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      setLoading(false);
      if (results.length > 0) {
        const { lat, lng } = results[0].center;
        map.setView([lat, lng], 13);
        L.marker([lat, lng]).addTo(map).bindPopup("Location found: " + address).openPopup();
      } else {
        alert("Location not found.");
      }
    });
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 60, zIndex: 1000, background: "white", padding: "10px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Search for a location"
        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} disabled={loading} style={{ padding: "8px", backgroundColor: "rgb(74, 134, 13)", color: "white", border: "none", cursor: "pointer" }}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

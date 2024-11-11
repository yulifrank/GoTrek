import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, Typography, CardMedia, Button, Grid } from '@mui/material';
import L from 'leaflet';

const RestaurantSelector = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // קבלת המיקום של המשתמש באמצעות Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      alert("הדפדפן שלך לא תומך במיקום גיאוגרפי.");
    }
  };

  // שליפת המסעדות באזור על פי המיקום של המשתמש
  const fetchRestaurants = (lat, lon) => {
    // כאן נשלוף את הנתונים ממסד נתונים או API חיצוני, לדוגמה נשתמש ב-Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?lat=${lat}&lon=${lon}&format=json&radius=2000&category=restaurant`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(
          data.map((item) => ({
            name: item.display_name,
            lat: item.lat,
            lon: item.lon,
            address: item.address ? item.address : "כתובת לא זמינה",
          }))
        );
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchRestaurants(userLocation.lat, userLocation.lon);
    }
  }, [userLocation]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* הצגת המפה */}
      {userLocation && (
        <MapContainer
          center={[userLocation.lat, userLocation.lon]}
          zoom={13}
          style={{ width: '100%', height: '400px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[userLocation.lat, userLocation.lon]}
            icon={new L.Icon({
              iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Font_Awesome_5_solid_map-marker-alt.svg',
              iconSize: [32, 32],
            })}
          >
            <Popup>המיקום שלך</Popup>
          </Marker>

          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={[restaurant.lat, restaurant.lon]}
              icon={new L.Icon({
                iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Font_Awesome_5_solid_map-marker-alt.svg',
                iconSize: [32, 32],
              })}
            >
              <Popup>
                <Typography variant="body1">{restaurant.name}</Typography>
                <Typography variant="body2">{restaurant.address}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* הצגת כרטיסים עם המסעדות */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {restaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleRestaurantClick(restaurant)}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2">{restaurant.address}</Typography>
              </CardContent>
              <Button size="small" color="primary">
                בחר
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* אם נבחרה מסעדה, הצג את הפרטים שלה */}
      {selectedRestaurant && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">המסעדה שנבחרה:</Typography>
          <Typography variant="body1">שם: {selectedRestaurant.name}</Typography>
          <Typography variant="body1">כתובת: {selectedRestaurant.address}</Typography>
        </div>
      )}
    </div>
  );
};

export default RestaurantSelector;

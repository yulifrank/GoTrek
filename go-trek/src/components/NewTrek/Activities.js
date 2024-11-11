import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Activities = () => {
  const { state } = useLocation(); // מקבלים את הנתונים מה- navigate
  const { placeType, audienceType, payment, locations } = state;
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const navigate = useNavigate();

  useEffect(() => {
    // פה ניתן להוסיף סינונים נוספים אם צריך, כמו סוג קהל ותשלום
    const filterByAudience = (location) => {
      // תוסיף כאן לוגיקה לסינון לפי סוג קהל אם צריך
      return true; // כרגע מחזיר את כולם
    };

    const filterByPayment = (location) => {
      // תוסיף כאן לוגיקה לסינון לפי אם יש תשלום או לא
      return true; // כרגע מחזיר את כולם
    };

    const newFilteredLocations = locations
      .filter(filterByAudience)
      .filter(filterByPayment);

    setFilteredLocations(newFilteredLocations);
  }, [audienceType, payment, locations]);

  const handleLocationClick = (location) => {
    // לדף פרטי מקום או פעולה אחרת
    console.log(location);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>מקומות בקטגוריה: {placeType}</h2>
      <h3>סוג קהל: {audienceType}</h3>
      <h3>{payment ? 'יש תשלום' : 'ללא תשלום'}</h3>

      <div>
        {filteredLocations.length === 0 ? (
          <Typography>לא נמצאו מקומות תואמים</Typography>
        ) : (
          filteredLocations.map((location, index) => (
            <Card key={index} style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{location.tags.name || 'מקום ללא שם'}</Typography>
                <Typography variant="body2">
                  {location.lat}, {location.lon}
                </Typography>
                <Button onClick={() => handleLocationClick(location)} variant="contained" color="primary">
                  פרטים נוספים
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/')} // ניווט חזרה למסך הראשי
        style={{ marginTop: '20px' }}
      >
        חזור
      </Button>
    </div>
  );
};

export default Activities;

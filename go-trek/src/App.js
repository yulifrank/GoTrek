import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // הוספנו את ה-React Router
import Login from './components/Login/Login.js';
import TopBar from './components/TopBar/TopBar.js';
import MapApp from "./components/Map/MapApp.js";
import NewTrek from './components/NewTrek/NewTrek.js';
import Activities from './components/NewTrek/Activities.js';
// import Register from './components/Register/Register';  // דוגמה לעמוד נוסף

function App() {
  return (
    <Router>
      <TopBar /> {/* תפריט ניווט */}
      <Routes>
        {/* כל אחד מהראוטים מייצג עמוד שונה */}
        <Route path="/" element={<Login />} /> {/* דף התחברות */}
        <Route path="/map" element={<MapApp />} /> {/* דף המפה */}
        <Route path="/new" element={<NewTrek />} /> {/* דף המפה */}
        <Route path="/activities" element={<Activities />} /> {/* דף המפה */}

        {/* <Route path="/register" element={<Register />} /> דף הרשמה */}
        {/* תוכל להוסיף עוד ראוטים לפי הצורך */}
      </Routes>
    </Router>
  );
}

export default App;

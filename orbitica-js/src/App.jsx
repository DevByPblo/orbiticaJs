import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import MarsWeather from './pages/Index';
import LearnMore from './pages/LearnMore';
 

const App = () => {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="Home" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="marsweather" element={<MarsWeather />} />
        <Route path="learnmore" element={<LearnMore />} />
      </Routes>
    </Router>
  );
};

export default App;

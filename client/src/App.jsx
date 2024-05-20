import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar /> {/* Render Navbar component */}
      <Routes> 
        <Route exact path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />

        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;

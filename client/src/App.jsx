import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cohorts from './components/Cohort'; 
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar /> Render Navbar component
      <Routes> 
        <Route path="/about" element={<About />} />
        <Route path="/cohorts" element={<Cohorts />} /> {/* Corrected path and element prop */}
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SuccessStories from "./pages/SuccessStories";
import TechNews from "./pages/TechNews";
import Nav from "./components/Nav";
import { Box } from "@chakra-ui/react";
import Fundraiser from "./pages/Fundraiser";
import Forum from "./pages/Forum";
import UserProfile from "./pages/UserProfile";
import FundraiserById from "./pages/FundraiserById";
import Cohort from "./components/Cohort"; 
import About from "./components/About";

function App() {
  return (
    <Box pos={"relative"}>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer />
    </Box>
  );
}
function AppContent() {
  const location = useLocation();

  const shouldDisplayNav = () => {    
    return !location.pathname.startsWith("/forum/");
  };

  return (
    <Box>
      {shouldDisplayNav() && <Nav />}
      <Routes>
        <Route path="/" element={<SuccessStories />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/tech-news" element={<TechNews />} />
        <Route path="/fundraising&donations" element={<Fundraiser />} />
        <Route path="/forum/*" element={<Forum />} />
        <Route path="/forum/userprofile/:username" element={<UserProfile />} />
        <Route path="/forum/fundraiser/:id" element={<FundraiserById />} />
        <Route path="/cohorts" element={<Cohort />} /> 
        <Route path="/about" element={<About />} />
        
      </Routes>
    </Box>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SuccessStories from "./pages/SuccessStories";
import "./App.css";
import TechNews from "./pages/TechNews";
import Nav from "./components/Nav";
import { Box } from "@chakra-ui/react";
import Fundraiser from "./pages/Fundraiser";
import Forum from "./pages/Forum";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Box pos={"relative"}>
      <Router>
        <AppContent />
      </Router>
    </Box>
  );
}

function AppContent() {
  const location = useLocation();

  const shouldDisplayNav = () => {    
    return location.pathname !== "/forum" && !location.pathname.startsWith("/userprofile/");
};

  return (
    <>
      {shouldDisplayNav() && <Nav />}
      <Routes>
        <Route path="/" element={<SuccessStories />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/tech-news" element={<TechNews />} />
        <Route path="/fundraising&donations" element={<Fundraiser />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/userprofile/:username" element={<UserProfile/>}/>
      </Routes>
    </>
  );
}

export default App;

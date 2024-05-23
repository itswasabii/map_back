import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Cohort from './components/Cohort'
import About from './components/About'
import Admin from './components/Admin';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Box pos={"relative"}>
        <Router>
          <AppContent />
        </Router>
        <ToastContainer />
      </Box>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { token } = useAuth();

  const shouldDisplayNav = () => {
    return !location.pathname.startsWith("/forum/") && !location.pathname.startsWith("/user/");
  };

  return (
    <Box>
      {shouldDisplayNav() && <Nav />}
      <Routes>
        <Route path="/" element={<SuccessStories />} />
        <Route path="/tech-news" element={<TechNews />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/forum" element={<Forum />} />
          <Route path='/cohort' element={<Cohort />} />
          <Route path="/forum/userprofile/:id" element={<UserProfile />} />
          <Route path="/forum/fundraising-donations" element={<Fundraiser />} />
          <Route path="/forum/fundraising-donations/:id" element={<FundraiserById />} />
          <Route path="/admin/*" element={<Admin />} />
        </Route>
        <Route path="/user/login" element={token ? <Navigate to="/forum" /> : <Login />} />
        <Route path="/user/signup" element={token ? <Navigate to="/forum" /> : <Signup />} />
        <Route path="/user/forgot-password" element={token ? <Navigate to="/forum" /> : <ForgotPassword />} />
        <Route path="/user/reset-password" element={token ? <Navigate to="/forum" /> : <ResetPassword />} />
      </Routes>
    </Box>
  );
}

export default App;

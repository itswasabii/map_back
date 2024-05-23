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
import Cohort from './components/Cohort';
import About from './components/About';
import Admin from './components/Admin';
import CreateCohort from "./components/CreateCohort";
import CreatePost from "./components/CreatePost";
import ViewAllUsers from "./components/ViewAllUsers";
import SendMassEmails from "./components/SendMassEmails";
import CreateFundraiser from "./components/CreateFundraiser";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { token, role } = useAuth();

  const shouldDisplayNav = () => {
    return !location.pathname.startsWith("/forum/") && !location.pathname.startsWith("/user/");
  };

  if (token && role === "admin" && !location.pathname.startsWith("/user/admin")) {
    return <Navigate to="/user/admin" />;
  }

  return (
    <Box pos={"relative"}>
      {shouldDisplayNav() && <Nav />}
      <Routes>
        <Route path="/" element={<SuccessStories />} />
        <Route path="/tech-news" element={<TechNews />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/forum" element={<Forum />} />
          <Route path="/cohort" element={<Cohort />} />
          <Route path="/user/admin" element={<Admin />} />
          <Route path="/user/admin/view-all-users" element={<ViewAllUsers />} />
          <Route path="/user/admin/send-mass-emails" element={<SendMassEmails />} />
          <Route path="/user/admin/create-fundraiser" element={<CreateFundraiser />} />
          <Route path="/forum/userprofile/:id" element={<UserProfile />} />
          <Route path="/forum/fundraising-donations" element={<Fundraiser />} />
          <Route path="/forum/fundraising-donations/:id" element={<FundraiserById />} />
          <Route path="/admin/*" element={<Admin />} />
        </Route>
        <Route path="/user/login" element={token ? <Navigate to={role === "admin" ? "/user/admin" : "/forum"} /> : <Login />} />
        <Route path="/user/signup" element={token ? <Navigate to={role === "admin" ? "/user/admin" : "/forum"} /> : <Signup />} />
        <Route path="/user/forgot-password" element={token ? <Navigate to={role === "admin" ? "/user/admin" : "/forum"} /> : <ForgotPassword />} />
        <Route path="/user/reset-password" element={token ? <Navigate to={role === "admin" ? "/user/admin" : "/forum"} /> : <ResetPassword />} />
      </Routes>
    </Box>
  );
}

export default App;

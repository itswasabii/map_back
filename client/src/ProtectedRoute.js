import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const ProtectedRoute = () => {
  const { token } = useAuth();
  return token ? React.createElement(Outlet) : React.createElement(Navigate, { to: "/user/login" });
};

export default ProtectedRoute;

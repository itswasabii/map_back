import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const setAuthData = (token, userId, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    setToken(token);
    setUserId(userId);
    setRole(role);
  };

  const logout_url = '/api/logout';
  const login_url = '/api/login';

  const logout = async () => {
    try {
      await fetch(logout_url, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      setToken(null);
      setUserId(null);
      setRole(null);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const { token, userId, role } = await response.json();
      setAuthData(token, userId, role);
      console.log(token,userId,role)
      return { success: true, message: "Login successful", role };
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: "Invalid username or password" };
    }
  };

  return (
    <AuthContext.Provider value={{ token, userId, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// client/src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { _id, username, email, role, token }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("movieverse_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("movieverse_user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("movieverse_user");
  };

  const value = { user, login, logout, loading, isAdmin: user?.role === "ADMIN" };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

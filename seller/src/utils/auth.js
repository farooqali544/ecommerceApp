import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userDetails")));

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("userDetails"));
  };

  const login = (loginDetails) => {
    const { token, result } = loginDetails;
    const userDetails = { token: token, id: result.seller_id };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setUser(userDetails);
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, getCurrentUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

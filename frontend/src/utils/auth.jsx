import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token from local storage or empty string
  const [Token, setToken] = useState(localStorage.getItem("token") || "");

  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Function to log out the user
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <authContext.Provider value={{ storeTokenInLS, Token, LogoutUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(authContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
